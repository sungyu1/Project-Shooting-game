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
function render(){
  // 백그라운드 
  ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height); 
  // 우주선 
  ctx.drawImage(spaceshipImg,spaceshipX,spaceshipY,)

}
function main(){
  render()
  requestAnimationFrame(main);
}


// 함수사용(도구 만들어서 쓰는공간)
loadImage();
main();