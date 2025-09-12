// achievements.js - Logika Achievement

// Data Game State (disimpan di localStorage)
let gameData = {
    currentLevel: 1,
    xp: 0,
    badges: [],
    achievements: [],
    completedLevels: [],
    coins: 0,
    playerName: "Petualang Python",
    // Sistem koin & kosmetik
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

// Definisi Achievement
const achievements = [
    {
        id: "first-code",
        title: "🎯 First Code",
        description: "Jalankan kode Python pertamamu",
        icon: "🎯",
        xpReward: 10,
        coinReward: 5,
        unlockCondition: "Jalankan kode di editor utama"
    },
    {
        id: "error-hunter",
        title: "💥 Error Hunter",
        description: "Dapatkan 5 error saat coding",
        icon: "💥",
        xpReward: 15,
        coinReward: 10,
        unlockCondition: "Dapatkan error 5x saat menjalankan kode"
    },
    {
        id: "speed-coder",
        title: "⚡ Speed Coder",
        description: "Jalankan kode < 5 detik setelah load",
        icon: "⚡",
        xpReward: 20,
        coinReward: 15,
        unlockCondition: "Jalankan kode dengan cepat"
    },
    {
        id: "quiz-master",
        title: "📚 Quiz Master",
        description: "Jawab 5 quiz benar",
        icon: "📚",
        xpReward: 25,
        coinReward: 20,
        unlockCondition: "Jawab 5 quiz dengan benar"
    },
    {
        id: "loop-expert",
        title: "🔁 Loop Expert",
        description: "Gunakan loop 10x dalam kode",
        icon: "🔁",
        xpReward: 30,
        coinReward: 25,
        unlockCondition: "Gunakan perulangan 10x"
    },
    {
        id: "function-fan",
        title: "🔧 Function Fan",
        description: "Buat 5 fungsi dalam kode",
        icon: "🔧",
        xpReward: 35,
        coinReward: 30,
        unlockCondition: "Buat 5 fungsi"
    },
    {
        id: "level-completer",
        title: "🏁 Level Completer",
        description: "Selesaikan 5 level pembelajaran",
        icon: "🏁",
        xpReward: 40,
        coinReward: 35,
        unlockCondition: "Selesaikan 5 level"
    },
    {
        id: "xp-collector",
        title: "💎 XP Collector",
        description: "Kumpulkan 500 XP total",
        icon: "💎",
        xpReward: 50,
        coinReward: 45,
        unlockCondition: "Kumpulkan 500 XP"
    },
    {
        id: "coin-hoarder",
        title: "🪙 Coin Hoarder",
        description: "Kumpulkan 200 koin",
        icon: "🪙",
        xpReward: 45,
        coinReward: 50,
        unlockCondition: "Kumpulkan 200 koin"
    },
    {
        id: "badge-collector",
        title: "🏅 Badge Collector",
        description: "Kumpulkan 8 badge",
        icon: "🏅",
        xpReward: 55,
        coinReward: 60,
        unlockCondition: "Kumpulkan 8 badge"
    },
    {
        id: "python-pro",
        title: "👑 Python Pro",
        description: "Selesaikan semua level dan kumpulkan semua badge",
        icon: "👑",
        xpReward: 100,
        coinReward: 100,
        unlockCondition: "Selesaikan semua level"
    }
];

// Initialize Achievements
function initAchievements() {
    // Load game data
    loadGameData();
    
    // Update UI
    updateAchievementStats();
    loadAchievements();
    
    console.log("Achievements system initialized");
}

// Load Game Data from localStorage
function loadGameData() {
    const saved = localStorage.getItem('pythonAdventure');
    if (saved) {
        try {
            Object.assign(gameData, JSON.parse(saved));
        } catch (e) {
            console.error("Error parsing game data:", e);
        }
    }
}

// Save Game Data to localStorage
function saveGameData() {
    localStorage.setItem('pythonAdventure', JSON.stringify(gameData));
}

// Update Achievement Statistics
function updateAchievementStats() {
    document.getElementById('total-achievements').textContent = gameData.achievements.length;
    document.getElementById('total-xp').textContent = gameData.xp;
    document.getElementById('total-coins').textContent = gameData.coins;
    
    // Calculate completion rate
    const totalAchievements = achievements.length;
    const earnedAchievements = gameData.achievements.length;
    const completionRate = totalAchievements > 0 ? Math.round((earnedAchievements / totalAchievements) * 100) : 0;
    document.getElementById('completion-rate').textContent = `${completionRate}%`;
    
    // Update recent achievements
    updateRecentAchievements();
}

// Update Recent Achievements
function updateRecentAchievements() {
    const recentContainer = document.getElementById('recent-achievements');
    if (gameData.achievements.length === 0) {
        recentContainer.innerHTML = '<div class="recent-item">Belum ada achievement terbaru</div>';
        return;
    }
    
    // Show last 3 achievements
    const recent = gameData.achievements.slice(-3).reverse();
    recentContainer.innerHTML = '';
    
    recent.forEach(achId => {
        const ach = achievements.find(a => a.id === achId);
        if (ach) {
            const item = document.createElement('div');
            item.className = 'recent-item';
            item.innerHTML = `${ach.icon} ${ach.title}`;
            recentContainer.appendChild(item);
        }
    });
}

// Load Achievements Grid
function loadAchievements() {
    const container = document.getElementById('achievements-container');
    container.innerHTML = '';
    
    achievements.forEach(achievement => {
        const isEarned = gameData.achievements.includes(achievement.id);
        
        const achCard = document.createElement('div');
        achCard.className = `achievement-card ${isEarned ? 'earned' : ''}`;
        
        achCard.innerHTML = `
            <h3>${achievement.icon} ${achievement.title}</h3>
            <p>${achievement.description}</p>
            <div class="xp-reward">🎁 XP: ${achievement.xpReward} | Koin: ${achievement.coinReward}</div>
            <div class="unlock-condition">🔓 Syarat: ${achievement.unlockCondition}</div>
        `;
        
        container.appendChild(achCard);
    });
}

// Show Achievement Stats
function showAchievementStats() {
    const totalAchievements = achievements.length;
    const earnedAchievements = gameData.achievements.length;
    const completionRate = totalAchievements > 0 ? Math.round((earnedAchievements / totalAchievements) * 100) : 0;
    
    alert(`📊 Statistik Achievement:\n\n` +
          `Achievement Terkumpul: ${earnedAchievements}/${totalAchievements}\n` +
          `Completion Rate: ${completionRate}%\n` +
          `Total XP: ${gameData.xp}\n` +
          `Koin Terkumpul: ${gameData.coins}\n` +
          `Level Saat Ini: ${gameData.currentLevel}\n` +
          `Badge Terkumpul: ${gameData.badges.length}/11`);
}

// Unlock Achievement
function unlockAchievement(achievementId) {
    // Check if already earned
    if (gameData.achievements.includes(achievementId)) {
        return false;
    }
    
    // Find achievement
    const achievement = achievements.find(ach => ach.id === achievementId);
    if (!achievement) {
        console.warn("Achievement not found:", achievementId);
        return false;
    }
    
    // Add to earned achievements
    gameData.achievements.push(achievementId);
    
    // Give rewards
    gameData.xp += achievement.xpReward;
    gameData.coins += achievement.coinReward;
    
    // Save and update UI
    saveGameData();
    updateAchievementStats();
    loadAchievements();
    
    // Show notification
    showToast(`🏆 Achievement Unlocked: ${achievement.title}!`, 'success');
    
    // Animate the achievement card
    setTimeout(() => {
        const achCards = document.querySelectorAll('.achievement-card');
        achCards.forEach(card => {
            if (card.textContent.includes(achievement.title)) {
                card.classList.add('correct-animation');
                setTimeout(() => {
                    card.classList.remove('correct-animation');
                }, 500);
            }
        });
    }, 100);
    
    return true;
}

// Check Achievement Conditions
function checkAchievements() {
    // First Code - when code is run for the first time
    if (!gameData.achievements.includes("first-code")) {
        unlockAchievement("first-code");
    }
    
    // Error Hunter - when error occurs
    // This would be called from error handling in other parts
    
    // Speed Coder - when code runs quickly
    // This would be tracked with timing
    
    // Quiz Master - when 5 quizzes are answered correctly
    // This would be tracked in quiz system
    
    // Loop Expert - when loops are used 10 times
    // This would be tracked in code analysis
    
    // Function Fan - when 5 functions are created
    // This would be tracked in code analysis
    
    // Level Completer - when 5 levels are completed
    if (gameData.completedLevels.length >= 5 && !gameData.achievements.includes("level-completer")) {
        unlockAchievement("level-completer");
    }
    
    // XP Collector - when 500 XP is collected
    if (gameData.xp >= 500 && !gameData.achievements.includes("xp-collector")) {
        unlockAchievement("xp-collector");
    }
    
    // Coin Hoarder - when 200 coins are collected
    if (gameData.coins >= 200 && !gameData.achievements.includes("coin-hoarder")) {
        unlockAchievement("coin-hoarder");
    }
    
    // Badge Collector - when 8 badges are collected
    if (gameData.badges.length >= 8 && !gameData.achievements.includes("badge-collector")) {
        unlockAchievement("badge-collector");
    }
    
    // Python Pro - when all levels and badges are completed
    if (gameData.currentLevel >= 11 && gameData.badges.length >= 11 && !gameData.achievements.includes("python-pro")) {
        unlockAchievement("python-pro");
    }
}

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

// Initialize on load
document.addEventListener('DOMContentLoaded', initAchievements);