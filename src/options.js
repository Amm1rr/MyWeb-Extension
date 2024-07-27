document.addEventListener('DOMContentLoaded', function() {
  const fontSelect = document.getElementById('fontSelect');
  const defaultFont = 'Vazirmatn';

  // Fetch and set the current font family from storage
  const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;
  browserAPI.storage.sync.get('fontFamily', (data) => {
    fontSelect.value = data.fontFamily || defaultFont;
  });

  // Save the selected font family to storage
  fontSelect.addEventListener('change', function() {
    const selectedFont = fontSelect.value;
    browserAPI.storage.sync.set({ fontFamily: selectedFont }, function() {
      console.log(`Font family set to ${selectedFont}`);
    });
  });
});
