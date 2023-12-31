import React, { useContext } from 'react';
import { minutesNumber, hourNumber } from '../utils/fixNumber';
import useSelect from '../hooks/useSelect';
import { AlarmContext } from '../context/Alarm';
import './alarmOption.css';
import SandClockSpinner from '../Loader/SandClock';

const AlarmOption = () => {
  const [hour, setHour] = useSelect('Hour');
  const [minutes, setMinutes] = useSelect('Minutes');
  const [amPmOption, setAmPmOption] = useSelect('AM/PM');
  const { setAlarmTime, pauseAlarm, hasAlarm, setHasAlarm, showSpinner } =
    useContext(AlarmContext);

  const { setIsAlarmTriggered } = useContext(AlarmContext);

  const setAlarm = () => {
    // Toggle alarm OFF
    if (hasAlarm) {
      pauseAlarm();
      setHasAlarm(false);
      return;
    }
    // Toggle alarm ON
    if (
      !hour.includes('Hour') &&
      !minutes.includes('Minutes') &&
      !amPmOption.includes('AM/PM')
    ) {
      const alarmTimeStr = `${hour}:${minutes} ${amPmOption}`;
      setAlarmTime(alarmTimeStr);
      setHasAlarm(true);
    }
  };
  return (
    <div className="option-container">
      <div className={`wrapper-option ${hasAlarm && 'disable'}`}>
      {showSpinner && <SandClockSpinner isWider={true} />}
        <select {...setHour}>
          <option disabled value="Hour">
            Hour
          </option>
          {hourNumber.map((hour, index) => (
            <option key={index} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <select {...setMinutes}>
          <option disabled value="Minutes">
            Minutes
          </option>
          {minutesNumber.map((minutes, index) => (
            <option key={index} value={minutes}>
              {minutes}
            </option>
          ))}
        </select>
        <select {...setAmPmOption}>
          <option disabled value="AM/PM">
            AM/PM
          </option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button
        onClick={setAlarm}
        className={`setAlarm-btn ${hasAlarm && 'play'}`}
        disabled={showSpinner}
      >
        {hasAlarm ? 'Clear Alarm' : 'Set Alarm'}
      </button>
    </div>
  );
};

export default AlarmOption;
