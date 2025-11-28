import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

const Cube = ({ position, rotationSpeed, floatSpeed, floatOffset, scale }) => {
    const meshRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Rotation
        meshRef.current.rotation.x += rotationSpeed.x;
        meshRef.current.rotation.y += rotationSpeed.y;
        meshRef.current.rotation.z += rotationSpeed.z;

        // Floating (vertical oscillation)
        meshRef.current.position.y = position[1] + Math.sin(t * floatSpeed + floatOffset) * 0.5;
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial transparent opacity={0} />
            <Edges
                scale={1}
                threshold={15} // Display edges only when the angle between faces exceeds this value (in degrees)
                color="#e0e0e0"
                opacity={0.4}
                transparent
            />
        </mesh>
    );
};

const FloatingCubes = () => {
    const cubeCount = 20;

    const cubes = useMemo(() => {
        return new Array(cubeCount).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 15, // x: -7.5 to 7.5
                (Math.random() - 0.5) * 10, // y: -5 to 5
                (Math.random() - 0.5) * 10 - 5 // z: -10 to 0
            ],
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.005,
                y: (Math.random() - 0.5) * 0.005,
                z: (Math.random() - 0.5) * 0.005
            },
            floatSpeed: 0.5 + Math.random() * 0.5,
            floatOffset: Math.random() * Math.PI * 2,
            scale: 0.5 + Math.random() * 1.5
        }));
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none', // Disable interactions
            background: 'linear-gradient(to bottom, #1a1a1a, #000000)' // Dark background to make white lines pop
        }}>
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                {cubes.map((cube, i) => (
                    <Cube key={i} {...cube} />
                ))}
            </Canvas>
        </div>
    );
};

export default FloatingCubes;
