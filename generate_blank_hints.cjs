const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve('offline_event_pack');

const commonCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');

  @page {
    size: A4;
    margin: 8mm 10mm 8mm 10mm;
  }

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Rajdhani', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: #ffffff;
    color: #0f172a;
    margin: 0;
    padding: 0;
    font-size: 11.5px;
    line-height: 1.35;
  }

  .mono {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
  }

  .orbitron {
    font-family: 'Orbitron', sans-serif;
  }

  .page-break {
    page-break-after: always;
    break-after: page;
  }

  .doc-header {
    border-bottom: 2px solid #0284c7;
    padding-bottom: 4px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .doc-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .badge-icon {
    width: 36px;
    height: 36px;
    background: #0f172a;
    border: 2px solid #0284c7;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #38bdf8;
    font-weight: 900;
    font-size: 15px;
    font-family: 'Orbitron', sans-serif;
  }

  .doc-title-box h1 {
    margin: 0;
    font-family: 'Orbitron', sans-serif;
    font-size: 15px;
    letter-spacing: 1px;
    color: #0f172a;
    text-transform: uppercase;
  }

  .doc-title-box p {
    margin: 1px 0 0 0;
    font-size: 10px;
    font-weight: 600;
    color: #475569;
  }

  .security-tag {
    display: inline-block;
    background: #fef3c7;
    color: #92400e;
    border: 1px solid #f59e0b;
    font-family: 'Orbitron', sans-serif;
    font-size: 8.5px;
    font-weight: 700;
    padding: 2px 5px;
    border-radius: 4px;
  }

  .set-tag {
    display: inline-block;
    background: #e0f2fe;
    color: #0369a1;
    border: 1px solid #38bdf8;
    font-family: 'Orbitron', sans-serif;
    font-size: 10.5px;
    font-weight: 900;
    padding: 2px 7px;
    border-radius: 4px;
    margin-top: 2px;
  }

  .hint-stage-row {
    border: 1.5px solid #cbd5e1;
    border-radius: 6px;
    background: #f8fafc;
    padding: 6px 8px;
    margin-bottom: 7px;
    page-break-inside: avoid;
  }

  .hint-stage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 3px;
    margin-bottom: 5px;
  }

  .stage-badge {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: bold;
    color: #0f172a;
  }

  .target-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #0284c7;
    background: #e0f2fe;
    padding: 1px 6px;
    border-radius: 3px;
    border: 1px solid #bae6fd;
  }

  .hints-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .hint-card {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    padding: 5px 7px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hint-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .penalty-tag {
    font-family: 'Orbitron', sans-serif;
    font-size: 8.5px;
    font-weight: bold;
    padding: 1px 4px;
    border-radius: 3px;
  }

  .p-3m {
    background: #fef3c7;
    color: #b45309;
    border: 1px solid #fde68a;
  }

  .p-5m {
    background: #fee2e2;
    color: #b91c1c;
    border: 1px solid #fca5a5;
  }

  .blank-lines {
    height: 48px;
    background-image: repeating-linear-gradient(to bottom, transparent, transparent 15px, #cbd5e1 16px);
    border-bottom: 1px solid #cbd5e1;
    margin: 2px 0 4px 0;
  }

  .hint-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8.5px;
    color: #64748b;
    border-top: 1px dashed #e2e8f0;
    padding-top: 2px;
  }
`;

function generateSetHintsHTML(setLetter, setName, colorHex, stages) {
  const stageRows = stages.map(st => `
    <div class="hint-stage-row">
      <div class="hint-stage-header">
        <div class="stage-badge" style="color: ${colorHex};">STAGE ${st.num}: ${st.name}</div>
        <div class="target-badge">Expected Target: <strong>${st.target}</strong></div>
        <div style="font-size: 9.5px; color: #64748b;">Coordinator: <strong>${st.coord}</strong></div>
      </div>
      <div class="hints-grid">
        <!-- HINT 1 -->
        <div class="hint-card" style="border-left: 3px solid #f59e0b;">
          <div class="hint-card-title">
            <span style="font-weight: bold; color: #b45309;">HINT 1 (SUBTLE / DIRECTIONAL)</span>
            <span class="penalty-tag p-3m">+3 MINS PENALTY (30s GLANCE)</span>
          </div>
          <div class="blank-lines"></div>
          <div class="hint-footer">
            <span>[ &nbsp; ] 30s Timer Enforced</span>
            <span>Coord Initial: ___________</span>
          </div>
        </div>

        <!-- HINT 2 -->
        <div class="hint-card" style="border-left: 3px solid #ef4444;">
          <div class="hint-card-title">
            <span style="font-weight: bold; color: #b91c1c;">HINT 2 (DIRECT / CRITICAL REVEAL)</span>
            <span class="penalty-tag p-5m">+5 MINS PENALTY (30s GLANCE)</span>
          </div>
          <div class="blank-lines"></div>
          <div class="hint-footer">
            <span>[ &nbsp; ] Passport Stamped</span>
            <span>Coord Initial: ___________</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <!-- PAGE FOR SET ${setLetter} -->
    <div class="doc-header">
      <div class="doc-header-left">
        <div class="badge-icon" style="border-color: ${colorHex}; color: ${colorHex};">FO</div>
        <div class="doc-title-box">
          <h1>FINAL OVERRIDE // TACTICAL HINTS MASTER SHEET</h1>
          <p>INVICTORS STUDENT CLUB · DEPT. OF CSE · VVCE MYSURU · VENUE: M BLOCK 401</p>
        </div>
      </div>
      <div class="doc-header-right">
        <span class="security-tag">ORGANISER MANUAL HINT SHEET</span><br>
        <span class="set-tag" style="border-color: ${colorHex}; color: ${colorHex};">SET ${setLetter} // ${setName.toUpperCase()}</span>
      </div>
    </div>

    <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px; padding: 4px 8px; margin-bottom: 6px; font-size: 10px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <strong>INSTRUCTIONS FOR COORDINATORS:</strong> Write your tactical hints in the designated blank lines below. When a team asks for a hint, show them the hint for <strong>30 seconds only</strong>, then mark their Squad Passport with the corresponding +3m or +5m penalty.
      </div>
      <div style="font-family: 'JetBrains Mono'; font-weight: bold; color: #0284c7; white-space: nowrap; margin-left: 10px;">
        SET ${setLetter}
      </div>
    </div>

    ${stageRows}
  `;
}

const setsData = [
  {
    letter: 'A',
    name: 'Cosmic Vault Alpha',
    color: '#0284c7',
    stages: [
      { num: 1, name: 'Signal Intercept (Morse Matrix)', target: 'NOVA', coord: 'Gagan S Urs (Desk 1)' },
      { num: 2, name: 'Multi-Layer Decryption (B64/Hex/ROT13)', target: '7K2 / AURORA', coord: 'Anish S Kumar (Desk 2)' },
      { num: 3, name: 'Prompt WARDEN AI Guardian', target: 'ORBIT', coord: 'M Punya Sagar (Desk 3)' },
      { num: 4, name: 'CTF Challenges (Security Control Room)', target: '91X', coord: 'Abhiram BS (Desk 4)' },
      { num: 5, name: 'Hexadecimal Memory Core (Bus Line 1)', target: 'HEX82D', coord: 'Akul P Yadav (Desk 5)' },
      { num: 6, name: 'Final Integration & Master Checksum', target: 'FO{...}#29', coord: 'Akul P Yadav (Chief Arbiter)' }
    ]
  },
  {
    letter: 'B',
    name: 'Cyber Nexus Beta',
    color: '#d97706',
    stages: [
      { num: 1, name: 'Signal Intercept (Morse Matrix)', target: 'LUNA', coord: 'Gagan S Urs (Desk 1)' },
      { num: 2, name: 'Multi-Layer Decryption (B64/Hex/ROT13)', target: '4M9 / CYPHER', coord: 'Anish S Kumar (Desk 2)' },
      { num: 3, name: 'Prompt WARDEN AI Guardian', target: 'SOLAR', coord: 'M Punya Sagar (Desk 3)' },
      { num: 4, name: 'CTF Challenges (Security Control Room)', target: '84Z', coord: 'Abhiram BS (Desk 4)' },
      { num: 5, name: 'Hexadecimal Memory Core (Bus Line 1)', target: 'CORE7F', coord: 'Akul P Yadav (Desk 5)' },
      { num: 6, name: 'Final Integration & Master Checksum', target: 'FO{...}#32', coord: 'Akul P Yadav (Chief Arbiter)' }
    ]
  },
  {
    letter: 'C',
    name: 'Quantum Matrix Gamma',
    color: '#059669',
    stages: [
      { num: 1, name: 'Signal Intercept (Morse Matrix)', target: 'VEGA', coord: 'Gagan S Urs (Desk 1)' },
      { num: 2, name: 'Multi-Layer Decryption (B64/Hex/ROT13)', target: '3X8 / VORTEX', coord: 'Anish S Kumar (Desk 2)' },
      { num: 3, name: 'Prompt WARDEN AI Guardian', target: 'TITAN', coord: 'M Punya Sagar (Desk 3)' },
      { num: 4, name: 'CTF Challenges (Security Control Room)', target: '72Y', coord: 'Abhiram BS (Desk 4)' },
      { num: 5, name: 'Hexadecimal Memory Core (Bus Line 1)', target: 'BYTE9A', coord: 'Akul P Yadav (Desk 5)' },
      { num: 6, name: 'Final Integration & Master Checksum', target: 'FO{...}#29', coord: 'Akul P Yadav (Chief Arbiter)' }
    ]
  },
  {
    letter: 'D',
    name: 'Hyperion Vector Delta',
    color: '#7c3aed',
    stages: [
      { num: 1, name: 'Signal Intercept (Morse Matrix)', target: 'MARS', coord: 'Gagan S Urs (Desk 1)' },
      { num: 2, name: 'Multi-Layer Decryption (B64/Hex/ROT13)', target: '5P3 / NEBULA', coord: 'Anish S Kumar (Desk 2)' },
      { num: 3, name: 'Prompt WARDEN AI Guardian', target: 'ZENITH', coord: 'M Punya Sagar (Desk 3)' },
      { num: 4, name: 'CTF Challenges (Security Control Room)', target: '63K', coord: 'Abhiram BS (Desk 4)' },
      { num: 5, name: 'Hexadecimal Memory Core (Bus Line 1)', target: 'BITS1E', coord: 'Akul P Yadav (Desk 5)' },
      { num: 6, name: 'Final Integration & Master Checksum', target: 'FO{...}#18', coord: 'Akul P Yadav (Chief Arbiter)' }
    ]
  }
];

const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FINAL OVERRIDE — Master Blank Tactical Hints Sheets</title>
  <style>${commonCSS}</style>
</head>
<body>
  ${setsData.map((s, idx) => `
    ${generateSetHintsHTML(s.letter, s.name, s.color, s.stages)}
    ${idx < setsData.length - 1 ? '<div class="page-break"></div>' : ''}
  `).join('')}
</body>
</html>`;

const htmlPath = path.join(outDir, 'FINAL_OVERRIDE_Blank_Hints_Sheets.html');
const pdfPath = path.join(outDir, 'FINAL_OVERRIDE_Blank_Hints_Sheets.pdf');

fs.writeFileSync(htmlPath, fullHTML, 'utf8');
console.log('Written HTML to', htmlPath);

try {
  const cmd = `"${edgePath}" --headless --disable-gpu --no-sandbox --disable-software-rasterizer --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" "${htmlPath}"`;
  execSync(cmd);
  const size = fs.statSync(pdfPath).size;
  console.log(`SUCCESS! Blank Hints PDF generated at: ${pdfPath} (${(size / 1024).toFixed(1)} KB)`);

  // Copy to artifacts directory
  const artifactDir = 'C:\\Users\\akulp\\.gemini\\antigravity\\brain\\ee78fa15-63ef-4f6d-9240-befc44bdad3b';
  fs.copyFileSync(pdfPath, path.join(artifactDir, 'FINAL_OVERRIDE_Blank_Hints_Sheets.pdf'));
  console.log('Copied to artifacts directory successfully!');
} catch (e) {
  console.error('Error generating PDF:', e.message);
}
