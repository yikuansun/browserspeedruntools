window.addEventListener("load", function load(event) {
    chrome.storage.sync.get(null, function(data) {
        startKey = data.startKey;
        splitKey = data.splitKey;
        topbottom = data.topbottom;
        leftright = data.leftright;
        hueRotate = data.hueRotate;
        if (!Boolean(startKey)) {
            startKey = "Alt";
            splitKey = "Shift";
            topbottom = "top";
            leftright = "right";
            hueRotate = "0";
        }

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
        if (topbottom == "top") {
            stopwatch.style.top = "0";
        }
        else {
            stopwatch.style.bottom = "0";
        }
        if (leftright == "right") {
            stopwatch.style.right = "0";
        }
        else {
            stopwatch.style.left = "0";
        }
        stopwatch.style.filter = "hue-rotate(" + hueRotate + "deg)";
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

        keylog = document.createElement("div");
        keylog.style.fontSize = "12px";
        keylog.style.padding = "5px";
        keylog.style.color = "grey";
        keylog.innerText = "Keys pressed: ";
        keylog.style.fontFamily = "Trebuchet MS";
        stopwatch.appendChild(keylog);
    
        footer = document.createElement("div");
        stopwatch.appendChild(footer);
    
        settingsButton = document.createElement("button");
        settingsButton.style.fontSize = "14px";
        settingsButton.style.fontFamily = "Courier";
        settingsButton.style.color = "white";
        settingsButton.style.backgroundColor = scheme[2];
        settingsButton.innerText = "Settings";
        settingsButton.onclick = function() { chrome.runtime.sendMessage({"action": "openOptionsPage"}); };
        footer.appendChild(settingsButton);

        decoIcon = document.createElement("img");
        decoIcon.src = chrome.runtime.getURL("icon128.png");
        decoIcon.style.position = "absolute";
        decoIcon.style.bottom = "0";
        decoIcon.style.right = "10px";
        decoIcon.style.width = "50px";
        decoIcon.style.height = "50px";
        decoIcon.style.filter = "hue-rotate(" + (0 - parseFloat(hueRotate)).toString() + "deg)";
        stopwatch.appendChild(decoIcon);
    
        updateClock = function() {
            clock = now() - startTime;
            clockDisp();
        };
    
        clockDisp = function() {
            s = (clock % 60000) / 1000;
            m = Math.floor(clock / 60000);
            s_display = (s < 10)?("0"+s.toFixed(2)):(s.toFixed(2));
            time.innerHTML = m.toString() + ":" + s_display;
        };
    
        keymap = {};

        document.addEventListener("keydown", function(e) {
            if (!e.repeat) {
                if (e.key == startKey) {
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
                else if (e.key == splitKey) {
                    splitText = document.createElement("div");
                    splitText.innerHTML = time.innerText;
                    splitText.style.color = scheme[3];
                    splitText.style.fontSize = "24px";
                    splitText.style.fontFamily = "Trebuchet MS";
                    splitText.style.marginLeft = "12px";
                    splitText.style.marginTop = "2px";
                    splitText.style.marginBottom = "2px";
                    splits.appendChild(splitText);
                    splits.scrollTop = splits.scrollHeight;
                    e.preventDefault();
                }
            }

            keymap["1234567890abcdefghijklmnopqrstuvwxyz".includes(e.key)?e.key.toUpperCase():e.code] = true;
            outstring = "Keys pressed: ";
            for (keypressed in keymap) {
                if (keymap[keypressed]) {
                    outstring += keypressed + "; ";
                }
            }
            keylog.innerText = outstring;
        }, false);

        document.addEventListener("keyup", function(e) {
            keymap["1234567890abcdefghijklmnopqrstuvwxyz".includes(e.key)?e.key.toUpperCase():e.code] = false;
            outstring = "Keys pressed: ";
            for (keypressed in keymap) {
                if (keymap[keypressed]) {
                    outstring += keypressed + "; ";
                }
            }
            keylog.innerText = outstring;
        });
    });
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