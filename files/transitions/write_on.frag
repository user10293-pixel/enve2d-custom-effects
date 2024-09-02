#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;

uniform float progress;  // Controla el progreso del efecto

void main() {
    vec2 uv = texCoord;

    // Aquí aplicamos una máscara simple para simular el trazo
    if (uv.x < progress) {
        fragColor = texture2D(texture, uv);
    } else {
        fragColor = vec4(0.0);  // Transparente donde aún no ha llegado el trazo
    }
}

