class World{
    constructor(components, graph){
        this.components = components;
        this.graph = graph;

    }
    draw(ctx){
        this.graph.draw(ctx);
        if(this.components){
            for(const component of this.components){
                component.draw(ctx);
            }
        }
    }
}