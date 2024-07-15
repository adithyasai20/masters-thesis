class InverterEditor extends ComponentEditor{
    constructor(viewport, world){
        super(viewport, world);
    }

    createMarking(center, directionVector){
        return new Inverter(center.x, center.y, directionVector);
    }

}