
let canvas;
let ctx;
// 캔버스 만들기 
canvas=document.createElement("canvas");
// 그리는 도구 
ctx =canvas.getContext("2d");

canvas.width=400;
canvas.height=700;
// 위에있는 가로 세로 를 캔버스에 넣기 
document.body.appendChild(canvas);

//  가져올이미지 정의
let backgeoundImage,spaceshipImg,bulletImage,enemyImage,gameOverImage;

//  게임오버 
let gameOver=false//게임이 true 면 끝남 ,false면 계속 게임진행

// 스코어
let score=0;

// 우주선은 중앙에서 생성해야되서 따로 좌표만들기.
let spaceshipX=canvas.width/2-32;
let spaceshipY=canvas.height-64;

// 미사일좌표 함수
// 미사일 좌표배열에 저장
let bulletList=[]//미사일 저장하는 리스트

function bullet(){
  this.x=0;
  this.y=0;
  this.init=function(){
    this.x=spaceshipX+10;
    this.y=spaceshipY;
    //총알의 상태(우주선과 부딪힘)
    this.alive=true//true면 살아있는총알 false면 죽은 총알


    bulletList.push(this)
  };
  this.update=function(){
    this.y -=7;// 미사일 발사되는 속도
  };
  this.checkHit=function(){
    for(let i=0;i<enemyList.length;i++){
      if(this.y <=enemyList[i].y && 
         this.x >= enemyList[i].x && 
         this.x<= enemyList[i].x + 64){
         score++;
         this.alive =false//죽은총알
         enemyList.splice(i,1);
         }

    }
  }
}
// 적군 나오는 함수
function generatRandomValue(min,max){//최대 최소값
  let randomNum=Math.floor(Math.random()*(max-min+1))+min
  //(0~1까지 랜덤숫자 생성)
  return randomNum;
}
let enemyList=[]
function Enemy(){
  this.x=0;
  this.y=0;
  this.init=function(){
    this.y=0;
    this.x=generatRandomValue(0,canvas.width-64)
    enemyList.push(this)
  }
  this.update=function(){
    this.y += 2 //적군의 속도 조절

    if(this.y>=canvas.height-64){
      gameOver=true;
      
    }
  }
}

// 이미지를 불러올 함수만들기()
function loadImage(){
  backgeoundImage=new Image();
  backgeoundImage.src="img/background.jpg";

  spaceshipImg=new Image();
  spaceshipImg.src="img/spaceship.png";

  bulletImage=new Image();
  bulletImage.src="img/bullet.png";

  enemyImage=new Image();
  enemyImage.src="img/enemy.png";
  
  gameOverImage=new Image();
  gameOverImage.src="img/gameover.png";

}

// 사용한 버튼을 저장

let keysDown={}

function setupkeyboardListener(){
  document.addEventListener("keydown",function(event){
    
    
    keysDown[event.keyCode]=true;
    console.log("어떤 버튼",keysDown);      
  })
  document.addEventListener("keyup",function(event){
    delete keysDown[event.keyCode]
    console.log("버튼클릭후",keysDown);
    
    // 미사일 발사시 스페이드  32
    if(event.keyCode==32){
      createBullet() //미사일생성
    }
  });
}
function createBullet(){
  console.log("미사일생성")
  let b= new bullet(); //미사일 생성
  b.init();
}

// 적군생성 함수
function creatEnemy(){
  const interval=setInterval(function(){
     let e=new Enemy();
     e.init();
  },1000)
}

// 우주선이 움직이는 좌표 함수()!!

function update(){
  if(39 in keysDown){ //right오른쪽
    spaceshipX +=5;
  }
  if(37 in keysDown){ //왼쪽
    spaceshipX -=5;
  }
  if(spaceshipX <=0){
     spaceshipX =0;
  }
  if(spaceshipX >=canvas.width-48){
     spaceshipX = canvas.width-48;
  }
  if(38 in keysDown){
     spaceshipY -=5;
   }
   if(40 in keysDown){
     spaceshipY +=5;
   }

// 미사일의 y좌표를 업데이트 하는 함수
for(let i=0;i<bulletList.length;i++){
  if(bulletList[i].alive){
    bulletList[i].update();
    bulletList[i].checkHit();
  }
}

for(let i=0;i<enemyList.length;i++){
  enemyList[i].update();
} 
}
//  canvas

// 이미지 그리는 함수()!!!

function render(){
  // 배경화면
    ctx.drawImage(backgeoundImage,0,0,canvas.width,canvas.height);
  // 우주선 화면출력
    ctx.drawImage(spaceshipImg,spaceshipX,spaceshipY);
  
  // 스코어 화면에 출력
    ctx.filltext("Score:${score}",20,20);
    ctx.fillstyle="white";
    ctx.font="20px Arial"
  // 미사일 화면출력
  for(let i=0;i<bulletList.length;i++){
  //미사일 이 적군에 안맞았을때 만 보여줘
    if(bulletList[i].alive){
      ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y)

    }
  }
  // 적군 화면출력
  for(let i=0;i<enemyList.length;i++){
    ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y)
  }
}
function main(){
  if(!gameOver){
    update(); //우주선 좌표값 업데이트 반복함수
    render(); //그려주는 도구함수
    requestAnimationFrame(main);
  }else{
    ctx.drawImage(gameOverImage,10,100,380,380);
  }
}
loadImage();
setupkeyboardListener()
creatEnemy();
main();
// 방향키를 누르면 우주선 xy좌표 바뀌기
// 다시 reder 그려주기

// 미사일 그리기
// 1. 스페이스 바를 누르면 미사일 발사
// 2. 미사일 발사 = 미사일의 y값이 - (점점 줄어들고), 미사일의 x값은 스페이스를
//  누른순간 우주선 좌표에서 발사
// 3. 배열에 미사일들을 좌표를 저장
// 4. 미사일들은 x,y 좌표값이 있어야한다.

// 적군 만들기
// 적군 위치 랜덤
// 위에서 밑으로 내려온다. = y좌표가 증가
// 1초마다 1개씩 적군이 생긴다.
// 적군우주선이 바닥에 닿으면 게임오버 
// 적군과 미사일 격추시 적군사라지고 점수 1점 획득