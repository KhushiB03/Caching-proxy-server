import express from "express"
import "dotenv/config";
import yargs from "yargs"
import {hideBin} from "yargs/helpers"

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


app.get("/" , (req,res)=>{
 
  console.log("/ page opened");

  res.send(`
    number of times visited: ${count++}
    
    PORT = ${PORT}
    origin : ${ORIGIN}
  `);
});


app.listen(PORT , ()=>{
    console.log("PORT HAS STARTED RUNNING....");
    console.log(argv);
})