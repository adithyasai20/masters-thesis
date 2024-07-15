class ComponentEditor{
    constructor(viewport, world){
        this.viewport = viewport;
        this.world = world;
        this.canvas = viewport.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.mouse = null;
        this.intent = null;
        this.components = world.components;
        this.currentDirVector = new Point(0, -1);
    }
    // To be overwritten by child classes
    createMarking(center, directionVector){
        return center;
    }
    enable(){
        
        this.#addEventListeners();
    }
    disable(){
        this.intent = null;
        this.#removeEventListeners();
    }
    display(){
        if(this.intent){
            this.intent.draw(this.ctx);
        }
    }
    #removeEventListeners(){

        this.canvas.removeEventListener('mousedown', this.boundMouseDown);
        this.canvas.removeEventListener('mousemove', this.boundMouseMove);
        this.canvas.removeEventListener('contextmenu', this.boundDefault);
        this.canvas.removeEventListener('keydown', this.boundSpacebar);


    }
    #addEventListeners(){
        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
        this.boundSpacebar = this.#handleSpacebar.bind(this);
        this.boundDefault = (event) => event.preventDefault();
        this.canvas.addEventListener('mousedown', this.boundMouseDown);
        this.canvas.addEventListener('mousemove', this.boundMouseMove);
        document.addEventListener('keydown', this.boundSpacebar);
        this.canvas.addEventListener('contextmenu', this.boundDefault);

    }

    #handleSpacebar(event){
        if(event.code == 'Space' ){
            if(this.intent){
                this.intent.changeDirection(rotate(this.intent.directionVector, Math.PI/2));
                this.currentDirVector = this.intent.directionVector;

            }
        }
    }

    #handleMouseDown(event){
        

        if(event.button == 0){ //left click
            if(this.intent){
                this.components.push(this.intent);
                for(const pin of this.intent.pins){
                    if(!this.world.graph.tryAddPoint(pin)){
                        alert("can't add point. debug the code");
                    }
                    this.world.graph.points.at(-1).owner = "component";
                }
                this.intent = null;
            }
        }
        if(event.button == 2){ //right click
            for(let i = 0; i<this.components.length;i++){
                if(this.components[i].isInside(this.mouse)){
                    for(const pin of this.components[i].pins){
                        this.world.graph.removePoint(pin);
                    }
                    this.components.splice(i, 1);

                    break;
                
                }
            }

        }
        
      
    }

    #handleMouseMove(event){
        
        this.mouse = this.viewport.getMouse(event, true);

        this.intent = this.createMarking(
            this.mouse, 
            this.currentDirVector,
        );

        
        

    }
    
}