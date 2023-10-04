import React, { useEffect, useState } from "react";
import { getAllAttendanceThunk } from "../Redux/attendanceSlice";
import { useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const AttendancePage = () => {
  const dispatch = useDispatch();
  const localizer = momentLocalizer(moment);
  const today = moment().format("YYYY-MM-DD");
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    dispatch(getAllAttendanceThunk())
      .then((res) => {
        console.log(res);
        setAttendanceData(res.payload.data.attendanceRecords);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err.response;
      });
  }, [dispatch]);

  console.log(attendanceData);

  // Define CSS classes for event styles
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";
    if (event.title === "Present") {
      backgroundColor = "green";
    } else if (event.title === "Absent") {
      backgroundColor = "red";
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <>
      <div className="container2">
        <Calendar
          localizer={localizer}
          events={attendanceData.map((record) => ({
            title:
              moment(record.date).format("YYYY-MM-DD") === today
                ? "Present"
                : "Absent",
            start: new Date(record.date),
            end: new Date(record.date),
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 700,
            width: 1000,
            border: "3px solid black",
            fontWeight: "700",
            fontSize: "20px",
          }}
          eventPropGetter={eventStyleGetter} // Apply event styles
        />
      </div>
    </>
  );
};

export default AttendancePage;
