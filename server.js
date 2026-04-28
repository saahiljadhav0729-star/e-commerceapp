const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static("images"));

let users = [];

let products = [
  { id: 1, 
    name: "T-Shirt",
     price: 500, 
     description: "white tshirt",
     image: "http://localhost:3000/images/tshirt.jpg" },
  { id: 2, 
    name: "Shoes", 
    price: 1500, 
    description: "Running shoes", 
    image: "http://localhost:3000/images/runningshoes.jpg" },
  { id: 3, 
    name: "Watch", 
    price: 2000, 
    description: "Stylish watch", 
    image: "http://localhost:3000/images/watch.jpg" },
  { id: 4, 
    name: "trouser", 
    price: 1300, 
    description: "baggy trouser", 
    image: "http://localhost:3000/images/trouser.jpg" },
  { id: 5, 
    name: "sunglasses", 
    price: 399, 
    description: "sun protection glasses", 
    image: "http://localhost:3000/images/sunglasses.jpg" }
];

let cart = [];
let orders = [];

// Signup
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(u => u.username === username);

  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  users.push({ username, password });

  res.json({ message: "User registered" });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Get products
app.get("/products", (req, res) => {
  res.json(products);
});

// Add to cart
app.post("/cart", (req, res) => {
  const { productId } = req.body;

  const product = products.find((p) => p.id == productId);

  if (product) {
    cart.push(product);
    res.json({ message: "Added to cart" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// View cart
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Remove from cart
app.delete("/cart/:id", (req, res) => {
  const id = req.params.id;

  cart = cart.filter(item => item.id != id);

  res.json({ message: "Item removed" });
});

// Place order
app.post("/order", (req, res) => {
  orders.push({ id: Date.now(), items: cart });
  cart = [];
  res.json({ message: "Order placed" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});