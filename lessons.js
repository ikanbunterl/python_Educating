// lessons.js - Logika Pelajaran

// Data Game State (disimpan di localStorage)
let gameData = {
    currentLevel: 1,
    xp: 0,
    badges: [],
    completedLevels: [],
    coins: 0,
    // Sistem unlock berdasarkan progress
    unlockedLessons: [1], // Level 1 selalu terbuka
    playerName: "Petualang Python"
};

// Definisi Level Pembelajaran
const lessons = {
    1: {
        title: "🎯 Misi: Kenalan dengan Variabel",
        desc: "Karakter kamu butuh nama supaya bisa dikenali. Gunakan variabel untuk menyimpan namanya!",
        examples: "nama = \"Budi\"\nprint(\"Halo, \" + nama)",
        story: "Kamu menemukan sebuah gua rahasia. Di dindingnya tertulis tentang 'variabel' - tempat menyimpan nilai!",
        badge: "🏆 Variabel Master",
        defaultCode: "nama = \"Budi\"\nprint(\"Halo, \" + nama)",
        xpReward: 20,
        coinReward: 10,
        hints: [
            "Gunakan tanda = untuk menyimpan nilai dalam variabel",
            "Gunakan tanda kutip untuk teks (string)",
            "Gunakan print() untuk menampilkan hasil"
        ]
    },
    2: {
        title: "🕵️‍♂️ Misi: Detektif Tipe Data",
        desc: "Kamu adalah detektif yang harus mengidentifikasi tipe data dari berbagai nilai. Gunakan fungsi type() untuk mengecek tipe data!",
        examples: "nama = \"Andi\"\numur = 13\nsiswa = True\nprint(type(nama))\nprint(type(umur))\nprint(type(siswa))",
        story: "Setelah memahami variabel, kamu menemukan buku sihir tentang berbagai 'tipe data' yang bisa disimpan!",
        badge: "🔍 Tipe Data Detective",
        defaultCode: "nama = \"Andi\"\numur = 13\nsiswa = True\nprint(type(nama))\nprint(type(umur))\nprint(type(siswa))",
        xpReward: 25,
        coinReward: 15,
        hints: [
            "String ditulis dengan tanda kutip",
            "Integer adalah angka bulat tanpa kutip",
            "Boolean hanya bisa True atau False"
        ]
    },
    3: {
        title: "💰 Misi: Kalkulator Petualangan",
        desc: "Kamu sedang mengumpulkan koin dalam petualangan! Gunakan operasi matematika untuk menghitung total koinmu.",
        examples: "koin_level1 = 25\nkoin_level2 = 30\nbonus = 10\n\ntotal = koin_level1 + koin_level2 + bonus\nprint(\"Total koin: \" + str(total))",
        story: "Di hutan ajaib, kamu menemukan peti harta karun yang membutuhkan kemampuan matematika untuk dibuka!",
        badge: "🧮 Math Wizard",
        defaultCode: "koin_level1 = 25\nkoin_level2 = 30\nbonus = 10\n\ntotal = koin_level1 + koin_level2 + bonus\nprint(\"Total koin: \" + str(total))",
        xpReward: 30,
        coinReward: 20,
        hints: [
            "Gunakan + untuk penjumlahan",
            "Gunakan str() untuk mengubah angka jadi teks",
            "Gunakan * untuk perkalian"
        ]
    },
    4: {
        title: "🧭 Misi: Membuat Keputusan",
        desc: "Kamu sedang di depan pintu rahasia! Gunakan kondisi untuk memutuskan jalan yang harus diambil.",
        examples: "umur = 15\nkunci = True\n\nif umur >= 13 and kunci:\n    print(\"Boleh masuk ke ruang rahasia!\")\nelse:\n    print(\"Belum boleh masuk\")",
        story: "Kamu sampai di persimpangan jalan. Hanya dengan logika yang tepat kamu bisa memilih jalan yang benar!",
        badge: "⚖️ Logic Master",
        defaultCode: "umur = 15\nkunci = True\n\nif umur >= 13 and kunci:\n    print(\"Boleh masuk ke ruang rahasia!\")\nelse:\n    print(\"Belum boleh masuk\")",
        xpReward: 35,
        coinReward: 25,
        hints: [
            "Gunakan if untuk kondisi yang benar",
            "Gunakan else untuk kondisi lainnya",
            "Gunakan and/or untuk kombinasi kondisi"
        ]
    },
    5: {
        title: "🔁 Misi: Mengulang Tugas",
        desc: "Kamu harus mengumpulkan 5 koin emas! Gunakan perulangan untuk mengulang proses pengumpulan.",
        examples: "for i in range(5):\n    print(\"Mengumpulkan koin ke-\" + str(i+1))",
        story: "Di menara sihir, kamu harus melakukan ritual berulang kali untuk mendapatkan kekuatan baru!",
        badge: "🔄 Loop Champion",
        defaultCode: "for i in range(5):\n    print(\"Mengumpulkan koin ke-\" + str(i+1))",
        xpReward: 40,
        coinReward: 30,
        hints: [
            "Gunakan for untuk perulangan yang diketahui jumlahnya",
            "range(n) membuat urutan 0 sampai n-1",
            "Gunakan str() untuk menggabungkan angka dan teks"
        ]
    },
    6: {
        title: "⚙️ Misi: Membuat Blok Kode",
        desc: "Kamu adalah penyihir yang bisa membuat mantra! Setiap mantra adalah fungsi yang bisa digunakan berulang kali.",
        examples: "def sapa(nama):\n    print(\"Halo, \" + nama + \"! Selamat datang di petualangan!\")\n\nsapa(\"Andi\")\nsapa(\"Budi\")",
        story: "Kamu belajar membuat 'mantra' sihir yang bisa digunakan kapan saja - seperti fungsi dalam Python!",
        badge: "🔧 Function Wizard",
        defaultCode: "def sapa(nama):\n    print(\"Halo, \" + nama + \"! Selamat datang di petualangan!\")\n\nsapa(\"Andi\")\nsapa(\"Budi\")",
        xpReward: 45,
        coinReward: 35,
        hints: [
            "Gunakan def untuk membuat fungsi",
            "Gunakan parameter untuk input fungsi",
            "Panggil fungsi dengan nama_fungsi(parameter)"
        ]
    },
    7: {
        title: "📦 Misi: Koleksi Harta Karun",
        desc: "Kamu menemukan peti harta karun! Gunakan list untuk menyimpan koleksi item kamu.",
        examples: "item_koleksi = [\"pedang\", \"perisai\", \"ramuan\"]\nprint(\"Item pertama: \" + item_koleksi[0])\nprint(\"Total item: \" + str(len(item_koleksi)))",
        story: "Di dalam gua kuno, kamu menemukan koleksi item sihir. Kamu butuh cara untuk menyimpan dan mengatur koleksimu!",
        badge: "📦 List Master",
        defaultCode: "item_koleksi = [\"pedang\", \"perisai\", \"ramuan\"]\nprint(\"Item pertama: \" + item_koleksi[0])\nprint(\"Total item: \" + str(len(item_koleksi)))",
        xpReward: 50,
        coinReward: 40,
        hints: [
            "List ditulis dengan kurung siku []",
            "Item diakses dengan index [0], [1], [2], dst",
            "Gunakan len() untuk menghitung jumlah item"
        ]
    },
    8: {
        title: "📚 Misi: Kamus Sihir",
        desc: "Buat kamus sihir untuk menyimpan informasi tentang mantra dan kekuatannya!",
        examples: "mantra = {\"pelindung\": 50, \"serangan\": 80, \"penyembuhan\": 30}\nprint(\"Kekuatan mantra pelindung: \" + str(mantra[\"pelindung\"]))",
        story: "Kamu menemukan buku sihir kuno yang berisi kamus mantra. Setiap mantra memiliki kekuatan berbeda!",
        badge: "📚 Dictionary Wizard",
        defaultCode: "mantra = {\"pelindung\": 50, \"serangan\": 80, \"penyembuhan\": 30}\nprint(\"Kekuatan mantra pelindung: \" + str(mantra[\"pelindung\"]))",
        xpReward: 55,
        coinReward: 45,
        hints: [
            "Dictionary ditulis dengan kurung kurawal {}",
            "Setiap item punya key dan value: {\"key\": \"value\"}",
            "Akses nilai dengan nama key: dict[\"key\"]"
        ]
    },
    9: {
        title: "💾 Misi: Menyimpan Catatan Petualangan",
        desc: "Simpan catatan petualanganmu ke file agar tidak hilang!",
        examples: "# Membuat dan menulis file\ncatatan = open(\"catatan.txt\", \"w\")\ncatatan.write(\"Hari 1: Menemukan gua rahasia\\n\")\ncatatan.write(\"Hari 2: Belajar variabel\\n\")\ncatatan.close()\n\n# Membaca file\ncatatan = open(\"catatan.txt\", \"r\")\nprint(catatan.read())\ncatatan.close()",
        story: "Kamu ingin menyimpan semua catatan petualanganmu. Kamu belajar cara menyimpan data ke file!",
        badge: "💾 File Handler",
        defaultCode: "# Membuat dan menulis file\ncatatan = open(\"catatan.txt\", \"w\")\ncatatan.write(\"Hari 1: Menemukan gua rahasia\\n\")\ncatatan.write(\"Hari 2: Belajar variabel\\n\")\ncatatan.close()\n\n# Membaca file\ncatatan = open(\"catatan.txt\", \"r\")\nprint(catatan.read())\ncatatan.close()",
        xpReward: 60,
        coinReward: 50,
        hints: [
            "Gunakan open() untuk membuka file",
            "\"w\" untuk menulis, \"r\" untuk membaca",
            "Jangan lupa close() file setelah selesai"
        ]
    },
    10: {
        title: "🧙 Misi: Membuat Karakter Petualang",
        desc: "Buat karakter petualangmu sendiri dengan class dan object!",
        examples: "class Petualang:\n    def __init__(self, nama, hp, kekuatan):\n        self.nama = nama\n        self.hp = hp\n        self.kekuatan = kekuatan\n    \n    def serang(self, musuh):\n        print(self.nama + \" menyerang \" + musuh + \"!\")\n\n# Membuat karakter\nbudi = Petualang(\"Budi\", 100, 25)\nbudi.serang(\"Goblin\")",
        story: "Kamu belajar sihir tingkat tinggi - Object Oriented Programming! Sekarang kamu bisa membuat karakter dan kekuatan sendiri!",
        badge: "🧙 OOP Master",
        defaultCode: "class Petualang:\n    def __init__(self, nama, hp, kekuatan):\n        self.nama = nama\n        self.hp = hp\n        self.kekuatan = kekuatan\n    \n    def serang(self, musuh):\n        print(self.nama + \" menyerang \" + musuh + \"!\")\n\n# Membuat karakter\nbudi = Petualang(\"Budi\", 100, 25)\nbudi.serang(\"Goblin\")",
        xpReward: 65,
        coinReward: 60,
        hints: [
            "Gunakan class untuk membuat blueprint",
            "__init__ adalah constructor untuk inisialisasi",
            "self merujuk pada object itu sendiri"
        ]
    },
    11: {
        title: "🛡️ Misi: Penjaga Gerbang",
        desc: "Jadilah penjaga gerbang yang bijak! Gunakan try/except untuk menangani error saat ada input yang salah.",
        examples: "try:\n    angka = int(input(\"Masukkan angka: \"))\n    hasil = 100 / angka\n    print(\"Hasil: \" + str(hasil))\nexcept ValueError:\n    print(\"Error: Input bukan angka!\")\nexcept ZeroDivisionError:\n    print(\"Error: Tidak bisa dibagi dengan nol!\")\nexcept Exception as e:\n    print(\"Error tidak terduga: \" + str(e))",
        story: "Kamu diangkat menjadi penjaga gerbang kerajaan. Tugas kamu adalah memastikan hanya input yang valid yang bisa masuk!",
        badge: "🛡️ Error Handler",
        defaultCode: "# Contoh: Menangani error saat konversi tipe data\ntry:\n    # Coba kode yang berisiko error\n    angka = int(\"abc\")  # Ini akan error\n    print(\"Angka: \" + str(angka))\nexcept ValueError:\n    print(\"Error: Tidak bisa mengubah 'abc' menjadi angka!\")\n\n# Contoh: Menangani pembagian dengan nol\ntry:\n    hasil = 10 / 0\n    print(\"Hasil: \" + str(hasil))\nexcept ZeroDivisionError:\n    print(\"Error: Tidak bisa membagi dengan nol!\")",
        xpReward: 70,
        coinReward: 70,
        hints: [
            "Gunakan try untuk kode yang berisiko error",
            "Gunakan except untuk menangkap error spesifik",
            "Gunakan Exception as e untuk error umum",
            "finally selalu dijalankan, error atau tidak"
        ]
    }
};

