const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
dotenv.config({path:'./config/config.env'})
const app = express()
const http = require('http').createServer(app)
const redis = require('redis');
const socketio = require('socket.io')
const io = socketio(http);
const db  = require('./database')
if (process.env.NODE_ENV==='development') {
    app.use(morgan('dev'))
}

  db.authenticate().then(()=>{console.log('Db connected')}).catch((error)=>{
      console.error('error',error)
  })
  app.use(express.json());
  app.use('/users',require('./routes/user'))
  app.use('/match',require('./routes/match'))
  app.use('/competition',require('./routes/competition'))
  app.use('/result',require('./routes/result'))

  const client = redis.createClient({
    host: 'localhost',
    port: 4600
});
client.connect();
client.on('error', err => console.log('REDIS ERROR: ', err));
client.on("connect", ()=> console.log("REDIS CLIENT CONNECTED TO SERVER"));
io.on("connection",(socket) => {
    socket.on("Data1", async( speed ,accuracy,roomid)=>{
        console.log('our room:',roomid)
        if(speed!=null && accuracy!=null){
            let scores=(speed+accuracy)/1000
            client.ZADD("scores", {score: scores, value: 'drift'});
            client.ZADD("speeds",{score:speed, value:'drift'});
            client.ZADD("accuracy",{score:accuracy,value:'drift'});
            await data()
                if (socket.to(roomid).emit("OurData",personInfo,roomid)) {
                    console.log("Data emitted to",roomid)
                    console.log("Emitted",personInfo)
                    personInfo = []
                }
        } 
    })
    socket.on("CreateRoom",async(id)=>{
        const room = "room"+id
        await socket.leaveAll()
        socket.join(room)
    })
    socket.on("disconnect",()=>{
console.log("Disconnected");
    })
  });

let personInfo=[];
   

const data= async()=>{
    let scoreresult = await client.ZRANGE_WITHSCORES('scores', 0,-1)
    let speedsresult = await client.ZRANGE_WITHSCORES('speeds', 0,-1)
    let accuracyresult = await client.ZRANGE_WITHSCORES('accuracy', 0,-1)
    console.log("Result:",scoreresult)
    console.log("Speeds:",speedsresult)
    console.log("Accuracy:",accuracyresult)
   for (const score of scoreresult) {
    let Myinfo ={
        id : score.value,
        name :await client.ZSCORE('accuracy',score.value),
        speed : await client.ZSCORE('speeds',score.value)
    }  
       personInfo.push(Myinfo);
   }
  
}


const PORT = process.env.PORT || 5000

http.listen(PORT,console.log(`Server running on port ${PORT}`))