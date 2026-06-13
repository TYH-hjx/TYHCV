import { useEffect, useRef } from "react";

export default function Aurora({
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
  speed = 1.0,
  blend = 0.5,
  amplitude = 1.0,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animIdRef = useRef(null);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return;

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, `precision highp float;varying vec2 v_uv;uniform vec3 u_color1,u_color2,u_color3;uniform float u_time,u_speed,u_blend,u_amplitude;uniform vec2 u_resolution;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),f.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),f.x),f.y);}float fbm(vec2 p){float v=0.0;float a=0.5;vec2 shift=vec2(100.0);mat2 rot=mat2(cos(0.5),sin(0.5),-sin(0.5),cos(0.5));for(int i=0;i<5;i++){v+=a*noise(p);p=rot*p*2.0+shift;a*=0.5;}return v;}void main(){vec2 uv=v_uv;float aspect=u_resolution.x/u_resolution.y;uv.x*=aspect;float t=u_time*u_speed*0.3;float band1=sin(uv.x*3.0+t*0.7+noise(vec2(uv.y*2.0,t*0.5))*2.0)*0.5+0.5;float band2=sin(uv.x*2.5-t*0.5+noise(vec2(uv.y*1.8+1.0,t*0.4))*1.8)*0.5+0.5;float band3=sin(uv.x*3.5+t*0.6+noise(vec2(uv.y*2.2+2.0,t*0.7))*2.5)*0.5+0.5;float yOffset=(uv.y-0.5)*u_amplitude;float aurora1=smoothstep(0.6+yOffset,0.3+yOffset,uv.y)*band1;float aurora2=smoothstep(0.7+yOffset,0.4+yOffset,uv.y)*band2;float aurora3=smoothstep(0.8+yOffset,0.5+yOffset,uv.y)*band3;float fbmVal=fbm(uv*3.0+t*0.2);float aurora=(aurora1*0.5+aurora2*0.3+aurora3*0.2)*(0.7+fbmVal*0.3);vec3 col=mix(u_color1,u_color2,aurora);col=mix(col,u_color3,aurora*0.5);float alpha=aurora*u_blend;col*=alpha;float edgeFade=smoothstep(0.0,0.15,uv.y)*smoothstep(1.0,0.85,uv.y);col*=edgeFade;gl_FragColor=vec4(col,1.0);}`);
    gl.compileShader(fs);

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uColor1 = gl.getUniformLocation(program, "u_color1");
    const uColor2 = gl.getUniformLocation(program, "u_color2");
    const uColor3 = gl.getUniformLocation(program, "u_color3");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uSpeed = gl.getUniformLocation(program, "u_speed");
    const uBlend = gl.getUniformLocation(program, "u_blend");
    const uAmplitude = gl.getUniformLocation(program, "u_amplitude");
    const uResolution = gl.getUniformLocation(program, "u_resolution");

    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1,3),16)/255;
      const g = parseInt(hex.slice(3,5),16)/255;
      const b = parseInt(hex.slice(5,7),16)/255;
      return [r,g,b];
    };
    gl.uniform3fv(uColor1, hexToRgb(colorStops[0]));
    gl.uniform3fv(uColor2, hexToRgb(colorStops[1]));
    gl.uniform3fv(uColor3, hexToRgb(colorStops[2]));
    gl.uniform1f(uSpeed, speed);
    gl.uniform1f(uBlend, blend);
    gl.uniform1f(uAmplitude, amplitude);

    let startTime = performance.now();

    const resize = () => {
      const container = containerRef.current;
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uResolution, w, h);
      }
    };

    const render = () => {
      if (visibleRef.current) {
        resize();
        gl.uniform1f(uTime, (performance.now() - startTime) / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      animIdRef.current = requestAnimationFrame(render);
    };
    render();

    // Pause WebGL rendering when hero section is not visible
    let observer;
    if (containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => { visibleRef.current = entry.isIntersecting; },
        { threshold: 0 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animIdRef.current);
      if (observer) observer.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [colorStops, speed, blend, amplitude]);

  return (
    <div ref={containerRef} className="aurora-container" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
