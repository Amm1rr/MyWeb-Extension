const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;

if (browserAPI && browserAPI.browserAction && browserAPI.browserAction.onClicked) {
  browserAPI.browserAction.onClicked.addListener(() => {
    browserAPI.browserAction.openPopup();
  });
}
