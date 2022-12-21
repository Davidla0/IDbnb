import React, { useState, useEffect } from "react";

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
// import { ThemeProvider, createTheme } from '@mui/material/styles';


import Box from '@mui/material/Box';
import { getOrder } from "../store/order.actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { orderService } from "../services/order.service";


export function Calender({ stay }) {
  const { order } = useSelector(state => state.orderModule)
  const [value, setValue] = useState([order.startDate, order.endDate]);
  const dispatch = useDispatch()


  useEffect(() => {
    if (!value[0] || !value[1]) return
    const startDate = new Date(value[0].$d).toLocaleDateString()
    const endDate = new Date(value[1].$d).toLocaleDateString()
    const currOrder = { ...order, startDate, endDate }
    dispatch(getOrder(stay, currOrder))

  }, [value])


  const nightsStay = orderService.getDiffDates(order.startDate, order.endDate)

  const getMonthName = (d) => {

    return new Date(d).toLocaleDateString('en-us', { month:"short", day:"numeric", year:"numeric"})
  }

  return (<section className="calender">

    <h2>{nightsStay ? nightsStay : ''} nights in {stay.loc.city}</h2>
    <span>{getMonthName(order.startDate)} - {getMonthName(order.endDate)}</span>
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />

    </LocalizationProvider>
  </section>);
}
