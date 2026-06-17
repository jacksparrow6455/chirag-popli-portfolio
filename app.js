const d = resumeData;
let activeSection = 'overview';
let charts = {};

function render() {
  var app = document.getElementById('app');
  app.innerHTML = '<div class="overlay" id="overlay"></div>' +
    renderSidebar() +
    '<div class="main">' +
      renderHeader() +
      '<div class="content">' +
        '<div class="section active" id="sec-overview">' + renderHero() + renderOverview() + '</div>' +
        '<div class="section" id="sec-experience">' + renderExperience() + '</div>' +
        '<div class="section" id="sec-skills">' + renderSkills() + '</div>' +
        '<div class="section" id="sec-projects">' + renderProjects() + '</div>' +
        '<div class="section" id="sec-education">' + renderEducation() + '</div>' +
        '<div class="section" id="sec-contact">' + renderContact() + '</div>' +
      '</div>' +
    '</div>';
  bindEvents();
  initCharts();
  animateSkillBars();
}

function renderSidebar() {
  var navItems = [
    { id: 'overview', icon: '\u{1F4CA}', label: 'Overview' },
    { id: 'experience', icon: '\u{1F4BC}', label: 'Experience' },
    { id: 'skills', icon: '\u{1F6E0}', label: 'Skills' },
    { id: 'projects', icon: '\u{1F680}', label: 'Projects' },
    { id: 'education', icon: '\u{1F393}', label: 'Education' },
    { id: 'contact', icon: '\u{1F4EC}', label: 'Contact' }
  ];
  var html = '<aside class="sidebar" id="sidebar">' +
    '<div class="sidebar-header">' +
      '<div class="sidebar-avatar" style="overflow:hidden"><img src="avatar.png" alt="' + d.name + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>' +
      '<div class="sidebar-name">' + d.name + '</div>' +
      '<div class="sidebar-role">' + d.title + '</div>' +
    '</div>' +
    '<nav class="sidebar-nav">' +
      '<div class="nav-section">Navigation</div>';
  navItems.forEach(function(item) {
    html += '<div class="nav-item ' + (activeSection === item.id ? 'active' : '') + '" data-section="' + item.id + '">' +
      '<span class="nav-icon">' + item.icon + '</span>' +
      item.label + '</div>';
  });
  html += '</nav>' +
    '<div class="sidebar-footer"><span class="status-dot"></span> Available for opportunities</div>' +
  '</aside>';
  return html;
}

function renderHeader() {
  return '<header class="header">' +
    '<button class="hamburger" id="hamburger">\u2630</button>' +
    '<div class="header-title">portfolio<span>.sh</span> ~/<span id="current-section">' + activeSection + '</span></div>' +
    '<div class="header-metrics" id="header-metrics" style="display:none">' +
    d.metrics.map(function(m) {
      return '<span class="header-metric"><span class="header-metric-val">' + m.value + '</span> ' + m.label + '</span>';
    }).join('') +
    '</div>' +
    '<div class="header-actions">' +
      '<a href="mailto:' + d.email + '" style="text-decoration:none">' +
        '<button style="padding:6px 16px;background:var(--gradient1);border:none;border-radius:6px;color:white;cursor:pointer;font-size:12px;font-family:var(--font-mono)">\u2709 Contact</button>' +
      '</a>' +
    '</div>' +
  '</header>';
}

function renderHero() {
  var html = '<div class="hero">' +
    '<h1>Hi, I\'m <span class="gradient">' + d.name + '</span></h1>' +
    '<p class="tagline">' + d.tagline + '</p>' +
  '</div>' +
  '<div class="metrics-grid">';
  d.metrics.forEach(function(m) {
    html += '<div class="metric-card">' +
      '<div class="metric-value" data-count="' + m.value + '">' + m.value + '</div>' +
      '<div class="metric-label">' + m.label + '</div>' +
    '</div>';
  });
  html += '</div>';
  return html;
}

function renderOverview() {
  return '<div class="section-header"><div class="section-icon">\u{1F4CA}</div><h2 class="section-title">Dashboard</h2></div>' +
    '<div class="chart-grid">' +
      '<div class="chart-container"><div class="chart-title">Skills Proficiency</div><div class="chart-wrapper"><canvas id="skillsBarChart"></canvas></div></div>' +
      '<div class="chart-container"><div class="chart-title">Career Timeline</div><div class="chart-wrapper"><canvas id="timelineChart"></canvas></div></div>' +
    '</div>' +
    '<div class="radar-section">' +
      '<div class="chart-container"><div class="chart-title">Skill Distribution by Category</div><div class="chart-wrapper"><canvas id="radarChart"></canvas></div></div>' +
      '<div class="chart-container"><div class="chart-title">Impact by Domain</div><div class="chart-wrapper"><canvas id="doughnutChart"></canvas></div></div>' +
    '</div>' +
    '<div class="exp-card" style="border-left: 3px solid var(--accent)">' +
      '<p style="color:var(--text-secondary);font-size:15px;line-height:1.8">' + d.summary + '</p>' +
    '</div>';
}

