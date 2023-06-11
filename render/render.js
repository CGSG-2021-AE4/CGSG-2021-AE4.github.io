import {vec3, matr} from "../math.js";
import {Ubo, Material} from "./material.js";
import {Shader} from "./shader.js";
import {Topology} from "./topology.js";
import {Model, Prim} from "./prim.js";
import { Targets } from "./target.js";
import { Lighting } from "./light.js";

// export {Ubo, Material, Shader, Topology, Model, Prim, Targets};

class Camera {
    matrProj;
    pos;
    at;
    up;
    right;
    dir;
    dirLen;
    matrVP;
    ubo;

    lighting;
    
    constructor( rnd, newPos, newAt, newUp, enableMovement ) {
        this.matrProj = Camera.createDefMatrProj(rnd.W, rnd.H);
        this.pos = newPos;
        this.at = newAt;
        this.up = newUp;
        this.update();

        // Making callbacks
        if (enableMovement)
        {
            rnd.canvas.onmousemove = (e)=>{this.onMouseMove(e)};
            rnd.canvas.onwheel = (e)=>{this.onMouseWheel(e)};
            rnd.canvas.oncontextmenu = ()=>{return false;};
        }
        
        // Ubo init
        this.ubo = new Ubo(rnd, 4 * 4 * 2, 1);
    }

    static createDefMatrProj( w, h ) {
        var coef = parseFloat(h) / parseFloat(w);
        return matr.frustum(-1, 1, -coef, coef, 1, 1000);
    }

    update() {
        this.dir = this.at.sub(this.pos).normalise();
        this.right = this.dir.cross(new vec3(0, -1, 0)).normalise();
        this.up = this.dir.cross(this.right);
        this.dirLen = this.at.sub(this.pos).length(); 

        this.matrVP = matr.view(this.pos, this.at, this.up);
    }

    updateSize( rnd ) {
        if (rnd.W != rnd.canvas.clientWidth ||
            rnd.H != rnd.canvas.clientHeight)
        {
            rnd.resize(rnd.canvas.clientWidth, rnd.canvas.clientHeight);
            this.matrProj = Camera.createDefMatrProj(rnd.W, rnd.H);
        }
    }

    updateUbo( rnd, shader ) {
        this.ubo.submit(rnd, new Float32Array(this.pos.toFltA().concat([1]).
                                 concat(this.at.toFltA().concat([1]))));
        this.ubo.bind(rnd, shader, 'camera');
    } 

    onMouseMove( e ) {
        if (e.buttons & 1)
        {
            this.pos = this.at.add(this.pos.sub(this.at).mulMatr( matr.rotate(-0.0015 * e.movementX, this.up)));
            this.pos = this.at.add(this.pos.sub(this.at).mulMatr( matr.rotate(0.0015 * e.movementY, this.right)));
            this.update();
        }

        if (e.buttons & 2)
        {
            var delta = this.right.mulNum(this.dirLen * 0.001 * e.movementX).add(this.up.mulNum(this.dirLen * 0.001 * e.movementY));
            this.pos = this.pos.add(delta);
            this.at = this.at.add(delta);
            this.update();
        }

        //e.clientX = 0;

        //e.clientX -= e.movementX;
        //e.clientY -= e.movementY;

        
    }

    onMouseWheel(e) {
        this.pos = this.at.add(this.pos.sub(this.at).mulNum(Math.pow(1.1, e.deltaY * 0.01)))
        this.update();
        e.preventDefault();
    }
}

//class ShaderSlider4 {
//    ubo;
//    shaderUboName;
//    xID;
//    yID;
//    zID;
//    wID;
//
//    static getSliderHtml( id, label, min, max, step ) {
//        return `<label id="${id}/Lable"> ${label}: <input type="range" id="${id}" min="${min}" max="${max}" step="${step}"/></label><br/>`;
//    }
//
//    constructor( rnd, idForAdd, newShaderUboName, min, max, def ) {
//        this.shaderUboName = newShaderUboName;
//        this.ubo = new Ubo(rnd, 16, 3); // one vec4 
//
//        // add sliders
//
//        var AddObj = document.getElementById(idForAdd);
//
//        if (AddObj == undefined || AddObj == null)
//            allert("fuck");
//        
//        AddObj.innerHTML += ShaderSlider4.getSliderHtml(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider1", newShaderUboName.toString() + ".x", min, max, (max - min) * 0.01);
//        AddObj.innerHTML += ShaderSlider4.getSliderHtml(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider2", newShaderUboName.toString() + ".y", min, max, (max - min) * 0.01);
//        AddObj.innerHTML += ShaderSlider4.getSliderHtml(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider3", newShaderUboName.toString() + ".z", min, max, (max - min) * 0.01);
//        AddObj.innerHTML += ShaderSlider4.getSliderHtml(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider4", newShaderUboName.toString() + ".w", min, max, (max - min) * 0.01);
//        this.xID = document.getElementById(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider1");
//        this.yID = document.getElementById(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider2");
//        this.zID = document.getElementById(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider3");
//        this.wID = document.getElementById(idForAdd.toString() + "/" + newShaderUboName.toString() + "/Slider4");
//
//        this.xID.value = def;
//        this.yID.value = def;
//        this.zID.value = def;
//        this.wID.value = def;
//    }
//
//    update( rnd, shader ) {
//        var vec4Value = new Float32Array([parseFloat(this.xID.value),
//                                          parseFloat(this.yID.value),
//                                          parseFloat(this.zID.value),
//                                          parseFloat(this.wID.value)]);
//        this.ubo.submit(rnd, vec4Value);
//        this.ubo.bind(rnd, shader, this.shaderUboName);
//    }
//}
//

