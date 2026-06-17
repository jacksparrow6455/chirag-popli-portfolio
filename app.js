const d = resumeData;
let activeSection = 'overview';
let chartsInited = false;
let charts = {};

function skillIconUrl(name) {
  var slug = d.skillIcons[name.toLowerCase()] || null;
  if (!slug) return null;
  return `https://cdn.simpleicons.org/${slug}/8b9dc3`;
}

function techTagHtml(name) {
  var icon = skillIconUrl(name);
  return `<span class="tech-tag">${icon ? `<img src="${icon}" alt="" class="tech-icon"> ` : ''}${name}</span>`;
}

function companyBadge(company) {
  var c = d.companyColors[company];
  if (!c) return '';
  return `<span class="company-badge" style="background:${c.bg};color:${c.color}">${c.abbr}</span>`;
}

function metricIcon(label) {
  var map = {
    'Years Experience': '\u{1F4C5}',
    'Dashboards Built': '\u{1F4CA}',
    'Reports Automated': '\u{2699}',
    'Client Appreciations': '\u{1F31F}',
    'Awards Won': '\u{1F3C6}',
    'Cross-Functional Teams': '\u{1F91D}'
  };
  return map[label] || '';
}

function render() {
  document.getElementById('app').innerHTML = `
    <div class="overlay" id="overlay"></div>
    <aside class="sidebar" id="sidebar">${renderSidebar()}</aside>
    <div class="main">
      <header class="header">${renderHeader()}</header>
      <main class="content">
        <section class="section active" id="sec-overview">${renderHero()}${renderOverview()}</section>
        <section class="section" id="sec-experience">${renderExperience()}</section>
        <section class="section" id="sec-skills">${renderSkills()}</section>
        <section class="section" id="sec-projects">${renderProjects()}</section>
        <section class="section" id="sec-education">${renderEducation()}</section>
        <section class="section" id="sec-contact">${renderContact()}</section>
      </main>
    </div>`;
  bindEvents();
  if (!chartsInited) { initCharts(); chartsInited = true; }
  animateSkillBars();
}

function renderSidebar() {
  var items = [
    { id: 'overview', icon: '\u{1F4CA}', label: 'Overview' },
    { id: 'experience', icon: '\u{1F4BC}', label: 'Experience' },
    { id: 'skills', icon: '\u{1F6E0}', label: 'Skills' },
    { id: 'projects', icon: '\u{1F680}', label: 'Projects' },
    { id: 'education', icon: '\u{1F393}', label: 'Education' },
    { id: 'contact', icon: '\u{1F4EC}', label: 'Contact' }
  ];
  return `
    <div class="sidebar-header">
      <div class="sidebar-avatar" style="overflow:hidden"><img src="avatar.png" alt="${d.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>
      <div class="sidebar-name">${d.name}</div>
      <div class="sidebar-role">${d.title}</div>
    </div>
    <nav class="sidebar-nav" aria-label="Main navigation">
      <div class="nav-section">Navigation</div>
      ${items.map(item => `
        <div class="nav-item ${activeSection === item.id ? 'active' : ''}" data-section="${item.id}" role="button" tabindex="0">
          <span class="nav-icon">${item.icon}</span>${item.label}
        </div>`).join('')}
    </nav>
    <div class="sidebar-footer"><span class="status-dot"></span> Available for opportunities</div>`;
}

function renderHeader() {
  return `
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">\u2630</button>
    <div class="header-title">portfolio<span>.sh</span> ~/<span id="current-section">${activeSection}</span></div>
    <div class="header-actions">
      <a href="mailto:${d.email}" style="text-decoration:none">
        <button style="padding:6px 16px;background:var(--gradient1);border:none;border-radius:6px;color:white;cursor:pointer;font-size:12px;font-family:var(--font-mono)">\u2709 Contact</button>
      </a>
    </div>`;
}

function renderHero() {
  return `
    <div class="hero">
      <h1>Hi, I'm <span class="gradient">${d.name}</span></h1>
      <p class="tagline">${d.tagline}</p>
    </div>
    <div class="metrics-grid">
      ${d.metrics.map(m => `
        <div class="metric-card">
          <div class="metric-icon">${metricIcon(m.label)}</div>
          <div class="metric-value">${m.value}</div>
          <div class="metric-label">${m.label}</div>
        </div>`).join('')}
    </div>`;
}

function renderOverview() {
  return `
    <div class="section-header"><div class="section-icon">\u{1F4CA}</div><h2 class="section-title">Dashboard</h2></div>
    <div class="chart-grid">
      <div class="chart-container"><div class="chart-title">Skills Proficiency</div><div class="chart-wrapper"><canvas id="skillsBarChart"></canvas></div></div>
      <div class="chart-container"><div class="chart-title">Career Timeline</div><div class="chart-wrapper"><canvas id="timelineChart"></canvas></div></div>
    </div>
    <div class="radar-section">
      <div class="chart-container"><div class="chart-title">Skill Distribution by Category</div><div class="chart-wrapper"><canvas id="radarChart"></canvas></div></div>
      <div class="chart-container"><div class="chart-title">Impact by Domain</div><div class="chart-wrapper"><canvas id="doughnutChart"></canvas></div></div>
    </div>
    <div class="exp-card" style="border-left:3px solid var(--accent)">
      <p style="color:var(--text-secondary);font-size:15px;line-height:1.8">${d.summary}</p>
    </div>`;
}