function renderExperience() {
  var html = '<div class="section-header"><div class="section-icon">\u{1F4BC}</div><h2 class="section-title">Experience</h2></div>';
  d.experience.forEach(function(exp) {
    html += '<div class="exp-card"><div class="exp-card-header"><div>' +
      '<div class="exp-role">' + exp.role + '</div>' +
      '<div class="exp-company">' + exp.company + '</div>' +
      (exp.client ? '<div class="exp-client" style="font-size:13px;color:var(--text-muted);font-family:var(--font-mono);margin-top:4px">Client: ' + exp.client + '</div>' : '') +
    '</div><div class="exp-meta">' + exp.period + '</div></div>' +
    '<ul class="exp-achievements">';
    exp.achievements.forEach(function(a) {
      html += '<li>' + a + '</li>';
    });
    html += '</ul><div class="exp-tech">';
    exp.tech.forEach(function(t) {
      html += '<span class="tech-tag">' + t + '</span>';
    });
    html += '</div></div>';
  });
  return html;
}

function renderSkills() {
  var allSkills = Object.entries(d.skills);
  var html = '<div class="section-header"><div class="section-icon">\u{1F6E0}</div><h2 class="section-title">Skills</h2></div><div class="skills-grid">';
  allSkills.forEach(function(entry) {
    var group = entry[0], skills = entry[1];
    html += '<div class="skill-group"><div class="skill-group-title">' + group + '</div>';
    skills.forEach(function(s) {
      html += '<div class="skill-item"><div class="skill-info"><span class="skill-name">' + s.name + '</span><span class="skill-level">' + s.level + '%</span></div><div class="skill-bar"><div class="skill-fill" data-level="' + s.level + '"></div></div></div>';
    });
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function renderProjects() {
  var techSet = {};
  d.projects.forEach(function(p) { p.tech.forEach(function(t) { techSet[t] = true; }); });
  var allTech = Object.keys(techSet);
  var html = '<div class="section-header"><div class="section-icon">\u{1F680}</div><h2 class="section-title">Projects</h2></div>' +
    '<div class="project-filters"><button class="filter-btn active" data-filter="all">All</button>';
  allTech.forEach(function(t) {
    html += '<button class="filter-btn" data-filter="' + t + '">' + t + '</button>';
  });
  html += '</div><div class="projects-grid" id="projects-grid">';
  d.projects.forEach(function(p) {
    html += '<div class="project-card" data-tech="' + p.tech.join(',') + '">' +
      '<div class="project-title">' + p.title + '</div>' +
      '<div class="project-desc">' + p.description + '</div>' +
      '<div class="project-impact">Impact: ' + p.impact + '</div>' +
      '<div class="exp-tech">';
    p.tech.forEach(function(t) {
      html += '<span class="tech-tag">' + t + '</span>';
    });
    html += '</div></div>';
  });
  html += '</div>';
  return html;
}

function renderEducation() {
  var html = '<div class="section-header"><div class="section-icon">\u{1F393}</div><h2 class="section-title">Education & Certifications</h2></div>' +
    '<div class="edu-timeline">';
  d.education.forEach(function(e) {
    html += '<div class="edu-item"><div class="edu-degree">' + e.degree + '</div><div class="edu-school">' + e.school + '</div><div class="edu-meta"><span>' + e.period + '</span><span class="edu-grade">' + e.grade + '</span></div></div>';
  });
  html += '</div><div style="margin-top:32px"><h3 style="font-size:18px;margin-bottom:16px;color:var(--text-secondary)">Certifications</h3><div class="certs-list">';
  d.certifications.forEach(function(c) {
    html += '<div class="cert-item"><span class="cert-icon">\u{1F3C5}</span>' + c + '</div>';
  });
  html += '</div></div>';
  return html;
}

function renderContact() {
  return '<div class="section-header"><div class="section-icon">\u{1F4EC}</div><h2 class="section-title">Get in Touch</h2></div>' +
    '<div class="contact-grid">' +
      '<div class="contact-card" onclick="window.open(\'mailto:' + d.email + '\')"><div class="contact-icon">\u2709</div><div class="contact-label">Email</div><div class="contact-value">' + d.email + '</div></div>' +
      '<div class="contact-card" onclick="window.open(\'https://' + d.linkedin + '\', \'_blank\')"><div class="contact-icon">\u{1F517}</div><div class="contact-label">LinkedIn</div><div class="contact-value">' + d.linkedin + '</div></div>' +
      '<div class="contact-card" onclick="window.open(\'https://' + d.github + '\', \'_blank\')"><div class="contact-icon">\u{1F4BB}</div><div class="contact-label">GitHub</div><div class="contact-value">' + d.github + '</div></div>' +
      '<div class="contact-card"><div class="contact-icon">\u{1F4CD}</div><div class="contact-label">Location</div><div class="contact-value">' + d.location + '</div></div>' +
    '</div>';
}

function bindEvents() {
  document.querySelectorAll('.nav-item').forEach(function(item) {
    item.addEventListener('click', function() {
      activeSection = item.dataset.section;
      document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
      item.classList.add('active');
      document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
      document.getElementById('sec-' + activeSection).classList.add('active');
      document.getElementById('current-section').textContent = activeSection;
      var hm = document.getElementById('header-metrics');
      if (hm) hm.style.display = activeSection === 'overview' ? 'none' : 'flex';
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('active');
      if (activeSection === 'overview') initCharts();
      if (activeSection === 'skills') setTimeout(animateSkillBars, 100);
    });
  });

  var hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('overlay').classList.toggle('active');
    });
  }

  document.getElementById('overlay').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
  });

  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(function(card) {
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          var techs = card.dataset.tech.split(',');
          card.style.display = techs.indexOf(filter) !== -1 ? 'block' : 'none';
        }
      });
    });
  });
}

