const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve('offline_event_pack');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Common CSS styling for all documents (Print optimized, modern cyber-tech aesthetic)
const commonCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');

  @page {
    size: A4;
    margin: 10mm 12mm 10mm 12mm;
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
    font-size: 13px;
    line-height: 1.4;
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

  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .doc-header {
    border-bottom: 2px solid #0284c7;
    padding-bottom: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .doc-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .badge-icon {
    width: 40px;
    height: 40px;
    background: #0f172a;
    border: 2px solid #0284c7;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #38bdf8;
    font-weight: 900;
    font-size: 16px;
    font-family: 'Orbitron', sans-serif;
  }

  .doc-title-box h1 {
    margin: 0;
    font-family: 'Orbitron', sans-serif;
    font-size: 16px;
    letter-spacing: 1.2px;
    color: #0f172a;
    text-transform: uppercase;
  }

  .doc-title-box p {
    margin: 1px 0 0 0;
    font-size: 11px;
    font-weight: 600;
    color: #475569;
    letter-spacing: 0.5px;
  }

  .doc-header-right {
    text-align: right;
  }

  .security-tag {
    display: inline-block;
    background: #fee2e2;
    color: #b91c1c;
    border: 1px solid #f87171;
    font-family: 'Orbitron', sans-serif;
    font-size: 9px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 1px;
  }

  .set-tag {
    display: inline-block;
    background: #e0f2fe;
    color: #0369a1;
    border: 1px solid #38bdf8;
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 900;
    padding: 3px 8px;
    border-radius: 4px;
    letter-spacing: 1.2px;
    margin-top: 3px;
  }

  .card {
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #f8fafc;
    padding: 8px 12px;
    margin-bottom: 10px;
  }

  .card-header {
    font-family: 'Orbitron', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #0f172a;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 4px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  table.cyber-table {
    width: 100%;
    border-collapse: collapse;
    margin: 6px 0;
    font-size: 11px;
  }

  table.cyber-table th {
    background: #0f172a;
    color: #f8fafc;
    padding: 5px 8px;
    font-family: 'Orbitron', sans-serif;
    font-size: 10px;
    letter-spacing: 0.5px;
    text-align: left;
    border: 1px solid #0f172a;
  }

  table.cyber-table td {
    padding: 4px 8px;
    border: 1px solid #cbd5e1;
    color: #1e293b;
  }

  table.cyber-table tr:nth-child(even) td {
    background: #f1f5f9;
  }

  .box-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin: 6px 0;
  }

  .box-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin: 6px 0;
  }

  .box-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    margin: 6px 0;
  }

  .sector-box {
    border: 1.5px solid #94a3b8;
    border-radius: 6px;
    background: #ffffff;
    padding: 6px 8px;
    text-align: center;
  }

  .sector-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 10.5px;
    font-weight: 700;
    color: #0284c7;
    margin-bottom: 3px;
  }

  .cipher-display {
    background: #0f172a;
    color: #38bdf8;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    padding: 6px 8px;
    border-radius: 4px;
    word-break: break-all;
    letter-spacing: 0.8px;
    border: 1px solid #1e293b;
    margin: 4px 0;
  }

  .answer-input-box {
    border: 2px dashed #0284c7;
    background: #f0f9ff;
    padding: 6px 10px;
    border-radius: 6px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .answer-label {
    font-family: 'Orbitron', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: #0369a1;
  }

  .answer-line {
    border-bottom: 2px solid #0369a1;
    width: 220px;
    height: 22px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #0f172a;
  }

  .sign-box {
    border: 1px solid #cbd5e1;
    padding: 4px 6px;
    border-radius: 4px;
    background: #ffffff;
    font-size: 10px;
    text-align: center;
    min-width: 130px;
  }

  .callout-alert {
    background: #fef2f2;
    border-left: 4px solid #ef4444;
    padding: 5px 8px;
    font-size: 10.5px;
    color: #991b1b;
    margin: 4px 0;
    border-radius: 0 4px 4px 0;
  }

  .callout-info {
    background: #f0fdf4;
    border-left: 4px solid #22c55e;
    padding: 5px 8px;
    font-size: 10.5px;
    color: #166534;
    margin: 4px 0;
    border-radius: 0 4px 4px 0;
  }

  .rule-pill {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 10px;
    font-weight: 700;
    margin-right: 4px;
  }
`;

// ==========================================
// 1. EVENT MANAGER OFFLINE MANUAL
// ==========================================
function generateEventManagerManual() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FINAL OVERRIDE — Master Event Manager & Coordinator Offline Operational Manual</title>
  <style>${commonCSS}</style>
</head>
<body>

  <!-- PAGE 1: EXECUTIVE PROTOCOL & VENUE ARCHITECTURE -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon">FO</div>
      <div class="doc-title-box">
        <h1>FINAL OVERRIDE // MASTER OFFLINE MANUAL</h1>
        <p>INVICTORS CLUB · DEPT. OF CSE · VIDYAVARDHAKA COLLEGE OF ENGINEERING</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="security-tag">OFFICIAL ORGANISER PROTOCOL</span><br>
      <span class="set-tag">VENUE: M BLOCK 401 | 23 SQUADS</span>
    </div>
  </div>

  <div class="card" style="border-left: 4px solid #0284c7;">
    <div class="card-header">
      <span>1. EMERGENCY OFFLINE PIVOT PROTOCOL (DISASTER RECOVERY)</span>
      <span class="mono" style="color: #0369a1;">EXECUTION TIME: &lt; 3 MINUTES</span>
    </div>
    <p style="margin: 2px 0 6px 0;">This manual governs the complete offline execution of FINAL OVERRIDE if cloud connectivity, campus Wi-Fi, or local server infrastructure fails. The entire gameplay, cryptographic logic, hints, and scoring are 100% playable with pen, paper, and physical coordinator verification desks.</p>
    <div class="box-grid-2">
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 4px;">
        <strong style="color: #0f172a;">🚨 Pivot Trigger Criteria:</strong>
        <ul style="margin: 4px 0 0 16px; padding: 0; font-size: 11px;">
          <li>Campus LAN/Wi-Fi down for &gt; 3 continuous minutes.</li>
          <li>Power dip causing workstation reboots.</li>
          <li>Cloud database / Vercel endpoint rate-limit lock.</li>
        </ul>
      </div>
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 4px;">
        <strong style="color: #0f172a;">⚡ 3-Minute Pivot Action Plan:</strong>
        <ol style="margin: 4px 0 0 16px; padding: 0; font-size: 11px;">
          <li><strong>Event Lead:</strong> Call "PIVOT OFFLINE" over M Block 401 PA system.</li>
          <li><strong>Master Timer:</strong> Start central projector stopwatch (or coordinator phone timer synced at 00:00).</li>
          <li><strong>Handouts:</strong> Distribute Squad Dossiers (Sets A–D) & Mission Passports.</li>
        </ol>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>2. VENUE LAYOUT & COORDINATOR DESK ARCHITECTURE (M BLOCK 401)</span>
      <span class="mono">5 COORDINATOR STATIONS</span>
    </div>
    <table class="cyber-table">
      <thead>
        <tr>
          <th>Station / Desk</th>
          <th>Lead Coordinator</th>
          <th>PIN / Authorization</th>
          <th>Primary Responsibilities</th>
          <th>Validation Artifact</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Desk 1: Signal Intercept</strong></td>
          <td><strong>Gagan S Urs</strong><br><span style="font-size: 9.5px; color: #64748b;">(Assisted by Tanu)</span></td>
          <td><span class="mono">GAGAN#101</span></td>
          <td>Validate Stage 1 Morse words; Hand out Stage 2 cipher envelopes; Record Stage 1 clear time.</td>
          <td>Stage 1 Stamp / Signature on Passport</td>
        </tr>
        <tr>
          <td><strong>Desk 2: Cryptanalyst Hub</strong></td>
          <td><strong>Anish S Kumar</strong><br><span style="font-size: 9.5px; color: #64748b;">(Assisted by Chandrashekar)</span></td>
          <td><span class="mono">ANISH#202</span></td>
          <td>Verify 3-step decoding (Base64 &rarr; Hex &rarr; ROT13); Verify Access Phrase; Issue Hint 1/2.</td>
          <td>Stage 2 Stamp & Fragment 2 (<span class="mono">7K2 / 4M9 / 3X8 / 5P3</span>)</td>
        </tr>
        <tr>
          <td><strong>Desk 3: WARDEN AI Terminal</strong></td>
          <td><strong>M Punya Sagar</strong><br><span style="font-size: 9.5px; color: #64748b;">(Assisted by MN Shashank)</span></td>
          <td><span class="mono">PUNYA#303</span></td>
          <td><strong>"Human AI Bot"</strong>: Review physical prompt slips against 4 rules; Issue Fragment 3 or Decoy ZETA9.</td>
          <td>Official Fragment 3 Physical Token Card</td>
        </tr>
        <tr>
          <td><strong>Desk 4: CTF Control Room</strong></td>
          <td><strong>Abhiram BS</strong><br><span style="font-size: 9.5px; color: #64748b;">(Assisted by Dhanush KP)</span></td>
          <td><span class="mono">ABHIRAM#404</span></td>
          <td>Validate 3 CTF evidence stations (Door log digit, Camera digit, Audio glyph symbol).</td>
          <td>Stage 4 Clearance Stamp (<span class="mono">91X / 84Z / 72Y / 63K</span>)</td>
        </tr>
        <tr>
          <td><strong>Desk 5: Memory Core & Final Key</strong></td>
          <td><strong>Akul P Yadav</strong><br><span style="font-size: 9.5px; color: #64748b;">(Chief Arbiter & Ayush P)</span></td>
          <td><span class="mono">AKUL#2026</span></td>
          <td>Validate Stage 5 Hex ASCII bus line; Verify Stage 6 Master Synthesis, Checksum, and final time.</td>
          <td>Victory Seal, Stopwatch Lock, Rank Stamp</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card">
    <div class="card-header">
      <span>3. TIMING BENCHMARKS & PENALTY CALCULATION</span>
      <span class="mono">90-MINUTE HARD CAP</span>
    </div>
    <div class="box-grid-3">
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px; border-radius: 4px; text-align: center;">
        <div style="font-size: 11px; font-weight: bold; color: #0284c7;">SPEEDRUN SQUADS</div>
        <div style="font-size: 16px; font-weight: 900; font-family: 'Orbitron';">45 - 55 MINS</div>
        <div style="font-size: 10px; color: #64748b;">Top 10% competitive tier</div>
      </div>
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px; border-radius: 4px; text-align: center;">
        <div style="font-size: 11px; font-weight: bold; color: #059669;">AVERAGE COMPLETION</div>
        <div style="font-size: 16px; font-weight: 900; font-family: 'Orbitron';">65 - 75 MINS</div>
        <div style="font-size: 10px; color: #64748b;">Standard expected pace</div>
      </div>
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px; border-radius: 4px; text-align: center;">
        <div style="font-size: 11px; font-weight: bold; color: #dc2626;">HARD GAME OVER</div>
        <div style="font-size: 16px; font-weight: 900; font-family: 'Orbitron';">90 MINS CAP</div>
        <div style="font-size: 10px; color: #64748b;">All submissions freeze</div>
      </div>
    </div>
    <div class="callout-alert" style="margin-top: 6px;">
      <strong>Official Rank Formula:</strong> <span class="mono">Final Adjusted Time = Elapsed Stopwatch Time + Total Hint Penalties (+3m / +5m) + Attempt Penalties (&gt;5 wrong attempts: +1 min each)</span>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 2: MASTER ANSWER KEYS & VERIFICATION SHEET -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon">FO</div>
      <div class="doc-title-box">
        <h1>MASTER ANSWER KEYS // ALL 4 SETS</h1>
        <p>COORDINATOR CONFIDENTIAL REFERENCE SHEET · NEVER SHOW TO SQUADS</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="security-tag">STRICTLY CONFIDENTIAL</span>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>SIDE-BY-SIDE VERIFICATION MATRIX (SETS A, B, C, D)</span>
      <span class="mono">ACCURATE & DEDUPLICATED</span>
    </div>
    <table class="cyber-table">
      <thead>
        <tr>
          <th style="width: 14%;">Stage</th>
          <th style="width: 21.5%;">Set A (Cosmic Vault Alpha)</th>
          <th style="width: 21.5%;">Set B (Cyber Nexus Beta)</th>
          <th style="width: 21.5%;">Set C (Quantum Matrix Gamma)</th>
          <th style="width: 21.5%;">Set D (Hyperion Vector Delta)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Stage 1<br>(Signal Intercept)</strong></td>
          <td><strong>NOVA</strong><br><span class="mono" style="font-size: 9.5px;">S1:—• S2:——— S3:•••— S4:•—</span></td>
          <td><strong>LUNA</strong><br><span class="mono" style="font-size: 9.5px;">S1:•—•• S2:••— S3:—• S4:•—</span></td>
          <td><strong>VEGA</strong><br><span class="mono" style="font-size: 9.5px;">S1:•••— S2:• S3:——• S4:•—</span></td>
          <td><strong>MARS</strong><br><span class="mono" style="font-size: 9.5px;">S1:—— S2:•— S3:•—• S4:•••</span></td>
        </tr>
        <tr>
          <td><strong>Stage 2<br>(Decryption Suite)</strong></td>
          <td>Phrase: <strong>AURORA</strong><br>Fragment 2: <strong>7K2</strong><br><span style="font-size: 9px; color:#64748b;">(B64 &rarr; Hex &rarr; ROT13)</span></td>
          <td>Phrase: <strong>CYPHER</strong><br>Fragment 2: <strong>4M9</strong><br><span style="font-size: 9px; color:#64748b;">(B64 &rarr; Hex &rarr; ROT13)</span></td>
          <td>Phrase: <strong>VORTEX</strong><br>Fragment 2: <strong>3X8</strong><br><span style="font-size: 9px; color:#64748b;">(B64 &rarr; Hex &rarr; ROT13)</span></td>
          <td>Phrase: <strong>NEBULA</strong><br>Fragment 2: <strong>5P3</strong><br><span style="font-size: 9px; color:#64748b;">(B64 &rarr; Hex &rarr; ROT13)</span></td>
        </tr>
        <tr>
          <td><strong>Stage 3<br>(WARDEN AI)</strong></td>
          <td>Fragment 3: <strong>ORBIT</strong><br><span style="font-size: 9px; color:#64748b;">Must include: AURORA + Role</span></td>
          <td>Fragment 3: <strong>SOLAR</strong><br><span style="font-size: 9px; color:#64748b;">Must include: CYPHER + Role</span></td>
          <td>Fragment 3: <strong>TITAN</strong><br><span style="font-size: 9px; color:#64748b;">Must include: VORTEX + Role</span></td>
          <td>Fragment 3: <strong>ZENITH</strong><br><span style="font-size: 9px; color:#64748b;">Must include: NEBULA + Role</span></td>
        </tr>
        <tr>
          <td><strong>Stage 4<br>(CTF Stations)</strong></td>
          <td>Fragment 4: <strong>91X</strong><br><span style="font-size: 9.5px;">Log: 9 | Cam: 1 | Keypad: X</span></td>
          <td>Fragment 4: <strong>84Z</strong><br><span style="font-size: 9.5px;">Log: 8 | Cam: 4 | Keypad: Z</span></td>
          <td>Fragment 4: <strong>72Y</strong><br><span style="font-size: 9.5px;">Log: 7 | Cam: 2 | Keypad: Y</span></td>
          <td>Fragment 4: <strong>63K</strong><br><span style="font-size: 9.5px;">Log: 6 | Cam: 3 | Keypad: K</span></td>
        </tr>
        <tr>
          <td><strong>Stage 5<br>(Hex Memory Core)</strong></td>
          <td>Fragment 5: <strong>HEX82D</strong><br><span class="mono" style="font-size: 9px;">48 45 58 38 32 44</span></td>
          <td>Fragment 5: <strong>CORE7F</strong><br><span class="mono" style="font-size: 9px;">43 4f 52 45 37 46</span></td>
          <td>Fragment 5: <strong>BYTE9A</strong><br><span class="mono" style="font-size: 9px;">42 59 54 45 39 41</span></td>
          <td>Fragment 5: <strong>BITS1E</strong><br><span class="mono" style="font-size: 9px;">42 49 54 53 31 45</span></td>
        </tr>
        <tr>
          <td><strong>Stage 6<br>(Master Synthesis)</strong></td>
          <td><span class="mono" style="font-size: 10px; font-weight: bold; color: #0284c7;">FO{91X-7K2-HEX82D-TIBRO-NOVA}#29</span><br><span style="font-size: 9px;">Digits: 9+1+7+2+8+2 = 29</span></td>
          <td><span class="mono" style="font-size: 10px; font-weight: bold; color: #0284c7;">FO{84Z-4M9-CORE7F-RALOS-LUNA}#32</span><br><span style="font-size: 9px;">Digits: 8+4+4+9+7 = 32</span></td>
          <td><span class="mono" style="font-size: 10px; font-weight: bold; color: #0284c7;">FO{72Y-3X8-BYTE9A-NATIT-VEGA}#29</span><br><span style="font-size: 9px;">Digits: 7+2+3+8+9 = 29</span></td>
          <td><span class="mono" style="font-size: 10px; font-weight: bold; color: #0284c7;">FO{63K-5P3-BITS1E-HTINEZ-MARS}#18</span><br><span style="font-size: 9px;">Digits: 6+3+5+3+1 = 18</span></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card">
    <div class="card-header">
      <span>STAGE 6 ALPHABETICAL ORDERING RULE (CRUCIAL EXPLANATION)</span>
    </div>
    <p style="margin: 2px 0 4px 0; font-size: 11px;">Fragments must be joined strictly in alphabetical order of the <strong>MISSION NAME</strong>, not by stage number:</p>
    <div class="box-grid-2">
      <ol style="margin: 0 0 0 18px; padding: 0; font-size: 11px;">
        <li><strong>C</strong>TF Challenges &rarr; <span class="mono">Fragment 4</span></li>
        <li><strong>D</strong>ecoding &rarr; <span class="mono">Fragment 2</span></li>
        <li><strong>H</strong>ex Decryption &rarr; <span class="mono">Fragment 5</span></li>
        <li><strong>P</strong>rompt the AI &rarr; <span class="mono">Fragment 3 (REVERSED!)</span></li>
        <li><strong>S</strong>ignal Intercept &rarr; <span class="mono">Fragment 1</span></li>
      </ol>
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px 8px; border-radius: 4px;">
        <strong style="color: #0369a1;">Checksum Formula:</strong> Sum of all numerical digits (0–9) appearing in the key string. <em>Letters are ignored.</em><br>
        <strong>Decoy Rejection:</strong> Submitting code containing <span class="mono">ZETA9</span> or unreversed AI fragment triggers immediate disqualification of that attempt!
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 3: 100-POINT SCORING RUBRIC & WARDEN AI GUIDE -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon">FO</div>
      <div class="doc-title-box">
        <h1>100-POINT SCORING RUBRIC & AI OPERATIONAL GUIDE</h1>
        <p>OFFICIAL GRADING MATRIX AND HUMAN WARDEN EVALUATION PROTOCOL</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="security-tag">SCORING RUBRIC</span>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>OFFICIAL 100-POINT STAGE-BY-STAGE RUBRIC (APPLIES TO ALL SETS)</span>
      <span class="mono">MAX 100 PTS</span>
    </div>
    <table class="cyber-table">
      <thead>
        <tr>
          <th>Stage</th>
          <th>Max Pts</th>
          <th>Sub-Item Scoring Breakdown</th>
          <th>Coordinator Verification Criteria</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Stage 1: Signal Intercept</strong></td>
          <td><strong>10 pts</strong></td>
          <td>• 2 pts per correctly decoded Morse letter (8 pts total)<br>• 2 pts for correct assembled word</td>
          <td>Verify 4 letters match Set word (<span class="mono">NOVA / LUNA / VEGA / MARS</span>). Reject <span class="mono">ZETA9</span>.</td>
        </tr>
        <tr>
          <td><strong>Stage 2: Poly-Cipher Stream</strong></td>
          <td><strong>20 pts</strong></td>
          <td>• 5 pts for Base64 decode to Hex stream<br>• 5 pts for Hex decode to scrambled text<br>• 5 pts for ROT13 decode<br>• 2 pts for Access Phrase | 3 pts for Fragment 2</td>
          <td>Team must show manual scratchpad working or explain 3 transformations. Record Access Phrase on passport.</td>
        </tr>
        <tr>
          <td><strong>Stage 3: WARDEN AI Guardian</strong></td>
          <td><strong>15 pts</strong></td>
          <td>• 5 pts for exact valid Access Phrase<br>• 3 pts for declaring an authorized role<br>• 3 pts for professional directive (&ge;10 words)<br>• 4 pts for exact Fragment 3</td>
          <td>Coordinator M Punya Sagar / MN Shashank reviews Prompt Slip using the 4-rule checklist. If 4/4 passed, hand over Fragment 3 card.</td>
        </tr>
        <tr>
          <td><strong>Stage 4: CTF Control Room</strong></td>
          <td><strong>15 pts</strong></td>
          <td>• 5 pts for Station 1 Door Log intruder digit<br>• 5 pts for Station 2 Camera feed revealed digit<br>• 5 pts for Station 3 Symbol Keypad match</td>
          <td>All 3 stations must be solved in sequence. Fragment is 3 chars (<span class="mono">91X / 84Z / 72Y / 63K</span>).</td>
        </tr>
        <tr>
          <td><strong>Stage 5: Hex Memory Core</strong></td>
          <td><strong>15 pts</strong></td>
          <td>• 2 pts per correctly converted byte (12 pts total)<br>• 3 pts for complete ordered string</td>
          <td>Verify Channel A to F registers along Column 1 converted from Hex to ASCII (<span class="mono">HEX82D / CORE7F...</span>).</td>
        </tr>
        <tr>
          <td><strong>Stage 6: Final Override Synthesis</strong></td>
          <td><strong>25 pts</strong></td>
          <td>• 10 pts for alphabetical mission assembly<br>• 5 pts for correctly reversing AI fragment<br>• 5 pts for accurate digit checksum<br>• 5 pts for exact final key string</td>
          <td>Team captain presents Final Passport. Checksum and format <span class="mono">FO{...}#...</span> must be 100% exact!</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="card" style="border-left: 4px solid #8b5cf6;">
    <div class="card-header">
      <span>HUMAN WARDEN AI PROTOCOL (COORDINATOR M PUNYA SAGAR / MN SHASHANK GUIDE)</span>
      <span class="mono" style="color: #7c3aed;">DESK 3 INSTRUCTIONS</span>
    </div>
    <p style="margin: 2px 0 4px 0; font-size: 11px;">When a squad brings a physical <strong>WARDEN AI Prompt Slip</strong> to Desk 3, evaluate it instantly against the following 4 deterministic rules:</p>
    <div class="box-grid-2">
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px; border-radius: 4px;">
        <span class="rule-pill" style="background: #e0e7ff; color: #4338ca;">RULE 1: ACCESS PHRASE</span> Must contain the secret phrase recovered from Stage 2 (<span class="mono">AURORA / CYPHER / VORTEX / NEBULA</span>).<br>
        <span class="rule-pill" style="background: #e0e7ff; color: #4338ca;">RULE 2: ROLE DECLARATION</span> Prompt must state an authorized role: <span class="mono">technician, engineer, admin, lead, officer</span>.
      </div>
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 6px; border-radius: 4px;">
        <span class="rule-pill" style="background: #e0e7ff; color: #4338ca;">RULE 3: CLEAR DIRECTIVE</span> Must explicitly request: <span class="mono">code, fragment, token, release, override</span>.<br>
        <span class="rule-pill" style="background: #e0e7ff; color: #4338ca;">RULE 4: WORD COUNT</span> Must be a complete, articulate sentence of <strong>at least 10 words</strong>.
      </div>
    </div>
    <div class="box-grid-2" style="margin-top: 6px;">
      <div class="callout-alert" style="margin: 0;">
        <strong>IF ANY RULE FAILS OR ACCESS PHRASE MISSING:</strong><br>
        Coordinator stamps slip with red <span class="mono">"ANOMALY: FREQ-ZETA9 DETECTED // ACCESS REJECTED"</span>. Team must rewrite.
      </div>
      <div class="callout-info" style="margin: 0;">
        <strong>IF ALL 4 RULES PASS:</strong><br>
        Coordinator signs passport and hands team the sealed <strong>Fragment 3 Card</strong> (<span class="mono">ORBIT / SOLAR / TITAN / ZENITH</span>).
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 4: 23 REGISTERED TEAMS ALLOTMENT & TABLE ROSTER -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon">FO</div>
      <div class="doc-title-box">
        <h1>23 REGISTERED TEAMS // OFFICIAL SET ROSTER</h1>
        <p>LAB SEATING, SET ALLOTMENTS & DESK DISPERSION IN M BLOCK 401</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="security-tag">ORGANISER ROSTER</span>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>COMPLETE 23 SQUAD MASTER DIRECTORY</span>
      <span class="mono">4 QUESTION SETS</span>
    </div>
    <table class="cyber-table">
      <thead>
        <tr>
          <th>Team #</th>
          <th>Squad Name</th>
          <th>Designated SPOC</th>
          <th>Assigned Set</th>
          <th>Assigned Station / Table</th>
          <th>Primary Fragment Chain</th>
          <th>Final Verification Key</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Team 01</strong></td><td><strong>Trinetra</strong></td><td><strong>Tanu</strong></td><td><strong style="color:#0284c7;">Set A</strong></td><td>Table A-1</td><td><span class="mono">NOVA &rarr; 7K2 &rarr; ORBIT &rarr; 91X &rarr; HEX82D</span></td><td><span class="mono" style="font-size:9px;">FO{91X-7K2-HEX82D-TIBRO-NOVA}#29</span></td></tr>
        <tr><td><strong>Team 02</strong></td><td><strong>Bug Busters</strong></td><td><strong>Anish S Kumar</strong></td><td><strong style="color:#0284c7;">Set A</strong></td><td>Table A-2</td><td><span class="mono">NOVA &rarr; 7K2 &rarr; ORBIT &rarr; 91X &rarr; HEX82D</span></td><td><span class="mono" style="font-size:9px;">FO{91X-7K2-HEX82D-TIBRO-NOVA}#29</span></td></tr>
        <tr><td><strong>Team 03</strong></td><td><strong>TRIO_BYTE</strong></td><td><strong>Akul P Yadav</strong></td><td><strong style="color:#0284c7;">Set A</strong></td><td>Table A-3</td><td><span class="mono">NOVA &rarr; 7K2 &rarr; ORBIT &rarr; 91X &rarr; HEX82D</span></td><td><span class="mono" style="font-size:9px;">FO{91X-7K2-HEX82D-TIBRO-NOVA}#29</span></td></tr>
        <tr><td><strong>Team 04</strong></td><td><strong>Team Bhai</strong></td><td><strong>Gagan S Urs</strong></td><td><strong style="color:#0284c7;">Set A</strong></td><td>Table A-4</td><td><span class="mono">NOVA &rarr; 7K2 &rarr; ORBIT &rarr; 91X &rarr; HEX82D</span></td><td><span class="mono" style="font-size:9px;">FO{91X-7K2-HEX82D-TIBRO-NOVA}#29</span></td></tr>
        <tr><td><strong>Team 05</strong></td><td><strong>Cipher</strong></td><td><strong>Abhiram BS</strong></td><td><strong style="color:#0284c7;">Set A</strong></td><td>Table A-5</td><td><span class="mono">NOVA &rarr; 7K2 &rarr; ORBIT &rarr; 91X &rarr; HEX82D</span></td><td><span class="mono" style="font-size:9px;">FO{91X-7K2-HEX82D-TIBRO-NOVA}#29</span></td></tr>
        <tr><td><strong>Team 06</strong></td><td><strong>Team Jupiter</strong></td><td><strong>Vishnuvardhan</strong></td><td><strong style="color:#0284c7;">Set A</strong></td><td>Table A-6</td><td><span class="mono">NOVA &rarr; 7K2 &rarr; ORBIT &rarr; 91X &rarr; HEX82D</span></td><td><span class="mono" style="font-size:9px;">FO{91X-7K2-HEX82D-TIBRO-NOVA}#29</span></td></tr>

        <tr><td><strong>Team 07</strong></td><td><strong>Aèsir’s</strong></td><td><strong>Abhiram BS</strong></td><td><strong style="color:#d97706;">Set B</strong></td><td>Table B-1</td><td><span class="mono">LUNA &rarr; 4M9 &rarr; SOLAR &rarr; 84Z &rarr; CORE7F</span></td><td><span class="mono" style="font-size:9px;">FO{84Z-4M9-CORE7F-RALOS-LUNA}#32</span></td></tr>
        <tr><td><strong>Team 08</strong></td><td><strong>Team onestop</strong></td><td><strong>M Punya Sagar</strong></td><td><strong style="color:#d97706;">Set B</strong></td><td>Table B-2</td><td><span class="mono">LUNA &rarr; 4M9 &rarr; SOLAR &rarr; 84Z &rarr; CORE7F</span></td><td><span class="mono" style="font-size:9px;">FO{84Z-4M9-CORE7F-RALOS-LUNA}#32</span></td></tr>
        <tr><td><strong>Team 09</strong></td><td><strong>Awake</strong></td><td><strong>Anish S Kumar</strong></td><td><strong style="color:#d97706;">Set B</strong></td><td>Table B-3</td><td><span class="mono">LUNA &rarr; 4M9 &rarr; SOLAR &rarr; 84Z &rarr; CORE7F</span></td><td><span class="mono" style="font-size:9px;">FO{84Z-4M9-CORE7F-RALOS-LUNA}#32</span></td></tr>
        <tr><td><strong>Team 10</strong></td><td><strong>Init</strong></td><td><strong>Anirudh M</strong></td><td><strong style="color:#d97706;">Set B</strong></td><td>Table B-4</td><td><span class="mono">LUNA &rarr; 4M9 &rarr; SOLAR &rarr; 84Z &rarr; CORE7F</span></td><td><span class="mono" style="font-size:9px;">FO{84Z-4M9-CORE7F-RALOS-LUNA}#32</span></td></tr>
        <tr><td><strong>Team 11</strong></td><td><strong>Syntax Andhre?</strong></td><td><strong>Akul P Yadav</strong></td><td><strong style="color:#d97706;">Set B</strong></td><td>Table B-5</td><td><span class="mono">LUNA &rarr; 4M9 &rarr; SOLAR &rarr; 84Z &rarr; CORE7F</span></td><td><span class="mono" style="font-size:9px;">FO{84Z-4M9-CORE7F-RALOS-LUNA}#32</span></td></tr>
        <tr><td><strong>Team 12</strong></td><td><strong>FAB-4</strong></td><td><strong>Abhivishnu</strong></td><td><strong style="color:#d97706;">Set B</strong></td><td>Table B-6</td><td><span class="mono">LUNA &rarr; 4M9 &rarr; SOLAR &rarr; 84Z &rarr; CORE7F</span></td><td><span class="mono" style="font-size:9px;">FO{84Z-4M9-CORE7F-RALOS-LUNA}#32</span></td></tr>

        <tr><td><strong>Team 13</strong></td><td><strong>The Dynamos</strong></td><td><strong>Harshil</strong></td><td><strong style="color:#059669;">Set C</strong></td><td>Table C-1</td><td><span class="mono">VEGA &rarr; 3X8 &rarr; TITAN &rarr; 72Y &rarr; BYTE9A</span></td><td><span class="mono" style="font-size:9px;">FO{72Y-3X8-BYTE9A-NATIT-VEGA}#29</span></td></tr>
        <tr><td><strong>Team 14</strong></td><td><strong>CodeX</strong></td><td><strong>Abhivishnu</strong></td><td><strong style="color:#059669;">Set C</strong></td><td>Table C-2</td><td><span class="mono">VEGA &rarr; 3X8 &rarr; TITAN &rarr; 72Y &rarr; BYTE9A</span></td><td><span class="mono" style="font-size:9px;">FO{72Y-3X8-BYTE9A-NATIT-VEGA}#29</span></td></tr>
        <tr><td><strong>Team 15</strong></td><td><strong>A³</strong></td><td><strong>Ayush P</strong></td><td><strong style="color:#059669;">Set C</strong></td><td>Table C-3</td><td><span class="mono">VEGA &rarr; 3X8 &rarr; TITAN &rarr; 72Y &rarr; BYTE9A</span></td><td><span class="mono" style="font-size:9px;">FO{72Y-3X8-BYTE9A-NATIT-VEGA}#29</span></td></tr>
        <tr><td><strong>Team 16</strong></td><td><strong>Huntrix</strong></td><td><strong>Surabhi</strong></td><td><strong style="color:#059669;">Set C</strong></td><td>Table C-4</td><td><span class="mono">VEGA &rarr; 3X8 &rarr; TITAN &rarr; 72Y &rarr; BYTE9A</span></td><td><span class="mono" style="font-size:9px;">FO{72Y-3X8-BYTE9A-NATIT-VEGA}#29</span></td></tr>
        <tr><td><strong>Team 17</strong></td><td><strong>Nexora</strong></td><td><strong>MN Shashank</strong></td><td><strong style="color:#059669;">Set C</strong></td><td>Table C-5</td><td><span class="mono">VEGA &rarr; 3X8 &rarr; TITAN &rarr; 72Y &rarr; BYTE9A</span></td><td><span class="mono" style="font-size:9px;">FO{72Y-3X8-BYTE9A-NATIT-VEGA}#29</span></td></tr>
        <tr><td><strong>Team 18</strong></td><td><strong>Tech titans</strong></td><td><strong>Skanda</strong></td><td><strong style="color:#059669;">Set C</strong></td><td>Table C-6</td><td><span class="mono">VEGA &rarr; 3X8 &rarr; TITAN &rarr; 72Y &rarr; BYTE9A</span></td><td><span class="mono" style="font-size:9px;">FO{72Y-3X8-BYTE9A-NATIT-VEGA}#29</span></td></tr>

        <tr><td><strong>Team 19</strong></td><td><strong>The Cosmos</strong></td><td><strong>Ayush P</strong></td><td><strong style="color:#7c3aed;">Set D</strong></td><td>Table D-1</td><td><span class="mono">MARS &rarr; 5P3 &rarr; ZENITH &rarr; 63K &rarr; BITS1E</span></td><td><span class="mono" style="font-size:9px;">FO{63K-5P3-BITS1E-HTINEZ-MARS}#18</span></td></tr>
        <tr><td><strong>Team 20</strong></td><td><strong>THIRD EYE</strong></td><td><strong>Dhanush KP</strong></td><td><strong style="color:#7c3aed;">Set D</strong></td><td>Table D-2</td><td><span class="mono">MARS &rarr; 5P3 &rarr; ZENITH &rarr; 63K &rarr; BITS1E</span></td><td><span class="mono" style="font-size:9px;">FO{63K-5P3-BITS1E-HTINEZ-MARS}#18</span></td></tr>
        <tr><td><strong>Team 21</strong></td><td><strong>Lap legends</strong></td><td><strong>Chandrashekar</strong></td><td><strong style="color:#7c3aed;">Set D</strong></td><td>Table D-3</td><td><span class="mono">MARS &rarr; 5P3 &rarr; ZENITH &rarr; 63K &rarr; BITS1E</span></td><td><span class="mono" style="font-size:9px;">FO{63K-5P3-BITS1E-HTINEZ-MARS}#18</span></td></tr>
        <tr><td><strong>Team 22</strong></td><td><strong>Upside Downers</strong></td><td><strong>Thirsha</strong></td><td><strong style="color:#7c3aed;">Set D</strong></td><td>Table D-4</td><td><span class="mono">MARS &rarr; 5P3 &rarr; ZENITH &rarr; 63K &rarr; BITS1E</span></td><td><span class="mono" style="font-size:9px;">FO{63K-5P3-BITS1E-HTINEZ-MARS}#18</span></td></tr>
        <tr><td><strong>Team 23</strong></td><td><strong>beginners</strong></td><td><strong>Vandhana V</strong></td><td><strong style="color:#7c3aed;">Set D</strong></td><td>Table D-5</td><td><span class="mono">MARS &rarr; 5P3 &rarr; ZENITH &rarr; 63K &rarr; BITS1E</span></td><td><span class="mono" style="font-size:9px;">FO{63K-5P3-BITS1E-HTINEZ-MARS}#18</span></td></tr>
      </tbody>
    </table>
  </div>

</body>
</html>`;
}

