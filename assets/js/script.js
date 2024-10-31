// Elements for main sections and buttons
const buttonA = document.getElementById('buttonA');
const buttonB = document.getElementById('buttonB');
const newSectionA = document.getElementById('newSectionA');
const newSectionB = document.getElementById('newSectionB');
const threeDaysPlan = document.getElementById('threeDaysPlan');
const globalBackButton = document.getElementById('globalBackButton');

// Set initial visibility for the back button
globalBackButton.style.display = 'none'; // Hide initially

// Helper functions to show and hide sections with animations
function hideSection(section, callback, isBack = false) {
  section.classList.add(isBack ? 'slide-out-right' : 'slide-out-left'); // Slide out depending on direction
  
  setTimeout(() => {
    section.style.display = 'none';
    section.classList.remove(isBack ? 'slide-out-right' : 'slide-out-left');
    if (callback) callback();
  }, 500); // Match this timing with CSS animation duration
}

function showSection(section, isBack = false) {
  section.style.display = 'flex';
  section.classList.add(isBack ? 'slide-in-left' : 'slide-in-right'); // Slide in depending on direction
  
  setTimeout(() => {
    section.classList.remove(isBack ? 'slide-in-left' : 'slide-in-right');
  }, 500); // Match this timing with CSS animation duration
}

// Show or hide the global back button
function toggleBackButton(show) {
  globalBackButton.style.display = show ? 'block' : 'none';
}

// Initial screen events for Workout Zone and Food Zone
buttonA.addEventListener('click', () => {
  hideSection(document.querySelector('.container'), () => {
    showSection(newSectionA); // Show 3 Days Plan and 4 Days Plan options
    toggleBackButton(true); // Show back button
  });
});

buttonB.addEventListener('click', () => {
  hideSection(document.querySelector('.container'), () => {
    showSection(newSectionB);
    toggleBackButton(true); // Show back button
  });
});

// 3 Days Plan selection
document.getElementById('option1').addEventListener('click', () => {
  hideSection(newSectionA, () => showSection(threeDaysPlan));
});

// Global Back Button event to handle navigation
globalBackButton.addEventListener('click', () => {
  // Hide specific sections based on which is visible
  if (threeDaysPlan.style.display === 'flex') {
    hideSection(threeDaysPlan, () => showSection(newSectionA, true), true); // Going back
  } else if (newSectionA.style.display === 'flex') {
    hideSection(newSectionA, () => showSection(document.querySelector('.container'), true), true); // Going back
    toggleBackButton(false); // Hide back button when returning to main options
  } else if (newSectionB.style.display === 'flex') {
    hideSection(newSectionB, () => showSection(document.querySelector('.container'), true), true); // Going back
    toggleBackButton(false); // Hide back button when returning to main options
  }
});

// Remove any click event listeners from the workout sections
threeDaysPlan.querySelectorAll('.section').forEach((section) => {
    section.style.pointerEvents = 'none'; // Disable pointer events to make sections non-clickable
});
