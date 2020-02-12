const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 3000 // or ENV 
const fetch = require('node-fetch')
app.use(bodyParser.json())

// import planelogic from other file
const plane = require('./planeLogic')
cities = plane.choose2RandomCities() //returns array ['city1', city2]

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
        let data
        let arrOrObj = getRandomInt(3)
        arrOrObj == 0 ? data = runObject() : arrOrObj == 1 ? data = runArray() : arrOrObj == 2 ? data = runObjectObject() : null
        console.log('this is my random value ', arrOrObj)
        console.log(data)

        const col = db.collection('flightData')

        // here is where I make a random document based on flight pattern 
        
        col.insertOne(data)
        .then(data=> console.log(data))
    
    
    } )

    app.delete('/clearFlightData', (req, res)=>{
        db.collection('flightData').drop()

    })
    
    // hitThisFunction = ()=>{
    //     function getRandomInt(max) {
    //         return Math.floor(Math.random() * Math.floor(max));
    //       }
    //     let arr = ['hi', 'sup', 'how are ya', 'send help', 'crispy']
    //     let num = getRandomInt(arr.length)
    //     console.log(arr[num])
    // }


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
    }, 500)
    
    // dropCollection()

    app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`))

    // end connection to database
  });
  getRandomInt=(max)=> {
    return Math.floor(Math.random() * Math.floor(max));
  }

  dropCollection= () => {
      fetch('http://localhost:3000/clearFlightData', {
          method: 'DELETE'
      })
  }
// makes a single object of random values
  runObject = () => {
    let flight = {}
    let departure = cities[0]
    let arrival = cities[1]
    flight.departure = departure
    flight.arrival = arrival
    flight.fuselageTemp = `${plane.getRandomTemp(18, 27)} C`
    flight.cockpitTemp = `${plane.getRandomTemp(18, 27)} C`
    flight.leftEngineTemp = `${plane.getRandomTemp(1500, 1800)} F`
    flight.rightEngineTemp = `${plane.getRandomTemp(1500, 1800)} F`
    flight.speed = plane.getRandomSpeed()
    return flight
}
// makes an array of objects of random values
runArray = () => {
    let array = []
    let num = getRandomInt(3)
    if(num == 0 ){
        num = 1
    }
    for(let i = 0; i < num; i ++){
        let newobj = runObject()
        array.push(newobj)
    }
    return {array}
    // console.log('making an array of objects')
}
// makes an object of objects of random values
runObjectObject = () => {
    let obj = {}
    let num = getRandomInt(3)
    if(num == 0 ){
        num = 1
    }
    for(let i = 0; i < num; i ++){
        obj[i] = runObject()
    }
    return obj
    // console.log('making an object of objects')
  }
// console.log(plane.choose2RandomCities())

