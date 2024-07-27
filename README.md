# MyWeb Extension

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/Amm1rr/MyWeb-Extension@master/src/assets/icon.png" alt="MyWeb Extension" width="10%" />
</p>

MyWeb is a lightweight browser extension designed to enhance your web browsing experience.
It offers customizable font options across all websites and provides special functionality for Trello users. With a simple, 
unobtrusive interface, MyWeb allows you to tailor your browsing experience to your preferences.

This extension is for applying customized capabilities to different pages.

## Features
The current features (updated daily) include:
- **Custom Font Toggle**: Switch between the default font and Vazirmatn font on any website for improved readability.
- **Trello Overlay Control**: When on Trello.com, easily hide or show the attachment viewer overlay.
- **Non-Intrusive Design**: A small, hoverable icon in the top-left corner of your browser window provides access to all features.
- **Cross-Browser Compatibility**: Works on both Chrome and Firefox.
- **lightweight**: This script is written to be very lightweight and optimized, using minimal resources.

## Installation

1. Clone this repository or download the source code.
2. For Chrome:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension directory
3. For Firefox:
   - Navigate to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select xpi file in the build directory

## Usage

1. After installation, you'll see a small icon in the top-left corner of your browser window.
2. Hover over the icon to reveal the menu.
3. Click "Font+" to toggle between the default font and Vazirmatn.
4. On Trello.com, an additional "On/Off" option appears to control the attachment viewer overlay.

## Development

This extension is built using vanilla JavaScript and is designed to be easily modifiable. The main components are:

- `manifest.json`: Extension configuration
- `content.js`: Core functionality
- `background.js`: Background scripts for browser events
- `icon.png`: Extension icon

To modify the extension, edit these files and reload the extension in your browser.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Support

If you encounter any problems or have any suggestions, please open an issue on this GitHub repository.

---

Developed with ❤️ by Amir

[![](https://visitcount.itsvg.in/api?id=amm1rr&label=V&color=0&icon=2&pretty=true)](https://github.com/Amm1rr/)
