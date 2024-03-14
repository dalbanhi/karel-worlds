class Interactable {
    constructor(p5, x, y, width, height, name){
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
    }
    display(){
        this.p5.rect(this.x, this.y, this.width, this.height);
    }
}

export default Interactable;