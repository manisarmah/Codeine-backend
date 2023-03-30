import axios from "axios";

export const codeforcesList = async (req, res) => {
  try {
    const codeforcesData = await axios.get(
      "https://codeforces.com/api/contest.list"
    );
    const codeforcesList = codeforcesData.data.result;
    const codeforcesListFiltered = codeforcesList.filter(
      (contest) => contest.relativeTimeSeconds <= 1000000
    );
    const response = codeforcesListFiltered.map((contest) => {
      const contestName = contest.name;
      const contestLink = "https://codeforces.com/contests/" + contest.id;
      //   const contestTime = contest.startTimeSeconds;
      var utcSeconds = contest.startTimeSeconds;
      var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
      d.setUTCSeconds(utcSeconds);
      const phase = contest.phase === "BEFORE" ? "Upcoming" : "Ended";
      return {
        name: contestName,
        date: `${d.toLocaleDateString()} ${d.toLocaleTimeString("in-IN")}`,
        contestLink,
        phase,
      };
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(409).json({ message: error.message });
    console.log({ message: error.message });
  }
};
