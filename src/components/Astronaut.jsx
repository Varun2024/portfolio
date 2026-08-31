// Hero 3D — Among Us character mascot. Default textures, no gait animation.
// Mouse-reactive: tilts and yaws toward the cursor for subtle interactivity.

import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useMotionValue, useSpring } from 'motion/react'
import { useFrame } from '@react-three/fiber'

const MODEL = '/models/among_us_character (1).glb'

const BASE_Z_ROTATION = Math.PI
const MAX_YAW = 0.7
const MAX_TILT = 0.4

export default function Astronaut(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF(MODEL)

    const xPosition = useMotionValue(-5)
    const xSpring = useSpring(xPosition, { damping: 13 })
    useEffect(() => {
        xSpring.set(props.isMobile ? .115 : 8.115)
    }, [xSpring, props.isMobile])

    const pointerYaw = useMotionValue(0)
    const pointerTilt = useMotionValue(0)
    const yawSpring = useSpring(pointerYaw, { damping: 18, stiffness: 90 })
    const tiltSpring = useSpring(pointerTilt, { damping: 18, stiffness: 90 })

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
