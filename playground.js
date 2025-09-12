// playground.js - Logika Playground Python

// Pyodide instance
let pyodide = null;
let isPlaygroundInitialized = false;

// Initialize Playground
async function initPlayground() {
    if (isPlaygroundInitialized) return; // Hindari inisialisasi ganda

    try {
        // Show loading message
        document.getElementById('playground-output').innerHTML = "🚀 Memuat Python Engine... Mohon tunggu sebentar";
        
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
        
        // Show success message
        document.getElementById('playground-output').innerHTML = "✅ Python Engine berhasil dimuat!\n\n🎮 Siap untuk coding! Tekan 'Jalankan' untuk mengeksekusi kode.";
        
        console.log("Pyodide loaded successfully");
        
        // Load saved code if exists
        loadSavedCode();
        
        // Setup event listeners
        setupEventListeners();
        
        // Setup keyboard shortcuts
        setupKeyboardShortcuts();
        
        // Update status
        updateStatus();
        
        isPlaygroundInitialized = true;
        
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        document.getElementById('playground-output').innerHTML = "❌ Error memuat Python Engine. Silakan refresh halaman.";
    }
}

// Setup Event Listeners
function setupEventListeners() {
    const editor = document.getElementById('playground-editor');
    
    // Update character count and cursor position
    editor.addEventListener('input', updateStatus);
    editor.addEventListener('keyup', updateStatus);
    editor.addEventListener('click', updateStatus);
    
    // Auto-save every 30 seconds
    setInterval(saveCode, 30000);
    
    // Auto-indentation after colon
    editor.addEventListener('keydown', handleKeyDown);
    
    // Auto-pairing for brackets and quotes
    editor.addEventListener('keypress', handleKeyPress);
}

// Handle Key Down (for auto-indentation)
function handleKeyDown(e) {
    const editor = document.getElementById('playground-editor');
    const cursorPos = editor.selectionStart;
    const text = editor.value;
    
    // Check if we're typing a colon
    if (e.key === ':') {
        e.preventDefault(); // Prevent default behavior
        
        // Insert colon and add 4 spaces on next line
        const textBefore = text.substring(0, cursorPos);
        const textAfter = text.substring(cursorPos);
        editor.value = textBefore + ':' + '\n' + '    ';
        
        // Move cursor to the end of the new line
        const newCursorPos = cursorPos + 2;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        
        // Update status
        updateStatus();
    }
    
    // Auto-indentation when pressing Enter after a colon
    if (e.key === 'Enter') {
        // Get current line and check if it ends with colon
        const lines = text.split('\n');
        const currentLine = lines[cursorPos > 0 ? lines.length - 1 : 0];
        
        // If the line ends with colon, add 4 spaces on the new line
        if (currentLine.trim().endsWith(':')) {
            e.preventDefault(); // Prevent default behavior
            
            // Insert newline and 4 spaces
            const textBefore = text.substring(0, cursorPos);
            const textAfter = text.substring(cursorPos);
            editor.value = textBefore + '\n' + '    ';
            
            // Move cursor to the end of the new line
            const newCursorPos = cursorPos + 5;
            editor.setSelectionRange(newCursorPos, newCursorPos);
            
            // Update status
            updateStatus();
        }
    }
}

