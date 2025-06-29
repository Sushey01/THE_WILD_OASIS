import React from 'react'
import supabase from '../services/supabase'



const HeroSection = () => {
  console.log(supabase)
  return (
    <div className={styles.hero}>
      <p>Hello</p>
    </div>
  )
}

export default HeroSection
