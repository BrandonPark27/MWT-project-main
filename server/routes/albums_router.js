const express = require("express");
const router = express.Router();
const UsedAlbum = require("../models/UsedAlbum");

router.get("/", async (req, res) => {
  try {
    const query = req.query.query || "";
    const albums = query
      ? await UsedAlbum.find({
          $or: [
            { name: { $regex: query, $options: "i" } }, 
            { artist: { $regex: query, $options: "i" } },
          ],
        })
      : await UsedAlbum.find();

    res.json(albums);
  } catch (err) {
    console.error("Error fetching albums:", err);
    res.status(500).json({ message: "Error fetching albums" });
  }
});

router.get("/details", async (req, res) => {
  const { name, artist } = req.query;

  console.log("Received name:", name);
  console.log("Received artist:", artist);

  try {
    const album = await UsedAlbum.findOne({
      name: { $regex: new RegExp(name, "i") }, 
      artist: { $regex: new RegExp(artist, "i") },
    });

    console.log("Fetched album:", album);

    if (album) {
      res.json(album);
    } else {
      res.status(404).json({ message: "Album not found" });
    }
  } catch (error) {
    console.error("Error fetching album details:", error);
    res.status(500).json({
      message: "Error fetching album details",
      error: error.message,
    });
  }
});

module.exports = router;
