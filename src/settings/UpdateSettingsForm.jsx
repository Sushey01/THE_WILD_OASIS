import React from 'react';
import { useSettings } from './useSettings';
import {useUpdateSetting} from './useUpdateSetting';
import styles from "./SettingForm.module.css"

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
    <form className={styles.settingForm}>
      <div className={styles.settings}>

      <label> Minimum nights/booking </label>
        <input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          />
          </div>

      <div className={styles.settings}>
      <label>Maximum nights/booking</label>
        <input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          />
          </div>

    <div className={styles.settings}>

      <label>Maximum nights/booking</label>
        <input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerson} disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestPerson")}
          />
          </div>
      
      <div className={styles.settings}>

      <label>Breakfast price</label>
        <input
          type="number"
          id="break-price"
          defaultValue={breakfastPrice}  disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          />
          </div>
    </form>
  );
};

export default UpdateSettingsForm;
