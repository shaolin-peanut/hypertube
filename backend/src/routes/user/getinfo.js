'use strict';

const argon2 = require('argon2');

// TODO: this was a route that was used to check if a user exists,
// but now it should return useful info, not done yet

module.exports = async function (fastify, opts) {
  fastify.route({
    url: '/getinfo',
    method: ['GET'],
    schema: {
      summary: 'Get user info',
      description: 'Return all useful user info',
      tags: ['User'],
      querystring: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', description: 'User email' }
        }
      },
      response: {
        200: {
          description: 'User exists',
          type: 'object',
          properties: {
            exists: { type: 'boolean' }
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
      const { email } = request.query;
      const connection = await fastify.mysql.getConnection();
    
      try {
        const [rows] = await connection.query(
          'SELECT COUNT(*) AS count FROM user WHERE email = ?',
          [email]
        );
    
        if (rows[0].count > 0) {
          reply.code(200).send({
            exists: true
          });
        } else {
          reply.code(200).send({
            exists: false
          });
        }
      } catch (error) {
        reply.code(500).send({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while verifying the user',
          error: error
        });
      } finally {
        connection.release();
      }
    }
  });
}