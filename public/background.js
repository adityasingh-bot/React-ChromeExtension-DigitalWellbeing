let activeTabUrl = null;
let startTime = null;

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url != "") activeTabUrl = new URL(tab.url).hostname;
    startTime = new Date().getTime();
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === changeInfo.tabId && changeInfo.status === "complete") {
    if (tab.url != "") activeTabUrl = new URL(tab.url).hostname;
    startTime = new Date().getTime();
  }
});

setInterval(() => {
  if (activeTabUrl != "newtab" && startTime) {
    let endTime = new Date().getTime();
    let timeSpent = endTime - startTime;

    chrome.storage.local.get(activeTabUrl, (result) => {
      let total = result[activeTabUrl] || 0;
      total += timeSpent;
      let data = {};
      data[activeTabUrl] = total;
      chrome.storage.local.set(data);
    });

    startTime = new Date().getTime(); // Reset start time
  }
}, 1000); // Update every second
