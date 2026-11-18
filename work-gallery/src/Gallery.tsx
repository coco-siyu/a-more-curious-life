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

function stoneFloorTexture(length: number) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Texture();

  context.fillStyle = "#d9d1c5";
  context.fillRect(0, 0, 1024, 1024);

  for (let index = 0; index < 12000; index += 1) {
    const tone = 188 + Math.random() * 48;
    context.fillStyle = `rgba(${tone},${tone - 5},${tone - 11},${Math.random() * 0.18})`;
    const size = Math.random() * 3 + 0.5;
    context.fillRect(Math.random() * 1024, Math.random() * 1024, size, size);
  }

  for (let index = 0; index < 16; index += 1) {
    const startY = Math.random() * 1024;
    context.beginPath();
    context.moveTo(-40, startY);
    context.bezierCurveTo(
      260,
      startY + (Math.random() - 0.5) * 110,
      710,
      startY + (Math.random() - 0.5) * 140,
      1064,
      startY + (Math.random() - 0.5) * 90,
    );
    context.strokeStyle = `rgba(112,95,77,${0.035 + Math.random() * 0.055})`;
    context.lineWidth = Math.random() * 2 + 0.5;
    context.stroke();
  }

  context.strokeStyle = "rgba(94,78,62,0.12)";
  context.lineWidth = 2;
  for (let position = 0; position <= 1024; position += 256) {
    context.beginPath();
    context.moveTo(position, 0);
    context.lineTo(position, 1024);
    context.stroke();
    context.beginPath();
    context.moveTo(0, position);
    context.lineTo(1024, position);
    context.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, Math.max(3, length / 12));
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

const WALL_ART = [
  { canvas: "#3e4944", accent: "#b18b55", width: 1.15, height: 1.55 },
  { canvas: "#6e5547", accent: "#d2b889", width: 0.95, height: 1.35 },
  { canvas: "#596267", accent: "#c3a477", width: 1.3, height: 1.05 },
  { canvas: "#2f2b28", accent: "#8d7352", width: 0.9, height: 1.5 },
];

function FramedWork({ side, z, index }: { side: number; z: number; index: number }) {
  const art = WALL_ART[index % WALL_ART.length];
  const inside = -side * 0.075;

  return (
    <group position={[side * 5.9, 3.05, z]}>
      <mesh castShadow>
        <boxGeometry args={[0.11, art.height + 0.18, art.width + 0.18]} />
        <meshStandardMaterial color="#846a48" roughness={0.46} metalness={0.28} />
      </mesh>
      <mesh position={[inside, 0, 0]}>
        <boxGeometry args={[0.035, art.height, art.width]} />
        <meshStandardMaterial color={art.canvas} roughness={0.92} />
      </mesh>
      <mesh position={[inside - side * 0.025, 0.12, -art.width * 0.13]}>
        <boxGeometry args={[0.025, art.height * 0.52, art.width * 0.3]} />
        <meshStandardMaterial color={art.accent} roughness={0.75} />
      </mesh>
      <mesh position={[inside, -art.height / 2 - 0.24, 0]}>
        <boxGeometry args={[0.025, 0.12, 0.38]} />
        <meshStandardMaterial color="#d5cdc0" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Archway({ z, index }: { z: number; index: number }) {
  const stone = index % 2 === 0 ? "#bdae9c" : "#c6b8a7";

  return (
    <group position={[0, 0, z]}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 5.48, 0, 0]}>
          <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.42, 2.1, 0.58]} />
            <meshStandardMaterial color={stone} roughness={0.92} />
          </mesh>
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.64, 0.2, 0.76]} />
            <meshStandardMaterial color="#a99984" roughness={0.9} />
          </mesh>
          <mesh position={[0, 2.08, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.2, 0.76]} />
            <meshStandardMaterial color="#a99984" roughness={0.9} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 2.05, 0]} scale={[1, 0.62, 1]} castShadow receiveShadow>
        <torusGeometry args={[5.48, 0.22, 12, 72, Math.PI]} />
        <meshStandardMaterial color={stone} roughness={0.94} />
      </mesh>
      <mesh position={[0, 5.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[11.25, 0.24, 0.5]} />
        <meshStandardMaterial color="#b7a894" roughness={0.9} />
      </mesh>
    </group>
  );
}

type CollectionVariant = "bust" | "vessel" | "figure";

