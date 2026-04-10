function light_on(){
    var image = document.getElementById("img_show");
    image.src = "/img/bulb_off.gif";
}

function light_off(){
    var image = document.getElementById("img_show");
    image.src = "/img/bulb_on.gif";
}

document.addEventListener("DOMContentLoaded", function() {
    var btnOn = document.getElementById("light_on");
    var btnOff = document.getElementById("light_off");

    if (btnOn) {
        btnOn.addEventListener("click", light_on);
    }
    if (btnOff) {
        btnOff.addEventListener("click", light_off);
    }
});
