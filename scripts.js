// scripts.js

// The apologies
const apologies = {
    "kjc4": {
        name: "Elizabeth",
        messages: [
            "making you worry about me",
            "being a weird person",
            "being embarassing",
            "ruining your day sometimes",
            "being selfish",
            "not giving back to you",
            "all the times you got stuff for me",
            "not paying attention at times",
            "never calling you by your name",
            "being the worst person alive",
            "not giving good gifts",
            "not being appreciative enough",
            "my behaviour",
            "making my problems your problems",
            "not looking good",
            "not smelling good",
            "not feeling good",
            "my weird panic attacks",
            "being a slob",
            "not being a team player",
            "not being supportive",
            "being bad at helping others",
            "being very sus",
            "not being good at apologizing",
            "not being good at making websites",
            "being stubborn",
            "overthinking things",
            "taking you for granted",
            "interrupting you all the time",
            "annoying you all the time",
            "being too clingy",
            "being too sarcastic at times",
            "not being reliable",
            "talking too much",
            "many other things that I can't recall rn",
        ]
    },
    "qrt8": {
        name: "Denise",
        messages: [
            "being a weird person",
            "being embarassing",
            "being selfish",
            "not paying attention at times",
            "being the worst person alive",
            "not giving good gifts",
            "not being appreciative enough",
            "my behaviour",
            "making my problems your problems",
            "not looking good",
            "not smelling good",
            "not feeling good",
            "my weird panic attacks",
            "being a slob",
            "not being supportive",
            "being bad at helping others",
            "being very sus",
            "not being good at apologizing",
            "not being good at making websites",
            "being stubborn",
            "overthinking things",
            "taking you for granted",
            "interrupting you all the time",
            "annoying you all the time",
            "being too clingy",
            "being too sarcastic at times",
            "not being reliable",
            "talking too much",
            "many other things that I can't recall rn",
        ]
    }
};

const notifications = [
    "8/27/24 - New apologies added!",
    "Made by: Divine Ejiogu",
]

const click = new Audio('click1.mp3');

let currentApologies = [];
let failedAttempts = 0;
let lockoutTimer;
let currentReason = "I'm sorry for...";

// Function to submit the password
function submitPassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (lockoutTimer) {
        errorMessage.innerText = `Too many failed attempts. Try again later.`;
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
        if (failedAttempts >= 5) {
            const lockoutDuration = Math.min(30 * 1000 * (failedAttempts - 4), 10 * 60 * 1000); // Increase lockout time exponentially

            errorMessage.innerText = `Incorrect password. Try again in ${Math.ceil(lockoutDuration / 1000)} seconds.`;
            
            lockoutTimer = setTimeout(() => {
                failedAttempts = 0; // Reset failed attempts after lockout period ends
                lockoutTimer = null; // Clear lockout timer
                errorMessage.innerText = ''; // Clear error message
            }, lockoutDuration);
        } else {
            errorMessage.innerText = `Incorrect password. ${5 - failedAttempts} attempt(s) remaining.`;
        }
    }
}

// Function to display the sorry page
function showSorryPage() {
    document.getElementById('password-screen').style.display = 'none';
    document.getElementById('sorry-page').style.display = 'block';
    generateSorryGrid();
    click.play()
}

// Function to generate the grid of sorry items

function generateSorryGrid() {
    const grid = document.getElementById('sorry-grid');
    grid.innerHTML = '';
    for (let i = 0; i < currentApologies.length; i++) {
        const item = document.createElement('div');
        item.className = 'sorry-item';
        item.innerText = 'sorry';
        item.onmouseover = function() {
            currentReason = currentApologies[i % currentApologies.length];
            document.getElementById('main-title').innerText = currentReason;
            updatePopupText(currentReason);
        };
        item.onmouseout = function() {
            currentReason = "I'm sorry for...";
            document.getElementById('main-title').innerText = currentReason;
            updatePopupText(currentReason);
        };
        grid.appendChild(item);
    }
}

// Function to return to the lock screen
function returnToLockScreen() {
    document.getElementById('sorry-page').style.display = 'none';
    document.getElementById('password-screen').style.display = 'block';
    document.getElementById('password').value = ''; // Clear the password field
    document.getElementById('main-title').innerText = "I'm sorry for..."; // Reset main title
    document.getElementById('error-message').innerText = ''; // Clear error message
    click.play()
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    click.play()
}

// Function to update the popup text
function updatePopupText(text) {
    const popup = document.getElementById('popup');
    popup.innerText = text;
    popup.style.opacity = '1';
    clearTimeout(popupTimeout);
    popupTimeout = setTimeout(() => {
        popup.style.opacity = '0';
    }, 3000);
}

// Initialize the datetime display
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      };
    const date = now.toLocaleDateString(undefined, options);
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('date').innerText = date;
    document.getElementById('time').innerText = time;
}

// Add a notification
function addNotification(text) {
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = text;
    notification.onclick = function() {
        this.remove()
        click.play()
    };
    notifications.appendChild(notification);
}

function generateNotifications() {
    notifications.forEach(addNotification)
}

generateNotifications()

function checkScrollPosition() {
    const mainTitle = document.getElementById('main-title');
    const popup = document.getElementById('popup');
    
    const rect = mainTitle.getBoundingClientRect();
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
        popup.style.display = 'block';
    } else {
        popup.style.display = 'none';
    }
}

window.addEventListener('resize', generateSorryGrid);
window.addEventListener('scroll', checkScrollPosition);
setInterval(updateDateTime, 1000);
