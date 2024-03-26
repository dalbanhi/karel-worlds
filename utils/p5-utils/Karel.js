class Karel {
    constructor(p5, gridX, gridY, grid, name, p5Img){
        this.p5 = p5;
        this.gridX = gridX;
        this.gridY = gridY;
        this.grid = grid;
        this.grid.placeObject(gridX, gridY, "karel");
        this.xPxStep = this.grid.xPxStep;
        this.yPxStep = this.grid.yPxStep;
        this.calcPxFromGrid();
        this.width = this.grid.currPxWidth/this.grid.rows;
        this.height = this.grid.currPxHeight/this.grid.cols;
        this.name = name;
        this.shouldArrowDisplay = true;
        this.rotationDegrees = 0;
        this.img = p5Img;
    }

    calcPxFromGrid(){
        this.x = this.gridX * this.xPxStep + this.xPxStep/2;
        this.y = this.gridY * this.yPxStep + this.yPxStep/2;
    }

    toggleArrowDisplay(){
        this.shouldArrowDisplay = !this.shouldArrowDisplay;
    }

    moveForward(){

        //update the gridX and gridY

        if(this.rotationDegrees === 0){
            this.gridX += 1;
            // this.x += this.xPxStep;
        }
        else if(this.rotationDegrees === 90 || this.rotationDegrees === -270){
            this.gridY += 1;
            // this.y += 50;
        }
        else if(this.rotationDegrees === 180 || this.rotationDegrees === -180){
            // this.x -= 50;
            this.gridX -= 1;
        }
        else if(this.rotationDegrees === 270 || this.rotationDegrees === -90){
            // this.y -= 50;
            this.gridY -= 1;
        }
    }

    turnLeft(){
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
        this.p5.imageMode(this.p5.CENTER);
        this.p5.rectMode(this.p5.CENTER);
        this.p5.push();
        this.p5.translate(this.x, this.y);
        this.p5.rotate(this.rotationDegrees);
        this.p5.fill("black");
        // this.p5.image(this.img, 0, 0);
        this.p5.rect(0, 0, this.width, this.height);
        if(this.shouldArrowDisplay){
            this.displayArrow();
        }
        this.p5.pop();
    }
}

export default Karel;