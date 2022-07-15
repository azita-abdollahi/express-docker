const mongoose= require("mongoose")
const config = require("config");
mongoose.connect(process.env.MONGO_URI || config.get("MONGO_URI"),
{
  auth: {
    username: config.get("MONGO_USERNAME"),
    password: config.get("MONGO_PASSWORD"),
  },
  authSource: "admin",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
let conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error'));
conn.once('open', function(){
  console.log('Connected')
});