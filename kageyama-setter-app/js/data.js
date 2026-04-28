/* ===== KAGEYAMA SETTER APP - DATA ===== */

const RANKS = [
    { level: 1, name: "Beginner Setter", icon: "🏐", xpRequired: 0 },
    { level: 3, name: "Junior Setter", icon: "🎯", xpRequired: 150 },
    { level: 5, name: "Varsity Setter", icon: "⭐", xpRequired: 400 },
    { level: 8, name: "Ace Setter", icon: "🔥", xpRequired: 800 },
    { level: 12, name: "Elite Setter", icon: "💎", xpRequired: 1500 },
    { level: 16, name: "Master Setter", icon: "👑", xpRequired: 2800 },
    { level: 20, name: "King of the Court", icon: "🏆", xpRequired: 5000 },
];

const QUOTES = [
    "\"There's no guarantee that the weapon you have now will always be your strongest.\"",
    "\"The last ones standing are the strongest.\"",
    "\"Talent is something you bloom, instinct is something you polish.\"",
    "\"Being the best decoy ever is as cool as being the ace.\"",
    "\"If you're going to hit it, hit it until it breaks.\"",
    "\"The view from the summit is something you earn.\"",
    "\"As long as I'm here, you're invincible.\"",
    "\"I'll toss to whoever is in the best position to score.\"",
    "\"A setter's job is to bring out 100% of a spiker's ability.\"",
    "\"Your sets should arrive like they're inevitable.\"",
    "\"The difference between a good setter and a great one is 1000 sets a day.\"",
    "\"Read the block, read the hitters, be one step ahead.\"",
];

