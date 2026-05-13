// Making Server-Side API Request with Axios
const express = require("express");
const app = express();

const path = require("node:path");

/*
  Include axios
    Command:
      npm i axios
*/
const axios = require("axios");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    console.log(response.data);
    /*
      Sample Output: (will be random each request)
      {
        activity: 'Read a formal research paper on an interesting subject',
        availability: 0.1,
        type: 'education',
        participants: 1,
        price: 0,
        accessibility: 'Few to no challenges',
        duration: 'minutes',
        kidFriendly: true,
        link: '',
        key: '3352474'
      }
    */
    res.render("index2", { data: response.data });
  } catch (err) {
    console.error("Failed to make Requests: " + err.message);
    res.status(500).send("Failed to fetch activity.");
  }
});

app.listen(3000, () => {
  console.log("App2 Running on Port 3000");
});
