#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;

uniform float intensity;
uniform float speed;
uniform float enabled; // Cambiado de bool a float
uniform float iTime;

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
    if (enabled > 0.5) { // Cambiado para usar float en lugar de bool
        vec2 offset = vec2(
            noise(texCoord + iTime * speed),
            noise(texCoord + iTime * speed + 100.0)
        ) * intensity;

        vec2 shakeUV = texCoord + offset;
        shakeUV = clamp(shakeUV, 0.0, 1.0);

        fragColor = texture2D(texture, shakeUV);
    } else {
        fragColor = texture2D(texture, texCoord);
    }
}
