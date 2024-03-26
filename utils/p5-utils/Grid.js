const possibleObjects = {
    "hWall": 1,
    "vWall": 2,
    "beeper": 3,
    "karel": 4,
    "empty": 0
}


class Grid {
    constructor(p5, pxWidth, pxHeight, rows, cols, color){
        this.p5 = p5;
        this.maxPxWidth = pxWidth;
        this.maxPxHeight = pxHeight;
        this.rows = rows;
        this.cols = cols;
        this.color = color;
        this.internalGrid = [];
        [this.currPxWidth, this.currPxHeight] = this.calcCurrPxDimensions();
        [this.xPxStep, this.yPxStep] = this.calcPxSteps();

        this.createInternalGrid();

    }

    placeObject(row, col, object){
        //double check if it should be col, row or row, col
        if(row < 0 || row >= this.rows || col < 0 || col >= this.cols){
            console.log("Invalid row or col");
        }
        else{
            this.internalGrid[row][col] = possibleObjects[object];
        }
        
    }

    createInternalGrid(){
        for(let row = 0; row < this.rows; row++){
            this.internalGrid.push([]);
            for(let col = 0; col < this.cols; col++){
                this.internalGrid[row].push(possibleObjects.empty);
            }
        }
    }

    calcCurrPxDimensions(){
        if(this.rows >= this.cols){
            let currGridWidth = this.maxPxWidth;
            let currGridHeight = Math.floor(this.maxPxHeight * (this.cols/this.rows));

            return [currGridWidth, currGridHeight];
        }
        else{
            let currGridWidth = Math.floor(this.maxPxWidth * (this.rows/this.cols));
            let currGridHeight = this.maxPxHeight;
            return [currGridWidth, currGridHeight];
        }
    }

    calcPxSteps(){
        let xPxStep = this.currPxWidth/this.rows;
        let yPxStep = this.currPxHeight/this.cols;
        return [xPxStep, yPxStep];
    }

    display(){
        
        this.p5.rectMode(this.p5.CENTER);
        this.p5.stroke(this.color); // TODO: Change to more colors
        this.p5.strokeWeight(2);
        this.p5.fill(220);

        //update the grid dimensions and steps
        [this.currPxWidth, this.currPxHeight] = this.calcCurrPxDimensions();
        [this.xPxStep, this.yPxStep] = this.calcPxSteps();
        //draw the grid
        //drawing the background
        this.p5.rect(
            this.currPxWidth/2, this.currPxHeight/2,
            this.currPxWidth, this.currPxHeight
        );
        //drawing the grid 'dots'
        this.p5.noStroke();
        this.p5.fill('red');
        let xStart = this.xPxStep/2;
        let yStart = this.yPxStep/2;
        for(let row = 0; row < this.cols; row++){
            let y = yStart + row * this.yPxStep;
            for(let col = 0; col < this.rows; col++){ 
                let x = xStart + this.xPxStep * col;
                this.p5.circle(x, y, 2);
            }
        }   
        //resetting the stroke
        this.p5.noStroke();
        this.p5.fill('black');


    }
}

export default Grid;