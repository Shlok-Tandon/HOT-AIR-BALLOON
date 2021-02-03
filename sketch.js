var balloon,balloonImg,balloonPos;
var bgImg;
var database;
var height;

function preload() {
  bgImg = loadImage("Hot Air Ballon-01.png");
  balloonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png" , "Hot Air Ballon-04.png" );
}

function setup() {
  createCanvas(1200,600);
 
  database = firebase.database();

  balloon = createSprite(150,400,50,50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale = 0.5;
  
  balloonPos = database.ref('balloon/height');
  balloonPos.on("value",readHeight,showError);
}

function draw() {
  background(bgImg); 
 //if(height !== undefined){

 
  if (keyDown(UP_ARROW)) {
    updateHeight(0,-10);
    balloon.addAnimation("balloon",balloonImg);
    balloon.scale = balloon.scale - 0.01;
  }

  if (keyDown(DOWN_ARROW)) {
    updateHeight(0,10);
    balloon.scale = balloon.scale + 0.01
  }

  if (keyDown(LEFT_ARROW)) {
    updateHeight(-10,0);
  }

  if (keyDown(RIGHT_ARROW)) {
    updateHeight(10,0);
  }
  drawSprites();

//}
  textSize(30);
  fill("black");
  text("USE ARROW KEYS TO MOVE THE BALLOON .",10,50)
}

function updateHeight(x,y) {

  database.ref('balloon/height').set({
    'x' : height.x + x,
    'y' : height.y + y
  })
}

function readHeight(data) {

  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y
}

function showError() {

  console.log("error");
}