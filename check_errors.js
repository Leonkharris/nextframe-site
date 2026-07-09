const { chromium } = require('playwright-core');

async function run() {
  const chromePaths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ];
  const fs = require('fs');
  let executablePath;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) {
      executablePath = p;
      break;
    }
  }
  if (!executablePath) {
    console.log("Chrome executable not found.");
    return;
  }

  console.log("Launching Chrome...");
  const browser = await chromium.launch({ executablePath, headless: true });
  const page = await browser.newPage();
  
  // Track all console messages
  page.on('console', msg => {
    console.log(`[CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
  });
  
  // Track page errors (uncaught exceptions)
  page.on('pageerror', err => {
    console.log('[PAGE ERROR/EXCEPTION]', err.stack || err.message);
  });
  
  // Track all failed requests (network errors, 404s, etc.)
  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(`[HTTP ERROR] ${response.status()} ${response.statusText()} on: ${response.url()}`);
    }
  });

  console.log("Navigating to https://next-frame.agency/+81Bar-Mockup-v3/ ...");
  try {
    await page.goto('https://next-frame.agency/+81Bar-Mockup-v3/', { waitUntil: 'networkidle', timeout: 15000 });
  } catch (e) {
    console.log("Navigation timeout or error:", e.message);
  }
  
  console.log("Waiting 5 seconds to observe video behavior...");
  await page.waitForTimeout(5000);
  
  // Check video state details
  const videoDetails = await page.evaluate(() => {
    const vids = Array.from(document.querySelectorAll('video'));
    return vids.map(v => {
      // Find out if there are error objects on the video
      let errCode = null;
      let errMsg = null;
      if (v.error) {
        errCode = v.error.code;
        errMsg = v.error.message;
      }
      return {
        src: v.src,
        paused: v.paused,
        currentTime: v.currentTime,
        ended: v.ended,
        readyState: v.readyState,
        error: { code: errCode, message: errMsg }
      };
    });
  });

  console.log("Video Details:");
  console.log(JSON.stringify(videoDetails, null, 2));

  await browser.close();
  console.log("Done.");
}

run().catch(console.error);
