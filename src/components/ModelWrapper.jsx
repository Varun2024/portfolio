import { useFrame } from '@react-three/fiber'
import {  useState } from 'react'
import Astronaut from "../components/Astronaut"

export default function AnimatedModel() {
  const [scale, setScale] = useState(0.01)

  useFrame(() => {
    setScale((prev) => (prev < 1 ? prev + 0.001 : .05))
  })

  return <Astronaut scale={[scale,scale,scale]}  position={[8.115, -2, -9.454]}/>
}