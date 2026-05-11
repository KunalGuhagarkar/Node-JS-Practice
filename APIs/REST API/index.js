// REST API
// Axios Documentation -> https://axios.rest/pages/getting-started/first-steps
const axios = require("axios");

const express = require("express");
const app = express();

/*
  GET
  POST
  PUT
  PATCH
  DELETE
*/

// Axios GET
app.post("/", async (req, res) => {
  try {
    await axios.get("URL", config);
    res.statusCode(200);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
});

// Axios POST
app.post("/", async (req, res) => {
  try {
    await axios.post("URL", body, config);
    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
});

// Axios PUT
app.post("/", async (req, res) => {
  try {
    await axios.put("URL", body, config);
    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
});

// Axios PATCH
app.post("/", async (req, res) => {
  try {
    await axios.patch("URL", body, config);
    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
});

// Axios DELETE
app.post("/", async (req, res) => {
  try {
    await axios.delete("URL", config);
    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(error.response.data);
  }
});

app.listen(3000, () => console.log("Server Running on Port 3000"));
