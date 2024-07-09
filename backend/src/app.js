'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  fastify.register(require('@fastify/swagger'), {})
  fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
  })

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  // cors plugin
  fastify.register(require('@fastify/cors'), {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

//   // start the server!
// fix this
// > src@1.0.0 dev
// > fastify start -w -l info -P src/app.js

// (node:25) [FSTDEP011] DeprecationWarning: Variadic listen method is deprecated. Please use ".listen(optionsObject)" instead. The variadic signature will be removed in `fastify@5`.
// (Use `node --trace-deprecation ...` to show where the warning was created)
// Error [ERR_SERVER_ALREADY_LISTEN]: Listen method has been called more than once without closing.
//     at Server.listen (node:net:1993:11)
//     at /usr/src/app/node_modules/fastify/lib/server.js:282:12
//     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
//     at async runFastify (/usr/src/app/node_modules/fastify-cli/start.js:194:5)
//     at async main (/usr/src/app/node_modules/fastify-cli/lib/watch/fork.js:40:13) {
//   code: 'ERR_SERVER_ALREADY_LISTEN'
// }
// [12:04:30.175] INFO (25): Server listening at http://0.0.0.0:3000
  // const start = async () => {
  //   try {
  //     await fastify.listen(process.env.PORT || 3000, )
  //     fastify.swagger()
  //   } catch (err) {
  //     fastify.log.error(err)
  //     process.exit(1)
  //   }
  // }
  // start()
  // start server better
  fastify.listen(process.env.PORT || 3000, 'localhost')
}

module.exports.options = options
