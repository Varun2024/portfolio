import { Timeline } from "../components/Timeline"
import { experiences } from "../constants"

const Exp = () => {
  return (
    <div className="w-full">    
   <Timeline data={experiences}/>

    </div>
  )
}

export default Exp