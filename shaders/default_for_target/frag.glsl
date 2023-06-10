#version 300 es
precision highp float;

in vec4 v_pos;
in vec3 v_normal;
in vec2 v_tex;

//layout(location = 0) out vec4 o_color;
//layout(location = 1) out vec4 o_tex;

layout(location = 0) out vec4 outPos;
layout(location = 1) out vec4 outNIsShade;
layout(location = 2) out vec4 outKa;
layout(location = 3) out vec4 outKd;
layout(location = 4) out vec4 outKsPh;
layout(location = 5) out vec4 outColorTrans;

uniform sampler2D texKd;
uniform bool isTexKd;

uniform camera {
    vec4 CamLoc;
    vec4 CamAt;
};

uniform mtl {
    vec4 Ka;
    vec4 KdTrans;
    vec4 KsPh;
};
//////////////////////////////////////////////////////
uniform testSliders {
    vec4 a;
};
//////////////////////////////////////////////////////

void main() {
    outPos = v_pos;
    outNIsShade = vec4(v_normal, 1);
    outKa = Ka;
    if (isTexKd)
        outKd = vec4(texture(texKd, v_tex).xyz, 1);
    else
        outKd = vec4(KdTrans.xyz, 1);

    outKsPh = KsPh;
    //outColorTrans = vec4(texture(texSampler, v_tex).xyz, 1);       
    outColorTrans = vec4(0, 1, 0.5, 1);       

}