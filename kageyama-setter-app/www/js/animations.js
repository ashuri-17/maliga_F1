/* ===== EXERCISE ANIMATION ENGINE ===== */

const ExerciseAnimations = {
    createAnimation(type, container) {
        container.innerHTML = '';
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 400 260');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.maxWidth = '400px';

        switch(type) {
            case 'wall-set': this.wallSetAnimation(svg); break;
            case 'moving-target': this.movingTargetAnimation(svg); break;
            case 'knee-set': this.kneeSetAnimation(svg); break;
            case 'cone-target': this.coneTargetAnimation(svg); break;
            case 'zone-set': this.zoneSetAnimation(svg); break;
            case 'back-set': this.backSetAnimation(svg); break;
            case 'off-balance': this.offBalanceAnimation(svg); break;
            case 'jump-set': this.jumpSetAnimation(svg); break;
            case 'direction-change': this.directionChangeAnimation(svg); break;
            case 'hand-form': this.handFormAnimation(svg); break;
            case 'self-toss': this.selfTossAnimation(svg); break;
            case 'finger-pushup': this.fingerPushupAnimation(svg); break;
            case 'no-spin': this.noSpinAnimation(svg); break;
            case 'tennis-ball': this.tennisBallAnimation(svg); break;
            case 'eyes-closed': this.eyesClosedAnimation(svg); break;
            case 'weighted-set': this.weightedSetAnimation(svg); break;
            case 'rapid-fire': this.rapidFireAnimation(svg); break;
            case 'one-hand': this.oneHandAnimation(svg); break;
            case 'base-position': this.basePositionAnimation(svg); break;
            case 'sprint-set': this.sprintSetAnimation(svg); break;
            case 'ladder-feet': this.ladderFeetAnimation(svg); break;
            case 'star-pattern': this.starPatternAnimation(svg); break;
            case 'react-set': this.reactSetAnimation(svg); break;
            case 'transition': this.transitionAnimation(svg); break;
            case 'three-ball': this.threeBallAnimation(svg); break;
            case 'block-set': this.blockSetAnimation(svg); break;
            case 'full-court': this.fullCourtAnimation(svg); break;
            case 'high-low': this.highLowAnimation(svg); break;
            case 'one-ball-quick': this.oneBallQuickAnimation(svg); break;
            case 'shoot-set': this.shootSetAnimation(svg); break;
            case 'deception': this.deceptionAnimation(svg); break;
            case 'dump-set': this.dumpSetAnimation(svg); break;
            case 'back-fake': this.backFakeAnimation(svg); break;
            case 'minus-tempo': this.minusTempoAnimation(svg); break;
            case 'pipe-slide': this.pipeSlideAnimation(svg); break;
            case 'kings-rally': this.kingsRallyAnimation(svg); break;
            case 'court-vision': this.courtVisionAnimation(svg); break;
            case 'pass-assess': this.passAssessAnimation(svg); break;
            case 'communication': this.communicationAnimation(svg); break;
            case 'block-read': this.blockReadAnimation(svg); break;
            case 'two-v-two': this.twoVTwoAnimation(svg); break;
            case 'rotation': this.rotationAnimation(svg); break;
            case 'predictive': this.predictiveAnimation(svg); break;
            case 'pressure-decision': this.pressureDecisionAnimation(svg); break;
            case 'game-sim': this.gameSimAnimation(svg); break;
            default: this.defaultAnimation(svg); break;
        }

        container.appendChild(svg);
    },

    // Helper to create elements
    el(tag, attrs, parent) {
        const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (let k in attrs) e.setAttribute(k, attrs[k]);
        if (parent) parent.appendChild(e);
        return e;
    },

    // Draw court background
    drawCourt(svg, perspective = 'side') {
        const g = this.el('g', {}, svg);
        if (perspective === 'side') {
            // Floor
            this.el('rect', { x: 20, y: 200, width: 360, height: 40, fill: '#0d1b3e', rx: 4 }, g);
            // Court lines
            this.el('line', { x1: 40, y1: 200, x2: 360, y2: 200, stroke: 'rgba(255,255,255,0.2)', 'stroke-width': 1 }, g);
            // Net
            this.el('line', { x1: 200, y1: 100, x2: 200, y2: 200, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, g);
            this.el('line', { x1: 195, y1: 100, x2: 205, y2: 100, stroke: 'rgba(255,255,255,0.5)', 'stroke-width': 2 }, g);
            // Net pattern
            for (let y = 110; y < 200; y += 15) {
                this.el('line', { x1: 197, y1: y, x2: 203, y2: y, stroke: 'rgba(255,255,255,0.1)', 'stroke-width': 0.5 }, g);
            }
        } else if (perspective === 'top') {
            // Court from above
            this.el('rect', { x: 40, y: 30, width: 320, height: 200, fill: '#0d1b3e', rx: 2, stroke: 'rgba(255,255,255,0.2)', 'stroke-width': 1 }, g);
            // Center line (net)
            this.el('line', { x1: 40, y1: 130, x2: 360, y2: 130, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, g);
            // 3-meter line
            this.el('line', { x1: 40, y1: 95, x2: 360, y2: 95, stroke: 'rgba(255,255,255,0.15)', 'stroke-width': 1, 'stroke-dasharray': '5,5' }, g);
            this.el('line', { x1: 40, y1: 165, x2: 360, y2: 165, stroke: 'rgba(255,255,255,0.15)', 'stroke-width': 1, 'stroke-dasharray': '5,5' }, g);
        }
        return g;
    },

    // Draw a player figure
    drawPlayer(svg, x, y, options = {}) {
        const g = this.el('g', { transform: `translate(${x},${y})`, class: options.class || '' }, svg);
        const color = options.color || '#4a6cf7';

        // Body
        this.el('circle', { cx: 0, cy: -45, r: 10, fill: color }, g); // Head
        this.el('line', { x1: 0, y1: -35, x2: 0, y2: -5, stroke: color, 'stroke-width': 3, 'stroke-linecap': 'round' }, g); // Torso

        if (options.arms === 'up') {
            this.el('line', { x1: 0, y1: -28, x2: -12, y2: -45, stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round', class: 'player-arms' }, g);
            this.el('line', { x1: 0, y1: -28, x2: 12, y2: -45, stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round', class: 'player-arms' }, g);
        } else if (options.arms === 'setting') {
            this.el('line', { x1: 0, y1: -28, x2: -10, y2: -42, stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
            this.el('line', { x1: 0, y1: -28, x2: 10, y2: -42, stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
            // Hands
            this.el('circle', { cx: -8, cy: -44, r: 3, fill: 'none', stroke: color, 'stroke-width': 1.5 }, g);
            this.el('circle', { cx: 8, cy: -44, r: 3, fill: 'none', stroke: color, 'stroke-width': 1.5 }, g);
        } else {
            this.el('line', { x1: 0, y1: -28, x2: -15, y2: -15, stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
            this.el('line', { x1: 0, y1: -28, x2: 15, y2: -15, stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
        }

        // Legs
        this.el('line', { x1: 0, y1: -5, x2: -10, y2: 15, stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
        this.el('line', { x1: 0, y1: -5, x2: 10, y2: 15, stroke: color, 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);

        return g;
    },

    // Draw volleyball
    drawBall(svg, cx, cy, r = 10, animated = false) {
        const g = this.el('g', { class: animated ? 'anim-volleyball' : '' }, svg);
        this.el('circle', { cx, cy, r, fill: '#f5f5dc', stroke: '#ccc', 'stroke-width': 1 }, g);
        // Ball lines
        this.el('path', { d: `M${cx-r},${cy} Q${cx},${cy-r*0.5} ${cx+r},${cy}`, fill: 'none', stroke: '#ddd', 'stroke-width': 0.8 }, g);
        this.el('path', { d: `M${cx},${cy-r} Q${cx+r*0.3},${cy} ${cx},${cy+r}`, fill: 'none', stroke: '#ddd', 'stroke-width': 0.8 }, g);
        return g;
    },

    // Draw target
    drawTarget(svg, cx, cy, r = 20) {
        const g = this.el('g', {}, svg);
        this.el('circle', { cx, cy, r, fill: 'none', stroke: '#ff3d71', 'stroke-width': 2, opacity: 0.6, class: 'accuracy-ring' }, g);
        this.el('circle', { cx, cy, r: r*0.66, fill: 'none', stroke: '#ff6b35', 'stroke-width': 2, opacity: 0.6, class: 'accuracy-ring' }, g);
        this.el('circle', { cx, cy, r: r*0.33, fill: 'none', stroke: '#00e676', 'stroke-width': 2, opacity: 0.8, class: 'accuracy-ring' }, g);
        this.el('circle', { cx, cy, r: 3, fill: '#00e676' }, g);
        return g;
    },

    // Draw wall
    drawWall(svg, x = 320) {
        const g = this.el('g', {}, svg);
        this.el('rect', { x, y: 40, width: 15, height: 170, fill: '#2a2a5e', rx: 2, stroke: 'rgba(255,255,255,0.1)', 'stroke-width': 1 }, g);
        // Bricks
        for (let row = 0; row < 8; row++) {
            const offset = row % 2 === 0 ? 0 : 7;
            this.el('line', { x1: x, y1: 40 + row * 22, x2: x + 15, y2: 40 + row * 22, stroke: 'rgba(255,255,255,0.05)', 'stroke-width': 0.5 }, g);
        }
        return g;
    },

    // Draw arrow
    drawArrow(svg, x1, y1, x2, y2, color = '#00d4ff') {
        const g = this.el('g', { class: 'anim-arrows' }, svg);
        this.el('line', { x1, y1, x2, y2, stroke: color, 'stroke-width': 2, 'stroke-dasharray': '5,3' }, g);
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const headLen = 8;
        this.el('polygon', {
            points: `${x2},${y2} ${x2-headLen*Math.cos(angle-0.4)},${y2-headLen*Math.sin(angle-0.4)} ${x2-headLen*Math.cos(angle+0.4)},${y2-headLen*Math.sin(angle+0.4)}`,
            fill: color
        }, g);
        return g;
    },

    // Draw trajectory curve
    drawTrajectory(svg, x1, y1, cx, cy, x2, y2, color = '#00d4ff') {
        this.el('path', {
            d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`,
            fill: 'none', stroke: color, 'stroke-width': 2,
            'stroke-dasharray': '200', 'stroke-dashoffset': '200',
            class: 'trajectory-path'
        }, svg);
    },

    // Add label
    addLabel(svg, x, y, text, size = 11, color = 'rgba(255,255,255,0.6)') {
        this.el('text', { x, y, fill: color, 'font-size': size, 'font-family': 'Rajdhani, sans-serif', 'text-anchor': 'middle' }, svg).textContent = text;
    },

    // ===== SPECIFIC ANIMATIONS =====

    wallSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        this.drawTarget(svg, 317, 120, 15);
        this.drawPlayer(svg, 180, 195, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 180, 140, 10, true);
        this.drawTrajectory(svg, 185, 145, 250, 80, 315, 120);
        this.addLabel(svg, 200, 250, 'SET TO TARGET ON WALL');
    },

    movingTargetAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        this.drawTarget(svg, 317, 80, 12);
        this.drawTarget(svg, 317, 130, 12);
        this.drawTarget(svg, 317, 170, 12);
        this.drawPlayer(svg, 160, 195, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 160, 140, 10, true);
        this.drawArrow(svg, 175, 140, 305, 80, '#00e676');
        this.drawArrow(svg, 175, 140, 305, 130, '#ffd700');
        this.drawArrow(svg, 175, 140, 305, 170, '#ff6b35');
        this.addLabel(svg, 340, 80, '1', 14, '#00e676');
        this.addLabel(svg, 340, 130, '2', 14, '#ffd700');
        this.addLabel(svg, 340, 170, '3', 14, '#ff6b35');
        this.addLabel(svg, 200, 250, 'HIT DIFFERENT HEIGHT TARGETS');
    },

    kneeSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        this.drawTarget(svg, 317, 130, 15);
        // Kneeling player
        const g = this.el('g', { transform: 'translate(170,195)' }, svg);
        this.el('circle', { cx: 0, cy: -30, r: 10, fill: '#4a6cf7' }, g);
        this.el('line', { x1: 0, y1: -20, x2: 0, y2: 0, stroke: '#4a6cf7', 'stroke-width': 3 }, g);
        this.el('line', { x1: 0, y1: -15, x2: -10, y2: -30, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -15, x2: 10, y2: -30, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: 0, x2: -8, y2: 5, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: -8, y1: 5, x2: -15, y2: 0, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.drawBall(svg, 170, 155, 10, true);
        this.drawTrajectory(svg, 175, 155, 240, 100, 315, 130);
        this.addLabel(svg, 200, 250, 'SET FROM KNEELING POSITION');
    },

    coneTargetAnimation(svg) {
        this.drawCourt(svg, 'top');
        this.drawPlayer(svg, 200, 120, { arms: 'setting', color: '#4a6cf7' });
        // Cones
        const conePositions = [[100, 60], [300, 60], [80, 100], [320, 100]];
        conePositions.forEach(([cx, cy], i) => {
            this.el('polygon', { points: `${cx},${cy} ${cx-6},${cy+10} ${cx+6},${cy+10}`, fill: '#ff6b35', opacity: 0.8 }, svg);
            this.addLabel(svg, cx, cy - 8, `${i+1}`, 12, '#ff6b35');
        });
        this.drawBall(svg, 200, 100, 8, true);
        this.drawArrow(svg, 200, 105, 100, 65);
        this.addLabel(svg, 200, 250, 'SET TO DIFFERENT CONE POSITIONS');
    },

    zoneSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        // Net zones
        this.el('rect', { x: 40, y: 100, width: 55, height: 100, fill: 'rgba(0,230,118,0.1)', stroke: '#00e676', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.el('rect', { x: 95, y: 100, width: 55, height: 100, fill: 'rgba(74,108,247,0.1)', stroke: '#4a6cf7', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.el('rect', { x: 150, y: 100, width: 55, height: 100, fill: 'rgba(255,107,53,0.1)', stroke: '#ff6b35', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.addLabel(svg, 67, 155, 'LEFT', 10, '#00e676');
        this.addLabel(svg, 122, 155, 'MID', 10, '#4a6cf7');
        this.addLabel(svg, 177, 155, 'RIGHT', 10, '#ff6b35');
        this.drawPlayer(svg, 280, 195, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 280, 140, 10, true);
        this.addLabel(svg, 200, 250, 'SET TO DESIGNATED ZONES');
    },

    backSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawPlayer(svg, 200, 195, { arms: 'up', color: '#4a6cf7' });
        this.drawBall(svg, 200, 130, 10, true);
        this.drawTrajectory(svg, 200, 135, 260, 60, 320, 120);
        this.drawArrow(svg, 260, 60, 320, 120, '#ff6b35');
        this.drawTarget(svg, 330, 130, 12);
        this.addLabel(svg, 120, 90, 'FACE THIS WAY →', 11, 'rgba(255,255,255,0.4)');
        this.addLabel(svg, 330, 90, 'SET GOES\nBACK', 10, '#ff6b35');
        this.addLabel(svg, 200, 250, 'BACK SET - SET BEHIND YOU');
    },

    offBalanceAnimation(svg) {
        this.drawCourt(svg, 'side');
        // Off-balance player (tilted)
        const g = this.el('g', { transform: 'translate(220,195) rotate(-15)' }, svg);
        this.el('circle', { cx: 0, cy: -45, r: 10, fill: '#4a6cf7' }, g);
        this.el('line', { x1: 0, y1: -35, x2: 0, y2: -5, stroke: '#4a6cf7', 'stroke-width': 3 }, g);
        this.el('line', { x1: 0, y1: -28, x2: -10, y2: -42, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -28, x2: 10, y2: -42, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -5, x2: -10, y2: 15, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -5, x2: 10, y2: 15, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.drawBall(svg, 250, 120, 10, true);
        this.drawTrajectory(svg, 250, 120, 180, 60, 100, 120);
        this.addLabel(svg, 200, 250, 'SET ACCURATELY FROM OFF-BALANCE');
    },

    jumpSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        // Jumping player (elevated)
        const g = this.el('g', { transform: 'translate(200,160)' }, svg);
        this.el('circle', { cx: 0, cy: -45, r: 10, fill: '#4a6cf7' }, g);
        this.el('line', { x1: 0, y1: -35, x2: 0, y2: -5, stroke: '#4a6cf7', 'stroke-width': 3 }, g);
        this.el('line', { x1: 0, y1: -28, x2: -10, y2: -42, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -28, x2: 10, y2: -42, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -5, x2: -8, y2: 10, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -5, x2: 8, y2: 10, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        // Jump indicator
        this.el('line', { x1: 200, y1: 175, x2: 200, y2: 200, stroke: '#ffd700', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.addLabel(svg, 215, 190, 'JUMP', 10, '#ffd700');
        this.drawBall(svg, 200, 100, 10, true);
        this.drawTarget(svg, 100, 130, 15);
        this.drawTrajectory(svg, 200, 105, 150, 60, 100, 130);
        this.addLabel(svg, 200, 250, 'JUMP SET AT PEAK HEIGHT');
    },

    directionChangeAnimation(svg) {
        this.drawCourt(svg, 'top');
        this.drawPlayer(svg, 200, 120, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 200, 100, 8, true);
        this.drawArrow(svg, 200, 105, 80, 60, '#00e676');
        this.drawArrow(svg, 200, 105, 320, 60, '#ff6b35');
        this.drawArrow(svg, 200, 105, 200, 50, '#00d4ff');
        this.addLabel(svg, 80, 50, 'LEFT', 11, '#00e676');
        this.addLabel(svg, 320, 50, 'RIGHT', 11, '#ff6b35');
        this.addLabel(svg, 200, 42, 'BACK', 11, '#00d4ff');
        this.addLabel(svg, 200, 250, 'RAPID DIRECTION CHANGES');
    },

    handFormAnimation(svg) {
        // Close-up hands
        const g = this.el('g', { class: 'anim-hands' }, svg);
        // Two hands forming triangle
        this.el('path', { d: 'M160,140 Q170,100 200,90 Q230,100 240,140', fill: 'none', stroke: '#4a6cf7', 'stroke-width': 3, 'stroke-linecap': 'round' }, g);
        // Fingers spread
        this.el('line', { x1: 160, y1: 140, x2: 145, y2: 155, stroke: '#4a6cf7', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
        this.el('line', { x1: 165, y1: 135, x2: 148, y2: 145, stroke: '#4a6cf7', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
        this.el('line', { x1: 170, y1: 130, x2: 155, y2: 135, stroke: '#4a6cf7', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
        this.el('line', { x1: 240, y1: 140, x2: 255, y2: 155, stroke: '#4a6cf7', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
        this.el('line', { x1: 235, y1: 135, x2: 252, y2: 145, stroke: '#4a6cf7', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
        this.el('line', { x1: 230, y1: 130, x2: 245, y2: 135, stroke: '#4a6cf7', 'stroke-width': 2.5, 'stroke-linecap': 'round' }, g);
        // Triangle indicator
        this.el('path', { d: 'M180,115 L200,95 L220,115', fill: 'none', stroke: '#ffd700', 'stroke-width': 1.5, 'stroke-dasharray': '4,3' }, g);
        this.addLabel(svg, 200, 80, '△ TRIANGLE SHAPE', 12, '#ffd700');
        this.drawBall(svg, 200, 110, 15, false);
        this.addLabel(svg, 200, 200, 'PERFECT SETTER HAND FORM');
        this.addLabel(svg, 200, 220, 'Thumbs & forefingers = triangle', 10, 'rgba(255,255,255,0.4)');
    },

    selfTossAnimation(svg) {
        this.drawPlayer(svg, 200, 210, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 200, 100, 12, true);
        this.drawArrow(svg, 200, 155, 200, 115, '#ffd700');
        this.drawArrow(svg, 200, 115, 200, 155, '#00e676');
        this.addLabel(svg, 230, 125, 'TOSS UP', 11, '#ffd700');
        this.addLabel(svg, 235, 145, 'CATCH', 11, '#00e676');
        this.addLabel(svg, 200, 250, 'TOSS & CATCH IN SETTING POSITION');
    },

    fingerPushupAnimation(svg) {
        // Push-up position
        const g = this.el('g', {}, svg);
        // Body line
        this.el('line', { x1: 120, y1: 150, x2: 280, y2: 140, stroke: '#4a6cf7', 'stroke-width': 4, 'stroke-linecap': 'round' }, g);
        // Head
        this.el('circle', { cx: 280, cy: 132, r: 10, fill: '#4a6cf7' }, g);
        // Arms
        this.el('line', { x1: 250, y1: 142, x2: 250, y2: 180, stroke: '#4a6cf7', 'stroke-width': 3 }, g);
        this.el('line', { x1: 160, y1: 148, x2: 160, y2: 180, stroke: '#4a6cf7', 'stroke-width': 3 }, g);
        // Fingertips (spread)
        for (let i = 0; i < 5; i++) {
            this.el('line', { x1: 247 + i*2, y1: 180, x2: 245 + i*2, y2: 190, stroke: '#4a6cf7', 'stroke-width': 1.5 }, g);
            this.el('line', { x1: 157 + i*2, y1: 180, x2: 155 + i*2, y2: 190, stroke: '#4a6cf7', 'stroke-width': 1.5 }, g);
        }
        // Floor
        this.el('line', { x1: 60, y1: 192, x2: 340, y2: 192, stroke: 'rgba(255,255,255,0.2)', 'stroke-width': 1 }, g);
        // Up arrow
        this.el('path', { d: 'M200,145 L200,115', fill: 'none', stroke: '#00e676', 'stroke-width': 2, 'stroke-dasharray': '4,3', class: 'anim-arrows' }, g);
        this.addLabel(svg, 200, 250, 'FINGER PUSH-UPS FOR STRENGTH');
    },

    noSpinAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        this.drawPlayer(svg, 180, 195, { arms: 'setting', color: '#4a6cf7' });
        // Ball with no-spin indicator
        this.drawBall(svg, 250, 120, 12, false);
        this.el('circle', { cx: 250, cy: 120, r: 18, fill: 'none', stroke: '#00e676', 'stroke-width': 1.5, 'stroke-dasharray': '3,3', class: 'target-ring' }, svg);
        this.addLabel(svg, 250, 95, 'NO SPIN!', 12, '#00e676');
        this.drawTrajectory(svg, 185, 150, 220, 90, 310, 130);
        this.addLabel(svg, 200, 250, 'SET WITH ZERO BALL ROTATION');
    },

    tennisBallAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        this.drawPlayer(svg, 180, 195, { arms: 'setting', color: '#4a6cf7' });
        // Tennis ball (yellow, smaller)
        this.el('circle', { cx: 180, cy: 140, r: 6, fill: '#ccff00', stroke: '#99cc00', 'stroke-width': 1, class: 'anim-volleyball' }, svg);
        this.el('path', { d: 'M175,137 Q180,140 175,143', fill: 'none', stroke: '#99cc00', 'stroke-width': 0.8 }, svg);
        this.addLabel(svg, 200, 80, '🎾 TENNIS BALL = MORE PRECISION', 11, '#ccff00');
        this.addLabel(svg, 200, 250, 'USE SMALLER BALL FOR FINGER PRECISION');
    },

    eyesClosedAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        this.drawPlayer(svg, 250, 195, { arms: 'setting', color: '#4a6cf7' });
        // Closed eyes indicator
        this.el('line', { x1: 244, y1: 148, x2: 250, y2: 148, stroke: '#ffd700', 'stroke-width': 2, 'stroke-linecap': 'round' }, svg);
        this.el('line', { x1: 254, y1: 148, x2: 260, y2: 148, stroke: '#ffd700', 'stroke-width': 2, 'stroke-linecap': 'round' }, svg);
        this.addLabel(svg, 252, 135, 'EYES CLOSED', 10, '#ffd700');
        this.drawBall(svg, 252, 160, 10, true);
        this.addLabel(svg, 200, 250, 'SET WITH EYES CLOSED - FEEL THE BALL');
    },

    weightedSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        this.drawPlayer(svg, 180, 195, { arms: 'setting', color: '#4a6cf7' });
        // Heavier ball (bigger, darker)
        this.el('circle', { cx: 180, cy: 135, r: 14, fill: '#8B4513', stroke: '#654321', 'stroke-width': 2, class: 'anim-volleyball' }, svg);
        this.addLabel(svg, 180, 110, 'HEAVY', 10, '#ff6b35');
        this.addLabel(svg, 200, 250, 'WEIGHTED BALL FOR STRENGTH');
    },

    rapidFireAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        this.drawPlayer(svg, 200, 195, { arms: 'setting', color: '#4a6cf7' });
        // Multiple balls in motion
        this.drawBall(svg, 240, 100, 8, false);
        this.drawBall(svg, 270, 130, 8, false);
        this.drawBall(svg, 300, 110, 8, false);
        // Speed lines
        this.el('line', { x1: 210, y1: 145, x2: 300, y2: 110, stroke: '#ff3d71', 'stroke-width': 1, 'stroke-dasharray': '3,3', class: 'quick-flash' }, svg);
        this.addLabel(svg, 200, 70, '⚡ RAPID FIRE ⚡', 14, '#ff3d71');
        this.addLabel(svg, 200, 250, 'AS MANY SETS AS POSSIBLE IN 60s');
    },

    oneHandAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawWall(svg, 310);
        // Player with one arm up
        const g = this.el('g', { transform: 'translate(180,195)' }, svg);
        this.el('circle', { cx: 0, cy: -45, r: 10, fill: '#4a6cf7' }, g);
        this.el('line', { x1: 0, y1: -35, x2: 0, y2: -5, stroke: '#4a6cf7', 'stroke-width': 3 }, g);
        this.el('line', { x1: 0, y1: -28, x2: 12, y2: -45, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -28, x2: -15, y2: -15, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -5, x2: -10, y2: 15, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -5, x2: 10, y2: 15, stroke: '#4a6cf7', 'stroke-width': 2.5 }, g);
        this.drawBall(svg, 192, 140, 10, true);
        this.addLabel(svg, 200, 250, 'ONE-HAND SETTING FOR STRENGTH');
    },

    basePositionAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawPlayer(svg, 200, 195, { color: '#4a6cf7' });
        // Shuffle arrows
        this.drawArrow(svg, 160, 195, 100, 195, '#00e676');
        this.drawArrow(svg, 240, 195, 300, 195, '#00e676');
        this.addLabel(svg, 100, 185, 'SHUFFLE', 10, '#00e676');
        this.addLabel(svg, 300, 185, 'SHUFFLE', 10, '#00e676');
        // Stance indicators
        this.el('line', { x1: 190, y1: 210, x2: 210, y2: 210, stroke: '#ffd700', 'stroke-width': 2, 'stroke-dasharray': '3,2' }, svg);
        this.addLabel(svg, 200, 225, 'SHOULDER WIDTH', 9, '#ffd700');
        this.addLabel(svg, 200, 250, 'ATHLETIC BASE POSITION & SHUFFLES');
    },

    sprintSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        // Start position
        this.drawPlayer(svg, 80, 195, { color: 'rgba(74,108,247,0.4)' });
        // End position
        this.drawPlayer(svg, 280, 195, { arms: 'setting', color: '#4a6cf7' });
        // Sprint arrow
        this.drawArrow(svg, 110, 190, 250, 190, '#ff6b35');
        this.addLabel(svg, 170, 180, 'SPRINT →', 12, '#ff6b35');
        // Net
        this.el('line', { x1: 300, y1: 100, x2: 300, y2: 200, stroke: 'rgba(255,255,255,0.3)', 'stroke-width': 2 }, svg);
        this.addLabel(svg, 200, 250, 'SPRINT TO NET → SET POSITION');
    },

    ladderFeetAnimation(svg) {
        // Agility ladder from above
        for (let i = 0; i < 8; i++) {
            this.el('rect', { x: 160, y: 30 + i * 28, width: 80, height: 24, fill: 'none', stroke: 'rgba(255,255,255,0.3)', 'stroke-width': 1, rx: 2 }, svg);
        }
        // Footprints
        const footPositions = [[180, 50], [220, 78], [180, 106], [220, 134], [180, 162], [220, 190]];
        footPositions.forEach(([x, y], i) => {
            this.el('ellipse', { cx: x, cy: y, rx: 6, ry: 8, fill: i < 3 ? '#00e676' : '#4a6cf7', opacity: 0.6, class: 'foot-step' }, svg);
        });
        this.addLabel(svg, 200, 250, 'LADDER QUICK FEET DRILLS');
    },

    starPatternAnimation(svg) {
        this.drawCourt(svg, 'top');
        // Center position
        this.el('circle', { cx: 200, cy: 130, r: 6, fill: '#4a6cf7', class: 'position-dot' }, svg);
        // Star points
        const points = [[200, 50], [280, 90], [260, 180], [140, 180], [120, 90]];
        points.forEach(([x, y]) => {
            this.el('circle', { cx: x, cy: y, r: 4, fill: '#ff6b35' }, svg);
            this.drawArrow(svg, 200, 130, x, y, 'rgba(0,212,255,0.4)');
        });
        this.addLabel(svg, 200, 250, 'STAR PATTERN MOVEMENT DRILL');
    },

    reactSetAnimation(svg) {
        this.drawCourt(svg, 'top');
        this.drawPlayer(svg, 200, 130, { arms: 'setting', color: '#4a6cf7' });
        // Direction indicators with ?
        this.addLabel(svg, 100, 80, '👈?', 20);
        this.addLabel(svg, 300, 80, '👉?', 20);
        this.addLabel(svg, 200, 55, '👆?', 20);
        this.addLabel(svg, 200, 250, 'REACT TO RANDOM DIRECTION CALLS');
    },

    transitionAnimation(svg) {
        this.drawCourt(svg, 'side');
        // Back position (ghost)
        this.drawPlayer(svg, 320, 195, { color: 'rgba(74,108,247,0.3)' });
        // Front position
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#4a6cf7' });
        // Transition arrows
        this.drawArrow(svg, 300, 190, 200, 190, '#00e676');
        this.drawArrow(svg, 200, 195, 300, 195, '#ff6b35');
        this.addLabel(svg, 250, 180, '← ATTACK', 9, '#00e676');
        this.addLabel(svg, 250, 210, 'DEFEND →', 9, '#ff6b35');
        this.addLabel(svg, 200, 250, 'DEFENSE ↔ SETTER TRANSITION');
    },

    threeBallAnimation(svg) {
        this.drawCourt(svg, 'top');
        // Three balls
        this.drawBall(svg, 100, 80, 8);
        this.drawBall(svg, 200, 60, 8);
        this.drawBall(svg, 300, 100, 8);
        this.addLabel(svg, 100, 65, '1', 14, '#00e676');
        this.addLabel(svg, 200, 45, '2', 14, '#ffd700');
        this.addLabel(svg, 300, 85, '3', 14, '#ff6b35');
        // Sprint path
        this.el('path', { d: 'M100,90 L200,70 L300,110', fill: 'none', stroke: '#ff3d71', 'stroke-width': 2, 'stroke-dasharray': '5,3', class: 'trajectory-path' }, svg);
        this.drawPlayer(svg, 100, 105, { arms: 'setting', color: '#4a6cf7' });
        this.addLabel(svg, 200, 250, 'SPRINT BETWEEN 3 BALLS & SET EACH');
    },

    blockSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        // Blocking position (at net, jumping)
        const g1 = this.el('g', { transform: 'translate(200,140)' }, svg);
        this.el('circle', { cx: 0, cy: -45, r: 10, fill: 'rgba(74,108,247,0.4)' }, g1);
        this.el('line', { x1: 0, y1: -35, x2: 0, y2: -5, stroke: 'rgba(74,108,247,0.4)', 'stroke-width': 3 }, g1);
        this.el('line', { x1: 0, y1: -28, x2: -12, y2: -50, stroke: 'rgba(74,108,247,0.4)', 'stroke-width': 2.5 }, g1);
        this.el('line', { x1: 0, y1: -28, x2: 12, y2: -50, stroke: 'rgba(74,108,247,0.4)', 'stroke-width': 2.5 }, g1);
        this.addLabel(svg, 200, 80, 'BLOCK', 10, 'rgba(255,255,255,0.4)');
        // Arrow to setter position
        this.drawArrow(svg, 200, 170, 130, 190, '#ff6b35');
        // Setting position
        this.drawPlayer(svg, 120, 195, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 120, 145, 10, true);
        this.addLabel(svg, 200, 250, 'BLOCK → TRANSITION → SET');
    },

    fullCourtAnimation(svg) {
        this.drawCourt(svg, 'side');
        // Sprint path
        this.el('path', { d: 'M50,195 L180,195 L180,180 L320,195 L180,195', fill: 'none', stroke: '#ff3d71', 'stroke-width': 2, 'stroke-dasharray': '5,3' }, svg);
        this.drawPlayer(svg, 120, 195, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 120, 145, 10, true);
        this.addLabel(svg, 200, 70, '⏱ 3 MIN NON-STOP', 14, '#ff3d71');
        this.addLabel(svg, 200, 250, 'FULL COURT SPRINT & SET DRILL');
    },

    highLowAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawPlayer(svg, 200, 195, { arms: 'setting', color: '#4a6cf7' });
        // High set trajectory
        this.drawTrajectory(svg, 200, 150, 140, 30, 80, 120);
        this.addLabel(svg, 80, 110, 'HIGH', 12, '#00d4ff');
        // Low/quick set trajectory
        this.drawTrajectory(svg, 200, 150, 250, 110, 300, 120);
        this.addLabel(svg, 310, 115, 'QUICK', 12, '#ff6b35');
        this.drawBall(svg, 200, 140, 10, true);
        this.addLabel(svg, 200, 250, 'ALTERNATE HIGH & QUICK SETS');
    },

    oneBallQuickAnimation(svg) {
        this.drawCourt(svg, 'side');
        // Net
        this.el('line', { x1: 200, y1: 90, x2: 200, y2: 200, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, svg);
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#4a6cf7' });
        // Quick set - flat trajectory just above net
        this.drawBall(svg, 190, 95, 10, true);
        this.el('path', { d: 'M175,100 L210,92', fill: 'none', stroke: '#ff3d71', 'stroke-width': 2, class: 'quick-flash' }, svg);
        this.addLabel(svg, 215, 85, 'QUICK!', 12, '#ff3d71');
        // Hitter
        this.drawPlayer(svg, 210, 160, { arms: 'up', color: '#00e676' });
        this.addLabel(svg, 200, 250, 'QUICK (1-BALL) SET TO MIDDLE');
    },

    shootSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.el('line', { x1: 200, y1: 90, x2: 200, y2: 200, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, svg);
        this.drawPlayer(svg, 180, 195, { arms: 'setting', color: '#4a6cf7' });
        // Shoot set - fast horizontal trajectory
        this.drawBall(svg, 280, 98, 10, false);
        this.el('path', { d: 'M185,100 L280,98', fill: 'none', stroke: '#ff6b35', 'stroke-width': 2.5, 'stroke-dasharray': '200', 'stroke-dashoffset': '200', class: 'trajectory-path' }, svg);
        // Speed lines
        this.el('line', { x1: 220, y1: 96, x2: 260, y2: 97, stroke: '#ff6b35', 'stroke-width': 1, opacity: 0.5, class: 'quick-flash' }, svg);
        this.el('line', { x1: 230, y1: 102, x2: 270, y2: 101, stroke: '#ff6b35', 'stroke-width': 1, opacity: 0.5, class: 'quick-flash' }, svg);
        this.addLabel(svg, 300, 85, 'SHOOT →', 12, '#ff6b35');
        this.addLabel(svg, 200, 250, 'FAST SHOOT SET ALONG THE NET');
    },

    deceptionAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.el('line', { x1: 200, y1: 90, x2: 200, y2: 200, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, svg);
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#4a6cf7' });
        // Multiple possible directions
        this.drawArrow(svg, 175, 145, 80, 110, '#00e676');
        this.drawArrow(svg, 175, 145, 320, 110, '#ff6b35');
        this.drawArrow(svg, 175, 145, 200, 95, '#00d4ff');
        // Question mark
        this.addLabel(svg, 175, 130, '?', 24, '#ffd700');
        // Blocker confused
        this.drawPlayer(svg, 220, 180, { color: '#ff3d71' });
        this.addLabel(svg, 240, 160, '❓', 16);
        this.addLabel(svg, 200, 250, 'SAME BODY POSITION, DIFFERENT TARGETS');
    },

    dumpSetAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.el('line', { x1: 200, y1: 90, x2: 200, y2: 200, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, svg);
        this.drawPlayer(svg, 180, 195, { arms: 'setting', color: '#4a6cf7' });
        // Dump option
        this.drawTrajectory(svg, 180, 150, 195, 100, 220, 115);
        this.addLabel(svg, 230, 110, 'DUMP', 11, '#ff3d71');
        // Set option
        this.drawTrajectory(svg, 180, 150, 130, 80, 80, 120);
        this.addLabel(svg, 65, 115, 'SET', 11, '#00e676');
        this.drawBall(svg, 180, 140, 10, true);
        this.addLabel(svg, 200, 250, 'DUMP OR SET? READ THE BLOCK');
    },

    backFakeAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.el('line', { x1: 200, y1: 90, x2: 200, y2: 200, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, svg);
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#4a6cf7' });
        // Face forward
        this.drawArrow(svg, 155, 148, 100, 120, 'rgba(0,230,118,0.3)');
        this.addLabel(svg, 85, 115, 'FAKE →', 10, 'rgba(0,230,118,0.5)');
        // Ball goes back
        this.drawTrajectory(svg, 175, 145, 230, 70, 300, 110);
        this.drawBall(svg, 300, 110, 10, true);
        this.addLabel(svg, 310, 95, 'REAL!', 11, '#ff6b35');
        this.addLabel(svg, 200, 250, 'KAGEYAMA BACK SET FAKE');
    },

    minusTempoAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.el('line', { x1: 200, y1: 90, x2: 200, y2: 200, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, svg);
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#4a6cf7' });
        // Hitter already in air
        const g = this.el('g', { transform: 'translate(210,140)' }, svg);
        this.el('circle', { cx: 0, cy: -45, r: 10, fill: '#00e676' }, g);
        this.el('line', { x1: 0, y1: -35, x2: 0, y2: -5, stroke: '#00e676', 'stroke-width': 3 }, g);
        this.el('line', { x1: 0, y1: -28, x2: 15, y2: -45, stroke: '#00e676', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -5, x2: -8, y2: 10, stroke: '#00e676', 'stroke-width': 2.5 }, g);
        this.el('line', { x1: 0, y1: -5, x2: 8, y2: 10, stroke: '#00e676', 'stroke-width': 2.5 }, g);
        // Ball trajectory
        this.drawBall(svg, 195, 100, 10, true);
        this.el('path', { d: 'M195,100 L220,95', fill: 'none', stroke: '#ff3d71', 'stroke-width': 2, class: 'quick-flash' }, svg);
        this.addLabel(svg, 200, 70, '⚡ MINUS TEMPO ⚡', 12, '#ff3d71');
        this.addLabel(svg, 200, 250, 'HITTER JUMPS BEFORE THE SET');
    },

    pipeSlideAnimation(svg) {
        this.drawCourt(svg, 'top');
        this.drawPlayer(svg, 200, 100, { arms: 'setting', color: '#4a6cf7' });
        // Pipe (back row)
        this.drawArrow(svg, 200, 105, 200, 180, '#ff6b35');
        this.addLabel(svg, 215, 185, 'PIPE', 11, '#ff6b35');
        // Slide (right side)
        this.drawArrow(svg, 200, 105, 320, 90, '#00d4ff');
        this.addLabel(svg, 330, 85, 'SLIDE', 11, '#00d4ff');
        this.drawBall(svg, 200, 85, 8, true);
        this.addLabel(svg, 200, 250, 'PIPE & SLIDE COMBO SETTING');
    },

    kingsRallyAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#ffd700' });
        // Crown above player
        this.addLabel(svg, 170, 130, '👑', 24);
        // Multiple ball trajectories
        this.drawTrajectory(svg, 175, 150, 130, 60, 80, 110);
        this.drawTrajectory(svg, 175, 150, 250, 80, 310, 110);
        this.drawTrajectory(svg, 175, 150, 200, 50, 220, 95);
        this.drawBall(svg, 80, 110, 8);
        this.drawBall(svg, 310, 110, 8);
        this.drawBall(svg, 220, 95, 8);
        this.addLabel(svg, 200, 70, '👑 THE KING\'S RALLY 👑', 14, '#ffd700');
        this.addLabel(svg, 200, 250, '5 MIN NON-STOP ALL SET TYPES');
    },

    courtVisionAnimation(svg) {
        this.drawCourt(svg, 'top');
        this.drawPlayer(svg, 200, 100, { color: '#4a6cf7' });
        // Vision lines
        this.el('line', { x1: 200, y1: 90, x2: 80, y2: 60, stroke: 'rgba(0,212,255,0.3)', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.el('line', { x1: 200, y1: 90, x2: 320, y2: 60, stroke: 'rgba(0,212,255,0.3)', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.el('line', { x1: 200, y1: 90, x2: 100, y2: 160, stroke: 'rgba(0,212,255,0.3)', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.el('line', { x1: 200, y1: 90, x2: 300, y2: 160, stroke: 'rgba(0,212,255,0.3)', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        // Other players
        this.el('circle', { cx: 80, cy: 60, r: 5, fill: '#00e676', class: 'position-dot' }, svg);
        this.el('circle', { cx: 320, cy: 60, r: 5, fill: '#00e676', class: 'position-dot' }, svg);
        this.el('circle', { cx: 100, cy: 160, r: 5, fill: '#ff3d71', class: 'position-dot' }, svg);
        this.el('circle', { cx: 300, cy: 160, r: 5, fill: '#ff3d71', class: 'position-dot' }, svg);
        this.addLabel(svg, 80, 50, 'HITTER', 9, '#00e676');
        this.addLabel(svg, 320, 50, 'HITTER', 9, '#00e676');
        this.addLabel(svg, 100, 175, 'BLOCKER', 9, '#ff3d71');
        this.addLabel(svg, 300, 175, 'BLOCKER', 9, '#ff3d71');
        this.addLabel(svg, 200, 250, 'SCAN THE COURT - SEE EVERYTHING');
    },

    passAssessAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawPlayer(svg, 200, 195, { arms: 'setting', color: '#4a6cf7' });
        // Good pass
        this.drawBall(svg, 200, 130, 8);
        this.addLabel(svg, 220, 125, 'PERFECT', 10, '#00e676');
        // Off pass
        this.drawBall(svg, 120, 140, 8);
        this.addLabel(svg, 120, 125, 'OFF', 10, '#ffd700');
        // Bad pass
        this.drawBall(svg, 310, 170, 8);
        this.addLabel(svg, 310, 155, 'BAD', 10, '#ff3d71');
        this.addLabel(svg, 200, 250, 'ASSESS PASS QUALITY → ADJUST SET');
    },

    communicationAnimation(svg) {
        this.drawCourt(svg, 'top');
        this.drawPlayer(svg, 200, 100, { color: '#4a6cf7' });
        // Speech bubbles / hand signals
        this.el('rect', { x: 215, y: 70, width: 50, height: 20, rx: 8, fill: 'rgba(74,108,247,0.3)', stroke: '#4a6cf7', 'stroke-width': 1 }, svg);
        this.addLabel(svg, 240, 84, '✌️ = 2', 10, 'white');
        // Teammate positions
        this.el('circle', { cx: 80, cy: 80, r: 5, fill: '#00e676' }, svg);
        this.el('circle', { cx: 320, cy: 80, r: 5, fill: '#00e676' }, svg);
        this.el('circle', { cx: 200, cy: 60, r: 5, fill: '#00e676' }, svg);
        // Communication lines
        this.el('line', { x1: 200, y1: 95, x2: 80, y2: 85, stroke: 'rgba(255,255,255,0.2)', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.el('line', { x1: 200, y1: 95, x2: 320, y2: 85, stroke: 'rgba(255,255,255,0.2)', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.addLabel(svg, 200, 250, 'COMMUNICATE WITH YOUR HITTERS');
    },

    blockReadAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.el('line', { x1: 200, y1: 90, x2: 200, y2: 200, stroke: 'rgba(255,255,255,0.4)', 'stroke-width': 2 }, svg);
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#4a6cf7' });
        // Blocker on other side
        this.drawPlayer(svg, 230, 180, { arms: 'up', color: '#ff3d71' });
        // Arrow showing blocker movement
        this.drawArrow(svg, 235, 170, 260, 170, '#ff3d71');
        this.addLabel(svg, 270, 165, 'BLOCK CHEATS →', 10, '#ff3d71');
        // Set away from block
        this.drawTrajectory(svg, 175, 145, 120, 70, 70, 120);
        this.addLabel(svg, 55, 115, '← SET HERE', 10, '#00e676');
        this.addLabel(svg, 200, 250, 'READ THE BLOCK, SET AWAY FROM IT');
    },

    twoVTwoAnimation(svg) {
        this.drawCourt(svg, 'top');
        // Team 1
        this.el('circle', { cx: 150, cy: 100, r: 6, fill: '#4a6cf7', class: 'position-dot' }, svg);
        this.el('circle', { cx: 250, cy: 100, r: 6, fill: '#4a6cf7' }, svg);
        this.addLabel(svg, 150, 85, 'SETTER', 9, '#4a6cf7');
        // Team 2
        this.el('circle', { cx: 150, cy: 160, r: 6, fill: '#ff3d71' }, svg);
        this.el('circle', { cx: 250, cy: 160, r: 6, fill: '#ff3d71' }, svg);
        this.drawBall(svg, 200, 110, 8, true);
        this.addLabel(svg, 200, 250, '2v2 SETTING FOCUSED GAME');
    },

    rotationAnimation(svg) {
        this.drawCourt(svg, 'top');
        // 6 positions
        const positions = [
            [120, 165, '5'], [200, 165, '6'], [280, 165, '1'],
            [280, 95, '2'], [200, 95, '3'], [120, 95, '4']
        ];
        positions.forEach(([x, y, num]) => {
            this.el('circle', { cx: x, cy: y, r: 15, fill: 'none', stroke: 'rgba(255,255,255,0.3)', 'stroke-width': 1 }, svg);
            this.addLabel(svg, x, y + 4, num, 12, 'rgba(255,255,255,0.6)');
        });
        // Setter position highlighted
        this.el('circle', { cx: 280, cy: 165, r: 15, fill: 'rgba(74,108,247,0.3)', stroke: '#4a6cf7', 'stroke-width': 2, class: 'position-dot' }, svg);
        // Rotation arrows
        this.el('path', { d: 'M135,95 L185,95 M215,95 L265,95 M280,110 L280,150 M265,165 L215,165 M185,165 L135,165 M120,150 L120,110', fill: 'none', stroke: 'rgba(255,215,0,0.3)', 'stroke-width': 1, 'stroke-dasharray': '3,3' }, svg);
        this.addLabel(svg, 200, 250, 'KNOW YOUR ROLE IN ALL 6 ROTATIONS');
    },

    predictiveAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#4a6cf7' });
        // Brain/thought indicator
        this.el('circle', { cx: 170, cy: 130, r: 20, fill: 'none', stroke: '#ffd700', 'stroke-width': 1, 'stroke-dasharray': '3,3', class: 'target-ring' }, svg);
        this.addLabel(svg, 170, 135, '🧠', 18);
        // Predicted pass location
        this.el('circle', { cx: 280, cy: 160, r: 12, fill: 'none', stroke: '#00e676', 'stroke-width': 1.5, 'stroke-dasharray': '4,4', class: 'target-ring' }, svg);
        this.addLabel(svg, 280, 145, 'PREDICT', 10, '#00e676');
        this.drawBall(svg, 310, 100, 8, true);
        this.drawTrajectory(svg, 310, 105, 295, 130, 280, 160);
        this.addLabel(svg, 200, 250, 'PREDICT WHERE THE PASS WILL GO');
    },

    pressureDecisionAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawPlayer(svg, 170, 195, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 170, 140, 10, true);
        // Pressure indicators
        this.addLabel(svg, 200, 50, '⚠️ MATCH POINT ⚠️', 14, '#ff3d71');
        this.addLabel(svg, 200, 70, 'CROWD IS LOUD', 10, '#ff6b35');
        // Decision arrows
        this.drawArrow(svg, 175, 145, 80, 110, '#00e676');
        this.drawArrow(svg, 175, 145, 300, 110, '#00d4ff');
        this.addLabel(svg, 70, 100, 'SAFE', 10, '#00e676');
        this.addLabel(svg, 310, 100, 'RISK', 10, '#00d4ff');
        this.addLabel(svg, 200, 250, 'MAKE THE RIGHT CALL UNDER PRESSURE');
    },

    gameSimAnimation(svg) {
        this.drawCourt(svg, 'top');
        // Full team positions
        const team1 = [[80, 80], [200, 70], [300, 80], [100, 110], [200, 110], [300, 110]];
        const team2 = [[80, 150], [200, 160], [300, 150], [100, 190], [200, 190], [300, 190]];
        team1.forEach(([x, y]) => this.el('circle', { cx: x, cy: y, r: 4, fill: '#4a6cf7' }, svg));
        team2.forEach(([x, y]) => this.el('circle', { cx: x, cy: y, r: 4, fill: '#ff3d71' }, svg));
        // Setter highlighted
        this.el('circle', { cx: 300, cy: 110, r: 8, fill: 'none', stroke: '#ffd700', 'stroke-width': 2, class: 'position-dot' }, svg);
        this.addLabel(svg, 320, 110, 'YOU', 10, '#ffd700');
        this.drawBall(svg, 200, 130, 8, true);
        // Scoreboard
        this.el('rect', { x: 150, y: 30, width: 100, height: 24, rx: 4, fill: 'rgba(0,0,0,0.5)', stroke: 'rgba(255,255,255,0.2)', 'stroke-width': 1 }, svg);
        this.addLabel(svg, 200, 46, '24 - 24', 12, '#ff3d71');
        this.addLabel(svg, 200, 250, 'FULL GAME SIMULATION - BE THE SETTER');
    },

    defaultAnimation(svg) {
        this.drawCourt(svg, 'side');
        this.drawPlayer(svg, 200, 195, { arms: 'setting', color: '#4a6cf7' });
        this.drawBall(svg, 200, 130, 12, true);
        this.addLabel(svg, 200, 250, 'SETTER DRILL');
    }
};