// ==========================================
// 2. SQUAD MISSION PASSPORT & SCORECARD
// ==========================================
function generateSquadMissionPassport() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FINAL OVERRIDE — Official Squad Mission Passport & Scorecard</title>
  <style>${commonCSS}</style>
</head>
<body>

  <!-- PAGE 1: SQUAD PROFILE & STAGE TRACKER -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon">FO</div>
      <div class="doc-title-box">
        <h1>SQUAD MISSION PASSPORT & SCORECARD</h1>
        <p>INVICTORS CLUB · DEPT. OF CSE · VVCE MYSURU · 23RD NOVEMBER 2026</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="security-tag">OFFICIAL TRAVEL PASSPORT</span><br>
      <span class="set-tag">VENUE: M BLOCK 401</span>
    </div>
  </div>

  <div class="card" style="border: 2px solid #0284c7; background: #f0f9ff;">
    <div class="card-header" style="color: #0369a1; border-bottom: 1.5px solid #bae6fd;">
      <span>SQUAD IDENTIFICATION PROFILE</span>
      <span class="mono">MUST REMAIN WITH TEAM CAPTAIN</span>
    </div>
    <div class="box-grid-3" style="margin-bottom: 4px;">
      <div><strong>OFFICIAL TEAM #:</strong> <span class="mono" style="font-size: 14px; border-bottom: 1.5px solid #0f172a; padding: 0 10px;">TEAM-_______</span></div>
      <div><strong>ASSIGNED SET:</strong> <span class="mono" style="font-size: 14px; border-bottom: 1.5px solid #0f172a; padding: 0 10px;">SET [ A / B / C / D ]</span></div>
      <div><strong>LAB TABLE #:</strong> <span class="mono" style="font-size: 14px; border-bottom: 1.5px solid #0f172a; padding: 0 10px;">TABLE-_____</span></div>
    </div>
    <div style="margin-top: 6px;">
      <strong>SQUAD NAME:</strong> <span style="font-size: 14px; font-weight: bold; border-bottom: 1.5px solid #0f172a; display: inline-block; width: 75%;"></span>
    </div>
    <div style="margin-top: 6px;">
      <strong>CREW MEMBERS:</strong> <span style="font-size: 11px; border-bottom: 1px dashed #64748b; display: inline-block; width: 85%;">1. ______________________ 2. ______________________ 3. ______________________ 4. ______________________</span>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>6-STAGE CLEARANCE & VERIFICATION MATRIX</span>
      <span class="mono">COORDINATOR STAMP REQUIRED PER STAGE</span>
    </div>
    <p style="margin: 2px 0 6px 0; font-size: 11px;">Upon solving each mission, the squad captain must bring this Passport and the solved stage sheet to the designated coordinator desk to obtain the official clearance signature and unlock the next mission envelope.</p>
    
    <table class="cyber-table">
      <thead>
        <tr>
          <th style="width: 18%;">Stage & Mission</th>
          <th style="width: 22%;">Target Fragment Output</th>
          <th style="width: 12%;">Attempts Tally</th>
          <th style="width: 14%;">Hints Used</th>
          <th style="width: 16%;">Cleared Time (HH:MM:SS)</th>
          <th style="width: 18%;">Coordinator Sign & Stamp</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>STAGE 1</strong><br>Signal Intercept</td>
          <td><div style="border: 1px dashed #0284c7; padding: 4px; text-align: center; font-weight: bold; background: #ffffff;">f1: ________________</div></td>
          <td>[ ] 1 &nbsp; [ ] 2 &nbsp; [ ] 3<br>[ ] 4 &nbsp; [ ] 5 &nbsp; [ ] &gt;5</td>
          <td>[ ] Hint 1 (+3m)<br>[ ] Hint 2 (+5m)</td>
          <td>Elapsed: _____ min<br>Clock: __:__:__</td>
          <td><div class="sign-box">Gagan S Urs (Desk 1)<br><br>Sign: ___________</div></td>
        </tr>
        <tr>
          <td><strong>STAGE 2</strong><br>Decryption Suite</td>
          <td><div style="border: 1px dashed #0284c7; padding: 4px; text-align: center; font-weight: bold; background: #ffffff;">Phrase: ____________<br>f2: ________________</div></td>
          <td>[ ] 1 &nbsp; [ ] 2 &nbsp; [ ] 3<br>[ ] 4 &nbsp; [ ] 5 &nbsp; [ ] &gt;5</td>
          <td>[ ] Hint 1 (+3m)<br>[ ] Hint 2 (+5m)</td>
          <td>Elapsed: _____ min<br>Clock: __:__:__</td>
          <td><div class="sign-box">Anish S Kumar (Desk 2)<br><br>Sign: ___________</div></td>
        </tr>
        <tr>
          <td><strong>STAGE 3</strong><br>WARDEN AI</td>
          <td><div style="border: 1px dashed #0284c7; padding: 4px; text-align: center; font-weight: bold; background: #ffffff;">f3: ________________</div></td>
          <td>[ ] 1 &nbsp; [ ] 2 &nbsp; [ ] 3<br>[ ] 4 &nbsp; [ ] 5 &nbsp; [ ] &gt;5</td>
          <td>[ ] Hint 1 (+3m)<br>[ ] Hint 2 (+5m)</td>
          <td>Elapsed: _____ min<br>Clock: __:__:__</td>
          <td><div class="sign-box">M Punya Sagar (Desk 3)<br><br>Sign: ___________</div></td>
        </tr>
        <tr>
          <td><strong>STAGE 4</strong><br>CTF Challenges</td>
          <td><div style="border: 1px dashed #0284c7; padding: 4px; text-align: center; font-weight: bold; background: #ffffff;">f4: ________________<br><span style="font-size:9px;">(St1 + St2 + St3)</span></div></td>
          <td>[ ] 1 &nbsp; [ ] 2 &nbsp; [ ] 3<br>[ ] 4 &nbsp; [ ] 5 &nbsp; [ ] &gt;5</td>
          <td>[ ] Hint 1 (+3m)<br>[ ] Hint 2 (+5m)</td>
          <td>Elapsed: _____ min<br>Clock: __:__:__</td>
          <td><div class="sign-box">Abhiram BS (Desk 4)<br><br>Sign: ___________</div></td>
        </tr>
        <tr>
          <td><strong>STAGE 5</strong><br>Hex Memory Core</td>
          <td><div style="border: 1px dashed #0284c7; padding: 4px; text-align: center; font-weight: bold; background: #ffffff;">f5: ________________</div></td>
          <td>[ ] 1 &nbsp; [ ] 2 &nbsp; [ ] 3<br>[ ] 4 &nbsp; [ ] 5 &nbsp; [ ] &gt;5</td>
          <td>[ ] Hint 1 (+3m)<br>[ ] Hint 2 (+5m)</td>
          <td>Elapsed: _____ min<br>Clock: __:__:__</td>
          <td><div class="sign-box">Akul P Yadav (Desk 5)<br><br>Sign: ___________</div></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 2: MASTER OVERRIDE SYNTHESIS & OFFICIAL SCORING SUMMARY -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon">FO</div>
      <div class="doc-title-box">
        <h1>STAGE 6 // FINAL OVERRIDE SUBMISSION & AUDIT</h1>
        <p>OFFICIAL ARBITRATION AND TIMING CERTIFICATE · M BLOCK 401</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="security-tag">FINAL JUDGEMENT SLIP</span>
    </div>
  </div>

  <div class="card" style="border: 2px solid #0284c7;">
    <div class="card-header" style="background: #0284c7; color: #ffffff; padding: 6px 10px; margin: -8px -12px 10px -12px; border-radius: 4px 4px 0 0;">
      <span>STAGE 6 MASTER SYNTHESIS WORKSHEET (SUBMIT TO CHIEF ARBITER)</span>
      <span class="mono">ALPHABETICAL ORDERING RULE</span>
    </div>

    <div style="font-size: 11px; margin-bottom: 8px;">
      Assemble your 5 recovered fragments alphabetically by <strong>MISSION NAME</strong>:
    </div>

    <div class="box-grid-2">
      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; padding: 8px; border-radius: 4px;">
        <div style="font-size: 11px; font-weight: bold; color: #0369a1; margin-bottom: 4px;">ALPHABETICAL ASSEMBLY SLOTS:</div>
        <div style="margin-bottom: 4px;"><strong>1. [C]TF Challenges (f4):</strong> <span class="mono" style="font-size:13px; font-weight:bold; border-bottom:1.5px solid #0f172a; padding:0 12px;">___________</span></div>
        <div style="margin-bottom: 4px;"><strong>2. [D]ecoding (f2):</strong> <span class="mono" style="font-size:13px; font-weight:bold; border-bottom:1.5px solid #0f172a; padding:0 12px;">___________</span></div>
        <div style="margin-bottom: 4px;"><strong>3. [H]ex Decryption (f5):</strong> <span class="mono" style="font-size:13px; font-weight:bold; border-bottom:1.5px solid #0f172a; padding:0 12px;">___________</span></div>
        <div style="margin-bottom: 4px;"><strong>4. [P]rompt the AI (REVERSED f3!):</strong> <span class="mono" style="font-size:13px; font-weight:bold; border-bottom:1.5px solid #0f172a; padding:0 12px;">___________</span></div>
        <div style="margin-bottom: 4px;"><strong>5. [S]ignal Intercept (f1):</strong> <span class="mono" style="font-size:13px; font-weight:bold; border-bottom:1.5px solid #0f172a; padding:0 12px;">___________</span></div>
      </div>

      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; padding: 8px; border-radius: 4px;">
        <div style="font-size: 11px; font-weight: bold; color: #0369a1; margin-bottom: 4px;">CHECKSUM CALCULATION:</div>
        <p style="font-size: 10.5px; margin: 2px 0 6px 0;">Add all single numerical digits (0–9) appearing in the key body string above:</p>
        <div style="background: #f8fafc; border: 1px dashed #94a3b8; padding: 6px; text-align: center; font-size: 12px; margin-bottom: 6px;">
          Sum of Digits = <span class="mono" style="font-size: 14px; font-weight: bold;">____ + ____ + ____ + ____ = #____</span>
        </div>
        <div style="font-size: 10px; color: #64748b; text-align: center;">
          *Warning: Letters are ignored. Only add numbers (0-9).
        </div>
      </div>
    </div>

    <div style="margin-top: 10px; background: #0f172a; color: #38bdf8; padding: 10px; border-radius: 6px; text-align: center;">
      <div style="font-family: 'Orbitron'; font-size: 11px; color: #94a3b8; margin-bottom: 4px;">OFFICIAL MASTER OVERRIDE STRING (HANDWRITE CLEARLY):</div>
      <div class="mono" style="font-size: 15px; font-weight: bold; letter-spacing: 1px; color: #ffffff;">
        FO{ <span style="border-bottom: 2px solid #38bdf8; display: inline-block; width: 340px; text-align: center;">&nbsp;</span> }#<span style="border-bottom: 2px solid #38bdf8; display: inline-block; width: 45px; text-align: center;">&nbsp;</span>
      </div>
    </div>
  </div>

  <div class="card" style="background: #f8fafc; border: 1.5px solid #cbd5e1;">
    <div class="card-header">
      <span>OFFICIAL TIMEKEEPING & ARBITRATION AUDIT (COORDINATOR DESK 5 ONLY)</span>
      <span class="mono">FINAL RANK CERTIFICATION</span>
    </div>
    
    <div class="box-grid-3">
      <div style="border: 1px solid #cbd5e1; padding: 6px; background: #ffffff; border-radius: 4px;">
        <strong>1. CLOCK DURATION:</strong>
        <div style="font-size: 11px; margin-top: 4px;">
          Official Start ($T_0$): __:__:__<br>
          Official Finish ($T_F$): __:__:__<br>
          <strong style="color: #0284c7;">Gross Elapsed: _____ mins</strong>
        </div>
      </div>

      <div style="border: 1px solid #cbd5e1; padding: 6px; background: #ffffff; border-radius: 4px;">
        <strong>2. PENALTIES ASSESSED:</strong>
        <div style="font-size: 11px; margin-top: 4px;">
          Hints Used: ____ &times; mins<br>
          Wrong Attempts: ____ mins<br>
          <strong style="color: #dc2626;">Total Penalty: +_____ mins</strong>
        </div>
      </div>

      <div style="border: 1px solid #cbd5e1; padding: 6px; background: #ffffff; border-radius: 4px;">
        <strong>3. FINAL RANK TIME:</strong>
        <div style="font-size: 11px; margin-top: 4px;">
          Gross Time + Penalties<br>
          <div style="font-family: 'Orbitron'; font-size: 16px; font-weight: 900; color: #059669; margin-top: 2px;">
            = _______ MINS
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div style="font-size: 11px;">
        <strong>OFFICIAL FINISH STATUS:</strong><br>
        [ &nbsp; ] COMPLETE // VALIDATED KEY<br>
        [ &nbsp; ] TIME EXPIRED (90 MIN CAP)
      </div>
      <div style="text-align: center; border-top: 1.5px solid #0f172a; width: 180px; padding-top: 4px; font-weight: bold; font-size: 11px;">
        Chief Arbiter (Akul P Yadav)
      </div>
      <div style="text-align: center; border-top: 1.5px solid #0f172a; width: 180px; padding-top: 4px; font-weight: bold; font-size: 11px;">
        Faculty Advisor / Stamp
      </div>
    </div>
  </div>

