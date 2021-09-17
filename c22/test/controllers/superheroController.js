const Superhero = require("../models/Superhero");
module.exports = {
  viewSuperhero: async (req, res) => {
    try {
      const superhero = await Superhero.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
       const alert = { message: alertMessage, status: alertStatus };
       res.render("index", {
        superhero,
        alert,
        title: "CRUD AJAX", 
      });
    } catch (error) {
      res.redirect("/superhero");
    }
  },

  
  addSuperhero: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      const { nama, berat, tinggi, tl, marital } = req.body;
      await Superhero.create({ nama, berat, tinggi, tl, marital }); 
      req.flash("alertMessage", "Success add data Superhero");
      req.flash("alertStatus", "success");
      res.redirect("/superhero"); 
    } catch (error) { 
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger"); 
      res.redirect("/superhero");
    }
  },
 
  editSuperhero: async (req, res) => {
    try {
       const { id, nama, berat, tinggi, tl, marital } = req.body;
          const superhero = await Superhero.findOne({ _id: id });
          superhero.nama = nama;
          superhero.berat = berat;
          superhero.tinggi = tinggi;
          superhero.tl = tl;
          superhero.marital = marital; 

      await superhero.save();
      
      req.flash("alertMessage", "Success edit data superhero");
      req.flash("alertStatus", "success");
      
      res.redirect("/superhero");
    } catch (error) {
      
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger"); 
      res.redirect("/superhero");
    }
  },
 
  deleteSuperhero: async (req, res) => {
    try { 
      const { id } = req.params; 
      const superhero = await Superhero.findOne({ _id: id }); 
      await superhero.remove(); 
      req.flash("alertMessage", "Success delete data superhero");
      req.flash("alertStatus", "warning"); 
      res.redirect("/superhero");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/superhero");
    }
  },
};
