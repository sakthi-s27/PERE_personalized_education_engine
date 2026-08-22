/* PERE - Core Application Controller */

window.PERE_App = (function () {
  let currentStudentKey = 'student-a';

  function initApp() {
    setupNavigation();
    setupStudentCardListeners();
    setupPracticeEngine();
    setupScrollIndicator();
    setupModalListeners();
    setupStudentGuide();
    setupTopicExplorer();
    setupLearningLoopObserver();
    
    // Default initial render
    selectStudent('student-a');

    // Render static canvas charts
    setTimeout(() => {
      if (window.PERE_Charts) {
        PERE_Charts.renderMastery('mastery-area-chart');
      }
    }, 500);
  }

  function selectStudent(studentKey) {
    currentStudentKey = studentKey;
    const studentData = PERE_CONFIG.students[studentKey];
    if (!studentData) return;

    // 1. Highlight Student Card UI
    document.querySelectorAll('.student-card').forEach(card => {
      card.classList.remove('active-student', 'border-glow-cyan', 'border-glow-amber', 'border-glow-purple');
    });

    const activeCard = document.getElementById(`card-${studentKey}`);
    if (activeCard) {
      activeCard.classList.add('active-student', studentData.badgeColor);
    }

    // 2. Trigger AI Telemetry Analysis
    if (window.PERE_AIEngine) {
      PERE_AIEngine.analyzeStudent(studentKey);
    }

    // 3. Update 3D Misconception Map
    if (window.PERE_3DMap) {
      PERE_3DMap.renderForStudent(studentKey);
    }

    // 4. Update Radar Fingerprint Chart
    if (window.PERE_Charts) {
      PERE_Charts.renderRadar('fingerprint-radar-canvas', studentData.radarData);
      document.getElementById('fingerprint-weakest-label').innerText = getWeakestSubject(studentData.radarData);
      document.getElementById('fingerprint-analysis-text').innerText = `Primary bottleneck identified in ${getWeakestSubject(studentData.radarData)} (${studentData.rootCause}).`;
    }

    // 5. Update Learning Path Roadmap
    renderLearningPath(studentData.learningPath);

    // 6. Update Adaptive Practice Question
    renderPracticeQuestion(studentData.practiceQuestion);

    // 7. Update Before vs After Metrics
    renderBeforeAfter(studentData.beforeAfter);

    // 8. Update student-facing learning signals
    renderStudentSignals(studentData);
    updateStudentGuidance(studentData);
  }

  function getWeakestSubject(radarData) {
    let minItem = radarData[0];
    radarData.forEach(item => {
      if (item.score < minItem.score) minItem = item;
    });
    return minItem.subject;
  }


  function renderStudentSignals(studentData) {
    const container = document.getElementById('student-signal-grid');
    if (!container) return;
    const signals = [
      ['fractions', 'Fractions', studentData.subjects.fractions],
      ['algebra', 'Algebra', studentData.subjects.algebra],
      ['reasoning', 'Reasoning', studentData.subjects.reasoning],
      ['concept', 'Concept', studentData.subjects.concept],
      ['learning', 'Learning', studentData.subjects.learning],
      ['mastery', 'Mastery', studentData.subjects.mastery]
    ];
    container.innerHTML = signals.map(([key,label,value]) => `
      <div class="signal-card ${value >= 75 ? 'signal-good' : value >= 50 ? 'signal-mid' : 'signal-risk'}" data-signal-card="${key}">
        <span class="text-[10px] uppercase tracking-wider text-slate-400">${label}</span>
        <strong class="font-heading text-xl text-white">${value}%</strong>
        <div class="signal-track"><span style="width:${value}%"></span></div>
      </div>
    `).join('');

    document.querySelectorAll('.signal-pill').forEach(pill => {
      const key = pill.dataset.signal;
      const value = studentData.subjects[key] || 0;
      pill.title = `${pill.textContent.trim()}: ${value}%`;
      pill.classList.toggle('signal-active', value < 60);
    });
  }

  function updateStudentGuidance(studentData) {
    const current = document.querySelector('.student-guidance-copy');
    if (current) current.innerText = `For ${studentData.name}, PERE prioritizes ${getWeakestSubject(studentData.radarData)} because it is currently the largest learning bottleneck.`;
  }

  function renderLearningPath(pathArray) {
    const container = document.getElementById('learning-path-container');
    if (!container) return;

    container.innerHTML = '';
    pathArray.forEach((step, idx) => {
      const card = document.createElement('div');
      card.className = `glass-panel p-5 relative overflow-hidden transition-all duration-300 ${
        idx === 0 ? 'border-glow-cyan bg-cyan-950/20' : 'opacity-80'
      }`;

      card.innerHTML = `
        <div class="learning-step-rail"></div>
        <div class="flex items-start justify-between mb-2">
          <span class="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-400 font-semibold">STEP ${step.step}</span>
          <span class="text-xs text-slate-400">⏱ ${step.time}</span>
        </div>
        <h4 class="font-heading font-bold text-lg text-white mb-1">${step.title}</h4>
        <div class="text-xs text-cyan-400 font-medium mb-3">${step.type}</div>
        <p class="text-xs text-slate-400 border-t border-slate-800/80 pt-2 font-mono">&gt; Why selected: ${step.reason}</p>
      `;

      container.appendChild(card);
    });
  }

  function renderPracticeQuestion(practice) {
    const questionText = document.getElementById('practice-question-text');
    const optionsContainer = document.getElementById('practice-options-container');
    const feedbackBox = document.getElementById('practice-feedback-box');

    if (questionText) questionText.innerText = practice.question;
    if (feedbackBox) feedbackBox.classList.add('hidden');

    if (optionsContainer) {
      optionsContainer.innerHTML = '';
      practice.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'glass-panel p-4 text-left font-medium text-slate-200 hover:border-cyan-400 hover:text-white transition-all w-full flex items-center justify-between group';
        btn.innerHTML = `
          <span>${opt.text}</span>
          <span class="text-xs font-mono text-slate-500 group-hover:text-cyan-400">[Option ${String.fromCharCode(65 + idx)}]</span>
        `;

        btn.onclick = () => handleAnswerSelect(opt, btn, practice);
        optionsContainer.appendChild(btn);
      });
    }
  }

  function handleAnswerSelect(selectedOpt, clickedBtn, practice) {
    const feedbackBox = document.getElementById('practice-feedback-box');
    const diffBadge = document.getElementById('adaptive-difficulty-badge');

    // Highlight option
    document.querySelectorAll('#practice-options-container button').forEach(b => {
      b.disabled = true;
      b.classList.add('opacity-50');
    });

    clickedBtn.classList.remove('opacity-50');

    if (selectedOpt.isCorrect) {
      clickedBtn.classList.add('border-emerald-500', 'bg-emerald-950/30', 'text-emerald-300');
      if (feedbackBox) {
        feedbackBox.className = 'mt-4 p-4 rounded-xl glass-panel border-glow-emerald bg-emerald-950/20 text-emerald-300 text-sm font-medium';
        feedbackBox.innerHTML = `✅ <strong>Correct!</strong> ${selectedOpt.feedback}`;
        feedbackBox.classList.remove('hidden');
      }
      if (diffBadge) {
        diffBadge.innerText = 'DIFFICULTY: HARD (ADAPTED UP ↑)';
        diffBadge.className = 'badge-pill border-glow-emerald text-emerald-400';
      }
    } else {
      clickedBtn.classList.add('border-rose-500', 'bg-rose-950/30', 'text-rose-300');
      if (feedbackBox) {
        feedbackBox.className = 'mt-4 p-4 rounded-xl glass-panel border-glow-amber bg-amber-950/20 text-amber-300 text-sm font-medium';
        feedbackBox.innerHTML = `⚠️ <strong>Misconception Detected:</strong> ${selectedOpt.feedback}`;
        feedbackBox.classList.remove('hidden');
      }
      if (diffBadge) {
        diffBadge.innerText = 'DIFFICULTY: RE-EXPLANATION (ADAPTED DOWN ↓)';
        diffBadge.className = 'badge-pill border-glow-amber text-amber-400';
      }
    }
  }

  function renderBeforeAfter(ba) {
    animateCounter('metric-before-mastery', 0, ba.beforeMastery, '%');
    animateCounter('metric-after-mastery', 0, ba.afterMastery, '%');
    animateCounter('metric-before-acc', 0, ba.beforeAccuracy, '%');
    animateCounter('metric-after-acc', 0, ba.afterAccuracy, '%');

    const beforeRisk = document.getElementById('metric-before-risk');
    const afterRisk = document.getElementById('metric-after-risk');

    if (beforeRisk) beforeRisk.innerText = ba.riskBefore;
    if (afterRisk) afterRisk.innerText = ba.riskAfter;
  }

  function animateCounter(elemId, start, end, suffix) {
    const elem = document.getElementById(elemId);
    if (!elem) return;
    let curr = start;
    const duration = 1000;
    const stepTime = 30;
    const increment = (end - start) / (duration / stepTime);

    const timer = setInterval(() => {
      curr += increment;
      if ((increment > 0 && curr >= end) || (increment < 0 && curr <= end)) {
        curr = end;
        clearInterval(timer);
      }
      elem.innerText = `${Math.round(curr)}${suffix}`;
    }, stepTime);
  }

  function setupStudentGuide() {
    document.querySelectorAll('[data-scroll-target]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.scrollTarget);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function setupTopicExplorer() {
    const topics = {
      fractions: { title: 'Fractions · Addition & Representation', description: 'Diagnose rule-application errors, part-to-whole confusion, or execution slips before choosing an intervention.', concept: 55, reasoning: 60, mastery: 48 },
      algebra: { title: 'Algebra · Equation Reasoning', description: 'Trace whether the learner loses equality, applies operations inconsistently, or handles symbols as labels rather than quantities.', concept: 63, reasoning: 52, mastery: 54 },
      reasoning: { title: 'Reasoning · Evidence Behind the Answer', description: 'PERE asks for the learner\'s method and uses observable evidence to distinguish a lucky answer from real understanding.', concept: 72, reasoning: 61, mastery: 66 },
      concept: { title: 'Concept · Mental Model Check', description: 'Separate “knows the rule” from “understands why the rule works” using diagnostic explanations and misconception signals.', concept: 69, reasoning: 58, mastery: 62 },
      learning: { title: 'Learning · Personalized Path', description: 'Move through explanation, guided example, targeted practice and transfer based on the diagnosed root cause.', concept: 75, reasoning: 70, mastery: 71 },
      mastery: { title: 'Mastery · Prove the Misconception Is Resolved', description: 'Mastery is not the same as one correct answer. PERE rechecks the pattern across new questions and difficulty levels.', concept: 84, reasoning: 82, mastery: 79 }
    };
    document.querySelectorAll('.topic-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.topic-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const t = topics[pill.dataset.topic] || topics.fractions;
        const set = (id, value) => { const el=document.getElementById(id); if(el) el.textContent=value; };
        set('topic-title', t.title); set('topic-description', t.description);
        set('topic-concept-score', `${t.concept}%`); set('topic-reasoning-score', `${t.reasoning}%`); set('topic-mastery-score', `${t.mastery}%`);
        if (pill.dataset.topic === 'fractions') selectStudent('student-a');
        if (pill.dataset.topic === 'algebra') {
          const algebraHint = document.getElementById('topic-description');
          if (algebraHint) algebraHint.innerHTML = '<strong class="text-cyan-300">Sample diagnostic:</strong> Solve 2x + 3 = 11 and explain why you subtract 3 before dividing by 2.';
        }
      });
    });
  }

  function setupLearningLoopObserver() {
    const loop = document.querySelector('.learning-loop');
    if (!loop || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loop.classList.add('loop-in-view');
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(loop);
  }

  function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  function setupStudentCardListeners() {
    ['student-a', 'student-b', 'student-c'].forEach(key => {
      const elem = document.getElementById(`card-${key}`);
      if (elem) {
        elem.addEventListener('click', () => selectStudent(key));
      }
    });
  }

  function setupPracticeEngine() {
    const triggerBtn = document.getElementById('btn-trigger-ai');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        if (window.PERE_AIEngine) {
          PERE_AIEngine.analyzeStudent(currentStudentKey);
        }
      });
    }
  }

  function setupScrollIndicator() {
    const dots = document.querySelectorAll('.indicator-dot');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
      let currentSectionIdx = 0;
      sections.forEach((sec, idx) => {
        const top = sec.offsetTop - 300;
        if (window.scrollY >= top) {
          currentSectionIdx = idx;
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === currentSectionIdx) dot.classList.add('active');
        else dot.classList.remove('active');
      });
    });
  }

  function setupModalListeners() {
    const modal = document.getElementById('node-detail-modal');
    const closeBtn = document.getElementById('btn-close-modal');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    }
  }

  window.addEventListener('DOMContentLoaded', initApp);

  return {
    selectStudent: selectStudent,
    getCurrentStudent: function () { return currentStudentKey; }
  };
})();
