import React, { createContext, useEffect, useState } from 'react';
import months from '../constants/months';
import Sound from '../assets/mixkit-casino-win-alarm-and-coins-1990.mp3';

const alarm = new Audio(Sound);
export const AlarmContext = createContext();

function Alarm({ children }) {
  const [hourDigital, setHourDigital] = useState('');
  const [minutesDigital, setMinutesDigital] = useState('');
  const [amPm, setAmPm] = useState('');
  const [dayNow, setDayNow] = useState('');
  const [monthNow, setMonthNow] = useState('');
  const [yearNow, setYearNow] = useState('');
  const [alarmTime, setAlarmTime] = useState('');
  const [hasAlarm, setHasAlarm] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let date = new Date();
      let HH = date.getHours();
      let MM = date.getMinutes();
      let day = date.getDate();
      let month = date.getMonth();
      let year = date.getFullYear();
      let ampm;

      if (HH >= 12) {
        HH = HH - 12;
        ampm = 'PM';
      } else {
        ampm = 'AM';
      }
      if (HH === 0) HH = 12;
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;

      setHourDigital(HH);
      setMinutesDigital(MM);
      setAmPm(ampm);
      setDayNow(day);
      setMonthNow(months[month]);
      setYearNow(year);

      const currentTime = new Date();
      const currentSecond = currentTime.getSeconds();

      // 12:24 pm
      console.log(alarmTime);
      if (alarmTime) {
        if (alarmTime != `${hourDigital}:${minutesDigital} ${amPm}`) {
          setShowSpinner(false);
        } else {
          setShowSpinner(true);
        }
      } else {
        if (currentSecond >= hourDigital && currentSecond < 60) {
          setShowSpinner(true);
        } else {
          setShowSpinner(false);
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [hourDigital, minutesDigital]);

  const pauseAlarm = () => {
    alarm.pause();
    setAlarmTime('');
  };
  return (
    <AlarmContext.Provider
      value={{
        hourDigital,
        minutesDigital,
        amPm,
        dayNow,
        monthNow,
        yearNow,
        alarmTime,
        setAlarmTime,
        pauseAlarm,
        hasAlarm,
        setHasAlarm,
        showSpinner,
      }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

export default Alarm;
