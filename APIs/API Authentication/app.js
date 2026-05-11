const express = require("express");
const app = express();
const path = require("node:path");
const axios = require("axios");

const username = "Kunaladzzz";
const password = "Kunalktg1311";
const api_key = "324744a8-fcba-4183-8a9a-935bd8f8195a";
const bearer_token = "ebabf25e-f094-4655-9a06-11d7067e8ab4";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { data: null });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/random",
    );
    res.render("index", { data: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed Fetching API: ", error.message);
    res.status(500).send("Failed Fetching API");
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/all?page=1",
      {
        auth: {
          username: username,
          password: password,
        },
      },
    );
    res.render("index", { data: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed Fetching API: ", error.message);
    res.status(500).send("Failed Fetching API");
  }
});

app.get("/api_key", async (req, res) => {
  try {
    const response = await axios.get(
      `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${api_key}`,
    );
    res.render("index", { data: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed Fetching API: ", error.message);
    res.status(500).send("Failed Fetching API");
  }
});

app.get("/bearer_token", async (req, res) => {
  try {
    const response = await axios.get(
      "https://secrets-api.appbrewery.com/secrets/1",
      {
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      },
    );
    res.render("index", { data: JSON.stringify(response.data) });
  } catch (error) {
    console.error("Failed Fetching API: ", error.message);
    res.status(500).send("Failed Fetching API");
  }
});

app.listen(3000, () => console.log("App Running on Port 3000"));
