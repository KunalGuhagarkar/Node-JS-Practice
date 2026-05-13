import hello from './modules.js';

console.log(hello('Kunal')); // Output: Hello, Kunal

// While performing default export,

// random_name is imported from greetPerson.js. Since random_name is not in greetPerson.js, the default export (greetPerson() in this case) is exported as random_name.

// You can directly use the default export without enclosing curly brackets {}.