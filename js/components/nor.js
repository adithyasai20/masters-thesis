class Nor {
    constructor(x, y, directionVector) {
        this.x = x;
        this.y = y;
        this.directionVector = directionVector;

        this.pins = [];
        this.updatePoints();
    }

    changeDirection(directionVector) {
        this.directionVector = directionVector;
        this.updatePoints();
    }

    isInside(point) {
        const topLeft = add(new Point(this.x, this.y), scale(this.directionVector, -25));
        const right = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI / 2), 50));
        const bottomRight = add(right, scale(this.directionVector, 25));

        const xlimits = { min: Math.min(topLeft.x, bottomRight.x), max: Math.max(topLeft.x, bottomRight.x) };
        const ylimits = { min: Math.min(topLeft.y, bottomRight.y), max: Math.max(topLeft.y, bottomRight.y) };

        return point.x >= xlimits.min && point.x <= xlimits.max && point.y >= ylimits.min && point.y <= ylimits.max;
    }

    updatePoints() {
        const up = add(new Point(this.x, this.y), scale(this.directionVector, -12.5));
        const down = add(new Point(this.x, this.y), scale(this.directionVector, 12.5));
        const pinA = add(up, scale(rotate(this.directionVector, Math.PI / 2), -20));
        const pinB = add(down, scale(rotate(this.directionVector, Math.PI / 2), -20));
        const pinOut = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI / 2), 75));
        this.pins = [pinA, pinB, pinOut];
    }

    draw(ctx) {
        const topLeft = add(new Point(this.x, this.y), scale(this.directionVector, 25));
        const bottomLeft = add(new Point(this.x, this.y), scale(this.directionVector, -25));
        const topRight = add(topLeft, scale(rotate(this.directionVector, Math.PI / 2), 30));
        const bottomRight = add(bottomLeft, scale(rotate(this.directionVector, Math.PI / 2), 30));
        const up = add(new Point(this.x, this.y), scale(this.directionVector, -12.5));
        const down = add(new Point(this.x, this.y), scale(this.directionVector, 12.5));
        const pinA = add(up, scale(rotate(this.directionVector, Math.PI / 2), -20));
        const pinB = add(down, scale(rotate(this.directionVector, Math.PI / 2), -20));
        const pinOut = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI / 2), 75));

        // Draw the rectangle
        ctx.beginPath();
        ctx.moveTo(topLeft.x, topLeft.y);
        ctx.lineTo(topRight.x, topRight.y);
        ctx.lineTo(bottomRight.x, bottomRight.y);
        ctx.lineTo(bottomLeft.x, bottomLeft.y);
        ctx.closePath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'lightblue';
        ctx.fill();
        ctx.stroke();

        // Draw the circle
        const circleCenter = new Point((topRight.x + bottomRight.x) / 2, (topRight.y + bottomRight.y) / 2);

        ctx.beginPath();
        ctx.moveTo(circleCenter.x, circleCenter.y);
        ctx.lineTo(pinOut.x, pinOut.y);
        ctx.stroke();

        ctx.beginPath();
        
        // Calculate the angle to rotate based on the directionVector
        const angle = Math.atan2(this.directionVector.y, this.directionVector.x) + Math.PI/2;
        
        ctx.arc(circleCenter.x, circleCenter.y, 25, angle - Math.PI/2 , angle + Math.PI/2);

        // Set the styles for the circle
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'lightblue';

        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 25, angle - Math.PI/2 , angle + Math.PI/2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.stroke();

        const fullCircleCenter = add(circleCenter, scale(rotate(this.directionVector, Math.PI / 2), 30));
        fullCircleCenter.draw(ctx, { size: 15, color:'lightblue' });

        // const prevCenter = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI / 2), -15));
        // ctx.beginPath();
        // ctx.arc(prevCenter.x, prevCenter.y, 25, angle - Math.PI/2 , angle + Math.PI/2);
        // ctx.lineWidth = 2;
        // ctx.strokeStyle = 'white';
        // ctx.stroke();


        // Draw pins connections
        ctx.beginPath();
        ctx.moveTo(pinA.x, pinA.y);
        ctx.lineTo(up.x, up.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(pinB.x, pinB.y);
        ctx.lineTo(down.x, down.y);
        ctx.stroke();

        this.pins.map(pin => pin.draw(ctx, { size: 8 }));

        // Calculate the center of the rectangle
        const center = add(new Point(this.x, this.y), scale(rotate(this.directionVector, Math.PI / 2), 40));

        // Save the current canvas context
        ctx.save();

        // Translate to the center of the rectangle
        ctx.translate(center.x, center.y);


        // Rotate the canvas to align with directionVector
        ctx.rotate(angle);

        // Draw the text "Input" in the center aligned with directionVector
        ctx.fillStyle = 'black';  // Set text color
        ctx.font = '16px Arial';  // Set font size and family
        ctx.textAlign = 'center'; // Align text horizontally
        ctx.textBaseline = 'middle'; // Align text vertically
        ctx.fillText('NOR', 0, 0); // Draw text at the translated origin

        // Restore the canvas context
        ctx.restore();
    }
}
