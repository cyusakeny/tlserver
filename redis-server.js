const { port } = require('pg/lib/defaults');
const RedisServer = require('redis-server');
const PORT = 4500;

const server = new RedisServer({
    port: PORT,
    bin: '/usr/bin/redis-server'
  });