const DRILLS = [
    // ===== ACCURACY DRILLS =====
    {
        id: "acc-1",
        name: "Wall Target Sets",
        category: "accuracy",
        difficulty: "beginner",
        duration: 10,
        xp: 20,
        description: "Set the ball against a wall aiming for a specific spot. This foundational drill builds consistent hand contact and directional control.",
        exercises: [
            {
                name: "Basic Wall Set",
                type: "reps",
                reps: 30,
                duration: 0,
                animation: "wall-set",
                instructions: [
                    "Stand 3 feet from a wall",
                    "Mark a target spot at head height",
                    "Set the ball to hit the target",
                    "Catch and repeat with consistent hand position",
                    "Focus on clean, even contact with both hands"
                ],
                tips: ["Keep your thumbs and forefingers forming a triangle", "Use your legs, not just arms", "Watch the ball into your hands"]
            },
            {
                name: "Moving Target Sets",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "moving-target",
                instructions: [
                    "Mark 3 targets on the wall at different heights",
                    "Alternate setting to each target in sequence",
                    "Maintain proper form throughout",
                    "Focus on adjusting power for different distances"
                ],
                tips: ["Stay on the balls of your feet", "Adjust your body position, not just your arms", "Keep hands above forehead level"]
            },
            {
                name: "One-Knee Sets",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "knee-set",
                instructions: [
                    "Kneel on one knee facing the wall",
                    "Set the ball to the target using only upper body",
                    "Switch knees after 10 reps",
                    "This isolates your hand and arm technique"
                ],
                tips: ["This removes leg drive — focus purely on hand contact", "Keep wrists firm but flexible", "Follow through toward the target"]
            }
        ]
    },
    {
        id: "acc-2",
        name: "Partner Precision",
        category: "accuracy",
        difficulty: "intermediate",
        duration: 15,
        xp: 35,
        description: "Work with a partner or use markers to develop pinpoint setting accuracy to specific zones on the court.",
        exercises: [
            {
                name: "Cone Target Setting",
                type: "reps",
                reps: 25,
                duration: 0,
                animation: "cone-target",
                instructions: [
                    "Place 4 cones at different positions on the court",
                    "Have a partner toss the ball to you",
                    "Set the ball to land on or near each cone",
                    "Partner calls out which cone before each set"
                ],
                tips: ["Square your shoulders to the target", "Use your platform to direct the ball", "React quickly to the call"]
            },
            {
                name: "Zone Setting",
                type: "timed",
                reps: 0,
                duration: 180,
                animation: "zone-set",
                instructions: [
                    "Divide the net into left, middle, and right zones",
                    "Receive tosses from different angles",
                    "Alternate setting to each zone",
                    "Count successful zone hits"
                ],
                tips: ["Face your hips toward the target zone", "Consistent hand position regardless of target", "Extend fully through the ball"]
            },
            {
                name: "Back Set Accuracy",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "back-set",
                instructions: [
                    "Face away from the target",
                    "Receive the ball and set backwards over your head",
                    "Arch your back slightly and push through with your legs",
                    "Focus on consistent height and placement"
                ],
                tips: ["Arch your back, don't just throw your hands back", "Use your wrists to direct the ball", "The ball should travel in a high arc"]
            }
        ]
    },
    {
        id: "acc-3",
        name: "Blind Spot Elimination",
        category: "accuracy",
        difficulty: "advanced",
        duration: 20,
        xp: 50,
        description: "Advanced accuracy drills that force you to set from awkward positions and angles, eliminating weak spots in your setting range.",
        exercises: [
            {
                name: "Off-Balance Sets",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "off-balance",
                instructions: [
                    "Partner tosses balls slightly off-target",
                    "Move to get under the ball",
                    "Set accurately even from imperfect position",
                    "Focus on adjusting body mid-flight"
                ],
                tips: ["Get your feet there first", "Even off-balance, present your hands properly", "Better to take an extra step than set off-platform"]
            },
            {
                name: "Jump Set Precision",
                type: "reps",
                reps: 15,
                duration: 0,
                animation: "jump-set",
                instructions: [
                    "Jump and set the ball at the peak of your jump",
                    "Aim for specific targets each time",
                    "Land balanced and ready to move",
                    "Increase speed progressively"
                ],
                tips: ["Time your jump with the ball's descent", "Set at the highest point", "Keep core tight for stability in the air"]
            },
            {
                name: "Rapid Direction Changes",
                type: "timed",
                reps: 0,
                duration: 120,
                animation: "direction-change",
                instructions: [
                    "Receive continuous tosses",
                    "Alternate setting left, right, and back",
                    "Partner calls direction just before you contact the ball",
                    "No pauses between sets"
                ],
                tips: ["Stay in an athletic ready position", "React with your whole body, not just hands", "Keep your platform stable regardless of direction"]
            }
        ]
    },

    // ===== HAND FORM DRILLS =====
    {
        id: "hand-1",
        name: "Diamond Hands",
        category: "hands",
        difficulty: "beginner",
        duration: 8,
        xp: 15,
        description: "Build the perfect setter hand shape. Kageyama's precise hand contact starts with mastering the fundamental hand position.",
        exercises: [
            {
                name: "Static Hold Practice",
                type: "timed",
                reps: 0,
                duration: 60,
                animation: "hand-form",
                instructions: [
                    "Form the setter hand shape — thumbs and forefingers create a triangle",
                    "Hold a volleyball in setting position above your forehead",
                    "Maintain perfect form for the full duration",
                    "Fingers spread, wrists cocked back"
                ],
                tips: ["Ball should sit evenly in both hands", "Only pads of fingers touch the ball", "Elbows out at about 45 degrees"]
            },
            {
                name: "Self Toss & Catch",
                type: "reps",
                reps: 40,
                duration: 0,
                animation: "self-toss",
                instructions: [
                    "Toss ball straight up 1-2 feet",
                    "Catch in perfect setter hand position",
                    "Hold for 1 second to verify form",
                    "Release and repeat"
                ],
                tips: ["Ball should make minimal sound on contact", "Equal pressure from both hands", "Keep eyes on the ball into your hands"]
            },
            {
                name: "Finger Push-ups",
                type: "reps",
                reps: 15,
                duration: 0,
                animation: "finger-pushup",
                instructions: [
                    "Get in push-up position on your fingertips",
                    "Lower slowly and push back up",
                    "Spread fingers in setter shape",
                    "Do from knees if needed"
                ],
                tips: ["This builds finger strength essential for clean sets", "Don't let fingers collapse", "Start with knees down if needed"]
            }
        ]
    },
    {
        id: "hand-2",
        name: "Soft Touch Training",
        category: "hands",
        difficulty: "intermediate",
        duration: 12,
        xp: 30,
        description: "Develop the 'soft hands' that elite setters are known for. Control the ball's spin and trajectory with finesse.",
        exercises: [
            {
                name: "No-Spin Sets",
                type: "reps",
                reps: 30,
                duration: 0,
                animation: "no-spin",
                instructions: [
                    "Set the ball with zero spin",
                    "Focus on even pressure from all 10 fingers",
                    "The ball should float cleanly without rotation",
                    "Start close to the wall and gradually increase distance"
                ],
                tips: ["Even contact = no spin", "Release with a flick, not a push", "Watch for ball rotation and adjust"]
            },
            {
                name: "Tennis Ball Sets",
                type: "reps",
                reps: 25,
                duration: 0,
                animation: "tennis-ball",
                instructions: [
                    "Use a tennis ball instead of a volleyball",
                    "Set against a wall maintaining proper form",
                    "The smaller ball forces precise finger placement",
                    "Keep proper triangle hand shape"
                ],
                tips: ["Smaller ball = more finger precision needed", "Don't squeeze — let the ball sit in your fingertips", "Great for off-court practice"]
            },
            {
                name: "Eyes Closed Sets",
                type: "reps",
                reps: 15,
                duration: 0,
                animation: "eyes-closed",
                instructions: [
                    "Stand close to a wall (2 feet away)",
                    "Close your eyes and set the ball",
                    "Feel the ball contact and rely on muscle memory",
                    "Open eyes between sets to check positioning"
                ],
                tips: ["Develops kinesthetic awareness", "Trust your hand shape", "Start very close to the wall for safety"]
            }
        ]
    },
    {
        id: "hand-3",
        name: "Iron Fingers",
        category: "hands",
        difficulty: "advanced",
        duration: 15,
        xp: 45,
        description: "Strengthen your fingers and wrists for powerful, controlled sets even under fatigue. A setter's hands are their most important tool.",
        exercises: [
            {
                name: "Weighted Ball Sets",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "weighted-set",
                instructions: [
                    "Use a heavier ball (medicine ball or weighted volleyball)",
                    "Perform sets against a wall",
                    "Maintain perfect form despite the extra weight",
                    "Focus on full finger extension on release"
                ],
                tips: ["Use legs MORE with heavier ball", "Don't sacrifice form for power", "Builds endurance for long matches"]
            },
            {
                name: "Rapid Fire Setting",
                type: "timed",
                reps: 0,
                duration: 60,
                animation: "rapid-fire",
                instructions: [
                    "Set the ball as quickly as possible against the wall",
                    "Minimize time between contacts",
                    "Maintain hand shape under speed pressure",
                    "Count total sets in 60 seconds"
                ],
                tips: ["Speed should NOT compromise form", "Quick wrists, stable platform", "Try to beat your record each time"]
            },
            {
                name: "One-Hand Strength Sets",
                type: "reps",
                reps: 15,
                duration: 0,
                animation: "one-hand",
                instructions: [
                    "Set the ball using only one hand at a time",
                    "Alternate hands every 5 reps",
                    "Maintain control and direction with one hand",
                    "This builds individual hand strength"
                ],
                tips: ["Keep wrist strong", "Use fingers, not palm", "This is an advanced drill — start with light tosses"]
            }
        ]
    },

    // ===== FOOTWORK DRILLS =====
    {
        id: "foot-1",
        name: "Setter Shuffle",
        category: "footwork",
        difficulty: "beginner",
        duration: 10,
        xp: 20,
        description: "Master the basic footwork patterns every setter needs. Quick feet = better positioning = better sets.",
        exercises: [
            {
                name: "Base Position Drill",
                type: "timed",
                reps: 0,
                duration: 60,
                animation: "base-position",
                instructions: [
                    "Start in athletic position — feet shoulder-width, knees bent",
                    "Shuffle right 3 steps, then left 3 steps",
                    "Stay low and maintain balance throughout",
                    "Quick, short steps — never cross your feet"
                ],
                tips: ["Stay on the balls of your feet", "Hips low, chest up", "Imagine you're always ready to set"]
            },
            {
                name: "Sprint to Set Position",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "sprint-set",
                instructions: [
                    "Start at the back line of the court",
                    "Sprint to the setter position near the net",
                    "Plant feet and get into setting position",
                    "Hold position for 2 seconds, then jog back"
                ],
                tips: ["Decelerate with small choppy steps", "Square up to your target before the ball arrives", "Last two steps should be right-left (for right-handers)"]
            },
            {
                name: "Ladder Quick Feet",
                type: "timed",
                reps: 0,
                duration: 90,
                animation: "ladder-feet",
                instructions: [
                    "Use an agility ladder or mark spaces on the ground",
                    "Perform in-out steps through the ladder",
                    "Then do lateral shuffles",
                    "Then single-foot hops"
                ],
                tips: ["Light on your feet", "Pump your arms for balance", "Look up, not down at your feet"]
            }
        ]
    },
    {
        id: "foot-2",
        name: "Court Coverage",
        category: "footwork",
        difficulty: "intermediate",
        duration: 15,
        xp: 35,
        description: "Advanced footwork for covering the entire court and getting to every ball. A setter must cover more ground than any other player.",
        exercises: [
            {
                name: "Star Pattern Movement",
                type: "reps",
                reps: 10,
                duration: 0,
                animation: "star-pattern",
                instructions: [
                    "Place markers in a star pattern around the setter position",
                    "Start in the center",
                    "Move to each point and back to center",
                    "Complete full star pattern = 1 rep"
                ],
                tips: ["Change direction explosively", "Always face the net when possible", "Use crossover steps for longer distances"]
            },
            {
                name: "React & Set",
                type: "timed",
                reps: 0,
                duration: 120,
                animation: "react-set",
                instructions: [
                    "Partner points in random directions",
                    "Sprint to that direction (2-3 steps)",
                    "Get into setting position",
                    "Set an imaginary ball, then return to start"
                ],
                tips: ["React to the point, not the voice", "Quick first step wins", "Decelerate under control"]
            },
            {
                name: "Transition Footwork",
                type: "reps",
                reps: 15,
                duration: 0,
                animation: "transition",
                instructions: [
                    "Start in defensive position (back row)",
                    "Sprint forward to setter position",
                    "Open up to the court (face left side attacker)",
                    "Set, then backpedal to defense position"
                ],
                tips: ["This simulates real game transitions", "Open your hips as you approach the net", "Stay low during transitions"]
            }
        ]
    },
    {
        id: "foot-3",
        name: "Speed Demon Sets",
        category: "footwork",
        difficulty: "elite",
        duration: 20,
        xp: 60,
        description: "Elite-level footwork that separates good setters from great ones. Kageyama-level speed and precision.",
        exercises: [
            {
                name: "Three-Ball Rapid Movement",
                type: "reps",
                reps: 10,
                duration: 0,
                animation: "three-ball",
                instructions: [
                    "Place 3 balls at different positions on the court",
                    "Sprint to ball 1, set it, sprint to ball 2, set it, sprint to ball 3",
                    "No walking — full speed between each",
                    "Partner catches each set and evaluates accuracy"
                ],
                tips: ["This simulates back-to-back plays", "Recovery between sets is key", "Don't sacrifice set quality for speed"]
            },
            {
                name: "Setter Block-Set Combo",
                type: "reps",
                reps: 12,
                duration: 0,
                animation: "block-set",
                instructions: [
                    "Start at the net in blocking position",
                    "Jump to simulate a block",
                    "Land and immediately transition to setter position",
                    "Receive a toss and set accurately"
                ],
                tips: ["Land on both feet balanced", "Use a quick crossover step to transition", "Keep hands ready as you move"]
            },
            {
                name: "Full Court Sprint & Set",
                type: "timed",
                reps: 0,
                duration: 180,
                animation: "full-court",
                instructions: [
                    "Sprint baseline to net, set the ball",
                    "Backpedal to mid-court, receive a free ball",
                    "Sprint back to net and set again",
                    "Continuous for 3 minutes"
                ],
                tips: ["This is a conditioning + skill drill", "Quality of sets should stay consistent", "Push through fatigue — sets in the 5th set matter most"]
            }
        ]
    },

    // ===== QUICK SET DRILLS =====
    {
        id: "quick-1",
        name: "Tempo Setting",
        category: "quick",
        difficulty: "intermediate",
        duration: 12,
        xp: 30,
        description: "Learn to vary your setting tempo. Quick sets, high sets, shoot sets — a great setter controls the tempo of every play.",
        exercises: [
            {
                name: "High-Low Alternation",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "high-low",
                instructions: [
                    "Alternate between high sets (4-meter height) and low quick sets (1-meter height)",
                    "Maintain accuracy on both types",
                    "Partner calls 'high' or 'low' before each set",
                    "Focus on adjusting power quickly"
                ],
                tips: ["High set: more legs, less wrist. Quick set: more wrist, less legs", "Release point changes with tempo", "Same hand shape for both"]
            },
            {
                name: "1-Ball Quick Set Timing",
                type: "reps",
                reps: 25,
                duration: 0,
                animation: "one-ball-quick",
                instructions: [
                    "Practice the '1' (quick/A) set to middle position",
                    "Ball should barely rise above the net",
                    "Timing with an imaginary hitter is key",
                    "Set should be fast and flat to the antenna area"
                ],
                tips: ["The quick set is about timing, not power", "Ball should be released before it reaches peak height", "Think 'redirect' not 'set'"]
            },
            {
                name: "Shoot Set Practice",
                type: "reps",
                reps: 15,
                duration: 0,
                animation: "shoot-set",
                instructions: [
                    "The shoot set travels fast and low along the net",
                    "Push the ball laterally with a quick wrist snap",
                    "Aim for 3-4 feet above the net",
                    "Ball should travel fast from center to antenna"
                ],
                tips: ["Use directional wrist action", "Body faces one direction, ball goes another", "This is a deception set — hide your intention"]
            }
        ]
    },
    {
        id: "quick-2",
        name: "Deception Master",
        category: "quick",
        difficulty: "advanced",
        duration: 18,
        xp: 50,
        description: "The art of deception — make the blockers guess wrong. Kageyama's greatest weapon is making every set look the same until the last moment.",
        exercises: [
            {
                name: "Same Platform, Different Target",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "deception",
                instructions: [
                    "Set up with the same body position every time",
                    "Partner calls target direction at the last second",
                    "Redirect the ball using only wrists and fingers",
                    "Your body should give zero clues about direction"
                ],
                tips: ["Face the same direction regardless of target", "The key is in your wrists and fingertips", "Blockers read your hips and shoulders — keep them neutral"]
            },
            {
                name: "Dump/Set Decision Drill",
                type: "timed",
                reps: 0,
                duration: 120,
                animation: "dump-set",
                instructions: [
                    "Practice reading the block and choosing to dump or set",
                    "If the block is late → dump (push over on 2nd contact)",
                    "If the block is set → set to hitter",
                    "Partner simulates block timing"
                ],
                tips: ["A good dump looks exactly like a set until the last second", "Use peripheral vision to read the block", "Change up your timing to keep blockers guessing"]
            },
            {
                name: "Back Set Fake",
                type: "reps",
                reps: 15,
                duration: 0,
                animation: "back-fake",
                instructions: [
                    "Face the left-side attacker as if setting forward",
                    "At the last moment, set backwards to right-side",
                    "Minimize body cues — same stance, same hand position",
                    "Practice the wrist flick for back sets"
                ],
                tips: ["This is Kageyama's signature move", "Your eyes should look forward even as you set back", "Sell the fake with your shoulders"]
            }
        ]
    },
    {
        id: "quick-3",
        name: "Kageyama Special",
        category: "quick",
        difficulty: "elite",
        duration: 25,
        xp: 75,
        description: "The ultimate setter drill combining speed, deception, and precision. Only attempt when you've mastered all other quick-set drills.",
        exercises: [
            {
                name: "Minus Tempo Quick",
                type: "reps",
                reps: 15,
                duration: 0,
                animation: "minus-tempo",
                instructions: [
                    "The hitter is already in the air before you set",
                    "Redirect the ball into the hitter's swing path",
                    "This requires telepathic timing",
                    "Practice with a partner jumping on a signal"
                ],
                tips: ["Trust your hitter — set the spot, not the person", "This is the fastest play in volleyball", "The ball barely touches your hands"]
            },
            {
                name: "Pipe + Slide Combo",
                type: "timed",
                reps: 0,
                duration: 180,
                animation: "pipe-slide",
                instructions: [
                    "Alternate between back-row pipe sets and slide sets",
                    "Both sets should look identical in your setup",
                    "Quick decision-making based on partner calls",
                    "Full speed, game-tempo execution"
                ],
                tips: ["Pipe goes behind you, slide goes to the right antenna", "Same body position for both", "Trust your peripheral vision"]
            },
            {
                name: "The King's Rally",
                type: "timed",
                reps: 0,
                duration: 300,
                animation: "kings-rally",
                instructions: [
                    "Continuous setting drill — 5 minutes non-stop",
                    "Receive from all angles, set to all positions",
                    "Include quicks, high sets, back sets, and dumps",
                    "No breaks — push through fatigue"
                ],
                tips: ["This simulates the final set of a crucial match", "Mental toughness matters as much as technique here", "Kageyama's endurance is legendary — match it"]
            }
        ]
    },

    // ===== GAME IQ DRILLS =====
    {
        id: "game-1",
        name: "Read & React",
        category: "game",
        difficulty: "beginner",
        duration: 10,
        xp: 20,
        description: "Develop your volleyball IQ. A great setter sees the whole court and makes the right decision before the ball even arrives.",
        exercises: [
            {
                name: "Court Vision Scan",
                type: "timed",
                reps: 0,
                duration: 60,
                animation: "court-vision",
                instructions: [
                    "Stand in setter position and scan the court",
                    "Identify: hitter positions, blocker positions, open zones",
                    "Practice calling out what you see quickly",
                    "This builds the mental habit of constant awareness"
                ],
                tips: ["A good setter sees everything before the ball arrives", "Practice this even when watching volleyball on TV", "Verbalize what you see to build the habit"]
            },
            {
                name: "Pass Quality Assessment",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "pass-assess",
                instructions: [
                    "Partner passes balls of varying quality",
                    "Call out 'perfect', 'off', or 'bad' immediately",
                    "Adjust your position based on pass quality",
                    "Set appropriately — bad pass = safe high set"
                ],
                tips: ["With a bad pass, simplify your set", "With a perfect pass, you have all options open", "Always have a plan A and plan B"]
            },
            {
                name: "Hitter Communication",
                type: "timed",
                reps: 0,
                duration: 120,
                animation: "communication",
                instructions: [
                    "Practice verbal and hand signals with partners",
                    "Call plays before the serve",
                    "Use standard setter signals (1-5 fingers for different sets)",
                    "Communication is the setter's most important skill"
                ],
                tips: ["Be loud and clear", "Make eye contact with your hitters before every play", "If in doubt, call a high outside set — it's the safest"]
            }
        ]
    },
    {
        id: "game-2",
        name: "Block Reading",
        category: "game",
        difficulty: "intermediate",
        duration: 15,
        xp: 35,
        description: "Learn to read blockers and exploit their weaknesses. The best setters make the blocking scheme irrelevant.",
        exercises: [
            {
                name: "Block Shadow Reading",
                type: "reps",
                reps: 20,
                duration: 0,
                animation: "block-read",
                instructions: [
                    "Partner stands on other side of net simulating a blocker",
                    "Read whether the blocker is cheating left or right",
                    "Set away from where the blocker is moving",
                    "Make your decision quickly — before ball arrives"
                ],
                tips: ["Watch the blocker's feet, not their hands", "If they cheat, exploit the open side", "Great setters force the blocker to guess"]
            },
            {
                name: "2v2 Setting Game",
                type: "timed",
                reps: 0,
                duration: 300,
                animation: "two-v-two",
                instructions: [
                    "Play 2v2 where you are always the setter",
                    "Focus on reading the opposing block",
                    "Vary your sets to keep the opponent guessing",
                    "Score points by smart setting, not just power"
                ],
                tips: ["Every point should have a tactical reason", "Notice patterns in the opposing block", "Slow sets when they're in position, quick sets when they're late"]
            },
            {
                name: "Rotation Awareness",
                type: "timed",
                reps: 0,
                duration: 120,
                animation: "rotation",
                instructions: [
                    "Practice transitioning through all 6 rotations",
                    "Know your responsibilities in each rotation",
                    "Practice the different footwork patterns needed for each",
                    "In rotations where you're in back row, practice defensive positioning"
                ],
                tips: ["Setter in Position 1: penetrate from back right", "Front row: you can attack too", "Know the rules about back-row setting near the net"]
            }
        ]
    },
    {
        id: "game-3",
        name: "The Genius Setter",
        category: "game",
        difficulty: "elite",
        duration: 20,
        xp: 65,
        description: "Elite game sense drills that develop the 'sixth sense' of a world-class setter. Think three plays ahead.",
        exercises: [
            {
                name: "Predictive Setting",
                type: "timed",
                reps: 0,
                duration: 180,
                animation: "predictive",
                instructions: [
                    "Before each play, predict where the pass will go",
                    "Pre-position yourself based on the prediction",
                    "Evaluate your prediction accuracy after each play",
                    "This develops anticipation skills"
                ],
                tips: ["Watch the server's target to predict the pass", "Experienced setters start moving before the pass", "Your feet should arrive before the ball"]
            },
            {
                name: "Pressure Decision Making",
                type: "timed",
                reps: 0,
                duration: 240,
                animation: "pressure-decision",
                instructions: [
                    "Simulate high-pressure scenarios (match point, deuce)",
                    "Make setting decisions with added mental pressure",
                    "Partner shouts distractions while you set",
                    "Practice maintaining focus under chaos"
                ],
                tips: ["In pressure moments, trust your training", "Stick to high-percentage sets when the stakes are high", "Breathe — controlled breathing helps decision-making"]
            },
            {
                name: "Full Game Simulation",
                type: "timed",
                reps: 0,
                duration: 600,
                animation: "game-sim",
                instructions: [
                    "Run a full mock game focusing only on setting decisions",
                    "Keep a mental log of every decision",
                    "Evaluate which decisions worked and which didn't",
                    "Debrief with teammates after the drill"
                ],
                tips: ["The best setters learn from every single play", "Note patterns that worked against specific formations", "Great setters are like quarterbacks — they manage the game"]
            }
        ]
    }
];

