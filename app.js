const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const models = require('./models/models')
const schedule = require('node-schedule')
dotenv.config({path:'./config/config.env'})
const app = express()
const http = require('http').createServer(app)
const redis = require('redis');
const socketio = require('socket.io')
const io = socketio(http);
const db  = require('./database')
  app.use(morgan('dev'))
  db.authenticate().then(()=>{console.log('Db connected')}).catch((error)=>{
      console.error('error',error)
  })
  const j = schedule.scheduleJob('0 0 * * *',async()=>{
    const [result, meta] = await db.query("UPDATE matches set status='LIVE' where CAST(date AS DATE)=CAST(NOW() AS DATE)")
    const [results,metadata] = await db.query("UPDATE matches set status='DONE' where CAST(date AS DATE)<CAST(NOW() AS DATE)")   
})
  app.use(cors())
  app.use('/Images',express.static('Images'))
  app.use(express.json());
  app.use('/users',require('./routes/user'))
  app.use('/match',require('./routes/match'))
  app.use('/competition',require('./routes/competition'))
  app.use('/result',require('./routes/result'))
  app.use('/progress',require('./routes/progress'))

  const client = redis.createClient(
{
    url:'redis://default:tslsG6Y38HbWzgMnFRAMLnF98SOEN8zm@redis-17597.c302.asia-northeast1-1.gce.cloud.redislabs.com:17597'
}
  );
client.connect();
client.on('error', err => console.log('REDIS ERROR: ', err));
client.on("connect", ()=> console.log("REDIS CLIENT CONNECTED TO SERVER"));
io.on("connection",(socket) => {
    socket.on("Data1", async( speed ,accuracy,roomid,user)=>{
        console.log('our room:',roomid)
        if(speed!=null && accuracy!=null){
            let scores=(speed+accuracy)/10
           console.log(user)
            client.ZADD("scores", {score: scores, value: user});
            client.ZADD("speeds",{score:speed, value:user});
            client.ZADD("accuracy",{score:accuracy,value:user});
            await data().then((data)=>{
                socket.to(roomid).emit("OurData",data,roomid)
                console.log("Data emitted to",roomid)
                console.log("Emitted",data)
             }
            ).catch(err=>{
                console.log(err)
            })
                 
        } 
    })
    socket.on("CreateRoom",async(id)=>{
        console.log('Room:',id)
        await socket.leaveAll()
        socket.join(id)
    })
    socket.on("disconnect",()=>{
console.log("Disconnected");
    })
  });
const data= async()=>{
    let scoreresult = await client.ZRANGE_WITHSCORES('scores', 0,-1)
    let speedsresult = await client.ZRANGE_WITHSCORES('speeds', 0,-1)
    let accuracyresult = await client.ZRANGE_WITHSCORES('accuracy', 0,-1)
    let personInfo=[];
    console.log("Result:",scoreresult)
    console.log("Speeds:",speedsresult)
    console.log("Accuracy:",accuracyresult)
   for (const score of scoreresult) {
    let Myinfo ={
        name : score.value,
        accuracy :await client.ZSCORE('accuracy',score.value),
        speed : await client.ZSCORE('speeds',score.value),
        score: await client.ZSCORE('scores',score.value)
    }  
       personInfo.push(Myinfo);
   }
   const sentData = [... personInfo]
   personInfo=[];
   return sentData
}


const PORT =  process.env.PORT||6000

http.listen(PORT,console.log(`Server running on port ${PORT}`))