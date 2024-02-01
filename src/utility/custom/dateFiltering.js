export const dateFiltering = (filteringDate, selectedDate) => {
  const filteringDateFromYear = filteringDate.slice(0, 4)
  const filteringDateFromMonth = filteringDate.slice(5, 7)
  const filteringDateFromDay = filteringDate.slice(8, 10)
  const filteringDateToYear = filteringDate.slice(14, 18)
  const filteringDateToMonth = filteringDate.slice(19, 21)
  const filteringDateToDay = filteringDate.slice(22, 24)
  const selectedDateYear = selectedDate.slice(0, 4)
  const selectedDateMonth = selectedDate.slice(5, 7)
  const selectedDateDay = selectedDate.slice(8, 10)
  if (filteringDate.length === 10) {
    if (
      selectedDateYear === filteringDateFromYear &&
      selectedDateMonth === filteringDateFromMonth &&
      selectedDateDay === filteringDateFromDay
    )
      return true
    else return false
  } else {
    if (
      selectedDateYear >= filteringDateFromYear &&
      selectedDateYear <= filteringDateToYear &&
      selectedDateMonth >= filteringDateFromMonth &&
      selectedDateMonth <= filteringDateToMonth &&
      selectedDateDay >= filteringDateFromDay &&
      selectedDateDay <= filteringDateToDay
    )
      return true
    else return false
  }
}
