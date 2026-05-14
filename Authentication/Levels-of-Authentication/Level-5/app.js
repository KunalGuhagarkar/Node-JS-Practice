// ==========================================
// ENVIRONMENT VARIABLES
// ==========================================

/*
|--------------------------------------------------------------------------
| WHAT ARE ENVIRONMENT VARIABLES?
|--------------------------------------------------------------------------
|
| Environment Variables are secret configuration values
| stored OUTSIDE your source code.
|
| They are mainly used for:
|
|   - API Keys
|   - Database Passwords
|   - Secret Tokens
|   - Port Numbers
|   - JWT Secrets
|
| This prevents sensitive information from being exposed
| in your code or GitHub repository.
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| BAD PRACTICE ❌
|--------------------------------------------------------------------------
|
| Hardcoding secrets directly inside code.
|
*/

const password = "mySuperSecretPassword";


/*
|--------------------------------------------------------------------------
| PROBLEM
|--------------------------------------------------------------------------
|
| If you upload code to GitHub,
| everyone can see your secrets.
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| GOOD PRACTICE ✅
|--------------------------------------------------------------------------
|
| Store secrets inside a .env file.
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| .env FILE
|--------------------------------------------------------------------------
|
| Example:
|
|   DB_PASSWORD=mySuperSecretPassword
|   PORT=3000
|   API_KEY=abc123xyz
|
| IMPORTANT:
| Never upload .env file to GitHub.
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| INSTALL DOTENV
|--------------------------------------------------------------------------
|
| npm install dotenv
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| USING ENVIRONMENT VARIABLES
|--------------------------------------------------------------------------
*/

require("dotenv").config();

console.log(process.env.DB_PASSWORD);
console.log(process.env.PORT);


/*
|--------------------------------------------------------------------------
| OUTPUT
|--------------------------------------------------------------------------
|
| mySuperSecretPassword
| 3000
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| HOW IT WORKS
|--------------------------------------------------------------------------
|
| dotenv:
|
|   1. Reads the .env file
|   2. Loads variables into process.env
|
| process.env is a global object in Node.js.
|
*/


// ==========================================


/*
|--------------------------------------------------------------------------
| COMMON EXAMPLES
|--------------------------------------------------------------------------
*/

const port = process.env.PORT;

const dbPassword = process.env.DB_PASSWORD;

const jwtSecret = process.env.JWT_SECRET;


/*
|--------------------------------------------------------------------------
| .gitignore
|--------------------------------------------------------------------------
|
| Add this:
|
|   .env
|
| so Git does NOT upload your secrets.
|
*/


// ==========================================
// SIMPLE ANALOGY
// ==========================================

/*
|--------------------------------------------------------------------------
| ANALOGY
|--------------------------------------------------------------------------
|
| Your code is like a public recipe book.
|
| Environment variables are secret ingredients
| stored in a hidden locker.
|
| Anyone can see the recipe,
| but not the secret ingredients.
|
*/