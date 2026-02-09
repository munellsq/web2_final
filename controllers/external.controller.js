const axios = require("axios");

async function searchMusic(req, res) {
  const { term, limit = 10 } = req.body;

  if (!term || typeof term !== "string") {
    return res.status(400).json({
      message: "Field 'term' is required and must be a string"
    });
  }

  const { data } = await axios.get("https://itunes.apple.com/search", {
    params: {
      term,
      media: "music",
      limit
    }
  });

  res.json({
    search: term,
    count: data.resultCount,
    results: data.results.map((r) => ({
      trackId: r.trackId,
      trackName: r.trackName,
      artistName: r.artistName,
      collectionName: r.collectionName,
      previewUrl: r.previewUrl
    }))
  });
}

module.exports = { searchMusic };
