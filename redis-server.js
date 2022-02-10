const RedisServer = require('redis-server');

const PORT = 4600;

const server = new RedisServer({
    port: PORT,
    bin: '/usr/bin/redis-server'
  });
 
server.open()
.then(()=> {
    console.log(`Redis Server started on port ${PORT}`);
    server.on("connection", (stream)=> {
        console.log("A NEW REDIS CLIENT CONNECTED");
    });
})
.catch(e=> console.log(`REDIS SERVER START ERROR: ${e.message}`));