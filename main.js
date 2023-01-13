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

// 우주선 좌표 계속바뀌기 때문에 전역변수로 
let spaceshipX =canvas.width/2-24;
let spaceshipY =canvas.height-48;

let bulletList=[] //총알 저장 리스트

// 총알 좌표 
function Bullet(){
  this.x=0;
  this.y=0;
  this.init=function(){
    this.x =spaceshipX+7;
    this.y=spaceshipY

    bulletList.push(this)
  };
  //총알 발사
this.update=function(){
  this.y-=7;
};
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

function createBullet(){
  console.log('총알생성');
  let b= new Bullet(); //총알 하나생성
  b.init()
  console.log('새로운 총알리스트:',bulletList);
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

}
function main(){
  update();    //좌표값 업데이트함수 
  render();     //그려주는 함수
  requestAnimationFrame(main);
}


// 함수사용(도구 만들어서 쓰는공간)
loadImage();
setupkeyboardListener();
main();

// 총알만들기
// 스페이스바를 누르면 총알발사
// 총알발사 =총알의 y값이 -- ,총알의 x값은 스페이스를 누른 순간의 우주선의 x좌표
// 발사된 총알들은 총알 배열에 저장한다.
// 총알들은 X,Y 좌표값이 있어야한다.
// 총알 배열을 가지고 reandr을 한다.