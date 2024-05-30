var speedDownKey = ["-", "a"];
var speedUpKey = ["+", "d"];
var stepUp = 0.25;
var stepDown = 0.25;
var currSpeed = 1;
var rangeInput = null;
var dynamicSpeedInterval = null;
var showDynamicSpeed = false;

chrome.runtime.sendMessage({ method: "getSpeedUpKey" }, function (response) {
  if (response == null || response.data == null) return;
  else speedUpKey = response.data;
});

chrome.runtime.sendMessage({ method: "getSpeedDownKey" }, function (response) {
  if (response == null || response.data == null) return;
  else speedDownKey = response.data;
});

chrome.runtime.sendMessage({ method: "getStepUp" }, function (response) {
  if (response == null || response.data == null) return;
  else stepUp = Number(response.data);
});

chrome.runtime.sendMessage({ method: "getStepDown" }, function (response) {
  if (response == null || response.data == null) return;
  else stepDown = Number(response.data);
});

chrome.runtime.sendMessage({ method: "getDynamicSpeed" }, function (response) {
  if (response == null || response.data == null) return;
  else showDynamicSpeed = Boolean(response.data);
});

function injectControl() {
  function setNewSpeed(val) {
    let newValue = this.value;

    if (isNaN(newValue)) newValue = val;
    if (newValue > 10) newValue = 10;
    if (newValue < 0.1) newValue = 0.1;

    newValue = Number(newValue).toFixed(2);
    playbackRate = newValue;
    videoPlayer.playbackRate = newValue;

    let rangeinp = document.querySelector("#speed");
    let numinp = document.querySelector("#numInput");

    if (rangeinp.value != newValue) {
      rangeinp.value = newValue;
    }
    if (numinp.value != newValue) {
      numinp.value = newValue;
    }

    sessionStorage.setItem(
      "yt-player-playback-rate",
      '{"data":"' + newValue + '","creation":' + new Date().getTime() + "}"
    );
  }

  function keyDownHandler(e) {
    if (speedDownKey.includes(e.key)) {
      setNewSpeed(Number(playbackRate) - stepDown);
    } else if (speedUpKey.includes(e.key)) {
      setNewSpeed(Number(playbackRate) + stepUp);
    } else return;

    let infoLabel = getParentElement(videoPlayer, 2).querySelector(
      ".ytp-bezel-text"
    );
    let parentCont = getParentElement(infoLabel, 2);
    parentCont.style.display = "block";
    parentCont.classList.remove("ytp-bezel-text-hide");
    infoLabel.innerHTML = playbackRate;

    setTimeout(() => {
      parentCont.style.display = "none";
      parentCont.classList.add("ytp-bezel-text-hide");
    }, 1500);
  }

  const activateDynamicSpeed = (
    startSpeed,
    desiredSpeed,
    reachWhenInPercentage
  ) => {
    startSpeed = Number(startSpeed);
    desiredSpeed = Number(desiredSpeed);
    reachWhenInPercentage = Number(reachWhenInPercentage);

    if (desiredSpeed < startSpeed) return;

    clearInterval(dynamicSpeedInterval);
    dynamicSpeedInterval = setInterval(() => {
      if (videoPlayer == null) return;
      let newPlaybackRate =
        startSpeed +
        ((desiredSpeed - startSpeed) *
          (videoPlayer.currentTime / videoPlayer.duration)) /
          (reachWhenInPercentage / 100);

      setNewSpeed(Number(newPlaybackRate));

      if (newPlaybackRate >= desiredSpeed) {
        setNewSpeed(desiredSpeed);
        clearInterval(dynamicSpeedInterval);
      }
    }, 1000);
  };

  const CreateSpeedControl = () => {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("ytp-menuitem-content");

    rangeInput = document.createElement("input");
    rangeInput.setAttribute("type", "range");
    rangeInput.setAttribute("id", "speed");
    rangeInput.setAttribute("name", "speed");
    rangeInput.setAttribute("step", "0.1");
    rangeInput.setAttribute("min", "0.1");
    rangeInput.setAttribute("max", "5");
    rangeInput.setAttribute("list", "tickmarks");
    rangeInput.addEventListener("change", setNewSpeed);
    rangeInput.style.minWidth = "150px";
    rangeInput.style.width = "10vw";
    mainDiv.appendChild(rangeInput);

    return CreateMenuItem(mainDiv, CreateIcon(), CreateNumericInputLabel());
  };

  function CreateNumericInputLabel() {
    let itemLabel = document.createElement("div");
    itemLabel.classList.add("ytp-menuitem-label");

    let labelForNumericInput = document.createElement("label");
    labelForNumericInput = document.createElement("numInput");
    labelForNumericInput.innerHTML = "Current speed:";

    let numericInput = document.createElement("input");
    numericInput.setAttribute("type", "number");
    numericInput.setAttribute("min", "0.10");
    numericInput.setAttribute("max", "10");
    numericInput.setAttribute("step", "0.10");
    numericInput.style.marginLeft = "0.5rem";
    styleNumericInput(numericInput, "4rem");
    numericInput.addEventListener("change", setNewSpeed);
    numericInput.onkeydown = function (e) {
      e.stopPropagation();
    };
    numericInput.name = "numInput";
    numericInput.id = "numInput";
    itemLabel.appendChild(labelForNumericInput);
    itemLabel.appendChild(numericInput);
    return itemLabel;
  }

  const styleNumericInput = (input, width) => {
    input.style.width = width;
    input.style.backgroundColor = "transparent";
    input.style.color = "white";
    input.style.border = "none";
    input.style.boxShadow = "none";
  };

  const CreateDynamicSpeedControl = () => {
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("ytp-menuitem-content");

    let startSpeedInput = document.createElement("input");
    startSpeedInput.setAttribute("type", "number");
    startSpeedInput.setAttribute("id", "ds_StartSpeed");
    startSpeedInput.setAttribute("name", "ds_StartSpeed");
    startSpeedInput.setAttribute("step", "0.1");
    startSpeedInput.setAttribute("min", "0.1");
    startSpeedInput.setAttribute("max", "10");
    styleNumericInput(startSpeedInput, "4rem");
    startSpeedInput.value = playbackRate;
    startSpeedInput.onkeydown = function (e) {
      e.stopPropagation();
    };

    let labelTo = document.createElement("span");
    labelTo.innerHTML = "to ";

    let desiredSpeedInput = document.createElement("input");
    desiredSpeedInput.setAttribute("type", "number");
    desiredSpeedInput.setAttribute("id", "ds_DesiredSpeed");
    desiredSpeedInput.setAttribute("name", "ds_DesiredSpeed");
    desiredSpeedInput.setAttribute("step", "0.1");
    desiredSpeedInput.setAttribute("min", "0.1");
    desiredSpeedInput.setAttribute("max", "10");
    styleNumericInput(desiredSpeedInput, "4rem");
    desiredSpeedInput.value = playbackRate;
    desiredSpeedInput.onkeydown = function (e) {
      e.stopPropagation();
    };

    let endAtLabel = document.createElement("span");
    endAtLabel.innerHTML = "end at: ";

    let desiredDurationInPercentage = document.createElement("input");
    desiredDurationInPercentage.setAttribute("type", "number");
    desiredDurationInPercentage.setAttribute("id", "ds_DesiredSpeed");
    desiredDurationInPercentage.setAttribute("name", "ds_DesiredSpeed");
    desiredDurationInPercentage.setAttribute("step", "2");
    desiredDurationInPercentage.setAttribute("min", "10");
    desiredDurationInPercentage.setAttribute("max", "100");
    styleNumericInput(desiredDurationInPercentage, "4rem");
    desiredDurationInPercentage.value = 50;
    desiredDurationInPercentage.onkeydown = function (e) {
      e.stopPropagation();
    };

    let percentageLabel = document.createElement("span");
    percentageLabel.innerHTML = "% ";

    let startButton = document.createElement("button");
    startButton.setAttribute("type", "button");
    startButton.innerHTML = "Start";
    startButton.onclick = () => {
      activateDynamicSpeed(
        startSpeedInput.value,
        desiredSpeedInput.value,
        desiredDurationInPercentage.value
      );
    };

    mainDiv.appendChild(startSpeedInput);
    mainDiv.appendChild(labelTo);
    mainDiv.appendChild(desiredSpeedInput);
    mainDiv.appendChild(endAtLabel);
    mainDiv.appendChild(desiredDurationInPercentage);
    mainDiv.appendChild(percentageLabel);
    mainDiv.appendChild(startButton);

    return CreateMenuItem(mainDiv, CreateIcon(), CreateDynamicSpeedLabel());
  };

  function CreateDynamicSpeedControlPreview(panelMenu) {
    let arrowDown = "˅";
    let arrowUp = "⌃";
    let icon = document.createElement("div");
    icon.innerHTML = arrowDown;
    icon.classList.add("ytp-menu-icon");
    icon.style.position = "relative";
    icon.style.float = "left";
    icon.style.top = "50%";
    icon.style.left = "50%";
    icon.style.transform = "translate(-50%, -50%)";

    let itemLabel = document.createElement("div");
    itemLabel.classList.add("ytp-menuitem-label");
    itemLabel.innerHTML = "Dynamic speed control";

    mainDiv = CreateMenuItem(document.createElement("div"), icon, itemLabel);
    mainDiv.onclick = () => {
      if (icon.innerHTML === arrowDown) {
        dSpeedControl = CreateDynamicSpeedControl();
        panelMenu.appendChild(dSpeedControl);
        icon.innerHTML = arrowUp;
        itemLabel.innerHTML = "Hide and stop";
      } else {
        icon.innerHTML = arrowDown;
        panelMenu.removeChild(panelMenu.lastChild);
        itemLabel.innerHTML = "Dynamic speed control";
        clearInterval(dynamicSpeedInterval);
      }
    };

    return mainDiv;
  }

  function CreateDynamicSpeedLabel() {
    let itemLabel = document.createElement("div");
    itemLabel.classList.add("ytp-menuitem-label");

    let label = document.createElement("label");
    label.innerHTML = "Dynamic speed:";
    itemLabel.appendChild(label);
    return itemLabel;
  }

  function CreateIcon() {
    let icon = document.createElement("div");
    icon.classList.add("ytp-menu-icon");
    return icon;
  }

  function getParentElement(elem, times) {
    if (times == 0) return elem;
    if ((parent = elem.parentElement))
      return getParentElement(elem.parentElement, times - 1);
    else return false;
  }

  function CreateMenuItem(content, icon, label) {
    let menuitem = document.createElement("div");
    menuitem.classList.add("ytp-menuitem");
    menuitem.setAttribute("role", "menuitem");
    menuitem.appendChild(icon);
    menuitem.appendChild(label);
    menuitem.appendChild(content);
    return menuitem;
  }

  function UpdatePlaybackRateFromStorage(videoPlayer) {
    var playbackJSON = JSON.parse(
      sessionStorage.getItem("yt-player-playback-rate")
    );
    if (!playbackJSON) playbackRate = 1;
    else playbackRate = playbackJSON.data;

    document.querySelector("#numInput").value = playbackRate;
    videoPlayer.playbackRate = playbackRate;
    rangeInput.value = playbackRate;
  }

  // program starts here
  var sessionStorage = window.sessionStorage;
  var videoPlayer;

  var playbackRate = 1;
  var playbackJSON = JSON.parse(
    sessionStorage.getItem("yt-player-playback-rate")
  );

  if (!playbackJSON) playbackRate = 1;
  else playbackRate = playbackJSON.data;

  var menuitem = CreateSpeedControl(playbackRate);

  loadCommentBox = setInterval(() => {
    let commentInput;
    if ((commentInput = document.querySelector("#comment-dialog"))) {
      commentInput.addEventListener("keydown", function (e) {
        e.stopPropagation();
      });
    } else return;
    clearInterval(loadCommentBox);
  }, 1000);

  loading = setInterval(function () {
    if (videoPlayer == null) {
      let movieContainer = document.querySelector("#movie_player");
      if (movieContainer == null) return;
      videoPlayer = movieContainer.getElementsByTagName("video")[0];

      if (videoPlayer == null) return;
      let keydownElement;
      if ((keydownElement = document.querySelector("#content"))) {
        keydownElement.addEventListener("keydown", keyDownHandler);
      } else return;

      panelMenu = movieContainer
        .querySelector(".ytp-settings-menu")
        .querySelector(".ytp-panel")
        .querySelector(".ytp-panel-menu");

      panelMenu.appendChild(menuitem);
      if (showDynamicSpeed) {
        panelMenu.appendChild(CreateDynamicSpeedControlPreview(panelMenu));
      }

      UpdatePlaybackRateFromStorage(videoPlayer);

      observer = new MutationObserver((changes) => {
        changes.forEach((change) => {
          if (change.attributeName.includes("src")) {
            clearInterval(dynamicSpeedInterval);
            UpdatePlaybackRateFromStorage(videoPlayer);
          }
        });
      });
      observer.observe(videoPlayer, { attributes: true });

      setNewSpeed(playbackRate);
      //clearInterval(loading);
    }
  }, 2000);
}

window.onload = injectControl();
