class NorEditor extends ComponentEditor{
    constructor(viewport, world){
        super(viewport, world);
    }

    createMarking(center, directionVector){
        return new Nor(center.x, center.y, directionVector);
    }

}