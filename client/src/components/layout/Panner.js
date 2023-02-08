import React from 'react'
import slider1 from "../../assets/slider1.jfif"
import sl1 from "../../assets/sl1.jfif"
function Panner() {
  return (
    <div style={{padding:"0 25px", display:"flex"}}>
        <div style={{width:"100%"}}>
            <img src={sl1} alt=""/>
        </div>
        <div style={{width:"100%"}}>
            <img src={sl1} alt=""/>
        </div>
        <div style={{width:"100%"}}>
            <img src={sl1} alt=""/>
        </div>
    </div>
  )
}

export default Panner