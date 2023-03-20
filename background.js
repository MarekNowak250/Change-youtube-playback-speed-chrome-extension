chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method == "getSpeedUpKey") {
    chrome.storage.local.get("speedUp", function (result) {
      sendResponse({ data: result.speedUp });
    });
  } else if (request.method == "getSpeedDownKey") {
    chrome.storage.local.get("speedDown", function (result) {
      sendResponse({ data: result.speedDown });
    });
  } else sendResponse({});
  return true;
});
