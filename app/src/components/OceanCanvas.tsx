import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const PALETTE = [
  new THREE.Color(0x081018),
  new THREE.Color(0x206078),
  new THREE.Color(0x205850),
  new THREE.Color(0x206060),
  new THREE.Color(0x78a890),
  new THREE.Color(0x90a898),
  new THREE.Color(0xa8b8a0),
  new THREE.Color(0xb8c8b8),
  new THREE.Color(0xc2a57f),
  new THREE.Color(0xc2b8a0),
  new THREE.Color(0xd4b5a0),
  new THREE.Color(0xc8a890),
  new THREE.Color(0x908878),
  new THREE.Color(0xa09888),
  new THREE.Color(0x687878),
];

const vertexShader = `
  uniform float time;
  uniform vec2 uSize;
  attribute vec3 color;
  varying vec2 vUv;
  varying vec3 vColor;

  #define WAVE_amp 0.025
  #define WAVE_freq 4.0
  #define WAVE_speed 0.5

  void main() {
    vColor = color;
    vUv = uv;

    vec3 pos = position;
    vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    float yFactor = (worldPos.y / uSize.y) + 0.5;

    float wave1 = sin(yFactor * WAVE_freq + time * WAVE_speed) * WAVE_amp;
    float wave2 = cos(yFactor * 12.0 + time * 0.3) * 0.015;
    float wave3 = sin(pos.x * 0.01 + time * 0.1) * 0.01;

    pos.x += wave1 + wave2 + wave3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float time;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying vec3 vColor;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    float paletteMix = vColor.y + sin(time * 0.05) * 0.05;
    float colorPhase = fract(paletteMix + uScrollProgress * 1.5);

    vec3 finalColor;
    if (colorPhase < 0.33) {
      finalColor = mix(uColor1, uColor2, colorPhase / 0.33);
    } else if (colorPhase < 0.66) {
      finalColor = mix(uColor2, uColor3, (colorPhase - 0.33) / 0.33);
    } else {
      finalColor = mix(uColor3, uColor1, (colorPhase - 0.66) / 0.34);
    }

    float grain = random(vUv * time) * 0.04;
    finalColor += grain;

    float depthFade = smoothstep(0.0, 1.0, vUv.y);
    finalColor = mix(finalColor, finalColor * 0.6, depthFade);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function OceanCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const ribbonMeshesRef = useRef<THREE.Mesh[]>([]);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const scrollProgressRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000
    );
    camera.position.z = 100;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setClearColor(0x081018, 1.0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // Create ribbons
    const ribbonMeshes: THREE.Mesh[] = [];

    function createRibbons() {
      // Clear existing
      ribbonMeshes.forEach((mesh) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        (mesh.material as THREE.ShaderMaterial).dispose();
      });
      ribbonMeshes.length = 0;

      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 30 : 50;

      for (let i = 0; i < count; i++) {
        const geometry = new THREE.PlaneGeometry(width * 1.4, 5, 100, 1);

        // Compute vertex colors
        const colors = new Float32Array(geometry.attributes.position.count * 3);
        const positions = geometry.attributes.position.array as Float32Array;

        for (let j = 0; j < geometry.attributes.position.count; j++) {
          const y = positions[j * 3 + 1];
          const normalizedY = (y + height / 2) / height;
          colors[j * 3] = normalizedY;
          colors[j * 3 + 1] = normalizedY;
          colors[j * 3 + 2] = normalizedY;
        }

        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            time: { value: 0.0 },
            uSize: { value: new THREE.Vector2(width, height) },
            uColor1: { value: new THREE.Vector3(0.03, 0.06, 0.09) },
            uColor2: { value: new THREE.Vector3(0.08, 0.25, 0.28) },
            uColor3: { value: new THREE.Vector3(0.76, 0.64, 0.50) },
            uScrollProgress: { value: 0.0 },
          },
          side: THREE.DoubleSide,
          depthTest: false,
          depthWrite: false,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -height / 2 + (i / count) * height;
        scene.add(mesh);
        ribbonMeshes.push(mesh);
      }

      ribbonMeshesRef.current = ribbonMeshes;
    }

    createRibbons();

    // Animation loop
    function animate(timestamp: number) {
      rafRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const time = timestamp * 0.001;
      lastTimeRef.current = time;

      // Scroll progress
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const currentScrollProgress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      scrollProgressRef.current += (currentScrollProgress - scrollProgressRef.current) * 0.05;

      // Update colors
      const cycleLength = PALETTE.length;
      const totalCycles = 3;
      const paletteIndexFloat = (scrollProgressRef.current * cycleLength * totalCycles) % cycleLength;
      const index0 = Math.floor(paletteIndexFloat) % cycleLength;
      const index1 = (index0 + 1) % cycleLength;

      const color0 = PALETTE[index0];
      const color1 = PALETTE[index1];
      const color2 = PALETTE[(index1 + 1) % cycleLength];

      // Update uniforms
      ribbonMeshesRef.current.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        if (mat.uniforms.time) {
          mat.uniforms.time.value = time;
        }
        if (mat.uniforms.uSize) {
          mat.uniforms.uSize.value.set(width, height);
        }
        if (mat.uniforms.uColor1) {
          mat.uniforms.uColor1.value.set(color0.r, color0.g, color0.b);
        }
        if (mat.uniforms.uColor2) {
          mat.uniforms.uColor2.value.set(color1.r, color1.g, color1.b);
        }
        if (mat.uniforms.uColor3) {
          mat.uniforms.uColor3.value.set(color2.r, color2.g, color2.b);
        }
        if (mat.uniforms.uScrollProgress) {
          mat.uniforms.uScrollProgress.value = scrollProgressRef.current;
        }
      });

      renderer.render(scene, camera);
    }

    animate(0);

    // Visibility change
    const handleVisibility = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      createRibbons();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);

      ribbonMeshesRef.current.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.ShaderMaterial).dispose();
        scene.remove(mesh);
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Animated ocean background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
