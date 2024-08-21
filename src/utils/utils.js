import { appInfors } from "../constants/appInfors";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Đảm bảo rằng giây luôn có 2 chữ số
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${minutes}:${formattedSeconds}`;
};

const getTime = (date) => {
  const newDate = new Date(date)
  const hour = newDate.getHours()
  const minutes = newDate.getMinutes()
  return `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}`
}

const getDate = (date) => {
  const newDate = new Date(date)
  const dayNumber = newDate.getDate()
  const monthString = appInfors.monthNames[newDate.getMonth()]
  const yearNumber = newDate.getFullYear()
  return `${dayNumber < 10 ? `0${dayNumber}` : dayNumber} ${monthString}, ${yearNumber}`
}
export {
  formatTime,
  getTime,
  getDate
}