const TRAINING_PLANS = {
    daily: [
        {
            day: "Morning Warm-Up",
            focus: "Fundamentals",
            drills: [
                "Static Hold Practice (2 min)",
                "Self Toss & Catch (20 reps)",
                "Base Position Drill (1 min)",
                "Wall Target Sets (20 reps)",
                "Stretch & Cool Down (3 min)"
            ]
        },
        {
            day: "Afternoon Session",
            focus: "Skill Building",
            drills: [
                "Moving Target Sets (15 reps)",
                "No-Spin Sets (20 reps)",
                "Sprint to Set Position (10 reps)",
                "High-Low Alternation (15 reps)",
                "Court Vision Scan (2 min)"
            ]
        },
        {
            day: "Evening Practice",
            focus: "Game Prep",
            drills: [
                "Partner Precision Sets (15 reps)",
                "Zone Setting (3 min)",
                "React & Set (2 min)",
                "Pass Quality Assessment (10 reps)",
                "Free Practice (5 min)"
            ]
        }
    ],
    weekly: [
        { day: "Monday", focus: "Hand Form & Control", drills: ["Diamond Hands full drill", "Soft Touch Training full drill", "Wall Target Sets (50 reps)"] },
        { day: "Tuesday", focus: "Footwork & Speed", drills: ["Setter Shuffle full drill", "Court Coverage full drill", "Ladder Quick Feet (5 min)"] },
        { day: "Wednesday", focus: "Accuracy & Precision", drills: ["Wall Target Sets full drill", "Partner Precision full drill", "Zone Setting (5 min)"] },
        { day: "Thursday", focus: "Quick Sets & Tempo", drills: ["Tempo Setting full drill", "1-Ball Quick Set Timing (30 reps)", "Shoot Set Practice (20 reps)"] },
        { day: "Friday", focus: "Game Intelligence", drills: ["Read & React full drill", "Block Reading full drill", "2v2 Setting Game"] },
        { day: "Saturday", focus: "Full Integration", drills: ["Mixed drill from each category", "The King's Rally (5 min)", "Game Simulation (10 min)"] },
        { day: "Sunday", focus: "Recovery & Film", drills: ["Light stretching (10 min)", "Watch setter highlight videos", "Mental visualization (10 min)"] }
    ],
    intensive: [
        { day: "Day 1-2", focus: "Foundation Reset", drills: ["All Hand Form drills (beginner + intermediate)", "All Footwork drills (beginner)", "200 wall sets minimum"] },
        { day: "Day 3-4", focus: "Accuracy Intensive", drills: ["All Accuracy drills (all levels)", "300 targeted sets minimum", "Back set practice (100 reps)"] },
        { day: "Day 5-6", focus: "Speed & Quick Sets", drills: ["All Quick Set drills", "Tempo variations (200 reps)", "Footwork speed drills"] },
        { day: "Day 7", focus: "Competition Day", drills: ["Full game simulations", "Pressure situations", "The King's Rally (10 min, 2 rounds)"] }
    ]
};

