song="";
leftWristScore=0;
rightWristScore=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas= createCanvas(500,500);
    canvas.center()
    // canvas.position(375,160);

    video= createCapture(VIDEO);
    video.hide();

    poseNet= ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Model Loaded");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristScore= results[0].pose.keypoints[9].score;
        rightWristScore= results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score: "+leftWristScore+" Right Wrist Score: "+rightWristScore);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        console.log("Left Wrist X: "+leftWristX+" Left Wrist Y: "+leftWristY);
        console.log("Right Wrist X: "+rightWristX+" Right Wrist Y: "+rightWristY);
    }
}
function draw(){
    image(video,0,0,600,500);

    fill("#9673d1");
    stroke("#9673d1");

    if(leftWristScore>0.2){
        circle(leftWristX,leftWristY,20);
        number_leftWristY= Number(leftWristY);
        remove_decimals= floor(number_leftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume_result").innerHTML=volume;
        song.setVolume(volume);
    }
    if(rightWristScore>0.1){
        circle(rightWristX,rightWristY,20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed_result").innerHTML="0.5x";
            song.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed_result").innerHTML="1x";
            song.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed_result").innerHTML="1.5x";
            song.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed_result").innerHTML="2";
            song.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed_result").innerHTML="2.5";
            song.rate(2.5);
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}