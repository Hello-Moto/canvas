var canvas = document.getElementById("mycanvas");
var context = canvas.getContext("2d");
var lastPoint = {
    "x": undefined,
    "y": undefined
};
var lineWidth = 1;
//动态修改页面视口宽高
pageSize();
window.onresize = function() {
    pageSize();
}

var pointing = false;

//特性检测（触屏和非触屏）
if(document.body.ontouchstart !== undefined){
    canvas.ontouchstart = function(a) {
        var x = a.touches[0].clientX;
        var y = a.touches[0].clientY;
        pointing = true;       
        if(usingEraser){
            context.clearRect(x-5, y-5, 10, 10);
        }else{    
            lastPoint = {"x": x, "y": y};
        }
        // drawCircle(x,y,1);
    };
    canvas.ontouchmove = function(a) {
        var x = a.touches[0].clientX;
        var y = a.touches[0].clientY;
        // console.log(x,y);
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
    canvas.ontouchend = function() {
        pointing = false;
    };
}else{
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
}


//canvas画圆
// function drawCircle(x,y,radius) {
//     context.beginPath();
//     context.arc(x,y,radius,0,Math.PI*2);
//     context.fill();
// }

//颜色选区
red.onclick = function() {
    context.fillStyle = "red";
    context.strokeStyle = "red";
    red.classList.add("active");
    blue.classList.remove("active");
    yellow.classList.remove("active");
    black.classList.remove("active");
};
blue.onclick = function() {
    context.fillStyle = "blue";
    context.strokeStyle = "blue";
    blue.classList.add("active");
    red.classList.remove("active");
    yellow.classList.remove("active");
    black.classList.remove("active");
}
yellow.onclick = function() {
    context.fillStyle = "yellow";
    context.strokeStyle = "yellow";
    yellow.classList.add("active");
    red.classList.remove("active");
    blue.classList.remove("active");
    black.classList.remove("active");
}
black.onclick = function() {
    context.fillStyle = "black";
    context.strokeStyle = "black";
    black.classList.add("active");
    red.classList.remove("active");
    blue.classList.remove("active");
    yellow.classList.remove("active");
}

//画笔粗细
one.onclick = function() {
    lineWidth = 1;
}
two.onclick = function() {
    lineWidth = 2;
}
three.onclick = function() {
    lineWidth = 3;
}
five.onclick = function() {
    lineWidth = 5;
}
seven.onclick = function() {
    lineWidth = 7;
}

//清屏
clear.onclick = function() {
    context.clearRect(0,0,canvas.width,canvas.height);
}

//下载画图
download.onclick = function() {
    var url = canvas.toDataURL("image/png");
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.download = "mypicture";
    a.click();
}

//canvas画线
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    // context.strokeStyle = "red";
    context.moveTo(x1,y1);
    context.lineWidth = lineWidth;
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
pen.onclick = function() {
    usingEraser = false;
    pen.classList.add("active");
    eraser.classList.remove("active");
}
eraser.onclick = function() {
    usingEraser = true;
    eraser.classList.add("active");
    pen.classList.remove("active");
};

