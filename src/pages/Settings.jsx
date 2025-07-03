import React from 'react'
import "./Setting.css"
import UpdateSettingsForm from '../settings/UpdateSettingsForm'
const Settings = () => {
  return (
    <div className='setting-title'>
      <h1> Update hotel settings</h1>
      <UpdateSettingsForm/>
    </div>
  )
}

export default Settings
