void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	float l;
    vec2 uv;
    vec2 p = fragCoord.xy/iResolution.xy;
    uv=p;
    p+=10.;
    l=length(uv);
    uv+=p*(sin(iTime/10.0))*abs(sin(l * 10.));
    vec3 color=vec3(0.3/length(mod(uv,1.)-.5));
	
	fragColor=vec4(0.8/length(mod(uv,1.)-.5), .2/length(mod(uv,1.)-.5), .8/length(mod(uv,1.)-.5),1.);
}

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
    float l;
    vec2 uv;
    vec2 p = fragCoord.xy/vTextureCoord.xy;
    uv=p;
    p+=10.;
    l=length(uv);
    uv+=p*(sin(iTime/10.0))*abs(sin(l * 10.));
    vec3 color=vec3(0.3/length(mod(uv,1.)-.5));


    gl_FragColor=vec4(0.8/length(mod(uv,1.)-.5), .2/length(mod(uv,1.)-.5), .8/length(mod(uv,1.)-.5),1.);
}