import React from 'react'
import SideMenu from './SideMenu'
import { alpha, AppBar, Box, CssBaseline, Stack } from '@mui/material'


import AddForm from './AddForm'
import AppTheme from '../../shared-theme/AppTheme';

import Header from './Header';
import AllEvents from './AllEvents';

import {
  dataGridCustomizations,

} from '../theme/customizations';

const xThemeComponents = {
 
  ...dataGridCustomizations,

};


function AddEvent() {
  return (

    
    <div>

<AppTheme themeComponents={xThemeComponents} >
<CssBaseline />
         <Box sx={{ display: 'flex' }}> 
                   {/* <Header /> */}
       
         
         <SideMenu /> 
         <Box
                   component="main"
                   sx={(theme) => ({
                     flexGrow: 1,
                     backgroundColor: theme.vars
                       ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                       : alpha(theme.palette.background.default, 1),
                     overflow: 'auto',
                   })}
                 >   
                     <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
          <AddForm />
          <AllEvents />
          </Stack>
          
          </Box>
         </Box>
 </AppTheme>
         
       

       
    </div>
  )
}

export default AddEvent