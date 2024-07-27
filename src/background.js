const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;

if (browserAPI && browserAPI.browserAction && browserAPI.browserAction.onClicked) {
  browserAPI.browserAction.onClicked.addListener((tab) => {
    if (browserAPI.tabs && browserAPI.tabs.sendMessage) {
      browserAPI.tabs.sendMessage(tab.id, { action: "toggleFont" });
    }
  });
}

browserAPI.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleFont" || message.action === "toggleOverlay") {
    browserAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browserAPI.tabs.sendMessage(tabs[0].id, message);
    });
  }
});
