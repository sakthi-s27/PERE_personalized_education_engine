# PERE - Personalized Education Reasoning Engine

> **"SAME ANSWER. DIFFERENT MIND."**
> *"We don't just detect wrong answers. We understand the wrong thinking behind them."*

![PERE Banner](https://img.shields.bg/badge/AI-Reasoning_Engine-06b6d4?style=for-the-badge)
![Hackathon](https://img.shields.bg/badge/Hackathon-Winner_Edition-3b82f6?style=for-the-badge)
![ThreeJS](https://img.shields.bg/badge/3D-Three.js-a855f7?style=for-the-badge)

---

## 🌟 Vision & Problem Statement

Two students can give the exact same incorrect answer for completely different cognitive reasons.

### Traditional Systems
`Student Answer` &rarr; ❌ **Wrong Answer** &rarr; *"Try Again"*

### PERE System
`Student Question` &rarr; `Student Answer` &rarr; `Student Reasoning` &rarr; `Reasoning Analysis` &rarr; `Misconception Detection` &rarr; `Root Cause` &rarr; `Personalized Explanation` &rarr; `Adaptive Learning Path` &rarr; `Targeted Practice` &rarr; `Re-evaluation` &rarr; **Mastery**

---

## 🚀 Key Features

1. **Futuristic AI Education Laboratory UI**:
   - Immersive 12-section single-page scrolling storytelling experience.
   - Deep space dark aesthetic (`#07090E`), frosted glassmorphism, glowing neon cyan/purple accents, and smooth section parallax transitions.

2. **Interactive 3D Neural Environment**:
   - Built with **Three.js**, featuring floating neural network nodes, dynamic line connections, floating mathematical symbols (`∑`, `π`, `∫`, `½`), and scroll-reactive camera movement.

3. **Core Student Demo ("SAME ANSWER. DIFFERENT MIND.")**:
   - Universal Question: *"What is 2/3 + 1/3?"* | Universal Incorrect Answer: `"3/6"`.
   - **Student A (Alex)**: *"Added numerator & denominator separately"* &rarr; **Procedural Rule Error**.
   - **Student B (Bianca)**: *"Combined top & bottom numbers into new fraction"* &rarr; **Conceptual Model Deficit**.
   - **Student C (Chris)**: *"Understood rule, made execution slip"* &rarr; **Calculation Error**.
   - Real-time updates to 3D misconception topology, radar fingerprint, learning path, and practice questions upon student selection.

4. **Live AI Reasoning Telemetry**:
   - Simulated/Live AI diagnostic console streaming step-by-step cognitive analysis (`Analyzing reasoning` &rarr; `Matching taxonomy` &rarr; `Diagnosing root cause` &rarr; `Confidence 94%`).

5. **3D Misconception Node Topology Map**:
   - Connected 3D nodes (`Concept` &rarr; `Understanding` &rarr; `Mental Model` &rarr; `Observed Error` &rarr; `Root Cause` &rarr; `Intervention`) with mouse drag, zoom, hover labels, and detail modals.

6. **Misconception Fingerprint Radar**:
   - 6-axis spider chart highlighting exact cognitive bottlenecks.

7. **Adaptive Practice & Learning Path Roadmap**:
   - 6-step personalized pedagogical path with dynamic difficulty calibration (`Easy` &rarr; `Medium` &rarr; `Hard`).

8. **Student & Teacher Intelligence Dashboards**:
   - Mastery progress line chart, streak counters, and class misconception heatmaps.

9. **Judge-Ready Demo Auto-Play Mode**:
   - Single-click **ENTER DEMO MODE** that cycles through Student A, B, and C with progress badges (`DEMO 1 / 3`), optimized for 3-minute hackathon judging.

---

## 🛠️ Quick Start (Run Locally in VS Code)

### Option 1: Double-Click Startup
Double click `start.bat` (Windows CMD) or `start.ps1` (PowerShell).

### Option 2: Command Line
```bash
# Run backend server
node server.js

# Or python web server
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## 📦 Package ZIP Download
Run:
```bash
python zip_project.py
```
This generates `pere_hackathon_project.zip` in the root folder.

---

## 🧠 AI Architecture

```
Student Reasoning
       │
       ▼
Express API Gateway (/api/analyze)
       │
       ▼
Misconception Classifier Engine
       │
       ▼
Cognitive Diagnostic Model (94% Confidence)
       │
       ▼
Personalized Learning Path & Adaptive Drills
```

---

## 📜 Research Foundation
- **Intelligent Tutoring Systems (ITS)**: Extends rule-based systems into verbalized reasoning analysis.
- **Cognitive Diagnosis Models (CDM)**: Maps observed errors to internal mental representation flaws.
- **LLM Pedagogical Reasoning**: Constrains Generative AI into structured educational taxonomies.


## 🧭 Student Mode — What to Do

When you open the project as a student, follow this exact flow:

1. **Choose a learning domain** — use the top pills for **Fractions, Algebra, Reasoning, Concept, Learning, Mastery**.
2. **Start the diagnostic** — the core Fraction demo shows three students with the same wrong answer but different reasoning.
3. **Show your thinking** — read the reasoning evidence and trigger the AI re-analysis.
4. **Inspect the diagnosis** — see misconception type, root cause, evidence and confidence.
5. **Open the 3D map** — drag to rotate, scroll to zoom, and hover/click nodes to understand the cognitive pathway.
6. **Follow the learning path** — complete the six recommended intervention steps.
7. **Try adaptive practice** — correct answers increase difficulty; wrong answers trigger remediation.
8. **Check mastery** — compare before/after metrics and return to re-evaluation until the misconception is resolved.

### Algebra sample

The Algebra domain uses a reasoning prompt such as:

> Solve `2x + 3 = 11` and explain why you subtract 3 before dividing by 2.

This demonstrates that the same PERE reasoning framework can be extended beyond fractions.

## 🧠 What Makes the Demo Stronger in v2

- **Student Start Guide** makes the workflow obvious for first-time users.
- **Interactive domain pills** turn Fractions / Algebra / Reasoning / Concept / Learning / Mastery into meaningful exploration controls.
- **Data-driven 3D cognitive graph** now includes Concept, Understanding, Mental Model, Observed Error, Root Cause, Intervention, Recurrence Risk and Mastery Check.
- **Animated data-flow particles** visually communicate movement from diagnosis to intervention and mastery.
- **Closed Learning Loop** shows Diagnose → Teach → Practice → Re-evaluate → Mastery / Different Intervention.
- **Traditional AI vs PERE** makes the innovation immediately understandable to judges.

## 🏆 3-Minute Judge Demo

1. Start at **SAME ANSWER. DIFFERENT MIND.**
2. Select **Student A**, trigger AI analysis, then inspect the 3D graph.
3. Select **Student B** and point out that the answer is still `3/6`, but the misconception and intervention changed.
4. Select **Student C** and show that a calculation slip should not receive the same remediation as a conceptual error.
5. Show the **Cognitive Fingerprint** and **Personalized Learning Path**.
6. Run one **Adaptive Practice** question.
7. Finish with **Before vs After** and the **Closed Learning Loop**.
8. End on the line: **“Most AI tutors evaluate answers. PERE evaluates understanding.”**

## 🗣️ Judge Explanation Points

- **Problem:** A wrong answer does not explain why a student is wrong.
- **Key insight:** The same wrong answer can come from different mental models.
- **Innovation:** PERE analyzes the student's reasoning evidence before choosing remediation.
- **Misconception fingerprint:** The system tracks multiple learning dimensions to locate the bottleneck.
- **Personalization:** Different root causes produce different learning paths.
- **Adaptive loop:** Practice difficulty and intervention change according to new evidence.
- **Measurable outcome:** The system checks whether the misconception is actually resolved.
- **Visualization:** The 3D map turns an abstract cognitive pipeline into an explorable graph.
- **Teacher value:** Class-level misconception heatmaps help educators see where intervention is needed.
- **Scalability:** The current demo focuses on fractions and includes an Algebra sample to show the taxonomy can extend to additional concepts.

## ⚠️ Demo Honesty

The current browser demo uses structured local data and simulated diagnostic telemetry so the experience works without external model credentials. Do not claim that the local demo is training or running a production LLM unless you connect an actual model/API.
