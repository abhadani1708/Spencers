const mongoose = require('mongoose')

  // const URL ='mongodb+srv://ritu6713:Rajesh2001@cluster0.znmrnnt.mongodb.net/my-garage?retryWrites=true&w=majority'


  const URL = 'mongodb+srv://arpitbhadani17:8HqadQfSOin4ntaS@cluster0.57rvr2s.mongodb.net/abc?retryWrites=true&w=majority&appName=Cluster0'
  // const URL = `${process.env.MONGO_URI}/abc`;
  // Password: 8HqadQfSOin4ntaS
  mongoose.connect(URL);

let connectionObj = mongoose.connection;

connectionObj.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

connectionObj.on("error", () => {
  console.log("Mongo DB Connection Failed");
});