const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true)

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/group-5-project-3", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
