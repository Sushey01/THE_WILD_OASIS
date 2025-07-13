import React from 'react'
import { useState } from 'react'
import './AddCabin.css'


export default function AddCabin () {
    const [formData, setFormData] = useState({
        cabinname:"",
        capacity:"",
        price:"",
        discount:"",
        website:"",
    })



        function handleChange(e){
            const [name, value] = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]:value,
            }))
        }


  return (
    <div className='cabin-container'>

        
      
        <form className='cabin-form'>
            <button className='cross-button'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
              <div className='cabinInput'>
            <label>
                Cabin name
            </label>
            <input
            className='InputBox'
            type='text'
            name='cabinname'
            placeholder=''
            onChange={handleChange}
            />
            </div>

            <div className='cabinInput'>
                <label>
                    Maximum capacity
                </label>
                <input
                className='InputBox'
                type='text'
                placeholder=''
                value={formData.capacity}
                name='capacity'
                />
            </div>

            <div className='cabinInput'>
                <label>Regular price</label>
                <input
                className='InputBox'
                type='text'
                name='price'
                value={formData.price}
                placeholder=''
                />
            </div>

            <div className="cabinInput">
                <label>
                 Discount
                </label>
                   <input
                   className='InputBox'
                    type='text'
                    placeholder='0' style={{
                        fontWeight:"550"
                    }}
                    value={formData.discount}
                    name='discount'
                    />
            </div>

            <div className='cabinInput'>
                <label>Description for website</label>
                <input
                className='InputBox1'
                name='website'
                type='text'
                value={formData.website}
                placeholder=''
                />
            </div>

            <div className="cabinButtons">
                <label>
                    Cabin photo
                </label>
                <div className='primary-buttons'>
                <button className='choose-button'>Choose File</button>
                <button className='file-button'>No file chosen</button>
                </div>
            </div>

            <div className="main-buttons">
                <button className="cancel-button">Cancel</button>
                <button className="create-button">Create new cabin</button>
            </div>
        </form>
            
           
    </div>
  )
}

