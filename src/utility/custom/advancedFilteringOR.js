export const advancedFilteringOR = ({ givenArray, state, filteringObject }) => {
  let filteredArray = []
  let entered = false
  let filteringObjectAssistant = {}

  filteringObject.map(item => {
    filteringObjectAssistant[item.parent] = {
      array: [],
      attribute: item.attribute,
    }
  })

  state.map(item =>
    filteringObjectAssistant[item.parent].array.push(item.value)
  )

  filteringObject.map(arrayObject => {
    if (filteringObjectAssistant[arrayObject.parent].array.length !== 0) {
      filteringObjectAssistant[arrayObject.parent].array.map(
        arrayObjectArrayItem =>
          givenArray.map(givenArrayItem => {
            if (givenArrayItem[arrayObject.attribute] === arrayObjectArrayItem)
              filteredArray.push(givenArrayItem)
          })
      )
      entered = true
    }
  })
  if (filteredArray.length === 0 && entered == false) filteredArray = givenArray
  return filteredArray
}
