class Interactable {
    constructor(p5, x, y, width, height, name){
        this.p5 = p5;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.shouldArrowDisplay = true;
        this.rotationDegrees = 0;
    }

    moveForward(){
        this.x += 50;
    }

    turnLeft(){
        console.log("HEREEEE");
        this.p5.angleMode(this.p5.DEGREES);
        this.rotationDegrees -= 90;
        if(this.rotationDegrees === -360){
            this.rotationDegrees = 0;
        }
        else if(this.rotationDegrees === 360){
            this.rotationDegrees = 0;
        }
    }

   displayArrow (){
        //making the arrow
        
        this.p5.fill("red");
        this.p5.rect(0 + this.width/4, 
                    0, this.width/2, this.height/24);
        this.p5.noStroke();
        this.p5.triangle(
            0 + this.width/2, 0,
            0 + this.width *(1/4), 0 + this.height * (1/8),
            0 + this.width *(1/4), 0 -  this.height * (1/8)
        );
    }

    display(){
        this.p5.rectMode(this.p5.CENTER);
        this.p5.push();
        this.p5.translate(this.x, this.y);
        this.p5.rotate(this.rotationDegrees);
        this.p5.fill("black");
        this.p5.rect(0, 0, this.width, this.height);
        if(this.shouldArrowDisplay){
            this.displayArrow();
        }
        this.p5.pop();
    }
}

export default Interactable;