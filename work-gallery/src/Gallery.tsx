import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  Text,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { EXHIBITS, exhibitPos, SPACING, type Exhibit } from "./exhibits";

function concreteTexture(base: number, repeat: number, noise = 40) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Texture();

  context.fillStyle = `rgb(${base},${base},${base - 4})`;
  context.fillRect(0, 0, 512, 512);

  for (let index = 0; index < 9000; index += 1) {
    const value = base + (Math.random() - 0.5) * noise;
    context.fillStyle = `rgba(${value},${value},${value - 3},${Math.random() * 0.5})`;
    const size = Math.random() * 3;
    context.fillRect(Math.random() * 512, Math.random() * 512, size, size);
  }

  for (let index = 0; index < (noise > 10 ? 25 : 0); index += 1) {
    context.fillStyle = "rgba(40,40,40,0.35)";
    context.beginPath();
    context.arc(
      Math.random() * 512,
      Math.random() * 512,
      Math.random() * 2 + 1,
      0,
      7,
    );
    context.fill();
  }

  context.strokeStyle = "rgba(0,0,0,0.05)";
  context.lineWidth = 2;
  context.strokeRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat, repeat);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Sculpture({ form, active }: { form: Exhibit["form"]; active: boolean }) {
  const sculpture = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (sculpture.current) {
      sculpture.current.rotation.y +=
        Math.min(delta, 0.05) * (active ? 0.5 : 0.15);
    }
  });

  const metal = (
    <meshStandardMaterial color="#c9b48a" metalness={0.9} roughness={0.25} />
  );
  const rust = (
    <meshStandardMaterial color="#1f1f1f" metalness={0.2} roughness={0.6} />
  );

  return (
    <group ref={sculpture} position={[0, 1.6, 0]}>
      {form === "monolith" && (
        <mesh castShadow>
          <boxGeometry args={[0.45, 1.3, 0.2]} />
          {rust}
        </mesh>
      )}
      {form === "torus" && (
        <mesh castShadow>
          <torusKnotGeometry args={[0.32, 0.1, 160, 24]} />
          {metal}
        </mesh>
      )}
      {form === "sphere" && (
        <mesh castShadow>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="#d8d3c8" roughness={0.4} flatShading />
        </mesh>
      )}
      {form === "ring" && (
        <mesh castShadow rotation-x={0.4}>
          <torusGeometry args={[0.45, 0.07, 16, 64]} />
          {rust}
        </mesh>
      )}
      {form === "lattice" &&
        Array.from({ length: 9 }).map((_, index) => (
          <mesh
            key={index}
            castShadow
            position={[
              ((index % 3) - 1) * 0.3,
              Math.floor(index / 3) * 0.3 - 0.3,
              0,
            ]}
          >
            <boxGeometry args={[0.18, 0.18, 0.18]} />
            {index % 2 ? metal : rust}
          </mesh>
        ))}
      {form === "stair" &&
        Array.from({ length: 5 }).map((_, index) => (
          <mesh
            key={index}
            castShadow
            position={[0, index * 0.18 - 0.4, -index * 0.12 + 0.24]}
          >
            <boxGeometry args={[0.6, 0.18, 0.24]} />
            <meshStandardMaterial color="#e9e5de" roughness={0.5} />
          </mesh>
        ))}
    </group>
  );
}

function Spot({ active }: { active: boolean }) {
  const light = useRef<THREE.SpotLight>(null);
  const target = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (light.current && target.current) light.current.target = target.current;
  }, []);

  return (
    <>
      <object3D ref={target} position={[0, 1, 0]} />
      <spotLight
        ref={light}
        position={[0, 5.5, 0.8]}
        angle={0.42}
        penumbra={0.6}
        intensity={active ? 70 : 35}
        decay={1.5}
        color="#ffe9c9"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.00015}
        shadow-normalBias={0.015}
        shadow-radius={3}
        shadow-camera-near={0.5}
        shadow-camera-far={9}
      />
    </>
  );
}

type PlinthProps = {
  exhibit: Exhibit;
  index: number;
  active: boolean;
  onSelect: (index: number) => void;
  texture: THREE.Texture;
};

