import * as THREE from 'three'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, RoundedBox, Float, useGLTF, OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a as three } from '@react-spring/three'

// ─── Palette ───
const EDU_BLUE = '#324e7aff'
const EDU_GREEN = '#630c63ff'
const EDU_AMBER = '#a30882ff'
const EDU_PINK = '#a30a7dff'
const EDU_VIOLET = '#8b5cf6'
const EDU_CYAN = '#06b6d4'

// ─── Materials ───
const ALU_PROPS = { color: '#b8b8bc', metalness: 0.92, roughness: 0.08, clearcoat: 0.6, clearcoatRoughness: 0.04, envMapIntensity: 1.5 }
const DARK_PROPS = { color: '#0a0a0a', roughness: 0.85, metalness: 0.1 }
const KEY_PROPS = { color: '#1a1a1e', roughness: 0.5, metalness: 0.05 }

// ═══════════════════════════════════════
//  FLOATING 3D ICONS
// ═══════════════════════════════════════

function SpeechBubble3D({ position, scale = 1, color }: { position: [number, number, number]; scale?: number; color?: string }) {
    const { scene } = useGLTF('/speech-bubble.glb')
    const ref = useRef<THREE.Group>(null!)
    const clonedScene = useMemo(() => {
        const clone = scene.clone(true)
        if (color) {
            clone.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    ; (child as THREE.Mesh).material = new THREE.MeshPhysicalMaterial({
                        color,
                        roughness: 0.12,
                        metalness: 0.05,
                        clearcoat: 1,
                        clearcoatRoughness: 0.06,
                        envMapIntensity: 1.5,
                    })
                }
            })
        }
        return clone
    }, [scene, color])

    useFrame((s) => {
        ref.current.rotation.y = Math.sin(s.clock.getElapsedTime() * 0.5) * 0.2
        ref.current.rotation.x = Math.cos(s.clock.getElapsedTime() * 0.3) * 0.1
    })

    return (
        <group ref={ref} position={position} scale={scale}>
            <primitive object={clonedScene} />
        </group>
    )
}

function StarIcon({ position, color = EDU_PINK, scale = 1 }: { position: [number, number, number]; color?: string; scale?: number }) {
    const ref = useRef<THREE.Group>(null!)
    useFrame((s) => { ref.current.rotation.y = s.clock.getElapsedTime() * 0.3 })
    const starShape = useMemo(() => {
        const shape = new THREE.Shape()
        for (let i = 0; i < 10; i++) {
            const r = i % 2 === 0 ? 0.55 : 0.22
            const angle = (i * Math.PI) / 5 - Math.PI / 2
            if (i === 0) shape.moveTo(Math.cos(angle) * r, Math.sin(angle) * r)
            else shape.lineTo(Math.cos(angle) * r, Math.sin(angle) * r)
        }
        shape.closePath()
        return shape
    }, [])
    return (
        <group ref={ref} position={position} scale={scale}>
            <mesh>
                <extrudeGeometry args={[starShape, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 8 }]} />
                <meshPhysicalMaterial color={color} roughness={0.1} clearcoat={1} emissive={color} emissiveIntensity={0.1} envMapIntensity={1.5} />
            </mesh>
        </group>
    )
}

function BookIcon({ position, color = EDU_AMBER, scale = 1 }: { position: [number, number, number]; color?: string; scale?: number }) {
    const ref = useRef<THREE.Group>(null!)
    useFrame((s) => { ref.current.rotation.y = Math.sin(s.clock.getElapsedTime() * 0.45 + 3) * 0.15 })
    return (
        <group ref={ref} position={position} scale={scale}>
            <RoundedBox args={[1.0, 1.25, 0.28]} radius={0.06} smoothness={6}>
                <meshPhysicalMaterial color={color} roughness={0.18} clearcoat={0.9} />
            </RoundedBox>
            <RoundedBox args={[0.88, 1.12, 0.2]} radius={0.03} smoothness={4} position={[0.03, 0, 0]}>
                <meshStandardMaterial color="#fefce8" roughness={0.5} />
            </RoundedBox>
            <RoundedBox args={[0.08, 1.25, 0.3]} radius={0.03} smoothness={4} position={[-0.5, 0, 0]}>
                <meshPhysicalMaterial color={color} roughness={0.15} clearcoat={1} />
            </RoundedBox>
        </group>
    )
}

