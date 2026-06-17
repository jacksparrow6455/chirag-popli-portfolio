(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const l of t)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const l={};return t.integrity&&(l.integrity=t.integrity),t.referrerPolicy&&(l.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?l.credentials="include":t.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(t){if(t.ep)return;t.ep=!0;const l=s(t);fetch(t.href,l)}})();const $="modulepreload",A=function(e,i){return new URL(e,i).href},y={},E=function(i,s,n){let t=Promise.resolve();if(s&&s.length>0){let c=function(r){return Promise.all(r.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};const v=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),o=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));t=c(s.map(r=>{if(r=A(r,n),r in y)return;y[r]=!0;const u=r.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(!!n)for(let f=v.length-1;f>=0;f--){const g=v[f];if(g.href===r&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${m}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":$,u||(p.as="script"),p.crossOrigin="",p.href=r,o&&p.setAttribute("nonce",o),document.head.appendChild(p),u)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${r}`)))})}))}function l(c){const v=new Event("vite:preloadError",{cancelable:!0});if(v.payload=c,window.dispatchEvent(v),!v.defaultPrevented)throw c}return t.then(c=>{for(const v of c||[])v.status==="rejected"&&l(v.reason);return i().catch(l)})},C={name:"Chirag Popli",title:"Business Operations Analyst",tagline:"Turning data into decisions. Building dashboards that drive strategy.",location:"India",email:"chiragpopli@example.com",linkedin:"linkedin.com/in/chiragpopli",github:"github.com/chiragpopli",summary:"Business Operations Analyst with 4+ years of experience transforming raw data into actionable insights across gaming, fintech, and operations. Expert in Tableau, SQL, Python, and AWS. Proven track record of building automated dashboards, leading fraud analysis, and driving product decisions through A/B testing.",skills:{"Data Visualization":[{name:"Tableau (Desktop, Server, Prep)",level:95},{name:"CRM Analytics (Salesforce)",level:85},{name:"COUPA Analytics",level:80}],"Data & Analytics":[{name:"Advanced SQL",level:95},{name:"Python (Pandas, NumPy)",level:85},{name:"ETL / Data Pipelines",level:85},{name:"A/B Testing & Experimentation",level:90},{name:"Fraud Detection & Analysis",level:85}],"Cloud & Tools":[{name:"AWS (Solutions Architect Associate)",level:80},{name:"Domino Data Lab",level:75},{name:"Advanced Excel",level:95},{name:"Reporting & Automation",level:90}],"Business Skills":[{name:"Cross-Functional Collaboration",level:95},{name:"Stakeholder Management",level:90},{name:"Product Feature Analysis",level:90},{name:"LTV & Revenue KPI Analysis",level:90}]},experience:[{company:"Pocket52",role:"Business Operations Analyst",period:"Nov 2020 – Jun 2021",location:"Remote",achievements:["Collaborated with Business, Operations, Finance & Marketing to collect data and build visual reports","Led critical analytical investigations delivering data-driven insights to senior leadership","Coordinated cross-functionally to create executive-level reporting packages","Implemented automation for daily & weekly reporting, reducing manual effort by 80%","Built Tableau dashboards & SQL reports for extensive business analysis","Solved business queries using data analytics, delivering actionable solutions","Detected anomalies in daily business trends to highlight improvement areas","Led fraud analysis for players using ML model outputs, reducing fraudulent activity"],tech:["Tableau","SQL","Python","AWS","ML Models","Automation"]},{company:"PlaySimple Games",role:"Business Analyst",period:"Feb 2019 – Oct 2020",location:"Bangalore, India",achievements:["Operated in Agile sprints delivering business insights for product feature releases","Led feature analysis for product development, defining success metrics & KPIs","Designed & executed A/B tests for game features, analyzing LTV, Revenue & Financial KPIs","Collaborated with product, engineering & design teams on feature prioritization","Built automated reporting pipelines for real-time game performance monitoring"],tech:["SQL","Python","A/B Testing","Tableau","Agile","LTV Analysis"]}],education:[{degree:"B.E. Computer Science",school:"Chitkara University, Punjab",period:"2016 – 2020",grade:"9.6 CGPA"},{degree:"Higher Secondary (CBSE)",school:"Vishvas Public School, Haryana",period:"2014 – 2016",grade:"92.6%"}],certifications:["AWS Solutions Architect Associate Training","CRM Analytics & Einstein Discovery Insight Specialist","Tableau Desktop, Server & Prep Professional","Python 101"],projects:[{title:"Automated Daily Reporting Pipeline",description:"Built end-to-end automated pipeline pulling from SQL, transforming in Python, publishing to Tableau Server. Reduced reporting time from 2hrs to 15min daily.",tech:["Python","SQL","Tableau Server","AWS Lambda","Airflow"],impact:"80% time savings, zero manual errors"},{title:"Fraud Detection Dashboard",description:"Real-time Tableau dashboard integrating ML model scores for player risk profiling. Enabled ops team to review 500+ suspicious accounts/week.",tech:["Tableau","Python","ML Models","SQL","AWS"],impact:"Reduced fraud losses by ~35%"},{title:"Game Feature A/B Testing Framework",description:"Designed statistical framework for feature experiments. Built dashboards for real-time LTV, retention, ARPU tracking across test variants.",tech:["Python","SQL","Tableau","Statistical Testing"],impact:"Enabled 15+ feature experiments, 3 shipped to production"},{title:"Executive KPI Dashboard (COUPA)",description:"Unified procurement & spend analytics dashboard for C-suite. Integrated ERP, PO, invoice data with drill-downs by vendor, category, BU.",tech:["COUPA Analytics","SQL","Tableau"],impact:"Single source of truth for $50M+ annual spend"}],metrics:[{label:"Years Experience",value:"4+"},{label:"Dashboards Built",value:"50+"},{label:"Reports Automated",value:"20+"},{label:"A/B Tests Run",value:"15+"},{label:"Fraud Cases Analyzed",value:"500+"},{label:"Cross-Functional Teams",value:"10+"}]},a=C;let h="overview";function L(){const e=document.getElementById("app");e.innerHTML=`
    <div class="overlay" id="overlay"></div>
    ${P()}
    <div class="main">
      ${B()}
      <div class="content">
        ${x()}
        <div class="section active" id="sec-overview">${w()}</div>
        <div class="section" id="sec-experience">${T()}</div>
        <div class="section" id="sec-skills">${j()}</div>
        <div class="section" id="sec-projects">${I()}</div>
        <div class="section" id="sec-education">${R()}</div>
        <div class="section" id="sec-contact">${D()}</div>
      </div>
    </div>
  `,O(),S(),k()}function P(){const e=[{id:"overview",icon:"📊",label:"Overview"},{id:"experience",icon:"💼",label:"Experience"},{id:"skills",icon:"🛠",label:"Skills"},{id:"projects",icon:"🚀",label:"Projects"},{id:"education",icon:"🎓",label:"Education"},{id:"contact",icon:"📬",label:"Contact"}];return`
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-avatar">${a.name.split(" ").map(i=>i[0]).join("")}</div>
        <div class="sidebar-name">${a.name}</div>
        <div class="sidebar-role">${a.title}</div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section">Navigation</div>
        ${e.map(i=>`
          <div class="nav-item ${h===i.id?"active":""}" data-section="${i.id}">
            <span class="nav-icon">${i.icon}</span>
            ${i.label}
          </div>
        `).join("")}
      </nav>
      <div class="sidebar-footer">
        <span class="status-dot"></span>
        Available for opportunities
      </div>
    </aside>
  `}function B(){return`
    <header class="header">
      <button class="hamburger" id="hamburger">☰</button>
      <div class="header-title">portfolio<span>.sh</span> ~/<span id="current-section">${h}</span></div>
      <div class="header-actions">
        <a href="mailto:${a.email}" style="text-decoration:none">
          <button style="padding:6px 16px;background:var(--gradient1);border:none;border-radius:6px;color:white;cursor:pointer;font-size:12px;font-family:var(--font-mono)">
            📧 Contact
          </button>
        </a>
      </div>
    </header>
  `}function x(){return`
    <div class="hero">
      <h1>Hi, I'm <span class="gradient">${a.name}</span></h1>
      <p class="tagline">${a.tagline}</p>
    </div>
    <div class="metrics-grid">
      ${a.metrics.map(e=>`
        <div class="metric-card">
          <div class="metric-value" data-count="${e.value}">${e.value}</div>
          <div class="metric-label">${e.label}</div>
        </div>
      `).join("")}
    </div>
  `}function w(){return`
    <div class="section-header">
      <div class="section-icon">📊</div>
      <h2 class="section-title">Dashboard</h2>
    </div>
    <div class="chart-grid">
      <div class="chart-container">
        <div class="chart-title">Skills Proficiency</div>
        <div class="chart-wrapper"><canvas id="skillsBarChart"></canvas></div>
      </div>
      <div class="chart-container">
        <div class="chart-title">Career Timeline</div>
        <div class="chart-wrapper"><canvas id="timelineChart"></canvas></div>
      </div>
    </div>
    <div class="radar-section">
      <div class="chart-container">
        <div class="chart-title">Skill Distribution by Category</div>
        <div class="chart-wrapper"><canvas id="radarChart"></canvas></div>
      </div>
      <div class="chart-container">
        <div class="chart-title">Impact by Domain</div>
        <div class="chart-wrapper"><canvas id="doughnutChart"></canvas></div>
      </div>
    </div>
    <div class="exp-card" style="border-left: 3px solid var(--accent)">
      <p style="color:var(--text-secondary);font-size:15px;line-height:1.8">${a.summary}</p>
    </div>
  `}function T(){return`
    <div class="section-header">
      <div class="section-icon">💼</div>
      <h2 class="section-title">Experience</h2>
    </div>
    ${a.experience.map(e=>`
      <div class="exp-card">
        <div class="exp-card-header">
          <div>
            <div class="exp-role">${e.role}</div>
            <div class="exp-company">${e.company}</div>
          </div>
          <div class="exp-meta">
            ${e.period}<br>${e.location}
          </div>
        </div>
        <ul class="exp-achievements">
          ${e.achievements.map(i=>`<li>${i}</li>`).join("")}
        </ul>
        <div class="exp-tech">
          ${e.tech.map(i=>`<span class="tech-tag">${i}</span>`).join("")}
        </div>
      </div>
    `).join("")}
  `}function j(){return`
    <div class="section-header">
      <div class="section-icon">🛠</div>
      <h2 class="section-title">Skills</h2>
    </div>
    <div class="skills-grid">
      ${Object.entries(a.skills).map(([i,s])=>`
        <div class="skill-group">
          <div class="skill-group-title">${i}</div>
          ${s.map(n=>`
            <div class="skill-item">
              <div class="skill-info">
                <span class="skill-name">${n.name}</span>
                <span class="skill-level">${n.level}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-fill" data-level="${n.level}"></div>
              </div>
            </div>
          `).join("")}
        </div>
      `).join("")}
    </div>
  `}function I(){return`
    <div class="section-header">
      <div class="section-icon">🚀</div>
      <h2 class="section-title">Projects</h2>
    </div>
    <div class="project-filters">
      <button class="filter-btn active" data-filter="all">All</button>
      ${[...new Set(a.projects.flatMap(i=>i.tech))].map(i=>`<button class="filter-btn" data-filter="${i}">${i}</button>`).join("")}
    </div>
    <div class="projects-grid" id="projects-grid">
      ${a.projects.map((i,s)=>`
        <div class="project-card" data-tech="${i.tech.join(",")}">
          <div class="project-title">${i.title}</div>
          <div class="project-desc">${i.description}</div>
          <div class="project-impact">Impact: ${i.impact}</div>
          <div class="exp-tech">
            ${i.tech.map(n=>`<span class="tech-tag">${n}</span>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `}function R(){return`
    <div class="section-header">
      <div class="section-icon">🎓</div>
      <h2 class="section-title">Education & Certifications</h2>
    </div>
    <div class="edu-timeline">
      ${a.education.map(e=>`
        <div class="edu-item">
          <div class="edu-degree">${e.degree}</div>
          <div class="edu-school">${e.school}</div>
          <div class="edu-meta">
            <span>${e.period}</span>
            <span class="edu-grade">${e.grade}</span>
          </div>
        </div>
      `).join("")}
    </div>
    <div style="margin-top:32px">
      <h3 style="font-size:18px;margin-bottom:16px;color:var(--text-secondary)">Certifications</h3>
      <div class="certs-list">
        ${a.certifications.map(e=>`
          <div class="cert-item">
            <span class="cert-icon">🏅</span>
            ${e}
          </div>
        `).join("")}
      </div>
    </div>
  `}function D(){return`
    <div class="section-header">
      <div class="section-icon">📬</div>
      <h2 class="section-title">Get in Touch</h2>
    </div>
    <div class="contact-grid">
      <div class="contact-card" onclick="window.open('mailto:${a.email}')">
        <div class="contact-icon">✉️</div>
        <div class="contact-label">Email</div>
        <div class="contact-value">${a.email}</div>
      </div>
      <div class="contact-card" onclick="window.open('https://${a.linkedin}', '_blank')">
        <div class="contact-icon">🔗</div>
        <div class="contact-label">LinkedIn</div>
        <div class="contact-value">${a.linkedin}</div>
      </div>
      <div class="contact-card" onclick="window.open('https://${a.github}', '_blank')">
        <div class="contact-icon">💻</div>
        <div class="contact-label">GitHub</div>
        <div class="contact-value">${a.github}</div>
      </div>
      <div class="contact-card">
        <div class="contact-icon">📍</div>
        <div class="contact-label">Location</div>
        <div class="contact-value">${a.location}</div>
      </div>
    </div>
  `}function O(){document.querySelectorAll(".nav-item").forEach(i=>{i.addEventListener("click",()=>{h=i.dataset.section,document.querySelectorAll(".nav-item").forEach(s=>s.classList.remove("active")),i.classList.add("active"),document.querySelectorAll(".section").forEach(s=>s.classList.remove("active")),document.getElementById(`sec-${h}`).classList.add("active"),document.getElementById("current-section").textContent=h,document.getElementById("sidebar").classList.remove("open"),document.getElementById("overlay").classList.remove("active"),h==="overview"&&S(),h==="skills"&&setTimeout(k,100)})});const e=document.getElementById("hamburger");e&&e.addEventListener("click",()=>{document.getElementById("sidebar").classList.toggle("open"),document.getElementById("overlay").classList.toggle("active")}),document.getElementById("overlay").addEventListener("click",()=>{document.getElementById("sidebar").classList.remove("open"),document.getElementById("overlay").classList.remove("active")}),document.querySelectorAll(".filter-btn").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".filter-btn").forEach(n=>n.classList.remove("active")),i.classList.add("active");const s=i.dataset.filter;document.querySelectorAll(".project-card").forEach(n=>{if(s==="all")n.style.display="block";else{const t=n.dataset.tech.split(",");n.style.display=t.includes(s)?"block":"none"}})})})}function k(){document.querySelectorAll(".skill-fill").forEach((e,i)=>{setTimeout(()=>{e.style.width=e.dataset.level+"%"},i*60)})}async function S(){const e=await E(()=>import("./chart-45xamTTr.js"),[],import.meta.url),{Chart:i}=e;i.register(e.TimeScale,e.LinearScale,e.CategoryScale,e.BarController,e.ScatterController,e.RadarController,e.DoughnutController,e.BarElement,e.PointElement,e.LineElement,e.RadialLinearScale,e.Filler,e.Tooltip,e.Legend);const s={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#1a2236",titleColor:"#e8ecf4",bodyColor:"#8b9dc3",borderColor:"#2a3a5c",borderWidth:1,cornerRadius:8,padding:12}},scales:{x:{ticks:{color:"#5a6d8a",font:{family:"JetBrains Mono",size:11}},grid:{color:"rgba(42,58,92,0.3)"}},y:{ticks:{color:"#5a6d8a",font:{family:"JetBrains Mono",size:11}},grid:{color:"rgba(42,58,92,0.3)"}}}},n=["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444","#06b6d4","#ec4899"],t=document.getElementById("skillsBarChart");if(t){t._chart&&t._chart.destroy();const d=Object.values(a.skills).flat().slice(0,10);t._chart=new i(t,{type:"bar",data:{labels:d.map(o=>o.name.length>20?o.name.substring(0,20)+"...":o.name),datasets:[{data:d.map(o=>o.level),backgroundColor:n.map(o=>o+"99"),borderColor:n,borderWidth:1,borderRadius:4}]},options:{...s,indexAxis:"y",scales:{x:{...s.scales.x,max:100},y:{...s.scales.y,ticks:{...s.scales.y.ticks,font:{family:"Space Grotesk",size:11}}}}}})}const l=document.getElementById("timelineChart");if(l){l._chart&&l._chart.destroy();const d=[{label:"2016 - Started B.E. CS",y:0},{label:"2019 - PlaySimple Games",y:1},{label:"2020 - Graduated (9.6)",y:0},{label:"2020 - Pocket52",y:1}];l._chart=new i(l,{type:"scatter",data:{datasets:[{data:d.map((o,r)=>({x:r,y:o.y})),backgroundColor:"#3b82f6",borderColor:"#3b82f6",pointRadius:10,pointHoverRadius:14,pointStyle:"circle",showLine:!0,borderWidth:2,tension:.1}]},options:{...s,plugins:{...s.plugins,legend:{display:!1},tooltip:{...s.plugins.tooltip,callbacks:{label:o=>d[o.dataIndex].label}}},scales:{x:{type:"linear",min:-.3,max:3.3,ticks:{color:"#5a6d8a",font:{family:"JetBrains Mono",size:10},callback:o=>{var r,u;return((u=(r=d[o])==null?void 0:r.label)==null?void 0:u.split(" - ")[0])||""}},grid:{color:"rgba(42,58,92,0.3)"}},y:{display:!1,min:-.5,max:1.5}}}})}const c=document.getElementById("radarChart");if(c){c._chart&&c._chart.destroy();const d=Object.keys(a.skills),o=d.map(r=>{const u=a.skills[r];return Math.round(u.reduce((m,b)=>m+b.level,0)/u.length)});c._chart=new i(c,{type:"radar",data:{labels:d,datasets:[{data:o,backgroundColor:"rgba(59, 130, 246, 0.15)",borderColor:"#3b82f6",borderWidth:2,pointBackgroundColor:"#3b82f6",pointRadius:5}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{r:{angleLines:{color:"rgba(42,58,92,0.3)"},grid:{color:"rgba(42,58,92,0.3)"},pointLabels:{color:"#8b9dc3",font:{family:"Space Grotesk",size:12}},ticks:{display:!1},suggestedMin:0,suggestedMax:100}}}})}const v=document.getElementById("doughnutChart");v&&(v._chart&&v._chart.destroy(),v._chart=new i(v,{type:"doughnut",data:{labels:["Gaming","Fintech","Automation","Data Viz","Analytics"],datasets:[{data:[30,20,20,20,10],backgroundColor:["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444"],borderColor:"#1a2236",borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"right",labels:{color:"#8b9dc3",font:{family:"Space Grotesk",size:12},padding:16}}}}}))}L();
