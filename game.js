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
    gameState.resources[resource] += 1;
    let skillIncrease = calculateSkillIncrease(gameState.skills[skill]);
    gameState.skills[skill] = Math.min(gameState.skills[skill] + skillIncrease, 100);
    updateUI();
}

// Resource gathering functions
function gatherWood() {
    gatherResource('wood', 'woodcutting');
}

function mineStone() {
    gatherResource('stone', 'mining');
}

function mineIron() {
    if (gameState.skills.mining >= 5) {
        gatherResource('iron', 'mining');
    } else {
        alert("You need a mining skill of 5 to mine iron!");
    }
}

function gatherClay() {
    gatherResource('clay', 'foraging');
}

function mineCopper() {
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
document.getElementById('mineStone').addEventListener('click', mineStone);
document.getElementById('mineIron').addEventListener('click', mineIron);
document.getElementById('gatherClay').addEventListener('click', gatherClay);
document.getElementById('mineCopper').addEventListener('click', mineCopper);
document.getElementById('gatherFood').addEventListener('click', gatherFood);
