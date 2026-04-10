function showl(){
    var show = document.getElementById("iframe");
    show.style.display = "block";
    show.style.zIndex = "-21"
}

document.addEventListener("DOMContentLoaded", function() {
    var linkLights = document.getElementById("link-lights");
    var linkTraffic = document.getElementById("link-traffic");

    if (linkLights) {
        linkLights.addEventListener("click", showl);
    }
    if (linkTraffic) {
        linkTraffic.addEventListener("click", showl);
    }
});
