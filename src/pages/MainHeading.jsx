import React from 'react'
import {Link} from "react-router-dom"

export default function MainHeading() {
  return (
    <div className='section' style={{
        backgroundColor:"#854d0e", top:"0"
    }}>
        <div className="section1" style={{
            display:"flex",
            justifyContent:"center",
            flexDirection:"row",
            color:"#e5e7eb",
            fontSize:"15px",
            gap:"10px",
            padding:"15px",
        }}>👋
        <h4>Data mutations (create, update, delete) are deactivated in this demo app. Part of Jonas Schmedtmann's</h4>
        <h4 style={{

            color:"#4f46e5"
        }}>Ultimate React Course</h4> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right" color='#4f46e5'><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
        </div>
    </div>
  )
}

