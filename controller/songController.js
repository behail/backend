const Song = require("../models/songs");
const getAllParams = require("../utils/getAllParams");

exports.createSong = (req, res, next) => {
  const { title, artist, album, genre } = req.body;
  const song = new Song({
    title,
    artist,
    album,
    genre,
  });
  song
    .save()
    .then(() =>
      res.json({
        message: "Song Created Successfully",
      })
    )
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find();
    const artistList = getAllParams(songs, "artist");
    const albumsList = getAllParams(songs, "album");
    const genresList = getAllParams(songs, "genre");
    res.json({
      songs: songs,
      artistList: artistList,
      albumsList: albumsList,
      genresList: genresList,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteSong = (req, res, next) => {
  const songId = req.params.songId;
  Song.deleteOne({ _id: songId })
    .then(() => {
      res.json({
        message: "Song Deleted Successfully",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateSong = (req, res, next) => {
  const songId = req.params.songId;
  const updatedTitle = req.body.title;
  const updatedArtist = req.body.artist;
  const updatedAlbum = req.body.album;
  const updatedGenre = req.body.genre;

  Song.findById(songId)
    .then((song) => {
      song.title = updatedTitle;
      song.artist = updatedArtist;
      song.album = updatedAlbum;
      song.genre = updatedGenre;

      return song.save();
    })
    .then((result) => {
      res.json({
        message: "Song Updated Successfully",
        updatedSong: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