function CollectionPiece({
  position,
  variant,
  rotation = 0,
}: {
  position: [number, number, number];
  variant: CollectionVariant;
  rotation?: number;
}) {
  const stone = variant === "vessel" ? "#aa8f72" : "#c8bcae";

  return (
    <group position={position} rotation-y={rotation} scale={0.82}>
      <mesh position={[0, 0.34, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.86, 0.68, 0.86]} />
        <meshStandardMaterial color="#aa9b89" roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.98, 0.08, 0.98]} />
        <meshStandardMaterial color="#c2b5a5" roughness={0.9} />
      </mesh>

      {variant === "bust" && (
        <group>
          <mesh position={[0, 1.16, 0]} scale={[1.05, 0.65, 0.58]} castShadow>
            <sphereGeometry args={[0.48, 24, 18]} />
            <meshStandardMaterial color={stone} roughness={0.82} />
          </mesh>
          <mesh position={[0, 1.55, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.16, 0.28, 18]} />
            <meshStandardMaterial color={stone} roughness={0.82} />
          </mesh>
          <mesh position={[0, 1.82, 0]} scale={[0.8, 1, 0.78]} castShadow>
            <sphereGeometry args={[0.3, 24, 18]} />
            <meshStandardMaterial color={stone} roughness={0.8} />
          </mesh>
        </group>
      )}

      {variant === "vessel" && (
        <group>
          <mesh position={[0, 1.15, 0]} scale={[0.82, 1.05, 0.82]} castShadow>
            <sphereGeometry args={[0.42, 28, 20]} />
            <meshStandardMaterial color={stone} roughness={0.72} metalness={0.08} />
          </mesh>
          <mesh position={[0, 1.58, 0]} castShadow>
            <cylinderGeometry args={[0.19, 0.28, 0.42, 24]} />
            <meshStandardMaterial color={stone} roughness={0.72} metalness={0.08} />
          </mesh>
          <mesh position={[0, 1.8, 0]} rotation-x={Math.PI / 2} castShadow>
            <torusGeometry args={[0.21, 0.045, 12, 36]} />
            <meshStandardMaterial color="#826b52" roughness={0.68} />
          </mesh>
        </group>
      )}

      {variant === "figure" && (
        <group>
          {[-0.13, 0.13].map((x) => (
            <mesh key={x} position={[x, 1.12, 0]} castShadow>
              <cylinderGeometry args={[0.09, 0.12, 0.72, 14]} />
              <meshStandardMaterial color={stone} roughness={0.84} />
            </mesh>
          ))}
          <mesh position={[0, 1.65, 0]} scale={[0.78, 1.15, 0.52]} castShadow>
            <capsuleGeometry args={[0.25, 0.58, 8, 18]} />
            <meshStandardMaterial color={stone} roughness={0.84} />
          </mesh>
          {[-1, 1].map((side) => (
            <mesh
              key={side}
              position={[side * 0.32, 1.64, 0]}
              rotation-z={side * -0.2}
              castShadow
            >
              <capsuleGeometry args={[0.07, 0.56, 6, 12]} />
              <meshStandardMaterial color={stone} roughness={0.84} />
            </mesh>
          ))}
          <mesh position={[0, 2.18, 0]} scale={[0.82, 1, 0.8]} castShadow>
            <sphereGeometry args={[0.24, 20, 16]} />
            <meshStandardMaterial color={stone} roughness={0.82} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function MuseumBench({ x, z, rotation = 0 }: { x: number; z: number; rotation?: number }) {
  return (
    <group position={[x, 0, z]} rotation-y={rotation}>
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.16, 0.58]} />
        <meshStandardMaterial color="#59483a" roughness={0.68} />
      </mesh>
      {[-0.75, 0.75].map((leg) => (
        <mesh key={leg} position={[leg, 0.23, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.16, 0.46, 0.44]} />
          <meshStandardMaterial color="#8d7b68" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function EndPortal({ z }: { z: number }) {
  return (
    <group position={[0, 0, z + 0.03]}>
      <mesh position={[0, 1.45, 0]}>
        <planeGeometry args={[3.2, 2.9]} />
        <meshBasicMaterial color="#3a342e" />
      </mesh>
      <mesh position={[0, 2.9, 0]}>
        <circleGeometry args={[1.6, 48, 0, Math.PI]} />
        <meshBasicMaterial color="#3a342e" />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 1.67, 1.45, 0.03]} castShadow>
          <boxGeometry args={[0.24, 2.9, 0.25]} />
          <meshStandardMaterial color="#9f8d78" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 2.9, 0.03]} castShadow>
        <torusGeometry args={[1.67, 0.13, 12, 64, Math.PI]} />
        <meshStandardMaterial color="#9f8d78" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Hall() {
  const length = EXHIBITS.length * SPACING + 16;
  const floor = useMemo(() => stoneFloorTexture(length), [length]);
  const wall = useMemo(() => concreteTexture(246, 6, 2), []);
  const centerZ = -length / 2 + 8;
  const archCount = Math.ceil(EXHIBITS.length / 2);

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, centerZ]} receiveShadow>
        <planeGeometry args={[14, length]} />
        <meshStandardMaterial
          map={floor}
          roughness={0.32}
          metalness={0.025}
          envMapIntensity={1.05}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            position={[side * 6, 3, centerZ]}
            rotation-y={-side * Math.PI / 2}
            receiveShadow
          >
            <planeGeometry args={[length, 6]} />
            <meshStandardMaterial map={wall} color="#d8cdbf" roughness={0.97} />
          </mesh>
          <mesh position={[side * 5.86, 0.62, centerZ]} receiveShadow>
            <boxGeometry args={[0.24, 1.24, length]} />
            <meshStandardMaterial color="#b5a590" roughness={0.92} />
          </mesh>
          <mesh position={[side * 5.72, 1.26, centerZ]} receiveShadow>
            <boxGeometry args={[0.08, 0.1, length]} />
            <meshStandardMaterial color="#8f7e69" roughness={0.86} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 6, centerZ]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[14, length]} />
        <meshStandardMaterial map={wall} color="#e7dfd3" />
      </mesh>
      <mesh position={[0, 3, centerZ - length / 2]}>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial map={wall} color="#cfc2b2" />
      </mesh>
      {[-2.75, 2.75].map((x) => (
        <mesh key={x} position={[x, 0.008, centerZ]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[0.045, length]} />
          <meshBasicMaterial color="#8e7b64" transparent opacity={0.42} />
        </mesh>
      ))}
      {Array.from({ length: archCount }).map((_, index) => (
        <Archway key={`arch-${index}`} index={index} z={-4.5 - index * SPACING * 2} />
      ))}
      {EXHIBITS.map((exhibit, index) => (
        <FramedWork
          key={`frame-${exhibit.id}`}
          side={index % 2 === 0 ? 1 : -1}
          z={-index * SPACING - (index % 2 === 0 ? 0.7 : -0.7)}
          index={index}
        />
      ))}
      <MuseumBench x={0} z={-13.5} />
      <MuseumBench x={0.5} z={-49.5} rotation={Math.PI / 2} />
      <CollectionPiece position={[1.65, 0, -22.5]} variant="bust" rotation={-0.35} />
      <CollectionPiece position={[-1.6, 0, -40.5]} variant="vessel" rotation={0.45} />
      <CollectionPiece position={[1.45, 0, -58.5]} variant="figure" rotation={-0.25} />
      <CollectionPiece position={[-1.35, 0, -72]} variant="bust" rotation={0.3} />
      <EndPortal z={centerZ - length / 2} />
      {Array.from({ length: Math.floor(length / 6) }).map((_, index) => (
        <group key={index}>
          <mesh
            position={[index % 2 === 0 ? -1.35 : 1.35, 5.98, 5 - index * 6]}
            rotation-x={Math.PI / 2}
          >
            <planeGeometry args={[2.25 + (index % 3) * 0.35, 0.15]} />
            <meshBasicMaterial color={index % 2 === 0 ? "#fff0d4" : "#f4e9dc"} />
          </mesh>
          <mesh position={[index % 2 === 0 ? -1.35 : 1.35, 5.96, 5 - index * 6]}>
            <boxGeometry args={[2.5 + (index % 3) * 0.35, 0.03, 0.25]} />
            <meshStandardMaterial color="#d8cdbf" />
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
        <color attach="background" args={["#ded4c7"]} />
        <fog attach="fog" args={["#ded4c7", 18, 54]} />
        <ambientLight intensity={0.4} color="#f7e3ca" />
        <hemisphereLight args={["#fff0d9", "#a8967f", 0.95]} />
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
