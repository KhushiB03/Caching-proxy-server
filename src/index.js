import express from "express"
import "dotenv/config";
import yargs from "yargs"
import {hideBin} from "yargs/helpers"
import axios from "axios";
import fs from "fs";
import { url } from "inspector";

const app = express();
let count =0;

//CLI ARGUMENTS
const argv = yargs(hideBin(process.argv))
.option("port",{
    type:"number",
    demandOption:true,
    describe:"port to run proxy server"
})
.option("origin",{
    type:"string",
    demandOption:true,
    describe:"origin is server's URL"
})
.option("ttl",{
    type:"number",
    default:60,
    describe:"cache TTL in seconds",
})

.help()
.argv;
const PORT = argv.port;
const ORIGIN = argv.origin;
const TTL = argv.ttl*1000;//convert to ms

//load cache
let cache={};
const FILE = "cache.json";
if(fs.existsSync(FILE)){
    try{
        cache =JSON.parse(fs.readFileSync(FILE , "utf-8"));
    }catch(err){
        console.error("error reading the cache file");
        cache={};
    }
}
//route
app.get("/home/api" , (req,res)=>{
 
  console.log("/ page opened");

  res.send(`
    number of times visited: ${++count}
    PORT = ${PORT}
    origin : ${ORIGIN}
  `);
});
//proxy+cache
app.use(async(req , res)=>{
    try {
        //take only get request
        const isGet = req.method === "GET";
        const targetUrl =new url(req.originalUrl ,ORIGIN).toString();
        console.log(`final link :${targetUrl} ,
            origin :${ORIGIN},
        Server :${req.originalUrl}`);

        //vache check 
        if (isGet && cache[targetUrl]){
            const entry = cache[targetUrl];
            if(Date.now() <entry.expiry){
                console.log("cache hit");
                return res.send(entry.data);
            }else{
                console.log("cache expired");
                delete cache[targetUrl];
            }

        }
        console.log("cache mis");
        const respone = await axios({
            method:req.method,
            url:targetUrl,
            headers:{...req.headers , host:undefined},
        });
        //“Send a request to the original server (targetURL) and wait for the response.”
        if (isGet){
            cache[targetUrl] = {
                data :respone.data,
                expiry: Date.now()+TTL,
            };
            fs.writeFileSync(FILE , JSON.stringify(cache , null,2));
        }
        res.send(respone.data);

    } catch (error) {
        console.error("error found");
        res.status(500).send("error forwarding request");
        
    }
});
//auto cleanip
setInterval(()=>{
    const now = Date.now();
    let changed = false;
    for(const key in cache){
        if(cache[key].expiry <now){
            console.log("remove it" , key);
            delete cache[key];
            changed = true;
        }

    }
    if(changed){
        fs.writeFileSync(FILE , JSON.stringify(cache , null , 2));
    }
},50000);




//server start
app.listen(PORT , ()=>{
    console.log("PORT HAS STARTED RUNNING....");
    console.log(argv);
})