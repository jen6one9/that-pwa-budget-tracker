const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const port = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budget',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);



if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useFindAndModify: true},function(){
          app.listen(port, () => {

              var apiroutes = require("./routes/api.js")
              app.use(apiroutes)
              console.log("App running on port 3000!");
                    });
      })
}
else{
  mongoose.connect
  ("mongodb://localhost/budget", {
      useNewUrlParser: true,
      useFindAndModify: true},function(){
          app.listen(port, () => {
              var apiroutes = require("./routes/api.js")
              app.use(apiroutes)
              console.log("App running on port 3000!");
          });
      })
}


// routes
// app.use(require("./routes/api.js"));

// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}!`);
// });