const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://mandar:mandar1234@cluster0.givsi.mongodb.net/trelloistDB?retryWrites=true&w=majority"
    || "mongodb://localhost:27017/trelloistDB"   ,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
};

module.exports = connect;
