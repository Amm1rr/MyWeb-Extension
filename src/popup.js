document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('toggleFont').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "toggleFont" });
  });

  document.getElementById('toggleOverlay').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "toggleOverlay" });
  });
});
