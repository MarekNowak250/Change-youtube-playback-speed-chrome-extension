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


  var mainDiv = document.createElement("div");
  mainDiv.style.position = "fixed";
  mainDiv.style.bottom = "2.5vh";
  mainDiv.style.left = "30%";
  mainDiv.style.color = "white";

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
     document.getElementsByTagName("video")[0].playbackRate = newValue;
    document.querySelector("#currentValRange").innerHTML = "Current speed: " +newValue });
  rangeInput.style.width = "20vw";
  rangeInput.value = 1;
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

      //myStorage = window.sessionStorage;
     // myStorage.setItem('yt-player-playback-rate', '{"data":"5","creation":'+new Date().getTime()+'}');
  }

  function inject(fn) {
    const script = document.createElement('script')
    script.text = `(${fn.toString()})();`
    document.documentElement.appendChild(script)
  }

  inject(script)
})()
