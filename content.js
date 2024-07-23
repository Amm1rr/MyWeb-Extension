(function () {
  const config = {
    fontFamily: "Vazirmatn",
    selector: "*",
    buttonID: "mywebext",
    buttonText: "A",
    notificationDuration: 2000,
    buttonFadeDuration: 2000,
    notificationMessage: "Fonts updated: Vazirmatn font applied.",
    buttonTooltip: "Enhance readability with Vazirmatn font",
  };

  let isActive = false;
  let originalFonts = new Map();

  function storeOriginalFonts(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (!originalFonts.has(el)) {
        originalFonts.set(el, window.getComputedStyle(el).fontFamily);
      }
    });
  }

  function applyCustomFont(selector, fontFamily) {
    storeOriginalFonts(selector);
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.style.fontFamily = `${fontFamily}, ${originalFonts.get(el)}`;
    });
  }

  function removeCustomFont() {
    originalFonts.forEach((originalFont, el) => {
      el.style.fontFamily = originalFont;
    });
  }

  function showNotification(message, duration) {
    const notification = document.createElement("div");
    Object.assign(notification.style, {
      position: "fixed",
      bottom: "80%",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "10px 20px",
      backgroundColor: "rgba(0, 123, 255, 0.8)",
      color: "yellow",
      borderRadius: "5px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      zIndex: "10000",
      opacity: "0",
      transition: "opacity 0.5s ease",
      textAlign: "center",
    });
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.opacity = "1";
    });

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.addEventListener(
          "transitionend",
          () => notification.remove(),
          { once: true }
      );
    }, duration);
  }

  function addFontChangeButton() {
    if (document.getElementById(config.buttonID)) {
      console.log("Custom Font: " + config.buttonID + " button already exists.");
      return;
    }

    const button = document.createElement("button");
    button.id = config.buttonID;
    button.textContent = config.buttonText;
    button.title = config.buttonTooltip;

    const buttonStyle = {
      position: "fixed",
      top: "10px",
      left: "3px",
      zIndex: "9999",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: "rgba(123, 110, 242, 0.3)",
      color: "#FFFFFF",
      border: "none",
      fontWeight: "bold",
      fontFamily: "Arial",
      cursor: "pointer",
      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      transition: "background-color 0.3s ease, opacity 0.3s ease",
    };
    Object.assign(button.style, buttonStyle);

    button.addEventListener("click", toggleFont);
    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "rgba(123, 110, 242, 0.8)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "rgba(123, 110, 242, 0.3)";
    });

    document.body.appendChild(button);
  }

  function toggleFont() {
    if (!isActive) {
      isActive = true;
      applyCustomFont(config.selector, config.fontFamily);
      showNotification("Custom font activated", config.notificationDuration);
    } else {
      isActive = false;
      removeCustomFont();
      showNotification("Custom font deactivated", config.notificationDuration);
    }
  }

  // Add the floating button
  addFontChangeButton();

  // Cross-browser compatibility
  const browserAPI = typeof chrome !== 'undefined' ? chrome : browser;

  // Listen for messages from the background script
  if (browserAPI && browserAPI.runtime && browserAPI.runtime.onMessage) {
    browserAPI.runtime.onMessage.addListener((message) => {
      if (message.action === "toggleFont") {
        toggleFont();
      }
    });
  }
})();