// NPC Characters
const npcs = {
    mentor: {
        name: "Guru Sihir Python",
        role: "Mentor",
        dialogues: {
            greeting: "Selamat datang, muridku! Aku akan mengajarimu sihir Python yang kuat!",
            encouragement: "Hebat sekali! Teruslah belajar, kekuatan Python akan membantumu!",
            warning: "Hati-hati! Error adalah bagian dari perjalanan belajar. Jangan menyerah!",
            farewell: "Sampai jumpa di petualangan berikutnya, muridku!"
        }
    },
    companion: {
        name: "Kiko, Burung Hantu Bijak",
        role: "Teman",
        dialogues: {
            greeting: "Halo! Aku Kiko, teman setiamu dalam petualangan Python!",
            tip: "Psst... kalau bingung, coba gunakan tombol Hint! Aku selalu di sini membantumu!",
            celebration: "Wah, kamu hebat! Aku bangga padamu!",
            concern: "Kamu terlihat bingung... butuh bantuan?"
        }
    }
};

// Pyodide instance
let pyodide = null;

// Initialize Lessons
async function initLessons() {
    try {
        // Load Pyodide
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
        });
        
        console.log("Pyodide loaded successfully");
        
        // Load game data
        loadGameData();
        
        // Update UI
        updateProgressStats();
        loadLessons();
        
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        document.getElementById('lessons-container').innerHTML = 
            '<div class="empty-state"><p>❌ Error memuat Python Engine. Silakan refresh halaman.</p></div>';
    }
}

