// Cross-browser compatibility
const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;

if (browserAPI && browserAPI.browserAction && browserAPI.browserAction.onClicked) {
  browserAPI.browserAction.onClicked.addListener((tab) => {
    if (browserAPI.tabs && browserAPI.tabs.sendMessage) {
      browserAPI.tabs.sendMessage(tab.id, { action: "toggleFont" });
    }
  });
}