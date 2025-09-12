// State Management
const appState = {
    currentPage: 'home',
    projects: [],
    lessons: [
        { id: 1, title: "🎯 Variabel", description: "Kenalan dengan dasar penyimpanan data", locked: false },
        { id: 2, title: "🔍 Tipe Data", description: "String, Integer, Boolean", locked: true },
        { id: 3, title: "🧮 Matematika", description: "Operasi dasar", locked: true },
        { id: 4, title: "⚖️ Kondisi", description: "If/Else statements", locked: true },
        { id: 5, title: "🔄 Perulangan", description: "For/While loops", locked: true }
    ],
    achievements: []
};

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const playgroundModal = document.getElementById('playground-modal');

// Navigation
function navigateTo(pageId) {
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageId) {
            link.classList.add('active');
        }
    });
    
    // Show active page
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === `${pageId}-page`) {
            page.classList.add('active');
        }
    });
    
    appState.currentPage = pageId;
    
    // Load page content
    switch(pageId) {
        case 'laboratory':
            loadProjects();
            break;
        case 'lessons':
            loadLessons();
            break;
        case 'achievements':
            loadAchievements();
            break;
    }
}

// Event Listeners for Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.dataset.page;
        navigateTo(pageId);
    });
});

// Load Projects
function loadProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    if (appState.projects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Belum ada proyek. Klik "Buat Proyek Baru" untuk memulai!</p>
            </div>
        `;
        return;
    }
    
    appState.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'card';
        projectCard.innerHTML = `
            <div class="card-title">${project.name}</div>
            <div class="card-description">Terakhir diubah: ${project.lastModified}</div>
        `;
        projectCard.addEventListener('click', () => openProject(project));
        container.appendChild(projectCard);
    });
}

// Load Lessons
function loadLessons() {
    const container = document.getElementById('lessons-container');
    container.innerHTML = '';
    
    appState.lessons.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = `card ${lesson.locked ? 'locked' : ''}`;
        lessonCard.innerHTML = `
            <div class="card-title">${lesson.title}</div>
            <div class="card-description">${lesson.description}</div>
            ${lesson.locked ? '<div class="lock-icon">🔒</div>' : ''}
        `;
        
        if (!lesson.locked) {
            lessonCard.addEventListener('click', () => startLesson(lesson));
        }
        
        container.appendChild(lessonCard);
    });
}

// Load Achievements
function loadAchievements() {
    const container = document.getElementById('achievements-container');
    container.innerHTML = `
        <div class="empty-state">
            <p>Belum ada achievement. Selesaikan pelajaran untuk mendapatkan badge!</p>
        </div>
    `;
}

// Project Functions
document.getElementById('new-project-btn').addEventListener('click', createNewProject);

function createNewProject() {
    const name = prompt('Masukkan nama proyek:');
    if (name) {
        const newProject = {
            id: Date.now(),
            name: name,
            code: '# Tulis kode Python di sini\n',
            lastModified: new Date().toLocaleDateString()
        };
        appState.projects.push(newProject);
        loadProjects();
        openProject(newProject);
    }
}

function openProject(project) {
    document.getElementById('project-name').textContent = project.name;
    document.getElementById('code-editor').value = project.code;
    playgroundModal.style.display = 'block';
}

// Lesson Functions
function startLesson(lesson) {
    alert(`Memulai pelajaran: ${lesson.title}\nFitur ini akan dikembangkan lebih lanjut!`);
    // TODO: Implement lesson content
}

// Playground Functions
document.getElementById('close-playground-btn').addEventListener('click', () => {
    playgroundModal.style.display = 'none';
});

document.getElementById('run-code-btn').addEventListener('click', runCode);

function runCode() {
    const code = document.getElementById('code-editor').value;
    const output = document.getElementById('output-console');
    output.textContent = `> Menjalankan kode...\n${code}\n\n(Kode berhasil dijalankan)`;
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});