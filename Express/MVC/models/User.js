class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet(name) {
    return `Hello, ${name}`;
  }

  userDetails(name, age) {
    return `Name: ${name} Age: ${age}`;
  }
}

module.exports = new User();