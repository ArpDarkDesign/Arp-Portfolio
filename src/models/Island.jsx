import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import islandScene from "../imp/3d/island.glb";
import { a } from "@react-spring/three";

const Island = (props) => {
  const islandRef = useRef();

  const { nodes, materials } = useGLTF(islandScene);

  useFrame((state, delta) => {
    if (islandRef.current && !props.paused) {
      // <-- Ensure this condition exists
      islandRef.current.rotation.y += 0.2 * delta;
    }
  });

  return (
    <a.group ref={islandRef} {...props}>
      {/* Enhance the main island body */}
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      >
        <meshStandardMaterial attach="material" color="green" />
      </mesh>

      {/* Enhance trees */}
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      >
        <meshStandardMaterial attach="material" color="darkgreen" />
      </mesh>

      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      >
        <meshStandardMaterial attach="material" color="darkgreen" />
      </mesh>

      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      >
        <meshStandardMaterial attach="material" color="darkgreen" />
      </mesh>

      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      >
        <meshStandardMaterial attach="material" color="green" />
      </mesh>

      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      >
        <meshStandardMaterial attach="material" color="green" />
      </mesh>

      {/* Enhance rocks */}
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      ></mesh>
    </a.group>
  );
};

export default Island;
