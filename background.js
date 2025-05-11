// Keep a pinned dummy tab open
function ensurePinnedTabExists() {
    chrome.tabs.query({}, (tabs) => {
      const pinned = tabs.find(tab => tab.pinned && tab.url === "chrome://newtab/");
      if (!pinned) {
        chrome.tabs.create({ url: "chrome://newtab/", pinned: true, active: false });
      }
    });
  }
  
  // On any tab close, open a new one
  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.tabs.create({ url: "chrome://newtab/" });
    ensurePinnedTabExists();
  });
  
  // On extension install, create the pinned tab
  chrome.runtime.onInstalled.addListener(() => {
    ensurePinnedTabExists();
  });
  