// Load Game Data from localStorage
function loadGameData() {
    const saved = localStorage.getItem('pythonAdventureLessons');
    if (saved) {
        try {
            gameData = JSON.parse(saved);
        } catch (e) {
            console.error("Error parsing game data:", e);
        }
    }
    
    // Ensure unlockedLessons always includes level 1
    if (!gameData.unlockedLessons.includes(1)) {
        gameData.unlockedLessons = [1];
    }
}

// Save Game Data to localStorage
function saveGameData() {
    localStorage.setItem('pythonAdventureLessons', JSON.stringify(gameData));
}

// Update Progress Statistics
function updateProgressStats() {
    document.getElementById('completed-lessons').textContent = gameData.completedLevels.length;
    document.getElementById('total-xp').textContent = gameData.xp;
    document.getElementById('collected-coins').textContent = gameData.coins;
    document.getElementById('earned-badges').textContent = gameData.badges.length;
}

// Show Progress Overview
function showProgressOverview() {
    alert(`📊 Kemajuan Belajarmu:\n\n` +
          `Level Selesai: ${gameData.completedLevels.length}/11\n` +
          `Total XP: ${gameData.xp}\n` +
          `Koin Terkumpul: ${gameData.coins}\n` +
          `Badge Diperoleh: ${gameData.badges.length}/11\n\n` +
          `Level saat ini: ${gameData.currentLevel}`);
}

