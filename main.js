var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
var lastPoint = {
    "x": undefined,
    "y": undefined
};
//动态修改页面视口宽高
pageSize();
window.onresize = function() {
    pageSize();
}

var pointing = false;
//鼠标按下
canvas.onmousedown = function(a) {
    var x = a.clientX;
    var y = a.clientY;
    pointing = true;       
    if(usingEraser){
        context.clearRect(x-5, y-5, 10, 10);
    }else{    
        lastPoint = {"x": x, "y": y};
    }
    // drawCircle(x,y,1);
};
//鼠标移动
canvas.onmousemove = function(a) {
    var x = a.clientX;
    var y = a.clientY;
    if(usingEraser){
        if(pointing == true){
            context.clearRect(x-5, y-5, 10, 10);
        }
    }else{
        if(pointing == true){
            var newPoint = {"x": x, "y": y};
            // drawCircle(x,y,1);
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    }
};
//鼠标松开
canvas.onmouseup = function(a) {
    pointing = false;
};
//canvas画圆
function drawCircle(x,y,radius) {
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
}
//canvas画线
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    context.strokeStyle = "#000";
    context.moveTo(x1,y1);
    context.lineWidth = 2;
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}
//适应视口宽高
function pageSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height= pageHeight;
}

//橡皮擦
var usingEraser = false;
eraser.onclick = function() {
    usingEraser = true;
    action.className = "action x";
};  
brash.onclick = function() {
    usingEraser = false;
    action.className = "action";
};
