import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import moment from "moment";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { FetchUsers } from "../../redux/features/AsignUserSlice";
import Tasks from "../../components/Tasks";
import { CreateTask, getAllTasks } from "../../redux/features/TaskSlice";
import TimePicker from "react-time-picker";

const DashBoard = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [showCalendar, setCalender] = useState(false);
  const [time, onChangetime] = useState("10:00");
  const todaysDate = moment(new Date()).format("L");
  const [date, setDate] = useState(todaysDate);

  const [value, setValue] = useState("10:00");
  const [asignee, setAssignee] = useState();
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.users);
  const [taskDescription, setTaskDescription] = useState();
  const { loading } = useSelector((store) => store.tasks);

  console.log(loading);


  useEffect(() => {
    dispatch(FetchUsers());
    dispatch(getAllTasks());
  }, []);


  const toggleModal = () => {
    setShouldShow(!shouldShow);
  };
  const handleSelect = (date) => {
    const newDate = moment(date).format("L");
    setDate(newDate);
    setCalender(!showCalendar);
  };

  const handleSetUser = (e) => {
    setAssignee(e.target.value);
  };
  const handleSetTaskDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handlCreateTask = (e) => {
    const date = new Date();

    e.preventDefault();
    const newTask = {
      assigned_user: asignee,
      task_date: date,
      task_time: time,
      is_completed: 1,
      time_zone: date.getTimezoneOffset(),
      task_msg: taskDescription,
    };

    console.log(newTask);
    dispatch(CreateTask(newTask));
  };
  return (
    <div className="flex px-[1rem] py-[2rem] text-gray-600">
      <div className="md:w-1/3 w-full">
        <div className="border rounded-md w-full">
          <div className="text-gray-600 border-b px-1 text-sm flex items-center justify-between">
            <h1 className="text-sm py-2 pl-2 font-bold">
              TASKS <span className="text-xs">0</span>
            </h1>
            <div
              onClick={toggleModal}
              title="New Task"
              className="py-2 border-l px-2 font-semibold text-lg cursor-pointer"
            >
              {shouldShow ? "-" : "+"}
            </div>
          </div>
          {shouldShow && (
            <form onSubmit={handlCreateTask}>
              <div className="bg-indigo-50 p-2">
                <h1 className="text-sm font-medium">Task Description</h1>
                <div className="flex items-center px-2 mt-1 bg-white border rounded border-gray-200">
                  <input
                    required
                    onChange={handleSetTaskDescription}
                    type="text"
                    className="outline-white h-[1.8rem] w-full border-none"
                  />
                  <span className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
                <div className="flex space-x-2 mt-2">
                  <div className="w-1/2">
                    <h1 className="text-sm font-medium">Date</h1>
                    <div>
                      <div className="flex flex-row-reverse items-center px-2 mt-1 bg-white border rounded border-gray-200">
                        <input
                          value={date}
                          onClick={() => setCalender(!showCalendar)}
                          type="text"
                          readOnly
                          className="h-[1.8rem] appearance-none w-full border-none"
                        />
                        <span className="text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 text-gray-700 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </span>
                      </div>
                      {showCalendar && (
                        <div className="absolute z-10">
                          <Calendar onChange={handleSelect} date={new Date()} />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <h1 className="text-sm font-medium">Time</h1>
                    <div>
                      <div className="flex flex-row-reverse items-center px-2 mt-1 bg-white border rounded border-gray-200">
                        <input
                          value={time}
                          onChange={(value) => onChangetime(value)}
                          type="text"
                          className="outline-none ring-transparent h-[1.8rem] w-full border-none"
                        />
                        <span className="text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </div>
                      {/* {showCalendar && ( */}
                      <div></div>
                      {/* )} */}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <h1 className="mt-3">Assign user</h1>
                  <select
                    onChange={handleSetUser}
                    className="w-full rounded-sm mt-1 outline-none border-none h-8 text-sm appearance-none"
                    name="cars"
                    id="cars"
                  >
                    {users ? (
                      users.map((user, index) => {
                        return (
                          <option key={index} value={user.id}>
                            {user.name}
                          </option>
                        );
                      })
                    ) : (
                      <option value="saab">No user to fetch</option>
                    )}
                  </select>
                </div>
                <div className="flex justify-between px-3 text-sm space-x-2 py-4 relative">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </span>
                  <div className="space-x-2">
                    <button onClick={toggleModal}>Cancel</button>
                    <button
                      disabled={loading}
                      className={
                        loading ? "cursor-not-allowed  opacity-30" : ""
                      }
                      className="bg-green-600 font-medium text-sm px-4 py-1.5 opacity-80 rounded-sm text-white"
                    >
                      Save
                    </button>
                    {/* <TimeInput /> */}
                  </div>
                </div>
              </div>
            </form>
          )}
          <div className="px-2 py-2">
            <Tasks />
          </div>
        </div>
      </div>
      <div className="md:w-2/3"></div>
    </div>
  );
};

export default DashBoard;
