img = "";
Status = "";
objects = [];

function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}


function preload()
{
    img = loadImage("3.jpg");
}

function draw()
{
    image(img,0,0,640,420);

    if (Status != "")
    {
        for (i = 0; i < objects.length; i++)
        {
           document.getElementById("status").innerHTML = "Status: Object Detected";

           fill("#761BB2");
           percent = floor(objects[i].confidence*100);
           text(objects[i].label + "" + percent + "%" , objects[i].x,objects[i].y);
           noFill();
           stroke("#761BB2");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded");
    Status = true;
    object_detector.detect(img,gotResult);
}

function gotResult(error,results)
{
    if (error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}