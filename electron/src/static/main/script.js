const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ws = new WebSocket('wss://CrispDigitalEmulator.cjho1.repl.co/');
const id = Date.now();

ws.onopen = () => {
    ws.send(JSON.stringify({
        event: 'REGISTER'
    }));
    const anj = new GameObject(12321132112);
    ws.send(JSON.stringify({
        event: 'ADD',
        object: anj
    }));

    const object = new GameObject(Date.now());
    ws.send(JSON.stringify({
        event: 'ADD',
        object
    }))

    window.addEventListener('keydown', e => {
        e.preventDefault();
        switch(e.key) {
            case 'w': {
                object.update(0, 7);
                ws.send(JSON.stringify({
                    event: 'ADD',
                    object
                }))
                break;
            }
            case 'a': {
                object.update(-7, 0);
                ws.send(JSON.stringify({
                    event: 'ADD',
                    object
                }))
                break;
            }
            case 's': {
                object.update(0, -7);
                ws.send(JSON.stringify({
                    event: 'ADD',
                    object
                }))
                break;
            }
            case 'd': {
                object.update(7, 0);
                ws.send(JSON.stringify({
                    event: 'ADD',
                    object
                }))
                break;
            }
        }
    })
}
let gameObjects = {};

ws.onmessage = (m) => {
    const res = JSON.parse(m.data);
    if(res.event === 'RENDER') {
        if(!gameObjects[res.object.id]) gameObjects[res.object.id] = res.object;
        else {
            gameObjects[res.object.id] = res.object; 
        }
    }
    if(res.event === 'START') {
        console.log(res.objects);
        gameObjects = res.objects;
    }
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class GameObject {
    constructor(id) {
        this.y = canvas.height/2;
        this.x = canvas.width/2;
        this.id = id;
    }
    update(x, y) {
        this.x += x ?? 0;
        this.y -= y ?? 0;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(const obj of Object.values(gameObjects)) {
        ctx.fillStyle = 'cyan';
        ctx.fillRect(obj.x, obj.y, 15, 15);
    }
    requestAnimationFrame(animate);
}

animate();