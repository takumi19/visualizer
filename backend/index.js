const express = require("express");
// const mongoose = require("mongoose");
const router = require("./routes/router");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const app = express();

dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(cors());

app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Could not connect to MongoDB...", err));
