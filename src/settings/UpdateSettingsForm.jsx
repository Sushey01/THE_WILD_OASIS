import React from 'react';
import { useSettings } from './useSettings';
import {useUpdateSetting} from './useUpdateSetting';

const UpdateSettingsForm = () => {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerson,
      breakfastPrice,
    } = {},
  } = useSettings();

  const {  isUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
   updateSetting({ [field]: value });

  }

  if (isLoading) return <p>Loading settings...</p>;

  return (
    <form>
      <label>
        <input
          type="number"
          id="min-nights"
          
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </label>

      <label>
        <input
          type="number"
          id="max-nights"
         
          defaultValue={maxBookingLength}
           disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </label>

      <label>
        <input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerson} disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestPerson")}
        />
      </label>

      <label>
        <input
          type="number"
          id="break-price"
          defaultValue={breakfastPrice}  disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </label>
    </form>
  );
};

export default UpdateSettingsForm;
