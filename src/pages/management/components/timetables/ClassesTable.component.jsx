import React, { useState, useContext, useEffect } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Plus, RefreshCw } from "react-feather"
import { Button, Card, CardBody, Input, Label } from "reactstrap"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useIntl, FormattedMessage } from "react-intl"
import { Divider } from "@material-ui/core"
import { AbilityContext } from "../../../../utility/context/Can"
import Dialog from "../../../../custom/dialog/dialog.component"
import Select from "../../../../custom/select/select.component"
import CustomForm from "../../../../custom/customform/customform.component"
import ClassesTableRow from "./ClassesTableRow.component"
import Table from "../../../../custom/table/table.component"
import weekDaysArray from "../../../../utility/custom/weekDaysArray"
import { advancedFilteringAND } from "../../../../utility/custom/advancedFilteringAND"
import { useRTL } from "../../../../utility/hooks/useRTL"
import { rooms } from "../../../../utility/custom/rooms"
import {
  getAllClassesAsync,
  getAllSubjectsAsync,
  getAllIntakesAsync,
  createClassAsync,
  clearCreateClassErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectAllClasses,
  selectAllIntakes,
  selectAllSubjects,
  selectAllSubjectsWithLecturer,
  selectCreateClassErrorMessage,
  selectCreateClassIsLoading,
} from "../../../../redux/index.selectors"

