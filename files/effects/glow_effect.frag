#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;
uniform float intensity;
uniform float threshold;
uniform float radius;

vec4 blur(sampler2D image, vec2 uv, float r) {
    vec4 color = vec4(0.0);
    for(float i = -r; i <= r; i += 1.0) {
        for(float j = -r; j <= r; j += 1.0) {
            color += texture2D(image, uv + vec2(i, j) / textureSize(image, 0));
        }
    }
    return color / ((2.0 * r + 1.0) * (2.0 * r + 1.0));
}

void main() {
    vec4 originalColor = texture2D(texture, texCoord);
    vec4 blurredColor = blur(texture, texCoord, radius);
    
    vec4 glowColor = max(blurredColor - threshold, 0.0) * intensity;
    
    fragColor = originalColor + glowColor;
}
