import { Topology } from "./topology.js";
import { matr } from "../math.js";
import { Ubo } from "./material.js";

export class Lighting { 
    dirShader;
    dirPrim;
    dirLights = [];
    dirUBO;

    constructor() {

    }

    async init( rnd ) {
        let rectTop = Topology.createScreenRect();

        this.dirShader = await rnd.createShader('lights/dir');
        this.dirPrim = await rnd.createPrim(this.dirShader, rectTop);
        this.dirUBO = new Ubo(rnd, 4 * 4 * 2, 4);
    }

    draw( rnd, camera, target ) {
        this.dirShader.use(rnd);
        target.bindSamplers(rnd, this.dirShader);

        rnd.gl.enable(rnd.gl.BLEND);
        rnd.gl.disable(rnd.gl.DEPTH_TEST);
        
        rnd.gl.blendEquation(rnd.gl.FUNC_ADD);
        rnd.gl.blendFunc(rnd.gl.ONE, rnd.gl.ONE);
        //rnd.gl.blendFunc(rnd.gl.ONE, rnd.gl.ONE);

        // Direction lights
        for (let i = 0; i < this.dirLights.length; i++)
        {
            this.dirUBO.submit(rnd, new Float32Array(this.dirLights[i].getDataA()));
            this.dirUBO.bind(rnd, this.dirShader, 'dirLight');
            this.dirPrim.draw(rnd, camera, new matr());
        }

        //rnd.gl.blendFunc(rnd.gl.ONE, rnd.gl.ZERO);
        rnd.gl.disable(rnd.gl.BLEND);
        rnd.gl.enable(rnd.gl.DEPTH_TEST);

        target.unbindSamplers(rnd);
    }

    regDirLight( light ) {
        if (light instanceof DirLight)
        this.dirLights[this.dirLights.length] = light;
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
        return this.dir.concat([1]).concat(this.color).concat([this.visibility]);
    }
}