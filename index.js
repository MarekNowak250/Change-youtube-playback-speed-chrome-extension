;(function () {

  function script() {
      function createOption(value, label){
    var option = document.createElement("option");
     option.setAttribute("value", value);
    if(!label){
      return option;
    }
     option.setAttribute("label", label);
     return option;
  }

  var sessionStorage = window.sessionStorage;
  var videoPlayer;
  var mainDiv = document.createElement("div");
  mainDiv.classList.add("ytp-menuitem-content");

  var playbackRate = 1;
  var playbackJSON = JSON.parse(sessionStorage.getItem("yt-player-playback-rate"));
  console.log(playbackJSON)
  if(!playbackJSON)
    playbackRate = 1;
  else
    playbackRate = playbackJSON.data;

  var rangeInput = document.createElement("input");
  rangeInput.setAttribute("type", "range");
  rangeInput.setAttribute("id", "speed");
  rangeInput.setAttribute("name", "speed");
  rangeInput.setAttribute("step", "0.1");
  rangeInput.setAttribute("min", "0.1");
  rangeInput.setAttribute("max", "5");
  rangeInput.setAttribute("list", "tickmarks");
  rangeInput.addEventListener("change", () => { var newValue = document.querySelector("#speed").value;
    videoPlayer.playbackRate = newValue;
    document.querySelector("#speedLabel").innerHTML = "Current speed: " +newValue;
    sessionStorage.setItem("yt-player-playback-rate", '{"data":"'+newValue+'","creation":'+new Date().getTime()+'}');
  });
  rangeInput.style.minWidth = "150px";
  rangeInput.style.width = "10vw"
  //rangeInput.style.maxWidth = "400px";
  mainDiv.appendChild(rangeInput);

  var tickmarks = document.createElement("datalist");
  tickmarks.style.color = "white";
  tickmarks.style.backgroundColor = "white";
  tickmarks.setAttribute("id", "tickmarks");
  tickmarks.appendChild(createOption(0.1));
  tickmarks.appendChild(createOption(0.2));
  tickmarks.appendChild(createOption(0.25));
  tickmarks.appendChild(createOption(0.35));
  tickmarks.appendChild(createOption(0.50));
  tickmarks.appendChild(createOption(0.75));
  tickmarks.appendChild(createOption(0.90));
  tickmarks.appendChild(createOption(1));
  tickmarks.appendChild(createOption(1.25));
 tickmarks.appendChild(createOption(1.5));
  tickmarks.appendChild(createOption(2));
 tickmarks.appendChild(createOption(2.5));
  tickmarks.appendChild(createOption(3));
 tickmarks.appendChild(createOption(3.5));
  tickmarks.appendChild(createOption(4));
 tickmarks.appendChild(createOption(5));
mainDiv.appendChild(tickmarks);

var menuitem = document.createElement("div");
menuitem.classList.add("ytp-menuitem");
menuitem.setAttribute("role", "menuitem");
var icon = document.createElement("div");
icon.classList.add("ytp-menu-icon");
var itemLabel = document.createElement("div");
itemLabel.classList.add("ytp-menuitem-label");
itemLabel.id = "speedLabel";
menuitem.append(icon);
menuitem.append(itemLabel);
menuitem.append(mainDiv);


    loading = setInterval(function () {
    if (videoPlayer= document.getElementsByTagName("video")[0]) {
      document.querySelector(".ytp-panel-menu").appendChild(menuitem);
      videoPlayer.playbackRate = playbackRate;
      rangeInput.value = playbackRate;
      observer = new MutationObserver((changes) => {
        changes.forEach(change => {
            if(change.attributeName.includes('style')){
              document.querySelector(".ytp-panel-menu").appendChild(menuitem);
              
              var playbackJSON = JSON.parse(sessionStorage.getItem("yt-player-playback-rate"));
              if(!playbackJSON)
                playbackRate = 1;
              else
                playbackRate = playbackJSON.data;

                videoPlayer.playbackRate = playbackRate;
                rangeInput.value = playbackRate;
            }
        });
      });
      observer.observe(videoPlayer, {attributes : true});
      clearInterval(loading);
    }
  }, 100); 
   
 itemLabel.innerHTML = "Current speed: " + playbackRate;

  }

  function inject(fn) {
    const script = document.createElement('script')
    script.text = `(${fn.toString()})();`
    document.documentElement.appendChild(script)
  }

  inject(script)
})()
