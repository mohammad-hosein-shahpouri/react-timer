function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var moment = _interopDefault(require('moment'));

function Timer(_ref) {
  var className = _ref.className;
  return React__default.createElement("div", {
    className: className
  }, "Example Component: ");
}
function StopWatch(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      _ref2$seperatorChar = _ref2.seperatorChar,
      seperatorChar = _ref2$seperatorChar === void 0 ? ',' : _ref2$seperatorChar,
      _ref2$showSeconds = _ref2.showSeconds,
      showSeconds = _ref2$showSeconds === void 0 ? 'always' : _ref2$showSeconds,
      _ref2$showMinutes = _ref2.showMinutes,
      showMinutes = _ref2$showMinutes === void 0 ? 'always' : _ref2$showMinutes,
      _ref2$showHours = _ref2.showHours,
      showHours = _ref2$showHours === void 0 ? 'always' : _ref2$showHours,
      _ref2$showDays = _ref2.showDays,
      showDays = _ref2$showDays === void 0 ? 'always' : _ref2$showDays,
      _ref2$daysText = _ref2.daysText,
      daysText = _ref2$daysText === void 0 ? 'Day' : _ref2$daysText,
      _ref2$hoursText = _ref2.hoursText,
      hoursText = _ref2$hoursText === void 0 ? 'Hour' : _ref2$hoursText,
      _ref2$minutesText = _ref2.minutesText,
      minutesText = _ref2$minutesText === void 0 ? 'Minute' : _ref2$minutesText,
      _ref2$secondsText = _ref2.secondsText,
      secondsText = _ref2$secondsText === void 0 ? 'Second' : _ref2$secondsText,
      _ref2$pluralSymbol = _ref2.pluralSymbol,
      pluralSymbol = _ref2$pluralSymbol === void 0 ? 's' : _ref2$pluralSymbol,
      onEachSecond = _ref2.onEachSecond,
      onFinish = _ref2.onFinish,
      end = _ref2.end;

  var _useState = React.useState(0),
      second = _useState[0],
      setSecond = _useState[1];

  var _useState2 = React.useState(0),
      minute = _useState2[0],
      setMinute = _useState2[1];

  var _useState3 = React.useState(0),
      hour = _useState3[0],
      setHour = _useState3[1];

  var _useState4 = React.useState(0),
      day = _useState4[0],
      setDay = _useState4[1];

  var _useState5 = React.useState(false),
      finished = _useState5[0],
      setFinished = _useState5[1];

  var holderRef = React.useRef(null);
  var timeout = 1000;
  React.useLayoutEffect(function () {
    var endTime = moment(end);
    var interval = setInterval(function () {
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
              setDay(function (state) {
                return ++state;
              });
              setHour(0);
            } else setMinute(function (state) {
              return ++state;
            });
          } else setMinute(function (state) {
            return ++state;
          });
        } else setSecond(function (state) {
          return ++state;
        });

        if (onEachSecond) onEachSecond(second, minute, hour, day);
      }
    }, timeout);
    return function () {
      clearInterval(interval);
    };
  });

  var isPlural = function isPlural(status) {
    return status >= 2 ? pluralSymbol : '';
  };

  var dayInfo = function dayInfo() {
    switch (showDays) {
      case 'always':
        return day + " " + daysText + isPlural(day);

      case 'onlyIfIsNotZero':
        return day ? day + " " + daysText + isPlural(day) : '';

      case 'ifOnStartisNotZero':
        return day + " " + daysText + isPlural(day);

      default:
        return '';
    }
  };

  var hourInfo = function hourInfo() {
    switch (showHours) {
      case 'always':
        return hour + " " + hoursText + isPlural(hour);

      case 'onlyIfIsNotZero':
        return day ? hour + " " + hoursText + isPlural(hour) : '';

      case 'ifOnStartisNotZero':
        return hour + " " + hoursText + isPlural(hour);

      default:
        return '';
    }
  };

  var minuteInfo = function minuteInfo() {
    switch (showMinutes) {
      case 'always':
        return minute + " " + minutesText + isPlural(minute);

      case 'onlyIfIsNotZero':
        return day ? minute + " " + minutesText + isPlural(minute) : '';

      case 'ifOnStartisNotZero':
        return minute + " " + minutesText + isPlural(minute);

      default:
        return '';
    }
  };

  var secondInfo = function secondInfo() {
    switch (showSeconds) {
      case 'always':
        return second + " " + secondsText + isPlural(second);

      case 'onlyIfIsNotZero':
        return day ? second + " " + secondsText + isPlural(second) : '';

      case 'ifOnStartisNotZero':
        return second + " " + secondsText + isPlural(second);

      default:
        return '';
    }
  };

  var text = "" + dayInfo() + seperatorChar + " " + hourInfo() + seperatorChar + " " + minuteInfo() + seperatorChar + " " + secondInfo();
  return React__default.createElement("span", {
    ref: holderRef,
    className: className,
    style: style
  }, text);
}

exports.StopWatch = StopWatch;
exports.Timer = Timer;
//# sourceMappingURL=index.js.map
