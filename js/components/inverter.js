class Inverter{
    constructor(x, y, directionVector){
        this.x = x;
        this.y = y;
        this.directionVector = directionVector;

        this.pins = [];
        this.updatePoints();

    }
    changeDirection(directionVector){
        this.directionVector = directionVector;
        this.updatePoints();
    }
    isInside(point){        
        const top = add(new Point(this.x, this.y), scale(this.directionVector, -25));        
        const bottom = add(new Point(this.x, this.y), scale(this.directionVector, 25));
        let xlimits = {min : Math.min(this.pins[0].x, this.pins[1].x), max: Math.max(this.pins[0].x, this.pins[1].x)};
        let ylimits = {min : Math.min(top.y, bottom.y), max: Math.max(top.y, bottom.y)};
        if(Math.abs(this.directionVector.x -0)>1e-9){
            xlimits = {min : Math.min(top.x, bottom.x), max: Math.max(top.x, bottom.x)};
            ylimits = {min : Math.min(this.pins[0].y, this.pins[1].y), max: Math.max(this.pins[0].y, this.pins[1].y)};
        }


        return point.x >= xlimits.min && point.x <= xlimits.max && point.y >= ylimits.min && point.y <= ylimits.max;
    }
    updatePoints(){
        const inputPin = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI/2), -10));
        const outputPin = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI/2), 70));
        this.pins = [inputPin, outputPin];

    }
    draw(ctx){
        ctx.beginPath();
        const top = add(new Point(this.x, this.y), scale(this.directionVector, -25));        
        const bottom = add(new Point(this.x, this.y), scale(this.directionVector, 25));
        const right = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI/2), 50));
        const circleCenter = add( right, scale(rotate(this.directionVector, Math.PI/2), 5));
        
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(bottom.x, bottom.y);
        ctx.lineTo(right.x, right.y);
        ctx.closePath();

        // Set the styles for the triangle
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'lightblue';

        // Draw the triangle
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.pins[0].x, this.pins[0].y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(circleCenter.x, circleCenter.y);
        ctx.lineTo(this.pins[1].x, this.pins[1].y);
        ctx.stroke();


        // Draw the circle
        ctx.beginPath();
        ctx.arc(circleCenter.x, circleCenter.y, 5, 0, Math.PI * 2);

        // Set the styles for the circle
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'lightblue';

        ctx.fill();
        ctx.stroke();


        this.pins[0].draw(ctx, {size:8});
        this.pins[1].draw(ctx, {size:8});
        
    }
}