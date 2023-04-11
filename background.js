chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method == "getSpeedUpKey") {
    chrome.storage.local.get("speedUp", function (result) {
      sendResponse({ data: result.speedUp });
    });
  } else if (request.method == "getSpeedDownKey") {
    chrome.storage.local.get("speedDown", function (result) {
      sendResponse({ data: result.speedDown });
    });
  } else if (request.method == "getStepUp") {
    chrome.storage.local.get("stepUp", function (result) {
      sendResponse({ data: result.stepUp });
    });
  } else if (request.method == "getStepDown") {
    chrome.storage.local.get("stepDown", function (result) {
      sendResponse({ data: result.stepDown });
    });
  } else sendResponse({});
  return true;
});
