// Game state
const gameState = {
    resources: {
        wood: 0,
        stone: 0,
        iron: 0,
        clay: 0,
        copper: 0,
        food: 0
    },
    skills: {
        woodcutting: 1,
        mining: 1,
        foraging: 1,
        farming: 1
    },
    actions: {
        wood: { inProgress: false, timer: null },
        stone: { inProgress: false, timer: null },
        iron: { inProgress: false, timer: null },
        clay: { inProgress: false, timer: null },
        copper: { inProgress: false, timer: null },
        food: { inProgress: false, timer: null }
    },
    stamina: {
        current: 100,
        max: 100,
        regenRate: 1, // 1 stamina per second
        lastUpdate: Date.now()
    }
};

// Helper function to update UI
function updateUI() {
    for (const resource in gameState.resources) {
        document.getElementById(resource).textContent = gameState.resources[resource].toFixed(1);
    }
    for (const skill in gameState.skills) {
        document.getElementById(skill).textContent = gameState.skills[skill].toFixed(1);
    }
    updateStaminaUI();
}

// Function to update stamina UI
function updateStaminaUI() {
    const staminaElement = document.getElementById('stamina');
    staminaElement.textContent = `${gameState.stamina.current.toFixed(1)} / ${gameState.stamina.max}`;
    const staminaBar = document.getElementById('staminaBar');
    staminaBar.style.width = `${(gameState.stamina.current / gameState.stamina.max) * 100}%`;
}

// Function to regenerate stamina
function regenerateStamina() {
    const now = Date.now();
    const timePassed = (now - gameState.stamina.lastUpdate) / 1000; // Convert to seconds
    gameState.stamina.current = Math.min(gameState.stamina.current + timePassed * gameState.stamina.regenRate, gameState.stamina.max);
    gameState.stamina.lastUpdate = now;
    updateStaminaUI();
}

// Function to calculate skill increase
function calculateSkillIncrease(currentSkill) {
    if (currentSkill >= 100) return 0;
    
    let baseIncrease = 0.1;
    
    if (currentSkill >= 90) {
        return baseIncrease / 100; // 10 times slower after 90
    } else if (currentSkill >= 40) {
        // Gradually decrease skill gain from 40 to 90
        let factor = 1 - (currentSkill - 40) / 50;
        return baseIncrease * Math.max(factor, 0.1); // Ensure it's never less than 1/10th of base
    }
    
    return baseIncrease;
}

// Generic resource gathering function
function gatherResource(resource, skill) {
    if (gameState.actions[resource].inProgress) return; // If action is already in progress, do nothing
    
    regenerateStamina(); // Regenerate stamina before checking
    
    if (gameState.stamina.current < 10) {
        alert("Not enough stamina! Wait for it to regenerate.");
        return;
    }

    gameState.stamina.current -= 10; // Decrease stamina
    updateStaminaUI();

    gameState.actions[resource].inProgress = true;
    const button = document.getElementById('gather' + resource.charAt(0).toUpperCase() + resource.slice(1));
    button.disabled = true;

    const progressBar = document.getElementById(resource + 'Progress');
    progressBar.style.display = 'block';

    let progress = 0;
    const intervalId = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress / 30 * 100}%`;
        button.textContent = `Gathering... (${3 - Math.floor(progress / 10)}s)`;
    }, 100);

    gameState.actions[resource].timer = setTimeout(() => {
        clearInterval(intervalId);
        gameState.resources[resource] += 1;
        let skillIncrease = calculateSkillIncrease(gameState.skills[skill]);
        gameState.skills[skill] = Math.min(gameState.skills[skill] + skillIncrease, 100);
        gameState.actions[resource].inProgress = false;
        button.disabled = false;
        button.textContent = 'Gather ' + resource.charAt(0).toUpperCase() + resource.slice(1);
        progressBar.style.width = '0%';
        progressBar.style.display = 'none';
        updateUI();
    }, 3000);
}

// Resource gathering functions
function gatherWood() {
    gatherResource('wood', 'woodcutting');
}

function gatherStone() {  // Changed from mineStone to gatherStone
    gatherResource('stone', 'mining');
}

function gatherIron() {  // Changed from mineIron to gatherIron
    if (gameState.skills.mining >= 5) {
        gatherResource('iron', 'mining');
    } else {
        alert("You need a mining skill of 5 to mine iron!");
    }
}

function gatherClay() {
    gatherResource('clay', 'foraging');
}

function gatherCopper() {  // Changed from mineCopper to gatherCopper
    if (gameState.skills.mining >= 3) {
        gatherResource('copper', 'mining');
    } else {
        alert("You need a mining skill of 3 to mine copper!");
    }
}

function gatherFood() {
    gatherResource('food', 'farming');
}

// Initialize UI
updateUI();

// Add event listeners to buttons
document.getElementById('gatherWood').addEventListener('click', gatherWood);
document.getElementById('gatherStone').addEventListener('click', gatherStone);  // Changed from mineStone to gatherStone
document.getElementById('gatherIron').addEventListener('click', gatherIron);  // Changed from mineIron to gatherIron
document.getElementById('gatherClay').addEventListener('click', gatherClay);
document.getElementById('gatherCopper').addEventListener('click', gatherCopper);  // Changed from mineCopper to gatherCopper
document.getElementById('gatherFood').addEventListener('click', gatherFood);

// Start stamina regeneration
setInterval(regenerateStamina, 1000); // Update stamina every second
