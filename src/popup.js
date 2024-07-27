document.addEventListener('DOMContentLoaded', () => {
  const toggleFontButton = document.getElementById('toggleFont');
  const toggleOverlayButton = document.getElementById('toggleOverlay');

  // Function to handle button visibility based on tab URL
  function updateButtonVisibility(tabUrl) {
    if (tabUrl.includes('trello.com')) {
      toggleOverlayButton.classList.remove('hidden');
    } else {
      toggleOverlayButton.classList.add('hidden');
    }
  }

  // Retrieve current tab's URL and update button visibility
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    updateButtonVisibility(tab.url);
  });

  toggleFontButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "toggleFont" });
  });

  toggleOverlayButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "toggleOverlay" });
  });
});
