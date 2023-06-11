#version 300 es
precision highp float;

in vec4 v_pos;
in vec2 v_tex;

out vec4 o_color;

// uniform sampler2D inTex;
// uniform sampler2D inColor;

uniform sampler2D inPos;
uniform sampler2D inNIsShade;
uniform sampler2D inKa;
uniform sampler2D inKd;
uniform sampler2D inKsPh;
uniform sampler2D inColorTrans;

uniform camera {
    vec4 CamLoc;
    vec4 CamAt;
};

vec3 Shade( vec3 LightDir, vec3 LightColor, vec3 P, vec3 N, vec3 Ka, vec3 Kd, vec3 Ks, float Ph )
{
  vec3 L = normalize(vec3(LightDir.x, -LightDir.y, LightDir.z));
  vec3 color = vec3(0);
  vec3 V = normalize(P - CamLoc.xyz);

  N = faceforward(N, V, N);
  // faceforwarding normal 

  // Diffuse              
  color += max(0.01, dot(N, L)) * Kd * LightColor;
  //color += max(0.01, dot(N, L)) * Kd;
  //color += -V;
  //color += vec3(1, 1, 1);
  //color *= 0.5;

  // Specular
  color += pow(max(0.001, dot(reflect(V, N), L)), Ph) * Ks * LightColor;
  //color += pow(max(0.001, dot(reflect(V, N), L)), 10.0);
  //color += V;

  //Pcolor = R;
  return color;                     
}

void main() {
//    o_color = vec4(0.0, 1.0, 1.0, 1.0);

    
    float a = 0.5;

    vec2 texCoords = v_tex;

    //o_color = vec4(texture(inKa, v_tex).xyz, 1);

    if (texture(inNIsShade, texCoords).w > 0.5)
        o_color = vec4(Shade(vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0),
            texture(inPos, texCoords).xyz,      // Pos
            texture(inNIsShade, texCoords).xyz, // Normal
            texture(inKa, texCoords).xyz,       // Ka
            texture(inKd, texCoords).xyz,       // Kd
            texture(inKsPh, texCoords).xyz,     // Ks
            texture(inKsPh, v_tex).w),      // Ph
            1);
    else
        o_color = vec4(1.0, 1.0, 0.0, 1.0);//o_color = vec4(texture(inColorTrans, texCoords).xyz, 1);
    
    if (a < 000.0)
        o_color = vec4(texture(inPos, v_tex).rgb, 1);
    else if (a < 000.0)
        o_color = vec4(texture(inNIsShade, texCoords).xyz * 0.5 + vec3(0.5), 1);
    else if (a < 0.0)
        o_color = vec4(texture(inKa, texCoords).rgb, 1);
    else if (a < 0.0)
        o_color = vec4(texture(inKd, texCoords).rgb, 1);
    else if (a < 0.0)
        o_color = vec4(texture(inKsPh, texCoords).rgb, 1);
    else if (a < 0.0)
        o_color = vec4(texture(inColorTrans, texCoords).rgb, 1);

    //o_color = vec4(1, 0, 1, 1);
}
