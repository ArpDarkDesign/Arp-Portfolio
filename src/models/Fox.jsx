import React, { useEffect, useRef } from "react";
import scene from "../imp/3d/fox.glb";

import { useGLTF, useAnimations } from "@react-three/drei";

const Fox = ({ currentAnimation, ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene); // Update with the correct path
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => {
      action.stop();
    });
    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  useEffect(() => {
    if (materials.PaletteMaterial001) {
      const material = materials.PaletteMaterial001;
      material.emissiveIntensity = 0.5;
      material.emissive.setRGB(1, 0, 0); // Reddish glow
      material.metalness = 0.8;
      material.roughness = 0.2;
    }
  }, [materials.PaletteMaterial001]);

  useEffect(() => {
    // Add more cool effects here
    if (materials.PaletteMaterial002) {
      const material2 = materials.PaletteMaterial002;
      material2.emissiveIntensity = 0.3;
      material2.emissive.setRGB(0, 1, 0); // Greenish glow
      material2.metalness = 0.7;
      material2.roughness = 0.1;
    }

    if (materials.PaletteMaterial003) {
      const material3 = materials.PaletteMaterial003;
      material3.emissiveIntensity = 0.4;
      material3.emissive.setRGB(0, 0, 1); // Bluish glow
      material3.metalness = 0.6;
      material3.roughness = 0.3;
    }
  }, [materials.PaletteMaterial002, materials.PaletteMaterial003]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        //{" "}
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          name="Object_10"
          geometry={nodes.Object_10.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  );
};

export default Fox;
