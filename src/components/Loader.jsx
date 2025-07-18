import { Html, useProgress } from '@react-three/drei'

const Loader = () => {
    const {progress} = useProgress()
  return (
    <Html center className='text-white text-xl text-center font-normal '>
        {progress}% loaded
    </Html>
  )
}

export default Loader