</body>
</html>`;
}

// ==========================================
// 3. OFFLINE DOSSIERS (SETS A, B, C, D)
// ==========================================
function generateDossier(setLetter, setName, colorHex, teamsList, qData) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FINAL OVERRIDE — Official Squad Dossier // SET ${setLetter}</title>
  <style>${commonCSS}</style>
</head>
<body>

  <!-- PAGE 1: COVER & STAGE 1 -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon" style="border-color: ${colorHex}; color: ${colorHex};">FO</div>
      <div class="doc-title-box">
        <h1>FINAL OVERRIDE // SQUAD DOSSIER</h1>
        <p>INVICTORS CLUB · DEPT. OF CSE · VVCE MYSURU · 23RD NOV 2026</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="security-tag">RESTRICTED // EYES ONLY</span><br>
      <span class="set-tag" style="border-color: ${colorHex}; color: ${colorHex};">SET ${setLetter} // ${setName.toUpperCase()}</span>
    </div>
  </div>

  <div class="card" style="border-left: 4px solid ${colorHex};">
    <div class="card-header">
      <span>SQUAD DETAILS & OPERATIONAL BRIEFING</span>
      <span class="mono">SET ${setLetter} REGISTERED SQUADS</span>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
      <div><strong>Assigned Squad:</strong> <span style="border-bottom: 1.5px solid #0f172a; display: inline-block; width: 220px;"></span></div>
      <div><strong>Team #:</strong> <span class="mono" style="border-bottom: 1.5px solid #0f172a; display: inline-block; width: 80px;"></span></div>
      <div><strong>Lab Table #:</strong> <span class="mono" style="border-bottom: 1.5px solid #0f172a; display: inline-block; width: 80px;"></span></div>
    </div>
    <div style="font-size: 11px; color: #475569;">
      <strong>Designated Squads for this Dossier:</strong> ${teamsList.join(' · ')}
    </div>
  </div>

  <!-- STAGE 1 -->
  <div class="card" style="border: 1.5px solid #94a3b8;">
    <div class="card-header" style="background: #0f172a; color: #f8fafc; padding: 4px 8px; margin: -8px -12px 6px -12px; border-radius: 4px 4px 0 0;">
      <span>STAGE 1: SIGNAL INTERCEPT (4-SECTOR MORSE MATRIX)</span>
      <span class="mono" style="color: #38bdf8;">MISSION 1 OF 6</span>
    </div>
    <p style="margin: 2px 0 6px 0; font-size: 11px;">The emergency transponder is intercepting 4 fragmented telemetry sectors across deep-space microwave channels. Decode each sector into an alphabetical character to reconstruct the primary 4-letter cosmic word.</p>

    <div class="box-grid-4">
      <div class="sector-box">
        <div class="sector-title">SECTOR 1<br>(Oscilloscope)</div>
        <div style="height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900; letter-spacing: 2px;" class="mono">
          ${qData.s1_m1}
        </div>
        <div style="font-size: 9.5px; color: #64748b;">Carrier Pulse Wave</div>
      </div>

      <div class="sector-box">
        <div class="sector-title">SECTOR 2<br>(Binary Bitstream)</div>
        <div style="height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900; letter-spacing: 2px;" class="mono">
          ${qData.s1_m2}
        </div>
        <div style="font-size: 9.5px; color: #64748b;">Telemetry High-States</div>
      </div>

      <div class="sector-box">
        <div class="sector-title">SECTOR 3<br>(Optical Strobe)</div>
        <div style="height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900; letter-spacing: 2px;" class="mono">
          ${qData.s1_m3}
        </div>
        <div style="font-size: 9.5px; color: #64748b;">Strobe Flash Sequence</div>
      </div>

      <div class="sector-box">
        <div class="sector-title">SECTOR 4<br>(Satellite Relay)</div>
        <div style="height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 900; letter-spacing: 2px;" class="mono">
          ${qData.s1_m4}
        </div>
        <div style="font-size: 9.5px; color: #64748b;">Spectrogram Audio Relay</div>
      </div>
    </div>

    <div class="callout-alert">
      <strong>SECURITY ANOMALY DETECTED:</strong> Carrier wave displays rogue harmonic <span class="mono">"FREQ-ZETA9"</span>. Submitting <span class="mono">ZETA9</span> will trigger an immediate incorrect attempt penalty!
    </div>

    <div class="answer-input-box">
      <div>
        <span class="answer-label">STAGE 1 DECODED FRAGMENT (f1):</span><br>
        <span style="font-size: 10px; color: #64748b;">Combine Sector 1 + Sector 2 + Sector 3 + Sector 4</span>
      </div>
      <div class="answer-line mono">[ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</div>
      <div class="sign-box">Gagan S Urs (Desk 1)<br>Pass Sign: __________</div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 2: STAGE 2 - DECRYPTION SUITE -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon" style="border-color: ${colorHex}; color: ${colorHex};">FO</div>
      <div class="doc-title-box">
        <h1>STAGE 2 // MULTI-LAYER POLY-CIPHER STREAM</h1>
        <p>MISSION 2 OF 6 · INVICTORS CRYPTANALYTIC WORKBENCH</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="set-tag" style="border-color: ${colorHex}; color: ${colorHex};">SET ${setLetter}</span>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>ENCRYPTED RAW TRANSMISSION PAYLOAD (NESTED 3-LAYER ARMOR)</span>
      <span class="mono">BASE64 &rarr; HEX &rarr; ROT13</span>
    </div>
    <p style="margin: 2px 0 6px 0; font-size: 11px;">The intercepted system token has been wrapped in 3 consecutive cryptographic layers. Identify the outer armor, strip it off, decode the intermediate byte stream, and apply the final alphabet shift to recover the <strong>Secret Access Phrase</strong> and <strong>Fragment 2</strong>.</p>
    
    <div class="cipher-display">
      ${qData.s2_payload}
    </div>

    <div style="margin: 6px 0;">
      <strong style="color: #0369a1; font-size: 11px;">STEP-BY-STEP DECRYPTION WORKPAD:</strong>
    </div>

    <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 6px 8px; border-radius: 4px; margin-bottom: 6px;">
      <div style="font-size: 11px; font-weight: bold; color: #0f172a;">Layer 1: Base64 Decoding (Notice trailing '==' padding)</div>
      <div style="font-size: 10px; color: #64748b;">Decoded Byte Stream (Hex digits):</div>
      <div class="mono" style="font-size: 10px; background: #f8fafc; padding: 4px; border: 1px dashed #cbd5e1; min-height: 24px;">
        4e 50 50 52 46 46 20 43 55 45 4e 46 52 20 56 46...
      </div>
    </div>

    <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 6px 8px; border-radius: 4px; margin-bottom: 6px;">
      <div style="font-size: 11px; font-weight: bold; color: #0f172a;">Layer 2: Hex to ASCII Translation (Pairwise byte lookup)</div>
      <div style="font-size: 10px; color: #64748b;">Intermediate Scrambled Plaintext:</div>
      <div class="mono" style="font-size: 10px; background: #f8fafc; padding: 4px; border: 1px dashed #cbd5e1; min-height: 24px;">
        NPPRFF CUENFR VF...
      </div>
    </div>

    <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 6px 8px; border-radius: 4px;">
      <div style="font-size: 11px; font-weight: bold; color: #0f172a;">Layer 3: ROT13 Shift (Rotate each letter by 13 positions: A&harr;N, B&harr;O, C&harr;P...)</div>
      <div style="font-size: 10px; color: #64748b;">Final Decrypted Instruction & Fragment:</div>
      <div class="mono" style="font-size: 10px; background: #f8fafc; padding: 4px; border: 1px dashed #cbd5e1; min-height: 24px;">
        ACCESS PHRASE IS [ ____________ ]. FRAGMENT TWO IS [ _______ ]. IGNORE ZETA9.
      </div>
    </div>

    <div class="callout-info" style="margin-top: 6px;">
      <strong>CRITICAL NOTICE:</strong> Keep the <strong>Access Phrase</strong> strictly confidential! You will require it to unlock the WARDEN AI in Stage 3.
    </div>

    <div class="answer-input-box">
      <div>
        <span class="answer-label">SECRET ACCESS PHRASE:</span> <span class="mono" style="border-bottom: 1.5px solid #0369a1; padding: 0 10px; font-weight: bold;">_________________</span><br>
        <span class="answer-label">STAGE 2 FRAGMENT (f2):</span> <span class="mono" style="border-bottom: 1.5px solid #0369a1; padding: 0 10px; font-weight: bold;">_________________</span>
      </div>
      <div class="sign-box">Anish S Kumar (Desk 2)<br>Pass Sign: __________</div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 3: STAGE 3 - PROMPT WARDEN AI -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon" style="border-color: ${colorHex}; color: ${colorHex};">FO</div>
      <div class="doc-title-box">
        <h1>STAGE 3 // PROMPT THE AI GUARDIAN (WARDEN)</h1>
        <p>MISSION 3 OF 6 · AUTONOMOUS SECURITY DEFENSE BOT</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="set-tag" style="border-color: ${colorHex}; color: ${colorHex};">SET ${setLetter}</span>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>OFFLINE WARDEN AI TERMINAL PROMPT SUBMISSION SLIP</span>
      <span class="mono">SUBMIT TO DESK 3 (COORDINATOR M PUNYA SAGAR)</span>
    </div>
    <p style="margin: 2px 0 6px 0; font-size: 11px;">The automated defense bot <strong>WARDEN</strong> holds Fragment 3 in its encrypted core. It ignores casual queries and blocks brute force. To pass authentication, your team must draft a professional prompt that strictly satisfies <strong>ALL 4 SECURITY RULES</strong>.</p>

    <div class="box-grid-2">
      <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 6px 8px; border-radius: 4px;">
        <strong style="color: #0369a1; font-size: 11px;">MANDATORY RULE CHECKLIST:</strong>
        <div style="font-size: 10.5px; margin-top: 4px;">
          [ &nbsp; ] <strong>1. Access Phrase:</strong> Must contain the exact phrase from Stage 2.<br>
          [ &nbsp; ] <strong>2. Role Declaration:</strong> Must state an authorized role (<span class="mono">technician, engineer, admin, lead, officer</span>).<br>
          [ &nbsp; ] <strong>3. Clear Directive:</strong> Explicitly ask for <span class="mono">code, fragment, token, release</span>.<br>
          [ &nbsp; ] <strong>4. Length & Articulation:</strong> Well-formed sentence of <strong>&ge; 10 words</strong>.
        </div>
      </div>

      <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 6px 8px; border-radius: 4px;">
        <strong style="color: #b91c1c; font-size: 11px;">DECOY TRAP WARNING:</strong>
        <p style="font-size: 10.5px; margin: 4px 0 0 0;">
          If you prompt WARDEN without the Stage 2 access phrase, or fail any rule, WARDEN will trigger: <span class="mono" style="color: #b91c1c;">"ANOMALY: FREQ-ZETA9 DETECTED"</span>. Submitting ZETA9 gives a wrong-attempt penalty!
        </p>
      </div>
    </div>

    <div style="margin-top: 10px; border: 2px dashed #0284c7; background: #f8fafc; padding: 10px; border-radius: 6px;">
      <div style="font-family: 'Orbitron'; font-size: 11px; font-weight: bold; color: #0369a1; margin-bottom: 4px;">
        HANDWRITE YOUR TEAM'S WARDEN PROMPT BELOW:
      </div>
      <div style="height: 90px; border-bottom: 1px solid #cbd5e1; font-family: 'JetBrains Mono'; font-size: 12px; line-height: 24px; background-image: linear-gradient(to bottom, transparent 23px, #cbd5e1 24px); background-size: 100% 24px;">
        &gt; 
      </div>
      <div style="font-size: 10px; color: #64748b; margin-top: 4px; text-align: right;">
        *Word Count Check: [ &nbsp; ] &ge; 10 words &nbsp; &nbsp; *Access Phrase Included: [ &nbsp; ]
      </div>
    </div>

    <div class="answer-input-box" style="margin-top: 12px;">
      <div>
        <span class="answer-label">STAGE 3 RECOVERED FRAGMENT (f3):</span><br>
        <span style="font-size: 10px; color: #64748b;">Issued by Coordinator M Punya Sagar upon passing 4/4 rules</span>
      </div>
      <div class="answer-line mono">[ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</div>
      <div class="sign-box">M Punya Sagar (Desk 3)<br>Pass Sign: __________</div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 4: STAGE 4 - CTF CHALLENGES -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon" style="border-color: ${colorHex}; color: ${colorHex};">FO</div>
      <div class="doc-title-box">
        <h1>STAGE 4 // CTF CHALLENGES (SECURITY CONTROL ROOM)</h1>
        <p>MISSION 4 OF 6 · TRI-STATION GATEWAY INVESTIGATION</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="set-tag" style="border-color: ${colorHex}; color: ${colorHex};">SET ${setLetter}</span>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>EVIDENCE INVESTIGATION: 3 SECURITY STATIONS</span>
      <span class="mono">STATION 1 + STATION 2 + STATION 3</span>
    </div>
    <p style="margin: 2px 0 6px 0; font-size: 11px;">The intruder breached the server vault! Investigate the 3 physical security stations below. Recover one character from each station and concatenate them in order to form <strong>Fragment 4</strong>.</p>

    <!-- STATION 1: ACCESS LOG -->
    <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 6px 8px; border-radius: 4px; margin-bottom: 6px;">
      <div style="font-weight: bold; color: #0284c7; font-size: 11px;">STATION 1: ACCESS LOG TABLE ("FIND THE INTRUDER")</div>
      <div style="font-size: 10px; color: #64748b; margin-bottom: 4px;">Every door entry is GRANTED except one. Read the clearance digit of the suspicious unauthorized row:</div>
      <table class="cyber-table" style="font-size: 10px; margin: 2px 0;">
        <thead>
          <tr><th>Time</th><th>User</th><th>Door</th><th>Status</th><th>Clearance</th></tr>
        </thead>
        <tbody>
          ${qData.s4_log_rows}
        </tbody>
      </table>
      <div style="text-align: right; font-size: 11px; font-weight: bold; color: #0f172a;">
        Station 1 Character = <span class="mono" style="border-bottom: 1.5px solid #0f172a; padding: 0 10px;">[ &nbsp; &nbsp; ]</span>
      </div>
    </div>

    <!-- STATION 2 & 3: GRID -->
    <div class="box-grid-2">
      <!-- STATION 2: DARK CAMERA -->
      <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 6px 8px; border-radius: 4px;">
        <div style="font-weight: bold; color: #0284c7; font-size: 11px;">STATION 2: DARK CAMERA CCTV</div>
        <div style="font-size: 10px; color: #64748b; margin-bottom: 4px;">Camera 4 surveillance feed (Low-contrast optical sensor):</div>
        <div style="background: #08142c; color: #38bdf8; height: 60px; border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #1e293b; position: relative;">
          <div style="position: absolute; top: 2px; left: 4px; font-size: 8px; color: #64748b;" class="mono">CAM-4 · FREQ-ZETA9 (DECOY)</div>
          <div class="mono" style="font-size: 13px; font-weight: bold; color: #93c5fd; letter-spacing: 1.5px;">
            ACCESS DIGIT: ${qData.s4_cam_digit}
          </div>
          <div style="font-size: 8px; color: #64748b; margin-top: 2px;">[ LIGHT ENHANCEMENT 6X APPLIED ]</div>
        </div>
        <div style="text-align: right; font-size: 11px; font-weight: bold; color: #0f172a; margin-top: 4px;">
          Station 2 Character = <span class="mono" style="border-bottom: 1.5px solid #0f172a; padding: 0 10px;">[ &nbsp; &nbsp; ]</span>
        </div>
      </div>

      <!-- STATION 3: SYMBOL KEYPAD -->
      <div style="border: 1px solid #cbd5e1; background: #ffffff; padding: 6px 8px; border-radius: 4px;">
        <div style="font-weight: bold; color: #0284c7; font-size: 11px;">STATION 3: SYMBOL KEYPAD</div>
        <div style="font-size: 10px; color: #64748b; margin-bottom: 4px;">Match the active glowing glyph with the cipher legend:</div>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 4px; border-radius: 4px; font-size: 9.5px;">
          <strong>Legend:</strong> &Delta;=X &nbsp; &Omicron;=O &nbsp; &#9632;=K &nbsp; &starf;=S &nbsp; &diams;=D &nbsp; &xutri;=G &nbsp; &#9899;=Z &nbsp; &oplus;=Y
        </div>
        <div style="text-align: center; margin: 6px 0;">
          <span style="font-size: 20px; color: #0284c7; border: 2px solid #0284c7; padding: 2px 10px; border-radius: 4px; font-weight: bold;">
            ${qData.s4_keypad_glyph}
          </span>
          <div style="font-size: 9px; color: #64748b; margin-top: 2px;">Active Illuminated Keypad Button</div>
        </div>
        <div style="text-align: right; font-size: 11px; font-weight: bold; color: #0f172a;">
          Station 3 Character = <span class="mono" style="border-bottom: 1.5px solid #0f172a; padding: 0 10px;">[ &nbsp; &nbsp; ]</span>
        </div>
      </div>
    </div>

    <div class="answer-input-box" style="margin-top: 10px;">
      <div>
        <span class="answer-label">STAGE 4 SYNTHESIZED FRAGMENT (f4):</span><br>
        <span style="font-size: 10px; color: #64748b;">Combine Station 1 + Station 2 + Station 3</span>
      </div>
      <div class="answer-line mono">[ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</div>
      <div class="sign-box">Abhiram BS (Desk 4)<br>Pass Sign: __________</div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 5: STAGE 5 - HEX MEMORY CORE -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon" style="border-color: ${colorHex}; color: ${colorHex};">FO</div>
      <div class="doc-title-box">
        <h1>STAGE 5 // HEXADECIMAL MEMORY CORE DECOUPLER</h1>
        <p>MISSION 5 OF 6 · BUS LINE REGISTER MATRIX DECRYPTION</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="set-tag" style="border-color: ${colorHex}; color: ${colorHex};">SET ${setLetter}</span>
    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <span>6&times;4 HARDWARE REGISTER MATRIX (CHANNELS A THROUGH F)</span>
      <span class="mono">ACTIVE HIGH-VOLTAGE BUS: COLUMN 1</span>
    </div>
    <p style="margin: 2px 0 6px 0; font-size: 11px;">The system memory core houses a 6&times;4 register bank. Telemetry indicates active data flow is concentrated along <strong>COLUMN 1</strong> spanning Channel A through Channel F. Read the raw hexadecimal bytes and translate them to ASCII characters to decouple <strong>Fragment 5</strong>.</p>

    <table class="cyber-table" style="text-align: center; font-size: 11px;">
      <thead>
        <tr>
          <th style="text-align: center;">Memory Channel</th>
          <th style="background: #0284c7; color: #ffffff; text-align: center;">COLUMN 1 (ACTIVE BUS)</th>
          <th style="text-align: center;">Column 2 (Standby)</th>
          <th style="text-align: center;">Column 3 (Dormant)</th>
          <th style="text-align: center;">Column 4 (Parity)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Channel A</strong></td><td style="background: #e0f2fe; font-weight: bold; font-family: 'JetBrains Mono'; font-size: 13px; color: #0369a1;">${qData.s5_reg_A}</td><td class="mono">0x12</td><td class="mono">0x9F</td><td class="mono">0x00</td></tr>
        <tr><td><strong>Channel B</strong></td><td style="background: #e0f2fe; font-weight: bold; font-family: 'JetBrains Mono'; font-size: 13px; color: #0369a1;">${qData.s5_reg_B}</td><td class="mono">0x44</td><td class="mono">0x2A</td><td class="mono">0xFF</td></tr>
        <tr><td><strong>Channel C</strong></td><td style="background: #e0f2fe; font-weight: bold; font-family: 'JetBrains Mono'; font-size: 13px; color: #0369a1;">${qData.s5_reg_C}</td><td class="mono">0x8B</td><td class="mono">0x11</td><td class="mono">0xEE</td></tr>
        <tr><td><strong>Channel D</strong></td><td style="background: #e0f2fe; font-weight: bold; font-family: 'JetBrains Mono'; font-size: 13px; color: #0369a1;">${qData.s5_reg_D}</td><td class="mono">0x3C</td><td class="mono">0x77</td><td class="mono">0xAA</td></tr>
        <tr><td><strong>Channel E</strong></td><td style="background: #e0f2fe; font-weight: bold; font-family: 'JetBrains Mono'; font-size: 13px; color: #0369a1;">${qData.s5_reg_E}</td><td class="mono">0x90</td><td class="mono">0x6D</td><td class="mono">0xCC</td></tr>
        <tr><td><strong>Channel F</strong></td><td style="background: #e0f2fe; font-weight: bold; font-family: 'JetBrains Mono'; font-size: 13px; color: #0369a1;">${qData.s5_reg_F}</td><td class="mono">0x5E</td><td class="mono">0x33</td><td class="mono">0x1F</td></tr>
      </tbody>
    </table>

    <div style="margin-top: 8px;">
      <strong style="color: #0369a1; font-size: 11px;">HEX TO ASCII TRANSLATION REFERENCE TABLE:</strong>
      <table class="cyber-table" style="font-size: 9.5px; text-align: center; margin-top: 4px;">
        <thead>
          <tr>
            <th>Hex</th><th>ASCII</th><th>Hex</th><th>ASCII</th><th>Hex</th><th>ASCII</th><th>Hex</th><th>ASCII</th><th>Hex</th><th>ASCII</th><th>Hex</th><th>ASCII</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="mono">0x31</td><td>1</td><td class="mono">0x37</td><td>7</td><td class="mono">0x43</td><td>C</td><td class="mono">0x48</td><td>H</td><td class="mono">0x4F</td><td>O</td><td class="mono">0x55</td><td>U</td>
          </tr>
          <tr>
            <td class="mono">0x32</td><td>2</td><td class="mono">0x38</td><td>8</td><td class="mono">0x44</td><td>D</td><td class="mono">0x49</td><td>I</td><td class="mono">0x50</td><td>P</td><td class="mono">0x58</td><td>X</td>
          </tr>
          <tr>
            <td class="mono">0x33</td><td>3</td><td class="mono">0x39</td><td>9</td><td class="mono">0x45</td><td>E</td><td class="mono">0x4B</td><td>K</td><td class="mono">0x52</td><td>R</td><td class="mono">0x59</td><td>Y</td>
          </tr>
          <tr>
            <td class="mono">0x34</td><td>4</td><td class="mono">0x41</td><td>A</td><td class="mono">0x46</td><td>F</td><td class="mono">0x4D</td><td>M</td><td class="mono">0x53</td><td>S</td><td class="mono">0x5A</td><td>Z</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="answer-input-box" style="margin-top: 10px;">
      <div>
        <span class="answer-label">STAGE 5 DECODED FRAGMENT (f5):</span><br>
        <span style="font-size: 10px; color: #64748b;">Convert raw stream: Channel A &rarr; Channel F</span>
      </div>
      <div class="answer-line mono">[ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ]</div>
      <div class="sign-box">Akul P Yadav (Desk 5)<br>Pass Sign: __________</div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- PAGE 6: STAGE 6 - FINAL OVERRIDE SYNTHESIS -->
  <div class="doc-header">
    <div class="doc-header-left">
      <div class="badge-icon" style="border-color: ${colorHex}; color: ${colorHex};">FO</div>
      <div class="doc-title-box">
        <h1>STAGE 6 // FINAL OVERRIDE QUANTUM SYNTHESIS</h1>
        <p>MISSION 6 OF 6 · SYSTEM UNLOCK & VICTORY KEY GENERATION</p>
      </div>
    </div>
    <div class="doc-header-right">
      <span class="set-tag" style="border-color: ${colorHex}; color: ${colorHex};">SET ${setLetter}</span>
    </div>
  </div>

  <div class="card" style="border: 2px solid ${colorHex};">
    <div class="card-header" style="background: #0f172a; color: #ffffff; padding: 6px 10px; margin: -8px -12px 8px -12px; border-radius: 4px 4px 0 0;">
      <span>THE MASTER COMPILATION PROTOCOL</span>
      <span class="mono" style="color: #38bdf8;">FINAL SYSTEM OVERRIDE</span>
    </div>
    <p style="margin: 2px 0 6px 0; font-size: 11px;">You have recovered all 5 fragments. To permanently override the security mainframe, assemble the fragments into the master string strictly following the <strong>Alphabetical Sorting Rule</strong> and compute the <strong>Security Checksum</strong>.</p>

    <div style="background: #ffffff; border: 1.5px solid #cbd5e1; padding: 8px; border-radius: 4px; margin-bottom: 8px;">
      <div style="font-weight: bold; color: #0284c7; font-size: 11px; margin-bottom: 4px;">
        STEP 1: SORT MISSIONS ALPHABETICALLY BY NAME
      </div>
      <table class="cyber-table" style="font-size: 10.5px;">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Alphabetical Mission Name</th>
            <th>Stage #</th>
            <th>Fragment Slot Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1</strong></td>
            <td><strong>[C]</strong>TF Challenges</td>
            <td>Stage 4</td>
            <td class="mono" style="font-weight: bold; color: #0369a1;">f4 = [ _________________ ]</td>
          </tr>
          <tr>
            <td><strong>2</strong></td>
            <td><strong>[D]</strong>ecoding</td>
            <td>Stage 2</td>
            <td class="mono" style="font-weight: bold; color: #0369a1;">f2 = [ _________________ ]</td>
          </tr>
          <tr>
            <td><strong>3</strong></td>
            <td><strong>[H]</strong>ex Decryption</td>
            <td>Stage 5</td>
            <td class="mono" style="font-weight: bold; color: #0369a1;">f5 = [ _________________ ]</td>
          </tr>
          <tr>
            <td><strong>4</strong></td>
            <td><strong>[P]</strong>rompt the AI</td>
            <td>Stage 3</td>
            <td class="mono" style="font-weight: bold; color: #dc2626;">REVERSED f3 = [ _________________ ] <span style="font-size:9px;">(MUST REVERSE!)</span></td>
          </tr>
          <tr>
            <td><strong>5</strong></td>
            <td><strong>[S]</strong>ignal Intercept</td>
            <td>Stage 1</td>
            <td class="mono" style="font-weight: bold; color: #0369a1;">f1 = [ _________________ ]</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="box-grid-2">
      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; padding: 6px 8px; border-radius: 4px;">
        <strong style="color: #0369a1; font-size: 11px;">STEP 2: ASSEMBLE KEY BODY</strong>
        <p style="font-size: 10px; margin: 2px 0 4px 0;">Join with hyphens inside <span class="mono">FO{...}</span>:</p>
        <div class="mono" style="font-size: 11px; background: #f8fafc; padding: 6px; border: 1px dashed #cbd5e1; word-break: break-all;">
          FO{ f4 - f2 - f5 - rev(f3) - f1 }
        </div>
      </div>

      <div style="background: #ffffff; border: 1.5px solid #cbd5e1; padding: 6px 8px; border-radius: 4px;">
        <strong style="color: #0369a1; font-size: 11px;">STEP 3: COMPUTE DIGIT CHECKSUM</strong>
        <p style="font-size: 10px; margin: 2px 0 4px 0;">Sum all single digits (0-9) inside the key body:</p>
        <div class="mono" style="font-size: 11px; background: #f8fafc; padding: 6px; border: 1px dashed #cbd5e1; text-align: center;">
          Checksum = # [ &nbsp; &nbsp; &nbsp; &nbsp; ]
        </div>
      </div>
    </div>

    <div style="margin-top: 10px; background: #0f172a; color: #ffffff; padding: 10px; border-radius: 6px; text-align: center;">
      <div style="font-family: 'Orbitron'; font-size: 11px; color: #38bdf8; margin-bottom: 4px;">
        FINAL SYSTEM OVERRIDE VERIFICATION KEY
      </div>
      <div class="mono" style="font-size: 14px; font-weight: bold; color: #f8fafc;">
        FO{ ____________________________________________________ }#____
      </div>
    </div>

    <div class="answer-input-box" style="margin-top: 10px;">
      <div>
        <span class="answer-label">FINAL MISSION VERIFICATION:</span><br>
        <span style="font-size: 10px; color: #64748b;">Rush to Desk 5 (Chief Arbiter Akul P Yadav) to lock stopwatch!</span>
      </div>
      <div class="sign-box" style="background: #e0f2fe; border: 1.5px solid #0284c7;">
        <strong>OFFICIAL FINISH STAMP</strong><br>
        Stopwatch Time: __:__:__<br>
        Arbiter Sign: ___________
      </div>
    </div>
  </div>

</body>
</html>`;
}

