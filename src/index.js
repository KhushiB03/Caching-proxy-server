import express from "express"
import "dotenv/config";
import yargs from "yargs"
import {hideBin} from "yargs/helpers"
import axios from "axios";


const app = express();
let count =0;
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

.help()
.argv;
const PORT = argv.port;
const ORIGIN = argv.origin;

app.get("/home/api" , (req,res)=>{
 
  console.log("/ page opened");

  res.send(`
    number of times visited: ${count++}
    
    PORT = ${PORT}
    origin : ${ORIGIN}
  `);
});

app.use(async (req,res)=>{
    try {
       const targetURL = new URL(req.originalUrl , ORIGIN).toString() ;
       console.log(`forwarding the request to ${targetURL}`);
       //for get request
       const response = await axios({
        method: req.method,
        url: targetURL,
        headers:req.headers
       })
       ;
       res.send(response.data);
       console.log(response.data);


    } catch (error) {
        res.status(500).send("Error forwarding request");
        
    }
})



app.listen(3080,()=>{
    console.log("chlaaaaaaaaaaaaaaaaaaaaa")
})

app.listen(PORT , ()=>{
    console.log("PORT HAS STARTED RUNNING....");
    console.log(argv);
})