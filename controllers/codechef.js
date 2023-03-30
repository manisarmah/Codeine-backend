import axios from "axios";
import cheerio from "cheerio";
export const codechefList = async (req, res) => {
  try {
    const response = await axios.get("https://www.codechef.com/");
    console.log(upcomingContests);
    res.status(200).send(html);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log({ message: error.message });
  }
};
