'use strict'
module.exports = async function (fastify, opts) {
  fastify.route({
    url: '/create-user',
    method: ['POST'],
    // request and response schema
    schema: {
      summary: 'Create a new user',
      description: 'Creates a new user with the provided email, username, password',
      tags: ['User'],
      body: {
        type: 'object',
        required: ['email', 'username', 'password'],
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
            username: { type: 'string' }
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
      const {email, username, password} = request.body
      const connection = await fastify.mysql.getConnection() // Get a connection from the pool

      // Create a new user
      try {
        // Check if the email or username already exists
        console.log('Check if the email or username already exists')
        const [rows] = await connection.query( 
          'SELECT COUNT(*) AS count FROM users WHERE email = ? OR username = ?',
          [email, username]
        );
        if (rows[0].count > 0) {
          reply.code(400).send({
            code: 'USER_EXISTS',
            message: 'Email or Username already exists'
          });
          return;
        }

        // Insert the new user into the database
        console.log('Insert the new user into the database')
        const [result] = await connection.query(
          'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
          [email, password, username]
        );

        reply.code(201).send({
          id: result.insertId,
          email: email,
          username: username
        });
      } catch (error) {
        reply.code(500).send({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while creating the user'
        });
      }
    }
  })
}