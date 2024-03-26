// import React from "react";
// import PlaneScene from "../imp/3d/plane.glb";
// import { useGLTF } from "@react-three/drei";
// const Plane = () => {
//   const { scene, animations } = useGLTF(PlaneScene);

//   return (
//     <mesh>
//       <primitive object={scene} />
//     </mesh>
//   );
// };

// export default Plane;










// import React, { useRef } from "react";
// import { useSpring, animated } from "@react-spring/three";
// import PlaneScene from "../imp/3d/plane.glb";
// import { useGLTF } from "@react-three/drei";

// const Plane = () => {
//   const { scene } = useGLTF(PlaneScene);
//   const planeRef = useRef();

//   // Define spring animation
//   const props = useSpring({
//     from: { position: [-3, 6, 10], rotation: [-100, -70, -100] },
//     to: { position: [10, -15, 17], rotation: [-10, Math.PI * 5, 36] },
//     config: {
//       duration: Math.random() * 4000 + 1000, // Random duration between 1 to 5 seconds
//     },
//     onFrame: ({ position, rotation }) => {
//       if (planeRef.current) {
//         // Update position with random speed
//         const dx = (position[0] - planeRef.current.position.x) * 0.1;
//         const dy = (position[1] - planeRef.current.position.y) * 0.1;
//         const dz = (position[2] - planeRef.current.position.z) * 0.1;
//         planeRef.current.position.add(dx, dy, dz);
        
//         // Update rotation for continuous rapid spinning around Y-axis
//         const angle = rotation[1] + 0.2; // Increase rotation speed (adjust as needed)
//         planeRef.current.rotation.set(0, angle, 0);
//       }
//     },
//   });

//   return (
//     <animated.mesh ref={planeRef} {...props}>
//       <primitive object={scene} />
//     </animated.mesh>
//   );
// };

// export default Plane;












import React, { useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import PlaneScene from "../imp/3d/plane.glb";
import { useGLTF } from "@react-three/drei";

const Plane = () => {
  const { scene } = useGLTF(PlaneScene);
  const planeRef = useRef();

  // Define spring animation for flying motion
  const props = useSpring({
    from: { position: [10, 0, 0], rotation: [0, Math.PI / 2, 0] },
    to: async (next, cancel) => {
      // Simulate flying motion by changing position and rotation along the x axis
      await next({ position: [5, 0, 0], rotation: [0, Math.PI / 2, 10] });
      await next({ position: [0, 0, 0], rotation: [0, Math.PI / 2, 20] });
      await next({ position: [-5, 0, 0], rotation: [0, Math.PI / 2, 30] });
      await next({ position: [-10, 0, 0], rotation: [0, Math.PI / 2, 40] });
    },
    config: {
      duration: 3000,
    },
    onFrame: ({ position, rotation }) => {
      if (planeRef.current) {
        planeRef.current.position.set(position[0], position[1], position[2]);
        planeRef.current.rotation.set(rotation[0], rotation[1], rotation[2]);
      }
    },
  });

  return (
    <animated.mesh ref={planeRef} {...props}>
      <primitive object={scene} />
    </animated.mesh>
  );
};

export default Plane;
