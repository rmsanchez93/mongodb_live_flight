choose2RandomCities = ()=> {
    let array = []
    const cities = ['Houston', 'LA', 'Boston', 'Philadelphia', 'New York', 'Seattle', 'Chicago']
    let num = getRandomInt(cities.length)
    array.push(cities[num])
    cities.splice(num, 1)
    let num2 = getRandomInt(cities.length)
    array.push(cities[num2])
    return array
}

test2 = ()=>{
    console.log('this is something I can hit')
}



//randomizer
getRandomInt=(max)=> {
    return Math.floor(Math.random() * Math.floor(max));
  }



module.exports = {
    choose2RandomCities,
    test2
}