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

// Resource gathering functions
function gatherWood() {
    const amount = Math.floor(Math.random() * gameState.skills.woodcutting) + 1;
    gameState.resources.wood += amount;
    gameState.skills.woodcutting += 0.1;
    updateUI();
}

function mineStone() {
    const amount = Math.floor(Math.random() * gameState.skills.mining) + 1;
    gameState.resources.stone += amount;
    gameState.skills.mining += 0.1;
    updateUI();
}

function mineIron() {
    if (gameState.skills.mining >= 5) {
        const amount = Math.floor(Math.random() * (gameState.skills.mining / 2)) + 1;
        gameState.resources.iron += amount;
        gameState.skills.mining += 0.2;
        updateUI();
    } else {
        alert("You need a mining skill of 5 to mine iron!");
    }
}

function gatherClay() {
    const amount = Math.floor(Math.random() * gameState.skills.foraging) + 1;
    gameState.resources.clay += amount;
    gameState.skills.foraging += 0.1;
    updateUI();
}

function mineCopper() {
    if (gameState.skills.mining >= 3) {
        const amount = Math.floor(Math.random() * (gameState.skills.mining / 1.5)) + 1;
        gameState.resources.copper += amount;
        gameState.skills.mining += 0.15;
        updateUI();
    } else {
        alert("You need a mining skill of 3 to mine copper!");
    }
}

function gatherFood() {
    const amount = Math.floor(Math.random() * gameState.skills.farming) + 1;
    gameState.resources.food += amount;
    gameState.skills.farming += 0.1;
    updateUI();
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
