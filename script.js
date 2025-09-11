/*
 * Python Adventure Game
 * Copyright (c) 2025 Irkham
 * MIT License
 */
// Data Game
const gameData = {
    currentLevel: 1,
    xp: 0,
    badges: [],
    achievements: [],
    completedLevels: [],
    playerName: "Petualang Python",
    codeHistory: {},
    darkMode: false,
    // Sistem koin & kosmetik
    coins: 0,
    currentOutfit: "default",
    currentTheme: "default",
    currentEffect: "default",
    unlockedCosmetics: {
        outfits: ["default"],
        themes: ["default"],
        effects: ["default"]
    },
    // Sistem cerita
    storyProgress: {
        currentChapter: 1,
        chaptersCompleted: [],
        npcRelationships: {
            mentor: 0,
            companion: 0,
            enemy: 0
        }
    }
};
// Sistem Kosmetik
const cosmetics = {
    // Avatar Outfits
    outfits: {
        default: { name: "Penjelajah Biasa", price: 0, unlocked: true },
        wizard: { name: "Penyihir Muda", price: 50, unlocked: false, requirement: "Level 3" },
        knight: { name: "Kesatria Berani", price: 75, unlocked: false, requirement: "Level 5" },
        archer: { name: "Pemanah Lincah", price: 100, unlocked: false, requirement: "Level 7" },
        dragon: { name: "Penjinak Naga", price: 200, unlocked: false, requirement: "Level 10" }
    },
    // Theme Editor
    themes: {
        default: { name: "Tema Biasa", price: 0, unlocked: true },
        dark: { name: "Tema Gelap Mistis", price: 30, unlocked: false, requirement: "Level 2" },
        forest: { name: "Tema Hutan Ajaib", price: 40, unlocked: false, requirement: "Level 4" },
        fire: { name: "Tema Api Menyala", price: 60, unlocked: false, requirement: "Level 6" },
        crystal: { name: "Tema Kristal Sihir", price: 100, unlocked: false, requirement: "Level 8" }
    },
    // Effects
    effects: {
        default: { name: "Efek Biasa", price: 0, unlocked: true },
        sparkle: { name: "Efek Berkilau", price: 25, unlocked: false, requirement: "Level 3" },
        firework: { name: "Efek Kembang Api", price: 50, unlocked: false, requirement: "Level 6" },
        magic: { name: "Efek Sihir Ungu", price: 75, unlocked: false, requirement: "Level 9" }
    }
};
// Sistem Cerita & Karakter
const story = {
    // Karakter utama
    player: {
        name: "Petualang Python",
        level: 1,
        title: "Pemula"
    },
    // Karakter NPC
    npcs: {
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
    },
    // Cerita utama per level
    chapter: {
        1: {
            title: "Awal Petualangan",
            intro: "Kamu menemukan sebuah gua rahasia. Di dindingnya tertulis tentang 'variabel' - tempat menyimpan nilai!",
            mission: "Karakter kamu butuh nama supaya bisa dikenali. Gunakan variabel untuk menyimpan namanya!",
            reward: "Kamu mendapatkan pengetahuan dasar tentang variabel dan 10 koin emas!",
            npc: "mentor"
        },
        2: {
            title: "Detektif Tipe Data",
            intro: "Setelah memahami variabel, kamu menemukan buku sihir tentang berbagai 'tipe data' yang bisa disimpan!",
            mission: "Kamu adalah detektif yang harus mengidentifikasi tipe data dari berbagai nilai.",
            reward: "Kamu menjadi ahli dalam mengenali tipe data dan mendapatkan 15 koin emas!",
            npc: "companion"
        },
        3: {
            title: "Harta Karun Matematika",
            intro: "Di hutan ajaib, kamu menemukan peti harta karun yang membutuhkan kemampuan matematika untuk dibuka!",
            mission: "Gunakan operasi matematika untuk menghitung total koinmu.",
            reward: "Kamu menguasai operasi matematika dasar dan mendapatkan 20 koin emas!",
            npc: "mentor"
        },
        4: {
            title: "Persimpangan Logika",
            intro: "Kamu sampai di persimpangan jalan. Hanya dengan logika yang tepat kamu bisa memilih jalan yang benar!",
            mission: "Gunakan kondisi untuk memutuskan jalan yang harus diambil.",
            reward: "Kamu menguasai logika kondisi dan mendapatkan 25 koin emas!",
            npc: "companion"
        },
        5: {
            title: "Menara Perulangan",
            intro: "Di menara sihir, kamu harus melakukan ritual berulang kali untuk mendapatkan kekuatan baru!",
            mission: "Gunakan perulangan untuk mengulang proses pengumpulan koin.",
            reward: "Kamu menguasai kekuatan perulangan dan mendapatkan 30 koin emas!",
            npc: "mentor"
        },
        6: {
            title: "Mantra Fungsi",
            intro: "Kamu belajar membuat 'mantra' sihir yang bisa digunakan kapan saja - seperti fungsi dalam Python!",
            mission: "Buat mantra (fungsi) yang bisa digunakan berulang kali.",
            reward: "Kamu menguasai seni membuat fungsi dan mendapatkan 35 koin emas!",
            npc: "companion"
        },
        7: {
            title: "Koleksi Harta Karun",
            intro: "Di dalam gua kuno, kamu menemukan koleksi item sihir. Kamu butuh cara untuk menyimpan dan mengatur koleksimu!",
            mission: "Gunakan list untuk menyimpan koleksi item kamu.",
            reward: "Kamu menguasai seni menyimpan koleksi dan mendapatkan 40 koin emas!",
            npc: "mentor"
        },
        8: {
            title: "Kamus Sihir",
            intro: "Kamu menemukan buku sihir kuno yang berisi kamus mantra. Setiap mantra memiliki kekuatan berbeda!",
            mission: "Buat kamus sihir untuk menyimpan informasi tentang mantra dan kekuatannya!",
            reward: "Kamu menguasai kamus sihir dan mendapatkan 45 koin emas!",
            npc: "companion"
        },
        9: {
            title: "Catatan Petualangan",
            intro: "Kamu ingin menyimpan semua catatan petualanganmu. Kamu belajar cara menyimpan data ke file!",
            mission: "Simpan catatan petualanganmu ke file agar tidak hilang!",
            reward: "Kamu menguasai penyimpanan data dan mendapatkan 50 koin emas!",
            npc: "mentor"
        },
        10: {
            title: "Panggilan Takdir",
            intro: "Kamu belajar sihir tingkat tinggi - Object Oriented Programming! Sekarang kamu bisa membuat karakter dan kekuatan sendiri!",
            mission: "Buat karakter petualangmu sendiri dengan class dan object!",
            reward: "Kamu menguasai sihir OOP dan mendapatkan 60 koin emas!",
            npc: "mentor"
        },
        11: {
            title: "Penjaga Gerbang",
            intro: "Kamu diangkat menjadi penjaga gerbang kerajaan. Tugas kamu adalah memastikan hanya input yang valid yang bisa masuk!",
            mission: "Gunakan try/except untuk menangani error saat ada input yang salah.",
            reward: "Kamu menjadi penjaga gerbang yang bijak dan mendapatkan 70 koin emas!",
            npc: "mentor"
        }
    }
};
// Level Definitions (1-11)
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
        examples: "koin_level1 = 25\nkoin_level2 = 30\nbonus = 10\ntotal = koin_level1 + koin_level2 + bonus\nprint(\"Total koin: \" + str(total))",
        story: "Di hutan ajaib, kamu menemukan peti harta karun yang membutuhkan kemampuan matematika untuk dibuka!",
        badge: "🧮 Math Wizard",
        defaultCode: "koin_level1 = 25\nkoin_level2 = 30\nbonus = 10\ntotal = koin_level1 + koin_level2 + bonus\nprint(\"Total koin: \" + str(total))",
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
        examples: "umur = 15\nkunci = True\nif umur >= 13 and kunci:\n    print(\"Boleh masuk ke ruang rahasia!\")\nelse:\n    print(\"Belum boleh masuk\")",
        story: "Kamu sampai di persimpangan jalan. Hanya dengan logika yang tepat kamu bisa memilih jalan yang benar!",
        badge: "⚖️ Logic Master",
        defaultCode: "umur = 15\nkunci = True\nif umur >= 13 and kunci:\n    print(\"Boleh masuk ke ruang rahasia!\")\nelse:\n    print(\"Belum boleh masuk\")",
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
        examples: "def sapa(nama):\n    print(\"Halo, \" + nama + \"! Selamat datang di petualangan!\")\nsapa(\"Andi\")\nsapa(\"Budi\")",
        story: "Kamu belajar membuat 'mantra' sihir yang bisa digunakan kapan saja - seperti fungsi dalam Python!",
        badge: "🔧 Function Wizard",
        defaultCode: "def sapa(nama):\n    print(\"Halo, \" + nama + \"! Selamat datang di petualangan!\")\nsapa(\"Andi\")\nsapa(\"Budi\")",
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
        examples: "# Membuat dan menulis file\ncatatan = open(\"catatan.txt\", \"w\")\ncatatan.write(\"Hari 1: Menemukan gua rahasia\\n\")\ncatatan.write(\"Hari 2: Belajar variabel\\n\")\ncatatan.close()\n# Membaca file\ncatatan = open(\"catatan.txt\", \"r\")\nprint(catatan.read())\ncatatan.close()",
        story: "Kamu ingin menyimpan semua catatan petualanganmu. Kamu belajar cara menyimpan data ke file!",
        badge: "💾 File Handler",
        defaultCode: "# Membuat dan menulis file\ncatatan = open(\"catatan.txt\", \"w\")\ncatatan.write(\"Hari 1: Menemukan gua rahasia\\n\")\ncatatan.write(\"Hari 2: Belajar variabel\\n\")\ncatatan.close()\n# Membaca file\ncatatan = open(\"catatan.txt\", \"r\")\nprint(catatan.read())\ncatatan.close()",
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
        examples: "class Petualang:\n    def __init__(self, nama, hp, kekuatan):\n        self.nama = nama\n        self.hp = hp\n        self.kekuatan = kekuatan\n    def serang(self, musuh):\n        print(self.nama + \" menyerang \" + musuh + \"!\")\n# Membuat karakter\nbudi = Petualang(\"Budi\", 100, 25)\nbudi.serang(\"Goblin\")",
        story: "Kamu belajar sihir tingkat tinggi - Object Oriented Programming! Sekarang kamu bisa membuat karakter dan kekuatan sendiri!",
        badge: "🧙 OOP Master",
        defaultCode: "class Petualang:\n    def __init__(self, nama, hp, kekuatan):\n        self.nama = nama\n        self.hp = hp\n        self.kekuatan = kekuatan\n    def serang(self, musuh):\n        print(self.nama + \" menyerang \" + musuh + \"!\")\n# Membuat karakter\nbudi = Petualang(\"Budi\", 100, 25)\nbudi.serang(\"Goblin\")",
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
    },
    11: {
        title: "🛡️ Misi: Penjaga Gerbang",
        desc: "Jadilah penjaga gerbang yang bijak! Gunakan try/except untuk menangani error saat ada input yang salah.",
        examples: "try:\n    angka = int(input(\"Masukkan angka: \"))\n    hasil = 100 / angka\n    print(\"Hasil: \" + str(hasil))\nexcept ValueError:\n    print(\"Error: Input bukan angka!\")\nexcept ZeroDivisionError:\n    print(\"Error: Tidak bisa dibagi dengan nol!\")\nexcept Exception as e:\n    print(\"Error tidak terduga: \" + str(e))",
        story: "Kamu diangkat menjadi penjaga gerbang kerajaan. Tugas kamu adalah memastikan hanya input yang valid yang bisa masuk!",
        badge: "🛡️ Error Handler",
        defaultCode: "# Contoh: Menangani error saat konversi tipe data\ntry:\n    # Coba kode yang berisiko error\n    angka = int(\"abc\")  # Ini akan error\n    print(\"Angka: \" + str(angka))\nexcept ValueError:\n    print(\"Error: Tidak bisa mengubah 'abc' menjadi angka!\")\n# Contoh: Menangani pembagian dengan nol\ntry:\n    hasil = 10 / 0\n    print(\"Hasil: \" + str(hasil))\nexcept ZeroDivisionError:\n    print(\"Error: Tidak bisa membagi dengan nol!\")",
        hints: [
            "Gunakan try untuk kode yang berisiko error",
            "Gunakan except untuk menangkap error spesifik",
            "Gunakan Exception as e untuk error umum",
            "finally selalu dijalankan, error atau tidak"
        ],
        quiz: {
            question: "Apa fungsi dari blok 'except'?",
            options: [
                "Menjalankan kode normal",
                "Menangkap dan menangani error",
                "Menghentikan program",
                "Membuat variabel"
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
    "🛡️ Error Handler",
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
// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
// Dark Mode Toggle
function toggleDarkMode() {
    gameData.darkMode = !gameData.darkMode;
    document.body.classList.toggle('dark-mode', gameData.darkMode);
    document.getElementById('darkModeToggle').textContent = gameData.darkMode ? '☀️' : '🌙';
    saveGame();
    showToast(gameData.darkMode ? '🌙 Mode Gelap Aktif' : '☀️ Mode Terang Aktif', 'info');
}
// Update avatar display
function updateAvatar() {
    const avatar = document.getElementById('player-avatar');
    const outfit = gameData.currentOutfit;
    // Base avatar
    let baseAvatar = "🧑‍💻";
    // Apply outfit
    switch(outfit) {
        case "wizard":
            baseAvatar = "🧙‍♂️";
            break;
        case "knight":
            baseAvatar = "👨‍✈️";
            break;
        case "archer":
            baseAvatar = "🏹";
            break;
        case "dragon":
            baseAvatar = "🐉";
            break;
    }
    avatar.textContent = baseAvatar;
    avatar.className = `avatar ${outfit}`;
}
// Show Shop
function showShop() {
    const modal = document.createElement('div');
    modal.className = 'shop-modal';
    // Perbaikan: Gunakan string biasa dan escape karakter
    modal.innerHTML = '<div class="shop-content">' +
        '<button class="shop-close" onclick="this.parentElement.parentElement.remove()">×</button>' +
        '<h2>🛍️ Toko Kosmetik</h2>' +
        '<div class="coins-display" style="margin: 10px auto; display: block; text-align: center;">' +
        '🪙 Koin Kamu: <span id="shop-coin-count">' + gameData.coins + '</span>' +
        '</div>' +
        '<!-- Outfits Section -->' +
        '<div class="shop-section">' +
        '<h3>👕 Pakaian Karakter</h3>' +
        Object.keys(cosmetics.outfits).map(key => {
            const item = cosmetics.outfits[key];
            const isUnlocked = gameData.unlockedCosmetics.outfits.includes(key);
            const isEquipped = gameData.currentOutfit === key;
            return '<div class="cosmetic-item ' + (isUnlocked ? 'unlocked' : 'locked') + ' ' + (isEquipped ? 'equipped' : '') + '" ' +
                   'onclick="' + (isUnlocked ? 'equipOutfit(\'' + key + '\')' : 'buyCosmetic(\'outfit\', \'' + key + '\')') + '" ' +
                   'title="' + (item.requirement || '') + '">' +
                   (key === 'wizard' ? '🧙‍♂️' : key === 'knight' ? '👨‍✈️' : key === 'archer' ? '🏹' : key === 'dragon' ? '🐉' : '🧑‍💻') + '<br>' +
                   item.name + '<br>' +
                   '<div class="cosmetic-price">' + (isUnlocked ? '✅' : '🪙 ' + item.price) + '</div>' +
                   (isEquipped ? '<div style="font-size:10px;color:#4CAF50">Dipakai</div>' : '') +
                   '</div>';
        }).join('') +
        '</div>' +
        '<!-- Themes Section -->' +
        '<div class="shop-section">' +
        '<h3>🎨 Tema Editor</h3>' +
        Object.keys(cosmetics.themes).map(key => {
            const item = cosmetics.themes[key];
            const isUnlocked = gameData.unlockedCosmetics.themes.includes(key);
            const isEquipped = gameData.currentTheme === key;
            return '<div class="cosmetic-item ' + (isUnlocked ? 'unlocked' : 'locked') + ' ' + (isEquipped ? 'equipped' : '') + '" ' +
                   'onclick="' + (isUnlocked ? 'equipTheme(\'' + key + '\')' : 'buyCosmetic(\'theme\', \'' + key + '\')') + '" ' +
                   'title="' + (item.requirement || '') + '">' +
                   '🎨 ' + item.name + '<br>' +
                   '<div class="cosmetic-price">' + (isUnlocked ? '✅' : '🪙 ' + item.price) + '</div>' +
                   (isEquipped ? '<div style="font-size:10px;color:#4CAF50">Dipakai</div>' : '') +
                   '</div>';
        }).join('') +
        '</div>' +
        '<!-- Effects Section -->' +
        '<div class="shop-section">' +
        '<h3>✨ Efek Spesial</h3>' +
        Object.keys(cosmetics.effects).map(key => {
            const item = cosmetics.effects[key];
            const isUnlocked = gameData.unlockedCosmetics.effects.includes(key);
            const isEquipped = gameData.currentEffect === key;
            return '<div class="cosmetic-item ' + (isUnlocked ? 'unlocked' : 'locked') + ' ' + (isEquipped ? 'equipped' : '') + '" ' +
                   'onclick="' + (isUnlocked ? 'equipEffect(\'' + key + '\')' : 'buyCosmetic(\'effect\', \'' + key + '\')') + '" ' +
                   'title="' + (item.requirement || '') + '">' +
                   '✨ ' + item.name + '<br>' +
                   '<div class="cosmetic-price">' + (isUnlocked ? '✅' : '🪙 ' + item.price) + '</div>' +
                   (isEquipped ? '<div style="font-size:10px;color:#4CAF50">Dipakai</div>' : '') +
                   '</div>';
        }).join('') +
        '</div>' +
    '</div>';
    document.body.appendChild(modal);
    // Close dengan ESC
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}
// Buy Cosmetic
function buyCosmetic(type, key) {
    const item = cosmetics[`${type}s`][key];
    if (gameData.coins >= item.price) {
        gameData.coins -= item.price;
        // Add to unlocked
        if (!gameData.unlockedCosmetics[`${type}s`].includes(key)) {
            gameData.unlockedCosmetics[`${type}s`].push(key);
        }
        saveGame();
        updateUI();
        showToast(`🎉 Berhasil membeli ${item.name}!`, 'success');
        // Refresh shop
        document.querySelector('.shop-modal')?.remove();
        showShop();
    } else {
        showToast(`❌ Koin tidak cukup! Butuh ${item.price} koin.`, 'error');
    }
}
// Equip Outfit
function equipOutfit(key) {
    gameData.currentOutfit = key;
    updateAvatar();
    saveGame();
    showToast(`👕 ${cosmetics.outfits[key].name} dipakai!`, 'success');
    // Refresh shop
    document.querySelector('.shop-modal')?.remove();
    showShop();
}
// Equip Theme (placeholder)
function equipTheme(key) {
    gameData.currentTheme = key;
    saveGame();
    showToast(`🎨 ${cosmetics.themes[key].name} dipakai!`, 'success');
    // Refresh shop
    document.querySelector('.shop-modal')?.remove();
    showShop();
}
// Equip Effect (placeholder)
function equipEffect(key) {
    gameData.currentEffect = key;
    saveGame();
    showToast(`✨ ${cosmetics.effects[key].name} dipakai!`, 'success');
    // Refresh shop
    document.querySelector('.shop-modal')?.remove();
    showShop();
}
// Give Coins (panggil saat dapat XP atau selesaikan level)
function giveCoins(amount) {
    gameData.coins += amount;
    updateUI();
    saveGame();
    // Show coin animation
    const coinAnim = document.createElement('div');
    coinAnim.className = 'xp-animation';
    coinAnim.textContent = `+${amount} 🪙`;
    coinAnim.style.background = 'rgba(255,215,0,0.9)';
    document.body.appendChild(coinAnim);
    setTimeout(() => {
        coinAnim.remove();
    }, 1500);
}
// Update story content
function updateStory() {
    const chapter = story.chapter[gameData.currentLevel];
    if (!chapter) return;
    // Update chapter info
    document.getElementById('chapter-title').textContent = chapter.title;
    document.getElementById('chapter-story').textContent = chapter.intro;
    // Update NPC dialogue
    const npc = story.npcs[chapter.npc];
    if (npc) {
        document.getElementById('npc-name').textContent = npc.name;
        document.getElementById('npc-message').textContent = npc.dialogues.greeting;
        document.getElementById('npc-dialogue').className = `npc-dialogue ${chapter.npc}`;
    }
    // Update story progress
    if (!gameData.storyProgress.chaptersCompleted.includes(gameData.currentLevel)) {
        gameData.storyProgress.chaptersCompleted.push(gameData.currentLevel);
        gameData.storyProgress.currentChapter = gameData.currentLevel;
        saveGame();
    }
}
// Show story modal saat level up
function showStoryModal(chapterNum) {
    const chapter = story.chapter[chapterNum];
    if (!chapter) return;
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    // Perbaikan: Gunakan string biasa dan escape karakter
    modal.innerHTML = '<div class="story-content">' +
        '<h2>📖 ' + chapter.title + '</h2>' +
        '<div class="story-text">' + chapter.intro + '</div>' +
        '<div class="story-text">' + chapter.mission + '</div>' +
        '<div class="story-reward">🏆 ' + chapter.reward + '</div>' +
        '<div class="npc-avatar ' + chapter.npc + '-avatar"></div>' +
        '<div style="margin: 15px 0; font-style: italic;">' +
        '"' + story.npcs[chapter.npc].dialogues.greeting + '"' +
        '</div>' +
        '<button class="story-btn" onclick="this.parentElement.parentElement.remove()">' +
        'Lanjutkan Petualangan!' +
        '</button>' +
    '</div>';
    document.body.appendChild(modal);
    // Auto close after 5 seconds
    setTimeout(() => {
        modal.remove();
    }, 5000);
}
// Show NPC dialogue random:
function showRandomNPCDialogue() {
    const chapter = story.chapter[gameData.currentLevel];
    if (!chapter) return;
    const npc = story.npcs[chapter.npc];
    if (!npc) return;
    // Pilih dialogue acak
    const dialogues = Object.values(npc.dialogues);
    const randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
    // Update NPC dialogue
    document.getElementById('npc-name').textContent = npc.name;
    document.getElementById('npc-message').textContent = randomDialogue;
    document.getElementById('npc-dialogue').className = `npc-dialogue ${chapter.npc}`;
    // Animasi
    const dialogueBox = document.getElementById('npc-dialogue');
    dialogueBox.classList.add('correct-animation');
    setTimeout(() => {
        dialogueBox.classList.remove('correct-animation');
    }, 500);
}
// Show Logbook
function showLogbook() {
    const modal = document.createElement('div');
    modal.className = 'logbook-modal';
    // Perbaikan: Gunakan string biasa dan escape karakter
    modal.innerHTML = '<div class="logbook-content">' +
        '<button class="logbook-close" onclick="this.parentElement.parentElement.remove()">×</button>' +
        '<h2>📖 Jurnal Petualangan</h2>' +
        '<div class="logbook-section">' +
        '<h3>🏆 Badge yang Dikumpulkan</h3>' +
        (gameData.badges.length > 0 ? 
            gameData.badges.map(badge => '<div class="logbook-item">🏅 ' + badge + '</div>').join('') :
            '<p>Belum ada badge. Selesaikan level untuk mendapatkan badge!</p>'
        ) +
        '</div>' +
        '<div class="logbook-section">' +
        '<h3>📊 Level yang Diselesaikan</h3>' +
        (gameData.completedLevels.length > 0 ? 
            gameData.completedLevels.map(level => '<div class="logbook-item">✅ Level ' + level + ': ' + (levels[level]?.title || 'Unknown') + '</div>').join('') :
            '<p>Belum ada level yang diselesaikan.</p>'
        ) +
        '</div>' +
        '<div class="logbook-section">' +
        '<h3>🎮 Statistik</h3>' +
        '<div class="logbook-item">Level saat ini: ' + gameData.currentLevel + '</div>' +
        '<div class="logbook-item">Total XP: ' + gameData.xp + '</div>' +
        '<div class="logbook-item">Koin terkumpul: ' + gameData.coins + '</div>' +
        '<div class="logbook-item">Badge terkumpul: ' + gameData.badges.length + '/11</div>' +
        '</div>' +
    '</div>';
    document.body.appendChild(modal);
    // Close dengan ESC
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}
// Initialize Game
async function initGame() {
    try {
        // Apply dark mode if saved
        if (gameData.darkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').textContent = '☀️';
        }
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
        updateStory(); // Initialize story
        updateAvatar(); // Initialize avatar
        // Setup keyboard shortcuts
        setupKeyboardShortcuts();
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        // Perbaikan: Gunakan string biasa
        document.getElementById('loading').innerHTML = '<div class="loading-spinner"></div><p>❌ Error memuat Python Engine. Silakan refresh halaman.</p>';
        showToast('Error memuat Python Engine!', 'error');
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
        // D for dark mode toggle
        if (e.key === 'd' || e.key === 'D') {
            toggleDarkMode();
        }
        // L for logbook
        if (e.key === 'l' || e.key === 'L') {
            showLogbook();
        }
        // S for shop
        if (e.key === 's' || e.key === 'S') {
            showShop();
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
    document.getElementById('coin-count').textContent = gameData.coins;
    const xpPercent = (gameData.xp / getNextLevelXP()) * 100;
    document.getElementById('xp-bar').style.width = xpPercent + '%';
    document.getElementById('xp-text').textContent = gameData.xp + '/' + getNextLevelXP() + ' XP';
    updateBadges();
    updateAvatar();
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
    for (let i = 1; i <= 11; i++) {
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
    showToast(`Level ${level} dipilih!`, 'info');
}
// Update Level Content
function updateLevelContent() {
    const level = levels[gameData.currentLevel];
    if (!level) return;
    document.getElementById('mission-title').textContent = level.title;
    document.getElementById('mission-desc').textContent = level.desc;
    document.getElementById('examples').innerHTML = '<strong>Contoh:</strong><br>' + level.examples.replace(/\n/g, '<br>');
    // Update story content
    updateStory();
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
        showToast('Kode direset ke contoh awal!', 'info');
    }
}
// Show Hint
function showHint() {
    const level = levels[gameData.currentLevel];
    const hintBtn = document.getElementById('hint-btn');
    if (level && level.hints) {
        // Disable tombol sementara
        hintBtn.disabled = true;
        hintBtn.textContent = "⏳ Cooldown...";
        const randomHint = level.hints[Math.floor(Math.random() * level.hints.length)];
        showToast("💡 " + randomHint, 'info');
        // Cooldown 10 detik
        setTimeout(() => {
            hintBtn.disabled = false;
            hintBtn.textContent = "💡 Hint";
        }, 10000);
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
    showToast('Kode berhasil di-export!', 'success');
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
        // Capture Python output
        let outputBuffer = "";
        // Override print function to capture output
        pyodide.runPython(
            "import sys\n" +
            "from js import console\n" +
            "class OutputCapture:\n" +
            "    def __init__(self):\n" +
            "        self.buffer = \"\"\n" +
            "    def write(self, text):\n" +
            "        self.buffer += text\n" +
            "        return len(text)\n" +
            "    def flush(self):\n" +
            "        pass\n" +
            "sys.stdout = OutputCapture()\n"
        );
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
            showToast("🏆 Achievement Unlocked: First Code!", 'success');
        }
    } catch (error) {
        output.innerHTML = "❌ Error:\n" + error.message;
        output.className = "error-output";
        // Achievement: Error Hunter
        if (!gameData.achievements.includes("💥 Error Hunter")) {
            // Count errors (simplified)
            if (Math.random() > 0.7) { // Simulate error counting
                gameData.achievements.push("💥 Error Hunter");
                showToast("🏆 Achievement Unlocked: Error Hunter!", 'success');
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
    // Tampilkan animasi XP
    showXPAnimation(amount);
    gameData.xp += amount;
    const nextLevelXP = getNextLevelXP();
    // Kasih koin setiap 20 XP
    if (amount >= 20) {
        giveCoins(Math.floor(amount / 20));
    }
    if (gameData.xp >= nextLevelXP) {
        levelUp();
    }
    // Mark level as completed
    if (!gameData.completedLevels.includes(gameData.currentLevel)) {
        gameData.completedLevels.push(gameData.currentLevel);
        const badge = levels[gameData.currentLevel].badge;
        if (badge && !gameData.badges.includes(badge)) {
            gameData.badges.push(badge);
            showToast("🏆 Badge Unlocked: " + badge, 'success');
            animateBadgeUnlock();
            giveCoins(10); // Bonus koin untuk badge
        }
    }
    updateUI();
    setupLevelButtons();
    saveGame();
}
// Fungsi untuk animasi XP
function showXPAnimation(amount) {
    const xpAnim = document.createElement('div');
    xpAnim.className = 'xp-animation';
    xpAnim.textContent = `+${amount} XP!`;
    document.body.appendChild(xpAnim);
    setTimeout(() => {
        xpAnim.remove();
    }, 1500);
}
// Fungsi untuk animasi badge
function animateBadgeUnlock() {
    const badges = document.querySelectorAll('.badge');
    const lastBadge = badges[badges.length - 1];
    if (lastBadge) {
        lastBadge.classList.add('correct-animation');
        setTimeout(() => {
            lastBadge.classList.remove('correct-animation');
        }, 500);
    }
}
// Level Up
function levelUp() {
    const oldLevel = gameData.currentLevel;
    gameData.currentLevel++;
    gameData.xp = 0;
    giveCoins(25);
    if (gameData.currentLevel > 11) {
        gameData.currentLevel = 11;
        if (!gameData.badges.includes("💎 Python Pro")) {
            gameData.badges.push("💎 Python Pro");
            showToast("🏆 Ultimate Badge Unlocked: Python Pro!", 'success');
            giveCoins(50);
        }
    }
    // Show story modal for new level
    showStoryModal(gameData.currentLevel);
    showToast("🎉 Level Up! Kamu sekarang di Level " + gameData.currentLevel, 'success');
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
        10: "🧙 Tantangan: Buat class 'Monster' dengan atribut dan method serang()",
        11: "🛡️ Tantangan: Buat kalkulator yang tahan error dengan try/except"
    };
    const output = document.getElementById("output");
    output.innerHTML = "⚔️ " + (challenges[gameData.currentLevel] || "⚔️ Tantangan spesial untuk level ini!");
    output.className = ""; // Reset error class
    showToast("⚔️ Tantangan spesial dimuat!", 'info');
}
// Show Quiz
function showQuiz() {
    const level = levels[gameData.currentLevel];
    if (!level || !level.quiz) return;
    const quizContainer = document.getElementById('quiz-container');
    const quizContent = document.getElementById('quiz-content');
    // Perbaikan: Gunakan string biasa dan escape karakter
    quizContent.innerHTML = '<div class="quiz-question">' +
        '<h4>' + level.quiz.question + '</h4>' +
    '</div>' +
    '<div class="quiz-options" id="quiz-options">' +
        level.quiz.options.map((option, index) => 
            '<div class="quiz-option" onclick="selectQuizOption(' + index + ')" data-index="' + index + '">' + option + '</div>'
        ).join('') +
    '</div>';
    quizContainer.style.display = 'block';
    // Scroll to quiz
    quizContainer.scrollIntoView({ behavior: 'smooth' });
    showToast("❓ Quiz dimuat!", 'info');
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
        showToast("⚠️ Pilih jawaban dulu!", 'warning');
        return;
    }
    const selectedIndex = parseInt(selectedOption.dataset.index);
    const isCorrect = selectedIndex === level.quiz.correct;
    if (isCorrect) {
        // Show NPC encouragement
        showRandomNPCDialogue();
        const output = document.getElementById("output");
        output.classList.add('correct-animation');
        setTimeout(() => {
            output.classList.remove('correct-animation');
        }, 500);
        showToast("✅ Benar! Jawaban kamu tepat!", 'success');
        giveXP(30);
    } else {
        showToast("❌ Salah. Jawaban yang benar: " + level.quiz.options[level.quiz.correct], 'error');
    }
    document.getElementById('quiz-container').style.display = 'none';
}


// --- Fitur Baru: Playground (Saran #51) ---
function showPlayground() {
    const modal = document.createElement('div');
    modal.className = 'playground-modal';
    
    // Muat kode yang tersimpan, atau gunakan template default
    const savedPlaygroundCode = localStorage.getItem('pythonPlaygroundCode') || 
"# 🎨 Playground Python - Bereksperimenlah!\n# Kamu bisa menulis kode apa saja di sini.\n\n# Contoh: Membuat pola segitiga\ndef buat_segitiga(tinggi):\n    for i in range(tinggi):\n        print(\" \" * (tinggi - i - 1) + \"*\" * (2 * i + 1))\n\n# Panggil fungsi\nbuat_segitiga(5)\n\n# --- Area Gambar ASCII ---\nprint(\"\\n🖼️ Gambar ASCII Sederhana:\")\nprint(\"  *****\")\nprint(\" *     *\")\nprint(\"* Python *\")\nprint(\" *     *\")\nprint(\"  *****\")\n\n# Kamu juga bisa bereksperimen dengan turtle jika didukung!\n# (Simulasi sederhana)\n";

    // Perbaikan: Gunakan string biasa dan escape karakter
    modal.innerHTML = '<div class="playground-content">' +
        '<div class="playground-header">' +
        '<h2>🎨 Playground Python</h2>' +
        '<button class="playground-close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>' +
        '</div>' +
        '<div class="playground-main">' +
        '<div class="playground-editor-section">' +
        '<div class="playground-section-title">📝 Editor Kode</div>' +
        '<textarea id="playground-editor">' + savedPlaygroundCode + '</textarea>' +
        '</div>' +
        '<div class="playground-output-section">' +
        '<div class="playground-section-title">💻 Output</div>' +
        '<div id="playground-output">🎮 Output akan muncul di sini...</div>' +
        '</div>' +
        '</div>' +
        '<div class="playground-toolbar">' +
        '<button onclick="runPlaygroundCode()">🚀 Jalankan (Ctrl+Enter)</button>' +
        '<button onclick="savePlaygroundCode()">💾 Simpan Kode</button>' +
        '<button onclick="clearPlaygroundOutput()">🗑️ Bersihkan Output</button>' +
        '<button onclick="loadDefaultPlaygroundCode()">🔄 Reset ke Awal</button>' +
        '</div>' +
    '</div>';
    document.body.appendChild(modal);

    // Setup keyboard shortcut untuk playground
    const playgroundEditor = modal.querySelector('#playground-editor');
    playgroundEditor.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runPlaygroundCode();
        }
    });

    // Close dengan ESC
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

// Fungsi untuk menjalankan kode di playground
async function runPlaygroundCode() {
    const code = document.getElementById("playground-editor").value;
    const output = document.getElementById("playground-output");
    const runBtn = document.querySelector('.playground-toolbar button'); // Ambil tombol pertama (Jalankan)
    
    runBtn.disabled = true;
    runBtn.textContent = "⏳ Menjalankan...";
    output.innerHTML = "🎮 Menjalankan kode...";

    try {
        // Simpan kode sebelum di-run
        localStorage.setItem('pythonPlaygroundCode', code);

        // Override print function to capture output
        pyodide.runPython(
            "import sys\n" +
            "from js import console\n" +
            "class OutputCapture:\n" +
            "    def __init__(self):\n" +
            "        self.buffer = \"\"\n" +
            "    def write(self, text):\n" +
            "        self.buffer += text\n" +
            "        return len(text)\n" +
            "    def flush(self):\n" +
            "        pass\n" +
            "sys.stdout = OutputCapture()\n"
        );

        pyodide.runPython(code);

        const capturedOutput = pyodide.globals.get('sys').stdout.buffer;
        if (capturedOutput && capturedOutput.length > 0) {
            output.innerHTML = "✅ " + capturedOutput;
        } else {
            output.innerHTML = "ℹ️ Kode dijalankan tanpa output";
        }
    } catch (error) {
        output.innerHTML = "❌ Error:\n" + error.message;
    } finally {
        runBtn.disabled = false;
        runBtn.textContent = "🚀 Jalankan (Ctrl+Enter)";
    }
}

// Fungsi untuk menyimpan kode playground
function savePlaygroundCode() {
    const code = document.getElementById("playground-editor").value;
    localStorage.setItem('pythonPlaygroundCode', code);
    showToast("💾 Kode Playground berhasil disimpan!", 'success');
}

// Fungsi untuk membersihkan output playground
function clearPlaygroundOutput() {
    document.getElementById("playground-output").innerHTML = "🎮 Output akan muncul di sini...";
    showToast("🗑️ Output Playground telah dibersihkan!", 'info');
}

// Fungsi untuk me-load kode default
function loadDefaultPlaygroundCode() {
    const defaultCode = "# 🎨 Playground Python - Bereksperimenlah!\n# Kamu bisa menulis kode apa saja di sini.\n\n# Contoh: Membuat pola segitiga\ndef buat_segitiga(tinggi):\n    for i in range(tinggi):\n        print(\" \" * (tinggi - i - 1) + \"*\" * (2 * i + 1))\n\n# Panggil fungsi\nbuat_segitiga(5)\n\n# --- Area Gambar ASCII ---\nprint(\"\\n🖼️ Gambar ASCII Sederhana:\")\nprint(\"  *****\")\nprint(\" *     *\")\nprint(\"* Python *\")\nprint(\" *     *\")\nprint(\"  *****\")\n";
    document.getElementById("playground-editor").value = defaultCode;
    showToast("🔄 Kode Playground direset ke awal!", 'info');
}
// --- Akhir Fitur Baru ---

// --- Fitur Baru: Indentasi Otomatis (Saran #52) ---
document.addEventListener('DOMContentLoaded', function() {
    const mainEditor = document.getElementById('code-editor');
    const playgroundEditor = document.getElementById('playground-editor');

    function setupAutoIndent(editorElement) {
        if (editorElement) {
            editorElement.addEventListener('input', function(event) {
                const element = event.target;
                const cursorPosition = element.selectionStart;
                const value = element.value;

                if (cursorPosition > 0 && value.charAt(cursorPosition - 1) === ':') {
                    const textBefore = value.substring(0, cursorPosition);
                    const textAfter = value.substring(cursorPosition);
                    element.value = textBefore + '    ' + textAfter;

                    const newCursorPosition = cursorPosition + 4;
                    element.setSelectionRange(newCursorPosition, newCursorPosition);
                }
            });
        }
    }

    setupAutoIndent(mainEditor);
    setupAutoIndent(playgroundEditor); // Untuk playground juga
});

window.onload = initGame;
