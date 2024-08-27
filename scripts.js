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
let failedAttempts = 0;
let lockoutDuration = 0;

function submitPassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (lockoutDuration > 0) {
        errorMessage.innerText = `Too many failed attempts. Try again in ${Math.ceil(lockoutDuration / 1000)} seconds.`;
        return;
    }

    if (apologies[password]) {
        currentApologies = apologies[password].messages;
        document.getElementById('person-title').innerText = `For ${apologies[password].name}`;
        errorMessage.innerText = ''; // Clear error message
        failedAttempts = 0; // Reset failed attempts
        showSorryPage();
    } else {
        failedAttempts++;
        lockoutDuration = Math.min(30 * 1000 * (failedAttempts - 4), 10 * 60 * 1000); // Increase lockout time exponentially

        if (failedAttempts >= 5) {
            errorMessage.innerText = `Incorrect password. Try again in ${Math.ceil(lockoutDuration / 1000)} seconds.`;
            setTimeout(() => {
                lockoutDuration = 0;
                errorMessage.innerText = '';
            }, lockoutDuration);
        } else {
            errorMessage.innerText = `Incorrect password. ${5 - failedAttempts} attempt(s) remaining.`;
        }
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

function returnToLockScreen() {
    document.getElementById('sorry-page').style.display = 'none';
    document.getElementById('password-screen').style.display = 'block';
    document.getElementById('password').value = ''; // Clear the password field
    document.getElementById('main-title').innerText = "I'm sorry for..."; // Reset main title
    document.getElementById('error-message').innerText = ''; // Clear error message
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