function Plinth({ exhibit, index, active, onSelect, texture }: PlinthProps) {
  const [x, , z] = exhibitPos(index);
  const side = x < 0 ? 1 : -1;
  const select = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    onSelect(index);
  };

  return (
    <group position={[x, 0, z]}>
      <ContactShadows
        position={[0, 0.012, 0]}
        scale={4}
        far={2.7}
        opacity={0.38}
        blur={2.4}
        resolution={256}
        frames={1}
      />
      <mesh
        castShadow
        receiveShadow
        position={[0, 0.5, 0]}
        onClick={select}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "";
        }}
      >
        <boxGeometry args={[1.3, 1, 1.3]} />
        <meshStandardMaterial map={texture} color="#ffffff" roughness={0.7} />
      </mesh>
      <group onClick={select}>
        <Sculpture form={exhibit.form} active={active} />
      </group>
      <Spot active={active} />
      <Text
        position={[side * 0.66, 0.75, 0]}
        rotation-y={side * Math.PI / 2}
        fontSize={0.09}
        color="#8a847a"
        anchorX="center"
        letterSpacing={0.1}
      >
        {exhibit.label.toUpperCase()}
      </Text>
      <Text
        position={[-side * 2.35, 3.6, 0]}
        rotation-y={side * Math.PI / 2}
        fontSize={0.7}
        color="#c9c3b8"
        anchorX="center"
      >
        {exhibit.id}
      </Text>
    </group>
  );
}

function Hall() {
  const length = EXHIBITS.length * SPACING + 16;
  const floor = useMemo(() => concreteTexture(228, 10, 8), []);
  const wall = useMemo(() => concreteTexture(246, 6, 2), []);
  const centerZ = -length / 2 + 8;

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, centerZ]} receiveShadow>
        <planeGeometry args={[14, length]} />
        <meshStandardMaterial
          map={floor}
          roughness={0.18}
          metalness={0.05}
          envMapIntensity={1.2}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 6, 3, centerZ]}
          rotation-y={-side * Math.PI / 2}
          receiveShadow
        >
          <planeGeometry args={[length, 6]} />
          <meshStandardMaterial map={wall} roughness={0.95} />
        </mesh>
      ))}
      <mesh position={[0, 6, centerZ]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[14, length]} />
        <meshStandardMaterial map={wall} color="#ffffff" />
      </mesh>
      <mesh position={[0, 3, centerZ - length / 2]}>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial map={wall} />
      </mesh>
      {Array.from({ length: Math.floor(length / 4) }).map((_, index) => (
        <group key={index}>
          <mesh position={[0, 5.98, 6 - index * 4]} rotation-x={Math.PI / 2}>
            <planeGeometry args={[3, 0.12]} />
            <meshBasicMaterial color="#fff6e6" />
          </mesh>
          <mesh position={[0, 5.96, 6 - index * 4]}>
            <boxGeometry args={[3.2, 0.03, 0.22]} />
            <meshStandardMaterial color="#e8e4dc" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Rig({ index, focused }: { index: number; focused: boolean }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 1.5, -10));

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const [x, , z] = exhibitPos(index);
    const position = focused
      ? new THREE.Vector3(x * 0.25, 1.75, z + 2.4)
      : new THREE.Vector3(x * -0.15, 2.3, z + 6.5);
    const target = focused
      ? new THREE.Vector3(x, 1.55, z)
      : new THREE.Vector3(x * 0.55, 1.3, z - 1);
    const smoothing = 1 - Math.exp(-2.2 * dt);

    camera.position.lerp(position, smoothing);
    look.current.lerp(target, smoothing);
    camera.lookAt(look.current);
  });

  return null;
}

type GalleryProps = {
  index: number;
  focused: boolean;
  onSelect: (index: number) => void;
};

export default function Gallery({ index, focused, onSelect }: GalleryProps) {
  const plinthTexture = useMemo(() => concreteTexture(250, 1, 2), []);

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 1.75]}
        camera={{ fov: 50, position: [0, 2.3, 9] }}
        gl={{ toneMapping: THREE.AgXToneMapping }}
      >
        <color attach="background" args={["#f3f0ea"]} />
        <fog attach="fog" args={["#f3f0ea", 14, 42]} />
        <ambientLight intensity={0.6} color="#fff4e6" />
        <hemisphereLight args={["#fff6ea", "#e6dfd2", 1.1]} />
        <Environment resolution={64}>
          <Lightformer
            intensity={0.8}
            position={[0, 5, 0]}
            rotation-x={Math.PI / 2}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={0.6}
            color="#d9c9b0"
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[20, 1, 1]}
          />
        </Environment>
        <Hall />
        {EXHIBITS.map((exhibit, exhibitIndex) => (
          <Plinth
            key={exhibit.id}
            exhibit={exhibit}
            index={exhibitIndex}
            active={exhibitIndex === index}
            onSelect={onSelect}
            texture={plinthTexture}
          />
        ))}
        <Rig index={index} focused={focused} />
      </Canvas>
    </div>
  );
}
