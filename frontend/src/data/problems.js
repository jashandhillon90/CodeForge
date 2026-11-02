// problems.js — sample frontend demo data

export const PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    acceptance: 72.4,
    solved: true,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    inputFormat: "An array of integers `nums` and an integer `target`.",
    outputFormat: "Return indices of the two numbers that add up to target as an array of two integers.",
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]." },
    ],
    tags: ["Array", "Hash Table"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your solution here\n        pass`,
    },
    testCases: [
      { input: "[2,7,11,15]\n9", expectedOutput: "[0,1]" },
      { input: "[3,2,4]\n6", expectedOutput: "[1,2]" },
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stack",
    acceptance: 68.1,
    solved: true,
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
- Open brackets must be closed by the same type of brackets.
- Open brackets must be closed in the correct order.
- Every close bracket has a corresponding open bracket of the same type.`,
    inputFormat: "A string `s` consisting of parentheses characters.",
    outputFormat: "Return `true` if the string is valid, `false` otherwise.",
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'."],
    examples: [
      { input: 's = "()"', output: "true", explanation: "Matching parentheses." },
      { input: 's = "()[]{}"', output: "true", explanation: "All brackets match." },
      { input: 's = "(]"', output: "false", explanation: "Mismatched brackets." },
    ],
    tags: ["String", "Stack"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n        \n    }\n};`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your solution here\n        pass`,
    },
    testCases: [
      { input: "()", expectedOutput: "true" },
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" },
    ]
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 55.3,
    solved: false,
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    inputFormat: "A string `s`.",
    outputFormat: "Return the length of the longest substring without repeating characters.",
    constraints: ["0 ≤ s.length ≤ 5 × 10⁴", "s consists of English letters, digits, symbols and spaces."],
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with the length of 1.' },
    ],
    tags: ["Hash Table", "String", "Sliding Window"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};`,
      java: `class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        pass`,
    },
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "pwwkew", expectedOutput: "3" },
    ]
  },
  {
    id: 4,
    title: "Merge Intervals",
    difficulty: "Medium",
    topic: "Arrays",
    acceptance: 48.7,
    solved: false,
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    inputFormat: "Array of intervals `intervals` where `intervals[i] = [starti, endi]`.",
    outputFormat: "Array of merged non-overlapping intervals.",
    constraints: ["1 ≤ intervals.length ≤ 10⁴", "intervals[i].length == 2", "0 ≤ starti ≤ endi ≤ 10⁴"],
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Intervals [1,3] and [2,6] overlap and merge to [1,6]." },
    ],
    tags: ["Array", "Sorting"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}`,
      python: `class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        pass`,
    },
    testCases: [{ input: "[[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]" }]
  },
  {
    id: 5,
    title: "Binary Search",
    difficulty: "Easy",
    topic: "Binary Search",
    acceptance: 78.2,
    solved: true,
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.`,
    inputFormat: "Sorted array `nums` and integer `target`.",
    outputFormat: "Index of target or -1.",
    constraints: ["1 ≤ nums.length ≤ 10⁴", "-10⁴ < nums[i], target < 10⁴", "All integers in nums are unique.", "nums is sorted in ascending order."],
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4." },
    ],
    tags: ["Array", "Binary Search"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`,
      python: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass`,
    },
    testCases: [{ input: "[-1,0,3,5,9,12]\n9", expectedOutput: "4" }]
  },
  {
    id: 6,
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    acceptance: 61.5,
    solved: true,
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    inputFormat: "Integer array `nums`.",
    outputFormat: "Maximum subarray sum.",
    constraints: ["1 ≤ nums.length ≤ 10⁵", "-10⁴ ≤ nums[i] ≤ 10⁴"],
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
    ],
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}`,
      python: `class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass`,
    },
    testCases: [{ input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" }]
  },
  {
    id: 7,
    title: "Climbing Stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    acceptance: 82.1,
    solved: false,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    inputFormat: "Integer `n`.",
    outputFormat: "Number of distinct ways to climb to the top.",
    constraints: ["1 ≤ n ≤ 45"],
    examples: [
      { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step. 2. 2 steps." },
      { input: "n = 3", output: "3", explanation: "1. 1+1+1. 2. 1+2. 3. 2+1." },
    ],
    tags: ["Math", "Dynamic Programming", "Memoization"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}`,
      python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass`,
    },
    testCases: [{ input: "3", expectedOutput: "3" }, { input: "5", expectedOutput: "8" }]
  },
  {
    id: 8,
    title: "Number of Islands",
    difficulty: "Medium",
    topic: "Graphs",
    acceptance: 59.3,
    solved: false,
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    inputFormat: "2D grid of '1's and '0's.",
    outputFormat: "Number of islands.",
    constraints: ["m == grid.length", "n == grid[i].length", "1 ≤ m, n ≤ 300", "grid[i][j] is '0' or '1'."],
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
    ],
    tags: ["Array", "DFS", "BFS", "Graph"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}`,
      python: `class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        pass`,
    },
    testCases: []
  },
  {
    id: 9,
    title: "Invert Binary Tree",
    difficulty: "Easy",
    topic: "Trees",
    acceptance: 75.6,
    solved: true,
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    inputFormat: "Root of a binary tree.",
    outputFormat: "Root of the inverted binary tree.",
    constraints: ["Number of nodes in the tree is in the range [0, 100].", "-100 ≤ Node.val ≤ 100"],
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
    ],
    tags: ["Tree", "DFS", "BFS", "Binary Tree"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        \n    }\n};`,
      java: `class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        \n    }\n}`,
      python: `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        pass`,
    },
    testCases: []
  },
  {
    id: 10,
    title: "Coin Change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    acceptance: 43.8,
    solved: false,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.`,
    inputFormat: "Array `coins` and integer `amount`.",
    outputFormat: "Minimum number of coins or -1.",
    constraints: ["1 ≤ coins.length ≤ 12", "1 ≤ coins[i] ≤ 2³¹ - 1", "0 ≤ amount ≤ 10⁴"],
    examples: [
      { input: "coins = [1,5,10,25], amount = 41", output: "4", explanation: "25 + 10 + 5 + 1 = 41" },
    ],
    tags: ["Array", "Dynamic Programming", "BFS"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}`,
      python: `class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        pass`,
    },
    testCases: [{ input: "[1,5,10,25]\n41", expectedOutput: "4" }]
  },
  {
    id: 11,
    title: "Reverse Linked List",
    difficulty: "Easy",
    topic: "Arrays",
    acceptance: 80.3,
    solved: false,
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    inputFormat: "Head of a linked list.",
    outputFormat: "Head of the reversed linked list.",
    constraints: ["Number of nodes is in [0, 5000].", "-5000 ≤ Node.val ≤ 5000"],
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
    ],
    tags: ["Linked List", "Recursion"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}`,
      python: `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
    },
    testCases: []
  },
  {
    id: 12,
    title: "Word Search",
    difficulty: "Medium",
    topic: "Graphs",
    acceptance: 41.2,
    solved: false,
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.`,
    inputFormat: "2D character board and string word.",
    outputFormat: "Boolean indicating if word exists.",
    constraints: ["m == board.length", "n == board[i].length", "1 ≤ m, n ≤ 6", "1 ≤ word.length ≤ 15"],
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
    ],
    tags: ["Array", "Backtracking", "Matrix"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        \n    }\n};`,
      java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        \n    }\n}`,
      python: `class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        pass`,
    },
    testCases: []
  },
  {
    id: 13,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topic: "Strings",
    acceptance: 36.8,
    solved: false,
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.`,
    inputFormat: "String `s`.",
    outputFormat: "Longest palindromic substring.",
    constraints: ["1 ≤ s.length ≤ 1000", "s consists of only digits and English letters."],
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
    ],
    tags: ["String", "Dynamic Programming"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};`,
      java: `class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}`,
      python: `class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        pass`,
    },
    testCases: [{ input: "babad", expectedOutput: "bab" }]
  },
  {
    id: 14,
    title: "House Robber",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    acceptance: 51.3,
    solved: true,
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    inputFormat: "Integer array `nums`.",
    outputFormat: "Maximum amount that can be robbed.",
    constraints: ["1 ≤ nums.length ≤ 100", "0 ≤ nums[i] ≤ 400"],
    examples: [
      { input: "nums = [2,3,2]", output: "3" },
      { input: "nums = [1,2,3,1]", output: "4" },
    ],
    tags: ["Array", "Dynamic Programming"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}`,
      python: `class Solution:\n    def rob(self, nums: List[int]) -> int:\n        pass`,
    },
    testCases: []
  },
  {
    id: 15,
    title: "Course Schedule",
    difficulty: "Medium",
    topic: "Graphs",
    acceptance: 47.6,
    solved: false,
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\`. Return \`true\` if you can finish all courses, \`false\` otherwise.`,
    inputFormat: "`numCourses` and array `prerequisites`.",
    outputFormat: "Boolean whether all courses can be finished.",
    constraints: ["1 ≤ numCourses ≤ 2000", "0 ≤ prerequisites.length ≤ 5000"],
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
    ],
    tags: ["DFS", "BFS", "Graph", "Topological Sort"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};`,
      java: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}`,
      python: `class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        pass`,
    },
    testCases: []
  },
  {
    id: 16,
    title: "Trapping Rain Water",
    difficulty: "Hard",
    topic: "Arrays",
    acceptance: 57.9,
    solved: false,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    inputFormat: "Integer array `height`.",
    outputFormat: "Amount of trapped water.",
    constraints: ["n == height.length", "1 ≤ n ≤ 2 × 10⁴", "0 ≤ height[i] ≤ 10⁵"],
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
    ],
    tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack", "Monotonic Stack"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        \n    }\n};`,
      java: `class Solution {\n    public int trap(int[] height) {\n        \n    }\n}`,
      python: `class Solution:\n    def trap(self, height: List[int]) -> int:\n        pass`,
    },
    testCases: [{ input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" }]
  },
  {
    id: 17,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topic: "Binary Search",
    acceptance: 39.1,
    solved: false,
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).`,
    inputFormat: "Two sorted arrays `nums1` and `nums2`.",
    outputFormat: "Median value as a float.",
    constraints: ["nums1.length == m", "nums2.length == n", "0 ≤ m, n ≤ 1000", "1 ≤ m + n ≤ 2000"],
    examples: [
      { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" },
    ],
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    starterCode: {
      cpp: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}`,
      python: `class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        pass`,
    },
    testCases: []
  },
  {
    id: 18,
    title: "LRU Cache",
    difficulty: "Hard",
    topic: "Queue",
    acceptance: 42.5,
    solved: false,
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the \`LRUCache\` class with \`get\` and \`put\` operations in O(1) average time complexity.`,
    inputFormat: "Sequence of get/put operations on LRUCache.",
    outputFormat: "Results of get operations (-1 if key doesn't exist).",
    constraints: ["1 ≤ capacity ≤ 3000", "0 ≤ key ≤ 10⁴", "0 ≤ value ≤ 10⁵"],
    examples: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)', output: "[null,null,null,1,null,-1]" },
    ],
    tags: ["Hash Table", "Linked List", "Design"],
    starterCode: {
      cpp: `class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    \n    int get(int key) {\n        \n    }\n    \n    void put(int key, int value) {\n        \n    }\n};`,
      java: `class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    \n    public int get(int key) {\n        \n    }\n    \n    public void put(int key, int value) {\n        \n    }\n}`,
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: None) -> None:\n        pass`,
    },
    testCases: []
  },
  {
    id: 19,
    title: "Greedy Activity Selection",
    difficulty: "Easy",
    topic: "Greedy",
    acceptance: 69.2,
    solved: false,
    description: `Given \`n\` activities with their start and finish times, select the maximum number of activities that can be performed by a single person, assuming the person can only work on a single activity at a time.`,
    inputFormat: "Arrays `start` and `end` of size `n` representing activity intervals.",
    outputFormat: "Maximum number of non-overlapping activities.",
    constraints: ["1 ≤ n ≤ 10⁵", "0 ≤ start[i] < end[i] ≤ 10⁹"],
    examples: [
      { input: "start = [1,3,0,5,8,5], end = [2,4,6,7,9,9]", output: "4" },
    ],
    tags: ["Array", "Greedy", "Sorting"],
    starterCode: {
      cpp: `int maxActivities(vector<int>& start, vector<int>& end) {\n    \n}`,
      java: `public int maxActivities(int[] start, int[] end) {\n    \n}`,
      python: `def maxActivities(start: List[int], end: List[int]) -> int:\n    pass`,
    },
    testCases: []
  },
  {
    id: 20,
    title: "Find Median in Data Stream",
    difficulty: "Hard",
    topic: "Mathematics",
    acceptance: 53.8,
    solved: false,
    description: `The median is the middle value in an ordered integer list. Implement the \`MedianFinder\` class that supports: adding a number and finding the current median from the data stream.`,
    inputFormat: "Stream of integers via addNum operations.",
    outputFormat: "Median after each call to findMedian.",
    constraints: ["-10⁵ ≤ num ≤ 10⁵", "At most 5 × 10⁴ calls to addNum and findMedian."],
    examples: [
      { input: "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()", output: "1.5, 2.0" },
    ],
    tags: ["Two Pointers", "Sorting", "Heap", "Data Stream"],
    starterCode: {
      cpp: `class MedianFinder {\npublic:\n    MedianFinder() {\n        \n    }\n    void addNum(int num) {\n        \n    }\n    double findMedian() {\n        \n    }\n};`,
      java: `class MedianFinder {\n    public MedianFinder() {\n        \n    }\n    public void addNum(int num) {\n        \n    }\n    public double findMedian() {\n        \n    }\n}`,
      python: `class MedianFinder:\n    def __init__(self):\n        pass\n    def addNum(self, num: int) -> None:\n        pass\n    def findMedian(self) -> float:\n        pass`,
    },
    testCases: []
  },
];

export const TOPICS = ["All", "Arrays", "Strings", "Dynamic Programming", "Trees", "Graphs", "Binary Search", "Greedy", "Stack", "Queue", "Mathematics"];
export const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
