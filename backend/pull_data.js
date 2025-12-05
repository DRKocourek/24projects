const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const WebSocket = require('ws');
const { URL } = require("url");


const app = express();

// Allow requests
app.use(cors());

//setup websocket
/*const socket = new WebSocket('wss://24data.ptfs.app/wss');
socket.addEventListener('open', event =>{
  console.log("Websocket to 24data established successfully!");
});



//listen and filter the needed data
socket.addEventListener('message', raw => {
    const text = raw.data;
    //if (!){ 
      //console.log(text);
      //return;
    //}
    let msg;
  try {
    msg = JSON.parse(text);
  } catch (err) {
    console.error("Invalid JSON:", err);
    return;
  }
  //console.log("Data type: ", msg.t);

  if (msg.t != "FLIGHT_PLAN") return;
  //console.log(msg);
  handleFlightPlan(msg);
});
// Check if websocket was closed
socket.addEventListener('close', event => {
  console.log('WebSocket connection closed:', event.code, event.reason);
});
// check for error while usin websocket
socket.addEventListener('error', error => {
  console.error('WebSocket error:', error);
});*/

let flightplans = [];

async function handleFlightPlan(data){
  let index = flightplans.length;
  flightplans[index] = data;
  //console.log(flightplans[index].d.arriving);
  
}

let controllersCache = null;
//pull the data for active controllers
async function pullControllers() {
  try {
    const res = await fetch("https://24data.ptfs.app/controllers");
    controllersCache = await res.json();
    //console.log("Updated controllers cache");
  } catch (err) {
    console.error("An error occured when trying to receive data: ", err);
  }
}

async function pullAC() {
  try {
    const res = await fetch("https://24data.ptfs.app/acft-data");
    acftCache = await res.json();
  } catch(err){
    console.error("An error occured when trying to receive data: ", err);
  }
}

async function pullATIS() {
  try{
    const res = await fetch("https://24data.ptfs.app/atis");
    atisCache = await res.json();

  } catch(err){
    console.error("An error occured when trying to receive data: ", err);
  }
}

setInterval(pullControllers, 6000);
pullControllers();

setInterval(pullAC, 20000);
pullAC();

setInterval(pullATIS, 30000);
pullATIS();


app.get("/api/controllers", (req, res) => {
  res.json(controllersCache || []);
});

app.get("/api/atis", (req, res) => {
  //get the airport parameter value
  let req_airport = req.query.airport
  //find the requested value
  let final_return = atisCache.find(item => item.airport === req_airport);
  //console.log(final_return);
  //send it back
  res.json(final_return || []);
});

app.listen(3000, () => console.log("Server running on port 3000"));
