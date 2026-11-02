// submissions.js — sample frontend demo data

export const SUBMISSIONS = [
  { id: "SUB-0001", problemId: 1, problem: "Two Sum", language: "Python", verdict: "Accepted", runtime: "48 ms", memory: "16.4 MB", date: "2026-11-01 20:14:22" },
  { id: "SUB-0002", problemId: 2, problem: "Valid Parentheses", verdict: "Accepted", language: "C++", runtime: "0 ms", memory: "6.2 MB", date: "2026-10-30 15:32:11" },
  { id: "SUB-0003", problemId: 5, problem: "Binary Search", verdict: "Accepted", language: "Java", runtime: "1 ms", memory: "42.1 MB", date: "2026-10-29 11:05:47" },
  { id: "SUB-0004", problemId: 6, problem: "Maximum Subarray", verdict: "Accepted", language: "C++", runtime: "4 ms", memory: "19.8 MB", date: "2026-10-28 18:22:33" },
  { id: "SUB-0005", problemId: 3, problem: "Longest Substring Without Repeating Characters", verdict: "Wrong Answer", language: "Python", runtime: "—", memory: "—", date: "2026-10-27 09:45:18" },
  { id: "SUB-0006", problemId: 9, problem: "Invert Binary Tree", verdict: "Accepted", language: "Python", runtime: "32 ms", memory: "14.2 MB", date: "2026-10-26 16:11:05" },
  { id: "SUB-0007", problemId: 14, problem: "House Robber", verdict: "Accepted", language: "C++", runtime: "0 ms", memory: "7.4 MB", date: "2026-10-25 21:03:44" },
  { id: "SUB-0008", problemId: 10, problem: "Coin Change", verdict: "Time Limit Exceeded", language: "Java", runtime: ">2000 ms", memory: "—", date: "2026-10-24 13:28:59" },
  { id: "SUB-0009", problemId: 4, problem: "Merge Intervals", verdict: "Wrong Answer", language: "Python", runtime: "—", memory: "—", date: "2026-10-23 10:17:32" },
  { id: "SUB-0010", problemId: 7, problem: "Climbing Stairs", verdict: "Compile Error", language: "Java", runtime: "—", memory: "—", date: "2026-10-22 08:55:21" },
  { id: "SUB-0011", problemId: 1, problem: "Two Sum", verdict: "Wrong Answer", language: "C++", runtime: "—", memory: "—", date: "2026-11-01 19:58:04" },
  { id: "SUB-0012", problemId: 5, problem: "Binary Search", verdict: "Accepted", language: "Python", runtime: "36 ms", memory: "13.9 MB", date: "2026-10-29 10:50:15" },
  { id: "SUB-0013", problemId: 16, problem: "Trapping Rain Water", verdict: "Memory Limit Exceeded", language: "Java", runtime: "—", memory: ">256 MB", date: "2026-10-20 14:36:08" },
  { id: "SUB-0014", problemId: 8, problem: "Number of Islands", verdict: "Wrong Answer", language: "C++", runtime: "—", memory: "—", date: "2026-10-18 17:49:55" },
  { id: "SUB-0015", problemId: 2, problem: "Valid Parentheses", verdict: "Accepted", language: "Python", runtime: "28 ms", memory: "13.6 MB", date: "2026-10-30 14:10:30" },
];

export const VERDICTS = ["All", "Accepted", "Wrong Answer", "Time Limit Exceeded", "Memory Limit Exceeded", "Compile Error"];
export const LANGUAGES = ["All", "C++", "Java", "Python"];

export const getVerdictClass = (verdict) => {
  switch (verdict) {
    case "Accepted": return "verdict-ac";
    case "Wrong Answer": return "verdict-wa";
    case "Time Limit Exceeded": return "verdict-tle";
    case "Memory Limit Exceeded": return "verdict-mle";
    case "Compile Error": return "verdict-ce";
    default: return "verdict-ce";
  }
};

export const getVerdictShort = (verdict) => {
  switch (verdict) {
    case "Accepted": return "AC";
    case "Wrong Answer": return "WA";
    case "Time Limit Exceeded": return "TLE";
    case "Memory Limit Exceeded": return "MLE";
    case "Compile Error": return "CE";
    default: return verdict;
  }
};