function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(function(bar, i) {
    setTimeout(function() {
      bar.style.width = bar.dataset.level + '%';
    }, i * 60);
  });
}

function initCharts() {
  var colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];

  Object.keys(charts).forEach(function(k) { if (charts[k]) { charts[k].destroy(); } charts[k] = null; });

  var tooltipStyle = {
    backgroundColor: '#1a2236',
    titleColor: '#e8ecf4',
    bodyColor: '#8b9dc3',
    borderColor: '#2a3a5c',
    borderWidth: 1,
    cornerRadius: 8,
    padding: 12
  };

  var tickStyle = { color: '#5a6d8a', font: { family: 'JetBrains Mono', size: 11 } };
  var gridStyle = { color: 'rgba(42,58,92,0.3)' };

  var skillsBar = document.getElementById('skillsBarChart');
  if (skillsBar) {
    var allSkills = [];
    Object.values(d.skills).forEach(function(cat) { allSkills = allSkills.concat(cat); });
    allSkills = allSkills.slice(0, 10);
    charts.skillsBar = new Chart(skillsBar, {
      type: 'bar',
      data: {
        labels: allSkills.map(function(s) { return s.name.length > 20 ? s.name.substring(0, 20) + '...' : s.name; }),
        datasets: [{
          data: allSkills.map(function(s) { return s.level; }),
          backgroundColor: colors.map(function(c) { return c + '99'; }),
          borderColor: colors,
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: { legend: { display: false }, tooltip: tooltipStyle },
        scales: {
          x: { max: 100, ticks: tickStyle, grid: gridStyle },
          y: { ticks: { color: '#5a6d8a', font: { family: 'Space Grotesk', size: 11 } }, grid: gridStyle }
        }
      }
    });
  }

  var timeline = document.getElementById('timelineChart');
  if (timeline) {
    var events = [
      { label: '2016 - Started B.E. CS', y: 0 },
      { label: '2019 - PlaySimple Games', y: 1 },
      { label: '2020 - Pocket52', y: 0 },
      { label: '2021 - Accenture', y: 1 },
      { label: '2024 - EY (Senior Consultant)', y: 0 }
    ];
    charts.timeline = new Chart(timeline, {
      type: 'scatter',
      data: {
        datasets: [{
          data: events.map(function(e, i) { return { x: i, y: e.y }; }),
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          pointRadius: 10,
          pointHoverRadius: 14,
          pointStyle: 'circle',
          showLine: true,
          borderWidth: 2,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: Object.assign({}, tooltipStyle, {
            callbacks: {
              label: function(ctx) { return events[ctx.dataIndex].label; }
            }
          })
        },
        scales: {
          x: {
            type: 'linear',
            min: -0.3,
            max: 4.3,
            ticks: {
              color: '#5a6d8a',
              font: { family: 'JetBrains Mono', size: 10 },
              callback: function(val) { return events[val] ? events[val].label.split(' - ')[0] : ''; }
            },
            grid: gridStyle
          },
          y: { display: false, min: -0.5, max: 1.5 }
        }
      }
    });
  }

  var radar = document.getElementById('radarChart');
  if (radar) {
    var cats = Object.keys(d.skills);
    var avgs = cats.map(function(cat) {
      var skills = d.skills[cat];
      return Math.round(skills.reduce(function(a, b) { return a + b.level; }, 0) / skills.length);
    });
    charts.radar = new Chart(radar, {
      type: 'radar',
      data: {
        labels: cats,
        datasets: [{
          data: avgs,
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          pointBackgroundColor: '#3b82f6',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            angleLines: { color: 'rgba(42,58,92,0.3)' },
            grid: { color: 'rgba(42,58,92,0.3)' },
            pointLabels: { color: '#8b9dc3', font: { family: 'Space Grotesk', size: 12 } },
            ticks: { display: false },
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });
  }

  var doughnut = document.getElementById('doughnutChart');
  if (doughnut) {
    charts.doughnut = new Chart(doughnut, {
      type: 'doughnut',
      data: {
        labels: ['Gaming', 'Fintech', 'Automation', 'Data Viz', 'Analytics'],
        datasets: [{
          data: [30, 20, 20, 20, 10],
          backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
          borderColor: '#1a2236',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#8b9dc3', font: { family: 'Space Grotesk', size: 12 }, padding: 16 }
          }
        }
      }
    });
  }
}

render();