class Person {
    constructor(initialAge) {
       if(initialAge < 0) {
         this.age = 0;
         console.log("Age is not valid. Setting age to 0."); 
       } else {
         this.age = initialAge;
       } 
    }
}

let mike = new Person(-1);

