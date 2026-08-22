/* PERE - Live AI Reasoning Simulation & Telemetry Engine */

window.PERE_AIEngine = (function () {
  let isAnalyzing = false;

  function runReasoningAnalysis(studentKey) {
    if (isAnalyzing) return;
    isAnalyzing = true;

    const studentData = PERE_CONFIG.students[studentKey];
    if (!studentData) return;

    const consoleElem = document.getElementById('ai-telemetry-console');
    const resultBox = document.getElementById('ai-diagnosis-card');
    const analyzeBtn = document.getElementById('btn-trigger-ai');

    if (analyzeBtn) {
      analyzeBtn.disabled = true;
      analyzeBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⚙</span> Analyzing Reasoning...`;
    }

    if (consoleElem) {
      consoleElem.innerHTML = '';
    }

    if (resultBox) {
      resultBox.classList.add('opacity-40');
    }

    const steps = [
      `[0.1s] TELEMETRY RECV: Question "${PERE_CONFIG.question.prompt}" | Answer "${studentData.answer}"`,
      `[0.3s] REASONING EXTRACTED: "${studentData.reasoning}"`,
      `[0.6s] ERROR PATTERN IDENTIFIED: Evaluating numerator & denominator coupling...`,
      `[0.9s] TAXONOMY MATCH: ${studentData.misconception} (Confidence ${studentData.confidence}%)`,
      `[1.2s] ROOT CAUSE IDENTIFIED: ${studentData.rootCause}`,
      `[1.5s] DIAGNOSIS COMPLETE: Intervention pipeline dispatched.`
    ];

    let stepIdx = 0;

    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        if (consoleElem) {
          const line = document.createElement('div');
          line.className = 'console-line';
          line.innerHTML = `<span class="console-time">&gt;</span> <span>${steps[stepIdx]}</span>`;
          consoleElem.appendChild(line);
          consoleElem.scrollTop = consoleElem.scrollHeight;
        }
        stepIdx++;
      } else {
        clearInterval(interval);
        isAnalyzing = false;

        if (analyzeBtn) {
          analyzeBtn.disabled = false;
          analyzeBtn.innerHTML = `✨ Trigger AI Re-Analysis`;
        }

        if (resultBox) {
          resultBox.classList.remove('opacity-40');
          updateDiagnosisUI(studentData);
        }
      }
    }, 280);
  }

  function updateDiagnosisUI(studentData) {
    document.getElementById('diag-title').innerText = studentData.misconception;
    document.getElementById('diag-type').innerText = studentData.diagnosisType;
    document.getElementById('diag-confidence').innerText = `${studentData.confidence}%`;
    document.getElementById('diag-confidence-bar').style.width = `${studentData.confidence}%`;
    document.getElementById('diag-root-cause').innerText = studentData.rootCause;
    document.getElementById('diag-evidence').innerText = studentData.evidence;
  }

  return {
    analyzeStudent: runReasoningAnalysis,
    updateDiagnosisUI: updateDiagnosisUI
  };
})();
