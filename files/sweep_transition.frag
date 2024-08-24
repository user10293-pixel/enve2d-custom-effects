#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;
uniform float progress;
uniform float smoothness;

void main() {
    vec4 fromColor = texture2D(texture, texCoord);
    vec4 toColor = vec4(0.0, 0.0, 0.0, 1.0); // Color negro para el área barrida

    float smoothProgress = smoothstep(progress - smoothness, progress + smoothness, texCoord.x);
    fragColor = mix(fromColor, toColor, smoothProgress);
}
