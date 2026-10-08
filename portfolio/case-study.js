function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || 'apiTemplate';
}

function markedParse(text) {
    // Simple markdown parser for basic elements
    let html = text;
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
    // Clean up multiple ul
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    // Line breaks
    html = html.replace(/\n\n/g, '<br><br>');
    html = html.replace(/<\/h[1-6]>\s*<br><br>/g, '</h1><br>');
    html = html.replace(/<\/h[1-6]>\s*<br>/g, '</h2>');
    return html;
}

async function loadCaseStudy() {
    const id = getId();
    document.getElementById('pageTitle').textContent = id.replace(/_/g, ' ').replace(/-/g, ' ');
    try {
        const res = await fetch(`data/${id}.md`);
        if (res.ok) {
            const text = await res.text();
            const html = markedParse(text);
            document.getElementById('caseContent').innerHTML = html;
        } else {
            document.getElementById('caseContent').innerHTML = '<p>Case study not found.</p>';
        }
    } catch (e) {
        document.getElementById('caseContent').innerHTML = '<p>Error loading case study.</p>';
    }
}

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
loadCaseStudy();
