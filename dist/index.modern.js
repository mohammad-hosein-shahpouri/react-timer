import React, { useState, useRef, useLayoutEffect } from 'react';
import moment from 'moment';

function Timer({
  className
}) {
  return React.createElement("div", {
    className: className
  }, "Example Component: ");
}
function StopWatch({
  className,
  style,
  seperatorChar = ',',
  showSeconds = 'always',
  showMinutes = 'always',
  showHours = 'always',
  showDays = 'always',
  daysText = 'Day',
  hoursText = 'Hour',
  minutesText = 'Minute',
  secondsText = 'Second',
  pluralSymbol = 's',
  onEachSecond,
  onFinish,
  end
}) {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(0);
  const [finished, setFinished] = useState(false);
  const holderRef = useRef(null);
  const timeout = 1000;
  useLayoutEffect(() => {
    var endTime = moment(end);
    var interval = setInterval(() => {
      if (end) {
        var now = moment(new Date());

        if (now.isBefore(endTime)) {
          clearInterval(interval);
          setFinished(true);
          if (onFinish) onFinish();
        }
      }

      if (!finished) {
        if (second == 59) {
          setSecond(0);

          if (minute == 59) {
            setMinute(0);

            if (hour == 23) {
              setDay(state => ++state);
              setHour(0);
            } else setMinute(state => ++state);
          } else setMinute(state => ++state);
        } else setSecond(state => ++state);

        if (onEachSecond) onEachSecond(second, minute, hour, day);
      }
    }, timeout);
    return () => {
      clearInterval(interval);
    };
  });

  const isPlural = status => status >= 2 ? pluralSymbol : '';

  const dayInfo = () => {
    switch (showDays) {
      case 'always':
        return `${day} ${daysText}${isPlural(day)}`;

      case 'onlyIfIsNotZero':
        return day ? `${day} ${daysText}${isPlural(day)}` : '';

      case 'ifOnStartisNotZero':
        return `${day} ${daysText}${isPlural(day)}`;

      default:
        return '';
    }
  };

  const hourInfo = () => {
    switch (showHours) {
      case 'always':
        return `${hour} ${hoursText}${isPlural(hour)}`;

      case 'onlyIfIsNotZero':
        return day ? `${hour} ${hoursText}${isPlural(hour)}` : '';

      case 'ifOnStartisNotZero':
        return `${hour} ${hoursText}${isPlural(hour)}`;

      default:
        return '';
    }
  };

  const minuteInfo = () => {
    switch (showMinutes) {
      case 'always':
        return `${minute} ${minutesText}${isPlural(minute)}`;

      case 'onlyIfIsNotZero':
        return day ? `${minute} ${minutesText}${isPlural(minute)}` : '';

      case 'ifOnStartisNotZero':
        return `${minute} ${minutesText}${isPlural(minute)}`;

      default:
        return '';
    }
  };

  const secondInfo = () => {
    switch (showSeconds) {
      case 'always':
        return `${second} ${secondsText}${isPlural(second)}`;

      case 'onlyIfIsNotZero':
        return day ? `${second} ${secondsText}${isPlural(second)}` : '';

      case 'ifOnStartisNotZero':
        return `${second} ${secondsText}${isPlural(second)}`;

      default:
        return '';
    }
  };

  var text = `${dayInfo()}${seperatorChar} ${hourInfo()}${seperatorChar} ${minuteInfo()}${seperatorChar} ${secondInfo()}`;
  return React.createElement("span", {
    ref: holderRef,
    className: className,
    style: style
  }, text);
}

export { StopWatch, Timer };
//# sourceMappingURL=index.modern.js.map
