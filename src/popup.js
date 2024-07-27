document.addEventListener('DOMContentLoaded', function () {
  const toggleFontButton = document.getElementById('toggleFont');
  const toggleOverlayButton = document.getElementById('toggleOverlay');
  const openOptionsButton = document.getElementById('openOptions');

  toggleFontButton.addEventListener('click', () => {
    const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;
    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browserAPI.tabs.sendMessage(tabs[0].id, { action: 'toggleFont' });
    });
  });

  toggleOverlayButton.addEventListener('click', () => {
    const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;
    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browserAPI.tabs.sendMessage(tabs[0].id, { action: 'toggleOverlay' });
    });
  });

  openOptionsButton.addEventListener('click', () => {
    const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;
    browserAPI.runtime.openOptionsPage();
  });

  // Check if the current tab is trello.com
  const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;
  browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab.url.includes('trello.com')) {
      toggleOverlayButton.style.display = 'block';
    } else {
      toggleOverlayButton.style.display = 'none';
    }
  });
});
