// editor.js - Logika untuk halaman editor.html (v4.0.0)

let pyodide = null;
let isEditorInitialized = false;
let currentFile = null;
let currentFileIndex = null;

async function initEditor() {
    if (isEditorInitialized) return;

    console.log("Memulai inisialisasi editor...");
    
    const savedFile = sessionStorage.getItem('currentLabFile');
    currentFileIndex = sessionStorage.getItem('currentLabFileIndex');
    
    if (savedFile) {
        try {
            currentFile = JSON.parse(savedFile);
            console.log("File dimuat:", currentFile.name);
            document.getElementById('file-name').textContent = currentFile.name;
            document.getElementById('editor-textarea').value = currentFile.code;
            updateStatus();
        } catch (e) {
            console.error("Error loading file:", e);
            document.getElementById('editor-output').innerHTML = "❌ Error memuat file.";
            return;
        }
    } else {
        console.warn("Tidak ada file yang dimuat. Kembali ke Lab.");
        document.getElementById('editor-output').innerHTML = "❌ Tidak ada file yang dimuat. Kembali ke Lab.";
        setTimeout(() => {
            window.location.href = 'lab.html';
        }, 2000);
        return;
    }

    try {
        document.getElementById('editor-output').innerHTML = "🚀 Memuat Python Engine... Mohon tunggu sebentar";
        
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
        });
        
        console.log("Memuat library tambahan...");
        document.getElementById('editor-output').innerHTML = "📦 Memuat library tambahan...";

        const librariesToLoad = ["numpy", "matplotlib", "requests", "pandas", "sympy"];
        
        for (const lib of librariesToLoad) {
            try {
                await pyodide.loadPackage(lib);
                console.log(`Library ${lib} berhasil dimuat.`);
                document.getElementById('editor-output').innerHTML += `\n✅ ${lib} dimuat.`;
            } catch (err) {
                console.error(`Gagal memuat library ${lib}:`, err);
                document.getElementById('editor-output').innerHTML += `\n❌ Gagal memuat ${lib}.`;
            }
        }
        
        if (librariesToLoad.includes("matplotlib")) {
            pyodide.runPython(`
                import matplotlib
                matplotlib.use('Agg')
            `);
            console.log("matplotlib dikonfigurasi untuk backend 'Agg'.");
        }
        
        document.getElementById('editor-output').innerHTML = "✅ Python Engine & Library berhasil dimuat!\n\n🎮 Siap untuk coding! Tekan 'Jalankan' untuk mengeksekusi kode.";
        
        console.log("Pyodide dan library berhasil dimuat.");
        
        setupEventListeners();
        setupKeyboardShortcuts();
        updateStatus();
        
        isEditorInitialized = true;
        console.log("Inisialisasi editor selesai.");
        
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        document.getElementById('editor-output').innerHTML = "❌ Error memuat Python Engine. Silakan refresh halaman.";
    }
}

function setupEventListeners() {
    const editor = document.getElementById('editor-textarea');
    
    editor.addEventListener('input', updateStatus);
    editor.addEventListener('keyup', updateStatus);
    editor.addEventListener('click', updateStatus);
    
    editor.addEventListener('keydown', handleKeyDown);
    editor.addEventListener('keypress', handleKeyPress);
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            console.log("Shortcut Ctrl+Enter ditekan.");
            runCode();
        }
        
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            console.log("Shortcut Ctrl+S ditekan.");
            saveFile();
            showToast("💾 File berhasil disimpan!");
        }
    });
}

function handleKeyDown(e) {
    const editor = document.getElementById('editor-textarea');
    const cursorPos = editor.selectionStart;
    const text = editor.value;
    
    if (e.key === ':') {
        e.preventDefault();
        const textBefore = text.substring(0, cursorPos);
        const textAfter = text.substring(cursorPos);
        editor.value = textBefore + ':' + '\n' + '    ';
        const newCursorPos = cursorPos + 2;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        updateStatus();
        console.log("Auto-indent setelah ':' ditambahkan.");
    }
    
    if (e.key === 'Enter') {
        const lines = text.substring(0, cursorPos).split('\n');
        const currentLine = lines[lines.length - 1];

        if (currentLine.trim().endsWith(':')) {
            e.preventDefault();
            const textBefore = text.substring(0, cursorPos);
            const textAfter = text.substring(cursorPos);
            editor.value = textBefore + '\n' + '    ' + textAfter;
            const newCursorPos = cursorPos + 5;
            editor.setSelectionRange(newCursorPos, newCursorPos);
            updateStatus();
            console.log("Auto-indent setelah Enter pada baris dengan ':' ditambahkan.");
        }
    }
}

function handleKeyPress(e) {
    const editor = document.getElementById('editor-textarea');
    const cursorPos = editor.selectionStart;
    const text = editor.value;
    
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}',
        '"': '"',
        "'": "'"
    };

    if (pairs.hasOwnProperty(e.key)) {
        e.preventDefault();
        const closeChar = pairs[e.key];
        const textBefore = text.substring(0, cursorPos);
        const textAfter = text.substring(cursorPos);
        editor.value = textBefore + e.key + closeChar + textAfter;
        const newCursorPos = cursorPos + 1;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        updateStatus();
        console.log(`Auto-pairing untuk '${e.key}' ditambahkan.`);
    }
}

