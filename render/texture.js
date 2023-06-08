//import Parse from '../node_modules/parse/dist/parse.min.js';
//import PNG from '../node_modules/pngjs/browser.js';

export class Texture {
    sampler;
    texture;
    w;
    h;

    constructorByArray( rnd, w, h, bits ) {
        this.texture = rnd.gl.createTexture();
        this.w = w;
        this.h = h;

        
        rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, this.texture);

        rnd.gl.texImage2D(
            rnd.gl.TEXTURE_2D,
            0,            // mip level
            rnd.gl.RGBA,  // internal format
            w,            // width
            h,            // height
            0,            // border
            rnd.gl.RGBA,  // format
            rnd.gl.UNSIGNED_BYTE, // type
            bits);

        this.sampler = rnd.gl.createSampler();
        rnd.gl.samplerParameteri(this.sampler, rnd.gl.TEXTURE_MIN_FILTER, rnd.gl.LINEAR);
    }

    constructorFromFile( rnd, fileName ) {

        //var _img = document.getElementById('imageLoader');
        //var newImg = new Image;
        //newImg.onload = function() {
        //    _img.src = this.src;
        //}
        //newImg.src = fileName;

        var img = new Image();
        img.src = "../models/" + fileName;
        img.onload = ()=>{
            this.constructorByArray(rnd, 1024, 1024, img);
        }

        //var file = new Parse.File("../models/" + fileName);
        //var loader = document.getElementById("imageLoader");
        //
        //loader.src = "./models/" + fileName;
        //loader.onload = (image)=>{
        //    image.currentTarget.decode((e)=>{
        //        e;
        //    });
        //};
//        PNG;
        
    }
    
    constructor(rnd, ...args) {
        switch(args.length) {
        case 1:
            this.constructorFromFile(rnd, args[0]);
            break;
        case 3:
            this.constructorByArray(rnd, args[0], args[1], args[2]);
            break;
        }
    }

    apply( rnd, shader ) {
        var texUnit = 0;

        rnd.gl.activeTexture(rnd.gl.TEXTURE0 + texUnit);
        
        rnd.gl.bindTexture(rnd.gl.TEXTURE_2D, this.texture);

        // Send unit to uniform

        rnd.gl.uniform1i(rnd.gl.getUniformLocation(shader.program, "texSampler"), texUnit);
        
        rnd.gl.bindSampler(texUnit, this.sampler);
    }
}