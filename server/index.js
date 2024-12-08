const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");

const userRouter = require("./routes/user_router");
const ordersRouter = require("./routes/order_router");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.use("/api/users", userRouter);
app.use("/api/orders", ordersRouter);

const searchResultsRouter = require("./routes/search_result"); 
app.use("/api/search_results", searchResultsRouter); 



const albumsRouter = require("./routes/albums_router");
app.use("/api/albums", albumsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
