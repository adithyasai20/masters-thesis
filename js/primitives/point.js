class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.owner = null;
    }
    equals(p){
        return this.x == p.x && this.y == p.y;
    }
    distanceTo(p){
        return Math.sqrt((this.x - p.x) ** 2 + (this.y - p.y) ** 2);
    }
    draw(ctx,  { size = 18, color = "red", outline = false, fill = false } = {}){
        const rad = size / 2;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
        ctx.fill();
        if (outline) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }
        if (fill) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
        }
    }
}