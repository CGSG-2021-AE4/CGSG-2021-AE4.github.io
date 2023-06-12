#version 300 es

precision highp float;

out vec4 o_color;

vec2 Add( vec2 Z1, vec2 Z2 )
{                                       
  return vec2(Z1.x + Z2.x, Z1.y + Z2.y);
}

vec2 Mull( vec2 Z1, vec2 Z2 )
{
  return vec2(Z1.x * Z2.x - Z1.y * Z2.y, Z1.x * Z2.y + Z1.y * Z2.x);
}
float Norm2( vec2 Z )
{
  return Z.x * Z.x + Z.y * Z.y;
}
float Norm( vec2 Z )
{
  return sqrt(Norm2(Z));
}

float Mandlbrot( vec2 z )
{
  float n;
  vec2 z0 = z;

  for (n = 0.0; n < 255.0 && Norm2(z) < 4.0; n = n + 1.0) 
    z = Add(Mull(z, z), z0);
    
  return n;
}
int Julia( vec2 z, vec2 c )
{
  int n;

  for (n = 0; n < 255 && Norm2(z) < 4.0; n++) 
    z = Add(Mull(z, z), c);
  return n;
}

uniform float Scale;
uniform float W;
uniform float H;
uniform float TargetX;
uniform float TargetY;
uniform float MouseX;
uniform float MouseY;


void main()
{
    /*gl_FragCoord.xy * 0.0003;*/
    vec2 TargetPos = vec2(TargetX, TargetY);
    vec2 MousePos = vec2(MouseX, H - MouseY);
    vec2 Coords = (((gl_FragCoord.xy - vec2(W * 0.5, H * 0.5)) * Scale - vec2(TargetX, TargetY)) * 0.001);
    float v = Mandlbrot(Coords) * 0.005;
    o_color = vec4(v + 0.1, v, 0.5 * v + 0.05, 1);
}