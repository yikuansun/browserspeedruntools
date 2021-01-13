AltToStartClock = true;

time = document.getElementById("time");
clock = 0;

splits = document.getElementById("splits");

clockDisp = function() {
    s = (clock % 60000) / 1000;
    m = Math.floor(clock / 60000);
    s_display = (s < 10)?("0"+s.toString()):(s.toString());
    time.innerHTML = m.toString() + ":" + s_display;
};

updateClock = function() {
    clock += 10;
    clockDisp();
};

window.addEventListener("message", function(e) {
    if (e.data == "start/stop") {
        if (AltToStartClock) {
            clock = 0;
            splits.innerHTML = "";
            mainLoop = setInterval(updateClock, 10);
            AltToStartClock = false;
        }
        else {
            clearInterval(mainLoop);
            AltToStartClock = true;
        }
    }
    else if (e.data == "record split") {
        splitText = document.createElement("div");
        splitText.innerHTML = time.innerText;
        splitText.setAttribute("class", "splitText");
        splits.appendChild(splitText);
    }
}, false);