const ClassesTable = ({
  day,
  classes,
  intakes,
  subjects,
  subjectsWithLecturer,
  getAllClasses,
  getAllSubjects,
  getAllIntakes,
  createClass,
  clearCreateClassErrorMessage,
  createClassErrorMessage,
  createClassIsLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedLecturers, setSelectedLecturers] = useState([])
  const [selectStateSubject, setSelectedStateSubject] = useState([])
  const [selectStateIntake, setSelectedStateIntake] = useState([])
  const [
    selectedSubjectWithLecturer,
    setSelectedSubjectWithLecturer,
  ] = useState({ label: "", value: "" })

  useEffect(() => setSelectedLecturers([]), [selectedSubjectWithLecturer])

  const intl = useIntl()
  const [rtl] = useRTL()
  const ability = useContext(AbilityContext)

  let lecturersArray = []
  if (selectedSubjectWithLecturer.value) {
    lecturersArray.push({
      label: rtl
        ? selectedSubjectWithLecturer.value.lecturerFullNameArabic
        : selectedSubjectWithLecturer.value.lecturerFullName,
      value: selectedSubjectWithLecturer.value.lecturerUuid,
    })
    if (selectedSubjectWithLecturer.value.lecturerAssistant.length > 0)
      selectedSubjectWithLecturer.value.lecturerAssistant.map(lecturer =>
        lecturersArray.push({
          label: rtl
            ? lecturer.lecturerFullNameArabic
            : lecturer.lecturerFullName,
          value: lecturer.uuid,
        })
      )
  }

  let filteredClasses = [],
    subjectsFilteringArray = [],
    intakesFilteringArray = [],
    subjectsWithLecturerArray = []
  if (intakes && subjects) {
    subjects.map(subject =>
      subjectsFilteringArray.push({
        value: subject.subjectCode,
        label:
          subject.subjectCode +
          " - " +
          subject.subjectTitle +
          " - " +
          subject.subjectTitleArabic,
      })
    )
    intakes.map(intakes =>
      intakesFilteringArray.push({
        value: intakes.code,
        label: intakes.code,
      })
    )
  }

  if (subjectsWithLecturer) {
    subjectsWithLecturer.map(subject =>
      subjectsWithLecturerArray.push({
        label: subject.subjectCode + " - " + subject.intakeCode,
        value: subject,
      })
    )
  }

  if (classes) {
    if (day)
      classes.map(oneClass => {
        if (oneClass.day === day) filteredClasses.push(oneClass)
      })
    filteredClasses = advancedFilteringAND({
      state: selectStateIntake,
      givenArray: day ? filteredClasses : classes,
      filteringObject: [
        {
          parent: intl.formatMessage({ id: "INTAKES" }),
          attribute: "intakeCode",
        },
      ],
    })
    filteredClasses = advancedFilteringAND({
      state: selectStateSubject,
      givenArray: filteredClasses,
      filteringObject: [
        {
          parent: intl.formatMessage({ id: "SUBJECTS" }),
          attribute: "subjectCode",
        },
      ],
    })
  }

  const createClassValidationSchema = Yup.object().shape({
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

  const createClassFields = [
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

  const createClassFormik = useFormik({
    initialValues: {
      room: "",
      day: day ? day : "",
      startTime: "",
      endTime: "",
    },
    enableReinitialize: true,
    validationSchema: createClassValidationSchema,
    onSubmit: values =>
      createClass(
        {
          ...values,
          lecturerSubjectUuid:
            selectedSubjectWithLecturer.value.lecturerSubjectUuid,
          lecturerUuids: selectedLecturers,
        },
        {
          success: {
            title: intl.formatMessage({ id: "CREATE.CLASS.SUCCESS.TITLE" }),
            content: intl.formatMessage({
              id: "CREATE.CLASS.SUCCESS.CONTENT",
            }),
          },
        }
      ),
  })

  const createClassDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1",
    },
    dialog: {
      title: intl.formatMessage({ id: "ADDING.CLASS.TO.TIMETABLE" }),
      content: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Select
            handleChange={e => setSelectedSubjectWithLecturer(e)}
            height={200}
            label={intl.formatMessage({ id: "SUBJECT" })}
            value={selectedSubjectWithLecturer}
            array={subjectsWithLecturerArray}
            fixed={true}
            stylesClassnames="mb-25"
          />
          <Divider vatiant="middle" />
          <Label>
            <FormattedMessage id="SUBJECT.CODE" />
          </Label>
          <Input
            disabled
            value={
              selectedSubjectWithLecturer
                ? selectedSubjectWithLecturer.value.subjectCode
                : ""
            }
          />
          <Label>
            <FormattedMessage id="INTAKE.CODE" />
          </Label>
          <Input
            disabled
            value={
              selectedSubjectWithLecturer
                ? selectedSubjectWithLecturer.value.intakeCode
                : ""
            }
          />
          <Select
            handleChange={e => setSelectedLecturers(e)}
            height={200}
            label={intl.formatMessage({ id: "LECTURERS" })}
            value={selectedLecturers}
            array={lecturersArray}
            fixed={true}
            disabled={!selectedSubjectWithLecturer.value}
            stylesClassnames="mb-25"
            isMulti={true}
          />
          <Divider vatiant="middle" />
          <CustomForm
            formik={createClassFormik}
            fields={createClassFields}
            buttonTitle={intl.formatMessage({ id: "ADD.CLASS" })}
            isLoading={createClassIsLoading}
            buttonStatus={
              !selectedSubjectWithLecturer.value ||
              selectedLecturers.length === 0
            }
          />
        </div>
      ),
    },
    errorMessage: createClassErrorMessage,
    isLoading: createClassIsLoading,
    closingAction: () => {
      createClassFormik.resetForm()
      clearCreateClassErrorMessage()
      setSelectedSubjectWithLecturer({ value: "", label: "" })
      setSelectedLecturers([])
    },
  }

  const tableAttributes = {
    buttons: [
      <Button
        className="px-1 ml-50"
        color="primary"
        onClick={() => {
          getAllClasses()
          getAllSubjects()
          getAllIntakes()
        }}
      >
        <RefreshCw size={15} />
      </Button>,
    ],
    select: [
      {
        array: [
          {
            label: intl.formatMessage({ id: "SUBJECTS" }),
            options: subjectsFilteringArray,
          },
        ],
        handleChange: e => setSelectedStateSubject(e),
        placeHolder: intl.formatMessage({ id: "SELECT.SUBJECT" }),
        isMulti: true,
        isGrouped: true,
      },
      {
        array: [
          {
            label: intl.formatMessage({ id: "INTAKES" }),
            options: intakesFilteringArray,
          },
        ],
        handleChange: e => setSelectedStateIntake(e),
        placeHolder: intl.formatMessage({ id: "SELECT.INTAKE" }),
        isMulti: true,
        isGrouped: true,
      },
    ],
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
      currentPage: currentPage,
    },
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "SUBJECT" }),
        },
        {
          title: intl.formatMessage({ id: "INTAKE" }),
        },
        {
          title: intl.formatMessage({ id: "ROOM" }),
        },
        {
          title: intl.formatMessage({ id: "DAY" }),
        },
        {
          title: intl.formatMessage({ id: "TIME.RANGE" }),
          styles: { minWidth: "150px" },
        },
        { title: "" },
      ],
      row: oneClass => <ClassesTableRow oneClass={oneClass} />,
    },
    givenArray: filteredClasses,
    title: intl.formatMessage({ id: "TIMETABLE" }),
    emptyMessage: !day
      ? intl.formatMessage({
          id: "NO.CLASSES.ADDED.TO.THE.TIMETABLE",
        })
      : intl.formatMessage({
          id: "NO.CLASSES.ADDED.TO.THE.TIMETABLE",
        }) +
        intl.formatMessage({
          id: "ON",
        }) +
        intl.formatMessage({
          id: day.toUpperCase(),
        }),
  }

  if (ability.can("manage", "class-POST"))
    tableAttributes.buttons = [
      <Dialog {...createClassDialogAttributes} />,
      ...tableAttributes.buttons,
    ]

  return (
    <Card>
      <CardBody>
        <Table {...tableAttributes} />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  classes: selectAllClasses,
  intakes: selectAllIntakes,
  subjects: selectAllSubjects,
  subjectsWithLecturer: selectAllSubjectsWithLecturer,
  createClassErrorMessage: selectCreateClassErrorMessage,
  createClassIsLoading: selectCreateClassIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllClasses: () => dispatch(getAllClassesAsync()),
  getAllSubjects: () => dispatch(getAllSubjectsAsync()),
  getAllIntakes: () => dispatch(getAllIntakesAsync()),
  createClass: (requestBody, messages) =>
    dispatch(createClassAsync(requestBody, messages)),
  clearCreateClassErrorMessage: () => dispatch(clearCreateClassErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassesTable)
