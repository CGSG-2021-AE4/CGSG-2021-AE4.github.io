#version 300 es

in vec4 in_pos;
in vec2 in_tex;

out vec4 v_pos;
out vec2 v_tex;

void main() {
    v_pos = in_pos;
    v_tex = in_tex;
    
    gl_Position = in_pos;
}