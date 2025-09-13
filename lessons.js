// lessons.js - Logika Pelajaran (v4.0.0)

let gameData = {
    currentLevel: 1,
    xp: 0,
    badges: [],
    completedLevels: [],
    coins: 0,
    unlockedLessons: [1],
    playerName: "Petualang Python"
};

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
        desc: "Kamu menemukan peti harta karun! Tapi kunci hanya bisa dibuka dengan tipe data yang tepat.",
        examples: "umur = 15\ntinggi = 170.5\nnama = \"Andi\"\nprint(type(umur))\nprint(type(tinggi))\nprint(type(nama))",
        story: "Di perpustakaan kuno, kamu belajar tentang 'tipe data' - jenis-jenis nilai yang bisa disimpan!",
        badge: "🕵️ Tipe Data Detective",
        defaultCode: "umur = 15\ntinggi = 170.5\nnama = \"Andi\"\nprint(type(umur))\nprint(type(tinggi))\nprint(type(nama))",
        xpReward: 25,
        coinReward: 15,
        hints: [
            "int untuk bilangan bulat",
            "float untuk bilangan desimal",
            "str untuk teks",
            "Gunakan type() untuk memeriksa tipe data"
        ]
    },
    3: {
        title: "🧮 Misi: Ahli Matematika",
        desc: "Kamu harus menghitung total koin yang kamu kumpulkan dari berbagai sumber.",
        examples: "koin_dari_misi = 20\nkoin_dari_quiz = 15\ntotal_koin = koin_dari_misi + koin_dari_quiz\nprint(\"Total koin: \" + str(total_koin))",
        story: "Di menara penghitung, kamu belajar tentang operator matematika untuk menggabungkan dan menghitung nilai!",
        badge: "🧮 Math Wizard",
        defaultCode: "koin_dari_misi = 20\nkoin_dari_quiz = 15\ntotal_koin = koin_dari_misi + koin_dari_quiz\nprint(\"Total koin: \" + str(total_koin))",
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
        examples: "umur = 15\nkunci = True\nif umur >= 13 and kunci:\n    print(\"Boleh masuk ke ruang rahasia!\")\nelse:\n    print(\"Belum boleh masuk\")",
        story: "Kamu sampai di persimpangan jalan. Hanya dengan logika yang tepat kamu bisa memilih jalan yang benar!",
        badge: "⚖️ Logic Master",
        defaultCode: "umur = 15\nkunci = True\nif umur >= 13 and kunci:\n    print(\"Boleh masuk ke ruang rahasia!\")\nelse:\n    print(\"Belum boleh masuk\")",
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
        desc: "Kamu adalah penyihir yang bisa membuat mantra! Gunakan fungsi untuk membuat blok kode yang bisa digunakan berulang.",
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
            "Gunakan kurung siku [] untuk membuat list",
            "Akses item dengan indeks, misalnya list[0]",
            "Gunakan len() untuk menghitung jumlah item"
        ]
    },
    8: {
        title: "📖 Misi: Kamus Sihir",
        desc: "Kamu menemukan buku sihir kuno yang berisi kamus mantra. Setiap mantra memiliki kekuatan berbeda!",
        examples: "kamus_sihir = {\"bola_api\": \"Menyerang musuh dengan bola api\", \"penyembuhan\": \"Mengembalikan HP\"}\nprint(kamus_sihir[\"bola_api\"])\nkamus_sihir[\"teleportasi\"] = \"Berpindah ke lokasi lain\"\nprint(kamus_sihir)",
        story: "Di perpustakaan rahasia, kamu belajar tentang 'dictionary' - cara menyimpan pasangan kunci dan nilai!",
        badge: "📖 Dictionary Sage",
        defaultCode: "kamus_sihir = {\"bola_api\": \"Menyerang musuh dengan bola api\", \"penyembuhan\": \"Mengembalikan HP\"}\nprint(kamus_sihir[\"bola_api\"])\nkamus_sihir[\"teleportasi\"] = \"Berpindah ke lokasi lain\"\nprint(kamus_sihir)",
        xpReward: 55,
        coinReward: 45,
        hints: [
            "Gunakan kurung kurawal {} untuk membuat dictionary",
            "Akses nilai dengan kunci, misalnya dict[\"kunci\"]",
            "Tambahkan pasangan baru dengan dict[\"kunci_baru\"] = \"nilai_baru\""
        ]
    },
    9: {
        title: "💾 Misi: Menyimpan Catatan",
        desc: "Kamu ingin menyimpan semua catatan petualanganmu. Kamu belajar cara menyimpan data ke file!",
        examples: "# Menulis ke file\ndengan_catatan = open(\"catatan.txt\", \"w\")\ndengan_catatan.write(\"Hari ini aku belajar Python!\\n\")\ndengan_catatan.close()\n\n# Membaca file\ndengan_catatan = open(\"catatan.txt\", \"r\")\nisi = dengan_catatan.read()\nprint(isi)\ndengan_catatan.close()",
        story: "Kamu belajar cara menyimpan dan memuat data dari file agar tidak hilang!",
        badge: "💾 File Keeper",
        defaultCode: "# Menulis ke file\ndengan_catatan = open(\"catatan.txt\", \"w\")\ndengan_catatan.write(\"Hari ini aku belajar Python!\\n\")\ndengan_catatan.close()\n\n# Membaca file\ndengan_catatan = open(\"catatan.txt\", \"r\")\nisi = dengan_catatan.read()\nprint(isi)\ndengan_catatan.close()",
        xpReward: 60,
        coinReward: 50,
        hints: [
            "Gunakan open(\"nama_file\", \"mode\") untuk membuka file",
            "\"w\" untuk menulis (overwrite), \"r\" untuk membaca",
            "Jangan lupa untuk menutup file dengan close()"
        ]
    },
    10: {
        title: "🧙 Misi: Membuat Karakter (OOP Dasar)",
        desc: "Kamu belajar sihir tingkat tinggi - Object Oriented Programming! Sekarang kamu bisa membuat karakter dan kekuatan sendiri!",
        examples: "class Petualang:\n    def __init__(self, nama, hp):\n        self.nama = nama\n        self.hp = hp\n    \n    def serang(self):\n        print(self.nama + \" menyerang dengan kekuatan besar!\")\n\npemain = Petualang(\"Arya\", 100)\npemain.serang()",
        story: "Kamu menguasai ilmu untuk menciptakan objek dan kelas - dasar dari pemrograman berorientasi objek!",
        badge: "🧙 OOP Novice",
        defaultCode: "class Petualang:\n    def __init__(self, nama, hp):\n        self.nama = nama\n        self.hp = hp\n    \n    def serang(self):\n        print(self.nama + \" menyerang dengan kekuatan besar!\")\n\npemain = Petualang(\"Arya\", 100)\npemain.serang()",
        xpReward: 65,
        coinReward: 55,
        hints: [
            "Gunakan class untuk mendefinisikan blueprint objek",
            "__init__ adalah fungsi khusus untuk inisialisasi",
            "self merujuk pada instance objek itu sendiri"
        ]
    },
    11: {
        title: "🛡️ Misi: Penjaga Gerbang (Exception Handling)",
        desc: "Kamu diangkat menjadi penjaga gerbang kerajaan. Tugas kamu adalah memastikan hanya input yang valid yang bisa masuk!",
        examples: "try:\n    umur = int(input(\"Masukkan umur kamu: \"))\n    if umur >= 13:\n        print(\"Boleh masuk!\")\n    else:\n        print(\"Belum boleh masuk\")\nexcept ValueError:\n    print(\"Input tidak valid! Harap masukkan angka.\")",
        story: "Kamu belajar cara menangani kesalahan (error) dengan anggun agar program tidak berhenti mendadak!",
        badge: "🛡️ Error Guardian",
        defaultCode: "try:\n    umur = int(input(\"Masukkan umur kamu: \"))\n    if umur >= 13:\n        print(\"Boleh masuk!\")\n    else:\n        print(\"Belum boleh masuk\")\nexcept ValueError:\n    print(\"Input tidak valid! Harap masukkan angka.\")",
        xpReward: 70,
        coinReward: 60,
        hints: [
            "Gunakan try untuk mencoba blok kode yang berisiko error",
            "Gunakan except untuk menangkap dan menangani error tertentu",
            "ValueError terjadi saat konversi tipe data gagal"
        ]
    },
    12: {
        title: "📊 Misi: Analis Data (Pandas Dasar)",
        desc: "Kamu menjadi analis data kerajaan! Gunakan pandas untuk menganalisis data penjualan barang sihir.",
        examples: "import pandas as pd\n\n# Membuat DataFrame\ndata = {\n    'Barang': ['Elixir', 'Mantra', 'Ramuan'],\n    'Penjualan': [120, 85, 150]\n}\ndf = pd.DataFrame(data)\nprint(df)\nprint(df['Penjualan'].sum()) # Total penjualan",
        story: "Kamu belajar menggunakan library pandas untuk bekerja dengan data dalam bentuk tabel.",
        badge: "📊 Data Analyst",
        defaultCode: "import pandas as pd\n\n# Membuat DataFrame\ndata = {\n    'Barang': ['Elixir', 'Mantra', 'Ramuan'],\n    'Penjualan': [120, 85, 150]\n}\ndf = pd.DataFrame(data)\nprint(df)\nprint(df['Penjualan'].sum()) # Total penjualan",
        xpReward: 75,
        coinReward: 65,
        hints: [
            "Impor pandas dengan import pandas as pd",
            "Gunakan pd.DataFrame(data) untuk membuat tabel data",
            "Akses kolom dengan df['NamaKolom']"
        ]
    },
    13: {
        title: "📈 Misi: Visualisasi (Matplotlib Dasar)",
        desc: "Buat grafik untuk menunjukkan perkembangan kekuatan sihir kamu!",
        examples: "import matplotlib.pyplot as plt\n\nhari = [1, 2, 3, 4, 5]\nkekuatan = [10, 25, 40, 60, 85]\n\nplt.plot(hari, kekuatan)\nplt.title('Perkembangan Kekuatan Sihir')\nplt.xlabel('Hari')\nplt.ylabel('Kekuatan')\nplt.show()",
        story: "Kamu belajar membuat grafik dan visualisasi data menggunakan matplotlib.",
        badge: "📈 Visualization Expert",
        defaultCode: "import matplotlib.pyplot as plt\n\nhari = [1, 2, 3, 4, 5]\nkekuatan = [10, 25, 40, 60, 85]\n\nplt.plot(hari, kekuatan)\nplt.title('Perkembangan Kekuatan Sihir')\nplt.xlabel('Hari')\nplt.ylabel('Kekuatan')\nplt.show()",
        xpReward: 80,
        coinReward: 70,
        hints: [
            "Impor matplotlib.pyplot dengan import matplotlib.pyplot as plt",
            "Gunakan plt.plot(x, y) untuk membuat grafik garis",
            "Gunakan plt.show() untuk menampilkan grafik"
        ]
    },
    14: {
        title: "🌐 Misi: Permintaan Web (Requests Dasar)",
        desc: "Kamu belajar cara mengambil data dari API cuaca sihir untuk merencanakan petualangan.",
        examples: "import requests\n\n# Catatan: Ini hanya simulasi, karena kita tidak punya akses ke API sungguhan di sini.\n# Dalam dunia nyata, kamu akan menggunakan URL API yang sebenarnya.\n\n# Simulasi respons API\nrespons = \"{\\\"cuaca\\\": \\\"cerah\\\", \\\"suhu\\\": \\\"25C\\\"}\"\nprint(\"Data cuaca (simulasi):\", respons)\n\n# Jika ada API sungguhan:\n# url = \"https://api.cuaca-sihir.com/data\"\n# respons = requests.get(url)\n# data = respons.json()\n# print(data['cuaca'])",
        story: "Kamu belajar berinteraksi dengan layanan web menggunakan library requests.",
        badge: "🌐 Web Explorer",
        defaultCode: "import requests\n\n# Catatan: Ini hanya simulasi, karena kita tidak punya akses ke API sungguhan di sini.\n# Dalam dunia nyata, kamu akan menggunakan URL API yang sebenarnya.\n\n# Simulasi respons API\nrespons = \"{\\\"cuaca\\\": \\\"cerah\\\", \\\"suhu\\\": \\\"25C\\\"}\"\nprint(\"Data cuaca (simulasi):\", respons)\n\n# Jika ada API sungguhan:\n# url = \"https://api.cuaca-sihir.com/data\"\n# respons = requests.get(url)\n# data = respons.json()\n# print(data['cuaca'])",
        xpReward: 85,
        coinReward: 75,
        hints: [
            "Impor requests dengan import requests",
            "Gunakan requests.get(url) untuk mengambil data dari URL",
            "Gunakan .json() pada objek respons untuk mengubahnya jadi dictionary"
        ]
    },
    15: {
        title: "🧮 Misi: Matematika Simbolik (SymPy Dasar)",
        desc: "Selesaikan persamaan matematika simbolik seperti seorang penyihir matematika!",
        examples: "import sympy as sp\n\n# Mendefinisikan simbol\nx = sp.Symbol('x')\n\n# Mendefinisikan persamaan\npersamaan = x**2 - 5*x + 6\n\n# Memecahkan persamaan\nsolusi = sp.solve(persamaan, x)\nprint(\"Solusi dari persamaan x^2 - 5x + 6 = 0 adalah:\", solusi)\n\n# Menyederhanakan ekspresi\nekspresi = (x**2 - 1) / (x - 1)\ndisederhanakan = sp.simplify(ekspresi)\nprint(\"(x^2 - 1) / (x - 1) disederhanakan menjadi:\", disederhanakan)",
        story: "Kamu menguasai seni matematika simbolik dengan SymPy, memecahkan persamaan seperti ahli matematika.",
        badge: "🧮 Symbolic Math Master",
        defaultCode: "import sympy as sp\n\n# Mendefinisikan simbol\nx = sp.Symbol('x')\n\n# Mendefinisikan persamaan\npersamaan = x**2 - 5*x + 6\n\n# Memecahkan persamaan\nsolusi = sp.solve(persamaan, x)\nprint(\"Solusi dari persamaan x^2 - 5x + 6 = 0 adalah:\", solusi)\n\n# Menyederhanakan ekspresi\nekspresi = (x**2 - 1) / (x - 1)\ndisederhanakan = sp.simplify(ekspresi)\nprint(\"(x^2 - 1) / (x - 1) disederhanakan menjadi:\", disederhanakan)",
        xpReward: 90,
        coinReward: 80,
        hints: [
            "Impor sympy dengan import sympy as sp",
            "Gunakan sp.Symbol('x') untuk membuat simbol",
            "Gunakan sp.solve(persamaan, simbol) untuk memecahkan persamaan"
        ]
    }
};

