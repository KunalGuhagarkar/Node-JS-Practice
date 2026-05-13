// Setting Up Express
/*
Command:
npm install / i express
*/

const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = 3000;
/*
The port variable
For demonstration purposes, we hardcoded a fixed port number above. Usually, the port number would come from an environment variable with a fallback value in case the environment variable does not exist.

const PORT = process.env.PORT || 3000;

If the specified port is already in use, we can change the environment variable value without editing the source code. Also, some hosting services configure their own ports which may differ from a fixed value hardcoded in.
*/

app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`My First Express App - listening to PORT: ${PORT}`);
});

/*
Auto-restarting your server upon file changes

When you run your server with node app.js, any changes to any JavaScript and JSON files in your project directory won’t be reflected automatically unless you manually interrupt and rerun node app.js. To avoid this manual process, you can use Node’s watch mode by adding the --watch flag, e.g. node --watch app.js. Node will watch app.js for changes, as well as any of the files it ultimately depends on. When it detects a change, it will automatically restart the server just like with Webpack and Vite’s dev servers.

You may also come across Nodemon, a highly configurable package that can also watch for changes and restart your server for you. Node didn’t always have a stable built-in watch mode, so you’re likely to see Nodemon around the place. Our recommendation would be to stick with Node’s built in watch mode via the --watch flag, as this would be by far the simplest method.
*/