// Load Lessons Grid
function loadLessons() {
    const container = document.getElementById('lessons-container');
    container.innerHTML = '';
    
    for (let i = 1; i <= 11; i++) {
        const lesson = lessons[i];
        const isUnlocked = gameData.unlockedLessons.includes(i);
        const isCompleted = gameData.completedLevels.includes(i);
        
        const lessonCard = document.createElement('div');
        lessonCard.className = `lesson-card ${isUnlocked ? '' : 'locked'} ${isCompleted ? 'completed' : ''}`;
        
        if (isUnlocked) {
            lessonCard.addEventListener('click', () => openLesson(i));
        }
        
        lessonCard.innerHTML = `
            <h3>${lesson.title}</h3>
            <p>${lesson.desc}</p>
            <div class="xp"> XP: ${lesson.xpReward} | Koin: ${lesson.coinReward}</div>
            ${lesson.badge ? `<div class="badge">${lesson.badge}</div>` : ''}
            ${isCompleted ? '<div style="color: #4CAF50; margin-top: 10px;">✅ Selesai</div>' : ''}
        `;
        
        container.appendChild(lessonCard);
    }
}

// Open Lesson in Modal
function openLesson(lessonNum) {
    const lesson = lessons[lessonNum];
    if (!lesson) return;
    
    const modal = document.createElement('div');
    modal.className = 'lesson-modal';
    modal.innerHTML = `
        <div class="lesson-content">
            <div class="lesson-header">
                <h2>📚 ${lesson.title}</h2>
                <button class="lesson-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
            </div>
            <div class="lesson-main">
                <div class="lesson-info-section">
                    <div class="lesson-section-title">📖 Cerita</div>
                    <div class="story-section">
                        <p>${lesson.story}</p>
                    </div>
                    
                    <div class="lesson-section-title">🎯 Misi</div>
                    <p>${lesson.desc}</p>
                    
                    <div class="lesson-section-title">💡 Contoh Kode</div>
                    <pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; overflow: auto;">${lesson.examples}</pre>
                    
                    <div class="lesson-section-title">_NPC Dialog_</div>
                    <div class="npc-dialogue">
                        <div class="npc-name">${npcs.mentor.name}</div>
                        <div id="npc-message">${npcs.mentor.dialogues.greeting}</div>
                    </div>
                </div>
                
                <div class="lesson-editor-section">
                    <div class="lesson-section-title">📝 Editor Kode</div>
                    <textarea id="lesson-editor" spellcheck="false">${lesson.defaultCode}</textarea>
                    <div class="lesson-section-title">📤 Output</div>
                    <div id="lesson-output">🎮 Output akan muncul di sini...</div>
                    <div class="lesson-toolbar">
                        <button onclick="runLessonCode(${lessonNum})" id="run-lesson-btn">🚀 Jalankan (Ctrl+Enter)</button>
                        <button onclick="showLessonHint(${lessonNum})">💡 Hint</button>
                        <button onclick="resetLessonCode(${lessonNum})">🔄 Reset</button>
                        <button onclick="completeLesson(${lessonNum})" id="complete-btn" style="display: none;">✅ Selesaikan Level</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup keyboard shortcuts
    modal.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runLessonCode(lessonNum);
        }
    });
    
    // Focus to editor
    setTimeout(() => {
        document.getElementById('lesson-editor').focus();
    }, 100);
}

// Run Lesson Code
async function runLessonCode(lessonNum) {
    const code = document.getElementById("lesson-editor").value;
    const output = document.getElementById("lesson-output");
    const runBtn = document.getElementById("run-lesson-btn");
    
    runBtn.disabled = true;
    runBtn.textContent = "⏳ Menjalankan...";
    output.innerHTML = "🎮 Menjalankan kode...";
    output.className = ""; // Reset error class
    
    try {
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
        
        // Show completion button
        document.getElementById('complete-btn').style.display = 'inline-block';
        
    } catch (error) {
        output.innerHTML = "❌ Error:\n" + error.message;
        output.className = "error-output";
    } finally {
        runBtn.disabled = false;
        runBtn.textContent = "🚀 Jalankan (Ctrl+Enter)";
    }
}

// Show Lesson Hint
function showLessonHint(lessonNum) {
    const lesson = lessons[lessonNum];
    if (lesson && lesson.hints) {
        const randomHint = lesson.hints[Math.floor(Math.random() * lesson.hints.length)];
        alert("💡 Petunjuk:\n" + randomHint);
    }
}

// Reset Lesson Code
function resetLessonCode(lessonNum) {
    const lesson = lessons[lessonNum];
    if (lesson) {
        document.getElementById('lesson-editor').value = lesson.defaultCode;
        document.getElementById('lesson-output').innerHTML = "🎮 Output akan muncul di sini...";
        document.getElementById('complete-btn').style.display = 'none';
    }
}

// Complete Lesson
function completeLesson(lessonNum) {
    const lesson = lessons[lessonNum];
    if (!lesson) return;
    
    // Give rewards
    gameData.xp += lesson.xpReward;
    gameData.coins += lesson.coinReward;
    
    // Add badge if available
    if (lesson.badge && !gameData.badges.includes(lesson.badge)) {
        gameData.badges.push(lesson.badge);
    }
    
    // Mark as completed
    if (!gameData.completedLevels.includes(lessonNum)) {
        gameData.completedLevels.push(lessonNum);
    }
    
    // Unlock next lesson
    const nextLesson = lessonNum + 1;
    if (nextLesson <= 11 && !gameData.unlockedLessons.includes(nextLesson)) {
        gameData.unlockedLessons.push(nextLesson);
    }
    
    // Update current level
    if (lessonNum > gameData.currentLevel) {
        gameData.currentLevel = lessonNum;
    }
    
    // Save and update UI
    saveGameData();
    updateProgressStats();
    loadLessons();
    
    // Close modal
    document.querySelector('.lesson-modal')?.remove();
    
    // Show completion message
    alert(`🎉 Selamat! Kamu telah menyelesaikan ${lesson.title}\n\n` +
          `🏆 XP: +${lesson.xpReward}\n` +
          `🪙 Koin: +${lesson.coinReward}\n` +
          `${lesson.badge ? `🏅 Badge: ${lesson.badge}\n` : ''}` +
          `Level berikutnya (${nextLesson}) telah terbuka!`);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initLessons);