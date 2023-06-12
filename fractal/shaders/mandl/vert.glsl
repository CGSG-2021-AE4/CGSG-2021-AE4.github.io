#version 300 es

in vec3 in_pos;
in vec3 in_normal;
in vec4 in_color;

void main( )
{
   gl_Position = vec4(in_pos, 1); 
}