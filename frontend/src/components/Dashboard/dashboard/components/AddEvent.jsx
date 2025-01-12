import React from 'react'
import SideMenu from './SideMenu'
import { Box } from '@mui/material'
import AddForm from './AddForm'

function AddEvent() {
  return (
    
    <div>
         <Box sx={{ display: 'flex' }}> 

         <SideMenu /> 
          <AddForm />
         </Box>
       

       
    </div>
  )
}

export default AddEvent