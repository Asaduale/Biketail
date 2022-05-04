import * as React from 'react';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineOppositeContent, TimelineContent, TimelineDot } from '@mui/lab';
import { Button, Paper } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import LockClockIcon from '@mui/icons-material/LockClock';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';

export default function PortalExpand(props) {

  const { bike } = props.bike;

  return (
      <div className='portal-expand'>
        <Timeline className='timeline'>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                bike.
                </TimelineOppositeContent>
                <TimelineSeparator className="separator">
                <TimelineConnector />
                    <TimelineDot color="success">
                        <KeyIcon/>
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m: 'auto 0' }}>Picked Up</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                 <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                Mar 7 - 11
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineConnector />
                    <TimelineDot color="success">
                        <DirectionsBikeIcon/>
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m: 'auto 0' }}>Out for Rent</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                >
                Mar 11, 4pm
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="secondary">
                    <LockClockIcon/>    
                </TimelineDot>
                <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m: 'auto 0' }}>Returned</TimelineContent>
            </TimelineItem>
        </Timeline>
        <div className='portal-content'>
            <p className='rented-to'>Rented out to: <strong>Mike</strong></p>
            {/* <div className='portal-content-box'>
                <div className='text'>${props.bike.price_by_day}/day</div>
            </div>  */}
            <Button variant="contained" startIcon={<MessageIcon />}>Message</Button>
            <Button variant="outlined" startIcon={<PersonIcon />}>Renter Bio</Button>   
            <Button variant="outlined" startIcon={<DirectionsBikeIcon />}>Bike Info</Button>   
            <Button variant="contained">Cancel/Return</Button>   
            {/* <Button variant="outlined">to edit</Button>    */}
        </div>
    </div>
  );
}
