const fetch = require('node-fetch')
const longLat = require('./cities')

choose2RandomCities = ()=> {
    let array = []
    const cities = ['Houston', 'Los Angeles', 'Boston', 'Philadelphia', 'New York', 'Seattle', 'Chicago']
    let num = getRandomInt(cities.length)
    array.push(longLat[cities[num]])
    cities.splice(num, 1)
    let num2 = getRandomInt(cities.length)
    array.push(longLat[cities[num2]])
    return array
}

getDistance = (arr)=>{
    // NOT WORKING ON DISTANCE >>> STRETCH GOAL
//    let d = arr[0]
//    let a = arr[1]
//    console.log(d, a)
//    fetch(`http://www.distance24.org/route.json?stops=${d}|${a}`,{
//        method: 'GET',
//        headers:{
//            'Accept-Content-Type': 'application/json',

//        }
//    })
//    .then(res => res.json())
//    .then(data => console.log(data))

}

getRandomAltitude = () => {    
      return getRandomBetweenValues(32000, 43000)
}

getRandomTemp = (min, max) => {
    return getRandomBetweenValues(min, max)
}

getRandomSpeed = () => {
    return getRandomBetweenValues(547, 580)
}

//randomizer
getRandomInt=(max)=> {
    return Math.floor(Math.random() * Math.floor(max));
  }
getRandomBetweenValues = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }


choose2RandomCities()
module.exports = {
    choose2RandomCities,
    getDistance,
    getRandomAltitude,
    getRandomTemp,
    getRandomSpeed
}