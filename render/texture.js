//import Parse from '../node_modules/parse/dist/parse.min.js';
//import PNG from '../node_modules/pngjs/browser.js';

export class Texture {
    sampler;
    texture;
    w;
    h;
    isReady = false;

    constructorByArrayLow( rnd, w, h, level, internalFormat, border, format, type, bits ) {
        this.texture = rnd.gl.createTexture();
        this.w = w;
        this.h = h;
        
        rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, this.texture);

        rnd.gl.texImage2D(
            rnd.gl.TEXTURE_2D,
            level,            // mip level
            internalFormat,  // internal format
            w,            // width
            h,            // height
            border,            // border
            format,  // format
            type, // type
            bits);

        this.isReady = true;
    }


    constructorByArray( rnd, w, h, bits ) {
        this.constructorByArrayLow(
            rnd, w, h,
            0,            // mip level
            rnd.gl.RGBA,  // internal format
            0,            // border
            rnd.gl.RGBA,  // format
            rnd.gl.UNSIGNED_BYTE, // type
            bits);
    }

    setParams( rnd, params ) {
        rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, this.texture);

        params.forEach((param)=>{
            rnd.gl.samplerParameteri(this.sampler, param[0], param[1]);
        });
    }

    constructorFromFile( rnd, fileName ) {
        var img = new Image();
        img.src = "../" + fileName;
        img.onload = ()=>{
            this.constructorByArray(rnd, img.width, img.height, img);
        };
    }
    
    constructor( rnd, ...args ) {
        switch(args.length) {
        case 1:
            this.constructorFromFile(rnd, args[0]);
            break;
        case 3:
            this.constructorByArray(rnd, args[0], args[1], args[2]);
            break;
        case 8:
            this.constructorByArrayLow(rnd, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
            break;
        }

        this.sampler = rnd.gl.createSampler();
        //rnd.gl.samplerParameteri(this.sampler, rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR);
        this.setParams(rnd, [
            [rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR],
        ]);
    }

    unbind( rnd, texUnit ) {
        if (this.isReady) {
            rnd.gl.activeTexture(rnd.gl.TEXTURE0 + texUnit);
            rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, null);
        }
    }

    bind( rnd, shader, samplerName, texUnit ) {
        if (this.isReady) {
            rnd.gl.activeTexture(rnd.gl.TEXTURE0 + texUnit);
        
            rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, this.texture);

            // Send unit to uniform

            var samplerLoc = rnd.gl.getUniformLocation(shader.program, samplerName);

            if (samplerLoc == undefined || samplerLoc == -1)
                console.log("FUCKING TEXTURE CAN'T FIND IT'S FUCKING SAMPLER");

            rnd.gl.uniform1i(samplerLoc, texUnit);
            
            rnd.gl.bindSampler(texUnit, this.sampler);
        }
    }
}