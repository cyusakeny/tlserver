const { port } = require('pg/lib/defaults');
const RedisServer = require('redis-server');
const PORT = 4600;

const server = new RedisServer({
    port: PORT,
    bin: '/usr/bin/redis-server'
  });
 module.exports.server = server
module.exports.PORT = PORT