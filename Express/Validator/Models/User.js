class User {
  constructor() {
    this.name = "";
  }

  addUser(name) {
    this.name = name;
    return this.name;
  }
}

module.exports = new User();