class InputEditor extends ComponentEditor{
    constructor(viewport, world){
        super(viewport, world);
    }

    createMarking(center, directionVector){
        return new Input(center.x, center.y, directionVector);
    }

}