const npcs = {
    mentor: {
        name: "Guru Python",
        role: "Mentor",
        dialogues: {
            greeting: "Selamat datang, muridku! Aku Guru Python, pendampingmu dalam perjalanan belajar ini!",
            tip: "Jika bingung, coba pecahkan masalah menjadi langkah-langkah kecil. Aku yakin kamu bisa!",
            celebration: "Luar biasa! Kamu telah menguasai sihir Python dengan baik!",
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
            concern: "Kamu terlihat bingung... butuh bantuan?",
            farewell: "Jangan lupa berlatih setiap hari, ya!"
        }
    },
    enemy: {
        name: "Goblin Error",
        role: "Musuh",
        dialogues: {
            challenge: "Hahaha! Aku Goblin Error! Aku akan mengacaukan kodemu!",
            defeated: "Aaaargh! Kekuatan Python telah mengalahkanku!",
            escape: "Kali ini aku kabur, tapi aku akan kembali!"
        }
    }
};

let pyodide = null;

async function initLessons() {
    try {
        console.log("Memulai inisialisasi pelajaran...");
        
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/"
        });
        
        console.log("Pyodide berhasil dimuat.");
        
        loadGameData();
        updateProgressStats();
        loadLessons();
        
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        document.getElementById('lessons-container').innerHTML = 
            '<div class="empty-state section-card"><p>❌ Error memuat Python Engine. Silakan refresh halaman.</p></div>';
    }
}

