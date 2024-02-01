import React, { useState, useContext, useEffect } from "react"
import { Spinner, CustomInput } from "reactstrap"
import { Trash, Edit } from "react-feather"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl, FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Divider } from "@material-ui/core"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import { AbilityContext } from "../../../../utility/context/Can"
import Dialog from "../../../../custom/dialog/dialog.component"
import Select from "../../../../custom/select/select.component"
import CustomForm from "../../../../custom/customform/customform.component"
import weekDaysArray from "../../../../utility/custom/weekDaysArray"
import { useRTL } from "../../../../utility/hooks/useRTL"
import { rooms } from "../../../../utility/custom/rooms"
import {
  deleteClassAsync,
  updateClassAsync,
  getAvailableLecturersForClassAsync,
  clearUpdateClassErrorMessage,
  clearDeleteClassErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectSelectedClassAvailableLecturers,
  selectUpdateClassErrorMessage,
  selectUpdateClassIsLoading,
  selectDeleteClassErrorMessage,
  selectDeleteClassIsLoading,
  selectGetAvailableLecturersForClassErrorMessage,
  selectGetAvailableLecturersForClassIsLoading,
} from "../../../../redux/index.selectors"

const UpdateClass = ({
  oneClass,
  formik,
  fields,
  isLoading,
  availableLecturers,
  rtl,
  lecturers,
  setLecturers,
}) => {
  const intl = useIntl()

  useEffect(() => {
    if (availableLecturers) {
      let selectedLecturers = []
      oneClass.lecturerUuids.map(uuid => {
        availableLecturers.map(lec => {
          if (lec.uuid == uuid)
            selectedLecturers.push({
              label: rtl ? lec.fullNameArabic : lec.fullName,
              value: lec.uuid,
            })
        })
      })
      setLecturers(selectedLecturers)
    }
  }, [availableLecturers])

  let lecturersArray = []
  if (availableLecturers)
    availableLecturers.map(lec =>
      lecturersArray.push({
        label: rtl ? lec.fullNameArabic : lec.fullName,
        value: lec.uuid,
      })
    )

  return (
    <CustomForm
      formik={formik}
      fields={fields}
      buttonTitle={intl.formatMessage({ id: "EDIT.CLASS" })}
      isLoading={isLoading}
      fullControl={lecturers.length}
      additionalFields={[
        <Select
          value={lecturers}
          handleChange={e => setLecturers(e)}
          array={lecturersArray}
          label={intl.formatMessage({ id: "LECTURERS" })}
          isMulti={true}
        />,
      ]}
    />
  )
}

