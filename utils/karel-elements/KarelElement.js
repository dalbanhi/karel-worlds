
class KarelElement{
    constructor(type, x, y, count=1, subtype=''){
        this.x = x;
        this.y = y;
        this.type = type;
        this.count = count;
        this.subtype = subtype;
    }

    isBeeper(){
        return this.type === "beeper";
    }

    isWall(){
        return this.type === "wall";
    }

    isKarel(){
        return this.type === "karel";
    }

    isPassable(){
        return this.type !== "wall";
    }

    getCount(){
        return this.count;
    }

    addOne(){
        this.count = this.count + 1;
    }

    subtractOne(){
        this.count = this.count - 1;
    }

    getSubtype(){
        return this.subtype;
    }

    getCoords(){
        return [this.x, this.y];
    }
}

export default KarelElement;