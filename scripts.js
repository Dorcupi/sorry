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
}

// Function to generate the grid of sorry items

function generateSorryGrid() {
    const grid = document.getElementById('sorry-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 100; i++) {
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
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
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
    notifications.appendChild(notification);
}

// Example: Adding a notification on load
addNotification("New message from John.");
addNotification("Your package has been delivered.");

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
