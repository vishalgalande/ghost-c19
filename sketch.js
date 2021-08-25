var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.width = width/2
  
  ghost = createSprite(300,300,50,50);
  ghost.addImage("ghoststanding",ghostImg)
  ghost.scale = 0.4;
  //ghost.collider(rect,20);

  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
    background(200);


    ghost.debug = true
    
    if(gameState == "play")
    {
      spawnDoor()
      controls()

      if(climbersGroup.isTouching(ghost))
      {
       ghost.velocityY = 0;
      }

      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600 )
      {
        ghost.destroy();
        gameState = "end"
      }

      if(tower.y > 400){
        tower.y = 300
      }
    }
    
    if(gameState == "end")
    {
      
      
      text("GAME OVER", 250, 250)
      
    }
    
    

    drawSprites();
}

function controls()
{
  if(keyDown("space"))
  {
    ghost.velocityY = -6;
  }

  if(keyDown("left_Arrow"))
  {
    ghost.x -= 5;
  }

  if(keyDown("right_Arrow"))
  {
    ghost.x += 5;
  }

  ghost.velocityY += 0.9
  
}

function spawnDoor()
{
  
  if(frameCount % 100 == 0)
  {
    door = createSprite(200,-50,50,50);
    door.addImage("door",doorImg);

    climber = createSprite(200,10,50,50);
    climber.addImage("climber",climberImg);

    door.x = Math.round(random(100, 500))
    climber.x = door.x;

    door.velocityY = 2;
    climber.velocityY = door.velocityY;
    door.depth = 1;
    climber.depth = door.depth;

    door.lifetime = 500;
    climber.lifetime = 500;

    climbersGroup.add(climber);
    doorsGroup.add(door);
    ghost.depth = 2;
    ghost.depth = door.depth;
    ghost.depth +=1;

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 20;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = door.velocityY;
    invisibleBlock.lifetime = 500;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.visible = false;
  }

  
 
}
