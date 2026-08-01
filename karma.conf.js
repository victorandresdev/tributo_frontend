const fs = require('fs');
const os = require('os');

// Detección multiplataforma de ejecutable para Chrome / Chromium (Linux, Windows, macOS)
if (!process.env.CHROME_BIN) {
  const platform = os.platform();
  if (platform === 'linux') {
    const linuxPaths = [
      '/usr/bin/chromium',
      '/usr/bin/chromium-browser',
      '/usr/bin/google-chrome',
      '/usr/bin/google-chrome-stable'
    ];
    for (const p of linuxPaths) {
      if (fs.existsSync(p)) {
        process.env.CHROME_BIN = p;
        break;
      }
    }
  } else if (platform === 'win32') {
    const winPaths = [
      process.env.PROGRAMFILES && `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`,
      process.env['PROGRAMFILES(X86)'] && `${process.env['PROGRAMFILES(X86)']}\\Google\\Chrome\\Application\\chrome.exe`,
      process.env.LOCALAPPDATA && `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`
    ].filter(Boolean);

    for (const p of winPaths) {
      if (fs.existsSync(p)) {
        process.env.CHROME_BIN = p;
        break;
      }
    }
  }
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
    ],
    client: {
      jasmine: {},
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/tributo-molina'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    restartOnFileChange: true
  });
};
