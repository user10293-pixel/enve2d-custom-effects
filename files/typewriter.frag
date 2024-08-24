#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;

uniform float progress;  // Controla el progreso del efecto (de 0.0 a 1.0)

void main() {
    vec2 uv = texCoord;

    // Calculamos la posición límite del efecto de "máquina de escribir"
    float limit = progress;

    // Si la coordenada x del texto está dentro del límite, lo mostramos
    if (uv.x < limit) {
        fragColor = texture2D(texture, uv);
    } else {
        fragColor = vec4(0.0);  // Ocultamos las letras que no han sido "escritas"
    }
}

