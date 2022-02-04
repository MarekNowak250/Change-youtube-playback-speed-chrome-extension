(function () {
  function func() {
    function setNewSpeed(val) {
      let newValue = this.value;

      if (isNaN(newValue)) newValue = val;
      if (newValue > 10) newValue = 10;
      if (newValue < 0.1) newValue = 0.1;
      if (newValue == 0.35) newValue = 0.25;

      newValue = Number(newValue).toFixed(2);
      videoPlayer.playbackRate = newValue;

      let rangeinp = document.querySelector("#speed");
      let numinp = document.querySelector("#numInput");

      if (rangeinp.value != newValue) {
        rangeinp.value = newValue;
      }
      if (numinp.value != newValue) {
        numinp.value = newValue;
      }
      playbackRate = newValue;

      sessionStorage.setItem(
        "yt-player-playback-rate",
        '{"data":"' + newValue + '","creation":' + new Date().getTime() + "}"
      );
    }

    function keyDownHandler(e) {
      if (e.key == "a" || e.key == "A") {
        setNewSpeed(Number(playbackRate) - 0.25);
      } else if (e.key == "d" || e.key == "D") {
        setNewSpeed(Number(playbackRate) + 0.25);
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

    function getParentElement(elem, times) {
      let parent;
      if (times == 0) return elem;
      if ((parent = elem.parentElement))
        return getParentElement(elem.parentElement, times - 1);
      else return false;
    }

    var sessionStorage = window.sessionStorage;
    var videoPlayer;
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("ytp-menuitem-content");

    var playbackRate = 1;
    var playbackJSON = JSON.parse(
      sessionStorage.getItem("yt-player-playback-rate")
    );

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
    var videoPlayers;

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
      if ((videoPlayers = document.getElementsByTagName("video"))) {
        if (videoPlayers.length < 1) return;
        if (videoPlayers.length > 1) {
          var preview = document.getElementById("preview");
          if (preview.contains(videoPlayers[0])) videoPlayer = videoPlayers[1];
          else videoPlayer = videoPlayers[0];
        } else videoPlayer = videoPlayers[0];

        let keydownElement;
        if ((keydownElement = document.querySelector("#content"))) {
          keydownElement.addEventListener("keydown", keyDownHandler);
        } else return;

        getParentElement(videoPlayer, 2)
          .querySelector(".ytp-panel-menu")
          .appendChild(menuitem);

        videoPlayer.playbackRate = playbackRate;
        rangeInput.value = playbackRate;
        document.querySelector("#numInput").value = playbackRate;

        observer = new MutationObserver((changes) => {
          changes.forEach((change) => {
            if (change.attributeName.includes("src")) {
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
    }, 1000);
  }

  function inject(fnc) {
    const script = document.createElement("script");
    script.text = `(${fnc.toString()})();`;
    document.documentElement.appendChild(script);
  }

  inject(func);
})();
