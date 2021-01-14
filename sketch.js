var PLAY = 1;
var END = 0;
var gameState = 1;

var knife,fruitGroup,enemyGroup,score;
var gameoverImage;
var fruit,fruit1,fruit2,fruit3,fruit4;
var monsterImage;
var sound1,sound2;

function preload(){
  
  knifeImage = loadImage("sword.png"); 
  gameoverImage = loadImage("gameover.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");                       
  fruit3 = loadImage("fruit3.png");                        
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  
  sound1 = loadSound("knifeSwooshSound.mp3");
  sound2 = loadSound("gameover.mp3");
  
 
}

function setup(){
   createCanvas(400,400);
  
  knife = createSprite(220,160,20,20);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  
  score = 0;
  
  
}

function draw(){
  
  background("yellow");
  
  
  if(gameState === PLAY){
    
    fruits();
    enemy();
    
    knife.x = World.mouseX;
    knife.y = World.mouseY;
    
    
    if(fruitGroup.isTouching(knife)){
       sound1.play();
       fruitGroup.destroyEach();
       score = score+4;
    }
    
    else
      {
     if(enemyGroup.isTouching(knife)){
       
        gameState = END;
       
        sound2.play();
       
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        
        knife.addImage(gameoverImage);
        knife.x=200;
        knife.y=200;
      }
  }
    
  }
  
  
  
drawSprites();
  
    text("Score: "+ score,300,30);
}

function fruits(){
  if(World.frameCount % 80 === 0){
    
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
  
    if(position === 1){
      fruit.x = 400;
      fruit.velocityX = -(8+score/4);
    }
    else
      {
      if(position === 2){
        fruit.x = 0;
        fruit.velocityX = (7 + score/5);
        
        }
      }
    
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1);
    }else if(r == 2){
      fruit.addImage(fruit2);
    }else if(r == 3){
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
    
    
    fruit.y = Math.round(random(50,340));
    
    
    fruit.setLifetime = 100;
    

    fruitGroup.add(fruit);
     
    }
  
}

function enemy(){
  
  if(World.frameCount %200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -8;
    monster.setLifetime = 50;
    
    if(score > 10){
      monster.velocityX =-12;
    }
    
    enemyGroup.add(monster);
    
    
  }
  

}
