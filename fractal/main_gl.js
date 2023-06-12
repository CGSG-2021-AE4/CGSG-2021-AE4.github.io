//function TestFunc() {
//console.log("It works");
//}

var UniformScale = 1;
var TargetX = 0, TargetY = 0;

async function LoadShader( gl, type, shaderDirName )
{
    let source = "";

    if (type === gl.VERTEX_SHADER)
        await fetch('./shaders/' + shaderDirName + '/vert.glsl?' + Math.random().toString()).then((ref) => {return ref.text()}).then((text) => {source = text});
    else if (type === gl.FRAGMENT_SHADER)
        await fetch('./shaders/' + shaderDirName + '/frag.glsl?' + Math.random().toString()).then((ref) => {return ref.text()}).then((text) => {source = text});

    const Shader = gl.createShader(type);

    gl.shaderSource(Shader, source);
    gl.compileShader(Shader);
    

    if (!gl.getShaderParameter(Shader, gl.COMPILE_STATUS))
    {
        console.log("SHADER POOPED -> " + gl.getShaderInfoLog(Shader));
        alert("FUCKING SHADER FUCKED UP");
    }

    return Shader;
}

async function LoadProgram( gl, shaderDirName )
{
    // Tmp kostil load shaders

    const v_shader = await LoadShader(gl, gl.VERTEX_SHADER, shaderDirName);
    const f_shader = await LoadShader(gl, gl.FRAGMENT_SHADER, shaderDirName);
    const shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, v_shader);
    gl.attachShader(shaderProgram, f_shader);
    gl.linkProgram(shaderProgram);
    

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        //console.log("SHADER POOPED -> " + gl.getShaderInfoLog(shaderProgram));
        alert("OOH FUCK");
    }
    return shaderProgram;
}

function SetUniformFlt( gl, shaderProgram, name, value )
{
    const UniformLoc = gl.getUniformLocation(shaderProgram, name); // Tmp kall
 
    gl.uniform1f(UniformLoc, value);
}

/* draw triangles function */
function DrawTriangles( gl, shaderProgram, LocA )
{
    console.log();
    // Create buf
    const posLoc = gl.getAttribLocation(shaderProgram, "in_pos");
    const posBuf = gl.createBuffer();
    
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    
    const pos = LocA;/*[-1, -1, 0, 1,
                 1, -1, 0, 1,
                 1, 1, 1, 1,
                 -1, -1, 0, 1,
                 -1, 1, 0, 1,
                 1, 1, 1, 1];*/

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW);
    gl.vertexAttribPointer(posLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posLoc);

    //debugger;
    gl.useProgram(shaderProgram);

    // Uniforms

    //SetUniformFlt(shaderProgram, "Scale", Math.sin(Date.getMilliseconds() * 0.01) * 0.5 + 0.5);
    SetUniformFlt(gl, shaderProgram, "W", parseInt(document.getElementById("canvas").getAttribute("width")));
    SetUniformFlt(gl, shaderProgram, "H", parseInt(document.getElementById("canvas").getAttribute("height")));
    SetUniformFlt(gl, shaderProgram, "TargetX", TargetX);
    SetUniformFlt(gl, shaderProgram, "TargetY", TargetY);
    
    SetUniformFlt(gl, shaderProgram, "MouseX", MouseX);
    SetUniformFlt(gl, shaderProgram, "MouseY", MouseY);
    
    
    SetUniformFlt(gl, shaderProgram, "Scale", UniformScale);
    
    //while (1)
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function InitGL()
{
    console.log("InitGL...");

    const canvas = document.getElementById("canvas");

    console.log(canvas);
    
    const gl = canvas.getContext("webgl2");

    console.log(gl);
    gl.clearColor(1, 0.6, 0.8, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return gl;
}


function Render( gl, shaderProgram ) {
    DrawTriangles(gl, shaderProgram, [-1, -1, 0, 1,
                                       1, -1, 0, 1,
                                       1, 1, 1, 1,
                                       -1, -1, 0, 1,
                                       -1, 1, 0, 1,
                                       1, 1, 1, 1]);
}

var IsClick = 0, PrevX = 0, PrevY = 0, MouseX = 0, MouseY = 0;
export async function Init() {
    const gl = InitGL();

    const shaderProgram = await LoadProgram(gl, "mandl");

    
    window.setInterval(() => { Render(gl, shaderProgram) }, 10);
    
    const responseObject = document.getElementById("canvas");

    responseObject.onwheel = (Info) => {
        console.log("Drawg");
        UniformScale *= Math.pow(1.1, Info.deltaY * 0.01);
    };

    responseObject.onmousedown = (Info) => {
        IsClick = 1;
        PrevX = Info.x;
        PrevY = Info.y;
    };
    responseObject.onmouseup = (Info) => {IsClick = 0};

    responseObject.onmouseenter = (Info) => { 
        var
            pageXOffset = window.pageXOffset,
            pageYOffset = window.pageYOffset;
        window.onscroll = () => {
            window.scrollTo(pageXOffset, pageYOffset);
        };
    };

    responseObject.onmouseout = (Info) => { 
        window.onscroll = null;
    };

    responseObject.onmousemove = (Info) => {
        console.log("Move");
        //UniformScale *= Math.pow(1.1, Info.deltaY * 0.01);
        if (IsClick)
        {
            TargetX += Info.movementX *  UniformScale;
            TargetY += -Info.movementY * UniformScale;
        }

        MouseX = Info.x;
        MouseY = Info.y;
    };

    window.onscroll = function () { window.scrollTo(0, 0); };

    //window.addEventListener('DOMMouseScroll', ()=>{});
    
    //debugger;
}