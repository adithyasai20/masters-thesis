class XorEditor extends ComponentEditor{
    constructor(viewport, world){
        super(viewport, world);
    }

    createMarking(center, directionVector){
        return new Xor(center.x, center.y, directionVector);
    }

}