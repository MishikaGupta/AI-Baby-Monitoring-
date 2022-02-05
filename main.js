status = "";
objects = [];
song = "";

function preload() {
 song = loadSound("alarm.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd' ,  modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Baby";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectdetector.detect(video,gotResult);
}

function gotResult(error , results) {
    if (error) {
        console.log(error);
        
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectdetector.detect(video , gotResult);
         for(i = 0; i < objects.length; i++)
         {
             document.getElementById("status").innerHTML = "Status : Object Detector";
             document.getElementById("no_of_objects").innerHTML = "Number of Objects detected are : " + objects.length;

             fill(r,g,b);
             percent = floor(objects[i].confidence*100);
             text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
             noFill();
             stroke(r,g,b);
             rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

             if(objects[i].label == "person")
             {
                 document.getElementById("no_of_objects").innerHTML = "Baby Found";
                 song.stop();
             }
             else
             {
                 document.getElementById("no_of_objects").innerHTML = "Baby NOT Found";
                 song.play();
             }
         }

         if(objects.length == 0)
         {
            document.getElementById("no_of_objects").innerHTML = "Baby NOT Found";
            song.play();
         }
    }
}

