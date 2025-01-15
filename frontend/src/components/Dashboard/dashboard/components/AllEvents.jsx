import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

import { fetchEvents } from '../../../../redux/slices/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import CustomizedDataGrid from './CustomizedDataGrid';
function AllEvents() {
  const events = useSelector((state) => state.events.events || []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    
    <div className="container max-w-screen-lg mx-auto">
      <div>
    <Toaster />
    <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        All Events
      </Typography>
        <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid />
        </Grid>
        {/* <Grid size={{ xs: 12, lg: 3 }}>
          <Stack gap={2} direction={{ xs: 'column', sm: 'row', lg: 'column' }}>
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        // </Grid> */} 
        {/* left boxes  */}
      </Grid>
   </div>
</div>

  )
}

export default AllEvents

