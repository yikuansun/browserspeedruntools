window.addEventListener("load", function load(event) {
    iframe = document.createElement("iframe");
    
    iframe.style.width = "250px";
    iframe.style.backgroundImage = "bg_translucent.png";
    iframe.style.height = "0px";
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.right = "0";
    iframe.style.zIndex = "1000000000000000";
    iframe.frameBorder = "none";
    
    iframe.src = chrome.runtime.getURL("popup.html");
    document.body.appendChild(iframe);

    document.addEventListener("keydown", function(e) {
        if (e.key == "Alt" || e.key == "Shift") {
            iframe.focus();
            e.preventDefault();
        }
    }, false);

    iframe.addEventListener("focus", function(e) {
        setTimeout(iframe.blur, 100);
    }, false);
});

function toggle_iframe() {
    if (iframe.style.height == "0px"){
        iframe.style.height = "400px";
    } else {
        iframe.style.height = "0px";
    }
}

chrome.runtime.onMessage.addListener(function(msg, sender) {
    if (msg.action == "must_toggle_iframe"){
        toggle_iframe();
    }
});