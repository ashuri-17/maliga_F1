/* ===== KAGEYAMA SETTER APP - MAIN APPLICATION ===== */

const app = {
    state: {
        currentPage: 'home',
        level: 1,
        xp: 0,
        totalXP: 0,
        streak: 0,
        bestStreak: 0,
        totalDrills: 0,
        totalMinutes: 0,
        dailyComplete: 0,
        lastTrainDate: null,
        completedDrills: [],
        completedExercises: [],
        dailyTasks: [],
        dailyTasksCompleted: [],
        challengeProgress: {},
        achievements: [],
        categoryStats: { accuracy: 0, hands: 0, footwork: 0, quick: 0, game: 0 },
        weeklyActivity: [0, 0, 0, 0, 0, 0, 0],
        settings: {
            name: '',
            dailyGoal: 5,
            difficulty: 'intermediate',
            restTime: 30,
            sound: false,
            vibration: true,
            reminder: true,
            reminderTime: '07:00'
        },
        currentDrill: null,
        currentExerciseIndex: 0,
        exerciseTimer: null,
        exerciseStartTime: null,
        exerciseReps: 0,
        currentFilter: { category: 'all', difficulty: 'all' },
        currentPlan: 'daily'
    },

    init() {
        this.loadState();
        this.checkDailyReset();
        this.generateDailyTasks();
        this.setupEventListeners();
        this.updateUI();

        setTimeout(() => {
            document.getElementById('splash-screen').classList.add('fade-out');
            setTimeout(() => {
                document.getElementById('splash-screen').style.display = 'none';
                document.getElementById('app').classList.remove('hidden');
            }, 500);
        }, 2200);
    },

    // ===== STATE MANAGEMENT =====
    loadState() {
        const saved = localStorage.getItem('kageyama-setter-state');
        if (saved) {
            const parsed = JSON.parse(saved);
            this.state = { ...this.state, ...parsed };
        }
    },

    saveState() {
        localStorage.setItem('kageyama-setter-state', JSON.stringify(this.state));
    },

    checkDailyReset() {
        const today = new Date().toDateString();
        if (this.state.lastTrainDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (this.state.lastTrainDate === yesterday.toDateString()) {
                // Streak continues
            } else if (this.state.lastTrainDate) {
                this.state.streak = 0;
            }
            this.state.dailyTasksCompleted = [];
            this.state.dailyTasks = [];
        }
    },

    // ===== NAVIGATION =====
    navigateTo(page) {
        this.state.currentPage = page;
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(`page-${page}`).classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.page === page);
        });

        document.getElementById('page-container').scrollTop = 0;

        switch(page) {
            case 'home': this.renderHome(); break;
            case 'drills': this.renderDrills(); break;
            case 'training': this.renderTrainingPlan(); break;
            case 'challenges': this.renderChallenges(); break;
            case 'stats': this.renderStats(); break;
            case 'settings': this.loadSettings(); break;
        }
    },

    // ===== DAILY TASKS =====
    generateDailyTasks() {
        if (this.state.dailyTasks.length > 0) return;

        const goal = this.state.settings.dailyGoal;
        const diff = this.state.settings.difficulty;
        const available = DRILLS.filter(d =>
            diff === 'all' || d.difficulty === diff ||
            d.difficulty === 'beginner' || d.difficulty === 'intermediate'
        );

        const shuffled = [...available].sort(() => Math.random() - 0.5);
        this.state.dailyTasks = shuffled.slice(0, Math.min(goal, shuffled.length)).map(d => d.id);
        this.saveState();
    },

    // ===== RENDER FUNCTIONS =====
    updateUI() {
        const rank = this.getCurrentRank();
        const nextRank = this.getNextRank();
        const xpForLevel = this.getXPForCurrentLevel();
        const xpForNext = this.getXPForNextLevel();
        const progress = xpForNext > 0 ? ((this.state.xp - xpForLevel) / (xpForNext - xpForLevel)) * 100 : 100;

        document.getElementById('level-badge').textContent = `LV.${this.state.level}`;
        document.getElementById('xp-fill-mini').style.width = `${Math.min(progress, 100)}%`;
        document.getElementById('streak-number').textContent = this.state.streak;

        this.renderHome();
    },

    renderHome() {
        const rank = this.getCurrentRank();
        document.getElementById('rank-icon').textContent = rank.icon;
        document.getElementById('rank-title').textContent = rank.name;
        document.getElementById('rank-quote').textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];

        // Daily progress ring
        const dailyGoal = this.state.settings.dailyGoal;
        const completed = this.state.dailyTasksCompleted.length;
        const percent = dailyGoal > 0 ? Math.round((completed / dailyGoal) * 100) : 0;
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (percent / 100) * circumference;

        document.getElementById('daily-progress-ring').style.strokeDashoffset = offset;
        document.getElementById('daily-percent').textContent = `${Math.min(percent, 100)}%`;
        document.getElementById('daily-task-count').textContent = `${completed}/${dailyGoal}`;

        // Stats
        document.getElementById('stat-total-drills').textContent = this.state.totalDrills;
        document.getElementById('stat-total-xp').textContent = this.state.totalXP;
        document.getElementById('stat-best-streak').textContent = this.state.bestStreak;

        // Daily tasks list
        const taskList = document.getElementById('daily-tasks-list');
        taskList.innerHTML = '';

        this.state.dailyTasks.forEach(drillId => {
            const drill = DRILLS.find(d => d.id === drillId);
            if (!drill) return;
            const isCompleted = this.state.dailyTasksCompleted.includes(drillId);

            const el = document.createElement('div');
            el.className = `daily-task-item ${isCompleted ? 'completed' : ''}`;
            el.onclick = () => this.openDrill(drillId);
            el.innerHTML = `
                <div class="task-check">${isCompleted ? '✓' : ''}</div>
                <div class="task-info">
                    <div class="task-name">${drill.name}</div>
                    <div class="task-meta">${drill.duration} min · ${this.capitalize(drill.category)}</div>
                </div>
                <div class="task-xp">+${drill.xp} XP</div>
            `;
            taskList.appendChild(el);
        });
    },

    renderDrills() {
        const list = document.getElementById('drill-list');
        list.innerHTML = '';

        const { category, difficulty } = this.state.currentFilter;
        const filtered = DRILLS.filter(d => {
            if (category !== 'all' && d.category !== category) return false;
            if (difficulty !== 'all' && d.difficulty !== difficulty) return false;
            return true;
        });

        if (filtered.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-text">No drills match your filters</div>
                </div>
            `;
            return;
        }

        filtered.forEach(drill => {
            const card = document.createElement('div');
            card.className = 'drill-card';
            card.dataset.diff = drill.difficulty;
            card.onclick = () => this.openDrill(drill.id);

            const catIcons = { accuracy: '🎯', hands: '🤲', footwork: '👟', quick: '⚡', game: '🏐' };
            const isCompleted = this.state.completedDrills.includes(drill.id);

            card.innerHTML = `
                <div class="drill-card-header">
                    <div class="drill-card-title">${catIcons[drill.category] || ''} ${drill.name}</div>
                    <span class="drill-card-diff ${drill.difficulty}">${drill.difficulty}</span>
                </div>
                <div class="drill-card-desc">${drill.description.substring(0, 80)}...</div>
                <div class="drill-card-meta">
                    <span>⏱ ${drill.duration} min</span>
                    <span>⭐ ${drill.xp} XP</span>
                    <span>📋 ${drill.exercises.length} exercises</span>
                    ${isCompleted ? '<span style="color:var(--accent-green)">✓ Done</span>' : ''}
                </div>
            `;
            list.appendChild(card);
        });
    },

    openDrill(drillId) {
        const drill = DRILLS.find(d => d.id === drillId);
        if (!drill) return;

        this.state.currentDrill = drill;
        this.state.currentExerciseIndex = 0;

        const content = document.getElementById('drill-detail-content');
        const catIcons = { accuracy: '🎯', hands: '🤲', footwork: '👟', quick: '⚡', game: '🏐' };

        content.innerHTML = `
            <div class="drill-detail-header">
                <div class="drill-detail-cat">${catIcons[drill.category] || ''} ${drill.category}</div>
                <h2 class="drill-detail-title">${drill.name}</h2>
                <div class="drill-detail-desc">${drill.description}</div>
                <div class="drill-detail-stats">
                    <div class="drill-stat">⏱ ${drill.duration} min</div>
                    <div class="drill-stat">⭐ ${drill.xp} XP</div>
                    <div class="drill-stat">
                        <span class="drill-card-diff ${drill.difficulty}">${drill.difficulty}</span>
                    </div>
                </div>
            </div>
            <h3 class="drill-exercises-header">Exercises (${drill.exercises.length})</h3>
            ${drill.exercises.map((ex, i) => `
                <div class="exercise-item" onclick="app.openExercise(${i})">
                    <div class="exercise-num">${i + 1}</div>
                    <div class="exercise-item-info">
                        <div class="exercise-item-name">${ex.name}</div>
                        <div class="exercise-item-meta">${ex.type === 'reps' ? ex.reps + ' reps' : this.formatTime(ex.duration)} · ${ex.tips[0].substring(0, 40)}...</div>
                    </div>
                    <div class="exercise-item-arrow">→</div>
                </div>
            `).join('')}
            <button class="start-drill-btn" onclick="app.startFullDrill()">▶ START FULL DRILL</button>
        `;

        this.navigateTo('drill-detail');
    },

    openExercise(index) {
        const drill = this.state.currentDrill;
        if (!drill) return;

        this.state.currentExerciseIndex = index;
        const exercise = drill.exercises[index];

        this.renderExercise(exercise);
        this.navigateTo('exercise');
    },

    renderExercise(exercise) {
        document.getElementById('exercise-name').textContent = exercise.name;

        // Animation
        ExerciseAnimations.createAnimation(exercise.animation, document.getElementById('exercise-animation-area'));

        // Timer
        if (exercise.type === 'timed') {
            document.getElementById('timer-text').textContent = this.formatTime(exercise.duration);
            document.getElementById('exercise-reps').textContent = `Duration: ${this.formatTime(exercise.duration)}`;
        } else {
            document.getElementById('timer-text').textContent = `${exercise.reps}`;
            document.getElementById('exercise-reps').textContent = `Target: ${exercise.reps} reps`;
        }

        // Instructions
        document.getElementById('exercise-instructions').innerHTML = `
            <h4>How To Do It</h4>
            <ol>${exercise.instructions.map(inst => `<li>${inst}</li>`).join('')}</ol>
        `;

        // Tips
        document.getElementById('exercise-tips').innerHTML = `
            <h4>💡 Pro Tips</h4>
            <ul>${exercise.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
        `;

        // Reset controls
        document.getElementById('exercise-start-btn').textContent = '▶ START';
        document.getElementById('exercise-start-btn').onclick = () => this.startExercise();
        document.getElementById('rep-counter-controls').classList.add('hidden');
        this.state.exerciseReps = 0;
        document.getElementById('rep-current').textContent = '0';

        // Reset timer visual
        document.getElementById('timer-fill').style.strokeDashoffset = 0;

        // Back button
        document.getElementById('exercise-back-btn').onclick = () => {
            this.stopExerciseTimer();
            this.navigateTo('drill-detail');
        };
    },

    startExercise() {
        const drill = this.state.currentDrill;
        const exercise = drill.exercises[this.state.currentExerciseIndex];
        this.state.exerciseStartTime = Date.now();

        if (exercise.type === 'timed') {
            this.startTimedExercise(exercise);
        } else {
            this.startRepExercise(exercise);
        }
    },

    startTimedExercise(exercise) {
        let remaining = exercise.duration;
        const total = exercise.duration;
        const circumference = 2 * Math.PI * 45;

        document.getElementById('exercise-start-btn').textContent = '⏸ PAUSE';
        document.getElementById('exercise-start-btn').onclick = () => this.togglePause();

        this.state.timerPaused = false;

        this.state.exerciseTimer = setInterval(() => {
            if (this.state.timerPaused) return;

            remaining--;
            const progress = (total - remaining) / total;
            document.getElementById('timer-fill').style.strokeDashoffset = circumference * (1 - progress);
            document.getElementById('timer-text').textContent = this.formatTime(remaining);

            if (remaining <= 3 && remaining > 0) {
                this.vibrate(100);
            }

            if (remaining <= 0) {
                this.completeExercise();
            }
        }, 1000);
    },

    startRepExercise(exercise) {
        document.getElementById('rep-counter-controls').classList.remove('hidden');
        document.getElementById('exercise-start-btn').textContent = '✓ COMPLETE';
        document.getElementById('exercise-start-btn').onclick = () => {
            if (this.state.exerciseReps >= Math.floor(exercise.reps * 0.7)) {
                this.completeExercise();
            } else {
                this.showToast('⚠️', `Complete at least ${Math.floor(exercise.reps * 0.7)} reps`);
            }
        };
    },

    incrementRep() {
        this.state.exerciseReps++;
        document.getElementById('rep-current').textContent = this.state.exerciseReps;
        this.vibrate(30);

        const drill = this.state.currentDrill;
        const exercise = drill.exercises[this.state.currentExerciseIndex];
        if (exercise.type === 'reps' && this.state.exerciseReps >= exercise.reps) {
            this.completeExercise();
        }
    },

    decrementRep() {
        if (this.state.exerciseReps > 0) {
            this.state.exerciseReps--;
            document.getElementById('rep-current').textContent = this.state.exerciseReps;
        }
    },

    togglePause() {
        this.state.timerPaused = !this.state.timerPaused;
        document.getElementById('exercise-start-btn').textContent =
            this.state.timerPaused ? '▶ RESUME' : '⏸ PAUSE';
    },

    skipExercise() {
        this.stopExerciseTimer();
        const drill = this.state.currentDrill;

        if (this.state.currentExerciseIndex < drill.exercises.length - 1) {
            this.state.currentExerciseIndex++;
            this.renderExercise(drill.exercises[this.state.currentExerciseIndex]);
        } else {
            this.navigateTo('drill-detail');
        }
    },

    completeExercise() {
        this.stopExerciseTimer();
        const drill = this.state.currentDrill;
        const exercise = drill.exercises[this.state.currentExerciseIndex];
        const timeSpent = Math.round((Date.now() - this.state.exerciseStartTime) / 1000);

        const exerciseId = `${drill.id}-${this.state.currentExerciseIndex}`;
        if (!this.state.completedExercises.includes(exerciseId)) {
            this.state.completedExercises.push(exerciseId);
        }

        this.vibrate(200);

        // Check if all exercises in drill are done
        const allDone = drill.exercises.every((_, i) =>
            this.state.completedExercises.includes(`${drill.id}-${i}`)
        );

        if (allDone) {
            this.completeDrill(drill, timeSpent);
        } else if (this.state.currentExerciseIndex < drill.exercises.length - 1) {
            // Move to next exercise
            this.showToast('🎯', `Exercise complete! Rest ${this.state.settings.restTime}s`);

            setTimeout(() => {
                this.state.currentExerciseIndex++;
                this.renderExercise(drill.exercises[this.state.currentExerciseIndex]);
            }, this.state.settings.restTime * 1000);

            // Show rest timer on button
            let rest = this.state.settings.restTime;
            document.getElementById('exercise-start-btn').textContent = `REST: ${rest}s`;
            document.getElementById('exercise-start-btn').onclick = () => {};
            const restTimer = setInterval(() => {
                rest--;
                document.getElementById('exercise-start-btn').textContent = `REST: ${rest}s`;
                if (rest <= 0) clearInterval(restTimer);
            }, 1000);
        } else {
            this.completeDrill(drill, timeSpent);
        }
    },

    completeDrill(drill, timeSpent) {
        // Award XP
        this.addXP(drill.xp);

        // Track completion
        if (!this.state.completedDrills.includes(drill.id)) {
            this.state.completedDrills.push(drill.id);
        }
        this.state.totalDrills++;
        this.state.totalMinutes += Math.round(timeSpent / 60);

        // Category stats
        if (this.state.categoryStats[drill.category] !== undefined) {
            this.state.categoryStats[drill.category]++;
        }

        // Daily task completion
        if (this.state.dailyTasks.includes(drill.id) && !this.state.dailyTasksCompleted.includes(drill.id)) {
            this.state.dailyTasksCompleted.push(drill.id);
        }

        // Update streak
        const today = new Date().toDateString();
        if (this.state.lastTrainDate !== today) {
            this.state.streak++;
            this.state.bestStreak = Math.max(this.state.bestStreak, this.state.streak);
            this.state.lastTrainDate = today;
        }

        // Weekly activity
        const dayOfWeek = new Date().getDay();
        this.state.weeklyActivity[dayOfWeek]++;

        // Check daily completion
        if (this.state.dailyTasksCompleted.length >= this.state.settings.dailyGoal) {
            this.state.dailyComplete++;
        }

        this.checkChallenges();
        this.checkAchievements(drill, timeSpent);
        this.saveState();

        // Show completion modal
        document.getElementById('complete-xp').textContent = `+${drill.xp} XP`;
        document.getElementById('complete-time').textContent = this.formatTime(timeSpent);
        document.getElementById('complete-modal').classList.remove('hidden');

        // Reset stars
        document.querySelectorAll('.star-btn').forEach(s => s.classList.remove('active'));
    },

    startFullDrill() {
        this.state.currentExerciseIndex = 0;
        this.openExercise(0);
    },

    // ===== XP & LEVELING =====
    addXP(amount) {
        this.state.totalXP += amount;
        this.state.xp += amount;

        // Show XP pop animation
        this.showXPPop(amount);

        // Check level up
        const xpNeeded = this.getXPForNextLevel();
        while (this.state.xp >= xpNeeded && xpNeeded > 0) {
            this.state.level++;
            this.showLevelUp();
            break;
        }

        this.updateUI();
    },

    getXPForCurrentLevel() {
        return Math.floor(50 * Math.pow(this.state.level - 1, 1.5));
    },

    getXPForNextLevel() {
        return Math.floor(50 * Math.pow(this.state.level, 1.5));
    },

    getCurrentRank() {
        let rank = RANKS[0];
        for (const r of RANKS) {
            if (this.state.level >= r.level) rank = r;
        }
        return rank;
    },

    getNextRank() {
        for (const r of RANKS) {
            if (this.state.level < r.level) return r;
        }
        return RANKS[RANKS.length - 1];
    },

    showLevelUp() {
        const rank = this.getCurrentRank();
        document.getElementById('levelup-level').textContent = `Level ${this.state.level}`;
        document.getElementById('levelup-rank').textContent = rank.name;
        document.getElementById('levelup-quote').textContent = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        document.getElementById('levelup-modal').classList.remove('hidden');
        this.vibrate(300);
    },

    closeLevelUpModal() {
        document.getElementById('levelup-modal').classList.add('hidden');
    },

    showXPPop(amount) {
        const pop = document.createElement('div');
        pop.className = 'xp-pop';
        pop.textContent = `+${amount} XP`;
        pop.style.left = '50%';
        pop.style.top = '40%';
        pop.style.transform = 'translateX(-50%)';
        document.body.appendChild(pop);
        setTimeout(() => pop.remove(), 1500);
    },

    // ===== CHALLENGES =====
    renderChallenges() {
        const list = document.getElementById('challenges-list');
        list.innerHTML = '';

        const tierOrder = ['bronze', 'silver', 'gold', 'diamond'];
        const currentTier = this.getCurrentChallengeTier();
        document.getElementById('challenge-tier-label').textContent = `Current Tier: ${this.capitalize(currentTier)}`;

        CHALLENGES.forEach(ch => {
            const progress = this.getChallengeProgress(ch);
            const isCompleted = progress >= ch.target;

            const card = document.createElement('div');
            card.className = `challenge-card ${isCompleted ? 'completed' : ''}`;
            const progressPercent = Math.min((progress / ch.target) * 100, 100);

            card.innerHTML = `
                <div class="challenge-header">
                    <div class="challenge-name">${ch.icon} ${ch.name}</div>
                    <div class="challenge-reward">+${ch.reward} XP</div>
                </div>
                <div class="challenge-desc">${ch.desc}</div>
                <div class="challenge-progress-bar">
                    <div class="challenge-progress-fill" style="width:${progressPercent}%"></div>
                </div>
                <div class="challenge-progress-text">${Math.min(progress, ch.target)}/${ch.target} ${isCompleted ? '✓' : ''}</div>
            `;
            list.appendChild(card);
        });

        // Achievements
        const grid = document.getElementById('achievements-grid');
        grid.innerHTML = '';

        ACHIEVEMENTS.forEach(ach => {
            const unlocked = this.state.achievements.includes(ach.id);
            const item = document.createElement('div');
            item.className = `achievement-item ${unlocked ? 'unlocked' : ''}`;
            item.innerHTML = `
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-name">${ach.name}</div>
            `;
            if (unlocked) {
                item.onclick = () => this.showAchievementDetail(ach);
            }
            grid.appendChild(item);
        });
    },

    getChallengeProgress(challenge) {
        switch(challenge.type) {
            case 'drills': return this.state.totalDrills;
            case 'streak': return this.state.bestStreak;
            case 'xp': return this.state.totalXP;
            case 'categories': {
                const cats = new Set(this.state.completedDrills.map(id => {
                    const drill = DRILLS.find(d => d.id === id);
                    return drill ? drill.category : null;
                }).filter(Boolean));
                return cats.size;
            }
            case 'category-quick': return this.state.categoryStats.quick || 0;
            case 'category-hands-beginner': {
                const handBeginner = DRILLS.filter(d => d.category === 'hands' && d.difficulty === 'beginner');
                return handBeginner.filter(d => this.state.completedDrills.includes(d.id)).length;
            }
            case 'diff-elite': {
                const elite = DRILLS.filter(d => d.difficulty === 'elite');
                return elite.filter(d => this.state.completedDrills.includes(d.id)).length;
            }
            case 'daily-complete': return this.state.dailyComplete;
            case 'level': return this.state.level;
            default: return 0;
        }
    },

    getCurrentChallengeTier() {
        const completedByTier = { bronze: 0, silver: 0, gold: 0, diamond: 0 };
        CHALLENGES.forEach(ch => {
            if (this.getChallengeProgress(ch) >= ch.target) {
                completedByTier[ch.tier]++;
            }
        });
        if (completedByTier.gold > 0) return 'diamond';
        if (completedByTier.silver > 0) return 'gold';
        if (completedByTier.bronze > 0) return 'silver';
        return 'bronze';
    },

    checkChallenges() {
        CHALLENGES.forEach(ch => {
            const progress = this.getChallengeProgress(ch);
            const wasCompleted = this.state.challengeProgress[ch.id]?.completed;
            if (progress >= ch.target && !wasCompleted) {
                this.state.challengeProgress[ch.id] = { completed: true };
                this.addXP(ch.reward);
                this.showToast('🏆', `Challenge: ${ch.name} completed! +${ch.reward} XP`);
            }
        });
    },

    // ===== ACHIEVEMENTS =====
    checkAchievements(drill, timeSpent) {
        const checks = [
            { id: 'ach-1', condition: () => this.state.totalDrills >= 1 },
            { id: 'ach-2', condition: () => new Date().getHours() < 7 },
            { id: 'ach-3', condition: () => new Date().getHours() >= 22 },
            { id: 'ach-4', condition: () => timeSpent < 300 },
            { id: 'ach-6', condition: () => {
                const cats = new Set(this.state.completedDrills.map(id => DRILLS.find(d => d.id === id)?.category).filter(Boolean));
                return cats.size >= 5;
            }},
            { id: 'ach-7', condition: () => this.state.bestStreak >= 7 },
            { id: 'ach-8', condition: () => this.state.level >= 10 },
            { id: 'ach-9', condition: () => this.state.totalXP >= 500 },
            { id: 'ach-10', condition: () => this.state.totalDrills >= 30 },
            { id: 'ach-11', condition: () => {
                const quickDrills = DRILLS.filter(d => d.category === 'quick');
                return quickDrills.every(d => this.state.completedDrills.includes(d.id));
            }},
            { id: 'ach-12', condition: () => this.state.level >= 20 },
        ];

        checks.forEach(({ id, condition }) => {
            if (!this.state.achievements.includes(id) && condition()) {
                this.state.achievements.push(id);
                const ach = ACHIEVEMENTS.find(a => a.id === id);
                if (ach) {
                    setTimeout(() => this.showAchievementModal(ach), 1000);
                }
            }
        });
    },

    showAchievementModal(ach) {
        document.getElementById('achievement-icon-big').textContent = ach.icon;
        document.getElementById('achievement-modal-name').textContent = ach.name;
        document.getElementById('achievement-modal-desc').textContent = ach.desc;
        document.getElementById('achievement-modal').classList.remove('hidden');
        this.vibrate(200);
    },

    closeAchievementModal() {
        document.getElementById('achievement-modal').classList.add('hidden');
    },

    showAchievementDetail(ach) {
        this.showAchievementModal(ach);
    },

    // ===== STATS =====
    renderStats() {
        const rank = this.getCurrentRank();
        document.getElementById('stats-rank').textContent = rank.name;
        document.getElementById('stats-level').textContent = this.state.level;
        document.getElementById('stats-xp').textContent = this.state.totalXP;
        document.getElementById('stats-drills').textContent = this.state.totalDrills;
        document.getElementById('stats-streak').textContent = this.state.bestStreak;
        document.getElementById('stats-hours').textContent = Math.round(this.state.totalMinutes / 60 * 10) / 10;
        document.getElementById('stats-challenges').textContent =
            CHALLENGES.filter(ch => this.getChallengeProgress(ch) >= ch.target).length;

        this.renderRadarChart();
        this.renderWeeklyChart();
        this.renderMasteryBars();
    },

    renderRadarChart() {
        const canvas = document.getElementById('radar-chart');
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const r = 100;

        ctx.clearRect(0, 0, w, h);

        const categories = ['Accuracy', 'Hand Form', 'Footwork', 'Quick Sets', 'Game IQ'];
        const catKeys = ['accuracy', 'hands', 'footwork', 'quick', 'game'];
        const maxVal = Math.max(10, ...catKeys.map(k => this.state.categoryStats[k] || 0));

        // Draw rings
        for (let ring = 1; ring <= 4; ring++) {
            const rr = (r / 4) * ring;
            ctx.beginPath();
            for (let i = 0; i <= 5; i++) {
                const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
                const x = cx + rr * Math.cos(angle);
                const y = cy + rr * Math.sin(angle);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.stroke();
        }

        // Draw axes
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.stroke();

            // Labels
            const labelR = r + 20;
            const lx = cx + labelR * Math.cos(angle);
            const ly = cy + labelR * Math.sin(angle);
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.font = '10px Rajdhani';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(categories[i], lx, ly);
        }

        // Draw data
        ctx.beginPath();
        catKeys.forEach((key, i) => {
            const val = (this.state.categoryStats[key] || 0) / maxVal;
            const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
            const x = cx + r * val * Math.cos(angle);
            const y = cy + r * val * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(74, 108, 247, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#4a6cf7';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw data points
        catKeys.forEach((key, i) => {
            const val = (this.state.categoryStats[key] || 0) / maxVal;
            const angle = (Math.PI * 2 * i / 5) - Math.PI / 2;
            const x = cx + r * val * Math.cos(angle);
            const y = cy + r * val * Math.sin(angle);
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#4a6cf7';
            ctx.fill();
        });
    },

    renderWeeklyChart() {
        const container = document.getElementById('weekly-chart');
        container.innerHTML = '';
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const maxActivity = Math.max(1, ...this.state.weeklyActivity);

        days.forEach((day, i) => {
            const val = this.state.weeklyActivity[i];
            const height = Math.max(4, (val / maxActivity) * 80);
            const col = document.createElement('div');
            col.className = 'week-bar-container';
            col.innerHTML = `
                <div class="week-bar" style="height:${height}px"></div>
                <div class="week-label">${day}</div>
            `;
            container.appendChild(col);
        });
    },

    renderMasteryBars() {
        const container = document.getElementById('mastery-bars');
        container.innerHTML = '';

        const categories = [
            { key: 'accuracy', name: '🎯 Accuracy', color: '#00e676' },
            { key: 'hands', name: '🤲 Hand Form', color: '#4a6cf7' },
            { key: 'footwork', name: '👟 Footwork', color: '#ff6b35' },
            { key: 'quick', name: '⚡ Quick Sets', color: '#00d4ff' },
            { key: 'game', name: '🏐 Game IQ', color: '#ffd700' },
        ];

        categories.forEach(cat => {
            const totalInCat = DRILLS.filter(d => d.category === cat.key).length;
            const completedInCat = this.state.categoryStats[cat.key] || 0;
            const percent = totalInCat > 0 ? Math.round((completedInCat / (totalInCat * 3)) * 100) : 0;

            const item = document.createElement('div');
            item.className = 'mastery-item';
            item.innerHTML = `
                <div class="mastery-header">
                    <div class="mastery-name">${cat.name}</div>
                    <div class="mastery-percent">${Math.min(percent, 100)}%</div>
                </div>
                <div class="mastery-bar">
                    <div class="mastery-fill" style="width:${Math.min(percent, 100)}%; background:${cat.color}"></div>
                </div>
            `;
            container.appendChild(item);
        });
    },

    // ===== TRAINING PLANS =====
    renderTrainingPlan() {
        const content = document.getElementById('training-plan-content');
        const plan = TRAINING_PLANS[this.state.currentPlan];
        content.innerHTML = '';

        plan.forEach(day => {
            const el = document.createElement('div');
            el.className = 'plan-day';
            el.innerHTML = `
                <div class="plan-day-header">
                    <div class="plan-day-title">${day.day}</div>
                    <div class="plan-day-focus">${day.focus}</div>
                </div>
                ${day.drills.map(drill => `
                    <div class="plan-drill-item">
                        <div class="plan-drill-bullet"></div>
                        <span>${drill}</span>
                    </div>
                `).join('')}
            `;
            content.appendChild(el);
        });
    },

    // ===== SETTINGS =====
    loadSettings() {
        const s = this.state.settings;
        document.getElementById('setting-name').value = s.name;
        document.getElementById('setting-daily-goal').value = s.dailyGoal;
        document.getElementById('setting-difficulty').value = s.difficulty;
        document.getElementById('setting-rest').value = s.restTime;
        document.getElementById('setting-reminder-time').value = s.reminderTime;
        document.getElementById('toggle-sound').classList.toggle('active', s.sound);
        document.getElementById('toggle-vibration').classList.toggle('active', s.vibration);
        document.getElementById('toggle-reminder').classList.toggle('active', s.reminder);
    },

    toggleSetting(key) {
        this.state.settings[key] = !this.state.settings[key];
        document.getElementById(`toggle-${key}`).classList.toggle('active', this.state.settings[key]);
        this.saveState();
    },

    resetProgress() {
        if (confirm('Are you sure you want to reset ALL progress? This cannot be undone!')) {
            if (confirm('Really? All XP, levels, and achievements will be lost!')) {
                localStorage.removeItem('kageyama-setter-state');
                location.reload();
            }
        }
    },

    exportData() {
        const data = JSON.stringify(this.state, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'kageyama-setter-data.json';
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('📁', 'Data exported successfully!');
    },

    // ===== MODALS & UI =====
    closeCompleteModal() {
        document.getElementById('complete-modal').classList.add('hidden');

        const drill = this.state.currentDrill;
        if (this.state.currentExerciseIndex < drill.exercises.length - 1) {
            this.state.currentExerciseIndex++;
            this.renderExercise(drill.exercises[this.state.currentExerciseIndex]);
        } else {
            this.navigateTo('home');
        }
    },

    rateDrill(stars) {
        document.querySelectorAll('.star-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i < stars);
        });
        if (stars === 5 && !this.state.achievements.includes('ach-5')) {
            this.state.achievements.push('ach-5');
            const ach = ACHIEVEMENTS.find(a => a.id === 'ach-5');
            setTimeout(() => this.showAchievementModal(ach), 500);
        }
        this.saveState();
    },

    showToast(icon, text) {
        const toast = document.getElementById('toast');
        document.getElementById('toast-icon').textContent = icon;
        document.getElementById('toast-text').textContent = text;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Category tabs
        document.querySelectorAll('.cat-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.state.currentFilter.category = tab.dataset.cat;
                this.renderDrills();
            });
        });

        // Difficulty filter
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.state.currentFilter.difficulty = btn.dataset.diff;
                this.renderDrills();
            });
        });

        // Training plan tabs
        document.querySelectorAll('.plan-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.state.currentPlan = tab.dataset.plan;
                this.renderTrainingPlan();
            });
        });

        // Settings changes
        document.getElementById('setting-name').addEventListener('change', (e) => {
            this.state.settings.name = e.target.value;
            this.saveState();
        });
        document.getElementById('setting-daily-goal').addEventListener('change', (e) => {
            this.state.settings.dailyGoal = parseInt(e.target.value);
            this.state.dailyTasks = [];
            this.generateDailyTasks();
            this.saveState();
        });
        document.getElementById('setting-difficulty').addEventListener('change', (e) => {
            this.state.settings.difficulty = e.target.value;
            this.saveState();
        });
        document.getElementById('setting-rest').addEventListener('change', (e) => {
            this.state.settings.restTime = parseInt(e.target.value);
            this.saveState();
        });
        document.getElementById('setting-reminder-time').addEventListener('change', (e) => {
            this.state.settings.reminderTime = e.target.value;
            this.saveState();
        });
    },

    // ===== UTILITIES =====
    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    },

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    vibrate(ms) {
        if (this.state.settings.vibration && navigator.vibrate) {
            navigator.vibrate(ms);
        }
    },

    stopExerciseTimer() {
        if (this.state.exerciseTimer) {
            clearInterval(this.state.exerciseTimer);
            this.state.exerciseTimer = null;
        }
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => app.init());
