import React, { type FC, useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type ModelProps = {
  nameModel: string;
  url: string;
  scaleModel: number;
};

const ModelViewer: FC<ModelProps> = ({ nameModel, url, scaleModel }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      90,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(1, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Lights (más realista)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(3, 10, 10);
    scene.add(dirLight);

    // Controls (solo rotate + zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2; // evita girar por debajo

    // Load model
    const loader = new FBXLoader();

    let model: THREE.Object3D;

    loader.load(url, (object) => {
      model = object;

      // Normalizar escala y centrar
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      model.position.sub(center);

      const scale = scaleModel / size;
      model.scale.setScalar(scale);

      scene.add(model);
    });

    // Resize

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);

      scene.clear();
    };
  }, [url]);

  const doubleClickHandler = () => {};

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Glow background */}
      <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 via-blue-500/20 to-cyan-950-500/20 blur-2xl opacity-60 rounded-2xl" />

      {/* Card */}
      <div className="relative bg-academic-charcoal backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex flex-col">
            <span className="text-xs text-white/50 tracking-widest">
              3D VIEWER
            </span>
            <span className="text-sm text-white font-medium">{nameModel}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-xs text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            ACTIVE
          </div>
        </div>

        {/* Viewer */}
        <div className="relative">
          <div ref={containerRef} className="w-full h-105 bg-black" />

          {/* Overlay HUD */}
          <div className="pointer-events-none absolute inset-0">
            {/* grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[20px 20px]" />

            {/* corner markers */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-white/30" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-white/30" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-white/30" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-white/30" />
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 text-xs text-white/60">
          <span>Drag: Rotate</span>
          <span>Scroll: Zoom</span>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
