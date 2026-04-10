var ALLOWED_COLORS = ["col1", "col2", "col3"];

var circles = document.querySelectorAll(".circle"),
light = 0;

setInterval(function() {
    changelight();
}, 8000);

function changelight(){
    circles[light].classList="circle";
    light++;

    if(light>2){
        light = 0;
    }
    var selectlight = circles[light];
    var colorAttr = selectlight.getAttribute("color");

    if (ALLOWED_COLORS.indexOf(colorAttr) !== -1) {
        selectlight.classList.add(colorAttr);
    }
}
