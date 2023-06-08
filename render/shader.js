export class Shader {
    program;

    constructor() {
    }

    static async loadShaderPart( rnd, type, dirName ) {
        let source = "";

        var result;

        if (type === rnd.gl.VERTEX_SHADER)
            result = fetch('./shaders/' + dirName + '/vert.glsl?' + Math.random().toString()).then((res)=>{return res.text();}).then((text)=>{source = text;});
        else if (type === rnd.gl.FRAGMENT_SHADER)
            result = fetch('./shaders/' + dirName + '/frag.glsl?' + Math.random().toString()).then((res)=>{return res.text();}).then((text)=>{source = text;});

        return result.then(()=>{
            const shader = rnd.gl.createShader(type);
          
            rnd.gl.shaderSource(shader, source);
            rnd.gl.compileShader(shader);
            if (!rnd.gl.getShaderParameter(shader, rnd.gl.COMPILE_STATUS))
            {
                console.log("SHADER POOPED -> " + rnd.gl.getShaderInfoLog(shader));
                 alert("FUCKING SHADER FUCKED UP");
            }
      
            return shader;
        });
    }

    async loadShader( rnd, name ) {
        var v_shader;
        var f_shader;

        this.program = rnd.gl.createProgram();

        var result = Promise.all([Shader.loadShaderPart(rnd, rnd.gl.VERTEX_SHADER,   name).then((shader)=>{v_shader = shader}),
                                  Shader.loadShaderPart(rnd, rnd.gl.FRAGMENT_SHADER, name).then((shader)=>{f_shader = shader})]);

        return result.then(()=>{
            rnd.gl.attachShader(this.program, v_shader);
            rnd.gl.attachShader(this.program, f_shader);
            rnd.gl.linkProgram(this.program);
            
            if (!rnd.gl.getProgramParameter(this.program, rnd.gl.LINK_STATUS))
                alert("OOH FUCK");
        });
    }
}