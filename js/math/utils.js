function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER){
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;
    for(const point of points){
        const dist = distance(loc, point);
        if(dist< minDist && dist < threshold){
            minDist = dist;
            nearest = point;
        }
    }
    return nearest;
}
function rotate(p, angle){
    return new Point(p.x * Math.cos(angle) - p.y * Math.sin(angle), p.x * Math.sin(angle) + p.y * Math.cos(angle));

}

function scale(p, scaler){
    return new Point(p.x * scaler, p.y * scaler);
}
function add(p1, p2){
    return new Point(p1.x + p2.x, p1.y + p2.y);
}
function subtract(p1, p2){
    return new Point(p1.x - p2.x, p1.y - p2.y);
}
function dot(p1, p2){
    return p1.x * p2.x + p1.y * p2.y;
}
function magnitude(p){
    return Math.sqrt(p.x * p.x + p.y * p.y);
}
function normalize(p){
    const mag = magnitude(p);
    return new Point(p.x / mag, p.y / mag);
}
function distance(p1, p2){
    return magnitude(subtract(p1, p2));
}
function getIntersection(A, B, C, D){
    const tTop = (D.x - C.x)*(A.y-C.y) - (D.y - C.y)*(A.x - C.x);
    const uTop = (C.y - A.y)*(A.x - B.x) - (C.x - A.x)*(A.y - B.y);
    const bottom = (D.y - C.y)*(B.x - A.x) - (D.x - C.x)*(B.y - A.y);

    const eps = 0.000001;
    if(Math.abs(bottom)>eps){
        const t = tTop/bottom;
        const u = uTop/bottom;
        if(t >= 0 && t<=1 && u >= 0&& u <= 1){
            return {
                x : lerp(A.x, B.x, t),
                y : lerp(A.y, B.y, t),
                offset : t
            }
        }
    }
    return null;
}