class XnorEditor extends ComponentEditor{
    constructor(viewport, world){
        super(viewport, world);
    }

    createMarking(center, directionVector){
        return new Xnor(center.x, center.y, directionVector);
    }

}