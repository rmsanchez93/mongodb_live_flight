const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000 // or ENV 
const fetch = require('node-fetch')
app.use(bodyParser.json())

// import planelogic from other file
const plane = require('./planeLogic')

// using mongo node library vs mongoose because mongoose is ORM and requires structure much like SQL
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'flight_data';


const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
  
    // client.close();
    // all routes when you need connection to database go here

    app.get('/', (req, res)=>{
        res.send('we hit the route')
    })
    
    app.post('/liveFlight',(req, res)=>{
        // hitThisFunction()
        const col = db.collection('flightData')
        // here is where I make a random document based on flight pattern 
        
        // col.insertOne({
        //     altitude: 45000,
        //     pilotName: 'John hammond',
        //     pilotSpeech: 'this is a test',
        //     r_engine_temp: '115 F',
        // }).then(data=> console.log(data))
    
    
    } )

    app.delete('/clearFlightData', (req, res)=>{

    })
    
    hitThisFunction = ()=>{
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
        let arr = ['hi', 'sup', 'how are ya', 'send help', 'crispy']
        let num = getRandomInt(arr.length)
        console.log(arr[num])
    }
    setInterval(()=>{
        fetch('http://localhost:3000/liveFlight', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
            }
        })
        .then(res=> res.json())
        .then(data=> console.log(data))
        .catch(err => console.log(err))
    }, 1000)
    
    
    app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`))

    // end connection to database
  });



