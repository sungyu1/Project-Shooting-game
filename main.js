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
let backgroundImage,spaceshipImg,bulletImage,enemyImage,gameOverImage;

// Game Over
let gameOver=false; //true 이면 게임이 끝난다.false 이면 게임이 계속된다.

// 우주선 좌표 계속바뀌기 때문에 전역변수로 
let spaceshipX =canvas.width/2-24;
let spaceshipY =canvas.height-48;

let bulletList=[] //총알 저장 리스트
let enemyList=[]  //적군 저장 리스트

// 총알 좌표 
function Bullet(){
  this.x=0;
  this.y=0;
  this.init=function(){
    this.x =spaceshipX+7; // 7은 우주선 중앙에서 미사일 발사
    this.y=spaceshipY
    
    bulletList.push(this);
  };
  //총알 발사
  this.update=function(){
    this.y-=7;
  };
}

// 적군을 만들기 위한 랜덤 함수
function generateRandomValue(min,max){
  let randomNum= Math.floor(Math.random()*(max-min+1))+min
  return randomNum;
}

// 적군좌표
function Enemy(){
  this.x=0;
  this.y=0;
  this.init=function(){
    this.y=0;
    this.x=generateRandomValue(0,canvas.width-64)
    enemyList.push(this);
  };
  // 적군 내려오는 함수
  this.update=()=>{
    this.y += 2; //적군의 속도 조절

    if(this.y >= canvas.height-64){
      gameOver=true;
      console.log("gameover")
    }
  }
}


// 이미지를 불러올 함수만들기()
function loadImage(){
  backgroundImage=new Image();
  backgroundImage.src="img/background.jpg";

  spaceshipImg=new Image();
  spaceshipImg.src="img/spaceship.png";

  bulletImage=new Image();
  bulletImage.src="img/bullet.png";

  enemyImage=new Image();
  enemyImage.src="img/enemy.png";
  
  gameOverImage=new Image();
  gameOverImage.src="img/gameover.png";
}


// 키보드 방향키 눌렀을때 저장
let keysDown={}
function setupkeyboardListener(){
    document.addEventListener("keydown",(event)=>{
      keysDown[event.keyCode]=true;
      console.log("키다운 들어간 값",event.keyCode);
  });

// 키보드 방향기 땠을때 지우기 
document.addEventListener("keyup",(event)=>{
  delete keysDown[event.keyCode];
  console.log("버튼클릭후",keysDown);
  
// 스페이스바를 땠을때 총알 발사
  if(event.keyCode == 32){
    createBullet() //총알생성 함수
  }
});
 }
// 총알생성
function createBullet(){
  console.log('총알생성');
  let b= new Bullet(); //총알 하나생성
  b.init()
  console.log('새로운 총알리스트:',bulletList);
}

// 적군생성
function createEnemy(){
  const interval = setInterval(()=>{
    let e=new Enemy();
    e.init();
  },1500)    // setInterval(호출하고싶은함수,시간)
}

function update(){
    if(39 in keysDown){
      spaceshipX +=3; //오른쪽 방향(right)
    }else if(37 in keysDown){
      spaceshipX -=3; //왼쪽 방향
    }
 
    // 우주선이 우주 밖으로 안나가겠끔
    if(spaceshipX <= 0){
      spaceshipX=0;
    }else if(spaceshipX >= canvas.width-48){
      spaceshipX=canvas.width-48;
    }

    // 총알 발사시 y좌표 업데이트 하는 함수호출
    for(let i=0;i<bulletList.length;i++){
      bulletList[i].update();
    }
    // 적군 내려오는 함수호출
    for(let i=0;i<enemyList.length;i++){
      enemyList[i].update();
    }
  }



function render(){
  // 백그라운드 
  ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height); 
  // 우주선 
  ctx.drawImage(spaceshipImg,spaceshipX,spaceshipY,)
  // 총알
  for(let i=0;i<bulletList.length;i++){
    ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
  }
  // 적군
  for(let i=0;i<enemyList.length;i++){
    ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
  }

}
function main(){
  if(!gameOver){

    update();  //좌표값 업데이트함수 
    render();  //그려주는 함수
    requestAnimationFrame(main);
  }
}


// 함수사용(도구 만들어서 쓰는공간) 시작되는 시점
loadImage();
setupkeyboardListener();
createEnemy();
main();

// 총알만들기
// 스페이스바를 누르면 총알발사
// 총알발사 =총알의 y값이 -- ,총알의 x값은 스페이스를 누른 순간의 우주선의 x좌표
// 발사된 총알들은 총알 배열에 저장한다.
// 총알들은 X,Y 좌표값이 있어야한다.
// 총알 배열을 가지고 reandr을 한다.

// 적군 생성하기 x,y 좌표, init ,update
// 적군 위치는 1초마다 랜덤하게 나온다
// 적군은 위에서 아래로 내려온다.
// 바닥에 닿으면 Game over.
// 적군과 총알이 만나면 적군이 사라진다. 그리고 점수 1점 획득.