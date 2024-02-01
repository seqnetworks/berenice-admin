export const advancedFilteringAND = ({
  givenArray,
  state,
  filteringObject,
}) => {
  let filteringObjectAssistant = {}
  let testingArray = []
  const nothing = () => {}

  filteringObject.map(
    item =>
      (filteringObjectAssistant[item.parent] = {
        array: [],
        attribute: item.attribute,
      })
  )

  state.map(item =>
    filteringObjectAssistant[item.parent].array.push(item.value)
  )

  let comparingNo = 0
  filteringObject.map(arrayObject =>
    filteringObjectAssistant[arrayObject.parent].array.length !== 0
      ? comparingNo++
      : nothing()
  )

  testingArray = givenArray.filter(givenArrayItem => {
    let givenArrayItemNo = 0
    filteringObject.map(arrayObject =>
      filteringObjectAssistant[arrayObject.parent].array.length !== 0
        ? filteringObjectAssistant[arrayObject.parent].array.includes(
            givenArrayItem[arrayObject.attribute]
          )
          ? givenArrayItemNo++
          : nothing()
        : nothing()
    )
    return givenArrayItemNo >= comparingNo
  })

  return testingArray
}
