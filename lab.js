// lab.js - Laboratorium Logic
let pyodide = null;
let currentProject = null;
let isLabInitialized = false;

// Initialize Lab
async function initLab() {
    if (isLabInitialized) return; // Hindari inisialisasi ganda

    try {
        console.log("Memuat Python Engine...");
        
        // Load Pyodide
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        
        // --- Tambahkan Library Baru di Sini ---
        console.log("Memuat library tambahan...");
        await pyodide.loadPackage("numpy"); // Library 1
        await pyodide.loadPackage("matplotlib"); // Library 2
        pyodide.runPython(`
            import matplotlib
            matplotlib.use('Agg') # Gunakan backend non-interactive
        `);
        await pyodide.loadPackage("requests"); // Library 3
        await pyodide.loadPackage("pandas"); // Library 4
        await pyodide.loadPackage("sympy"); // Library 5
        console.log("Library tambahan berhasil dimuat");
        // --- Akhir Penambahan Library ---
        
        console.log("Python Engine berhasil dimuat!");
        isLabInitialized = true;
        
        // Load projects
        loadProjects();
        
        // Setup event listeners
        document.getElementById('new-project-btn').addEventListener('click', createNewProject);
        
        // Setup keyboard shortcuts
        setupKeyboardShortcuts();
        
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        document.getElementById('projects-container').innerHTML = 
            '<div class="empty-state"><p>❌ Error memuat Python Engine. Silakan refresh halaman.</p></div>';
    }
}

// Load Projects from localStorage
function loadProjects() {
    const container = document.getElementById('projects-container');
    const savedProjects = localStorage.getItem('pythonLabProjects');
    let projects = [];
    
    if (savedProjects) {
        try {
            projects = JSON.parse(savedProjects);
        } catch (e) {
            console.error("Error parsing projects:", e);
            projects = [];
        }
    }
    
    if (projects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Belum ada proyek</h3>
                <p>Klik tombol "Buat Proyek Baru" untuk memulai eksperimen Python kamu!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${escapeHtml(project.name)}</h3>
            <p>📁 ID: ${project.id.substring(0, 8)}...</p>
            <p>🕒 Dibuat: ${new Date(project.createdAt).toLocaleDateString('id-ID')}</p>
            <p>🕒 Diubah: ${new Date(project.updatedAt).toLocaleDateString('id-ID')}</p>
        `;
        projectCard.addEventListener('click', () => openProject(project));
        container.appendChild(projectCard);
    });
}

// Helper function untuk escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Create New Project
function createNewProject() {
    const name = prompt("Masukkan nama proyek:");
    if (name && name.trim() !== "") {
        const newProject = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: name.trim(),
            code: '# Proyek Python Baru\n# Tulis kode kamu di sini\n\nprint("Hello, World!")\n',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        saveProject(newProject);
        loadProjects();
        openProject(newProject);
    }
}

// Save Project
function saveProject(project) {
    const savedProjects = localStorage.getItem('pythonLabProjects');
    let projects = [];
    
    if (savedProjects) {
        try {
            projects = JSON.parse(savedProjects);
        } catch (e) {
            console.error("Error parsing existing projects:", e);
        }
    }
    
    // Cek jika project sudah ada, update. Jika tidak, tambahkan.
    const existingIndex = projects.findIndex(p => p.id === project.id);
    if (existingIndex !== -1) {
        projects[existingIndex] = project;
    } else {
        projects.push(project);
    }
    
    localStorage.setItem('pythonLabProjects', JSON.stringify(projects));
    showToast("💾 Proyek disimpan!");
}

// Open Project in Editor
function openProject(project) {
    currentProject = project;
    document.getElementById('lab-editor').value = project.code;
    showToast(`📁 Proyek "${project.name}" dibuka!`);
}

// --- FUNGSI-FUNGSI LAB ---
async function runLabCode() {
    if (!pyodide) {
        await initLab(); // Inisialisasi jika belum
        if (!pyodide) return; // Jika masih gagal, hentikan
    }

    const code = document.getElementById('lab-editor').value;
    const output = document.getElementById('lab-output');
    
    output.innerHTML = "🎮 Menjalankan kode...";
    
    try {
        // Simpan kode
        if (currentProject) {
            currentProject.code = code;
            currentProject.updatedAt = new Date().toISOString();
            saveProject(currentProject);
        } else {
            localStorage.setItem('labCode', code);
        }
        
        // Override print
        pyodide.runPython(`
import sys
from js import console

class OutputCapture:
    def __init__(self):
        self.buffer = ""
    
    def write(self, text):
        self.buffer += text
        return len(text)
    
    def flush(self):
        pass

sys.stdout = OutputCapture()
        `);
        
        // Run code
        await pyodide.runPythonAsync(code); // Gunakan runPythonAsync untuk library
        
        const capturedOutput = pyodide.globals.get('sys').stdout.buffer;
        
        if (capturedOutput && capturedOutput.length > 0) {
            output.innerHTML = "✅ " + capturedOutput;
        } else {
            output.innerHTML = "ℹ️ Kode dijalankan tanpa output";
        }
        
        showToast("✅ Kode berhasil dijalankan!");
        
    } catch (error) {
        output.innerHTML = "❌ Error:\n" + error.message;
        showToast("❌ Error saat menjalankan kode!", "error");
    }
}

function saveLabCode() {
    const code = document.getElementById('lab-editor').value;
    if (currentProject) {
        currentProject.code = code;
        currentProject.updatedAt = new Date().toISOString();
        saveProject(currentProject);
    } else {
        localStorage.setItem('labCode', code);
    }
    showToast("💾 Kode disimpan!");
}

function resetLabCode() {
    if (confirm("Reset kode ke default? Perubahan akan hilang.")) {
        const defaultCode = `# Tulis kode Python di sini...
print("Halo dari Laboratorium!")
print("Eksperimen bebas tanpa batasan!")

# Contoh: Membuat pola segitiga
def buat_segitiga(tinggi):
    for i in range(tinggi):
        print(" " * (tinggi - i - 1) + "*" * (2 * i + 1))

# Panggil fungsi
buat_segitiga(5)`;
        document.getElementById('lab-editor').value = defaultCode;
        showToast("🔄 Kode direset!");
    }
}

function clearLabOutput() {
    document.getElementById('lab-output').innerHTML = "🎮 Output akan muncul di sini setelah kamu menjalankan kode...";
    showToast("🧹 Output dibersihkan!");
}

// Setup Keyboard Shortcuts
function setupKeyboardShortcuts() {
    const editor = document.getElementById('lab-editor');
    
    editor.addEventListener('keydown', function(e) {
        // Ctrl+Enter to run code
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runLabCode();
        }
    });
}

// Toast Notification (Placeholder)
function showToast(message, type = 'success') {
    // Untuk sekarang, tampilkan di console dan alert
    console.log(`[${type.toUpperCase()}] ${message}`);
    // Di produksi, kamu bisa membuat elemen toast yang muncul di layar
    // alert(`[${type.toUpperCase()}] ${message}`); // Uncomment jika ingin alert
}

// Initialize on load
// document.addEventListener('DOMContentLoaded', initLab); // Dipanggil dari HTML