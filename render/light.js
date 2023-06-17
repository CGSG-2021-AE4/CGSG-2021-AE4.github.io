import { Topology } from "./topology.js";
import { vec3, matr } from "../math/math.js";
import { Ubo } from "./material.js";

export class Lighting { 
    dirShader;
    dirPrim;
    dirLights = [];
    dirUBO;

    pointShader;
    pointPrim;
    pointLights = [];
    pointUBO;
    debugPointModel;

    constructor() {

    }

    async init( rnd ) {
        let rectTop = Topology.createScreenRect();

        // Directional
        this.dirShader = await rnd.createShader('lights/dir');
        this.dirPrim = await rnd.createPrim(this.dirShader, rectTop);
        this.dirUBO = new Ubo(rnd, 4 * 4 * 2, 4);

        // Point
        this.pointShader = await rnd.createShader('lights/point');
        this.pointPrim = await rnd.createPrim(this.pointShader, rectTop);
        this.pointUBO = new Ubo(rnd, 4 * 4 * 2, 4);

        this.debugPointModel = rnd.createModel(rnd.createPrim(Topology.createCube()));
    }

    draw( rnd, camera, target ) {
        rnd.gl.enable(rnd.gl.BLEND);
        rnd.gl.disable(rnd.gl.DEPTH_TEST);
        
        rnd.gl.blendEquation(rnd.gl.FUNC_ADD);
        rnd.gl.blendFunc(rnd.gl.ONE, rnd.gl.ONE);
    
        // Direction lights
        this.dirShader.use(rnd);
        target.bindSamplers(rnd, this.dirShader);
        for (let i = 0; i < this.dirLights.length; i++)
        {
            this.dirUBO.submit(rnd, new Float32Array(this.dirLights[i].getDataA()));
            this.dirUBO.bind(rnd, this.dirShader, 'dirLight');
            this.dirPrim.draw(rnd, camera, new matr());
        }

        // Point lights
        this.pointShader.use(rnd);
        target.bindSamplers(rnd, this.pointShader);
        for (let i = 0; i < this.pointLights.length; i++)
        {
            this.pointUBO.submit(rnd, new Float32Array(this.pointLights[i].getDataA()));
            this.pointUBO.bind(rnd, this.pointShader, 'pointLight');
            this.pointPrim.draw(rnd, camera, new matr());
        }

        rnd.gl.disable(rnd.gl.BLEND);
        rnd.gl.enable(rnd.gl.DEPTH_TEST);

        target.unbindSamplers(rnd);
    }

    drawDebug( rnd, camera ) {
        for (let i = 0; i < this.pointLights.length; i++)
            rnd.drawModel(this.debugPointModel, matr.translate(new vec3(this.pointLights[i].pos[0], this.pointLights[i].pos[1], this.pointLights[i].pos[2])));
    }

    regDirLight( light ) {
        if (light instanceof DirLight)
        this.dirLights[this.dirLights.length] = light;
    }

    regPointLight( light ) {
        if (light instanceof PointLight)
        this.pointLights[this.pointLights.length] = light;
    }
    
}

export class DirLight {
    dir;
    color;
    intensity;
    visibility = true;

    constructor( rnd, newDir, newColor, newIntensity ) {
        this.dir = newDir;
        this.color = newColor;
        this.intensity = newIntensity;
        rnd.lighting.regDirLight(this);
    }

    setVisibility( newValue ) {
        this.visibility = newValue;
    }
    getDataA() {
        return this.dir.concat([1]).concat(this.color).concat([this.intensity]);
    }
}


export class PointLight {
    pos;
    color;
    intensity;
    visibility = true;

    constructor( rnd, newPos, newColor, newIntensity ) {
        this.pos = newPos;
        this.color = newColor;
        this.intensity = newIntensity;
        rnd.lighting.regPointLight(this);
    }

    setVisibility( newValue ) {
        this.visibility = newValue;
    }
    getDataA() {
        return this.pos.concat([1]).concat(this.color).concat([this.intensity]);
    }
}