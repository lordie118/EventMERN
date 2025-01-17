import React from 'react';
import { Typography } from '@material-tailwind/react';
import CustomizedDataGrid from './CustomizedDataGrid';

function AlllUser() {
    return (
        
        <div className="flex justify-start shadow-2xl  w-full max-w-7xl  bg-gray-100">
    
            {/* Contenu */}
            <CustomizedDataGrid />
         
        </div>
      );
      
}

export default AlllUser;
