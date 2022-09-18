import express from "express";
const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send({ msg: "hello express" });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
