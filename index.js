const app = require('express')()
const http = require('http').createServer(app)
const redis = require('redis');
const client = redis.createClient({
    host: 'localhost',
    port: 4500
});

client.connect();

client.on('error', err => console.log('REDIS ERROR: ', err));

client.on("connect", ()=> console.log("REDIS CLIENT CONNECTED TO SERVER"));

client.ZADD("scores", {score: 80, value: 'player2'});
client.ZADD("speeds",{score:24, value:'player2'});
client.ZADD("accuracy",{score:9,value:'player2'});
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
   console.log("Our winners",personInfo);
}
data();

http.listen(5000,function (){
    console.log("Server listening on port 5000")
})