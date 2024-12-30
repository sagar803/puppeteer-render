const express = require("express");
const app = express();
const { scrapeLogic } = require("./scrapeLogic");

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
