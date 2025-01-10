import * as React from 'react';
// import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import GridEvent from './GridEvent';
import HeroSection from './HeroSection';
import { ThemeProvider } from '@material-tailwind/react'; // or any other context provider
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Copyright from '../internals/components/Copyright';
// import ChartUserByCountry from './ChartUserByCountry';
// import CustomizedTreeView from './CustomizedTreeView';
// import CustomizedDataGrid from './CustomizedDataGrid';
// import HighlightedCard from './HighlightedCard';
// import PageViewsBarChart from './PageViewsBarChart';
// import SessionsChart from './SessionsChart';
// import StatCard from './StatCard';



export default function MainGrid() {
  return (
    <Box >
      
        <HeroSection />
    
         <GridEvent />
    </Box>
  );
}
