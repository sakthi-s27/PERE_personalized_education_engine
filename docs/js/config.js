/* PERE Data Configuration & Misconception Taxonomy */

const PERE_CONFIG = {
  learningDomains: {
    fractions: { label: 'Fractions', samplePrompt: 'What is 2/3 + 1/3?', coreSkill: 'Part-to-whole + common-denominator reasoning' },
    algebra: { label: 'Algebra', samplePrompt: 'Solve 2x + 3 = 11 and explain each operation.', coreSkill: 'Equality preservation + symbolic reasoning' },
    reasoning: { label: 'Reasoning', coreSkill: 'Explain the method, not only the result' },
    concept: { label: 'Concept', coreSkill: 'Build a correct mental model' },
    learning: { label: 'Learning', coreSkill: 'Follow an adaptive intervention path' },
    mastery: { label: 'Mastery', coreSkill: 'Demonstrate transfer across new problems' }
  },
  question: {
    title: "Fraction Addition Concept Check",
    prompt: "What is 2/3 + 1/3?",
    correctAnswer: "3/3 (or 1)",
    universalWrongAnswer: "3/6"
  },
  
  students: {
    "student-a": {
      id: "student-a",
      name: "Student A (Alex)",
      tagline: "Rule Application Error",
      answer: "3/6",
      reasoning: "I added the numerator and denominator separately: (2+1)/(3+3) = 3/6.",
      diagnosisType: "Procedural / Rule Application Error",
      misconception: "Independent Numerator & Denominator Addition",
      rootCause: "Over-generalizing standard whole-number addition rules directly onto fractional components without considering unit whole constraints.",
      evidence: "Explanation reveals student treats numerators and denominators as independent, uncoupled integers.",
      confidence: 94,
      badgeColor: "border-glow-cyan",
      radarData: [
        { subject: 'Concept', score: 55 },
        { subject: 'Formula Application', score: 41 },
        { subject: 'Calculation', score: 91 },
        { subject: 'Reasoning', score: 60 },
        { subject: 'Transfer', score: 48 },
        { subject: 'Problem Solving', score: 50 }
      ],
      nodes3d: [
        { id: "concept", label: "Fraction Addition", type: "concept", color: 0x38bdf8 },
        { id: "understanding", label: "Separate Numerators & Denominators", type: "understanding", color: 0xfbbf24 },
        { id: "mental_model", label: "Whole Number Addition Rule", type: "mental", color: 0xf97316 },
        { id: "observed_error", label: "Answer: 3/6", type: "error", color: 0xf43f5e },
        { id: "root_cause", label: "Procedural Over-generalization", type: "root", color: 0xc084fc },
        { id: "intervention", label: "Visual Fraction Quantities Drill", type: "intervention", color: 0x34d399 }
      ],
      learningPath: [
        { step: 1, title: "Visual Fraction Quantities", type: "Concept Review", time: "5 min", status: "Active", reason: "Remediates isolated number perception" },
        { step: 2, title: "Why Denominators Represent Slice Sizes", type: "Visual Explanation", time: "8 min", status: "Upcoming", reason: "Establishes unit invariant principle" },
        { step: 3, title: "Common-Denominator Addition Rules", type: "Guided Example", time: "10 min", status: "Upcoming", reason: "Provides correct step-by-step procedure" },
        { step: 4, title: "Targeted Rule Drills", type: "Targeted Practice", time: "12 min", status: "Upcoming", reason: "Solidifies proper numerator addition" },
        { step: 5, title: "Multi-Denominator Challenge", type: "Challenge", time: "15 min", status: "Upcoming", reason: "Pushes transfer to new problems" },
        { step: 6, title: "Mastery Verification Check", type: "Mastery Check", time: "10 min", status: "Upcoming", reason: "Confirms misconception elimination" }
      ],
      practiceQuestion: {
        id: "q-a1",
        question: "Calculate: 3/8 + 2/8",
        options: [
          { text: "5/16", isCorrect: false, feedback: "Incorrect. You added the denominators (8+8=16). Remember: denominator stays 8!" },
          { text: "5/8", isCorrect: true, feedback: "Correct! You kept the common denominator 8 and added 3+2=5." },
          { text: "6/8", isCorrect: false, feedback: "Incorrect. Check your numerator addition (3+2=5)." },
          { text: "5/64", isCorrect: false, feedback: "Incorrect. Do not multiply denominators when adding fractions." }
        ]
      },
      beforeAfter: {
        beforeMastery: 48,
        afterMastery: 88,
        beforeAccuracy: 42,
        afterAccuracy: 92,
        riskBefore: "HIGH",
        riskAfter: "LOW"
      },
      subjects: { fractions: 55, algebra: 46, reasoning: 60, concept: 55, learning: 58, mastery: 48 }
    },

    "student-b": {
      id: "student-b",
      name: "Student B (Bianca)",
      tagline: "Conceptual Misconception",
      answer: "3/6",
      reasoning: "I thought fractions are added by combining top and bottom numbers into a new total fraction.",
      diagnosisType: "Conceptual Misconception",
      misconception: "Additive Fraction Whole Model Deficit",
      rootCause: "Absence of a part-to-whole ratio mental model; student perceives a fraction as two unrelated stacked digits rather than a single unified quantity.",
      evidence: "Explanation proves student lacks intuitive spatial/ratio understanding of fraction values.",
      confidence: 92,
      badgeColor: "border-glow-amber",
      radarData: [
        { subject: 'Concept', score: 32 },
        { subject: 'Formula Application', score: 62 },
        { subject: 'Calculation', score: 85 },
        { subject: 'Reasoning', score: 40 },
        { subject: 'Transfer', score: 35 },
        { subject: 'Problem Solving', score: 42 }
      ],
      nodes3d: [
        { id: "concept", label: "Fraction Addition", type: "concept", color: 0x38bdf8 },
        { id: "understanding", label: "Stacked Digits Perception", type: "understanding", color: 0xfbbf24 },
        { id: "mental_model", label: "Ratio Model Missing", type: "mental", color: 0xf97316 },
        { id: "observed_error", label: "Answer: 3/6", type: "error", color: 0xf43f5e },
        { id: "root_cause", label: "Conceptual Model Deficit", type: "root", color: 0xc084fc },
        { id: "intervention", label: "Interactive Pie Partitioning", type: "intervention", color: 0x34d399 }
      ],
      learningPath: [
        { step: 1, title: "Interactive Fraction Pie Models", type: "Concept Review", time: "7 min", status: "Active", reason: "Builds intuitive spatial ratio intuition" },
        { step: 2, title: "Part-to-Whole Ratio Fundamentals", type: "Visual Explanation", time: "10 min", status: "Upcoming", reason: "Connects slices to mathematical notation" },
        { step: 3, title: "Combining Equal-Sized Slices", type: "Guided Example", time: "8 min", status: "Upcoming", reason: "Visualizes physical slice addition" },
        { step: 4, title: "Visual Fraction Sum Matching", type: "Targeted Practice", time: "10 min", status: "Upcoming", reason: "Reinforces visual to numerical mapping" },
        { step: 5, title: "Real-World Pizza/Bar Partitioning", type: "Challenge", time: "12 min", status: "Upcoming", reason: "Validates conceptual understanding" },
        { step: 6, title: "Conceptual Mastery Check", type: "Mastery Check", time: "10 min", status: "Upcoming", reason: "Ensures complete mental model update" }
      ],
      practiceQuestion: {
        id: "q-b1",
        question: "If you take 2 slices of a 5-slice pizza (2/5) and add 1 more slice (1/5), what fraction of the pizza do you have?",
        options: [
          { text: "3/10 of a pizza", isCorrect: false, feedback: "Incorrect. The pizza is still sliced into 5 parts, not 10." },
          { text: "3/5 of a pizza", isCorrect: true, feedback: "Correct! You have 3 slices out of 5 total slices (3/5)." },
          { text: "2/10 of a pizza", isCorrect: false, feedback: "Incorrect. You added slices, so the numerator must increase." },
          { text: "1 whole pizza", isCorrect: false, feedback: "Incorrect. 3 slices out of 5 is less than a full pizza (5/5)." }
        ]
      },
      beforeAfter: {
        beforeMastery: 34,
        afterMastery: 84,
        beforeAccuracy: 38,
        afterAccuracy: 89,
        riskBefore: "HIGH",
        riskAfter: "LOW"
      },
      subjects: { fractions: 32, algebra: 52, reasoning: 40, concept: 32, learning: 44, mastery: 34 }
    },

    "student-c": {
      id: "student-c",
      name: "Student C (Chris)",
      tagline: "Calculation Error",
      answer: "3/6",
      reasoning: "I understood the rule that denominators must stay the same, but accidentally calculated the denominator incorrectly while writing.",
      diagnosisType: "Calculation / Execution Error",
      misconception: "Arithmetic Denominator Multiplicative Slop",
      rootCause: "Executive function processing lapse during multi-step fraction addition despite possessing correct underlying mental model.",
      evidence: "Student explicitly verbalized correct denominator retention rule, demonstrating conceptual mastery with execution failure.",
      confidence: 96,
      badgeColor: "border-glow-purple",
      radarData: [
        { subject: 'Concept', score: 88 },
        { subject: 'Formula Application', score: 84 },
        { subject: 'Calculation', score: 45 },
        { subject: 'Reasoning', score: 89 },
        { subject: 'Transfer', score: 82 },
        { subject: 'Problem Solving', score: 78 }
      ],
      nodes3d: [
        { id: "concept", label: "Fraction Addition", type: "concept", color: 0x38bdf8 },
        { id: "understanding", label: "Correct Denominator Rule", type: "understanding", color: 0x34d399 },
        { id: "mental_model", label: "Proper Part-Whole Model", type: "mental", color: 0x38bdf8 },
        { id: "observed_error", label: "Answer: 3/6", type: "error", color: 0xf43f5e },
        { id: "root_cause", label: "Calculation Execution Slip", type: "root", color: 0xc084fc },
        { id: "intervention", label: "Verification & Self-Check Drills", type: "intervention", color: 0x38bdf8 }
      ],
      learningPath: [
        { step: 1, title: "Double-Check Verification Strategies", type: "Strategy Review", time: "4 min", status: "Active", reason: "Prevents execution slips" },
        { step: 2, title: "Denominator Retention Rule Drill", type: "Refresher", time: "5 min", status: "Upcoming", reason: "Quick memory lock" },
        { step: 3, title: "Precision Calculation Drills", type: "Guided Example", time: "8 min", status: "Upcoming", reason: "Improves step recording accuracy" },
        { step: 4, title: "Timed Verification Challenges", type: "Targeted Practice", time: "10 min", status: "Upcoming", reason: "Builds mental stamina" },
        { step: 5, title: "Multi-Step Logic Check", type: "Challenge", time: "10 min", status: "Upcoming", reason: "Verifies high-level problem solving" },
        { step: 6, title: "Precision Mastery Check", type: "Mastery Check", time: "8 min", status: "Upcoming", reason: "Confirms 0 execution slips" }
      ],
      practiceQuestion: {
        id: "q-c1",
        question: "Solve with explicit verification: 4/7 + 2/7",
        options: [
          { text: "6/14", isCorrect: false, feedback: "Watch out! You doubled the denominator 7 into 14 by accident." },
          { text: "6/7", isCorrect: true, feedback: "Perfect! Kept denominator 7 and added 4+2=6 correctly." },
          { text: "8/7", isCorrect: false, feedback: "Incorrect numerator calculation (4+2=6)." },
          { text: "6/49", isCorrect: false, feedback: "Do not square denominators." }
        ]
      },
      beforeAfter: {
        beforeMastery: 72,
        afterMastery: 96,
        beforeAccuracy: 65,
        afterAccuracy: 98,
        riskBefore: "MEDIUM",
        riskAfter: "LOW"
      },
      subjects: { fractions: 88, algebra: 76, reasoning: 89, concept: 88, learning: 86, mastery: 72 }
    }
  },

  researchData: {
    title: "Scientific Research Foundation",
    sections: [
      {
        title: "Intelligent Tutoring Systems (ITS)",
        content: "Traditional Intelligent Tutoring Systems rely on standard rule-matching engines that evaluate final binary correctness (Right vs Wrong). PERE advances ITS literature by implementing deep cognitive reasoning analysis."
      },
      {
        title: "Misconception Taxonomy & Cognitive Diagnosis",
        content: "Based on cognitive diagnosis models (CDM), misconceptions stem from faulty internal mental representations. Evaluating verbalized reasoning unlocks root cause identification unavailable through multiple-choice telemetry alone."
      },
      {
        title: "LLM Pedagogical Reasoning",
        content: "Modern Large Language Models possess emergent pedagogical zero-shot reasoning capabilities. PERE constrains LLM output into structured, verifiable misconception taxonomies with 94%+ diagnostic confidence."
      }
    ]
  },

  architectureSteps: [
    { name: "Student Input", desc: "Question, Answer, Verbalized Reasoning" },
    { name: "Frontend Visual Engine", desc: "Three.js 3D Graph + Recharts Telemetry" },
    { name: "Reasoning Engine API", desc: "Express Gateway & Prompt Pipeline" },
    { name: "LLM / Diagnostic Classifier", desc: "Cognitive Error Pattern Matcher" },
    { name: "Personalization Engine", desc: "Fingerprint Radar & Root Cause Mapping" },
    { name: "Learning Path Generator", desc: "Adaptive 6-Step Pedagogical Roadmap" },
    { name: "Adaptive Practice Engine", desc: "Dynamic Difficulty Calibration" },
    { name: "Mastery Evaluation", desc: "Closed-Loop Progress Re-evaluation" }
  ]
};
