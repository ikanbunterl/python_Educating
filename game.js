// Data Game
const gameData = {
    currentLevel: 1,
    xp: 0,
    badges: [],
    achievements: [],
    completedLevels: [],
    playerName: "Petualang Python",
    codeHistory: {}
};

// Pyodide instance
let pyodide = null;

// Initialize Game
async function initGame() {
    try {
        // Load Pyodide
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        
        // Hide loading, show game
        document.getElementById('loading').style.display = 'none';
        document.getElementById('game-content').style.display = 'block';
        
        loadGame();
        updateUI();
        setupLevelButtons();
        updateLevelContent();
        
        // Setup keyboard shortcuts
        setupKeyboardShortcuts();
        
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        document.getElementById('loading').innerHTML = "❌ Error memuat Python Engine. Silakan refresh halaman.";
    }
}

// Setup keyboard shortcuts
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to run code
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
        
        // Ctrl+Z for undo
        if (e.ctrlKey && e.key === 'z') {
            document.execCommand('undo', false, null);
        }
        
        // Ctrl+Y for redo
        if (e.ctrlKey && e.key === 'y') {
            document.execCommand('redo', false, null);
        }
    });
}

// Load Game Data
function loadGame() {
    const saved = localStorage.getItem('pythonAdventure');
    if (saved) {
        Object.assign(gameData, JSON.parse(saved));
    }
}

// Save Game Data
function saveGame() {
    localStorage.setItem('pythonAdventure', JSON.stringify(gameData));
}

// Update UI
function updateUI() {
    document.getElementById('current-level').textContent = gameData.currentLevel;
    document.getElementById('current-xp').textContent = gameData.xp;
    document.getElementById('max-xp').textContent = getNextLevelXP();
    
    const xpPercent = (gameData.xp / getNextLevelXP()) * 100;
    document.getElementById('xp-bar').style.width = xpPercent + '%';
    document.getElementById('xp-text').textContent = gameData.xp + '/' + getNextLevelXP() + ' XP';
    
    updateBadges();
}

// Get XP needed for next level
function getNextLevelXP() {
    return gameData.currentLevel * 100;
}

// Update Badges Display
function updateBadges() {
    const badgeContainer = document.getElementById('badges');
    badgeContainer.innerHTML = '';
    
    badges.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.className = 'badge';
        if (gameData.badges.includes(badge)) {
            badgeEl.classList.add('earned');
        }
        badgeEl.textContent = badge;
        badgeContainer.appendChild(badgeEl);
    });
}

// Setup Level Buttons
function setupLevelButtons() {
    const selector = document.getElementById('level-selector');
    selector.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.textContent = 'Level ' + i;
        btn.onclick = () => selectLevel(i);
        
        if (i === gameData.currentLevel) {
            btn.classList.add('active');
        }
        if (gameData.completedLevels.includes(i)) {
            btn.classList.add('completed');
        }
        
        // Add progress indicator
        if (gameData.completedLevels.includes(i)) {
            const progressCircle = document.createElement('div');
            progressCircle.className = 'progress-circle';
            progressCircle.textContent = '✓';
            btn.appendChild(progressCircle);
        }
        
        selector.appendChild(btn);
    }
}

// Select Level
function selectLevel(level) {
    gameData.currentLevel = level;
    updateUI();
    setupLevelButtons();
    updateLevelContent();
    saveGame();
}

// Update Level Content
function updateLevelContent() {
    const level = levels[gameData.currentLevel];
    if (!level) return;
    
    document.getElementById('mission-title').textContent = level.title;
    document.getElementById('mission-desc').textContent = level.desc;
    document.getElementById('examples').innerHTML = '<strong>Contoh:</strong><br>' + level.examples.replace(/\n/g, '<br>');
    document.getElementById('story').textContent = level.story;
    
    // Set default code based on level
    document.getElementById('code-editor').value = level.defaultCode;
    
    // Hide quiz
    document.getElementById('quiz-container').style.display = 'none';
}

// Reset Code to Default
function resetCode() {
    const level = levels[gameData.currentLevel];
    if (level) {
        document.getElementById('code-editor').value = level.defaultCode;
    }
}

// Show Hint
function showHint() {
    const level = levels[gameData.currentLevel];
    if (level && level.hints) {
        const randomHint = level.hints[Math.floor(Math.random() * level.hints.length)];
        alert("💡 Petunjuk: " + randomHint);
    }
}

