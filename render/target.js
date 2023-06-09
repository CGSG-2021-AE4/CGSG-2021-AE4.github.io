import { Texture } from "./texture.js";

export class Targets {
    frameBuffer;

    colorTex;
    depthTex;

    constructor( rnd ) {
        this.frameBuffer = rnd.gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);


        // Texturies

        this.colorTex = new Texture(rnd, rnd.W, rnd.H, null);
        this.colorTex.setParams(rnd, [
            [gl.TEXTURE_MIN_FILTER, gl.LINEAR],
            [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE],
            [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]
        ]);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTex, 0);


        this.depthTex = new Texture(rnd, rnd.W, rnd.H, null);
        this.depthTex.setParams(rnd, [
            [gl.TEXTURE_MIN_FILTER, gl.LINEAR],
            [gl.TEXTURE_MAG_FILTER, gl.LINEAR],
            [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE],
            [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]
        ]);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTex, 0);


        var vA = Float32Array([-1, -1, 0, 1,   0, 0,
                                1, -1, 0, 1,   1, 0,
                                1,  1, 0, 1,   1, 1]),
            indA = Uint32Array([0, 1, 2]);

        // Making target prim
        this.shader; // TODO
        var posLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_pos');
        if (posLoc === -1)
            console.log(`Can't find "in_pos".`);
        var texLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_tex');
        if (texLoc === -1)
            console.log(`Can't find "in_tex".`);
    
        this.primVAO = rnd.gl.createVertexArray();
        rnd.gl.bindVertexArray(this.primVAO);

        var Buf = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, Buf);
        rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, vA, rnd.gl.STATIC_DRAW);

        var indexBuf = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, indexBuf);
        rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, indA, rnd.gl.STATIC_DRAW);

        // Bind to shader

        rnd.gl.enableVertexAttribArray(posLoc);
        rnd.gl.vertexAttribPointer(
            posLoc,  
            4 * 4,
            rnd.gl.FLOAT,
            false,
            (4 + 2) * 4,
            0,
        );
        
        rnd.gl.enableVertexAttribArray(texLoc);
        rnd.gl.vertexAttribPointer(
            texLoc,  
            2 * 4,
            rnd.gl.FLOAT,
            false,
            (4 + 2) * 4,
            4 * 4,
        );
    }

    use( rnd ) {
        rnd.gl.bindFramebuffer(rnd.gl.FRAMEBUFFER, this.frameBuffer);
    }

    draw( rnd ) {
        
    }
}