function loadGameData() {
    const saved = localStorage.getItem('pythonAdventure');
    if (saved) {
        try {
            const parsedData = JSON.parse(saved);
            gameData = { ...gameData, ...parsedData };
            console.log("Data permainan dimuat:", gameData);
        } catch (e) {
            console.error("Error parsing game ", e);
        }
    }
}

function saveGameData() {
    localStorage.setItem('pythonAdventure', JSON.stringify(gameData));
    console.log("Data permainan disimpan.");
}

function updateProgressStats() {
    document.getElementById('completed-lessons').textContent = gameData.completedLevels.length;
    document.getElementById('total-xp').textContent = gameData.xp;
    document.getElementById('collected-coins').textContent = gameData.coins;
    document.getElementById('earned-badges').textContent = gameData.badges.length;
    
    console.log("Statistik progress diperbarui.");
}

function showProgressOverview() {
    alert(`📊 Kemajuan Belajarmu:\n\n` +
          `Level Selesai: ${gameData.completedLevels.length}\n` +
          `Total XP: ${gameData.xp}\n` +
          `Koin Terkumpul: ${gameData.coins}\n` +
          `Badge Diperoleh: ${gameData.badges.length}`);
}

function loadLessons() {
    const container = document.getElementById('lessons-container');
    container.innerHTML = '';

    for (let i = 1; i <= 15; i++) {
        const lesson = lessons[i];
        if (!lesson) {
            console.warn(`Lesson ${i} tidak ditemukan.`);
            continue;
        }

        const isUnlocked = gameData.unlockedLessons.includes(i);
        const isCompleted = gameData.completedLevels.includes(i);

        const lessonCard = document.createElement('div');
        lessonCard.className = `card lesson-card ${isUnlocked ? '' : 'locked'} ${isCompleted ? 'completed' : ''}`;
        
        if (isUnlocked) {
            lessonCard.addEventListener('click', () => openLesson(i));
        }

        lessonCard.innerHTML = `
            <h3>${lesson.title}</h3>
            <p>${lesson.desc}</p>
            <div class="xp"> XP: ${lesson.xpReward} | Koin: ${lesson.coinReward}</div>
            ${lesson.badge ? `<div class="badge">${lesson.badge}</div>` : ''}
            ${isCompleted ? '<div style="color: var(--color-primary); margin-top: 10px; font-weight: bold;">✅ Selesai</div>' : ''}
        `;
        
        container.appendChild(lessonCard);
    }
    
    console.log("Daftar pelajaran dimuat.");
}

