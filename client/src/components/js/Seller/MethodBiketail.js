import React, { useState } from 'react'
// import DateTimePicker from 'react-datetime-picker';
import { TextField } from '@mui/material';

export default function MethodBiketail() {
  // const [value, onChange] = useState(new Date());
  const [value, setValue] = useState(new Date('2022-03-06T12:00:00'));

  return (
    <div>
      <p>Biketail can come to you. We'll handle all shipping and verification processes for a <strong> flat fee of $99,</strong> ensuring that your bike gets to your buyer without hassle.</p>
      <h3>Arrange pickup availability</h3>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  )
}
