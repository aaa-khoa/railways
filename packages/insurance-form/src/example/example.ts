import { Policy, Driver, Address, State } from "./Policy";
import { PolicyJS } from "./PolicyJS";

/**
 *  Vanilla stuff
 * @param myPolicy
 */
const ignoranceIsBliss = (myPolicy) => {
  // es6 fancy way of mapping one object to another
  const incomingPolicy = {...PolicyJS, ...myPolicy};

  // this aint right but whatever
  incomingPolicy.id = 123
  
  // notice that quotes still works
  incomingPolicy.quotes.forEach(element => {
    //dostuff???????
  });

  incomingPolicy.drivers.forEach((driver) => {
    console.log(driver.name, driver.age);
    driver.addresses.forEach((addr) => {

      // good thing theres no such thing as typos ;\
      if(addr.state = 'CalifrnA') {
        console.log('thats cool....')
      }
      if(addr.state = 'New York') {
        throw new Error('whats this')
      }
    });
  })
  
  return incomingPolicy.drivers

}

/**
 *  Typescript
 * @param myPolicy 
 */
const doStuffWithPolicy = (myPolicy: Policy) : Policy => {
 /*
  myPolicy.id = 123

  myPolicy.quotes.forEach(element => {
    //dostuff
  });
  // */
  myPolicy.drivers.forEach((driver: Driver) => {
    console.log(driver.name, driver.age);
    driver.addresses.forEach((addr: Address) => {
      if(addr.state = State.CA) {
        console.log('thats cool....')
      }
    });
  })

  return myPolicy;
  // return myPolicy.drivers
}

/**
 * https://medium.com/javascript-in-plain-english/typescript-with-node-and-express-js-why-when-and-how-eb6bc73edd5d
 * Type safe = less errors
 * Cmd Click in IDEs
 * its OPTIONAL so use it if you're cool, or don't
 * easy to start! convert js to ts and use as needed
 */

 /**
  * Advanced Typescript: Generics and Interfaces
  */
interface People {
  name: string
}

interface Celebrity extends People {
  profession: string
}

/** A class definition with a generic parameter */
function printName<T extends People>(theInput: T): void {
  console.log(`My name is ${theInput.name}`);
}

let serena: Celebrity = {
  name: 'Serena Williams',
  profession: 'Tennis Player'
}

printName(serena);