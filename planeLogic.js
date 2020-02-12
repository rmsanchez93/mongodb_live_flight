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



//randomizer
getRandomInt=(max)=> {
    return Math.floor(Math.random() * Math.floor(max));
  }


choose2RandomCities()
module.exports = {
    choose2RandomCities,
    getDistance
}