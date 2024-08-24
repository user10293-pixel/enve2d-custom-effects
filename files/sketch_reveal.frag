#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;
uniform float progress;
uniform float lineWidth;
uniform float noise;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec4 color = texture2D(texture, texCoord);
    float dist = length(vec2(0.5) - texCoord);
    float noiseFactor = random(texCoord) * noise;
    float revealFactor = smoothstep(0.0, lineWidth, progress - dist + noiseFactor);
    fragColor = vec4(color.rgb, color.a * revealFactor);
}
