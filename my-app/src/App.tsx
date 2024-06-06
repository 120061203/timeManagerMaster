import "./App.css";

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
  EventSettingsModel,
} from "@syncfusion/ej2-react-schedule";

import { useState } from "react";

function App() {
  interface event {
    Id: number;
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    IsAllDay: boolean;

    RecurrenceRule: null;
  }

  const [eventData, setEventData] = useState<event[]>([
    {
      Id: 1,
      Subject: "Chinese",
      StartTime: new Date(2024, 5, 2, 18, 0),
      EndTime: new Date(2024, 5, 2, 19, 30),
      IsAllDay: false,
      RecurrenceRule: null,
    },
  ]);
  const [title, setTitle] = useState<string>("");
  const [preferMinsTime, setPreferMinsTime] = useState<number>(0);
  const [preferHoursTime, setPreferHoursTime] = useState<number>(0);
  const [splitTime, setSplitTime] = useState<number>(1);
  const [sTime, setSTime] = useState<Date>(new Date());
  const [eTime, setETime] = useState<Date>(new Date());
  const [tag, setTag] = useState<string>("none");

  function submitForm() {
    // Use a local variable to track the current time
    let currentSTime = new Date(sTime);
    for (let i = 1; i <= splitTime; i++) {
      let startTime = currentSTime;
      // init endtime
      let endTime = new Date(
        new Date(currentSTime).setMinutes(
          currentSTime.getMinutes() +
            (preferHoursTime * 60 + preferMinsTime) / splitTime
        )
      );

      // loop through the eventData to see if it have duplicates
      for (let prevEventData of eventData) {
        if (i === 1) {
          if (tag === "none") {
            currentSTime = endTime;
          }
        }

        if (startTime > eTime || endTime > eTime) {
          alert("範圍內時間已滿，請重新選擇");
          return;
        }

        // time range should be between available time
        if (
          prevEventData.StartTime <= startTime &&
          prevEventData.EndTime > startTime
        ) {
          console.log(startTime + "be4");
          console.log(endTime + "be4");
          currentSTime = prevEventData.EndTime;
          startTime = currentSTime;
          endTime = new Date(
            new Date(currentSTime).setMinutes(
              currentSTime.getMinutes() +
                (preferHoursTime * 60 + preferMinsTime) / splitTime
            )
          );
        } else if (
          prevEventData.StartTime <= endTime &&
          prevEventData.EndTime > endTime
        ) {
          currentSTime = prevEventData.EndTime;
          startTime = currentSTime;
          endTime = new Date(
            new Date(currentSTime).setMinutes(
              currentSTime.getMinutes() +
                (preferHoursTime * 60 + preferMinsTime) / splitTime
            )
          );
        }
      }

      console.log(startTime + "after");
      console.log(endTime + "after");
      const insertEventData = {
        Id: eventData.length + 1,
        Subject: `${title}-${i}`,
        StartTime: startTime,
        EndTime: endTime,
        IsAllDay: false,
        RecurrenceRule: null,
      };

      setEventData((eventData) => [...eventData, insertEventData]);

      if (tag === "none") {
        currentSTime = endTime;
      }
      if (tag === "morning") {
        currentSTime = new Date(currentSTime);
        currentSTime.setDate(currentSTime.getDate() + 1);
        currentSTime.setHours(6, 0, 0, 0);
      }
      if (tag === "afternoon") {
        currentSTime = new Date(currentSTime);
        currentSTime.setDate(currentSTime.getDate() + 1);
        currentSTime.setHours(12, 0, 0, 0);
      }
      if (tag === "night") {
        currentSTime = new Date(currentSTime);
        currentSTime.setDate(currentSTime.getDate() + 1);
        currentSTime.setHours(18, 0, 0, 0);
      }
      if (tag === "day") {
        currentSTime = new Date(currentSTime);
        currentSTime.setDate(currentSTime.getDate() + 1);
      }
    }
  }

  const eventSettings: EventSettingsModel = { dataSource: eventData };

  return (
    <div>
      <ScheduleComponent
        className="h-full pb-[13em]"
        currentView="Week"
        selectedDate={new Date()}
        eventSettings={eventSettings}
      >
        <ViewsDirective>
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Week" />
          <ViewDirective option="Month" />
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
          <ViewDirective option="WorkWeek" />
          <ViewDirective option="Month" />
          <ViewDirective option="Agenda" />
        </ViewsDirective>

        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
      <div className="text-[#333] w-full h-[10em] p-3 grid grid-rows-4 flex justify-center gap-3 fixed bottom-0 bg-white z-50 border">
        {/* 標題 數學作業 預計時間4小時 拆分任務數量2 就可以分成2個2小時的任務 */}
        <div className="flex justify-between gap-3">
          <label>
            標題:
            <input
              placeholder="標題"
              type="text"
              className="border rounded-md mx-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            預計時間(小時):
            <input
              placeholder="預計時間(小時)"
              type="number"
              defaultValue={1}
              className="border rounded-md mx-1"
              onChange={(e) => setPreferHoursTime(e.target.valueAsNumber)}
            />
          </label>
          <label>
            預計時間(分鐘):
            <input
              placeholder="預計時間(分鐘)"
              type="number"
              defaultValue={1}
              className="border rounded-md mx-1"
              onChange={(e) => setPreferMinsTime(e.target.valueAsNumber)}
            />
          </label>
          <label>
            拆分任務數量:
            <input
              placeholder="拆分任務數量"
              type="number"
              defaultValue={1}
              className="border rounded-md mx-1"
              onChange={(e) => setSplitTime(e.target.valueAsNumber)}
            />
          </label>
          <label>
            每個任務用時(分鐘):{" "}
            {Math.round((preferHoursTime * 60 + preferMinsTime) / splitTime)}
          </label>
        </div>
        <div className="flex justify-between gap-3">
          <label>
            開始日期:
            <input
              placeholder="開始日期"
              type="datetime-local"
              className="border rounded-md mx-1"
              onChange={(e) => setSTime(new Date(e.target.value))}
            />
          </label>
          <label>
            結束日期:
            <input
              placeholder="結束日期"
              type="datetime-local"
              className="border rounded-md mx-1"
              onChange={(e) => setETime(new Date(e.target.value))}
            />
          </label>
          <label>
            隔天:
            <input
              name="tag"
              placeholder="隔天"
              type="radio"
              id="day"
              className="border rounded-md mx-1"
              onChange={(e) => setTag(e.target.id)}
            />
          </label>
          <label>
            只有上午(6:00-12:00):
            <input
              name="tag"
              placeholder="只有上午(6:00-12:00)"
              type="radio"
              id="morning"
              className="border rounded-md mx-1"
              onChange={(e) => setTag(e.target.id)}
            />
          </label>
          <label>
            只有下午(12:00-18:00):
            <input
              name="tag"
              placeholder="只有下午(12:00-18:00)"
              type="radio"
              id="afternoon"
              className="border rounded-md mx-1"
              onChange={(e) => setTag(e.target.id)}
            />
          </label>
          <label>
            只有晚上(18:00後):
            <input
              name="tag"
              id="night"
              placeholder="只有晚上(18:00後)"
              type="radio"
              className="border rounded-md mx-1"
              onChange={(e) => setTag(e.target.id)}
            />
          </label>
          <label>
            無限制:
            <input
              defaultChecked={true}
              name="tag"
              id="none"
              placeholder="無限制"
              type="radio"
              className="border rounded-md mx-1"
              onChange={(e) => setTag(e.target.id)}
            />
          </label>
        </div>
        <button
          onClick={submitForm}
          className="bg-[#3656bb] text-white border-sky-400 rounded-md px-4"
        >
          確定
        </button>
      </div>
    </div>
  );
}

export default App;
