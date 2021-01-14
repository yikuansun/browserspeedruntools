function save_options() {
    startKey = document.getElementById("alt").value;
    splitKey = document.getElementById("shift").value;
    topbottom = document.getElementById("verticalAlign").value;
    leftright = document.getElementById("horizontalAlign").value;
    hueRotate = document.getElementById("hueslider").value;
    chrome.storage.sync.set({
        startKey: startKey,
        splitKey: splitKey,
        topbottom: topbottom,
        leftright: leftright,
        hueRotate: hueRotate
    }, function() {
        var status = document.getElementById("status");
        status.innerText = "Settings saved. Reload pages to use updated settings";
        setTimeout(function() {
            status.textContent = "";
        }, 5000);
    });
}

document.getElementById("hueslider").oninput = function() {
    document.getElementById("colordisp").style.filter = "hue-rotate(" + this.value.toString() + "deg)";
}

alphabetkeys = "abcdefghijklmnopqrstuvwxyz".split("");
numberkeys = "1234567890".split("");

for (key of alphabetkeys) {
    optionTag = document.createElement("option");
    optionTag.innerHTML = key;
    document.getElementById("alt").appendChild(optionTag);
    optionTag = document.createElement("option");
    optionTag.innerHTML = key;
    document.getElementById("shift").appendChild(optionTag);
}

for (key of numberkeys) {
    optionTag = document.createElement("option");
    optionTag.innerHTML = key;
    document.getElementById("alt").appendChild(optionTag);
    optionTag = document.createElement("option");
    optionTag.innerHTML = key;
    document.getElementById("shift").appendChild(optionTag);
}

document.querySelector("button").onclick = save_options;

chrome.storage.sync.get(null, function(data) {
    startKey = data.startKey;
    splitKey = data.splitKey;
    topbottom = data.topbottom;
    leftright = data.leftright;
    hueRotate = data.hueRotate;
    document.getElementById("alt").value = startKey;
    document.getElementById("shift").value = splitKey;
    document.getElementById("verticalAlign").value = topbottom;
    document.getElementById("horizontalAlign").value = leftright;
    document.getElementById("hueslider").value = hueRotate;
    document.getElementById("colordisp").style.filter = "hue-rotate(" + hueRotate.toString() + "deg)";
});