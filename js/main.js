function setMode(mode){
    if(tools[mode].button.style.color != 'black'){
        disableEditors();
        tools[mode].button.style.backgroundColor = "yellow";
        tools[mode].button.style.color = 'black';
        tools[mode].editor.enable();
    }
    else{
        disableEditors();
    }
}
function disableEditors(){
    for(const tool of Object.values(tools)){
        tool.button.style.backgroundColor = "#007bff";
        tool.button.style.color = 'white';
        tool.editor.disable();
    }

}

const canvas = document.getElementById('circuit-playground');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const viewport = new Viewport(canvas, zoom = 1);
const components = [];
const world = new World(components, new Graph() );
const tools = {
    wire : {button : document.getElementById("wire"), editor : new WireEditor(viewport, world.graph)},
    inverter : {button : document.getElementById("inverter"), editor : new InverterEditor(viewport, world)},
    input : {button : document.getElementById("input"), editor : new InputEditor(viewport, world)},
    output : {button : document.getElementById("output"), editor : new OutputEditor(viewport, world)},
    and : {button : document.getElementById("and"), editor : new AndEditor(viewport, world)},
    or : {button : document.getElementById("or"), editor : new OrEditor(viewport, world)},
    nor : {button : document.getElementById("nor"), editor : new NorEditor(viewport, world)},
    nand : {button : document.getElementById("nand"), editor : new NandEditor(viewport, world)},
    xor : {button : document.getElementById("xor"), editor : new XorEditor(viewport, world)},
    xnor : {button : document.getElementById("xnor"), editor : new XnorEditor(viewport, world)},
}


function animate(){
    viewport.reset();
    world.draw(ctx);
    for(const tool of Object.values(tools)){
        tool.editor.display(ctx);
    }
    requestAnimationFrame(animate);
}

animate();