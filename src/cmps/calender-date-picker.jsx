import * as React from 'react';

import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useEffectUpdate } from '../hooks/useEffectUpdate';

export default function BasicDateRangePicker({ changeDates, onOpenGuestsFilter, checkInDate, checkOutDate }) {
  const [value, setValue] = React.useState([null, null]);
  useEffectUpdate(() => {
    return onChangeDate()
  }, [value])

  const onChangeDate = () => {
    if (value[0] && value[1]) {
      if (value[0].$d && value[1].$d) {
        const checkIn = value[0].$d
        const checkOut = value[1].$d
        changeDates(checkIn, checkOut)
      }
    }
  }

  const formatDate = (date) => {
    let newDate = date.inputProps ? new Date(date.inputProps.value) : new Date(date)
    const day = newDate.getDate()
    const month = newDate.toLocaleString('en-US', { month: 'short' });
    return month + ' ' + day
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ start: '', end: '' }}
    >

      <DateRangePicker
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => {

          return (
            <React.Fragment>
              <div className='header-dates' onClick={startProps.inputProps.onClick}>
                <p>Check Out </p>
                <p className={`${checkInDate || startProps.inputProps.value ? 'date' : ''}`}>{startProps.inputProps.value ? <> {formatDate(startProps)}</> : checkOutDate ? < > {formatDate(checkInDate)}  </> : 'add dates'}</p>
              </div>
              <Box sx={{ mx: 2 }}> <span>|</span> </Box>
              <div className='header-dates' onClick={endProps.inputProps.onClick}>
                <p>Check Out </p>
                <p className={`${checkOutDate || endProps.inputProps.value ? 'date' : ''}`}>{endProps.inputProps.value ? <> {formatDate(endProps)}</> : checkOutDate ? < > {formatDate(checkOutDate)}  </> : 'add dates'}</p>
              </div>
            </React.Fragment>
          )
        }}
      />
    </LocalizationProvider>
  );
}
