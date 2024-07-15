class Input{
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
        const topLeft = add(new Point(this.x, this.y), scale(this.directionVector, -25));
        const right = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI/2), 50));
        const bottomRight = add(right, scale(this.directionVector, 25));

        const xlimits = {min : Math.min(topLeft.x, bottomRight.x), max: Math.max(topLeft.x, bottomRight.x)};
        const ylimits = {min : Math.min(topLeft.y, bottomRight.y), max: Math.max(topLeft.y, bottomRight.y)};

        return point.x >= xlimits.min && point.x <= xlimits.max && point.y >= ylimits.min && point.y <= ylimits.max;

    }
    updatePoints(){
        const pin = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI/2), 70));
        this.pins = [pin];

    }
    draw(ctx){
        const topLeft = add(new Point(this.x, this.y), scale(this.directionVector, -25));
        const bottomLeft = add(new Point(this.x, this.y), scale(this.directionVector, 25));
        const right = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI/2), 50));
        const topRight = add(right, scale(this.directionVector, -25));
        const bottomRight = add(right, scale(this.directionVector, 25));
        const pin = this.pins[0];

        ctx.beginPath();
        ctx.moveTo(topLeft.x, topLeft.y);
        ctx.lineTo(bottomLeft.x, bottomLeft.y);
        ctx.lineTo(bottomRight.x, bottomRight.y);
        ctx.lineTo(topRight.x, topRight.y);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'lightblue';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(right.x, right.y);
        ctx.lineTo(pin.x, pin.y);

        ctx.stroke();
        const centerX = (topLeft.x + bottomRight.x) / 2;
        const centerY = (topLeft.y + bottomRight.y) / 2;

         // Save the current canvas context
        ctx.save();

        // Translate to the center of the rectangle
        ctx.translate(centerX, centerY);

        // Calculate the angle to rotate based on the directionVector
        const angle = Math.atan2(this.directionVector.y, this.directionVector.x) + Math.PI/2;

        // Rotate the canvas to align with directionVector
        ctx.rotate(angle);

        // Draw the text "Input" in the center
        ctx.fillStyle = 'black';  // Set text color
        ctx.font = '16px Arial';  // Set font size and family
        ctx.textAlign = 'center'; // Align text horizontally
        ctx.textBaseline = 'middle'; // Align text vertically
        ctx.fillText('Input', 0, 0);
        ctx.restore();

    }
}