#version 300 es

in vec4 in_pos;
in vec4 in_norm;
in vec4 in_tex;

out vec4 v_pos;
out vec4 v_normal;
out vec4 v_tex;

uniform mat4 matrWP;
uniform mat4 matrVP;
uniform mat4 matrProj;

void main() {
    v_pos = in_pos;
    v_normal = in_norm;
    v_tex = in_tex;
    
    gl_Position = in_pos * matrWP * matrVP * matrProj;
}