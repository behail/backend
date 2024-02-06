const getAllParams = (songs, params) => {
  let paramsList = new Map();
  songs.forEach((song) => paramsList.set(song[params]));
  return [...paramsList.keys()];
};

module.exports = getAllParams;
