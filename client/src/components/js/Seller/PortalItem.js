import * as React from 'react';
import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import { Button } from '@mui/material';
import PortalExpand from './PortalExpand';

export default function PortalItem(props) {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="portal-items">
        {show ? 
            <Button variant="contained" onClick={handleClick}>{props.bike.name}</Button> 
            : <Button variant="outlined" onClick={handleClick}>{props.bike.name}</Button>}
     
        {show ? (
          <div container={container.current}>
            <PortalExpand bike={props.bike}/>
          </div>
        ) : null}
     
      <div ref={container} />
    </div>
  );
}