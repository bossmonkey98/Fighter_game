const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1260;
canvas.height = 800;

c.fillRect(0,0,canvas.width,canvas.height)
let gravity = 0.7
class Sprite {
    constructor({position , velocity,color}){
    this.position = position;
    this.velocity=velocity;
    this.color = color;
    this.height = 150;
    this.lastKey
    this.attackBox = {
        position:this.position,
        height:50,
        width:100
    }
}
draw(){
    c.fillStyle=this.color
    c.fillRect(this.position.x,this.position.y,50,this.height)

    c.fillStyle="green"
    c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
    )
}
update(){
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y 
    
    
    if(this.position.y + this.height + this.velocity.y >=canvas.height){
        this.velocity.y = 0
    }
    else this.velocity.y += gravity
}
}

const player = new Sprite ({position:{
    x:20,
    y:0
},
velocity:{
    x:0,
    y:0
},color:"red"})

const enemy = new Sprite ({position:{
    x:400,
    y:300,
},
velocity:{
    x:0,
    y:0
},color:'blue'})


let keys = {
    a:{pressed:false},
    d:{pressed:false},
    ArrowLeft:{pressed:false},
    ArrowRight:{pressed:false},
}

const animate = ()=>{
    window.requestAnimationFrame(animate)
    c.fillStyle = "#000"
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()

    player.velocity.x =0
    if(keys.a.pressed && player.lastKey==="a") player.velocity.x = -5;
    else if(keys.d.pressed && player.lastKey==="d") player.velocity.x =5;

    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastKey==="ArrowLeft") enemy.velocity.x = -5;
    else if(keys.ArrowRight.pressed && enemy.lastKey==="ArrowRight") enemy.velocity.x =5;
    
}

animate()

window.addEventListener('keydown',(e)=>{
switch(e.key){
    case "d":
        keys.d.pressed=true
        player.lastKey="d"
        break;
    case "a":
        keys.a.pressed = true
        player.lastKey="a"
        break;
    case "w":
        player.velocity.y = -20
        break;
    case "ArrowLeft":
        keys.ArrowLeft.pressed = true
        enemy.lastKey = "ArrowLeft"
        break;
    case "ArrowRight":
        keys.ArrowRight.pressed = true
        enemy.lastKey = "ArrowRight"
        break;
    case "ArrowUp":
        enemy.velocity.y = -20
}
})

window.addEventListener('keyup',(e)=>{
    switch(e.key){
        case "d":
            keys.d.pressed=false
            break
        case "a":
            keys.a.pressed=false
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
        case "ArrowRight":
            keys.ArrowRight.pressed = false

    }
})


