/* Bindings
0 - material
1 - camera
2 - test 
3 - sliders 
*/
export class Ubo {
    buf;
    binding;

    constructor( rnd, size, newBinding, data = null )
    {
        this.buf = rnd.gl.createBuffer();

        rnd.gl.bindBuffer(rnd.gl.UNIFORM_BUFFER, this.buf);
        rnd.gl.bufferData(rnd.gl.UNIFORM_BUFFER, size, rnd.gl.DYNAMIC_DRAW);
        rnd.gl.bindBuffer(rnd.gl.UNIFORM_BUFFER, null);
        this.binding = newBinding;
    }

    submit( rnd, data )
    {
        rnd.gl.bindBuffer(rnd.gl.UNIFORM_BUFFER, this.buf);
        rnd.gl.bufferSubData(rnd.gl.UNIFORM_BUFFER, 0, data);
        rnd.gl.bindBuffer(rnd.gl.UNIFORM_BUFFER, null);
    }

    bind( rnd, shader, name ) {
        var index = rnd.gl.getUniformBlockIndex(shader.program, name);
        if (index === -1)
            console.log("FUCK: can't bind to " + name);

        rnd.gl.uniformBlockBinding(shader.program, index, this.binding);
        rnd.gl.bindBufferBase(rnd.gl.UNIFORM_BUFFER, this.binding, this.buf);
    }
}

//var mtlLib = [];

export class Material {
    ubo;
    Ka;
    Kd;
    Ks;
    Ph;
    Trans;

    constructorEmpty() {
        this.Ka = [0.05, 0.1, 0.2, 1];
        this.Kd = [0.4, 0.5, 0.3],
        this.Ks = [0.4, 0.5, 0.3];
        this.Ph = 1;
        this.Trans = 1;
    }

    constructorWithParams( newKa, newKd, newKs, newPh, newTrans ) {
        this.Ka = newKa;
        this.Kd = newKd;
        this.Ks = newKs;
        this.Ph = newPh;
        this.Trans = newTrans;
    }
    
    constructor( rnd, ...args ) {
        this.ubo = new Ubo(rnd, 4 * 4 * 3, 0); 
        
        switch (args.length)
        {
        case 0:
            this.constructorEmpty();
            break;
        case 5:
            this.constructorWithParams(args[0], args[1], args[2], args[3], args[4]);
            break;
        }
    }
    
    getMtlArray() {
        return new Float32Array(this.Ka.concat(this.Kd).concat(this.Trans).concat(this.Ks).concat(this.Ph));
    }
    
    apply( rnd, shader )
    {
        this.ubo.bind(rnd, shader, "mtl");
        
        this.ubo.submit(rnd, this.getMtlArray());
    }

    static addToMtlLib( rnd, name, mtl ) {
        if (rnd.mtlLib[name] == undefined)
            rnd.mtlLib[name] = mtl;
    }
    static applyFromLib( rnd, shader, name )
    {
        if (rnd.mtlLib[name] != undefined)
            rnd.mtlLib[name].apply(rnd, shader);
        else
            rnd.mtlLib['def'].apply(rnd, shader);

    }

    static async loadMtls( rnd, fileName ) {
        return fetch('./models/' + fileName + '?' + Math.random().toString()).then((res)=>{ return res.text(); }).then((text)=>{
            var lines = text.split('\n');
            var outMtls = [];
            var curMtlName = null,
                Ka = [0.87, 0, 0.87],
                Kd = [0.87, 0, 0.87],
                Ks = [0.87, 0, 0.87],
                Ph = 1,
                Trans = 1;

            lines.forEach((line)=>{
                line = line.replace('\r', '');

                var words = line.split(' ');

                if (words.length > 0)
                    switch (words[0])
                    {
                    case 'newmtl':
                        if (curMtlName != null)
                        {
                            outMtls[curMtlName] = new Material(rnd, Ka, Kd, Ks, Ph, Trans); // Submit mtl
                        }
                        curMtlName = words[1];
                        break;
                    case 'Ka':
                        Ka = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3]), 1];
                        break;
                    case 'Kd':
                        Kd = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3])];
                        break;
                    case 'Ks':
                        Ks = [parseFloat(words[1]), parseFloat(words[2]), parseFloat(words[3])];
                        break;
                    }
                
            });
            if (curMtlName != null)
                outMtls[curMtlName] = new Material(rnd, Ka, Kd, Ks, Ph, Trans); // Submit mtl

            for (var elem in outMtls)
                this.addToMtlLib(rnd, elem, outMtls[elem]);
        });
    }
}