import {Topology, Vertex} from "./topology.js";
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

    tex;
    
    constructor( rnd, newShader, topology, newMtlName ) {
        this.shader = newShader;
        this.drawType = rnd.gl.TRIANGLES;
        if (newMtlName == undefined)
            this.mtlName = 'def';
        else
            this.mtlName = newMtlName;

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

        var posLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_pos');
        if (posLoc != -1)
        { // console.log(`Can't find "in_pos".`);
            rnd.gl.enableVertexAttribArray(posLoc);
            rnd.gl.vertexAttribPointer(
                posLoc,  
                Vertex.pLen(),
                rnd.gl.FLOAT,
                false,
                Vertex.len() * 4,
                0,
            );  
        }
        var normalLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_norm');
        if (normalLoc != -1)
        { // console.log(`Can't find "in_norm".`);
            rnd.gl.enableVertexAttribArray(normalLoc);
            rnd.gl.vertexAttribPointer(
                normalLoc,  
                Vertex.nLen(),
                rnd.gl.FLOAT,
                false,
                Vertex.len() * 4,
                Vertex.pLen() * 4,
            );
        }
        
        var texLoc = rnd.gl.getAttribLocation(this.shader.program, 'in_tex');
        if (texLoc != -1)  
        { // console.log(`Can't find "in_tex".`);
            rnd.gl.enableVertexAttribArray(texLoc);
            rnd.gl.vertexAttribPointer(
                texLoc,  
                Vertex.tLen(),
                rnd.gl.FLOAT,
                false,
                Vertex.len() * 4,
                (Vertex.pLen() + Vertex.nLen()) * 4,
            );
        }
    }

    
    draw( rnd, camera, matrWP ) {
        camera.updateUbo(rnd, this.shader);
        //this.mtl.apply(gl, this.shader);

        
        //rnd.gl.clearColor(1, 0.6, 0.8, 1);
        rnd.gl.bindVertexArray(this.primVAO);
        rnd.gl.useProgram(this.shader.program);
        
        // Apply texture 
        Material.applyFromLib(rnd, this.shader, this.mtlName);
        // matrs world
 
        let tmpLoc = rnd.gl.getUniformLocation(this.shader.program, "matrWP");
        if (tmpLoc != -1)
            rnd.gl.uniformMatrix4fv(tmpLoc, true, matrWP.M);
        tmpLoc = rnd.gl.getUniformLocation(this.shader.program, "matrVP");
        if (tmpLoc != -1)
            rnd.gl.uniformMatrix4fv(tmpLoc, true, camera.matrVP.M);
        tmpLoc = rnd.gl.getUniformLocation(this.shader.program, "matrProj")
        if (tmpLoc != -1)
            rnd.gl.uniformMatrix4fv(tmpLoc, true, camera.matrProj.M);
        
        rnd.gl.drawElements(this.drawType, this.TrCount * 3, rnd.gl.UNSIGNED_INT, 0);
    }
}

export class Model {
    name;
    prims = [];
    primCounter = 0;

    constructFromToppology( rnd, newShader, topology ) {
        this.prims[this.prims.length] = new Prim(rnd, newShader, topology);
    }

    constructFromPrim( rnd, prim ) {
        this.prims[this.prims.length] = prim;
    }


    constructEmpty() {
        
    }
    constructor( ...args ) {
        switch (args.length)
        {
        case 0:
            this.constructEmpty();
            break;
        case 2:
            this.constructFromPrim();
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
        console.log("Loading " + fileName);
    
        var pathA = fileName.split('/'),
            path = fileName.replace(pathA[pathA.length - 1], '');

        var mtlsPromise = null;
        var out;
        var outP = fetch(fileName + '?' + Math.random().toString()).then((res)=>{return res.text();}).then((source)=>{
            this.name = fileName;
            var lines = source.split('\n');


            var pA = [];
            var nA = [];
            var tA = [];

            var iA = [];
            var vA = [];
            var pCounter = 1, nCounter = 1, tCounter = 1, iCounter = 0, vCounter = 0;
            var curPrimName = null;
            var useMtl = 'def';

            lines.forEach((elem)=>{
                elem = elem.replace('\r', '');
                var words = elem.split(' ');
                switch (words[0])
                {
                case 'g':
                case 'o': // Create new prim
                    if (curPrimName != null)
                    {
                        this.addPrim(curPrimName, new Prim(rnd.gl, newShader, new Topology(vA, iA, 1), useMtl));
                    } // Submit prim
                    iA = [];
                    vA = [];
                    iCounter = 0, vCounter = 0;

                    if (words.length === 3)
                        curPrimName = words[1] + "/" + words[2];
                    else
                        curPrimName = words[1];    
                    break;
                case 'v': // Position
                    if (words.length == 5)
                        pA[pCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), parseFloat(words[4])];
                    else
                        pA[pCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), 1];
                    break;
                case 'vn': // Normal
                    if (words.length == 5)
                        nA[nCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), parseFloat(words[4])];
                    else
                        nA[nCounter++] = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), 1];
                    break;
                case 'vt': // Texture
                    tA[tCounter++] = [parseFloat(words[1]), parseFloat(words[2])];
                    break;
                case 'f': // Indexes
                    var getV = ( inds )=>{
                        if (vi[1] != '')
                            return pA[vi[0]].concat(nA[vi[2]]).concat(tA[vi[1]]);
                        else
                            return pA[vi[0]].concat(nA[vi[2]]).concat([0, 0]);
                    };
                    var vi = words[1].split('/');
                    vA[vCounter] = getV(vi);
                    iA[vCounter] = vCounter++;

                    vi = words[2].split('/');
                    vA[vCounter] = getV(vi);
                    iA[vCounter] = vCounter++;

                    vi = words[3].split('/');
                    vA[vCounter] = getV(vi);
                    iA[vCounter] = vCounter++;
                    break;
                case 'mtllib': // Load material lib
                    if (mtlsPromise != null)
                        mtlsPromise = new Promise.all([mtlsPromise, this.loadMtls(rnd, path + words[1])]);
                    else
                        mtlsPromise = Material.loadMtls(rnd, path + words[1]);
                    break;
                case 'usemtl': // Use material
                    useMtl = words[1];
                    break;
                }
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
