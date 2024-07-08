'use strict'

const argon2 = require('argon2');
const { Recipient, Sender, EmailParams, MailerSend } = require("mailersend");
const { uuid } = require('uuidv4');

module.exports = async function (fastify, opts) {
  fastify.route({
    url: '/create-user',
    method: ['POST'],
    // request and response schema
    schema: {
      summary: 'Create a new user',
      description: 'Creates a new user with the provided email, username, password, first_name, and last_name',
      tags: ['User'],
      body: {
        type: 'object',
        required: ['email', 'username', 'password', 'first_name', 'last_name'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'User email'
          },
          username: {
            type: 'string',
            description: 'User username'
          },
          password: {
            type: 'string',
            description: 'User password'
          },
          first_name: {
            type: 'string',
            description: 'User first name'
          },
          last_name: {
            type: 'string',
            description: 'User last name'
          }
        }
      },
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            username: { type: 'string' },
            first_name: { type: 'string' },
            last_name: { type: 'string' }
          }
        },
        400: {
          description: 'Invalid input',
          type: 'object',
          properties: {
            code: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    },
    // the function that will handle this request
    handler: async (request, reply) => {
      const {email, username, password, first_name, last_name} = request.body
      const connection = await fastify.mysql.getConnection() // Get a connection from the pool

      // Create a new user
      try {
        // Check if the email or username already exists
        console.log('Check if the email or username already exists')
        const [rows] = await connection.query( 
          'SELECT COUNT(*) AS count FROM user WHERE email = ? OR username = ?',
          [email, username]
        );
        if (rows[0].count > 0) {
          reply.code(400).send({
            code: 'USER_EXISTS',
            message: 'Email or Username already exists'
          });
          return;
        }

		// Encrypt the password
		// Add salt to the password
		const salt = process.env.DATABSE_SALT
		const saltedPassword = password + salt
		console.log('Encrypt the password')
		const hashedPassword = await argon2.hash(saltedPassword)
	
    // // insert the new user and his verification id in the same table
    // console.log('Insert the new user and his verification id in the same table')
    // const [result] = await connection.query(
    //   'INSERT INTO user (email, password, username, first_name, last_name, verification_id) VALUES (?, ?, ?, ?, ?, ?)',
    //   [email, hashedPassword, username, first_name, last_name, verificationId]
    // );

    // Insert the new user into the database
    console.log('Insert the new user into the database')
    const [result] = await connection.query(
      'INSERT INTO user (email, password, username, first_name, last_name) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, username, first_name, last_name]
    );

		// Create unique id to verify its account
		console.log('Create unique id to verify its account')
		const verificationId = uuid() // Generate a random UUID

		console.log('Insert the verification id into the database')
		await connection.query(
			'INSERT INTO user_verification (user_id, verification_id) VALUES (?, ?)',
			[result.insertId, verificationId]
		);

		const mailerSend = new MailerSend({
			apiKey: process.env.MAILERSEND_API_KEY
		});

		const sentFrom = new Sender("verify@trial-3vz9dle78p64kj50.mlsender.net", "Matcha");
		const recipients = [new Recipient(email, first_name + " " + last_name)];

		const emailParams = new EmailParams()
			.setFrom(sentFrom)
			.setTo(recipients)
			.setReplyTo(sentFrom)
			.setSubject("Verify your email address")
			.setHtml("Click <a href='http://localhost:3000/verify-account/" + verificationId + "'>here</a> to verify your account")
			.setText("You can verify your email address by clicking the link above");
		
		console.log('Sending email to:', email)
		await mailerSend.email.send(emailParams);
		console.log('Email sent to :', email)

        reply.code(201).send({
          id: result.insertId,
          email: email,
          username: username,
          first_name: first_name,
          last_name: last_name
        });
      } catch (error) {
		console.log('An error occurred while creating the user')
		console.log('Error:', error)
        reply.code(500).send({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while creating the user',
		  error: error
        });
      }
    }
  })
}
