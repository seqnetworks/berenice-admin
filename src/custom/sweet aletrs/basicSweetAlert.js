import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export const basicSweetAlert = ({
  title,
  content,
  buttonTitle,
  buttonClassName,
  type,
  html,
  additional,
}) => {
  const sweetAlert = withReactContent(Swal)

  if (!additional)
    return sweetAlert.fire({
      title: title,
      text: content,
      html: html,
      confirmButtonText: buttonTitle,
      icon: type,
      customClass: {
        confirmButton: buttonClassName,
      },
    })
  else
    return sweetAlert
      .fire({
        title: title,
        text: content,
        html: html,
        confirmButtonText: buttonTitle,
        showDenyButton: true,
        denyButtonText: additional.text,
        icon: type,
        customClass: {
          confirmButton: buttonClassName,
          denyButton: additional.className,
        },
      })
      .then(results => {
        if (results.isDenied) additional.action()
      })
}
