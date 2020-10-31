var mongoose = require("mongoose");
var db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/imageperformance", {
  useNewUrlParser: true
});

var imageSeed = [
  {
    description: "Day At The Library",
    image: "/assets/images/1.jpg",
    rating: 0,
    date: new Date(Date.now())
  },
  {
    description: "Forests Overhead",
    image: "/assets/images/2.jpg",
    rating: 0,
    date: new Date(Date.now())
  },

];

db.Image.deleteMany({})
  .then(() => db.Image.collection.insertMany(imageSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
