var fullyLoaded;
chrome.runtime.onMessage.addListener(function(res, sender, sendResponse) {
    chrome.storage.local.get('loadTimes', function(data) {
        data.loadTimes = data.loadTimes || {};
        data.loadTimes['tab' + sender.tab.id] = {
            pageLoad: res.pageLoad,
            chromeData: res.paints,
            resources: res.resources,
            memoryInitial: res.memoryInitial,
            memoryMax: res.memoryMax
        }
        fullyLoaded = String(((res.pageLoad.loadEventEnd - res.pageLoad.navigationStart) / 1000)
            .toFixed(2));
     //   alert(fullyLoaded);
        chrome.storage.local.set(data);
        chrome.browserAction.setBadgeText({
            text: fullyLoaded,
            tabId: sender.tab.id
        });
    });
});
chrome.tabs.onRemoved.addListener(function(tabId) {
    chrome.storage.local.get('loadTimes', function(data) {
        if (data.loadTimes) delete data.loadTimes['tab' + tabId];
        chrome.storage.local.set(data);
    });
});