#version 330 core
layout(location = 0) out vec4 fragColor;
uniform sampler2D texture;
in vec2 texCoord;
uniform float threshold;
uniform vec4 background_color;

void main() {
    vec4 color = texture2D(texture, texCoord);
    
    // Convertir a escala de grises
    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    // Aplicar threshold
    float alpha = step(threshold, 1.0 - luminance);
    
    // Mezclar con el color de fondo
    vec3 final_color = mix(background_color.rgb, color.rgb, alpha);
    
    fragColor = vec4(final_color, alpha);
}