function GradCapIcon({ position, color = EDU_VIOLET, scale = 1 }: { position: [number, number, number]; color?: string; scale?: number }) {
    const ref = useRef<THREE.Group>(null!)
    useFrame((s) => { ref.current.rotation.y = Math.sin(s.clock.getElapsedTime() * 0.35 + 2) * 0.2 })
    const capShape = useMemo(() => {
        const shape = new THREE.Shape()
        shape.moveTo(-0.7, 0); shape.lineTo(0, 0.5); shape.lineTo(0.7, 0); shape.lineTo(0, -0.5); shape.closePath()
        return shape
    }, [])
    return (
        <group ref={ref} position={position} scale={scale}>
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
                <extrudeGeometry args={[capShape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.03, bevelSegments: 8 }]} />
                <meshPhysicalMaterial color={color} roughness={0.12} clearcoat={1} />
            </mesh>
            <RoundedBox args={[0.75, 0.3, 0.6]} radius={0.06} smoothness={4} position={[0, -0.08, 0]}>
                <meshPhysicalMaterial color={color} roughness={0.15} clearcoat={0.8} />
            </RoundedBox>
        </group>
    )
}

function PencilIcon({ position, color = EDU_CYAN, scale = 1 }: { position: [number, number, number]; color?: string; scale?: number }) {
    const ref = useRef<THREE.Group>(null!)
    useFrame((s) => { ref.current.rotation.z = Math.sin(s.clock.getElapsedTime() * 0.5 + 5) * 0.15 - 0.3 })
    return (
        <group ref={ref} position={position} scale={scale} rotation={[0, 0, -0.3]}>
            <mesh><cylinderGeometry args={[0.1, 0.1, 1.3, 6]} /><meshPhysicalMaterial color={color} roughness={0.12} clearcoat={1} /></mesh>
            <mesh position={[0, -0.75, 0]}><coneGeometry args={[0.1, 0.25, 6]} /><meshPhysicalMaterial color="#f5d0a9" roughness={0.3} /></mesh>
            <mesh position={[0, -0.9, 0]}><coneGeometry args={[0.03, 0.08, 8]} /><meshStandardMaterial color="#374151" metalness={0.3} /></mesh>
            <mesh position={[0, 0.72, 0]}><cylinderGeometry args={[0.1, 0.1, 0.12, 8]} /><meshPhysicalMaterial color="#f472b6" roughness={0.3} /></mesh>
        </group>
    )
}

// ─── Floating icons ───
function FloatingIcons() {
    const ref = useRef<THREE.Group>(null!)
    useFrame((s) => { ref.current.rotation.y = s.clock.getElapsedTime() * 0.05 })
    return (
        <group ref={ref}>
            <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.8}>
                <SpeechBubble3D position={[-9, 3, 2]} scale={2.2} color={EDU_BLUE} />
            </Float>
            <Float speed={1.9} rotationIntensity={0.12} floatIntensity={0.7}>
                <SpeechBubble3D position={[9, -3, 3]} scale={1.6} color={EDU_CYAN} />
            </Float>
            <Float speed={1.5} rotationIntensity={0.18} floatIntensity={0.65}>
                <StarIcon position={[4, 5.5, -3]} scale={0.6} />
            </Float>
            <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.6}>
                <GradCapIcon position={[-6, -4, -2]} scale={0.7} />
            </Float>
            <Float speed={2.0} rotationIntensity={0.15} floatIntensity={0.7}>
                <BookIcon position={[8, 2, -2]} scale={0.6} />
            </Float>
            <Float speed={1.7} rotationIntensity={0.14} floatIntensity={0.75}>
                <PencilIcon position={[-4, -5.5, 4]} scale={0.6} />
            </Float>
        </group>
    )
}

// ═══════════════════════════════════════
//  SOLID LAPTOP — Proper 3D Structure
// ═══════════════════════════════════════

function ScreenContent() {
    return (
        <mesh>
            <planeGeometry args={[4.2, 2.75]} />
            <meshBasicMaterial color="#0a0f1a" side={THREE.FrontSide} />
        </mesh>
    )
}

