import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { addEvent } from '../../../../redux/slices/eventSlice';
import {Toaster , toast} from 'react-hot-toast'
import { Typography } from '@mui/material';

function AddForm() {
  const [nom ,setNom] = useState('');
  const [description ,setDescription] = useState('');
  const [date ,setData] = useState('');
  const [mode ,setMode] = useState('');
  const [lien ,setLien] = useState('');
  const [photo ,setPhoto] = useState('');
  const dispatch = useDispatch()
  const handleImageChange = (e) => {
    setPhoto(e.target.files[0])
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const data = new FormData()
    data.append('nom',nom)
    data.append('description',description)
    data.append('date',date)
    data.append('mode',mode)
    data.append('lien',lien)
    data.append('photo',photo)
    console.log(data);
    

    try {
         await dispatch(addEvent(data))
      toast.success('Event added successfully')
      setNom('')
      setDescription('')
      setData('')
      setMode('')
      setLien('')
      setPhoto(null)
      
      
    } catch (error) {
      toast.error('Failed to add event')
      console.error('Erreur lors de l\'envoi des données:', error)

    }
  }

  
  return (
    
     

        <div>
           <Toaster />
           <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
         Events Details
      </Typography>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Add Event Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name"> Name</label>
                      <input type="text" name="full_name" id="full_name" value={nom} onChange={(e) => setNom(e.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Description</label>
                      <textarea name="email" value={description} onChange={(e) => setDescription(e.target.value)} id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"></textarea>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Date</label>
                  <input type="date" name="email" id="email" value={date} onChange={(e) => setData(e.target.value)} />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="mode">Mode</label>
                      <div className="flex items-center mt-1">
                        <input type="radio" name="mode" id="mode_online" value="enligne" onChange={(e) => setMode(e.target.value)} className="mr-8" />
                        <label htmlFor="mode_online" className="mr-4">enligne</label>
                        <input type="radio" name="mode" id="mode_presentiel" value="presentiel" onChange={(e) => setMode(e.target.value)} className="mr-4" />
                        <label htmlFor="mode_presentiel">présentiel</label>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city">Lien</label>
                      <textarea name="city" id="city" value={lien} onChange={(e) => setLien(e.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city"> Picture </label>
                      <input type="file" onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                    <div className="md:col-span-5 flex justify-center">
                      <button className="bg-blue-gray-900-700 hover:bg-slate-800 text-blue font-bold py-2 px-4 rounded">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    
  )
}

export default AddForm