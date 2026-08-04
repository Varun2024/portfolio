// Hero 3D — Among Us character mascot, retinted to scanner cyan.
// See index.css: --color-coral is declared as "DANGER only" so the mascot
// can't also be red. Every GLB material's color is overwritten in-place.

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useMotionValue, useSpring } from 'motion/react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const MODEL = '/models/among_us_character (1).glb'
const MASCOT_COLOR = '#3aa7d9' // more saturated cyan — reads scanner-blue under neutral scene lighting

const BASE_Z_ROTATION = Math.PI
const MAX_YAW = 1.1
const MAX_TILT = 0.65

export default function Astronaut(props) {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF(MODEL)

    // Repaint the GLB's baked color texture region-by-region using its original
    // hue as the routing signal:
    //   · very dark pixels → BLACK  (visor)
    //   · blue-dominant     → WHITE  (top piece / "toilet paper")
    //   · everything else   → AQUA   (body/legs, shaded by original luma)
    // material.color stays white so the texture drives the surface directly.
    useEffect(() => {
        const AQUA_R = 0x3a, AQUA_G = 0xa7, AQUA_B = 0xd9 // MASCOT_COLOR RGB
        Object.values(materials).forEach((mat) => {
            if (!mat) return
            if (mat.color) mat.color.setHex(0xffffff)
            const src = mat.map?.image
            if (src && src.width) {
                const canvas = document.createElement('canvas')
                canvas.width = src.width
                canvas.height = src.height
                const ctx = canvas.getContext('2d')
                ctx.drawImage(src, 0, 0)
                const px = ctx.getImageData(0, 0, canvas.width, canvas.height)
                const d = px.data
                // Classify each pixel by HSV: visor = dark-neutral,
                // top piece = bright-neutral, body = saturated (was red).
                for (let i = 0; i < d.length; i += 4) {
                    const r = d[i], g = d[i + 1], b = d[i + 2]
                    const max = Math.max(r, g, b)
                    const min = Math.min(r, g, b)
                    const v = max / 255
                    const s = max === 0 ? 0 : (max - min) / max
                    if (v < 0.38) {
                        // Visor: pure black
                        d[i] = 0; d[i + 1] = 0; d[i + 2] = 0
                    } else if (s < 0.18 && v > 0.55) {
                        // Top piece: near-white ("toilet paper") with faint shading
                        const shade = 215 + (v - 0.55) * 90
                        const w = Math.min(255, shade)
                        d[i] = w; d[i + 1] = w; d[i + 2] = w
                    } else {
                        // Body: aqua × normalized value so highlights + AO survive
                        const f = 0.55 + v * 0.5
                        d[i] = Math.min(255, AQUA_R * f)
                        d[i + 1] = Math.min(255, AQUA_G * f)
                        d[i + 2] = Math.min(255, AQUA_B * f)
                    }
                }
                ctx.putImageData(px, 0, 0)
                const tex = new THREE.CanvasTexture(canvas)
                tex.flipY = mat.map.flipY
                tex.colorSpace = mat.map.colorSpace
                tex.wrapS = mat.map.wrapS
                tex.wrapT = mat.map.wrapT
                tex.needsUpdate = true
                mat.map = tex
            }
            if (mat.emissive) mat.emissive.setHex(0x000000)
            // Low metalness + high roughness = black stays black (no envmap sheen).
            // Body still catches the aqua sweep light because of its brighter base color.
            if ('metalness' in mat) mat.metalness = 0.1
            if ('roughness' in mat) mat.roughness = 0.6
            if ('envMapIntensity' in mat) mat.envMapIntensity = 0.5
            mat.needsUpdate = true
        })
    }, [materials])

    const { actions } = useAnimations(animations, group)
    useEffect(() => {
        if (animations.length > 0) {
            actions[animations[0].name]?.play()
        }
    }, [actions, animations])

    // Spring entry from off-canvas left
    const xPosition = useMotionValue(-5)
    const xSpring = useSpring(xPosition, { damping: 13 })
    useEffect(() => {
        xSpring.set(props.isMobile ? .115 : 8.115)
    }, [xSpring, props.isMobile])

    // Pointer-driven interactive tilt
    const pointerYaw = useMotionValue(0)
    const pointerTilt = useMotionValue(0)
    const yawSpring = useSpring(pointerYaw, { damping: 16, stiffness: 130 })
    const tiltSpring = useSpring(pointerTilt, { damping: 16, stiffness: 130 })

    useEffect(() => {
        if (typeof window === 'undefined') return
        const handleMove = (e) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1
            const ny = (e.clientY / window.innerHeight) * 2 - 1
            pointerYaw.set(nx * MAX_YAW)
            pointerTilt.set(ny * MAX_TILT)
        }
        const handleLeave = () => {
            pointerYaw.set(0)
            pointerTilt.set(0)
        }
        window.addEventListener('pointermove', handleMove)
        window.addEventListener('pointerleave', handleLeave)
        return () => {
            window.removeEventListener('pointermove', handleMove)
            window.removeEventListener('pointerleave', handleLeave)
        }
    }, [pointerYaw, pointerTilt])

    useFrame(() => {
        if (!group.current) return
        group.current.position.x = xSpring.get()
        group.current.rotation.z = BASE_Z_ROTATION + yawSpring.get()
        group.current.rotation.x = -Math.PI / 2 + tiltSpring.get()
    })

    return (
        <group
            ref={group}
            dispose={null}
            scale={props.scale || .05}
            position={props.position || [8.115, -3, -9.454]}
            rotation={[-Math.PI / 2, 0, Math.PI]}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model">
                    <group name="b3faf779fc144613abde2c91592dd257fbx" rotation={[Math.PI / 2, 0, 0]}>
                        <group name="Object_2">
                            <group name="RootNode">
                                <group
                                    name="Box001"
                                    position={[1.557, 75.821, -11.173]}
                                    rotation={[-Math.PI / 2, 0, 0]}
                                />
                                <group name="Foot" position={[1.557, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                                    <group name="Object_6">
                                        <primitive object={nodes._rootJoint} />
                                        <skinnedMesh
                                            name="Object_9"
                                            geometry={nodes.Object_9.geometry}
                                            material={materials['Scene_-_Root']}
                                            skeleton={nodes.Object_9.skeleton}
                                            scale={2.5}
                                        />
                                        <group
                                            name="Object_8"
                                            position={[1.557, 35.589, 7.398]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>
    )
}

useGLTF.preload(MODEL)
