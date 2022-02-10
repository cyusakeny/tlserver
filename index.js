const app = require('express')()
const http = require('http').createServer(app)
const redis = require('redis');
const socketio = require('socket.io')
const port = process.env.PORT || 8001
const io = socketio(http);
const client = redis.createClient({
    host: 'localhost',
    port: 4600
});
client.connect();

client.on('error', err => console.log('REDIS ERROR: ', err));

client.on("connect", ()=> console.log("REDIS CLIENT CONNECTED TO SERVER"));
io.on("connection",(socket) => {
    socket.on("Data1",( speed ,accuracy)=>{
        if(speed!=null && accuracy!=null){
            let scores=(speed+accuracy)/1000
            client.ZADD("scores", {score: scores, value: 'drift'});
            client.ZADD("speeds",{score:speed, value:'drift'});
            client.ZADD("accuracy",{score:accuracy,value:'drift'});
            console.log("Contacted")
            data() 
            if (socket.broadcast.emit("OurData",personInfo)) {
                console.log("Data emitted")
                console.log("Emitted",personInfo)
                personInfo = []
            } 
        } 
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

http.listen(port,function (){
    console.log(`Server listening on port ${port}`)
})