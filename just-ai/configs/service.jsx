const { default: axios } = require("axios");

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/";

const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1, // Fel: maxResult -> ska vara maxResults
    type: "video",
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };

  const resp = await axios.get(YOUTUBE_BASE_URL + "search", { params }); // Borttagit extra "/"
  return resp.data.items;
};

export default {
  getVideos,
};