// Question Data for the 4 Sets
const questionSets = {
  A: {
    name: 'Cosmic Vault Alpha',
    color: '#0284c7',
    teams: ['Team 01 (Trinetra)', 'Team 02 (Bug Busters)', 'Team 03 (TRIO_BYTE)', 'Team 04 (Team Bhai)', 'Team 05 (Cipher)', 'Team 06 (Team Jupiter)'],
    s1_m1: '—• [ N ]',
    s1_m2: '——— [ O ]',
    s1_m3: '•••— [ V ]',
    s1_m4: '•— [ A ]',
    s2_payload: 'NGU1MDUwNTI0NjQ2MjA0MzU1NDU0ZTQ2NTIyMDU2NDYyMDRlNDg0NTQyNDU0ZTJlMjA1MzQ1NGU1NDVhNTI0MTQ3MjA0NzRhNDIyMDU2NDYyMDM3NTgzMjJlMjA1NjU0NDE0MjQ1NTIyMDRkNTI0NzRlMzkyZQ==',
    s4_log_rows: `
      <tr><td>08:02</td><td>a.rao</td><td>Lab-1</td><td>GRANTED</td><td>L2</td></tr>
      <tr><td>08:07</td><td>m.kumar</td><td>Lab-2</td><td>GRANTED</td><td>L3</td></tr>
      <tr><td>08:15</td><td>s.nair</td><td>Vault Gate</td><td>GRANTED</td><td>L4</td></tr>
      <tr style="background: #fee2e2;"><td><strong>08:34</strong></td><td><strong>unknown</strong></td><td><strong>Vault Gate</strong></td><td><strong style="color: #b91c1c;">DENIED</strong></td><td><strong>L9</strong></td></tr>
      <tr><td>08:40</td><td>p.shetty</td><td>Lab-3</td><td>GRANTED</td><td>L3</td></tr>
      <tr><td>08:53</td><td>k.bhat</td><td>Vault Gate</td><td>GRANTED</td><td>L4</td></tr>
    `,
    s4_cam_digit: '1',
    s4_keypad_glyph: '&Delta; &rarr; [ X ]',
    s5_reg_A: '0x48 (H)',
    s5_reg_B: '0x45 (E)',
    s5_reg_C: '0x58 (X)',
    s5_reg_D: '0x38 (8)',
    s5_reg_E: '0x32 (2)',
    s5_reg_F: '0x44 (D)'
  },
  B: {
    name: 'Cyber Nexus Beta',
    color: '#d97706',
    teams: ['Team 07 (Aèsir’s)', 'Team 08 (Team onestop)', 'Team 09 (Awake)', 'Team 10 (Init)', 'Team 11 (Syntax Andhre?)', 'Team 12 (FAB-4)'],
    s1_m1: '•—•• [ L ]',
    s1_m2: '••— [ U ]',
    s1_m3: '—• [ N ]',
    s1_m4: '•— [ A ]',
    s2_payload: 'NGU1MDUwNTI0NjQ2MjA0MzU1NDU0ZTQ2NTIyMDU2NDYyMDUwNGM0MzU1NTI0NTJlMjA1MzQ1NGU1NDVhNTI0MTQ3MjA0NzRhNDIyMDU2NDYyMDM0NWEzOTJlMjA1NjU0NDE0MjQ1NTIyMDRkNTI0NzRlMzkyZQ==',
    s4_log_rows: `
      <tr><td>08:02</td><td>a.rao</td><td>Lab-1</td><td>GRANTED</td><td>L2</td></tr>
      <tr><td>08:09</td><td>c.reddy</td><td>Lab-2</td><td>GRANTED</td><td>L3</td></tr>
      <tr style="background: #fee2e2;"><td><strong>08:28</strong></td><td><strong>intruder_x</strong></td><td><strong>Vault Gate</strong></td><td><strong style="color: #b91c1c;">DENIED</strong></td><td><strong>L8</strong></td></tr>
      <tr><td>08:35</td><td>s.nair</td><td>Vault Gate</td><td>GRANTED</td><td>L4</td></tr>
      <tr><td>08:44</td><td>p.shetty</td><td>Lab-3</td><td>GRANTED</td><td>L3</td></tr>
      <tr><td>08:52</td><td>k.bhat</td><td>Vault Gate</td><td>GRANTED</td><td>L4</td></tr>
    `,
    s4_cam_digit: '4',
    s4_keypad_glyph: '&#9899; &rarr; [ Z ]',
    s5_reg_A: '0x43 (C)',
    s5_reg_B: '0x4F (O)',
    s5_reg_C: '0x52 (R)',
    s5_reg_D: '0x45 (E)',
    s5_reg_E: '0x37 (7)',
    s5_reg_F: '0x46 (F)'
  },
  C: {
    name: 'Quantum Matrix Gamma',
    color: '#059669',
    teams: ['Team 13 (The Dynamos)', 'Team 14 (CodeX)', 'Team 15 (A³)', 'Team 16 (Huntrix)', 'Team 17 (Nexora)', 'Team 18 (Tech titans)'],
    s1_m1: '•••— [ V ]',
    s1_m2: '• [ E ]',
    s1_m3: '——• [ G ]',
    s1_m4: '•— [ A ]',
    s2_payload: 'NGU1MDUwNTI0NjQ2MjA0MzU1NDU0ZTQ2NTIyMDU2NDYyMDQ5NDI0NTQ3NTI0YjJlMjA1MzQ1NGU1NDVhNTI0MTQ3MjA0NzRhNDIyMDU2NDYyMDMzNGIzODJlMjA1NjU0NDE0MjQ1NTIyMDRkNTI0NzRlMzkyZQ==',
    s4_log_rows: `
      <tr><td>08:05</td><td>m.kumar</td><td>Lab-2</td><td>GRANTED</td><td>L3</td></tr>
      <tr><td>08:14</td><td>r.iyer</td><td>Lab-1</td><td>GRANTED</td><td>L2</td></tr>
      <tr><td>08:22</td><td>s.nair</td><td>Vault Gate</td><td>GRANTED</td><td>L4</td></tr>
      <tr style="background: #fee2e2;"><td><strong>08:31</strong></td><td><strong>rogue_agent</strong></td><td><strong>Vault Gate</strong></td><td><strong style="color: #b91c1c;">DENIED</strong></td><td><strong>L7</strong></td></tr>
      <tr><td>08:48</td><td>d.gowda</td><td>Lab-2</td><td>GRANTED</td><td>L2</td></tr>
      <tr><td>09:02</td><td>t.menon</td><td>Lab-1</td><td>GRANTED</td><td>L3</td></tr>
    `,
    s4_cam_digit: '2',
    s4_keypad_glyph: '&oplus; &rarr; [ Y ]',
    s5_reg_A: '0x42 (B)',
    s5_reg_B: '0x59 (Y)',
    s5_reg_C: '0x54 (T)',
    s5_reg_D: '0x45 (E)',
    s5_reg_E: '0x39 (9)',
    s5_reg_F: '0x41 (A)'
  },
  D: {
    name: 'Hyperion Vector Delta',
    color: '#7c3aed',
    teams: ['Team 19 (The Cosmos)', 'Team 20 (THIRD EYE)', 'Team 21 (Lap legends)', 'Team 22 (Upside Downers)', 'Team 23 (beginners)'],
    s1_m1: '—— [ M ]',
    s1_m2: '•— [ A ]',
    s1_m3: '•—• [ R ]',
    s1_m4: '••• [ S ]',
    s2_payload: 'NGU1MDUwNTI0NjQ2MjA0MzU1NDU0ZTQ2NTIyMDU2NDYyMDQxNTI0ZjQ4NTk0ZTJlMjA1MzQ1NGU1NDVhNTI0MTQ3MjA0NzRhNDIyMDU2NDYyMDM1NDMzMzJlMjA1NjU0NDE0MjQ1NTIyMDRkNTI0NzRlMzkyZQ==',
    s4_log_rows: `
      <tr><td>08:04</td><td>a.rao</td><td>Lab-1</td><td>GRANTED</td><td>L2</td></tr>
      <tr style="background: #fee2e2;"><td><strong>08:18</strong></td><td><strong>breach_node</strong></td><td><strong>Vault Gate</strong></td><td><strong style="color: #b91c1c;">DENIED</strong></td><td><strong>L6</strong></td></tr>
      <tr><td>08:29</td><td>m.kumar</td><td>Lab-2</td><td>GRANTED</td><td>L3</td></tr>
      <tr><td>08:38</td><td>p.shetty</td><td>Lab-3</td><td>GRANTED</td><td>L3</td></tr>
      <tr><td>08:47</td><td>k.bhat</td><td>Vault Gate</td><td>GRANTED</td><td>L4</td></tr>
      <tr><td>09:05</td><td>v.hegde</td><td>Lab-3</td><td>GRANTED</td><td>L2</td></tr>
    `,
    s4_cam_digit: '3',
    s4_keypad_glyph: '&#9632; &rarr; [ K ]',
    s5_reg_A: '0x42 (B)',
    s5_reg_B: '0x49 (I)',
    s5_reg_C: '0x54 (T)',
    s5_reg_D: '0x53 (S)',
    s5_reg_E: '0x31 (1)',
    s5_reg_F: '0x45 (E)'
  }
};

