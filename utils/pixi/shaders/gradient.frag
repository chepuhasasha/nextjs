varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float timeX;
uniform float timeY;
uniform vec2 mouse;
uniform vec4 outputFrame;
void main() {
    vec2 crd = 12.0* (vTextureCoord.xy);
    float len;
    
    for (int i = 0; i < 10; i++) {
        len = length(vec2(crd.x, crd.y));
        crd.x = crd.x - cos(crd.y + sin(len)) + cos(timeX / 2.92);
        crd.y = crd.y + sin(crd.x + cos(len)) + sin(timeY / 2.90);
    }

    gl_FragColor = vec4(cos(len * 1.6), cos(len * 0.05), cos(len * 0.01), 1.0);
}