//----------WITH SPINNER---------
const UpdateClassWithSpinner = WithSpinner(UpdateClass)
//-------------------------------
const ClassesTableRow = ({
  oneClass,
  deleteClass,
  updateClass,
  availableLecturers,
  getAvailableLecturersForClass,
  clearUpdateClassErrorMessage,
  clearDeleteClassErrorMessage,
  updateClassErrorMessage,
  updateClassIsLoading,
  deleteClassErrorMessage,
  deleteClassIsLoading,
  getAvailableLecturersForClassErrorMessage,
  getAvailableLecturersForClassIsLoading,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)
  const [rtl] = useRTL()

  const [deleteClassAlert, setDeleteClassAlert] = useState(false)
  const [lecturers, setLecturers] = useState([])

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  const updateClassValidationSchema = Yup.object().shape({
    room: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    day: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    startTime: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    endTime: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const updateClassFields = [
    {
      title: intl.formatMessage({ id: "DAY" }),
      value: "day",
      type: "select",
      options: weekDaysArray(intl),
    },
    {
      title: intl.formatMessage({ id: "ROOM" }),
      value: "room",
      type: "select",
      options: rooms,
    },
    {
      title: intl.formatMessage({ id: "START.TIME" }),
      value: "startTime",
      type: "time",
    },
    {
      title: intl.formatMessage({ id: "END.TIME" }),
      value: "endTime",
      type: "time",
    },
  ]

  const updateClassFormik = useFormik({
    initialValues: {
      room: oneClass.room,
      day: oneClass.day,
      startTime: oneClass.startTime.slice(0, 5),
      endTime: oneClass.endTime.slice(0, 5),
    },
    enableReinitialize: true,
    validationSchema: updateClassValidationSchema,
    onSubmit: values => {
      let lecturerUuids = []
      if (lecturers.length) lecturers.map(lec => lecturerUuids.push(lec.value))
      updateClass({ ...values, lecturerUuids }, oneClass.uuid, {
        success: {
          title: intl.formatMessage({ id: "UPDATE.CLASS.SUCCESS.TITLE" }),
          content: intl.formatMessage({
            id: "UPDATE.CLASS.SUCCESS.CONTENT",
          }),
        },
      })
    },
  })

  const deleteClassDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETING.CLASS.FROM.TIMETABLE" }),
      content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FormattedMessage id="ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.CLASS.FROM.TIMETABLE" />{" "}
          <Divider variant="middle" />{" "}
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <CustomInput
              onChange={e => {
                if (e.target.checked) setDeleteClassAlert(true)
                else setDeleteClassAlert(false)
              }}
              checked={deleteClassAlert}
              type="checkbox"
              id="alert"
              style={{ marginRight: "10px" }}
            />
            <FormattedMessage id="DELETING.CLASS.ALERT" />
          </div>
        </div>
      ),
      actions: [
        {
          title: deleteClassIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "DELETE" })
          ),
          color: "primary",
          clickHandler: () =>
            deleteClass(oneClass.uuid, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.CLASS.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.CLASS.SUCCESS.CONTENT",
                }),
              },
            }),
          disabled: deleteClassIsLoading || !deleteClassAlert,
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteClassIsLoading,
        },
      ],
    },
    errorMessage: deleteClassErrorMessage,
    isLoading: deleteClassIsLoading,
    closingAction: () => {
      clearDeleteClassErrorMessage()
      setDeleteClassAlert(false)
    },
  }

  const updateClassDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Edit size={20} />,
      className: "btn-icon p-50 ",
    },
    dialog: {
      title: intl.formatMessage({ id: "EDITING.CLASS" }),
      content: (
        <UpdateClassWithSpinner
          errorMessage={getAvailableLecturersForClassErrorMessage}
          isLoading={getAvailableLecturersForClassIsLoading}
          toBeDispatchedUseEffect={getAvailableLecturersForClass}
          toBeDispatchedPropsUseEffect={oneClass.uuid}
          toBeDispatchedTryAgain={getAvailableLecturersForClass}
          toBeDispatchedPropsTryAgain={oneClass.uuid}
          formik={updateClassFormik}
          fields={updateClassFields}
          isLoading={updateClassIsLoading}
          availableLecturers={availableLecturers}
          rtl={rtl}
          oneClass={oneClass}
          lecturers={lecturers}
          setLecturers={setLecturers}
        />
      ),
    },
    errorMessage: updateClassErrorMessage,
    isLoading: updateClassIsLoading,
    closingAction: () => {
      clearUpdateClassErrorMessage()
      updateClassFormik.resetForm()
    },
  }
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {oneClass.subjectCode ? oneClass.subjectCode : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {oneClass.intakeCode ? oneClass.intakeCode : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {oneClass.room ? oneClass.room : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {oneClass.day
            ? intl.formatMessage({ id: oneClass.day.toUpperCase() })
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {oneClass.startTime && oneClass.endTime
            ? oneClass.startTime.slice(0, 5) +
              " - " +
              oneClass.endTime.slice(0, 5)
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "class-DELETE") && (
            <Dialog {...deleteClassDialogAttributes} />
          )}
          {ability.can("manage", "class-PUT") && (
            <Dialog {...updateClassDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  availableLecturers: selectSelectedClassAvailableLecturers,
  updateClassErrorMessage: selectUpdateClassErrorMessage,
  updateClassIsLoading: selectUpdateClassIsLoading,
  deleteClassErrorMessage: selectDeleteClassErrorMessage,
  deleteClassIsLoading: selectDeleteClassIsLoading,
  getAvailableLecturersForClassErrorMessage: selectGetAvailableLecturersForClassErrorMessage,
  getAvailableLecturersForClassIsLoading: selectGetAvailableLecturersForClassIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteClass: (classUuid, messages) =>
    dispatch(deleteClassAsync(classUuid, messages)),
  updateClass: (requestBody, classUuid, messages) =>
    dispatch(updateClassAsync(requestBody, classUuid, messages)),
  getAvailableLecturersForClass: classUuid =>
    dispatch(getAvailableLecturersForClassAsync(classUuid)),
  clearUpdateClassErrorMessage: () => dispatch(clearUpdateClassErrorMessage()),
  clearDeleteClassErrorMessage: () => dispatch(clearDeleteClassErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassesTableRow)
