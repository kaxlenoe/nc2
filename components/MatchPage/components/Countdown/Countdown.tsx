import React, { useEffect, useState } from "react";
import styles from "./Countdown.module.scss";

type PropsType = {
  timeToStart: string;
};

type TimeLeftType = {
  hours?: number;
  minutes?: number;
  seconds?: number;
  days?: number;
};

const Countdown: React.FC<PropsType> = ({ timeToStart }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(timeToStart) - +new Date();
    let timeLeft: TimeLeftType = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeftType>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeToStart]);

  const formatNumber = (number: number | undefined) =>
    String(number).padStart(2, "0");

  const extraHours = timeLeft.hours;

  const formattedTime =
    timeLeft.days !== 0
      ? `${timeLeft.days}D ${extraHours} H :${formatNumber(timeLeft.minutes)}M`
      : extraHours !== 0
      ? `${extraHours}h : ${formatNumber(timeLeft.minutes)}m : ${formatNumber(
          timeLeft.seconds,
        )}s`
      : `${formatNumber(timeLeft.minutes)}M :${formatNumber(
          timeLeft.seconds,
        )}S`;

  return formattedTime ? (
    <div className={styles.wrapper}>
      <div suppressHydrationWarning={true} className={styles.formatted_time}>{formattedTime}</div>
    </div>
  ) : null;
};

export default Countdown;
