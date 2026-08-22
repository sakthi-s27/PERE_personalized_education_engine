/* PERE - Automated Hackathon Demo Controller */

window.PERE_DemoMode = (function () {
  let isRunning = false;
  let timerId = null;
  let currentStep = 0;
  const steps = ['student-a', 'student-b', 'student-c'];

  function toggleDemoMode() {
    if (isRunning) {
      stopDemoMode();
    } else {
      startDemoMode();
    }
  }

  function startDemoMode() {
    isRunning = true;
    currentStep = 0;

    const banner = document.getElementById('demo-banner');
    const toggleBtn = document.getElementById('btn-enter-demo');

    if (banner) banner.classList.remove('hidden');
    if (toggleBtn) {
      toggleBtn.innerText = '⏸ Pause Demo Mode';
      toggleBtn.classList.add('bg-rose-600', 'hover:bg-rose-500');
    }

    // Smooth scroll to Section 3 (Core Demo)
    const demoSec = document.getElementById('section-demo');
    if (demoSec) {
      demoSec.scrollIntoView({ behavior: 'smooth' });
    }

    runNextStep();
  }

  function runNextStep() {
    if (!isRunning) return;

    if (currentStep < steps.length) {
      const studentKey = steps[currentStep];
      const stepNum = currentStep + 1;

      // Update Demo Banner text
      const badge = document.getElementById('demo-step-badge');
      if (badge) {
        badge.innerText = `DEMO MODE ACTIVE (${stepNum}/3) — Analyzing ${PERE_CONFIG.students[studentKey].name}`;
      }

      // Trigger student selection in app
      if (window.PERE_App && window.PERE_App.selectStudent) {
        window.PERE_App.selectStudent(studentKey);
      }

      currentStep++;
      timerId = setTimeout(runNextStep, 5500);
    } else {
      // Loop or Finish
      const badge = document.getElementById('demo-step-badge');
      if (badge) {
        badge.innerText = `✅ DEMO COMPLETE — All 3 Misconception Paths Visualized!`;
      }
      setTimeout(() => {
        stopDemoMode();
      }, 3000);
    }
  }

  function stopDemoMode() {
    isRunning = false;
    if (timerId) clearTimeout(timerId);

    const banner = document.getElementById('demo-banner');
    const toggleBtn = document.getElementById('btn-enter-demo');

    if (banner) banner.classList.add('hidden');
    if (toggleBtn) {
      toggleBtn.innerText = '🚀 ENTER DEMO MODE';
      toggleBtn.classList.remove('bg-rose-600', 'hover:bg-rose-500');
    }
  }

  return {
    toggle: toggleDemoMode,
    start: startDemoMode,
    stop: stopDemoMode
  };
})();
