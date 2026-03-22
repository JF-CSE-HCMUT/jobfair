import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  Html,
  Center,
} from "@react-three/drei";
import { ArrowRight } from "lucide-react";
import * as THREE from "three";

interface InteractiveModelProps {
  url: string;
  scale?: number;
  followIntensity?: number;
  isHovered?: boolean;
  onFitCamera?: (view: {
    position: THREE.Vector3;
    target: THREE.Vector3;
  }) => void;
}

function InteractiveModel({
  url,
  scale = 1,
  followIntensity = 0.15,
  isHovered = false,
  onFitCamera,
}: InteractiveModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const { camera } = useThree();
  const targetRotationZ = useRef(0);
  const targetRotationY = useRef(0);
  const fixedRotationX = THREE.MathUtils.degToRad(53);
  const minRotationY = THREE.MathUtils.degToRad(-18);
  const maxRotationY = THREE.MathUtils.degToRad(18);
  const minRotationZ = THREE.MathUtils.degToRad(-9);
  const maxRotationZ = THREE.MathUtils.degToRad(9);
//fix view 
  useEffect(() => {
    if (!groupRef.current || !(camera instanceof THREE.PerspectiveCamera)) {
      return;
    }

    const box = new THREE.Box3().setFromObject(groupRef.current);
    const sphere = box.getBoundingSphere(new THREE.Sphere());

    if (!Number.isFinite(sphere.radius) || sphere.radius <= 0) {
      return;
    }

    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    const fitHeightDistance = sphere.radius / Math.sin(vFov / 2);
    const fitWidthDistance = sphere.radius / Math.sin(hFov / 2);
    const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.2;

    camera.position.set(sphere.center.x, sphere.center.y, sphere.center.z + distance);
    camera.near = Math.max(distance / 100, 0.1);
    camera.far = distance * 100;
    camera.lookAt(sphere.center);
    camera.updateProjectionMatrix();

    onFitCamera?.({
      position: camera.position.clone(),
      target: sphere.center.clone(),
    });
  }, [camera, onFitCamera, scene]);
// end fix

  useFrame((state) => {
    if (!groupRef.current) return;

    // Normalize mouse position to -1 to 1
    const mx = state.pointer.x;
    const my = state.pointer.y;

    // Keep a fixed X tilt and return to front view when not hovered.
    if (isHovered) {
      targetRotationY.current = THREE.MathUtils.clamp(
        mx * Math.PI * followIntensity * 2.5,
        minRotationY,
        maxRotationY
      );
      targetRotationZ.current = THREE.MathUtils.clamp(
        -my * Math.PI * followIntensity,
        minRotationZ,
        maxRotationZ
      );
    } else {
      targetRotationY.current = 0;
      targetRotationZ.current = 0;
    }

    groupRef.current.rotation.x = fixedRotationX;

    // Smooth lerp to target
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY.current,
      0.08
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotationZ.current,
      0.08
    );
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-muted border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-body">
          Loading model…
        </p>
      </div>
    </Html>
  );
}

interface ModelViewerProps {
  /** URL or path to a .glb / .gltf model */
  modelUrl: string;
  /** Uniform scale factor (default 1) */
  scale?: number;
  /** How strongly the model follows the cursor (0–1, default 0.15) */
  followIntensity?: number;
  /** Optional className for the wrapper div */
  className?: string;
  /** Show orbit controls for manual drag-rotation (default true) */
  enableOrbitControls?: boolean;
}

const ModelViewer = ({
  modelUrl,
  scale = 0.1,
  followIntensity = 0.55,
  className = "",
  enableOrbitControls = true,
}: ModelViewerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const controlsRef = useRef<any>(null);
  const initialViewRef = useRef<{
    position: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);

  const handleFitCamera = (view: {
    position: THREE.Vector3;
    target: THREE.Vector3;
  }) => {
    initialViewRef.current = view;

    if (!controlsRef.current) {
      return;
    }

    controlsRef.current.target.copy(view.target);
    controlsRef.current.object.position.copy(view.position);
    controlsRef.current.update();
    controlsRef.current.saveState();
  };

  const resetToInitialView = () => {
    if (!controlsRef.current || !initialViewRef.current) {
      return;
    }

    controlsRef.current.reset();
  };

  return (
    <section id="mapview" className="py-20 px-6 bg-background my-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            3d Visual Map View
          </h2>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-muted-foreground leading-relaxed">
            CHƯA BIẾT GHI GÌ
          </p>
          <p className="text-muted-foreground leading-relaxed">
            ĐÂY CŨNG VẬY
          </p>
          <button className="flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
            <ArrowRight size={16} />
            <span>View detail</span>
          </button>
        </div>

        <div
          className={`relative w-full aspect-square max-w-[900px] mx-auto rounded-2xl overflow-hidden border border-border bg-card shadow-card ${className}`}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <directionalLight
              position={[-3, 2, -2]}
              intensity={0.4}
              color="#a0c4ff"
            />

            <Suspense fallback={<LoadingFallback />}>
              <InteractiveModel
                url={modelUrl}
                scale={scale}
                followIntensity={followIntensity}
                isHovered={isHovered}
                onFitCamera={handleFitCamera}
              />
              <ContactShadows
                position={[0, -1.5, 0]}
                opacity={0.35}
                scale={8}
                blur={2.5}
              />
              <Environment preset="city" />
            </Suspense>

            {enableOrbitControls && (
              <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={true}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                minDistance={2}
                maxDistance={50}
                onEnd={resetToInitialView}
                makeDefault
              />
            )}
          </Canvas>

          {/* Overlay hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-foreground/10 backdrop-blur-md text-xs text-foreground/70 font-body pointer-events-none select-none">
            Hover to look • Scroll to zoom • Drag to orbit
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelViewer;