const CHALLENGES = [
    // Bronze Tier
    { id: "ch-1", name: "First Set", desc: "Complete your first drill", target: 1, type: "drills", tier: "bronze", reward: 25, icon: "🏐" },
    { id: "ch-2", name: "Getting Started", desc: "Complete 5 drills total", target: 5, type: "drills", tier: "bronze", reward: 50, icon: "🎯" },
    { id: "ch-3", name: "3-Day Streak", desc: "Train 3 days in a row", target: 3, type: "streak", tier: "bronze", reward: 75, icon: "🔥" },
    { id: "ch-4", name: "Hand Master Beginner", desc: "Complete all beginner hand form drills", target: 1, type: "category-hands-beginner", tier: "bronze", reward: 40, icon: "🤲" },
    { id: "ch-5", name: "XP Collector", desc: "Earn 100 XP total", target: 100, type: "xp", tier: "bronze", reward: 30, icon: "⭐" },

    // Silver Tier
    { id: "ch-6", name: "Dedicated Setter", desc: "Complete 25 drills total", target: 25, type: "drills", tier: "silver", reward: 100, icon: "💪" },
    { id: "ch-7", name: "Week Warrior", desc: "Train 7 days in a row", target: 7, type: "streak", tier: "silver", reward: 150, icon: "🔥" },
    { id: "ch-8", name: "All-Rounder", desc: "Complete a drill from each category", target: 5, type: "categories", tier: "silver", reward: 120, icon: "🌟" },
    { id: "ch-9", name: "Speed Setter", desc: "Complete 3 quick set drills", target: 3, type: "category-quick", tier: "silver", reward: 100, icon: "⚡" },
    { id: "ch-10", name: "500 XP Club", desc: "Earn 500 XP total", target: 500, type: "xp", tier: "silver", reward: 80, icon: "💎" },

    // Gold Tier
    { id: "ch-11", name: "Setter Sensei", desc: "Complete 50 drills total", target: 50, type: "drills", tier: "gold", reward: 200, icon: "🥇" },
    { id: "ch-12", name: "Two-Week Warrior", desc: "Train 14 days in a row", target: 14, type: "streak", tier: "gold", reward: 250, icon: "🔥" },
    { id: "ch-13", name: "Elite Challenger", desc: "Complete 3 elite difficulty drills", target: 3, type: "diff-elite", tier: "gold", reward: 200, icon: "👑" },
    { id: "ch-14", name: "1000 XP Master", desc: "Earn 1000 XP total", target: 1000, type: "xp", tier: "gold", reward: 150, icon: "🏆" },
    { id: "ch-15", name: "Daily Grinder", desc: "Complete all daily tasks 10 times", target: 10, type: "daily-complete", tier: "gold", reward: 300, icon: "⚔️" },

    // Diamond Tier
    { id: "ch-16", name: "Century Setter", desc: "Complete 100 drills total", target: 100, type: "drills", tier: "diamond", reward: 400, icon: "💯" },
    { id: "ch-17", name: "Month of Iron", desc: "Train 30 days in a row", target: 30, type: "streak", tier: "diamond", reward: 500, icon: "🔥" },
    { id: "ch-18", name: "King of the Court", desc: "Reach Level 20 and complete all drills", target: 20, type: "level", tier: "diamond", reward: 1000, icon: "👑" },
];

