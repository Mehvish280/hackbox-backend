const Path = require("./models/Path");        // ✅ Correct
const SubTopic = require("./models/SubTopic");
const Theory = require("./models/Theory");
const Quiz = require("./models/Quiz");

async function seedDatabase() {
  const pathCount = await Path.countDocuments();

  if (pathCount > 0) {
    console.log("Data already exists. Skipping seeding.");
    return;
  }

  console.log("Seeding Ethical Hacking data...");

  // 1️⃣ Create Main Path
  const ethicalPath = await Path.create({
    title: "Ethical Hacking",
    description: "Learn cybersecurity fundamentals"
  });

  // 2️⃣ Create SubTopics
  const sql = await SubTopic.create({
    pathId: ethicalPath._id,
    title: "SQL Injection Basics",
    readTime: 2
  });

  const xss = await SubTopic.create({
    pathId: ethicalPath._id,
    title: "Cross-Site Scripting (XSS)",
    readTime: 5
  });

  const csrf = await SubTopic.create({
    pathId: ethicalPath._id,
    title: "CSRF Attacks",
    readTime: 5
  });

  // 3️⃣ Add Theory
  await Theory.create([
    {
      subTopicId: sql._id,
      content:
        "SQL Injection is a web security vulnerability where attackers manipulate SQL queries by injecting malicious input. It occurs due to lack of input validation. Prevention includes prepared statements and parameterized queries."
    },
    {
      subTopicId: xss._id,
      content:
        "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages viewed by other users. It can steal cookies and session data. Prevention includes output encoding and input sanitization."
    },
    {
      subTopicId: csrf._id,
      content:
        "CSRF (Cross-Site Request Forgery) tricks users into performing unwanted actions on a web application. It exploits authenticated sessions. Prevention includes CSRF tokens and same-site cookies."
    }
  ]);

  // 4️⃣ Add Quiz Questions
  await Quiz.create([
    {
      subTopicId: sql._id,
      question: "What causes SQL Injection?",
      options: [
        "Lack of input validation",
        "Strong passwords",
        "Firewall issues",
        "Encryption failure"
      ],
      correctAnswer: "Lack of input validation",
      difficulty: "easy"
    },
    {
      subTopicId: xss._id,
      question: "What does XSS attack target?",
      options: [
        "User browser",
        "Database",
        "Server hardware",
        "Network cables"
      ],
      correctAnswer: "User browser",
      difficulty: "easy"
    },
    {
      subTopicId: csrf._id,
      question: "How can CSRF be prevented?",
      options: [
        "Using CSRF tokens",
        "Disabling cookies",
        "Removing login",
        "Changing server"
      ],
      correctAnswer: "Using CSRF tokens",
      difficulty: "easy"
    }
  ]);

  console.log("Seeding completed.");
}

module.exports = seedDatabase;