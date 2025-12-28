import express from "express";

const app = express();
const port = 3000;
const hostname = "127.0.0.1";

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var teas = [];
var nextId = 1;

// Post 
app.post("/books", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teas.push(newTea);
  res.statusCode = 201;
  res.send(newTea);
});

// Get
app.get("/books", (req, res) => {
  res.statusCode = 200;
  res.send(teas);
});

// Get a single element using id
app.get("/books/:id", (req, res) => {
  const tea = teas.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.statusCode = 404;
    res.send("Book not found :(");
  } else {
    res.statusCode = 200;
    res.send(tea);
  }
});

// Update a single element using id
app.put("/books/:id", (req, res) => {
  const tea = teas.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.statusCode = 404;
    res.send("Book not found :(");
  } else {
    const { name, price } = req.body;
    tea.price = price;
    tea.name = name;
    res.statusCode = 200;
    res.send(tea);
  }
});

// Delete a single element using id
app.delete("/books/:id", (req, res) => {
  const bookIdx = teas.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIdx === -1) {
    res.statusCode = 404;
    res.send("Book not found :(");
  }
  teas.splice(bookIdx, 1);
  res.statusCode = 200;
  res.send(teas);
});

// Listening to the server
app.listen(port, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
