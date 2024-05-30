window.onload = () => {
  const speedUpInput = document.querySelector("#speedUp");
  const speedDownInput = document.querySelector("#speedDown");
  const stepUpInput = document.querySelector("#stepUp");
  const stepDownInput = document.querySelector("#stepDown");
  const dynamicSpeedInput = document.querySelector("#dynamicSpeed");

  chrome.storage.local.get("speedDown", function (result) {
    if (result.speedDown == null) result.speedDown = "a";
    speedDownInput.value = result.speedDown;
  });

  chrome.storage.local.get("speedUp", function (result) {
    if (result.speedUp == null) result.speedUp = "d";
    speedUpInput.value = result.speedUp;
  });

  chrome.storage.local.get("stepDown", function (result) {
    if (result.stepDown == null) result.stepDown = 0.25;
    stepDownInput.value = Number(result.stepDown);
  });

  chrome.storage.local.get("stepUp", function (result) {
    if (result.stepUp == null) result.stepUp = 0.25;
    stepUpInput.value = Number(result.stepUp);
  });

  chrome.storage.local.get("dynamicSpeed", function (result) {
    if (result.dynamicSpeed == null) result.dynamicSpeed = false;
    dynamicSpeedInput.checked = Boolean(result.dynamicSpeed);
  });

  info = localStorage.getItem("info");
  if (info != "") {
    const infoP = document.querySelector("#info");
    infoP.innerHTML = info;
    localStorage.removeItem("info");
  }

  const form = document.getElementById("form");

  speedUpInput.addEventListener("keydown", (event) => {
    if (speedDownInput.value.includes(event.key)) {
      event.preventDefault();
      return;
    }

    processKeyDownEvent(event);
  });

  speedDownInput.addEventListener("keydown", (event) => {
    if (speedUpInput.value.includes(event.key)) {
      event.preventDefault();
      return;
    }
    processKeyDownEvent(event);
  });

  const processKeyDownEvent = (event) => {
    if (event.key == "Backspace") {
      if (event.target.value.length > 1)
        event.target.value = event.target.value.substring(
          0,
          event.target.value.length - 2
        );
      else if (event.target.value.length > 0)
        event.target.value = event.target.value.substring(
          0,
          event.target.value.length - 1
        );
      event.preventDefault();
    }
    if (event.key.length != 1) {
      event.preventDefault();
      return;
    }
    currValues = event.target.value.split(",").filter(Boolean);
    if (!currValues.includes(event.key)) {
      currValues.push(event.key);
      event.target.value = currValues.join(",");
    }
    event.preventDefault();
  };

  form.addEventListener("submit", (event) => {
    chrome.storage.local.set({ speedUp: speedUpInput.value });
    chrome.storage.local.set({ speedDown: speedDownInput.value });
    chrome.storage.local.set({ stepUp: stepUpInput.value });
    chrome.storage.local.set({ stepDown: stepDownInput.value });
    chrome.storage.local.set({ dynamicSpeed: dynamicSpeedInput.checked });

    let info =
      "Settings saved! Please refresh youtube page to apply changes (speed up: " +
      speedUpInput.value +
      ", speed down: " +
      speedDownInput.value +
      ", step up: " +
      stepUpInput.value +
      ", step down: " +
      stepDownInput.value +
      ", show dynamic speed: " +
      dynamicSpeedInput.checked +
      ").";
    localStorage.setItem("info", info);
  });
};