// Export Code
function exportCode() {
    const code = document.getElementById('code-editor').value;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'python_adventure_level' + gameData.currentLevel + '.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ✅ SISTEM EKSEKUSI PYTHON YANG BENAR
async function runCode() {
    const code = document.getElementById("code-editor").value;
    const output = document.getElementById("output");
    const runBtn = document.getElementById("run-btn");
    
    // Disable button while running
    runBtn.disabled = true;
    runBtn.textContent = "⏳ Menjalankan...";
    output.innerHTML = "🎮 Menjalankan kode...";
    output.className = ""; // Reset error class
    
    try {
        // Simulate loading animation
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Capture Python output
        let outputBuffer = "";
        
        // Override print function to capture output
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
        pyodide.runPython(code);
        
        // Get the captured output
        const capturedOutput = pyodide.globals.get('sys').stdout.buffer;
        
        if (capturedOutput && capturedOutput.length > 0) {
            output.innerHTML = "✅ " + capturedOutput;
        } else {
            output.innerHTML = "ℹ️ Kode dijalankan tanpa output";
        }
        
        // Give XP for successful execution
        giveXP(20);
        
        // Achievement: First Code
        if (!gameData.achievements.includes("🎯 First Code")) {
            gameData.achievements.push("🎯 First Code");
            alert("🏆 Achievement Unlocked: First Code!");
        }
        
    } catch (error) {
        output.innerHTML = "❌ Error:\n" + error.message;
        output.className = "error-output";
        
        // Achievement: Error Hunter
        if (!gameData.achievements.includes("💥 Error Hunter")) {
            // Count errors (simplified)
            if (Math.random() > 0.7) { // Simulate error counting
                gameData.achievements.push("💥 Error Hunter");
                alert("🏆 Achievement Unlocked: Error Hunter!");
            }
        }
    } finally {
        // Re-enable button
        runBtn.disabled = false;
        runBtn.textContent = "🚀 Jalankan Kode (Ctrl+Enter)";
    }
}

// Give XP
function giveXP(amount) {
    gameData.xp += amount;
    const nextLevelXP = getNextLevelXP();
    
    if (gameData.xp >= nextLevelXP) {
        levelUp();
    }
    
    // Mark level as completed
    if (!gameData.completedLevels.includes(gameData.currentLevel)) {
        gameData.completedLevels.push(gameData.currentLevel);
        const badge = levels[gameData.currentLevel].badge;
        if (badge && !gameData.badges.includes(badge)) {
            gameData.badges.push(badge);
            alert("🏆 Badge Unlocked: " + badge);
        }
    }
    
    updateUI();
    setupLevelButtons();
    saveGame();
}

// Level Up
function levelUp() {
    gameData.currentLevel++;
    gameData.xp = 0;
    
    if (gameData.currentLevel > 10) {
        gameData.currentLevel = 10;
        if (!gameData.badges.includes("💎 Python Pro")) {
            gameData.badges.push("💎 Python Pro");
            alert("🏆 Ultimate Badge Unlocked: Python Pro!");
        }
    }
    
    alert("🎉 Level Up! Kamu sekarang di Level " + gameData.currentLevel);
    updateLevelContent();
}

// Show Challenge
function showChallenge() {
    const challenges = {
        1: "🎯 Tantangan: Buat variabel untuk menyimpan nama, umur, dan hobi kamu, lalu tampilkan semua dengan print()",
        2: "⚔️ Tantangan: Buat 3 variabel dengan tipe data berbeda (string, integer, boolean) dan cek tipe datanya",
        3: "💰 Tantangan: Hitung total belanja dengan diskon 10% jika total > 100000",
        4: "🧭 Tantangan: Buat sistem penilaian (A, B, C, D, E) berdasarkan nilai angka",
        5: "🔁 Tantangan: Buat countdown dari 10 ke 0 menggunakan while loop",
        6: "⚙️ Tantangan: Buat fungsi untuk menghitung luas persegi panjang dan lingkaran",
        7: "📦 Tantangan: Buat list belanja dan tampilkan semua item dengan for loop",
        8: "📚 Tantangan: Buat dictionary kontak teman (nama: nomor) dan tampilkan semua kontak",
        9: "💾 Tantangan: Simpan daftar tugas ke file dan baca kembali",
        10: "🧙 Tantangan: Buat class 'Monster' dengan atribut dan method serang()"
    };
    
    const output = document.getElementById("output");
    output.innerHTML = "⚔️ " + challenges[gameData.currentLevel] || "⚔️ Tantangan spesial untuk level ini!";
    output.className = ""; // Reset error class
}

// Show Quiz
function showQuiz() {
    const level = levels[gameData.currentLevel];
    if (!level || !level.quiz) return;
    
    const quizContainer = document.getElementById('quiz-container');
    const quizContent = document.getElementById('quiz-content');
    
    quizContent.innerHTML = `
        <div class="quiz-question">
            <h4>${level.quiz.question}</h4>
        </div>
        <div class="quiz-options" id="quiz-options">
            ${level.quiz.options.map((option, index) => 
                `<div class="quiz-option" onclick="selectQuizOption(${index})" data-index="${index}">${option}</div>`
            ).join('')}
        </div>
    `;
    
    quizContainer.style.display = 'block';
    
    // Scroll to quiz
    quizContainer.scrollIntoView({ behavior: 'smooth' });
}

// Select Quiz Option
function selectQuizOption(index) {
    // Remove previous selections
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Select clicked option
    event.target.classList.add('selected');
    event.target.dataset.selected = index;
}

// Submit Quiz
function submitQuiz() {
    const level = levels[gameData.currentLevel];
    if (!level || !level.quiz) return;
    
    const selectedOption = document.querySelector('.quiz-option.selected');
    if (!selectedOption) {
        alert("⚠️ Pilih jawaban dulu!");
        return;
    }
    
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const isCorrect = selectedIndex === level.quiz.correct;
    
    if (isCorrect) {
        alert("✅ Benar! Jawaban kamu tepat!");
        giveXP(30); // Bonus XP for quiz
        
        // Achievement: Quiz Master
        if (!gameData.achievements.includes("📚 Quiz Master")) {
            gameData.achievements.push("📚 Quiz Master");
            alert("🏆 Achievement Unlocked: Quiz Master!");
        }
    } else {
        alert("❌ Salah. Jawaban yang benar: " + level.quiz.options[level.quiz.correct]);
    }
    
    document.getElementById('quiz-container').style.display = 'none';
}

// Initialize on load
window.onload = initGame;
