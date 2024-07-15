class AndEditor extends ComponentEditor{
    constructor(viewport, world){
        super(viewport, world);
    }

    createMarking(center, directionVector){
        return new And(center.x, center.y, directionVector);
    }

}