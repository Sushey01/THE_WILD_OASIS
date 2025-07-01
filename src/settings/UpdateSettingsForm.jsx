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

  const { isLoading: isUpdating, mutate: updateSetting } = useUpdateSetting();

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
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </label>

      <label>
        <input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </label>

      <label>
        <input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestPerson}
          onBlur={(e) => handleUpdate(e, "maxGuestPerson")}
        />
      </label>

      <label>
        <input
          type="number"
          id="break-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </label>
    </form>
  );
};

export default UpdateSettingsForm;
