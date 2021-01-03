const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var backgroundImg;
var scene = "bg.png";
var score=0;

function preload(){
  polygon_img=loadImage("polygon.png");
  getBackground();
}

function setup() {
  createCanvas(800,500);
  engine = Engine.create();
  world = engine.world;

  ground1= new Ground(400,450,800,5);
  ground2= new Ground(360,270, 170,10);

  //bottom
  box1= new Box(300,245,30,40);  
  box2= new Box(330,245,30,40);
  box3= new Box(360,245,30,40);
  box4= new Box(390,245,30,40);
  box5= new Box(420,245,30,40);
  //middle
  box6= new Box(330,205,30,40);
  box7= new Box(360,205,30,40);
  box8= new Box(390,205,30,40);
  //top
  box9= new Box(360,165,30,40);


  polygon = Bodies.circle(100,50,30);
  World.add(world,polygon);

  slingShot= new SlingShot(this.polygon,{x:100, y:50});

  Engine.run(engine);
}

function draw() {
  if(backgroundImg){
    background(backgroundImg);
  } 
  textSize(20);
  text("Score: "+ score,700,40);
  drawSprites();

  box1.display();
  box1.score();
  box2.display();
  box2.score();
  box3.display();
  box3.score();
  box4.display();
  box4.score();
  box5.display();
  box5.score();
  box6.display();
  box6.score();
  box7.display();
  box7.score();
  box8.display();
  box8.score();
  box9.display();
  box9.score();

  imageMode(CENTER)
  image(polygon_img ,polygon.position.x,polygon.position.y,40,40);

  slingShot.display();

  ground1.display();
  ground2.display();
}

function mouseDragged(){
  Matter.Body.setPosition(this.polygon, {x: mouseX , y: mouseY});
}

function mouseReleased(){
  slingShot.fly();
}

function keyPressed(){
  if(keyCode === 32){
    slingShot.Attach(this.polygon);
    Matter.Body.setPosition(this.polygon, {x:100, y:50});
  }
}

async function getBackground(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London");
  var responseJSON = await response.json();

  var datetime= responseJSON.datetime;
  var hour = datetime.slice(11,13);

  if(hour >= 06 && hour <= 18){
      scene = "bg.png"; 
  } else {
      scene = "bg2.jpg";
  }
  backgroundImg=loadImage(scene);
}
