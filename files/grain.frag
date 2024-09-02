#version 330 core

layout(location = 0) out vec4 fragColor;

uniform sampler2D texture;

in vec2 texCoord;
layout(origin_upper_left) in vec4 gl_FragCoord;

uniform float grain_amount;
uniform float grain_size;
uniform float grain_speed;
uniform vec4 grain_color;

uniform float time;

// Function to generate pseudo-random values
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main(void) {
    vec4 original_color = texture2D(texture, texCoord);
    
    // Grain calculation
    vec2 grain_uv = gl_FragCoord.xy / grain_size + time * grain_speed;
    float grain = random(grain_uv) * 2.0 - 1.0;
    
    // Apply grain
    vec3 grain_effect = mix(original_color.rgb, grain_color.rgb, grain * grain_amount);
    
    fragColor = vec4(grain_effect, original_color.a);
}