// ── Screen Lid (hinged part) ──
function LaptopLid({ hinge, open }: { hinge: any; open: boolean }) {
    return (
        <three.group rotation-x={hinge} position={[0, 0.12, -1.68]}>
            {/* ── Outer shell (solid aluminum box) ── */}
            <RoundedBox args={[5.3, 3.65, 0.14]} radius={0.06} smoothness={6} position={[0, 1.95, 0]} castShadow>
                <meshPhysicalMaterial {...ALU_PROPS} />
            </RoundedBox>

            {/* ── Inner bezel frame (solid black box recessed into shell) ── */}
            <RoundedBox args={[4.9, 3.3, 0.08]} radius={0.04} smoothness={4} position={[0, 1.95, -0.04]} castShadow>
                <meshStandardMaterial {...DARK_PROPS} />
            </RoundedBox>

            {/* ── Screen display area ── */}
            {open && (
                <group position={[0, 1.95, -0.085]} rotation={[0, Math.PI, 0]}>
                    <ScreenContent />
                </group>
            )}

            {/* ── Camera dot ── */}
            <mesh position={[0, 3.65, -0.072]} rotation={[0, Math.PI, 0]}>
                <circleGeometry args={[0.03, 16]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>
            <mesh position={[0, 3.65, -0.073]} rotation={[0, Math.PI, 0]}>
                <circleGeometry args={[0.012, 12]} />
                <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.6} />
            </mesh>

            {/* ── Logo on back of lid ── */}
            <mesh position={[0, 1.95, 0.072]}>
                <circleGeometry args={[0.45, 48]} />
                <meshPhysicalMaterial
                    color="#d4d4d8" emissive="#a5b4fc" emissiveIntensity={0.3}
                    metalness={0.95} roughness={0.03} clearcoat={1}
                />
            </mesh>
            <mesh position={[0, 1.95, 0.073]}>
                <ringGeometry args={[0.42, 0.5, 48]} />
                <meshPhysicalMaterial color="#c0c0c4" metalness={0.95} roughness={0.04} clearcoat={1} />
            </mesh>
        </three.group>
    )
}

// ── Keyboard Base ──
function LaptopBase({ open }: { open: boolean }) {
    return (
        <group>
            {/* ── Main body — solid aluminum box with real thickness ── */}
            <RoundedBox args={[5.3, 0.22, 3.4]} radius={0.06} smoothness={6} position={[0, 0, 0]} castShadow receiveShadow>
                <meshPhysicalMaterial {...ALU_PROPS} />
            </RoundedBox>

            {/* ── Keyboard area (recessed dark well) ── */}
            {open && (
                <group>
                    {/* Keyboard well — slightly recessed dark surface */}
                    <RoundedBox args={[4.5, 0.015, 1.95]} radius={0.05} smoothness={4} position={[0, 0.115, -0.15]}>
                        <meshStandardMaterial color="#111114" roughness={0.7} />
                    </RoundedBox>

                    {/* Key rows */}
                    {[-0.7, -0.42, -0.14, 0.14, 0.42].map((z, row) => (
                        <group key={row}>
                            {Array.from({ length: row === 4 ? 8 : 12 }).map((_, col) => {
                                const kw = row === 4 && col === 4 ? 1.05 : 0.28
                                const bx = -1.85 + (row === 4 ? 0.3 : 0)
                                const off = row === 4 ? (col < 4 ? col * 0.36 : col === 4 ? 1.44 + 0.52 : 1.96 + (col - 4) * 0.36) : col * 0.36
                                return (
                                    <RoundedBox key={col} args={[kw, 0.025, 0.24]} radius={0.035} smoothness={3}
                                        position={[bx + off, 0.13, z - 0.15]}>
                                        <meshStandardMaterial {...KEY_PROPS} />
                                    </RoundedBox>
                                )
                            })}
                        </group>
                    ))}

                    {/* Trackpad — recessed glass panel */}
                    <RoundedBox args={[1.9, 0.008, 1.1]} radius={0.06} smoothness={6} position={[0, 0.115, 1.1]}>
                        <meshPhysicalMaterial color="#c0c0c4" metalness={0.85} roughness={0.06} clearcoat={0.8} />
                    </RoundedBox>
                </group>
            )}

            {/* ── Hinge cylinder ── */}
            <mesh position={[0, 0.08, -1.68]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.05, 0.05, 5.2, 24]} />
                <meshPhysicalMaterial color="#d1d1d6" metalness={0.92} roughness={0.06} />
            </mesh>

            {/* ── Bottom rubber feet (4 corners) ── */}
            {[[-2.2, -0.12, -1.3], [2.2, -0.12, -1.3], [-2.2, -0.12, 1.3], [2.2, -0.12, 1.3]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.015, 16]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
                </mesh>
            ))}
        </group>
    )
}

