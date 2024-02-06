const express = require("express");
const router = express.Router();
const songController = require("../controller/songController");

router.get("/", songController.getAllSongs);
router.post("/add-song", songController.createSong);
router.put("/edit-song/:songId", songController.updateSong);
router.delete("/delete-song/:songId", songController.deleteSong);

module.exports = router;
