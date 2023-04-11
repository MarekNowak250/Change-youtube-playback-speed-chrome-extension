window.onload = () => {
  const speedUpInput = document.querySelector("#speedUp");
  const speedDownInput = document.querySelector("#speedDown");
  const stepUpInput = document.querySelector("#stepUp");
  const stepDownInput = document.querySelector("#stepDown");

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

  info = localStorage.getItem("info");
  if (info != "") {
    const infoP = document.querySelector("#info");
    infoP.innerHTML = info;
    localStorage.removeItem("info");
  }

  const form = document.getElementById("form");

  speedUpInput.addEventListener("keydown", (event) => {
    event.target.value = event.key;
    event.preventDefault();
  });
  speedDownInput.addEventListener("keydown", (event) => {
    event.target.value = event.key;
    event.preventDefault();
  });

  form.addEventListener("submit", (event) => {
    chrome.storage.local.set({ speedUp: speedUpInput.value });
    chrome.storage.local.set({ speedDown: speedDownInput.value });
    chrome.storage.local.set({ stepUp: stepUpInput.value });
    chrome.storage.local.set({ stepDown: stepDownInput.value });

    let info =
      "Settings saved! Please refresh youtube page to apply changes (speed up: " +
      speedUpInput.value +
      ", speed down: " +
      speedDownInput.value +
      ", step up: " +
      stepUpInput.value +
      ", step down: " +
      stepDownInput.value +
      ").";
    localStorage.setItem("info", info);
  });
};
