// Environment Variables

/*

In Terminal
Command:
NODE_ENV=prod VIDEO_URL="https://www.youtube.com/watch?v=X2CYWg9-2N0" node index.js

*/

// console.log(process.env.NODE_ENV); // Output: prod
// console.log(process.env.VIDEO_URL); // Output: https://www.youtube.com/watch?v=X2CYWg9-2N0

/*

Instead of setting environment variables directly in the command for running your code, you can use the shell command export, which will save environment variables and their values to the current shell session.

Command:
export NODE_ENV=prod VIDEO_URL="https://www.youtube.com/watch?v=X2CYWg9-2N0"

node index.js

*/

// console.log(process.env.NODE_ENV);
// console.log(process.env.VIDEO_URL);

/* Output: 
prod
https://www.youtube.com/watch?v=X2CYWg9-2N0
*/

/*
The above command will set the two environment variables in the current shell environment only, meaning if you were to open a new shell, it would not have access to those environment variables since it’s a new environment.
*/

/*
To view all environment variables in the current shell, you can run "printenv". 
Hang on, it’s showing a lot of stuff we never set ourselves! That’s because the shell itself has a lot of environment variables already set and loaded when it first loads.
*/

/*
Node env files
Node (as of v24.10) has built-in stable support for files containing environment variables. You can create a file called .env (by convention) in the root of your project, and it will contain all of your environment variables in the format NAME=VALUE.

This file must be added to your .gitignore file to keep secrets safe from being published!

You can now run your app in Node and just tell it where your environment variable file is:

node --env-file=.env index.js,

allowing Node to load the values before running your app (and throw an error if it can’t find the environment variable file).
*/

console.log(process.env.NODE_ENV);  // Output: prod
console.log(process.env.VIDEO_URL); // Output: https://www.youtube.com/watch?v=X2CYWg9-2N0

/* 
Environment variables and deployment

When you deploy an app that uses environment variables, your repo will not contain your .env file, so you will have to research how your chosen deployment service handles setting environment variable values. Typically, there will be a way via their website interface, but otherwise, always check their documentation!

Because of this, you may want to add a separate npm script that doesn’t use the --env-file CLI option (i.e. just running something like node index.js). --env-file is useful during development but since the deployment service won’t be using a .env file, we don’t want it to look for it and throw an error when it can’t find it! Alternatively, there is also the --env-file-if-exists option.
*/

/*
dotenv

Node did not always have built-in support for environment variable files. You will likely see libraries like dotenv used out in the wild. The principle will be the same as the built-in feature, just with whatever library-specific instructions are required. Such libraries may also offer more sophisticated features that Node does not have built-in, which may be of benefit to teams working on more complex projects, but as far as TOP goes, they won’t be necessary.
*/

/*
Accessing environment variables

Environment variables are accessed via Node’s built-in process object, more specifically its env property. Node will load each environment variable to the process.env object, using its name as the property. You can then access them like any normal object property.
*/

if (process.env.NODE_ENV === "prod") {
    // do production stuff
}

// don't want to ruin the surprise by hardcoding the URL!
// it might even change every few days!
redirectUserToSuperSecretVideo(process.env.VIDEO_URL);

/*
No hardcoding of those values into the source code! If you want to change the value of an environment variable, you can just change it in your .env file then rerun the program. Do also note that environment variables will always be strings, so you must convert if you want to use any as a number or boolean, for example.
*/

/*
Documenting your environment variables

When your projects include environment variables, those that assist you will need to know what environment variables are needed to run your project. Therefore, we highly recommend that you document them in your README.md file, like which ones are required and what they should contain. You could also include a dummy example .env file, such as an .env.sample, that others can rename then edit with the values they need.
*/