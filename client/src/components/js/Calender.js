import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import {getBookingsforBike} from "../../actions/booking";


export default function Calender(props) {

 
  const [startDate, setStartDate] = React.useState(props.current_bike.start_date);
  const [endDate, setEndDate] = React.useState(props.current_bike.end_date);
  const {app} = props;

  props.setBookingStartEndDates()
  
  // var bookingStartEndDates = []
  // var bikeBookings = null 
  // getBookingsforBike(props.current_bike._id, app)
  // .then(res => {
  //   bikeBookings = res
  //   console.log("bikeBookings are " + JSON.stringify(bikeBookings.bookings))
  //   for(var count = 0; count < bikeBookings.bookings.length; count++){
  //     bookingStartEndDates.append((bikeBookings[count].startDate, bikeBookings[count].endDate ))

  //   }
  //   console.log("bookingStartEndDates is " + bookingStartEndDates)

  // })
  // .catch(error => {
  //   console.log(error);
  // });


  
  props.handleCalendarDateChange(props.current_bike.start_date, props.current_bike.end_date);


  const {currentUser } = props.appState;
  console.log("the current user is " + currentUser)
  console.log("the current bike is " + props.current_bike )
  


  function shouldDisableDate(date, bikeBookings){

    
    console.log("bikeBookings are " + JSON.stringify(bikeBookings) )


    console.log("date is " + date)
    var startDateCount = new Date(props.current_bike.start_date)
    var endDateCount = new Date(props.current_bike.end_date)
    const startDate = new Date(props.current_bike.start_date)
    const endDate = new Date(props.current_bike.end_date)
    var disableDateArray = []
    startDateCount.setDate(1)
    endDateCount.setMonth(endDateCount.getMonth() + 1)
    endDateCount.setDate(0)
    
    // console.log("Date of date count for disabled date is " + startDateCount + " Date of date count for disabled date is " + endDateCount)
    var currentDate = startDateCount
    var currentDateStr = ""
    // console.log("currentDate < props.current_bike.start_date is " +  (currentDate.toString() <  props.current_bike.start_date.toString()) )
    while(currentDate <= endDateCount){
        currentDateStr = currentDate.toString()

      if(currentDate < startDate){
        disableDateArray.push(currentDateStr)
        // disableDateArray.push(currentDate)
      }
      else if(currentDate > endDate){
        console.log("if called")
        disableDateArray.push(currentDateStr)
        // disableDateArray.push(currentDate)
      }
      else{
        for(var count = 0; count < props.bookingStartEndDates; count++){
          console.log("bookingStartEndDates[count] " + props.bookingStartEndDates[count])
          if( (props.bookingStartEndDates[count][0] <  currentDate) && (props.bookingStartEndDates[count][1] <  currentDate) ){
            disableDateArray.push(currentDateStr)
          }
        }
      }

      currentDate.setDate(currentDate.getDate() + 1)
      // console.log("currentDate < props.current_bike.start_date is " +  (  currentDate <  startDate) )
      // console.log("current date is " + currentDate + " type is " + typeof(currentDate) + " current string toDateString() is " + currentDate.toDateString() )
    }



    
    // console.log("disableDateArray is " + disableDateArray)
    // console.log("disableDateArray.includes(date)" + disableDateArray.includes(date.toString()))
    const dateStr = date.toString()
    var result = disableDateArray.filter((disableDate) =>  (disableDate.substring(0, 15) == dateStr.substring(0, 15) ));
    result = result != null ? result : []
    // return disableDateArray.includes(date.toString())
    console.log("result " + result )
    console.log(" result is null " + result == null)
    return (result.length > 0)
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Start date"
          value={startDate}
          minDate={props.current_bike.start_date}
          onChange={(newValue) => {
            console.log("called start")
            
            // var bookingStartEndDates = []
            // getBookingsforBike(props.current_bike._id, app)
            // .then(res => {
            //   bikeBookings = res
            //   console.log("bikeBookings are " + JSON.stringify(bikeBookings))
            //   for(var count = 0; count < bikeBookings.bookings.length; count++){
            //     bookingStartEndDates.append((bikeBookings[count].startDate, bikeBookings[count].endDate ))
            //   }
            // })
            // .catch(error => {
            //   console.log(error);
            // });

            props.setBookingStartEndDates()
            props.handleCalendarDateChange(newValue, null);
            setStartDate(newValue)
          }}
          shouldDisableDate={(date) => {
            return shouldDisableDate(date, props.bookingStartEndDates)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
         <DesktopDatePicker
          label="End Date"
          value={endDate}
          maxDate={props.current_bike.end_date}
          onChange={(newValue) => {
            console.log("called end")

            // var bookingStartEndDates = []
            // getBookingsforBike(props.current_bike._id, app)
            // .then(res => {
            //   bikeBookings = res
            //   console.log("bikeBookings are " + JSON.stringify(bikeBookings))
            //   for(var count = 0; count < bikeBookings.bookings.length; count++){
            //     bookingStartEndDates.append((bikeBookings[count].startDate, bikeBookings[count].endDate ))
            //   }
            // })
            // .catch(error => {
            //   console.log(error);
            // });

            props.setBookingStartEndDates()
            props.handleCalendarDateChange(null, newValue);
            setEndDate(newValue)
          }}
          shouldDisableDate={(date) => {
            return shouldDisableDate(date, props.bookingStartEndDates)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}