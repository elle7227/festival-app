import stylesSchedule from "../styles/Schedule.module.css";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

// MUI

import * as React from "react";
import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Navigation from "@/components/Navigation";
import Footer from "@/components/footer";

const columns = [
  {
    id: "time00",
    label: "00:00 - 02:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time02",
    label: "02:00 - 04:00",
    minWidth: 170,
    align: "right",
  },

  {
    id: "time04",
    label: "04:00 - 06:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time06",
    label: "06:00 - 08:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time08",
    label: "08:00 - 10:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time10",
    label: "10:00 - 12:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time12",
    label: "12:00 - 14:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time14",
    label: "14:00 - 16:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time16",
    label: "16:00 - 18:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time18",
    label: "18:00 - 20:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time20",
    label: "20:00 - 22:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time22",
    label: "22:00 - 00:00",
    minWidth: 170,
    align: "right",
  },
];
//laver en liste af objekter som hedder det samme som columns id (tidspunkter)
function createData(time00, time02, time04, time06, time08, time10, time12, time14, time16, time18, time20, time22) {
  return {
    time00,
    time02,
    time04,
    time06,
    time08,
    time10,
    time12,
    time14,
    time16,
    time18,
    time20,
    time22,
  };
}

export default function StickyHeadTable({ schedule }) {
  const rows = {
    Monday: [createData(...days("mon", "Midgard")), createData(...days("mon", "Vanaheim")), createData(...days("mon", "Jotunheim"))],
    Tuesday: [createData(...days("tue", "Midgard")), createData(...days("tue", "Vanaheim")), createData(...days("tue", "Jotunheim"))],
    Wednesday: [createData(...days("wed", "Midgard")), createData(...days("wed", "Vanaheim")), createData(...days("wed", "Jotunheim"))],
    Thursday: [createData(...days("thu", "Midgard")), createData(...days("thu", "Vanaheim")), createData(...days("thu", "Jotunheim"))],
    Friday: [createData(...days("fri", "Midgard")), createData(...days("fri", "Vanaheim")), createData(...days("fri", "Jotunheim"))],
    Saturday: [createData(...days("sat", "Midgard")), createData(...days("sat", "Vanaheim")), createData(...days("sat", "Jotunheim"))],
    Sunday: [createData(...days("sun", "Midgard")), createData(...days("sun", "Vanaheim")), createData(...days("sun", "Jotunheim"))],
  };

  const [day, setDay] = useState("Monday");
  const [displayedDay, setDisplayedDay] = useState("Monday");

  // Function to update the displayed day and rows based on the selected day
  function updateDisplayedDay(selectedDay) {
    setDisplayedDay(selectedDay);
  }

  // Filter for button days
  function changeDay(event) {
    const selectedDay = event.target.value;
    setDay(selectedDay);
    updateDisplayedDay(selectedDay);
    // tilføjer active styling til valgte day buttons
    const buttons = document.querySelectorAll(`.${stylesSchedule.days} button`);
    buttons.forEach((button) => {
      if (button.value === selectedDay) {
        button.classList.add(stylesSchedule.activeButton);
      } else {
        button.classList.remove(stylesSchedule.activeButton);
      }
    });
  }

  // Retrieve the rows for the displayed day
  // || is used to provide a fallback value, which is an empty array [].
  // This ensures that displayedRows will always be an array, even if the displayedDay is not found in the rows object.
  const displayedRows = rows[displayedDay] || [];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  
  //bruges ikke - kan fjernes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //bruges ikke - kan fjernes
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function days(day, stage) {
    // Object to store the results
    const results = [];
    //for (const day in schedule.Midgard) {

    const activities = schedule[stage][day];
    for (const activity of activities) {
      if (activity.act !== "break") {
        results.push(activity.act);
      } else {
        // Push an empty string as a placeholder for the empty spot
        results.push("");
      }
    }

    //}
    console.log({ results });
    return results;
  }
  return (
    <div className={stylesSchedule.schedule_body}>
      <Navigation></Navigation>
      <Head>
        <title>Schedule</title>
      </Head>
      <h1 className={stylesSchedule.scheduleHeading}>Schedule</h1>
      <Link className={stylesSchedule.link} href="/program">
        / Program
      </Link>
      {/* schedule timetable */}
      {/* BUTTONS TO CHOOSE DAYS */}
      <div className={stylesSchedule.days}>
        <button onClick={changeDay} value="Monday">
          Monday
        </button>
        <button onClick={changeDay} value="Tuesday">
          Tuesday
        </button>
        <button onClick={changeDay} value="Wednesday">
          Wednesday
        </button>
        <button onClick={changeDay} value="Thursday">
          Thursday
        </button>
        <button onClick={changeDay} value="Friday">
          Friday
        </button>
        <button onClick={changeDay} value="Saturday">
          Saturday
        </button>
        <button onClick={changeDay} value="Sunday">
          Sunday
        </button>
      </div>
      <p className={stylesSchedule.scroll_tekst}>Scroll left</p>
      <h2 className={stylesSchedule.dayName}>{day}</h2>
      <section className={stylesSchedule.scheduleSection}>
        <div className={stylesSchedule.scheduleStages}>
          <h3 className={stylesSchedule.scene_mid}>Midgard</h3>
          <h3 className={stylesSchedule.scene_van}>Vanaheim</h3>
          <h3 className={stylesSchedule.scene_jotu}>Jotunheim</h3>
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden", bgcolor:'transparent'}}>
          <TableContainer sx={{ maxHeight: 600, overflow: "scroll"}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{ height:'80px', opacity:'80%'}} >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* changed the MUI "structure" from rows to displayedRows */}
                {displayedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code} sx={{ height:'170px'}}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number" ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </section>
      <Footer></Footer>
    </div>
  );
}

export async function getServerSideProps() {
  //const api = "http://localhost:8080/schedule";
  const api = "https://nova-enchanted-confidence.glitch.me/schedule";
  const res = await fetch(api);
  const data = await res.json();
  console.log(data);
  return {
    props: {
      schedule: data,
      isSchedule: true,
    },
  };
}
