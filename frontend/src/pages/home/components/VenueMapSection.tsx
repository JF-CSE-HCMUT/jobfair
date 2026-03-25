import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, Environment, Html, OrbitControls, useGLTF } from "@react-three/drei";
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
    const hoverBlend = useRef(0);
    const pointerY = useRef(0);
    const pointerZ = useRef(0);

    useEffect(() => {
        if (!groupRef.current || !(camera instanceof THREE.PerspectiveCamera)) {
            return;
        }

        const box = new THREE.Box3().setFromObject(groupRef.current);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        const sphere = box.getBoundingSphere(new THREE.Sphere());

        if (!Number.isFinite(sphere.radius) || sphere.radius <= 0 || !Number.isFinite(size.length())) {
            return;
        }

        const fov = THREE.MathUtils.degToRad(camera.fov);
        const fitDistance = sphere.radius / Math.tan(fov / 2);
        const forwardDistance = Math.max(size.z * 0.95, fitDistance * 1.05);
        const eyeY = center.y;
        const targetY = center.y - 2;

        camera.position.set(center.x, eyeY, center.z + forwardDistance);
        camera.lookAt(center.x, targetY, center.z);

        onFitCamera({
            position: camera.position.clone(),
            target: new THREE.Vector3(center.x, targetY, center.z),
        });
    }, [camera, onFitCamera, scene]);

    useFrame((state, delta) => {
        if (!groupRef.current) {
            return;
        }

        hoverBlend.current = THREE.MathUtils.damp(hoverBlend.current, isHovered ? 1 : 0, 7, delta);

        const nextPointerY = isHovered ? THREE.MathUtils.clamp(state.pointer.x * 0.16, -0.16, 0.16) : 0;
        const nextPointerZ = isHovered ? THREE.MathUtils.clamp(-state.pointer.y * 0.16, -0.16, 0.16) : 0;

        pointerY.current = THREE.MathUtils.damp(pointerY.current, nextPointerY, 9, delta);
        pointerZ.current = THREE.MathUtils.damp(pointerZ.current, nextPointerZ, 9, delta);

        const desiredY = pointerY.current * hoverBlend.current;
        const desiredZ = pointerZ.current * hoverBlend.current;

        targetY.current = THREE.MathUtils.damp(targetY.current, desiredY, 11, delta);
        targetZ.current = THREE.MathUtils.damp(targetZ.current, desiredZ, 11, delta);

        groupRef.current.rotation.x = THREE.MathUtils.degToRad(45);
        groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY.current, 12, delta);
        groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetZ.current, 12, delta);
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
                            <Environment preset="city" />
                        </Suspense>

                        <OrbitControls
                            ref={controlsRef}
                            enablePan={false}
                            minPolarAngle={THREE.MathUtils.degToRad(80)}
                            maxPolarAngle={THREE.MathUtils.degToRad(85)}
                            minDistance={1.5}
                            maxDistance={22}
                            makeDefault
                        />
                    </Canvas>
                    <div className="home-map__hint">Di chuột để xoay - Cuộn để thu phóng - Kéo để quan sát</div>
                </div>
            </div>
        </section>
    );
};

export default VenueMapSection;
