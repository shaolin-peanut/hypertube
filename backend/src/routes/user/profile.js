'use strict';

module.exports = async function (fastify, opts) {
  fastify.route({
    url: '/fill-profile',
    method: ['POST'],
    schema: {
      summary: 'Fill user profile',
      description: 'Create/Update the profile of the user with the provided username, gender, sexuality, biography, and interest',
      tags: ['User'],
      body: {
        type: 'object',
        required: ['username', 'gender', 'biography', 'sexuality', 'interest'],
        properties: {
          username: { type: 'string', description: 'Username of the user' },
          gender: { type: 'string', description: 'User gender' },
          sexuality: { type: 'string', description: 'User sexuality' },
          biography: { type: 'string', description: 'User biography' },
          interest: { type: 'string', description: 'User list of interests' }
        }
      },
      response: {
        201: {
          description: 'Profile filled successfully',
          type: 'object',
          properties: {
            id: { type: 'number' },
            username: { type: 'string' },
            gender: { type: 'string' },
            sexuality: { type: 'string' },
            biography: { type: 'string' },
            interest: { type: 'string' }
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
      const { username, gender, sexuality, biography, interest } = request.body;
      const connection = await fastify.mysql.getConnection();

      try {
        // First find the user ID from username
        const [user] = await connection.query(
          'SELECT id FROM user WHERE username = ?',
          [username]
        );
        if (user.length === 0) {
          reply.code(400).send({
            code: 'USER_NOT_FOUND',
            message: 'Username does not exist'
          });
          return;
        }
        const user_id = user[0].id;

        // Check if profile exists
        const [profileRows] = await connection.query(
          'SELECT COUNT(*) AS count FROM profile WHERE user_id = ?',
          [user_id]
        );

        if (profileRows[0].count > 0) {
          // Profile exists, update it
          console.log('Update the profile data into the profile table');
          await connection.query(
            'UPDATE profile SET gender = ?, sexuality = ?, biography = ?, interest = ? WHERE user_id = ?',
            [gender, sexuality, biography, interest, user_id]
          );

          reply.code(201).send({
            id: user_id,
            username: username,
            gender: gender,
            sexuality: sexuality,
            biography: biography,
            interest: interest
          });
        } else {
          // Profile does not exist, insert new one
          console.log('Insert the profile data into the profile table');
		  console.log('user_id: ', user_id);
          const [insertResult] = await connection.query(
            'INSERT INTO profile (user_id, gender, sexuality, biography, interest) VALUES (?, ?, ?, ?, ?)',
            [user_id, gender, sexuality, biography, interest]
          );

          reply.code(201).send({
            id: insertResult.insertId,
            username: username,
            gender: gender,
            sexuality: sexuality,
            biography: biography,
            interest: interest
          });
        }
      } catch (error) {
        console.error(error);
        reply.code(500).send({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'An error occurred while filling the profile'
        });
      } finally {
        if (connection) connection.release(); // Release the connection back to the pool
      }
    }
  });
};

