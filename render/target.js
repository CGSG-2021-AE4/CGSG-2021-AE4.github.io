import { Texture } from "./texture.js";
import { Topology } from "./topology.js";
import { Prim } from "./prim.js";
import { vec3, matr } from "../math/math.js";

export class Targets {
    frameBuffer;

    texPos;
    texNIsShade;
    texKa;
    texKd;
    texKsPh;
    texColorTrans;

    depthTex;

    primVAO;

    static createTargetTex( rnd, attachment ) {
        var outTex = new Texture(rnd, rnd.W, rnd.H,
            0,                        // mip level
            rnd.gl.RGBA32F, // internal format
            0,                        // border
            rnd.gl.RGBA,   // format
            rnd.gl.FLOAT,      // type
            null);
        //this.colorTex = new Texture(rnd, "../models/cow_tex.png");
        outTex.setParams(rnd, [
            [rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR],
            [rnd.gl.TEXTURE_WRAP_S, rnd.gl.CLAMP_TO_EDGE],
            [rnd.gl.TEXTURE_WRAP_T, rnd.gl.CLAMP_TO_EDGE]
        ]);
        rnd.gl.framebufferTexture2D(rnd.gl.FRAMEBUFFER, rnd.gl.COLOR_ATTACHMENT0 + attachment, rnd.gl.TEXTURE_2D, outTex.texture, 0);

        return outTex;
    }

    constructor( rnd ) {
       
        this.frameBuffer = rnd.gl.createFramebuffer();
        rnd.gl.bindFramebuffer(rnd.gl.FRAMEBUFFER, this.frameBuffer);

        rnd.gl.drawBuffers([
            rnd.gl.COLOR_ATTACHMENT0,
            rnd.gl.COLOR_ATTACHMENT1,
            rnd.gl.COLOR_ATTACHMENT2,
            rnd.gl.COLOR_ATTACHMENT3,
            rnd.gl.COLOR_ATTACHMENT4,
            rnd.gl.COLOR_ATTACHMENT5,
        ]);

        // Texturies
        this.texPos =        Targets.createTargetTex(rnd, 0);
        this.texNIsShade =   Targets.createTargetTex(rnd, 1);
        this.texKa =         Targets.createTargetTex(rnd, 2);
        this.texKd =         Targets.createTargetTex(rnd, 3);
        this.texKsPh =       Targets.createTargetTex(rnd, 4);
        this.texColorTrans = Targets.createTargetTex(rnd, 5);
        this.depthTex = new Texture(rnd, rnd.W, rnd.H,
            0,                        // mip level
            rnd.gl.DEPTH_COMPONENT24, // internal format
            0,                        // border
            rnd.gl.DEPTH_COMPONENT,   // format
            rnd.gl.UNSIGNED_INT,      // type
            null);
        this.depthTex.setParams(rnd, [
            [rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR],
            [rnd.gl.TEXTURE_MAG_FILTER, rnd.gl.LINEAR],
            [rnd.gl.TEXTURE_WRAP_S, rnd.gl.CLAMP_TO_EDGE],
            [rnd.gl.TEXTURE_WRAP_T, rnd.gl.CLAMP_TO_EDGE]
        ]);
        rnd.gl.framebufferTexture2D(rnd.gl.FRAMEBUFFER, rnd.gl.DEPTH_ATTACHMENT, rnd.gl.TEXTURE_2D, this.depthTex.texture, 0);


        //// Making target prim
        // 
        //var posLoc = rnd.gl.getAttribLocation(shader.program, 'in_pos');
        //if (posLoc === -1)
        //    console.log(`Can't find "in_pos".`);
        //var texLoc = rnd.gl.getAttribLocation(shader.program, 'in_tex');
        //if (texLoc === -1)
        //    console.log(`Can't find "in_tex".`);
    //
        //this.primVAO = rnd.gl.createVertexArray();
        //rnd.gl.bindVertexArray(this.primVAO);
//
        //var Buf = rnd.gl.createBuffer();
//
        //rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, Buf);
        //rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, vA, rnd.gl.STATIC_DRAW);
//
        //var indexBuf = rnd.gl.createBuffer();
//
        //rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, indexBuf);
        //rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, indA, rnd.gl.STATIC_DRAW);
//
        //// Bind to shader
//
        //rnd.gl.enableVertexAttribArray(posLoc);
        //rnd.gl.vertexAttribPointer(
        //    posLoc,  
        //    4,
        //    rnd.gl.FLOAT,
        //    false,
        //    (4 + 2) * 4,
        //    0,
        //);
        //
        //rnd.gl.enableVertexAttribArray(texLoc);
        //rnd.gl.vertexAttribPointer(
        //    texLoc,  
        //    2,
        //    rnd.gl.FLOAT,
        //    false,
        //    (4 + 2) * 4,
        //    4 * 4,
        //);
    }

    applyFB( rnd ) {
        //rnd.gl.enable(rnd.gl.DEPTH_TEST);

        rnd.gl.bindFramebuffer(rnd.gl.FRAMEBUFFER, this.frameBuffer);

        rnd.gl.clearColor(0, 0, 0, 0);
        //rnd.gl.clearColor(0, 0, 0, 0);
        rnd.gl.clear(rnd.gl.COLOR_BUFFER_BIT | rnd.gl.DEPTH_BUFFER_BIT);

        //gl.enable(gl.CULL_FACE);
    }

    static applyCanvas( rnd ) {
        rnd.gl.bindFramebuffer(rnd.gl.FRAMEBUFFER, null);
        rnd.gl.clearColor(0, 0, 0, 0);   // clear to white
        rnd.gl.clear(rnd.gl.COLOR_BUFFER_BIT | rnd.gl.DEPTH_BUFFER_BIT);
    }

    bindSamplers( rnd, shader ) {
        this.texPos.bind(rnd, shader, "inPos", 0);
        this.texNIsShade.bind(rnd, shader, "inNIsShade", 1);
        this.texKa.bind(rnd, shader, "inKa", 2);
        this.texKd.bind(rnd, shader, "inKd", 3);
        this.texKsPh.bind(rnd, shader, "inKsPh", 4);
        this.texColorTrans.bind(rnd, shader, "inColorTrans", 5);
    }
    
    unbindSamplers( rnd ) {
        this.texPos.       unbind(rnd, 0);
        this.texNIsShade.  unbind(rnd, 1);
        this.texKa.        unbind(rnd, 2);
        this.texKd.        unbind(rnd, 3);
        this.texKsPh.      unbind(rnd, 4);
        this.texColorTrans.unbind(rnd, 5);
    }
    
    
}