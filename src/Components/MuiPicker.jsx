import React, { useState } from 'react'

import { Stack, TextField } from '@mui/material'
import { DatePicker } from '@material-ui/lab'


function MuiPicker() {

    const [selectedDate, setSelectedDate] = useState(null)

  return (
    <Stack spacing={4} sx={ { width: '250px'}}
    >
        <DatePicker />

    </Stack>
  )
}

export default MuiPicker