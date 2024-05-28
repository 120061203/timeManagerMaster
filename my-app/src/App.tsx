// import React from 'react';
// import logo from './logo.svg';
import './App.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { 
  ScheduleComponent, 
  Day, 
  Week, 
  WorkWeek, 
  Month, 
  Agenda, 
  Inject,
  ViewsDirective,
  ViewDirective,
  EventSettingsModel } from '@syncfusion/ej2-react-schedule';
function App() {
  const data: object [] = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 4, 28, 10, 0),
      EndTime: new Date(2024, 4, 28, 12, 30),
      IsAllDay: false,
      RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=3',
      RecurrenceException: '20240528T113000Z'
    },
  ];
  // const eventSettings = { dataSource: data }
  const eventSettings: EventSettingsModel = { dataSource: data };

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <ScheduleComponent 
    height='550px' 
    currentView='Week'
    selectedDate= {new Date(2024, 4, 28)} 
    eventSettings={eventSettings}
    >
      <ViewsDirective>
        <ViewDirective option="WorkWeek" startHour="10:00" endHour="18:00" />
        <ViewDirective option="Week" startHour="07:00" endHour="24:00" />
        <ViewDirective option="Month" showWeekend={true} />
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="WorkWeek" />
        <ViewDirective option="Month" />
        <ViewDirective option="Agenda" />
      </ViewsDirective>

      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
  </ScheduleComponent>
  );
}

export default App;
// ReactDOM.render(<App />, document.getElementById("schedule"));