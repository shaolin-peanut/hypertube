'use strict';

const argon2 = require('argon2');

module.exports = async function (fastify, opts) {
  fastify.route({
    url: '/login',
    method: ['POST'],
    schema: {
      summary: 'Login user',
      description: 'Login the user with the provided username and password',
      tags: ['User'],
      body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
			username: { type: 'string', description: 'User username' },
			password: { type: 'string', description: 'User password' }
        }
      },
      response: {
        200: {
		  description: 'User logged in successfully',
		  type: 'object',
		  properties: {
			id: { type: 'number' },
			username: { type: 'string' },
			token: { type: 'string' }
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
	handler: async (request, reply) => {
		const { username, password } = request.body;
		const connection = await fastify.mysql.getConnection();

		//check username and password
		const [user] = await connection.query(
			'SELECT id, username, password FROM user WHERE username = ?',
			[username]
		);
		if (user.length === 0) {
			reply.code(400).send({
				code: 'USER_NOT_FOUND',
				message: 'Username does not exist'
			});
			return;
		}
		//verify password wtith salt in env
		const salt = process.env.DATABSE_SALT
		const saltedPassword = password + salt
		if (!(await argon2.verify(user[0].password, saltedPassword))) {
			reply.code(400).send({
				code: 'INVALID_PASSWORD',
				message: 'Invalid password'
			});
			return;
		}
		//TODO generate jwt token
	}
  });
}

