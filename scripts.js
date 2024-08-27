// scripts.js

// Example apologies based on passwords
const apologies = {
    "1234": {
        name: "John",
        messages: [
            "making you worry about me",
            "being late",
            "forgetting your birthday",
            "not being there for you",
            "saying something hurtful"
        ]
    },
    "5678": {
        name: "Jane",
        messages: [
            "not calling you back",
            "canceling plans",
            "not listening",
            "being distant",
            "acting selfish"
        ]
    }
};

let currentApologies = [];

function submitPassword() {
    const password = document.getElementById('password').value;
    if (apologies[password]) {
        currentApologies = apologies[password].messages;
        document.getElementById('person-title').innerText = `For ${apologies[password].name}`;
        showSorryPage();
    } else {
        alert('Incorrect password');
    }
}

function showSorryPage() {
    document.getElementById('password-screen').style.display = 'none';
    document.getElementById('sorry-page').style.display = 'block';
    generateSorryGrid();
}

function generateSorryGrid() {
    const grid = document.getElementById('sorry-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const item = document.createElement('div');
        item.className = 'sorry-item';
        item.innerText = 'sorry';
        item.onmouseover = function() {
            document.getElementById('main-title').innerText = currentApologies[i % currentApologies.length];
        };
        grid.appendChild(item);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