export class Render {
    canvas;
    gl;
    W;
    H;
    mtlLib = [];
    defShader;
    target;
    targetShader;
    targetPrim;
    
    camera;



    #initGl() {
        this.gl = this.canvas.getContext("webgl2");

        this.canvas.onresize = this.updateSize;

        this.resize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    clearFB() {
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    constructor( canvasName ) {
        this.canvas = document.getElementById(canvasName);
        this.#initGl();

        // Def render params
        this.gl.enable(this.gl.DEPTH_TEST);
        //this.gl.enable(this.gl.CULL_FACE);

        // Extentions
        this.gl.getExtension("EXT_color_buffer_float");
        this.gl.getExtension("OES_texture_float_linear");

    }

    async init() { // Init def values function
        // Load def shader
        Material.addToMtlLib(this, 'def', new Material(this));
        this.defShader = await this.createShader('default_for_target');
        
        this.target = new Targets(this);

        this.lighting = new Lighting();
        await this.lighting.init(this);

        this.camera = new Camera(this, new vec3(10, 10, 10), new vec3(0, 0, 0), new vec3(0, 1, 0), 1); // DEFAULT camera
    }

    async createShader( name ) {
        var shader = new Shader();

        await shader.loadShader(this, name);
        return shader;
    }

    createModel( ...args ) {
        switch (args.length) {
            case 0: // Empty
                return new Model();
            case 1: // Load modal with def shader
                if (typeof(args[0]) == 'string')
                {
                    var outM = new Model();
                    
                    return outM.load(this, this.defShader, args[0]).then(()=>{ return outM; });
                }
                else
                    if (args[0] instanceof Prim)
                    return new Model(this, args[0]);
            case 2: // Load modal with custom shader
                if (args[0] instanceof Shader && typeof(args[1]) == 'string')
                //{
                    var outM = new Model();

                    return outM.load(this, args[0], args[1]).then(()=>{ return outM; });
                //}
        }
    }

    createTopology( ...args ) {
        switch (args.length) {
            case 0: // Empty
                return new Topology([], []);
            case 2: // Full
                return new Topology(args[0], args[1]);
            case 3: // Full with flag
                return new Topology(args[0], args[1], args[2]);
        }
    }

    createPrim( ...args ) {
        switch (args.length) {
            case 1:
                if (args[0] instanceof Topology)
                    return new Prim(this, defShader, args[0], this.mtlLib['def']);
            case 2:
                if (args[0] instanceof Shader && args[1] instanceof Topology)
                    return new Prim(this, args[0], args[1]);
            case 3:
                if (args[0] instanceof Shader && args[1] instanceof Topology && args[2] instanceof Material)
                    return new Prim(this, args[0], args[1], args[2]);
        }
    }

    resize( newW, newH ) {
        //var canvasStyle = window.getComputedStyle(this.canvas);

        // this.canvas.height = this.H = parseFloat(canvasStyle.height);
        // this.canvas.width  = this.W = parseFloat(canvasStyle.width);

        this.canvas.width = this.W = newW;
        this.canvas.height = this.H = newH;
        this.gl.viewport(0, 0, this.W, this.H);
        //this.gl = this.canvas.getContext("webgl2");

        //this.gl.drawingBufferWidth = this.W; 
        //this.gl.drawingBufferHeight = this.H; 
        //this.gl = this.canvas.getContext("webgl2");
    }

    drawStack = [];

    drawModel( model, matrW ) {
        this.drawStack[this.drawStack.length] = [model, matrW];
    }

    render() {
        this.camera.updateSize(this);

        // Draw to target
        this.target.applyFB(this);
        for (let i = 0; i < this.drawStack.length; i++)
            this.drawStack[i][0].draw(this, this.camera, this.drawStack[i][1]);

        // Draw to canvas
        Targets.applyCanvas(this);
        this.lighting.draw(this, this.camera, this.target);
        this.drawStack.length = 0;
    }
}