const ACHIEVEMENTS = [
    { id: "ach-1", name: "First Blood", icon: "🎯", desc: "Complete your first ever drill" },
    { id: "ach-2", name: "Early Bird", icon: "🌅", desc: "Complete a drill before 7 AM" },
    { id: "ach-3", name: "Night Owl", icon: "🦉", desc: "Complete a drill after 10 PM" },
    { id: "ach-4", name: "Speed Demon", icon: "⚡", desc: "Complete a drill in under 5 minutes" },
    { id: "ach-5", name: "Perfectionist", icon: "💯", desc: "Rate a drill 5 stars" },
    { id: "ach-6", name: "Category King", icon: "👑", desc: "Complete drills from all 5 categories" },
    { id: "ach-7", name: "Week Streak", icon: "🔥", desc: "Maintain a 7-day training streak" },
    { id: "ach-8", name: "Level 10", icon: "⭐", desc: "Reach Level 10" },
    { id: "ach-9", name: "500 Club", icon: "💎", desc: "Earn 500 total XP" },
    { id: "ach-10", name: "Iron Will", icon: "🗡️", desc: "Train for 30 days total" },
    { id: "ach-11", name: "Quick Master", icon: "🏐", desc: "Complete all quick set drills" },
    { id: "ach-12", name: "Kageyama Mode", icon: "🏆", desc: "Reach Level 20 — King of the Court" },
];
