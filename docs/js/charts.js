/* PERE - Charts & Data Visualizations (Radar Fingerprint, Analytics) */

window.PERE_Charts = (function () {

  // 1. Radar Chart Generator for Section 6 (Fingerprint)
  function renderRadarChart(containerId, radarData) {
    const canvas = document.getElementById(containerId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 440;
    const height = canvas.height = 360;
    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const radius = 120;
    const totalAxes = radarData.length;
    const angleStep = (Math.PI * 2) / totalAxes;

    ctx.clearRect(0, 0, width, height);

    // Draw concentric web rings
    const ringLevels = [0.25, 0.5, 0.75, 1.0];
    ringLevels.forEach(level => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * (radius * level);
        const y = centerY + Math.sin(angle) * (radius * level);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    });

    // Draw Axis Spoke Lines & Labels
    radarData.forEach((item, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Axis Line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.stroke();

      // Axis Label
      const labelRadius = radius + 24;
      const lx = centerX + Math.cos(angle) * labelRadius;
      const ly = centerY + Math.sin(angle) * labelRadius;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px Inter, sans-serif';
      ctx.textAlign = lx > centerX ? 'left' : (lx < centerX ? 'right' : 'center');
      ctx.textBaseline = 'middle';
      ctx.fillText(`${item.subject} (${item.score}%)`, lx, ly);
    });

    // Plot Student Fingerprint Polygon
    ctx.beginPath();
    radarData.forEach((item, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const valueRatio = item.score / 100;
      const x = centerX + Math.cos(angle) * (radius * valueRatio);
      const y = centerY + Math.sin(angle) * (radius * valueRatio);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    // Fill & Stroke
    ctx.fillStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Data Point Nodes
    radarData.forEach((item, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const valueRatio = item.score / 100;
      const x = centerX + Math.cos(angle) * (radius * valueRatio);
      const y = centerY + Math.sin(angle) * (radius * valueRatio);

      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = item.score < 50 ? '#f43f5e' : '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }

  // 2. Student Mastery Progress Line Chart for Section 10
  function renderMasteryChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 460;
    const height = canvas.height = 200;

    ctx.clearRect(0, 0, width, height);

    const points = [
      { x: 30, y: 150, val: "42%" },
      { x: 110, y: 130, val: "48%" },
      { x: 190, y: 110, val: "62%" },
      { x: 270, y: 70, val: "78%" },
      { x: 350, y: 40, val: "88%" },
      { x: 430, y: 25, val: "94%" }
    ];

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for (let y = 30; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Line Path
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Area Fill
    ctx.lineTo(points[points.length - 1].x, height);
    ctx.lineTo(points[0].x, height);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0.3)');
    grad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // Dots
    points.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
    });
  }

  return {
    renderRadar: renderRadarChart,
    renderMastery: renderMasteryChart
  };
})();