function renderExperience() {
  return `
    <div class="section-header"><div class="section-icon">\u{1F4BC}</div><h2 class="section-title">Experience</h2></div>
    ${d.experience.map(exp => `
      <div class="exp-card">
        <div class="exp-card-header">
          <div class="exp-card-title-row">
            ${companyBadge(exp.company)}
            <div class="exp-card-title-text">
              <div class="exp-role">${exp.role}</div>
              <div class="exp-company">${exp.company}</div>
              ${exp.client ? `<div class="exp-client">Client: ${exp.client}</div>` : ''}
            </div>
          </div>
          <div class="exp-meta">${exp.period}</div>
        </div>
        <ul class="exp-achievements">${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
        <div class="exp-tech">${exp.tech.map(techTagHtml).join('')}</div>
      </div>`).join('')}`;
}

function renderSkills() {
  return `
    <div class="section-header"><div class="section-icon">\u{1F6E0}</div><h2 class="section-title">Skills</h2></div>
    <div class="skills-grid">
      ${Object.entries(d.skills).map(([group, skills]) => `
        <div class="skill-group">
          <div class="skill-group-title">${group}</div>
          ${skills.map(s => `
            <div class="skill-item">
              <div class="skill-info"><span class="skill-name">${s.name}</span><span class="skill-level">${s.level}%</span></div>
              <div class="skill-bar"><div class="skill-fill" data-level="${s.level}"></div></div>
            </div>`).join('')}
        </div>`).join('')}
    </div>`;
}

function renderProjects() {
  var techSet = {};
  d.projects.forEach(p => p.tech.forEach(t => { techSet[t] = true; }));
  var allTech = Object.keys(techSet);
  return `
    <div class="section-header"><div class="section-icon">\u{1F680}</div><h2 class="section-title">Projects</h2></div>
    <div class="project-filters">
      <button class="filter-btn active" data-filter="all" role="button" tabindex="0">All</button>
      ${allTech.map(t => `<button class="filter-btn" data-filter="${t}" role="button" tabindex="0">${t}</button>`).join('')}
    </div>
    <div class="projects-grid" id="projects-grid">
      ${d.projects.map(p => `
        <div class="project-card" data-tech="${p.tech.join(',')}">
          <div class="project-title">${p.title}</div>
          <div class="project-desc">${p.description}</div>
          <div class="project-impact">Impact: ${p.impact}</div>
          <div class="exp-tech">${p.tech.map(techTagHtml).join('')}</div>
        </div>`).join('')}
    </div>`;
}

function renderEducation() {
  return `
    <div class="section-header"><div class="section-icon">\u{1F393}</div><h2 class="section-title">Education & Certifications</h2></div>
    <div class="edu-timeline">${d.education.map(e => `
      <div class="edu-item">
        <div class="edu-degree">${e.degree}</div>
        <div class="edu-school">${e.school}</div>
        <div class="edu-meta"><span>${e.period}</span><span class="edu-grade">${e.grade}</span></div>
      </div>`).join('')}
    </div>
    <div style="margin-top:32px">
      <h3 style="font-size:18px;margin-bottom:16px;color:var(--text-secondary)">Certifications</h3>
      <div class="certs-list">${d.certifications.map(c => `
        <div class="cert-item"><span class="cert-icon">\u{1F3C5}</span>${c}</div>`).join('')}
      </div>
    </div>`;
}

function renderContact() {
  return `
    <div class="section-header"><div class="section-icon">\u{1F4EC}</div><h2 class="section-title">Get in Touch</h2></div>
    <div class="contact-grid">
      <div class="contact-card" onclick="window.open('mailto:${d.email}')"><div class="contact-icon">\u2709</div><div class="contact-label">Email</div><div class="contact-value">${d.email}</div></div>
      <div class="contact-card" onclick="window.open('https://${d.linkedin}','_blank')"><div class="contact-icon">\u{1F517}</div><div class="contact-label">LinkedIn</div><div class="contact-value">Connect</div></div>
      <div class="contact-card" onclick="window.open('https://${d.github}','_blank')"><div class="contact-icon">\u{1F4BB}</div><div class="contact-label">GitHub</div><div class="contact-value">${d.github}</div></div>
      <div class="contact-card"><div class="contact-icon">\u{1F4CD}</div><div class="contact-label">Location</div><div class="contact-value">${d.location}</div></div>
    </div>`;
}

function switchSection(id) {
  activeSection = id;
  document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.section === id));
  document.querySelectorAll('.section').forEach(s => s.classList.toggle('active', s.id === `sec-${id}`));
  document.getElementById('current-section').textContent = id;
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('active');
  if (id === 'skills') setTimeout(animateSkillBars, 100);
}

