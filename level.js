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
