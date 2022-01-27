(function () {
  function func() {
    function setNewSpeed() {
      let newValue = this.value;
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

    var sessionStorage = window.sessionStorage;
    var videoPlayer;
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("ytp-menuitem-content");

    var playbackRate = 1;
    var playbackJSON = JSON.parse(
      sessionStorage.getItem("yt-player-playback-rate")
    );
    //console.log(playbackJSON)
    if (!playbackJSON) playbackRate = 1;
    else playbackRate = playbackJSON.data;

    var rangeInput = document.createElement("input");
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
    //rangeInput.style.maxWidth = "400px";
    mainDiv.appendChild(rangeInput);

    function CreateLabel() {
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
      numericInput.style.width = "4rem";
      numericInput.style.backgroundColor = "transparent";
      numericInput.style.color = "white";
      numericInput.style.border = "none";
      numericInput.style.boxShadow = "none";
      numericInput.addEventListener("change", setNewSpeed);
      numericInput.onkeydown = function (e) {
        e.stopPropagation();
      };
      numericInput.oninput = function (e) {
        console.log(e);
      };
      numericInput.name = "numInput";
      numericInput.id = "numInput";
      itemLabel.appendChild(labelForNumericInput);
      itemLabel.appendChild(numericInput);
      return itemLabel;
    }

    function CreateIcon() {
      let icon = document.createElement("div");
      icon.classList.add("ytp-menu-icon");
      return icon;
    }

    function CreateMenuItem() {
      let menuitem = document.createElement("div");
      menuitem.classList.add("ytp-menuitem");
      menuitem.setAttribute("role", "menuitem");
      menuitem.appendChild(CreateIcon());
      menuitem.appendChild(CreateLabel());
      menuitem.appendChild(mainDiv);
      return menuitem;
    }

    var menuitem = CreateMenuItem();

    loading = setInterval(function () {
      if ((videoPlayer = document.getElementsByTagName("video")[0])) {
        document.querySelector(".ytp-panel-menu").appendChild(menuitem);
        videoPlayer.playbackRate = playbackRate;
        rangeInput.value = playbackRate;
        document.querySelector("#numInput").value = playbackRate;

        observer = new MutationObserver((changes) => {
          changes.forEach((change) => {
            if (change.attributeName.includes("style")) {
              document.querySelector(".ytp-panel-menu").appendChild(menuitem);

              var playbackJSON = JSON.parse(
                sessionStorage.getItem("yt-player-playback-rate")
              );
              if (!playbackJSON) playbackRate = 1;
              else playbackRate = playbackJSON.data;

              document.querySelector("#numInput").value = playbackRate;
              videoPlayer.playbackRate = playbackRate;
              rangeInput.value = playbackRate;
            }
          });
        });
        observer.observe(videoPlayer, { attributes: true });
        clearInterval(loading);
      }
    }, 100);
  }

  function inject(fnc) {
    const script = document.createElement("script");
    script.text = `(${fnc.toString()})();`;
    document.documentElement.appendChild(script);
  }

  inject(func);
})();
