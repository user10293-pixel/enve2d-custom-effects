#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;

uniform float time;
uniform float intensity;
uniform float speed;

// Función de ruido simple
vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
               dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Ruido de Perlin
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main() {
    // Calcular el desplazamiento
    vec2 offset = vec2(
        noise(texCoord + time * speed),
        noise(texCoord + time * speed + 100.0)
    ) * intensity;

    // Aplicar el desplazamiento a las coordenadas de textura
    vec2 shakeUV = texCoord + offset;

    // Asegurarse de que las nuevas coordenadas estén dentro de los límites
    shakeUV = clamp(shakeUV, 0.0, 1.0);

    // Obtener el color de la textura en las nuevas coordenadas
    fragColor = texture2D(texture, shakeUV);
}
