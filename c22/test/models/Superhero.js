const mongoose = require("mongoose");
 
const superheroScheme = new mongoose.Schema({
  nama: { 
    type: String,
     required: true,
  },
  berat: { 
    type: Number,
    required: true,
  },
  tinggi: {
    type: String,
    required: true,
  },
  tl: {
    type: String,
    required: true,
  },
  marital: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Superhero", superheroScheme);
