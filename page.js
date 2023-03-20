window.onload = () => {
  console.log(chrome.storage.local);
  const speedUpInput = document.querySelector("#speedUp");
  const speedDownInput = document.querySelector("#speedDown");

  chrome.storage.local.get("speedDown", function (result) {
    speedDownInput.value = result.speedDown;
  });

  chrome.storage.local.get("speedUp", function (result) {
    speedUpInput.value = result.speedUp;
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
    let info =
      "Settings saved! Please refresh youtube page to apply changes (speed up: " +
      speedUpInput.value +
      ", speed down: " +
      speedDownInput.value +
      ").";
    localStorage.setItem("info", info);
  });
};
