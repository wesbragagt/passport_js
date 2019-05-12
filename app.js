const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

// Routes

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/user"));

app.listen(PORT, console.log(`Server starting on ${PORT}`));
