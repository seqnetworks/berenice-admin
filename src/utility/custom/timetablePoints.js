export const timetablePoints = ({ day, start, end, code }) => {
  const days = {
    Saturday: "0",
    Sunday: "1",
    Monday: "2",
    Tuesday: "3",
    Wednesday: "4",
    Thursday: "5",
  }
  const secondPoint = days[day]
  const points = []
  let startTimeFirstPoint = (parseInt(start.slice(0, 3)) - 9) * 2
  if (start.slice(3, 5) === "30") startTimeFirstPoint = startTimeFirstPoint + 1
  let endTimeFirstPoint = (parseInt(end.slice(0, 3)) - 9) * 2
  if (end.slice(3, 5) === "30") endTimeFirstPoint = endTimeFirstPoint + 1
  points.push(`${startTimeFirstPoint}` + "." + secondPoint + "." + code)
  for (let i = 1; i <= endTimeFirstPoint - startTimeFirstPoint - 1; i++) {
    points.push(`${startTimeFirstPoint + i}` + "." + secondPoint)
  }
  points.push(`${endTimeFirstPoint}` + "." + secondPoint + "." + "0")
  return points
}
