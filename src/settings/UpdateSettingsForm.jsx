import React from 'react'

const UpdateSettingsForm = () => {
  return (
    <form>
      <label>
        <input
        type="number"
        id='min-nights'
        />
      </label>
      <label>
        <input
        type="number"
        id='max-nights'
        />
      </label>
    </form>
  )
}

export default UpdateSettingsForm
