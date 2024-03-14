class Grid {
    constructor(p5, pxWidth, pxHeight, rows, cols, color){
        this.p5 = p5;
        this.pxWidth = pxWidth;
        this.pxHeight = pxHeight;
        this.rows = rows;
        this.cols = cols;
        this.color = color;

    }
    display(){
        this.p5.rectMode(this.p5.CENTER);
        this.p5.stroke(this.color); // TODO: Change to more colors
        this.p5.strokeWeight(5);
        this.p5.noFill();
        this.p5.rect(this.pxWidth/2, this.pxHeight/2, this.pxWidth, this.pxHeight);
        this.p5.strokeWeight(1);
        this.p5.noStroke();
        this.p5.fill('red');
        let xStart = this.pxWidth/this.cols/2;
        let yStart = this.pxHeight/this.rows/2;
        for(let row = 0; row < this.cols; row++){
            for(let col = 0; col < this.rows; col++){
                let x = xStart + this.pxWidth/this.cols * col;
                let y = yStart + this.pxHeight/this.rows * row;
                this.p5.circle(x, y, 2);
            }
        }

    }
}

export default Grid;

// this.p.stroke(this.color.r,this.color.g,this.color.b);
// this.p.fill(255,255,255);
// for(let row = 0; row < 10; row++){
//   for(let col = 0; col < 10; col++){
//     this.p.rect(this.xStart + (this.sqSize*row), this.yStart + (this.sqSize*col), this.sqSize, this.sqSize);
//   }
// }
// //if grid is shootable, add blue border around it
// if(this.shootable){
//   this.p.noFill();
//   this.p.stroke(0,0,255);
//   this.p.strokeWeight(5);
//   this.p.rect(this.xStart, this.yStart,this.sqSize * this.gridSize, this.sqSize*this.gridSize);
// }
// this.p.noStroke();
// this.p.fill(0);
// this.p.strokeWeight(1);