// Handle Key Press (for auto-pairing)
function handleKeyPress(e) {
    const editor = document.getElementById('playground-editor');
    const cursorPos = editor.selectionStart;
    const text = editor.value;
    
    // Auto-pairing for parentheses
    if (e.key === '(') {
        e.preventDefault(); // Prevent default behavior
        
        // Insert opening and closing parenthesis
        const textBefore = text.substring(0, cursorPos);
        const textAfter = text.substring(cursorPos);
        editor.value = textBefore + '()' + textAfter;
        
        // Move cursor inside the parentheses
        const newCursorPos = cursorPos + 1;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        
        // Update status
        updateStatus();
    }
    
    // Auto-pairing for square brackets
    if (e.key === '[') {
        e.preventDefault(); // Prevent default behavior
        
        // Insert opening and closing bracket
        const textBefore = text.substring(0, cursorPos);
        const textAfter = text.substring(cursorPos);
        editor.value = textBefore + '[]' + textAfter;
        
        // Move cursor inside the brackets
        const newCursorPos = cursorPos + 1;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        
        // Update status
        updateStatus();
    }
    
    // Auto-pairing for curly braces
    if (e.key === '{') {
        e.preventDefault(); // Prevent default behavior
        
        // Insert opening and closing brace
        const textBefore = text.substring(0, cursorPos);
        const textAfter = text.substring(cursorPos);
        editor.value = textBefore + '{}'+ textAfter;
        
        // Move cursor inside the braces
        const newCursorPos = cursorPos + 1;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        
        // Update status
        updateStatus();
    }
    
    // Auto-pairing for double quotes
    if (e.key === '"') {
        e.preventDefault(); // Prevent default behavior
        
        // Insert opening and closing double quotes
        const textBefore = text.substring(0, cursorPos);
        const textAfter = text.substring(cursorPos);
        editor.value = textBefore + '""' + textAfter;
        
        // Move cursor inside the quotes
        const newCursorPos = cursorPos + 1;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        
        // Update status
        updateStatus();
    }
    
    // Auto-pairing for single quotes
    if (e.key === "'") {
        e.preventDefault(); // Prevent default behavior
        
        // Insert opening and closing single quotes
        const textBefore = text.substring(0, cursorPos);
        const textAfter = text.substring(cursorPos);
        editor.value = textBefore + "''" + textAfter;
        
        // Move cursor inside the quotes
        const newCursorPos = cursorPos + 1;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        
        // Update status
        updateStatus();
    }
}

// Setup Keyboard Shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to run code
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
        
        // Ctrl+S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveCode();
            showToast("💾 Kode berhasil disimpan!");
        }
        
        // Ctrl+O to load
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            loadCode();
        }
        
        // ESC to exit fullscreen
        if (e.key === 'Escape') {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    });
}

// Update Status Bar
function updateStatus() {
    const editor = document.getElementById('playground-editor');
    const text = editor.value;
    const cursorPos = editor.selectionStart;
    
    // Calculate line and column
    const textBeforeCursor = text.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    
    // Update status elements
    document.getElementById('line-col').textContent = `Baris ${line}, Kolom ${col}`;
    document.getElementById('char-count').textContent = `${text.length} karakter`;
}

// Run Code
async function runCode() {
    if (!pyodide) {
        await initPlayground(); // Inisialisasi jika belum
        if (!pyodide) return; // Jika masih gagal, hentikan
    }

    const code = document.getElementById('playground-editor').value;
    const output = document.getElementById('playground-output');
    const runBtn = document.getElementById('run-btn');
    
    // Disable button while running
    runBtn.disabled = true;
    runBtn.innerHTML = "⏳ Menjalankan...";
    
    // Show running message
    output.innerHTML = "🎮 Menjalankan kode...";
    output.className = "output-animation";
    
    try {
        // Save code before running
        saveCode();
        
        // Capture Python output
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
        
        // Run the user code
        await pyodide.runPythonAsync(code); // Gunakan runPythonAsync untuk library
        
        // Get the captured output
        const capturedOutput = pyodide.globals.get('sys').stdout.buffer;
        
        if (capturedOutput && capturedOutput.length > 0) {
            output.innerHTML = "✅ " + capturedOutput;
        } else {
            output.innerHTML = "ℹ️ Kode dijalankan tanpa output";
        }
        
        showToast("✅ Kode berhasil dijalankan!");
        
    } catch (error) {
        output.innerHTML = "❌ Error:\n" + error.message;
        output.className = "output-animation error-output";
        showToast("❌ Error saat menjalankan kode!", "error");
    } finally {
        // Re-enable button
        runBtn.disabled = false;
        runBtn.innerHTML = "▶️ Jalankan (Ctrl+Enter)";
        
        // Update status
        updateStatus();
    }
}

// Save Code
function saveCode() {
    const code = document.getElementById('playground-editor').value;
    localStorage.setItem('pythonPlaygroundCode', code);
    showToast("💾 Kode berhasil disimpan!");
}