// ── Full Laptop Assembly ──
function Laptop({ open, hinge }: { open: boolean; hinge: any }) {
    const group = useRef<THREE.Group>(null!)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
        return () => { document.body.style.cursor = 'auto' }
    }, [hovered])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // Gentle float with subtle idle animation
        group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x,
            open ? Math.cos(t / 10) / 12 + 0.25 : 0.55 + Math.sin(t / 8) * 0.02,
            0.08
        )
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            open ? Math.sin(t / 10) / 8 : Math.sin(t / 12) * 0.06,
            0.08
        )
        group.current.rotation.z = THREE.MathUtils.lerp(
            group.current.rotation.z,
            open ? Math.sin(t / 12) / 14 : Math.cos(t / 10) * 0.02,
            0.08
        )
        group.current.position.y = THREE.MathUtils.lerp(
            group.current.position.y,
            open ? (-1.5 + Math.sin(t * 0.8)) / 3.5 : -0.3 + Math.sin(t / 6) * 0.15,
            0.08
        )
    })

    return (
        <group
            ref={group}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
            onPointerOut={() => setHovered(false)}
            dispose={null}
        >
            <LaptopLid hinge={hinge} open={open} />
            <LaptopBase open={open} />
        </group>
    )
}

// ── Ambient Particles ──
function Particles({ count = 20 }) {
    const mesh = useRef<THREE.InstancedMesh>(null!)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 40, y: (Math.random() - 0.5) * 25, z: -10 - Math.random() * 10,
        speed: 0.1 + Math.random() * 0.3, scale: 0.03 + Math.random() * 0.05,
    })), [count])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        particles.forEach((p, i) => {
            dummy.position.set(p.x + Math.sin(t * p.speed + i) * 0.8, p.y + Math.cos(t * p.speed + i * 0.7) * 0.6, p.z)
            dummy.scale.setScalar(p.scale); dummy.updateMatrix(); mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.08} />
        </instancedMesh>
    )
}

// ═══════════════════════════════════════
//  MAIN SCENE
// ═══════════════════════════════════════

export default function MacbookScene() {
    const [open, setOpen] = useState(true)
    const props = useSpring({ open: Number(open) })

    return (
        <div className="w-full h-full relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #5b0974ff 0%, #0a0f1a 40%, #260635ff 100%)' }}>
            {/* FlowUp branding */}
            <div className="absolute top-8 left-8 z-10 pointer-events-none select-none">
                <h1 className="text-3xl font-bold tracking-tight">
                    <span className="text-white">Studie</span>
                    <span style={{ color: '#a627f0ff' }}>Up</span>
                </h1>
            </div>

            {/* Subtle glows */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-[700px] h-[700px] -top-60 -left-48 rounded-full opacity-[0.06] blur-[120px]" style={{ background: '#6316bbff' }} />
                <div className="absolute w-[500px] h-[500px] top-1/2 -right-40 rounded-full opacity-[0.04] blur-[100px]" style={{ background: '#6c12b6ff' }} />
                <div className="absolute w-[400px] h-[400px] -bottom-40 left-1/3 rounded-full opacity-[0.03] blur-[100px]" style={{ background: '#8b5cf6' }} />
            </div>
            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <Canvas
                dpr={[1, 2]}
                camera={{ position: [-8, 6, -22], fov: 30 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.35 }}
            >
                {/* Cinematic lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[8, 12, -10]} intensity={1.4} color="#e8e0ff" castShadow />
                <directionalLight position={[-6, 8, -6]} intensity={0.5} color="#c7d2fe" />
                <pointLight position={[0, -4, -8]} intensity={0.15} color="#9026f3ff" />
                <pointLight position={[10, 3, 5]} intensity={0.2} color="#6414c0ff" />
                {/* Rim light — edge highlight */}
                <pointLight position={[-12, 0, 2]} intensity={0.3} color="#5c109bff" />

                <Suspense fallback={null}>
                    <Particles />
                    <FloatingIcons />
                    <group rotation={[0, Math.PI, 0]} onClick={(e) => { e.stopPropagation(); setOpen(!open) }}>
                        <Laptop open={open} hinge={props.open.to([0, 1], [1.575, -0.425])} />
                    </group>
                    <Environment preset="night" />
                </Suspense>

                <ContactShadows position={[0, -4.5, 0]} opacity={0.15} scale={20} blur={2} far={5} color="#1e1b4b" />

                {/* Full 360° orbit */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    )
}
