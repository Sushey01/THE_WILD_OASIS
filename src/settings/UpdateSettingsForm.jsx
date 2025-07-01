import React from 'react'
import { useSettings } from './useSettings'

const UpdateSettingsForm = () => {
    const {isLoading, settings:{minBookingLength, maxBookingLength, maxGuestPerson, breakfastPrice,}={}} = useSettings();

  return (
    <form>
      <label>
        <input
        type="number"
        id='min-nights'
        defaultValue={minBookingLength}
        />
      </label>
        <input
        type="number"
        id='max-nights'
        defaultValue={maxBookingLength}
        />

        <label>
        <input
        type="number"
        id='max-guests'
        defaultValue={maxGuestPerson}
        />
      </label>

        <label>
        <input
        type="number"
        id='break-price'
        defaultValue={breakfastPrice}
        />
      </label>
       
    </form>
  )
}

export default UpdateSettingsForm