// Load Saved Code
function loadSavedCode() {
    const savedCode = localStorage.getItem('pythonPlaygroundCode');
    if (savedCode) {
        document.getElementById('playground-editor').value = savedCode;
        updateStatus();
    }
}

// Load Code (with file picker)
function loadCode() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.py,.txt';
    
    input.onchange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('playground-editor').value = e.target.result;
                updateStatus();
                showToast("📂 File berhasil dimuat!");
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

// Clear Output
function clearOutput() {
    document.getElementById('playground-output').innerHTML = "🎮 Output akan muncul di sini setelah kamu menjalankan kode...";
    document.getElementById('playground-output').className = "";
    showToast("🧹 Output telah dibersihkan!");
}

// Reset Code to Default
function resetCode() {
    if (confirm("Reset kode ke default? Perubahan akan hilang.")) {
        const defaultCode = `# 🎨 Playground Python - Bereksperimenlah!
# Kamu bisa menulis kode apa saja di sini.

# Contoh: Membuat pola segitiga
def buat_segitiga(tinggi):
    for i in range(tinggi):
        print(" " * (tinggi - i - 1) + "*" * (2 * i + 1))

# Panggil fungsi
buat_segitiga(5)

# - Area Gambar ASCII -
print("🖼️ Gambar ASCII Sederhana:")
print(" *****")
print(" *   *")
print("* Python *")
print(" *   *")
print(" *****")

# Kamu juga bisa bereksperimen dengan turtle jika didukung!
# (Simulasi sederhana)`;
        
        document.getElementById('playground-editor').value = defaultCode;
        updateStatus();
        showToast("🔄 Kode direset ke default!");
    }
}

// Auto Indent
function autoIndent() {
    const editor = document.getElementById('playground-editor');
    const cursorPos = editor.selectionStart;
    const text = editor.value;
    
    // Insert 4 spaces at cursor position
    const textBefore = text.substring(0, cursorPos);
    const textAfter = text.substring(cursorPos);
    editor.value = textBefore + "    " + textAfter;
    
    // Move cursor
    const newCursorPos = cursorPos + 4;
    editor.setSelectionRange(newCursorPos, newCursorPos);
    
    updateStatus();
    showToast("⇥ 4 spasi ditambahkan!");
}

// Toggle Comment
function toggleComment() {
    const editor = document.getElementById('playground-editor');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    
    // Get selected text
    const selectedText = text.substring(start, end);
    const lines = selectedText.split('\n');
    
    // Toggle comment for each line
    const toggledLines = lines.map(line => {
        if (line.trim().startsWith('#')) {
            // Remove comment
            return line.replace(/^(\s*)#\s?/, '$1');
        } else {
            // Add comment
            return '# ' + line;
        }
    });
    
    const newText = toggledLines.join('\n');
    
    // Replace selected text
    editor.value = text.substring(0, start) + newText + text.substring(end);
    
    // Maintain selection
    editor.setSelectionRange(start, start + newText.length);
    
    updateStatus();
    showToast("💬 Komentar di-toggle!");
}

// Toggle Fullscreen
function toggleFullscreen() {
    const elem = document.documentElement;
    
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        document.querySelector('[onclick="toggleFullscreen()"]').innerHTML = "🔲 Keluar Layar Penuh";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        document.querySelector('[onclick="toggleFullscreen()"]').innerHTML = "🔲 Layar Penuh";
    }
}

// Go Home
function goHome() {
    if (confirm("Keluar dari playground? Kode akan disimpan otomatis.")) {
        saveCode();
        window.location.href = 'index.html';
    }
}

// Toast Notification
function showToast(message, type = 'info') {
    // Simple console log for now
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // In a real implementation, you would create a toast element
    const output = document.getElementById('playground-output');
    if (output && type === 'error') {
        output.innerHTML += `\n[${type.toUpperCase()}] ${message}`;
    }
}

// Initialize on load
// document.addEventListener('DOMContentLoaded', initPlayground); // Dipanggil dari HTML