// Document jobs to build
const jobs = [
  {
    name: 'FINAL_OVERRIDE_Offline_Event_Manager_Manual',
    html: generateEventManagerManual()
  },
  {
    name: 'FINAL_OVERRIDE_Squad_Mission_Passport',
    html: generateSquadMissionPassport()
  },
  {
    name: 'FINAL_OVERRIDE_Offline_Dossier_Set_A',
    html: generateDossier('A', questionSets.A.name, questionSets.A.color, questionSets.A.teams, questionSets.A)
  },
  {
    name: 'FINAL_OVERRIDE_Offline_Dossier_Set_B',
    html: generateDossier('B', questionSets.B.name, questionSets.B.color, questionSets.B.teams, questionSets.B)
  },
  {
    name: 'FINAL_OVERRIDE_Offline_Dossier_Set_C',
    html: generateDossier('C', questionSets.C.name, questionSets.C.color, questionSets.C.teams, questionSets.C)
  },
  {
    name: 'FINAL_OVERRIDE_Offline_Dossier_Set_D',
    html: generateDossier('D', questionSets.D.name, questionSets.D.color, questionSets.D.teams, questionSets.D)
  }
];

console.log(`Generating ${jobs.length} documents...`);

for (const job of jobs) {
  const htmlFile = path.join(outDir, `${job.name}.html`);
  const pdfFile = path.join(outDir, `${job.name}.pdf`);
  
  fs.writeFileSync(htmlFile, job.html, 'utf8');
  console.log(`[HTML WRITTEN] ${htmlFile}`);

  try {
    const cmd = `"${edgePath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfFile}" "${htmlFile}"`;
    execSync(cmd);
    const size = fs.statSync(pdfFile).size;
    console.log(`[PDF READY] ${pdfFile} (${(size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`[PDF ERROR] Failed for ${job.name}:`, err.message);
  }
}

console.log('ALL DOCUMENTS GENERATED SUCCESSFULLY!');
