import React, { useState } from "react";
import Dispatch from './Dispatch';
import './App.css';
import Zoom from '@mui/material/Zoom';

import {debugData} from "../utils/debugData";
debugData([
  {
    action: 'setVisible',
    data: true,
  }
])

import {
  Button,
} from '@mantine/core';


const App: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [triggerDispatch, setTriggerDispatch] = useState(false);

  const handleRecenterClick = () => {
    setTriggerDispatch(!triggerDispatch);
  };
  
  return (
    <Zoom in={visible}>
      <div className="map-container">
        <div className='map'>
          <Dispatch triggerDispatch={triggerDispatch}/>
          <Button className='recenter' color="green" size='sm' onClick={handleRecenterClick}>RECENTER</Button>
        </div>
      </div>
    </Zoom>
    
  );
};

export default App;