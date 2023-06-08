import {Topology} from "./topology.js";
import {Material} from "./material.js";

export class Prim {
    vertexBuffer;
    vertexArray;
    indexesA;
    primVAO;
    TrCount;
    shader;
    mtlName;

    drawType;
    
    constructor( rnd, newShader, topology, newMtlName ) {
        this.shader = newShader;
        this.drawType = rnd.gl.TRIANGLES;
        if (newMtlName == undefined)
            this.mtlName = 'def';
        else
            this.mtlName = newMtlName;
        var posLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_pos');
        var normalLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_norm');
        var colorLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_color');

        this.primVAO = rnd.gl.createVertexArray();
        rnd.gl.bindVertexArray(this.primVAO);

        // Copy vertex array
        this.vertexArray = topology.getVertexArray();
        this.indexesA = new Uint32Array(topology.indexesA);
        //topology.vertexesA.map((elem)=>{this.vertexArray.concat(elem.p.concat(elem.n).concat(elem.c));});
        this.TrCount = Math.floor(this.indexesA.length / 3);
        //const posArray = Float32Array(topology.getPosArray());
        //const normalArray = Float32Array(topology.getNormalArray());
        //const colorArray = Float32Array(topology.getColorArray());
        
        // Copy info
        var Buf = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.ARRAY_BUFFER, Buf);
        rnd.gl.bufferData(rnd.gl.ARRAY_BUFFER, this.vertexArray, rnd.gl.STATIC_DRAW);

         
        var indexBuf = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.ELEMENT_ARRAY_BUFFER, indexBuf);
        rnd.gl.bufferData(rnd.gl.ELEMENT_ARRAY_BUFFER, this.indexesA, rnd.gl.STATIC_DRAW);

        // Bind to shader

        rnd.gl.enableVertexAttribArray(posLoc);
        rnd.gl.vertexAttribPointer(
            posLoc,  
            4,            // 2 values per vertex shader iteration
            rnd.gl.FLOAT,     // data is 32bit floats
            false,        // don't normalize
            4 * 4 * 3,    // stride (0 = auto)
            0,            // offset into buffer
        );

        rnd.gl.enableVertexAttribArray(normalLoc);
        rnd.gl.vertexAttribPointer(
            normalLoc,  
            4,            // 2 values per vertex shader iteration
            rnd.gl.FLOAT,     // data is 32bit floats
            false,        // don't normalize
            4 * 4 * 3,    // stride (0 = auto)
            4 * 4,        // offset into buffer
        );

        rnd.gl.enableVertexAttribArray(colorLoc);
        rnd.gl.vertexAttribPointer(
            colorLoc,  
            4,            // 2 values per vertex shader iteration
            rnd.gl.FLOAT,     // data is 32bit floats
            false,        // don't normalize
            4 * 4 * 3,    // stride (0 = auto)
            2 * 4 * 4,    // offset into buffer
        );
    }

    
    draw( rnd, camera, matrWP ) {
        camera.updateUbo(rnd, this.shader);
        //this.mtl.apply(gl, this.shader);

        Material.applyFromLib(rnd, this.shader, this.mtlName);

        rnd.gl.clearColor(1, 0.6, 0.8, 1);
        rnd.gl.bindVertexArray(this.primVAO);
        rnd.gl.useProgram(this.shader.program);
        
        // matrs world
 
        rnd.gl.uniformMatrix4fv(rnd.gl.getUniformLocation(this.shader.program, "matrWP"), true, matrWP.M);
        rnd.gl.uniformMatrix4fv(rnd.gl.getUniformLocation(this.shader.program, "matrVP"), true, camera.matrVP.M);
        rnd.gl.uniformMatrix4fv(rnd.gl.getUniformLocation(this.shader.program, "matrProj"), true, camera.matrProj.M);
        
        rnd.gl.drawElements(this.drawType, this.TrCount * 3, rnd.gl.UNSIGNED_INT, 0);
    }
}

export class Model {
    name;
    prims = [];
    primCounter = 0;

    constructFromToppology( rnd, newShader, topology ) {
        this.prims[this.prims.length] = new Prim(rnd, newShader,topology);
    }

    constructEmpty() {
    }
    constructor( ...args ) {
        switch (args.length)
        {
        case 0:
            this.constructEmpty();
            break;
        case 3:
            this.constructFromToppology(args[0], args[1], args[2]);
            break;
        }
    }

    draw( rnd, camera, matrWP = new math.matr()) {
        this.prims.forEach((elem)=>{
            elem.draw(rnd, camera, matrWP);
        });
    }

    addPrim( name, prim ) {
        this.prims[this.primCounter++] = prim;
        return;
        if (this.prims[name] == undefined)
            this.prims[name] = prim;
        else
        {
            var i = 0;

            while (this.prims[name + i] != undefined)
                i++;
            this.prims[name + i] = prim;
        }
    }

    async load( rnd, newShader, fileName ) {
        var mtlsPromise = null;
        var out;
        var outP = fetch(fileName + '?' + Math.random().toString()).then((res)=>{return res.text();}).then((source)=>{
            this.name = fileName;
            var lines = source.split('\n');


            var pA = [];
            var nA = [];
            var iA = [];
            var vA = [];
            var pCounter = 1, nCounter = 1, iCounter = 0, vCounter = 0;
            var curPrimName = null;
            var useMtl = 'def';

            lines.forEach((elem)=>{
                elem = elem.replace('\r', '');
                var words = elem.split(' ');
                if (words[0] == 'g' || words[0] == 'o')
                {
                    if (curPrimName != null)
                    {
                        this.addPrim(curPrimName, new Prim(rnd.gl, newShader, new Topology(vA, iA, 1), useMtl));
                    }// Submit prim
                    iA = [];
                    vA = [];
                    iCounter = 0, vCounter = 0;

                    if (words.length === 3)
                        curPrimName = words[1] + "/" + words[2];
                    else
                        curPrimName = words[1];
                }
                if (words[0] == 'v')
                    if (words.length == 5)
                        pA[pCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), parseFloat(words[4])];
                    else
                        pA[pCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), 1];    
                else if (words[0] == 'vn')
                    if (words.length == 5)
                        nA[nCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), parseFloat(words[4])];
                    else
                        nA[nCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), 1];    
                else if (words[0] == 'f')
                {
                    var vi = words[1].split('/');
                    vA[vCounter] = pA[vi[0]].concat(nA[vi[2]]).concat([1, 0, 1, 1]);
                    iA[vCounter] = vCounter++;

                    vi = words[2].split('/');
                    vA[vCounter] = pA[vi[0]].concat(nA[vi[2]]).concat([1, 0, 1, 1]);
                    iA[vCounter] = vCounter++;

                    vi = words[3].split('/');
                    vA[vCounter] = pA[vi[0]].concat(nA[vi[2]]).concat([1, 0, 1, 1]);
                    iA[vCounter] = vCounter++;
                }
                else if (words[0] === 'mtllib')
                {
                    if (mtlsPromise != null)
                        mtlsPromise = new Promise.all([mtlsPromise, this.loadMtls(rnd, words[1])]);
                    else
                        mtlsPromise = Material.loadMtls(rnd, words[1]);
                }
                else if (words[0] === 'usemtl')
                    useMtl = words[1];
            });
            if (curPrimName != null)
            {
                this.addPrim(curPrimName, new Prim(rnd, newShader, new Topology(vA, iA, 1), useMtl));
            } // Submit prim
            
        }).then((elem)=>{return out = elem});

        if (mtlsPromise == null)
            return outP;
        return Promise.all([outP, mtlsPromise]).then(()=>{ return out; });        
    }
}
