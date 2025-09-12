// editor.js - Logika untuk halaman editor.html

// Pyodide instance
let pyodide = null;
let isEditorInitialized = false;
let currentFile = null;
let currentFileIndex = null;

// Initialize Editor
async function initEditor() {
    if (isEditorInitialized) return;

    // Load file from sessionStorage
    const savedFile = sessionStorage.getItem('currentLabFile');
    currentFileIndex = sessionStorage.getItem('currentLabFileIndex');
    
    if (savedFile) {
        try {
            currentFile = JSON.parse(savedFile);
            document.getElementById('file-name').textContent = currentFile.name;
            document.getElementById('editor-textarea').value = currentFile.code;
            updateStatus();
        } catch (e) {
            console.error("Error loading file:", e);
            document.getElementById('editor-output').innerHTML = "❌ Error memuat file.";
            return;
        }
    } else {
        document.getElementById('editor-output').innerHTML = "❌ Tidak ada file yang dimuat. Kembali ke Lab.";
        setTimeout(() => {
            window.location.href = 'lab.html';
        }, 2000);
        return;
    }

    try {
        // Show loading message
        document.getElementById('editor-output').innerHTML = "🚀 Memuat Python Engine... Mohon tunggu sebentar";
        
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
        document.getElementById('editor-output').innerHTML = "✅ Python Engine berhasil dimuat!\n\n🎮 Siap untuk coding! Tekan 'Jalankan' untuk mengeksekusi kode.";
        
        console.log("Pyodide loaded successfully");
        
        // Setup event listeners
        setupEventListeners();
        
        // Setup keyboard shortcuts
        setupKeyboardShortcuts();
        
        // Update status
        updateStatus();
        
        isEditorInitialized = true;
        
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        document.getElementById('editor-output').innerHTML = "❌ Error memuat Python Engine. Silakan refresh halaman.";
    }
}

// Setup Event Listeners
function setupEventListeners() {
    const editor = document.getElementById('editor-textarea');
    
    // Update character count and cursor position
    editor.addEventListener('input', updateStatus);
    editor.addEventListener('keyup', updateStatus);
    editor.addEventListener('click', updateStatus);
    
    // Auto-save every 30 seconds
    setInterval(saveFile, 30000);
    
    // Auto-indentation after colon
    editor.addEventListener('keydown', handleKeyDown);
    
    // Auto-pairing for brackets and quotes
    editor.addEventListener('keypress', handleKeyPress);
}

// Handle Key Down (for auto-indentation)
function handleKeyDown(e) {
    const editor = document.getElementById('editor-textarea');
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
    const editor = document.getElementById('editor-textarea');
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
            saveFile();
            showToast("💾 File berhasil disimpan!");
        }
    });
}

// Update Status Bar
function updateStatus() {
    const editor = document.getElementById('editor-textarea');
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
        await initEditor(); // Inisialisasi jika belum
        if (!pyodide) return; // Jika masih gagal, hentikan
    }

    const code = document.getElementById('editor-textarea').value;
    const output = document.getElementById('editor-output');
    const runBtn = document.getElementById('run-btn');
    
    // Disable button while running
    runBtn.disabled = true;
    runBtn.innerHTML = "⏳ Menjalankan...";
    
    // Show running message
    output.innerHTML = "🎮 Menjalankan kode...";
    output.className = "output-animation";
    
    try {
        // Save file before running
        saveFile();
        
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

// Save File
function saveFile() {
    if (!currentFile) return;

    const code = document.getElementById('editor-textarea').value;
    currentFile.code = code;
    currentFile.updatedAt = new Date().toISOString();

    // Update in sessionStorage
    sessionStorage.setItem('currentLabFile', JSON.stringify(currentFile));

    // Update in localStorage (lab files)
    try {
        const labFiles = JSON.parse(localStorage.getItem('pythonLabFiles') || '[]');
        if (currentFileIndex !== null && labFiles[currentFileIndex]) {
            labFiles[currentFileIndex] = currentFile;
            localStorage.setItem('pythonLabFiles', JSON.stringify(labFiles));
        }
    } catch (e) {
        console.error("Error saving to lab files:", e);
    }

    showToast("💾 File berhasil disimpan!");
}

// Auto Indent
function autoIndent() {
    const editor = document.getElementById('editor-textarea');
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
    const editor = document.getElementById('editor-textarea');
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

// Go Back to Lab
function goBack() {
    saveFile(); // Simpan dulu sebelum kembali
    window.location.href = 'lab.html';
}

// Toast Notification (Placeholder)
function showToast(message, type = 'info') {
    // Simple console log for now
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // In a real implementation, you would create a toast element
    const output = document.getElementById('editor-output');
    if (output && type === 'error') {
        output.innerHTML += `\n[${type.toUpperCase()}] ${message}`;
    }
}