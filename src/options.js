document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('fontFamily', (data) => {
    document.getElementById('fontFamily').value = data.fontFamily || '';
  });

  document.getElementById('saveFont').addEventListener('click', () => {
    const fontFamily = document.getElementById('fontFamily').value.trim();
    chrome.storage.sync.set({ fontFamily }, () => {
      alert('Font family saved!');
      chrome.runtime.sendMessage({ action: "updateFont", fontFamily });
    });
  });
});