function bindEvents() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => switchSection(item.dataset.section));
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchSection(item.dataset.section); } });
  });

  var hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('overlay').classList.toggle('active');
    });
  }

  document.getElementById('overlay').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.tech.split(',').indexOf(filter) !== -1) ? 'block' : 'none';
      });
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach((bar, i) => {
    setTimeout(() => { bar.style.width = bar.dataset.level + '%'; }, i * 60);
  });
}

function initCharts() {
  if (typeof Chart === 'undefined') return;
  var colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];
  var tooltipStyle = { backgroundColor: '#1a2236', titleColor: '#e8ecf4', bodyColor: '#8b9dc3', borderColor: '#2a3a5c', borderWidth: 1, cornerRadius: 8, padding: 12 };
  var tick = { color: '#5a6d8a', font: { family: 'JetBrains Mono', size: 11 } };
  var grid = { color: 'rgba(42,58,92,0.3)' };

  var buildChart = function(id, config) {
    var canvas = document.getElementById(id);
    if (!canvas) return;
    try {
      if (charts[id]) charts[id].destroy();
      config.options = config.options || {};
      config.options.responsive = true;
      config.options.maintainAspectRatio = false;
      charts[id] = new Chart(canvas, config);
    } catch (e) { console.warn('Chart init failed:', id, e); }
  };

  var allSkills = [];
  Object.values(d.skills).forEach(cat => { allSkills = allSkills.concat(cat); });
  allSkills = allSkills.slice(0, 10);

  buildChart('skillsBarChart', {
    type: 'bar', indexAxis: 'y',
    data: {
      labels: allSkills.map(s => s.name.length > 20 ? s.name.substring(0, 20) + '...' : s.name),
      datasets: [{ data: allSkills.map(s => s.level), backgroundColor: colors.map(c => c + '99'), borderColor: colors, borderWidth: 1, borderRadius: 4 }]
    },
    options: { plugins: { legend: { display: false }, tooltip: tooltipStyle }, scales: { x: { max: 100, ticks: tick, grid: grid }, y: { ticks: { color: '#5a6d8a', font: { family: 'Space Grotesk', size: 11 } }, grid: grid } } }
  });

  var events = [
    { label: '2016 - Started B.E. CS', y: 0 },
    { label: '2019 - PlaySimple Games', y: 1 },
    { label: '2020 - Pocket52', y: 0 },
    { label: '2021 - Accenture', y: 1 },
    { label: '2024 - EY (Assistant Manager)', y: 0 }
  ];

  buildChart('timelineChart', {
    type: 'scatter',
    data: { datasets: [{ data: events.map((e, i) => ({ x: i, y: e.y })), backgroundColor: '#3b82f6', borderColor: '#3b82f6', pointRadius: 10, pointHoverRadius: 14, pointStyle: 'circle', showLine: true, borderWidth: 2, tension: 0.1 }] },
    options: { plugins: { legend: { display: false }, tooltip: Object.assign({}, tooltipStyle, { callbacks: { label: ctx => events[ctx.dataIndex].label } }) }, scales: { x: { type: 'linear', min: -0.3, max: 4.3, ticks: { color: '#5a6d8a', font: { family: 'JetBrains Mono', size: 10 }, callback: val => events[val] ? events[val].label.split(' - ')[0] : '' }, grid: grid }, y: { display: false, min: -0.5, max: 1.5 } } }
  });

  var cats = Object.keys(d.skills);
  var avgs = cats.map(cat => Math.round(d.skills[cat].reduce((a, b) => a + b.level, 0) / d.skills[cat].length));

  buildChart('radarChart', {
    type: 'radar',
    data: { labels: cats, datasets: [{ data: avgs, backgroundColor: 'rgba(59,130,246,0.15)', borderColor: '#3b82f6', borderWidth: 2, pointBackgroundColor: '#3b82f6', pointRadius: 5 }] },
    options: { plugins: { legend: { display: false } }, scales: { r: { angleLines: { color: 'rgba(42,58,92,0.3)' }, grid: { color: 'rgba(42,58,92,0.3)' }, pointLabels: { color: '#8b9dc3', font: { family: 'Space Grotesk', size: 12 } }, ticks: { display: false }, suggestedMin: 0, suggestedMax: 100 } } }
  });

  buildChart('doughnutChart', {
    type: 'doughnut',
    data: { labels: ['Gaming', 'Fintech', 'Automation', 'Data Viz', 'Analytics'], datasets: [{ data: [30, 20, 20, 20, 10], backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'], borderColor: '#1a2236', borderWidth: 3 }] },
    options: { plugins: { legend: { position: 'right', labels: { color: '#8b9dc3', font: { family: 'Space Grotesk', size: 12 }, padding: 16 } } } }
  });
}

render();