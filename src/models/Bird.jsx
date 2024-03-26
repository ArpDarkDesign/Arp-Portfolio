import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

import birdScene from "../imp/3d/bird.glb";

export function Bird() {
  const birdRef = useRef();

  const { scene, animations } = useGLTF(birdScene);

  const { actions } = useAnimations(animations, birdRef);

  // Play the "Take 001" animation when the component mounts
  useEffect(() => {
    actions["Take 001"].play();
  }, [actions]);

  useFrame(({ clock, camera }) => {
    // If the bird is below the camera's y-position, start updating its position
    if (birdRef.current.position.y < 0) {
      birdRef.current.position.y += 0.03; // Faster initial rise
      return;
    }

    birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.5 + 2; // Faster oscillation

    if (birdRef.current.position.x > camera.position.x + 10) {
      birdRef.current.rotation.y = Math.PI;
    } else if (birdRef.current.position.x < camera.position.x - 10) {
      birdRef.current.rotation.y = 0;
    }

    if (birdRef.current.rotation.y === 0) {
      birdRef.current.position.x += 0.01; // Faster movement
      birdRef.current.position.z -= 0.01; // Faster movement
    } else {
      birdRef.current.position.x -= 0.01; // Faster movement
      birdRef.current.position.z += 0.01; // Faster movement
    }
  });

  return (
    <mesh ref={birdRef} position={[0, -10, 0]} scale={[0.003, 0.003, 0.003]}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Bird;
