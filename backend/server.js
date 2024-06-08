const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {  return { hello: 'world' }});
fastify.listen(3000, '0.0.0.0', (err, address) => {  
    if (err) throw err;  
    fastify.log.info(`server listening on ${address}`);
})