function updateStatus() {
    const editor = document.getElementById('editor-textarea');
    const text = editor.value;
    const cursorPos = editor.selectionStart;
    
    const textBeforeCursor = text.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const col = lines[lines.length - 1].length + 1;
    
    document.getElementById('line-col').textContent = `Baris ${line}, Kolom ${col}`;
    document.getElementById('char-count').textContent = `${text.length} karakter`;
}

async function runCode() {
    if (!pyodide) {
        console.warn("Pyodide belum dimuat, mencoba inisialisasi...");
        await initEditor();
        if (!pyodide) return;
    }

    const code = document.getElementById('editor-textarea').value;
    const output = document.getElementById('editor-output');
    const runBtn = document.getElementById('run-btn');
    
    console.log("Menjalankan kode...");
    
    runBtn.disabled = true;
    runBtn.innerHTML = "⏳ Menjalankan...";
    output.innerHTML = "🎮 Menjalankan kode...";
    output.className = "output-animation";
    
    try {
        saveFile();
        
        console.log("Menyiapkan capture output...");
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
        
        console.log("Menjalankan kode Python...");
        await pyodide.runPythonAsync(code);
        
        console.log("Mengambil output...");
        const capturedOutput = pyodide.globals.get('sys').stdout.buffer;
        
        if (capturedOutput && capturedOutput.length > 0) {
            output.innerHTML = "✅ " + capturedOutput;
        } else {
            output.innerHTML = "ℹ️ Kode dijalankan tanpa output";
        }
        
        showToast("✅ Kode berhasil dijalankan!");
        console.log("Kode berhasil dijalankan.");
        
    } catch (error) {
        console.error("Error saat menjalankan kode:", error);
        output.innerHTML = "❌ Error:\n" + error.message;
        output.className = "output-animation error-output";
        showToast("❌ Error saat menjalankan kode!", "error");
    } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = "▶️ Jalankan (Ctrl+Enter)";
        updateStatus();
    }
}

function saveFile() {
    if (!currentFile) {
        console.warn("Tidak ada file yang sedang dibuka untuk disimpan.");
        return;
    }

    console.log("Menyimpan file...");
    const code = document.getElementById('editor-textarea').value;
    currentFile.code = code;
    currentFile.updatedAt = new Date().toISOString();

    sessionStorage.setItem('currentLabFile', JSON.stringify(currentFile));

    try {
        const labFiles = JSON.parse(localStorage.getItem('pythonLabFiles') || '[]');
        if (currentFileIndex !== null && labFiles[parseInt(currentFileIndex)]) {
            labFiles[parseInt(currentFileIndex)] = currentFile;
            localStorage.setItem('pythonLabFiles', JSON.stringify(labFiles));
            console.log("File berhasil disimpan ke localStorage.");
        } else {
            console.warn("Indeks file tidak valid saat menyimpan ke localStorage.");
        }
    } catch (e) {
        console.error("Error saving to lab files in localStorage:", e);
    }

    showToast("💾 File berhasil disimpan!");
    updateStatus();
}

function goBack() {
    console.log("Kembali ke halaman Lab...");
    saveFile();
    window.location.href = 'lab.html';
}

function autoIndent() {
    const editor = document.getElementById('editor-textarea');
    const cursorPos = editor.selectionStart;
    const text = editor.value;
    
    const textBefore = text.substring(0, cursorPos);
    const textAfter = text.substring(cursorPos);
    editor.value = textBefore + "    " + textAfter;
    
    const newCursorPos = cursorPos + 4;
    editor.setSelectionRange(newCursorPos, newCursorPos);
    
    updateStatus();
    showToast("⇥ 4 spasi ditambahkan!");
    console.log("4 spasi ditambahkan via tombol.");
}

function toggleComment() {
    const editor = document.getElementById('editor-textarea');
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const text = editor.value;
    
    if (start === end) {
        const lines = text.split('\n');
        const textBeforeCursor = text.substring(0, start);
        const currentLineIndex = textBeforeCursor.split('\n').length - 1;
        const currentLine = lines[currentLineIndex];
        
        let newLine;
        if (currentLine.trim().startsWith('#')) {
            newLine = currentLine.replace(/^(\s*)#\s?/, '$1');
        } else {
            newLine = '# ' + currentLine;
        }
        
        lines[currentLineIndex] = newLine;
        editor.value = lines.join('\n');
        
        const lineStartPos = text.substring(0, start).lastIndexOf('\n') + 1;
        const newCursorPos = lineStartPos + newLine.length;
        editor.setSelectionRange(newCursorPos, newCursorPos);
        
    } else {
        const selectedText = text.substring(start, end);
        const lines = selectedText.split('\n');
        
        const allCommented = lines.every(line => line.trim() === '' || line.trim().startsWith('#'));
        
        const toggledLines = lines.map(line => {
            if (allCommented) {
                return line.replace(/^(\s*)#\s?/, '$1');
            } else {
                return line.trim() === '' ? line : '# ' + line;
            }
        });
        
        const newText = toggledLines.join('\n');
        
        editor.value = text.substring(0, start) + newText + text.substring(end);
        
        editor.setSelectionRange(start, start + newText.length);
    }
    
    updateStatus();
    showToast("💬 Komentar di-toggle!");
    console.log("Komentar di-toggle.");
}

function showToast(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// document.addEventListener('DOMContentLoaded', initEditor); // Dipanggil dari editor.html