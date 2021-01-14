window.addEventListener("load", function load(event) {
    function now() {
        return ((new Date()).getTime());
    }

    scheme = ["#141414", "#002F63", "#003D82", "#0C53A6", "#2B6ABC"];

    AltToStartClock = true;

    stopwatch = document.createElement("stopwatch");
    stopwatch.style.backgroundImage = "url('" + chrome.runtime.getURL("bg_translucent.png") + "')";
    stopwatch.style.color = scheme[0];
    stopwatch.style.position = "fixed";
    stopwatch.style.width = "250px";
    stopwatch.style.height = "0px";
    stopwatch.style.overflowY = "hidden";
    stopwatch.style.zIndex = "6969";
    stopwatch.style.top = "0";
    stopwatch.style.right = "0";
    stopwatch.style.filter = "hue-rotate(0deg)";
    stopwatch.style.display = "flex";
    stopwatch.style.flexFlow = "column";
    document.body.appendChild(stopwatch);

    decobar = document.createElement("div");
    decobar.style.width = "100%";
    decobar.style.height = "5px";
    decobar.style.backgroundColor = scheme[1];
    stopwatch.appendChild(decobar);

    time = document.createElement("div");
    clock = 0;
    time.innerHTML = "0:00";
    time.style.fontFamily = "Trebuchet MS";
    time.style.color = scheme[4];
    time.style.marginTop = "5px";
    time.style.marginLeft = "10px";
    time.style.marginBottom = "5px";
    time.style.fontSize = "40px";
    stopwatch.appendChild(time);

    splits = document.createElement("div");
    splits.style.flex = "1 1 auto";
    splits.style.overflow = "scroll";
    stopwatch.appendChild(splits);

    updateClock = function() {
        console.log(clock)
        clock = now() - startTime;
        clockDisp();
    };

    clockDisp = function() {
        s = (clock % 60000) / 1000;
        m = Math.floor(clock / 60000);
        s_display = (s < 10)?("0"+s.toString()):(s.toString());
        time.innerHTML = m.toString() + ":" + s_display;
    };

    document.addEventListener("keydown", function(e) {
        if (!e.repeat) {
            if (e.key == "Alt") {
                if (AltToStartClock) {
                    clock = 0;
                    startTime = now();
                    splits.innerHTML = "";
                    mainLoop = setInterval(updateClock, 10);
                    AltToStartClock = false;
                }
                else {
                    clearInterval(mainLoop);
                    AltToStartClock = true;
                }
                e.preventDefault();
            }
            else if (e.key == "Shift") {
                splitText = document.createElement("div");
                splitText.innerHTML = time.innerText;
                splitText.style.color = scheme[3];
                splitText.style.fontSize = "24px";
                splitText.style.fontFamily = "Trebuchet MS";
                splitText.style.marginLeft = "12px";
                splitText.style.marginTop = "2px";
                splitText.style.marginBottom = "2px";
                splits.appendChild(splitText);
                e.preventDefault();
            }
        }
    }, false);
});

function toggle_iframe() {
    if (stopwatch.style.height == "0px"){
        stopwatch.style.height = "400px";
    } else {
        stopwatch.style.height = "0px";
    }
}

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.action == "must_toggle_iframe"){
        toggle_iframe();
    }
});