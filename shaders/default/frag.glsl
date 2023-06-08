#version 300 es
precision highp float;

in vec4 v_pos;
in vec4 v_normal;
in vec2 v_tex;

out vec4 o_color;

uniform sampler2D texSampler;
uniform bool isTexture;

uniform camera {
    vec4 CamLoc;
    vec4 CamAt;
};

uniform mtl {
    vec4 Ka;
    vec4 KdTrans;
    vec4 KsPh;
};

uniform testSliders {
    vec4 a;
};


float Max( float a, float b )
{
    if (a > b)
        return a;
    else
        return b;
}

vec3 Shade( vec3 P, vec3 N, vec3 C )
{
  bool IsTexture0 = false;
  vec3 L = normalize(vec3(1.0, 2.0, 3.0));
  //vec3 LC = vec3(1, 1, 0.8);
  vec3 color = C.xyz;
  vec4 EndColor;
  vec3 V = normalize(P - CamLoc.xyz);
 
  N = faceforward(N, V, N);

  // Ambient
  //color = vec3(0.2);

  vec3 kdc = KdTrans.xyz;
  if (IsTexture0)
  {
    //vec4 tc = texture(Tex, DrawTexCoord);
    //if (tc.a < 0.1)
      discard;
//    kdc = tc.rgb;
  }
  // Diffuse
  color += max(0.007, dot(N, L)) * kdc * KsPh.xyz;
 
  //  color = kdc;
  // Specular
  vec3 R = reflect(V, N);

  float tmp = max(0.000, dot(R, L));
 
  color += pow(tmp, KsPh.w) * KdTrans.w * KsPh.xyz;


  //Pcolor = R;
  return color;
}

void main() {
    // o_color = vec4(a, 0.2, 1, 1); 
    // o_color = vec4(Shade(v_pos.xyz, v_normal.xyz, a.xyz), a.w);//CamAt;

    o_color = vec4(1.0, 0.0, 1.0, 1.0);
    if (a.w < 0.3)
        o_color = vec4(Shade(v_pos.xyz, v_normal.xyz, Ka.xyz), Ka.w);//CamAt;
    else if (a.w < 0.7)
        o_color = a;
    else
        if (isTexture)
            o_color = texture(texSampler, v_tex);
        else
            o_color = vec4(1.0, 0.0, 0.0, 1.0);

    // o_color = vec4(1, 0, 1, 1);
    // o_color = CamLoc;
}