function openLesson(lessonNum) {
    const lesson = lessons[lessonNum];
    if (!lesson) {
        console.error(`Lesson ${lessonNum} tidak ditemukan.`);
        return;
    }

    const npc = npcs.mentor;

    const modal = document.createElement('div');
    modal.className = 'lesson-modal';
    modal.innerHTML = `
        <div class="lesson-content">
            <button class="lesson-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <div class="lesson-header">
                <h2>📚 ${lesson.title}</h2>
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
                    <pre style="background: #f8f9fa; padding: 15px; border-radius: 10px; overflow: auto; border: 1px solid var(--color-border);"><code>${lesson.examples}</code></pre>
                    
                    <div class="lesson-section-title">🧙 NPC</div>
                    <div class="npc-dialogue">
                        <div class="npc-name">${npc.name}</div>
                        <div id="npc-message">${npc.dialogues.greeting}</div>
                    </div>
                </div>
                
                <div class="lesson-editor-section">
                    <div class="lesson-section-title">📝 Editor Kode</div>
                    <textarea id="lesson-editor" spellcheck="false">${lesson.defaultCode}</textarea>
                    
                    <div class="lesson-section-title">📤 Output</div>
                    <div id="lesson-output">🎮 Output akan muncul di sini...</div>
                    
                    <div class="lesson-toolbar">
                        <button onclick="runLessonCode(${lessonNum})" id="run-lesson-btn" class="btn-primary">🚀 Jalankan (Ctrl+Enter)</button>
                        <button onclick="showLessonHint(${lessonNum})" class="btn-secondary">💡 Hint</button>
                        <button onclick="resetLessonCode(${lessonNum})" class="btn-small">🔄 Reset</button>
                        <button onclick="completeLesson(${lessonNum})" id="complete-btn" style="display: none;" class="btn-primary">✅ Selesaikan Level</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runLessonCode(lessonNum);
        }
    });
    
    setTimeout(() => {
        document.getElementById('lesson-editor').focus();
    }, 100);
    
    console.log(`Lesson ${lessonNum} dibuka di modal.`);
}

async function runLessonCode(lessonNum) {
    if (!pyodide) {
        console.warn("Pyodide belum dimuat.");
        await initLessons();
        if (!pyodide) return;
    }

    const code = document.getElementById("lesson-editor").value;
    const output = document.getElementById("lesson-output");
    const runBtn = document.getElementById("run-lesson-btn");
    
    console.log("Menjalankan kode pelajaran...");
    
    runBtn.disabled = true;
    runBtn.textContent = "⏳ Menjalankan...";
    output.innerHTML = "🎮 Menjalankan kode...";
    output.className = "";

    try {
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
        
        await pyodide.runPythonAsync(code);
        
        const capturedOutput = pyodide.globals.get('sys').stdout.buffer;
        
        if (capturedOutput && capturedOutput.length > 0) {
            output.innerHTML = "✅ " + capturedOutput;
        } else {
            output.innerHTML = "ℹ️ Kode dijalankan tanpa output";
        }
        
        console.log("Kode pelajaran berhasil dijalankan.");
        
    } catch (error) {
        console.error("Error saat menjalankan kode pelajaran:", error);
        output.innerHTML = "❌ Error:\n" + error.message;
        output.className = "error-output";
    } finally {
        runBtn.disabled = false;
        runBtn.textContent = "🚀 Jalankan (Ctrl+Enter)";
    }
}

function showLessonHint(lessonNum) {
    const lesson = lessons[lessonNum];
    if (lesson && lesson.hints) {
        const randomHint = lesson.hints[Math.floor(Math.random() * lesson.hints.length)];
        alert("💡 Petunjuk:\n" + randomHint);
        console.log(`Hint untuk lesson ${lessonNum} ditampilkan.`);
    }
}

function resetLessonCode(lessonNum) {
    const lesson = lessons[lessonNum];
    if (lesson) {
        document.getElementById('lesson-editor').value = lesson.defaultCode;
        document.getElementById('lesson-output').innerHTML = "🎮 Output akan muncul di sini...";
        document.getElementById('complete-btn').style.display = 'none';
        console.log(`Kode lesson ${lessonNum} direset.`);
    }
}

function completeLesson(lessonNum) {
    const lesson = lessons[lessonNum];
    if (!lesson) {
        console.error(`Lesson ${lessonNum} tidak ditemukan saat menyelesaikan.`);
        return;
    }

    gameData.xp += lesson.xpReward;
    gameData.coins += lesson.coinReward;

    if (lesson.badge && !gameData.badges.includes(lesson.badge)) {
        gameData.badges.push(lesson.badge);
        console.log(`Badge "${lesson.badge}" diperoleh.`);
    }

    if (!gameData.completedLevels.includes(lessonNum)) {
        gameData.completedLevels.push(lessonNum);
        console.log(`Lesson ${lessonNum} ditandai sebagai selesai.`);
    }

    const nextLesson = lessonNum + 1;
    if (nextLesson <= 15 && !gameData.unlockedLessons.includes(nextLesson)) {
        gameData.unlockedLessons.push(nextLesson);
        console.log(`Lesson ${nextLesson} dibuka.`);
    }

    if (lessonNum > gameData.currentLevel) {
        gameData.currentLevel = lessonNum;
        console.log(`Level saat ini diperbarui menjadi ${lessonNum}.`);
    }

    saveGameData();
    updateProgressStats();
    loadLessons();

    document.querySelector('.lesson-modal')?.remove();
    
    const message = `🎉 Selamat! Kamu telah menyelesaikan ${lesson.title}\n\n` +
                    `🏆 XP: +${lesson.xpReward}\n` +
                    `🪙 Koin: +${lesson.coinReward}\n` +
                    `${lesson.badge ? `🏅 Badge: ${lesson.badge}\n` : ''}` +
                    `Level berikutnya (${nextLesson}) telah terbuka!`;
    alert(message);
    
    console.log(`Lesson ${lessonNum} diselesaikan.`);
}

document.addEventListener('DOMContentLoaded', initLessons);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.lesson-modal');
        modals.forEach(modal => modal.remove());
    }
});