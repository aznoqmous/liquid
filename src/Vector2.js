export default class Vector2 {
    constructor(x=0, y=0){
        this.x = x
        this.y = y
    }
    
    clone(){
        return new Vector2(this.x, this.y)
    }

    set(x,y){
        this.x = x
        this.y = y
        return this
    }

    add(vector){
        this.x += vector.x
        this.y += vector.y
        return this
    }

    substract(vector){
        this.x -= vector.x
        this.y -= vector.y
        return this
    }

    multiply(vector){
        this.x *= vector.x
        this.y *= vector.y
        return this
    }

    divide(vector){
        this.x /= vector.x
        this.y /= vector.y
        return this
    }

    abs(){
        this.x = Math.abs(this.x)
        this.y = Math.abs(this.y)
        return this
    }

    multiplyBy(value){
        this.x *= value
        this.y *= value
        return this
    }

    divideBy(value){
        this.x /= value
        this.y /= value
        return this
    }

    normalize(){
        let magnitude = this.sqrMagnitude
        this.x /= magnitude
        this.y /= magnitude
        return this
    }

    floor(){
        this.x = Math.floor(this.x)
        this.y = Math.floor(this.y)
        return this
    }

    round(){
        this.x = Math.round(this.x)
        this.y = Math.round(this.y)
        return this
    }

    ceil(){
        this.x = Math.ceil(this.x)
        this.y = Math.ceil(this.y)
        return this
    }

    lerp(v, t){
        this.x = (1-t) * this.x + t * v.x
        this.y = (1-t) * this.y + t * v.y
        return this
    }

    get normalized(){
        return this.clone().normalize()
    }

    get magnitude(){
        return Math.pow(this.x, 2) + Math.pow(this.y, 2)
    }

    get sqrMagnitude(){
        return Math.sqrt(this.magnitude)
    }

    rotate(radian){
        this.x = this.x * Math.cos(radian) - this.y * Math.sin(radian)
        this.y = this.x * Math.sin(radian) + this.y * Math.cos(radian)
        return this
    }

    static get up(){
        return new Vector2(0, -1)
    }
    static get down(){
        return new Vector2(0, 1)
    }
    static get left(){
        return new Vector2(-1, 0)
    }
    static get right(){
        return new Vector2(1, 0)
    }
}