import Fluid from "./lib/fluid"

document.addEventListener('DOMContentLoaded', ()=>{
    const canvas = document.getElementById('renderSurface');
        let fluid = new Fluid(canvas);
        fluid.mapBehaviors({
            paused: false,
            transparent: false,
            color: {
                r: 5 / 512, g: 46 / 512, b: 93 / 512
            },

            render_shaders: false,
            render_bloom: false,
            curl: 1,
            pressure: 0.1,
            dissipation: 0,
            velocity: 0.8,
            transparent: true
        })
        fluid.setDitherURL('./test-quadri.jpg');
        fluid.activate();

        fluid.emitters.push(new Emitter({color: { r: 251 , g: 48 , b: 153 }}))
        fluid.emitters.push(new Emitter({color: {r: 255 , g: 144 , b: 39 }}))
        fluid.emitters.push(new Emitter({color: {r: 0 , g: 184 , b: 241 }}))
        fluid.emitters.push(new Emitter({color: {r: 5, g: 46, b: 93}}))
        

        fluid.emitters.map((e,i)=> {
            e.x = -200
            let padding = canvas.clientHeight / 4
            e.y = ((canvas.clientHeight - padding * 2) / fluid.emitters.length) * i + canvas.clientHeight / fluid.emitters.length / 2 + padding / 2
            for(let key in e.color){
                e.color[key] = e.color[key] / 1024 / 2 * 2
            }

            e.play()
        })
        
        
        document.body.addEventListener('keyup', (e)=>{
            console.log(e)
            fluid.emitters.map(e => {
                e.playOnce()
            })
        })
        let lastFrame = 0
        let delta = 0
        const loop = ()=>{
            let delta = (performance.now() - lastFrame) / 1000
            lastFrame = performance.now()
            fluid.emitters.map((e, i) => {
                e.x += delta * 1000 / 2
                e.dx = (Math.random() * 2 - 1) * 20
                e.dy = (Math.random() * 2 - 1) * 20
                if(e.x > canvas.clientWidth) e.stop()
            })
            requestAnimationFrame(loop)
        }
        loop()

})

class Emitter {
    constructor(opts={}){
        this.x = opts.x || 0
        this.y = opts.y || 0
        this.dx = opts.dx || 0
        this.dy = opts.dy || 0
        this.color = opts.color || {r: 0.1, g: 0.1, b: 0.1}
        this.emits = false
        this.isPlayOnce = false
    }

    stop(){
        this.emits = false
        this.isPlayOnce = false
    }

    play(){
        this.emits = true
        this.isPlayOnce = false
    }

    toggle(){
        this.emits = !this.emits
    }

    playOnce(){
        this.isPlayOnce = true
    }

    playForSeconds(seconds){
        this.emits = true
        setTimeout(()=> this.emits = false, seconds * 1000)
    }
}