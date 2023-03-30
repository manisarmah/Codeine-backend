import axios from "axios";
import cheerio from "cheerio";
export const leetcodeList = async (req, res) => {
  try {
    const response = await axios.get("https://leetcode.com/contest/");
    const html = response.data;
    const $ = cheerio.load(html);
    const upcomingContests = [];
    $("div.swiper-slide").each((i, elem) => {
      const regex = /Ended([A-Za-z]+ [0-9]+, [0-9]+)/g;
      const contestName = $(elem).find("div.truncate").text();
      let phase;
      let contestTimes = $(elem)
        .find("div.items-center")
        .text()
        .split(contestName);
      let contestTime = contestTimes[1];
      if (contestTime.includes("Sunday") || contestTime.includes("Saturday")) {
        contestTime = contestTime.split(" ");
        contestTime =
          contestTime[0] + " " + contestTime[1] + " " + contestTime[2];
        phase = "Upcoming";
      }
      if (contestTime.includes("Ended")) {
        contestTime = contestTime.match(regex)[0];
        contestTime = contestTime.split("Ended")[1];
        phase = "Ended";
      }
      const contestLink =
        "https://leetcode.com" + $(elem).find("a").attr("href");
      upcomingContests.push({
        name: contestName,
        date: contestTime,
        contestLink,
        phase,
      });
    });
    // console.log(upcomingContests);
    res.status(200).json(upcomingContests);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log({ message: error.message });
  }
};
