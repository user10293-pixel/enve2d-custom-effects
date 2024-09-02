#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;

uniform vec2 cameraPosition;
uniform float zoom;
uniform float rotation;
uniform float perspective;

vec2 rotatePoint(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
    vec2 uv = texCoord - 0.5;
    
    // Apply zoom
    uv *= 1.0 / zoom;
    
    // Apply rotation
    uv = rotatePoint(uv, rotation);
    
    // Apply corrected perspective distortion
    float z = 1.0 + uv.y * perspective;
    uv.x /= z;
    uv.y /= z;  // Modificación: ahora la perspectiva afecta tanto a X como a Y
    
    // Apply camera position
    uv += cameraPosition;
    
    // Move back to 0-1 range
    uv += 0.5;
    
    // Sample the texture
    if (uv.x >= 0.0 && uv.x <= 1.0 && uv.y >= 0.0 && uv.y <= 1.0) {
        fragColor = texture2D(texture, uv);
    } else {
        fragColor = vec4(0.0);  // Fuera de la imagen, color transparente
    }
}

