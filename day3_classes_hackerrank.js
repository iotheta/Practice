class Person {
    constructor(initialAge) {
       if(initialAge < 0) {
         this.age = 0;
         console.log("Age is not valid. Setting age to 0."); 
       } else {
         this.age = initialAge;
       } 
    }

    amIOld() {
      if (this.age < 13) {
        console.log("You are young.");
      } else if (this.age >= 13 && this.age < 18) {
        console.log("You are a teenager.");
      } else {
        console.log("You are old.");
      }
    }

    yearPasses() {
      this.age++;
      this.amIOld();
    }
}

let mike = new Person(12);

mike.amIOld();
mike.yearPasses();

