import { useEffect } from "react"

import { handleRTL } from "../../redux/layout/layout.actions"
import { useDispatch, useSelector } from "react-redux"

export const useRTL = () => {
  const dispatch = useDispatch()
  const isRtl = useSelector(state => state.layout.isRTL)

  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(isRtl) : value
      dispatch(handleRTL(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const element = document.getElementsByTagName("html")[0]
    if (isRtl) {
      element.setAttribute("dir", "rtl")
    } else {
      element.setAttribute("dir", "ltr")
    }
  }, [isRtl])

  return [isRtl, setValue]
}
