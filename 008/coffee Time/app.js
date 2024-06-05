
function getCoffeeTime(coffees = [4, 3, 2]) {
    let privousCoffeeTime = 0;
    const timeClean = 2;
    return coffees.reduce((allCoffeeTime, currentCoffeeTime) => {
      allCoffeeTime += privousCoffeeTime + currentCoffeeTime;
      privousCoffeeTime += currentCoffeeTime + timeClean;
      return allCoffeeTime;
    }, 0);
  }
  function getCoffeeTimeMinimum(coffees = [4, 3, 2]) {
    return getCoffeeTime(coffees.sort((a, b) => a - b));
  }
  
  console.log(getCoffeeTimeMinimum([3, 2, 5, 10, 9]));
  