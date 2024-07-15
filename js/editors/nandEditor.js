class NandEditor extends ComponentEditor{
    constructor(viewport, world){
        super(viewport, world);
    }

    createMarking(center, directionVector){
        return new Nand(center.x, center.y, directionVector);
    }

}