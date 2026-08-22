const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const STUDENTS_DATABASE = {
  "student-a": {
    id: "student-a",
    name: "Alex Johnson",
    question: "What is 2/3 + 1/3?",
    answer: "3/6",
    reasoning: "I added the numerator and denominator separately: (2+1)/(3+3) = 3/6.",
    diagnosisType: "Procedural / Rule Application Error",
    rootCause: "Over-generalization of whole-number addition rules to fractions.",
    misconception: "Independent Numerator/Denominator Addition",
    confidence: 94
  },
  "student-b": {
    id: "student-b",
    name: "Bianca Vance",
    question: "What is 2/3 + 1/3?",
    answer: "3/6",
    reasoning: "I thought fractions are added by combining top and bottom numbers.",
    diagnosisType: "Conceptual Misconception",
    rootCause: "Lack of part-whole ratio mental model.",
    misconception: "Additive Fraction Whole Model Deficit",
    confidence: 92
  },
  "student-c": {
    id: "student-c",
    name: "Chris Miller",
    question: "What is 2/3 + 1/3?",
    answer: "3/6",
    reasoning: "I understood the rule but accidentally calculated the denominator incorrectly.",
    diagnosisType: "Calculation / Execution Error",
    rootCause: "Executive function lapse during multi-step addition.",
    misconception: "Arithmetic Denominator Multiplicative Slop",
    confidence: 96
  }
};

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip'
};

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API Routes
  if (req.url.startsWith('/api/analyze') && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body); } catch (e) {}
      const studentKey = parsed.studentId || 'student-a';
      const student = STUDENTS_DATABASE[studentKey] || STUDENTS_DATABASE['student-a'];
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        studentId: student.id,
        diagnosisType: student.diagnosisType,
        misconception: student.misconception,
        rootCause: student.rootCause,
        confidence: student.confidence
      }));
    });
    return;
  }

  if (req.url.startsWith('/api/student/')) {
    const id = req.url.split('/')[3];
    const student = STUDENTS_DATABASE[id] || STUDENTS_DATABASE['student-a'];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, student }));
    return;
  }

  // Static File Serving
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  filePath = filePath.split('?')[0];

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/html';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'index.html'), (err2, indexContent) => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(indexContent, 'utf-8');
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  PERE - Personalized Education Reasoning Engine`);
  console.log(`  Running on http://localhost:${PORT}`);
  console.log(`  Zero-Dependency Server Ready!`);
  console.log(`====================================================`);
});
