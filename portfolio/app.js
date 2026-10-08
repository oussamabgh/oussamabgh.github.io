async function loadData() {
    try {
        const [skillsRes, projects] = await Promise.all([
            fetch('data/skills.json'),
            getProjects()
        ]);
        const skills = await skillsRes.json();
        renderSkills(skills);
        renderProjects(projects);
    } catch (e) {
        console.error('Error loading data:', e);
    }
}

async function getProjects() {
    const projectFiles = [
        'apiTemplate.md', 'clubPlay_final.md', 'dating_app.md', 'share_ride.md',
        'devnet_backend.md', 'solana_project.md', 'sniper-bot.md', 'sol_master.md',
        'token-runner-tracker.md', 'video_pipeline.md', 'pumpfun_sniper_bot.md'
    ];
    const projects = [];
    for (const file of projectFiles) {
        try {
            const res = await fetch(`data/${file}`);
            if (res.ok) {
                const text = await res.text();
                const project = parseMarkdown(text, file);
                projects.push(project);
            }
        } catch (e) {
            // skip
        }
    }
    return projects;
}

function parseMarkdown(text, filename) {
    const lines = text.split('\n');
    const project = {
        id: filename.replace('.md', ''),
        name: filename.replace('.md', '').replace(/_/g, ' '),
        pitch: '',
        stack: [],
        file: filename
    };
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ') && !project.nameSet) {
            project.name = lines[i].replace('# ', '').trim();
            project.nameSet = true;
        }
        if (lines[i].includes('**Pitch:**')) {
            project.pitch = lines[i].split('**Pitch:**')[1].trim();
        }
        if (lines[i].includes('**Tech Stack:**')) {
            const stackStr = lines[i].split('**Tech Stack:**')[1].trim();
            project.stack = stackStr.split(',').map(s => s.trim()).filter(s => s && s !== 'Various');
        }
    }
    return project;
}

function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    for (const [category, items] of Object.entries(skills)) {
        if (!items || items.length === 0) continue;
        const card = document.createElement('div');
        card.className = 'skill-card';
        let html = `<div class="skill-category">${escapeHtml(category)}</div><div class="skill-list">`;
        for (const item of items) {
            html += `<span class="skill-badge">${escapeHtml(item.name)} (${item.projects})</span>`;
        }
        html += '</div>';
        card.innerHTML = html;
        container.appendChild(card);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    for (const project of projects) {
        const card = document.createElement('div');
        card.className = 'project-card';
        let html = `<div class="project-title">${escapeHtml(project.name)}</div>`;
        if (project.pitch) {
            html += `<div class="project-pitch">${escapeHtml(project.pitch)}</div>`;
        }
        if (project.stack.length > 0) {
            html += `<div class="project-stack">`;
            for (const s of project.stack) {
                html += `<span class="project-badge">${escapeHtml(s)}</span>`;
            }
            html += `</div>`;
        }
        html += `<a href="case-study.html?id=${encodeURIComponent(project.id)}" class="project-link">View Case Study →</a>`;
        card.innerHTML = html;
        container.appendChild(card);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Theme toggle
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

initTheme();
loadData();
