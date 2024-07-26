(function () {
  const config = {
    fontFamily: "Vazirmatn",
    selector: "body *:not(#mywebext, #mywebext *)",
    buttonID: "mywebext",
    buttonText: "A",
    notificationDuration: 2000,
    buttonFadeDuration: 2000,
    notificationMessage: "Fonts updated: Vazirmatn font applied.",
    buttonTooltip: "Enhance readability with Vazirmatn font",
    fontlableName: "Font+",
    fontlableDefault: "Original",
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

  function createMenuItem(text, onClick) {
    const item = document.createElement("div");
    item.textContent = text;
    item.style.cssText = `
      padding: 8px 12px;
      cursor: pointer;
      color: white;
      transition: background-color 0.3s ease;
    `;
    item.addEventListener("click", onClick);
    item.addEventListener("mouseenter", () => {
      item.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    });
    item.addEventListener("mouseleave", () => {
      item.style.backgroundColor = "transparent";
    });
    return item;
  }

  function addFontChangeButton() {
    if (document.getElementById(config.buttonID)) {
      console.log("Custom Font: " + config.buttonID + " button already exists.");
      return;
    }

    const button = document.createElement("div");
    button.id = config.buttonID;
    button.textContent = config.buttonText;
    button.title = config.buttonTooltip;

    const buttonStyle = {
      position: "fixed",
      top: "10px",
      left: "10px",
      zIndex: "9999",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "rgba(123, 110, 242, 0.3)",
      color: "#FFFFFF",
      border: "none",
      fontWeight: "bold",
      fontFamily: "Arial",
      cursor: "pointer",
      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
    Object.assign(button.style, buttonStyle);

    const menu = document.createElement("div");
    menu.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      background-color: rgba(123, 110, 242, 0.9);
      border-radius: 5px;
      padding: 5px 0;
      display: none;
      z-index: 10000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      min-width: 120px;
    `;

    const toggleItem = createMenuItem(isActive ? config.fontlableDefault : config.fontlableName, toggleFont);
    const alertItem = createMenuItem("Show Alert", () => alert("Hello from MyWeb extension!"));

    menu.appendChild(toggleItem);
    menu.appendChild(alertItem);

    button.appendChild(menu);

    let menuVisible = false;

    button.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "rgba(123, 110, 242, 0.8)";
      menu.style.display = "block";
      menuVisible = true;
    });

    button.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "rgba(123, 110, 242, 0.3)";
      menuVisible = false;
      setTimeout(() => {
        if (!menuVisible) {
          menu.style.display = "none";
        }
      }, 300);
    });

    menu.addEventListener("mouseenter", () => {
      button.style.backgroundColor = "rgba(123, 110, 242, 0.8)";
      menuVisible = true;
    });

    menu.addEventListener("mouseleave", () => {
      button.style.backgroundColor = "rgba(123, 110, 242, 0.3)";
      menuVisible = false;
      menu.style.display = "none";
    });

    document.body.appendChild(button);
  }

  function toggleFont() {
    if (!isActive) {
      isActive = true;
      applyCustomFont(config.selector, config.fontFamily);
      showNotification(config.notificationMessage, config.notificationDuration);
    } else {
      isActive = false;
      removeCustomFont();
      showNotification("Original font restored", config.notificationDuration);
    }
    updateMenuItems();
  }

  function updateMenuItems() {
    const menu = document.querySelector(`#${config.buttonID} > div`);
    if (menu) {
      menu.firstChild.textContent = isActive ? config.fontlableDefault : config.fontlableName;
    }
  }

  // Add the floating button with menu
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
