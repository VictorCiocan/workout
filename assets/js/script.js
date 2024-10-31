// Elements for main sections and buttons
const buttonA = document.getElementById('buttonA');
const buttonB = document.getElementById('buttonB');
const newSectionA = document.getElementById('newSectionA');
const newSectionB = document.getElementById('newSectionB');
const threeDaysPlan = document.getElementById('threeDaysPlan');
const fourDaysPlan = document.getElementById('fourDaysPlan');
const globalBackButton = document.getElementById('globalBackButton');
const option1 = document.getElementById('option1'); // 3 Days Plan button
const option2 = document.getElementById('option2'); // 4 Days Plan button

// Set initial visibility for the back button
globalBackButton.style.display = 'none'; // Hide initially

// Helper functions to show and hide sections with animations
function hideSection(section, callback, isBack = false) {
  if (isBack) {
    section.classList.add('slide-out-right'); // Slide out to the right when going back
  } else {
    section.classList.add('slide-out-left'); // Default: slide out to the left
  }

  setTimeout(() => {
    section.style.display = 'none';
    section.classList.remove(isBack ? 'slide-out-right' : 'slide-out-left');
    if (callback) callback();
  }, 500); // Match this timing with CSS animation duration
}

function showSection(section, isBack = false) {
  section.style.display = 'flex';
  if (isBack) {
    section.classList.add('slide-in-left'); // Slide in from the left when going back
  } else {
    section.classList.add('slide-in-right'); // Default: slide in from the right
  }

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
    showSection(newSectionA);
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
option1.addEventListener('click', () => {
  hideSection(newSectionA, () => showSection(threeDaysPlan));
});

// 4 Days Plan selection
option2.addEventListener('click', () => {
  hideSection(newSectionA, () => showSection(fourDaysPlan));
});

// Global Back Button event to handle navigation
globalBackButton.addEventListener('click', () => {
  if (threeDaysPlan.style.display === 'flex') {
    hideSection(threeDaysPlan, () => showSection(newSectionA, true), true); // Going back from 3 Days Plan
  } else if (fourDaysPlan.style.display === 'flex') {
    hideSection(fourDaysPlan, () => showSection(newSectionA, true), true); // Going back from 4 Days Plan
  } else if (newSectionA.style.display === 'flex') {
    hideSection(newSectionA, () => showSection(document.querySelector('.container'), true), true); // Going back to main
    toggleBackButton(false); // Hide back button when returning to main options
  } else if (newSectionB.style.display === 'flex') {
    hideSection(newSectionB, () => showSection(document.querySelector('.container'), true), true); // Going back to main
    toggleBackButton(false); // Hide back button when returning to main options
  }
});
