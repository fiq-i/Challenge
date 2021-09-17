
const router = require("express").Router();

const superheroController = require("../controllers/superheroController");

router.get("/", superheroController.viewSuperhero);  
router.post("/", superheroController.addSuperhero);  
router.put("/", superheroController.editSuperhero);  
router.delete("/:id", superheroController.deleteSuperhero);  

module.exports = router;
