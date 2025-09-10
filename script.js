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

// Level Definitions (1-10)
const levels = {
    1: {
        title: "🎯 Misi: Kenalan dengan Variabel",
        desc: "Karakter kamu butuh nama supaya bisa dikenali. Gunakan variabel untuk menyimpan namanya!",
        examples: "nama = \"Budi\"\nprint(\"Halo, \" + nama)",
        story: "Kamu menemukan sebuah gua rahasia. Di dindingnya tertulis tentang 'variabel' - tempat menyimpan nilai!",
        badge: "🏆 Variabel Master",
        defaultCode: "nama = \"Budi\"\nprint(\"Halo, \" + nama)",
        hints: [
            "Gunakan tanda = untuk menyimpan nilai dalam variabel",
            "Gunakan tanda kutip untuk teks (string)",
            "Gunakan print() untuk menampilkan hasil"
        ],
        quiz: {
            question: "Apa itu variabel dalam Python?",
            options: [
                "Fungsi untuk mencetak teks",
                "Tempat menyimpan nilai/data",
                "Perintah untuk mengulang",
                "Tipe data boolean"
            ],
            correct: 1
        }
    },
    2: {
        title: "🕵️‍♂️ Misi: Detektif Tipe Data",
        desc: "Kamu adalah detektif yang harus mengidentifikasi tipe data dari berbagai nilai. Gunakan fungsi type() untuk mengecek tipe data!",
        examples: "nama = \"Andi\"\numur = 13\nsiswa = True\nprint(type(nama))\nprint(type(umur))\nprint(type(siswa))",
        story: "Setelah memahami variabel, kamu menemukan buku sihir tentang berbagai 'tipe data' yang bisa disimpan!",
        badge: "🔍 Tipe Data Detective",
        defaultCode: "nama = \"Andi\"\numur = 13\nsiswa = True\nprint(type(nama))\nprint(type(umur))\nprint(type(siswa))",
        hints: [
            "String ditulis dengan tanda kutip",
            "Integer adalah angka bulat tanpa kutip",
            "Boolean hanya bisa True atau False"
        ],
        quiz: {
            question: "Tipe data apa yang digunakan untuk angka bulat?",
            options: [
                "string",
                "float",
                "integer",
                "boolean"
            ],
            correct: 2
        }
    },
    3: {
        title: "💰 Misi: Kalkulator Petualangan",
        desc: "Kamu sedang mengumpulkan koin dalam petualangan! Gunakan operasi matematika untuk menghitung total koinmu.",
        examples: "koin_level1 = 25\nkoin_level2 = 30\nbonus = 10\n\ntotal = koin_level1 + koin_level2 + bonus\nprint(\"Total koin: \" + str(total))",
        story: "Di hutan ajaib, kamu menemukan peti harta karun yang membutuhkan kemampuan matematika untuk dibuka!",
        badge: "🧮 Math Wizard",
        defaultCode: "koin_level1 = 25\nkoin_level2 = 30\nbonus = 10\n\ntotal = koin_level1 + koin_level2 + bonus\nprint(\"Total koin: \" + str(total))",
        hints: [
            "Gunakan + untuk penjumlahan",
            "Gunakan str() untuk mengubah angka jadi teks",
            "Gunakan * untuk perkalian"
        ],
        quiz: {
            question: "Apa hasil dari 10 + 5 * 2?",
            options: [
                "30",
                "20",
                "15",
                "25"
            ],
            correct: 1
        }
    },
    4: {
        title: "🧭 Misi: Membuat Keputusan",
        desc: "Kamu sedang di depan pintu rahasia! Gunakan kondisi untuk memutuskan jalan yang harus diambil.",
        examples: "umur = 15\nkunci = True\n\nif umur >= 13 and kunci:\n    print(\"Boleh masuk ke ruang rahasia!\")\nelse:\n    print(\"Belum boleh masuk\")",
        story: "Kamu sampai di persimpangan jalan. Hanya dengan logika yang tepat kamu bisa memilih jalan yang benar!",
        badge: "⚖️ Logic Master",
        defaultCode: "umur = 15\nkunci = True\n\nif umur >= 13 and kunci:\n    print(\"Boleh masuk ke ruang rahasia!\")\nelse:\n    print(\"Belum boleh masuk\")",
        hints: [
            "Gunakan if untuk kondisi yang benar",
            "Gunakan else untuk kondisi lainnya",
            "Gunakan and/or untuk kombinasi kondisi"
        ],
        quiz: {
            question: "Apa output dari: if 5 > 3: print('Benar') else: print('Salah')",
            options: [
                "Salah",
                "Benar",
                "Error",
                "Tidak ada output"
            ],
            correct: 1
        }
    },
    5: {
        title: "🔁 Misi: Mengulang Tugas",
        desc: "Kamu harus mengumpulkan 5 koin emas! Gunakan perulangan untuk mengulang proses pengumpulan.",
        examples: "for i in range(5):\n    print(\"Mengumpulkan koin ke-\" + str(i+1))",
        story: "Di menara sihir, kamu harus melakukan ritual berulang kali untuk mendapatkan kekuatan baru!",
        badge: "🔄 Loop Champion",
        defaultCode: "for i in range(5):\n    print(\"Mengumpulkan koin ke-\" + str(i+1))",
        hints: [
            "Gunakan for untuk perulangan yang diketahui jumlahnya",
            "range(n) membuat urutan 0 sampai n-1",
            "Gunakan str() untuk menggabungkan angka dan teks"
        ],
        quiz: {
            question: "Berapa kali perulangan ini dijalankan: for i in range(3): print(i)",
            options: [
                "2 kali",
                "3 kali",
                "4 kali",
                "1 kali"
            ],
            correct: 1
        }
    },
    6: {
        title: "⚙️ Misi: Membuat Blok Kode",
        desc: "Kamu adalah penyihir yang bisa membuat mantra! Setiap mantra adalah fungsi yang bisa digunakan berulang kali.",
        examples: "def sapa(nama):\n    print(\"Halo, \" + nama + \"! Selamat datang di petualangan!\")\n\nsapa(\"Andi\")\nsapa(\"Budi\")",
        story: "Kamu belajar membuat 'mantra' sihir yang bisa digunakan kapan saja - seperti fungsi dalam Python!",
        badge: "🔧 Function Wizard",
        defaultCode: "def sapa(nama):\n    print(\"Halo, \" + nama + \"! Selamat datang di petualangan!\")\n\nsapa(\"Andi\")\nsapa(\"Budi\")",
        hints: [
            "Gunakan def untuk membuat fungsi",
            "Gunakan parameter untuk input fungsi",
            "Panggil fungsi dengan nama_fungsi(parameter)"
        ],
        quiz: {
            question: "Apa fungsi dari kata kunci 'def'?",
            options: [
                "Mendefinisikan variabel",
                "Mendefinisikan fungsi",
                "Menghapus fungsi",
                "Memanggil fungsi"
            ],
            correct: 1
        }
    },
    7: {
        title: "📦 Misi: Koleksi Harta Karun",
        desc: "Kamu menemukan peti harta karun! Gunakan list untuk menyimpan koleksi item kamu.",
        examples: "item_koleksi = [\"pedang\", \"perisai\", \"ramuan\"]\nprint(\"Item pertama: \" + item_koleksi[0])\nprint(\"Total item: \" + str(len(item_koleksi)))",
        story: "Di dalam gua kuno, kamu menemukan koleksi item sihir. Kamu butuh cara untuk menyimpan dan mengatur koleksimu!",
        badge: "📦 List Master",
        defaultCode: "item_koleksi = [\"pedang\", \"perisai\", \"ramuan\"]\nprint(\"Item pertama: \" + item_koleksi[0])\nprint(\"Total item: \" + str(len(item_koleksi)))",
        hints: [
            "List ditulis dengan kurung siku []",
            "Item diakses dengan index [0], [1], [2], dst",
            "Gunakan len() untuk menghitung jumlah item"
        ],
        quiz: {
            question: "Bagaimana cara mengakses item pertama dalam list?",
            options: [
                "list.0",
                "list[1]",
                "list[0]",
                "list.first"
            ],
            correct: 2
        }
    },
    8: {
        title: "📚 Misi: Kamus Sihir",
        desc: "Buat kamus sihir untuk menyimpan informasi tentang mantra dan kekuatannya!",
        examples: "mantra = {\"pelindung\": 50, \"serangan\": 80, \"penyembuhan\": 30}\nprint(\"Kekuatan mantra pelindung: \" + str(mantra[\"pelindung\"]))",
        story: "Kamu menemukan buku sihir kuno yang berisi kamus mantra. Setiap mantra memiliki kekuatan berbeda!",
        badge: "📚 Dictionary Wizard",
        defaultCode: "mantra = {\"pelindung\": 50, \"serangan\": 80, \"penyembuhan\": 30}\nprint(\"Kekuatan mantra pelindung: \" + str(mantra[\"pelindung\"]))",
        hints: [
            "Dictionary ditulis dengan kurung kurawal {}",
            "Setiap item punya key dan value: {\"key\": \"value\"}",
            "Akses nilai dengan nama key: dict[\"key\"]"
        ],
        quiz: {
            question: "Apa yang dimaksud dengan 'key' dalam dictionary?",
            options: [
                "Nilai yang disimpan",
                "Indeks numerik",
                "Identifier untuk mengakses nilai",
                "Jumlah item"
            ],
            correct: 2
        }
    },
    9: {
        title: "💾 Misi: Menyimpan Catatan Petualangan",
        desc: "Simpan catatan petualanganmu ke file agar tidak hilang!",
        examples: "# Membuat dan menulis file\ncatatan = open(\"catatan.txt\", \"w\")\ncatatan.write(\"Hari 1: Menemukan gua rahasia\\n\")\ncatatan.write(\"Hari 2: Belajar variabel\\n\")\ncatatan.close()\n\n# Membaca file\ncatatan = open(\"catatan.txt\", \"r\")\nprint(catatan.read())\ncatatan.close()",
        story: "Kamu ingin menyimpan semua catatan petualanganmu. Kamu belajar cara menyimpan data ke file!",
        badge: "💾 File Handler",
        defaultCode: "# Membuat dan menulis file\ncatatan = open(\"catatan.txt\", \"w\")\ncatatan.write(\"Hari 1: Menemukan gua rahasia\\n\")\ncatatan.write(\"Hari 2: Belajar variabel\\n\")\ncatatan.close()\n\n# Membaca file\ncatatan = open(\"catatan.txt\", \"r\")\nprint(catatan.read())\ncatatan.close()",
        hints: [
            "Gunakan open() untuk membuka file",
            "\"w\" untuk menulis, \"r\" untuk membaca",
            "Jangan lupa close() file setelah selesai"
        ],
        quiz: {
            question: "Mode apa yang digunakan untuk menulis file?",
            options: [
                "\"read\"",
                "\"write\"",
                "\"w\"",
                "\"r\""
            ],
            correct: 2
        }
    },
    10: {
        title: "🧙 Misi: Membuat Karakter Petualang",
        desc: "Buat karakter petualangmu sendiri dengan class dan object!",
        examples: "class Petualang:\n    def __init__(self, nama, hp, kekuatan):\n        self.nama = nama\n        self.hp = hp\n        self.kekuatan = kekuatan\n    \n    def serang(self, musuh):\n        print(self.nama + \" menyerang \" + musuh + \"!\")\n\n# Membuat karakter\nbudi = Petualang(\"Budi\", 100, 25)\nbudi.serang(\"Goblin\")",
        story: "Kamu belajar sihir tingkat tinggi - Object Oriented Programming! Sekarang kamu bisa membuat karakter dan kekuatan sendiri!",
        badge: "🧙 OOP Master",
        defaultCode: "class Petualang:\n    def __init__(self, nama, hp, kekuatan):\n        self.nama = nama\n        self.hp = hp\n        self.kekuatan = kekuatan\n    \n    def serang(self, musuh):\n        print(self.nama + \" menyerang \" + musuh + \"!\")\n\n# Membuat karakter\nbudi = Petualang(\"Budi\", 100, 25)\nbudi.serang(\"Goblin\")",
        hints: [
            "Gunakan class untuk membuat blueprint",
            "__init__ adalah constructor untuk inisialisasi",
            "self merujuk pada object itu sendiri"
        ],
        quiz: {
            question: "Apa fungsi __init__ dalam class?",
            options: [
                "Menghapus object",
                "Constructor untuk inisialisasi",
                "Menjalankan method",
                "Menghitung jumlah object"
            ],
            correct: 1
        }
    }
};

// Badges
const badges = [
    "🏆 Variabel Master",
    "🔍 Tipe Data Detective", 
    "🧮 Math Wizard",
    "⚖️ Logic Master",
    "🔄 Loop Champion",
    "🔧 Function Wizard",
    "📦 List Master",
    "📚 Dictionary Wizard",
    "💾 File Handler",
    "🧙 OOP Master",
    "💎 Python Pro"
];

// Achievements
const achievements = [
    "🎯 First Code", // Jalankan kode pertama kali
    "💥 Error Hunter", // Dapatkan 5 error
    "⚡ Speed Coder", // Jalankan kode < 5 detik setelah load
    "📚 Quiz Master", // Jawab 5 quiz benar
    "🔁 Loop Expert", // Gunakan loop 10x
    "🔧 Function Fan" // Buat 5 fungsi
];

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
