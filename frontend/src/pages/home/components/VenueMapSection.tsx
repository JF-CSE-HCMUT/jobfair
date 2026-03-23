import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, ContactShadows, Environment, Html, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import "./VenueMapSection.css";

type InteractiveModelProps = {
    url: string;
    isHovered: boolean;
    onFitCamera: (view: { position: THREE.Vector3; target: THREE.Vector3 }) => void;
};

const InteractiveModel = ({ url, isHovered, onFitCamera }: InteractiveModelProps) => {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(url);
    const { camera } = useThree();
    const targetY = useRef(0);
    const targetZ = useRef(0);

    useEffect(() => {
        if (!groupRef.current || !(camera instanceof THREE.PerspectiveCamera)) {
            return;
        }

        const box = new THREE.Box3().setFromObject(groupRef.current);
        const sphere = box.getBoundingSphere(new THREE.Sphere());

        if (!Number.isFinite(sphere.radius) || sphere.radius <= 0) {
            return;
        }

        const fov = THREE.MathUtils.degToRad(camera.fov);
        const distance = sphere.radius / Math.sin(fov / 2);
        camera.position.set(sphere.center.x, sphere.center.y, sphere.center.z + distance * 1.2);
        camera.lookAt(sphere.center);

        onFitCamera({ position: camera.position.clone(), target: sphere.center.clone() });
    }, [camera, onFitCamera, scene]);

    useFrame((state) => {
        if (!groupRef.current) {
            return;
        }

        if (isHovered) {
            targetY.current = THREE.MathUtils.clamp(state.pointer.x * 0.6, -0.35, 0.35);
            targetZ.current = THREE.MathUtils.clamp(-state.pointer.y * 0.2, -0.2, 0.2);
        } else {
            targetY.current = 0;
            targetZ.current = 0;
        }

        groupRef.current.rotation.x = THREE.MathUtils.degToRad(53);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY.current, 0.09);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ.current, 0.09);
    });

    return (
        <group ref={groupRef}>
            <Center>
                <primitive object={scene} scale={0.1} />
            </Center>
        </group>
    );
};

const VenueMapSection = ({ modelUrl }: { modelUrl: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const controlsRef = useRef<OrbitControlsImpl | null>(null);

    const onFitCamera = (view: { position: THREE.Vector3; target: THREE.Vector3 }) => {
        if (!controlsRef.current) {
            return;
        }

        controlsRef.current.target.copy(view.target);
        controlsRef.current.object.position.copy(view.position);
        controlsRef.current.update();
        controlsRef.current.saveState();
    };

    return (
        <section id="venue-map" className="home-map">
            <div className="home-map__container">
                <h2 className="home-map__title">Bản đồ 3D khu vực sự kiện</h2>
                <p className="home-map__intro">Quan sát bố cục khu vực sự kiện để định hướng vị trí nhanh hơn trước khi tham gia ngày hội.</p>

                <div
                    className="home-map__viewer"
                    onPointerEnter={() => setIsHovered(true)}
                    onPointerLeave={() => setIsHovered(false)}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[5, 5, 5]} intensity={1} />

                        <Suspense
                            fallback={
                                <Html center>
                                    <span className="home-map__loading">Đang tải mô hình...</span>
                                </Html>
                            }
                        >
                            <InteractiveModel url={modelUrl} isHovered={isHovered} onFitCamera={onFitCamera} />
                            <ContactShadows position={[0, -1.5, 0]} opacity={0.35} scale={8} blur={2.5} />
                            <Environment preset="city" />
                        </Suspense>

                        <OrbitControls
                            ref={controlsRef}
                            enablePan={false}
                            minPolarAngle={Math.PI / 2}
                            maxPolarAngle={Math.PI / 2}
                            minDistance={2}
                            maxDistance={50}
                            makeDefault
                        />
                    </Canvas>
                    <div className="home-map__hint">Di chuột để xoay • Cuộn để thu phóng • Kéo để quan sát</div>
                </div>
            </div>
        </section>
    );
};

export default VenueMapSection;
