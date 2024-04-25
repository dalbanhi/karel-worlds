
class KarelElement{
    constructor(type, count=1, subtype=''){
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
}

export default KarelElement;