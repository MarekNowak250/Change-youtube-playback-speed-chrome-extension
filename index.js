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

  function setVisibility(videoPlayer){
    if(videoPlayer.style.top !== "0px" || videoPlayer.style==null){
      mainDiv.style.display = "none";
      mainDiv.style.visibility = "hidden";}
      else{
      mainDiv.style.display = "block";
      mainDiv.style.visibility = "visible";
      videoPlayer.playbackRate = playbackRate;
      }
  }
  
  var sessionStorage = window.sessionStorage;
  var videoPlayer;
  var mainDiv = document.createElement("div");
  mainDiv.style.position = "fixed";
  mainDiv.style.bottom = "2.5vh";
  mainDiv.style.left = "30%";
  mainDiv.style.color = "white";
  var playbackRate = 1;
  var playbackJSON = JSON.parse(sessionStorage.getItem("yt-player-playback-rate"));
  console.log(playbackJSON)
  if(!playbackJSON)
    playbackRate = 1;
  else
    playbackRate = playbackJSON.data;

  loading = setInterval(function () {
    if (videoPlayer= document.getElementsByTagName("video")[0]) {
      setVisibility(videoPlayer);

      observer = new MutationObserver((changes) => {
        changes.forEach(change => {
            if(change.attributeName.includes('style')){
              setVisibility(videoPlayer);

              var playbackJSON = JSON.parse(sessionStorage.getItem("yt-player-playback-rate"));
              console.log(playbackJSON)
              if(!playbackJSON)
                playbackRate = 1;
              else
                playbackRate = playbackJSON.data;
            }
        });
      });
      observer.observe(videoPlayer, {attributes : true});
      clearInterval(loading);
    }
  }, 100); 


  var currentValLabel = document.createElement("p");
  currentValLabel.innerHTML = "Current speed: 1";
  currentValLabel.setAttribute("id", "currentValRange");
  currentValLabel.style.position = "relative";
  currentValLabel.style.left = "40%";
  currentValLabel.style.fontSize = "1.4rem";
  mainDiv.appendChild(currentValLabel);


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
    document.querySelector("#currentValRange").innerHTML = "Current speed: " +newValue;
    sessionStorage.setItem("yt-player-playback-rate", '{"data":"'+newValue+'","creation":'+new Date().getTime()+'}');
  });
  
  rangeInput.style.width = "20vw";
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

  document.body.appendChild(mainDiv);

   
 currentValLabel.innerHTML = "Current speed: " + playbackRate;
 rangeInput.value = playbackRate;
  }

  function inject(fn) {
    const script = document.createElement('script')
    script.text = `(${fn.toString()})();`
    document.documentElement.appendChild(script)
  }

  inject(script)
})()
