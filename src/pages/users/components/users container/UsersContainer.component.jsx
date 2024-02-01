import React, { useState, useContext } from "react"
import { useIntl } from "react-intl"
import { connect } from "react-redux"
import { useFormik } from "formik"
import { User, Users, Plus, Image } from "react-feather"
import { createStructuredSelector } from "reselect"
import { Card, CardBody, Button } from "reactstrap"
import CardViewerHorizontalNav from "../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import { AbilityContext } from "../../../../utility/context/Can"
import UsersTable from "../users table/UsersTable.component"
import AllStaffTableRow from "../all staff table/AllStaffTableRow.component"
import StudentsTableRow from "../students table/StudentsTableRow.component"
import LecturersTableRow from "../lecturers table/LecturersTableRow.component"
import GuardiansTableRow from "../guardians table/GuardiansTableRow.component"
import LinkStudentsToGuardian from "../guardians table/LinkStudentsToGuardian.component"
import {
  selectAllStaff,
  selectGetAllStaffErrorMessage,
  selectGetAllStaffIsLoading,
  selectAddStaffErrorMessage,
  selectAddStaffIsLoading,
  selectStudents,
  selectGetStudentsErrorMessage,
  selectGetStudentsIsLoading,
  selectAddStudentErrorMessage,
  selectAddStudentIsLoading,
  selectGuardians,
  selectGetGuardiansErrorMessage,
  selectGetGuardiansIsLoading,
  selectAddGuardianErrorMessage,
  selectAddGuardianIsLoading,
  selectLecturers,
  selectGetLecturersErrorMessage,
  selectGetLecturersIsLoading,
  selectAddLecturerErrorMessage,
  selectAddLecturerIsLoading,
  selectGetAllIntakesErrorMessage,
  selectGetAllIntakesIsLoading,
} from "../../../../redux/index.selectors"
import {
  getAllStaffAsync,
  getStudentsAsync,
  getGuardiansAsync,
  getLecturersAsync,
  addStaffAsync,
  addStudentAsync,
  addGuardianAsync,
  addLecturerAsync,
  getAllIntakesAsync,
} from "../../../../redux/index.actions"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import AddUserValidationSchema from "../../../../custom/validation schemas/adding user/AddingUserValidationSchema.component"

//------------WITH SPINNERS-------------------
const UsersTableWithSpinner = WithSpinner(UsersTable)
//-------------------------------------------------

const UsersContainer = ({
  setVisible,
  //------VALIDATION SCHEMAS-------
  addStaffValidationSchema,
  addStudentValidationSchema,
  addGuardianValidationSchema,
  addLecturerValidationSchema,
  //-------INITTIAL VALUES----------
  addStaffInitialValues,
  addStudentInitialValues,
  addGuardianInitialValues,
  addLecturerInitialValues,
  //----------FIELDS---------
  addStaffFields,
  addStudentFields,
  addGuardianFields,
  addLecturerFields,
  //------WITH SPINNER--------
  getAllStaff,
  getStudents,
  getGuardians,
  getLecturers,
  getAllIntakes,
  //--------USERS---------
  allStaff,
  students,
  guardians,
  lecturers,
  //--------ADD USER---------
  addStaff,
  addStudent,
  addGuardian,
  addLecturer,
  //-------ERROR MESSAGES------
  addStaffErrorMessage,
  addStudentErrorMessage,
  addGuardianErrorMessage,
  addLecturerErrorMessage,
  getAllStaffErrorMessage,
  getStudentsErrorMessage,
  getGuardiansErrorMessage,
  getLecturersErrorMessage,
  getAllIntakesErrorMessage,
  //---------IS LOADING---------
  addStaffIsLoading,
  addStudentIsLoading,
  addGuardianIsLoading,
  addLecturerIsLoading,
  getAllStaffIsLoading,
  getStudentsIsLoading,
  getGuardiansIsLoading,
  getLecturersIsLoading,
  getAllIntakesIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [guardianStudents, setGuardianStudents] = useState([])
  const [image, setImage] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const setVisibleForClosingAction = () =>
    setVisible({
      staff: false,
      confirmStaff: false,
      student: false,
      confirmStudent: false,
      lecturer: false,
      confirmLecturer: false,
      guardian: false,
      confirmGuardian: false,
    })

  let buttonStatus = false
  guardianStudents.map(student => {
    if (
      (student.uuid === "" || student.guardianType === "") &&
      student.shown === true
    )
      buttonStatus = true
  })

  let studentsArray = []
  if (guardianStudents.length > 0)
    guardianStudents.map(student => {
      if (student.shown)
        studentsArray.push({
          guardianType: student.guardianType,
          studentUuid: student.uuid,
        })
    })

  //--------------ALL STAFF-------------
  const allStaffTableAttributes = {
    users: allStaff,
    dialogAttributes: {
      dialogTitle: intl.formatMessage({ id: "ADDING.STAFF" }),
      errorMessage: addStaffErrorMessage,
      isLoading: addStaffIsLoading,
      closingAction: () => {
        setVisibleForClosingAction()
        setImage("")
      },
    },
    customFormAttributes: {
      formik: useFormik({
        validationSchema: addStaffValidationSchema,
        initialValues: addStaffInitialValues,
        enableReinitialize: true,
        onSubmit: values => {
          const messages = {
            success: {
              title: intl.formatMessage({ id: "CREATE.USER.SUCCESS.TITLE" }),
              content: intl.formatMessage({
                id: "CREATE.USER.SUCCESS.CONTENT",
              }),
            },
            error: {
              title: intl.formatMessage({ id: "CREATE.USER.ERROR.TITLE" }),
              content: intl.formatMessage({ id: "CREATE.USER.ERROR.CONTENT" }),
            },
          }
          let requestBody = { ...values, role: "staff", userAvatar: image }
          addStaff(requestBody, messages)
        },
      }),
      fields: addStaffFields,
      buttonTitle: intl.formatMessage({ id: "ADD.STAFF" }),
      headLines: [
        {
          index: 0,
          type: "above",
          title: "general",
          icon: <User size={18} />,
        },
        {
          index: 12,
          type: "below",
          title: "profile picture",
          icon: <Image size={18} />,
          content: (
            <input
              onChange={e => setImage(e.target.files[0])}
              type="file"
              accept="image/*"
              className="w-100"
            />
          ),
        },
      ],
      isLoading: addStaffIsLoading,
    },
    select: {
      placeHolder: intl.formatMessage({ id: "CHOOSE.FILTER" }),
      array: [
        {
          label: intl.formatMessage({ id: "GENDER" }),
          options: [
            { value: "male", label: intl.formatMessage({ id: "MALE" }) },
            { value: "female", label: intl.formatMessage({ id: "FEMALE" }) },
          ],
        },
        {
          label: intl.formatMessage({ id: "STATUS" }),
          options: [
            { value: "enable", label: intl.formatMessage({ id: "ENABLED" }) },
            { value: "disable", label: intl.formatMessage({ id: "DISABLED" }) },
          ],
        },
      ],
      filteringObject: [
        {
          parent: intl.formatMessage({ id: "GENDER" }),
          attribute: "gender",
        },
        {
          parent: intl.formatMessage({ id: "STATUS" }),
          attribute: "status",
        },
      ],
    },
    search: {
      title: intl.formatMessage({ id: "STAFF.ID.OR.FULL.NAME" }),
      filterArray: (array, searchField) =>
        array.filter(
          staff =>
            staff.fullName.toLowerCase().includes(searchField.toLowerCase()) ||
            staff.fullNameArabic
              .toLowerCase()
              .includes(searchField.toLowerCase()) ||
            staff.uuid.toLowerCase().includes(searchField.toLowerCase())
        ),
    },
    columns: [
      { title: intl.formatMessage({ id: "STAFF.ID" }) },
      {
        title: intl.formatMessage({ id: "USERNAME" }),
        styles: { minWidth: "150px" },
      },
      {
        title: intl.formatMessage({ id: "FULL.NAME" }),
        styles: { minWidth: "150px" },
      },
      { title: intl.formatMessage({ id: "GENDER" }) },
      {
        title: intl.formatMessage({ id: "PHONE.NUMBER" }),
        styles: { minWidth: "170px" },
      },
      { title: intl.formatMessage({ id: "STATUS" }) },
      { title: "" },
    ],
    Row: AllStaffTableRow,
    getUsers: () => getAllStaff(),
    title: intl.formatMessage({ id: "ALL.STAFF" }),
    emptyMessage: intl.formatMessage({ id: "NO.STAFF.MEMBERS.AVAILABLE" }),
  }
  //--------------STUDENTS-------------
  const studentsTableAttributes = {
    users: students,
    dialogAttributes: {
      dialogTitle: intl.formatMessage({ id: "ADDING.STUDENT" }),
      errorMessage: addStudentErrorMessage,
      isLoading: addStudentIsLoading,
      closingAction: () => {
        setVisibleForClosingAction()
        setImage("")
      },
    },
    customFormAttributes: {
      formik: useFormik({
        validationSchema: addStudentValidationSchema,
        initialValues: addStudentInitialValues,
        enableReinitialize: true,
        onSubmit: values => {
          const messages = {
            success: {
              title: intl.formatMessage({ id: "CREATE.USER.SUCCESS.TITLE" }),
              content: intl.formatMessage({
                id: "CREATE.USER.SUCCESS.CONTENT",
              }),
            },
            error: {
              title: intl.formatMessage({ id: "CREATE.USER.ERROR.TITLE" }),
              content: intl.formatMessage({ id: "CREATE.USER.ERROR.CONTENT" }),
            },
          }
          let requestBody = {
            ...values,
            role: "student",
            userAvatar: image,
            studentStatus: "enrolled",
          }
          addStudent(requestBody, messages)
        },
      }),
      fields: addStudentFields,
      buttonTitle: intl.formatMessage({ id: "ADD.STUDENT" }),
      headLines: [
        {
          index: 0,
          type: "above",
          title: "general",
          icon: <User size={18} />,
        },
        {
          index: 13,
          type: "below",
          title: "profile picture",
          icon: <Image size={18} />,
          content: (
            <input
              onChange={e => setImage(e.target.files[0])}
              type="file"
              accept="image/*"
              className="w-100"
            />
          ),
        },
      ],
      isLoading: addStudentIsLoading,
    },
    select: {
      placeHolder: intl.formatMessage({ id: "CHOOSE.FILTER" }),
      placeHolder: intl.formatMessage({ id: "CHOOSE.FILTER" }),
      array: [
        {
          label: intl.formatMessage({ id: "GENDER" }),
          options: [
            { value: "male", label: intl.formatMessage({ id: "MALE" }) },
            { value: "female", label: intl.formatMessage({ id: "FEMALE" }) },
          ],
        },
        {
          label: intl.formatMessage({ id: "STATUS" }),
          options: [
            { value: "enable", label: intl.formatMessage({ id: "ENABLED" }) },
            { value: "disable", label: intl.formatMessage({ id: "DISABLED" }) },
          ],
        },
      ],
      filteringObject: [
        {
          parent: intl.formatMessage({ id: "GENDER" }),
          attribute: "gender",
        },
        {
          parent: intl.formatMessage({ id: "STATUS" }),
          attribute: "status",
        },
      ],
    },
    search: {
      title: intl.formatMessage({ id: "STUDENT.ID.OR.FULL.NAME" }),
      filterArray: (array, searchField) =>
        array.filter(
          student =>
            student.uuid.toLowerCase().includes(searchField.toLowerCase()) ||
            student.fullName
              .toLowerCase()
              .includes(searchField.toLocaleLowerCase()) ||
            student.fullNameArabic
              .toLowerCase()
              .includes(searchField.toLocaleLowerCase())
        ),
    },
    columns: [
      { title: "Avatar" },
      {
        title: intl.formatMessage({ id: "STUDENT.ID" }),
        styles: { minWidth: "180px" },
      },
      {
        title: intl.formatMessage({ id: "USERNAME" }),
        styles: { minWidth: "150px" },
      },
      {
        title: intl.formatMessage({ id: "FULL.NAME" }),
        styles: { minWidth: "150px" },
      },
      { title: intl.formatMessage({ id: "GENDER" }) },
      { title: intl.formatMessage({ id: "STATUS" }) },
      { title: "" },
    ],
    Row: StudentsTableRow,
    getUsers: () => {
      getAllIntakes()
      getStudents()
    },
    title: intl.formatMessage({ id: "STUDENTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.STUDENTS.AVAILABLE" }),
  }
  //--------------GUARDIANS-------------
  const guardiansTableAttributes = {
    users: guardians,
    dialogAttributes: {
      dialogTitle: intl.formatMessage({ id: "ADDING.GUARDIAN" }),
      errorMessage: addGuardianErrorMessage,
      isLoading: addGuardianIsLoading,
      closingAction: () => {
        setVisibleForClosingAction()
        setImage("")
      },
    },
    customFormAttributes: {
      formik: useFormik({
        validationSchema: addGuardianValidationSchema,
        initialValues: addGuardianInitialValues,
        enableReinitialize: true,
        onSubmit: values =>
          addGuardian(
            { ...values, role: "guardian", userAvatar: image },
            studentsArray,
            {
              success: {
                title: intl.formatMessage({ id: "CREATE.USER.SUCCESS.TITLE" }),
                content: intl.formatMessage({
                  id: "CREATE.USER.SUCCESS.CONTENT",
                }),
              },
              info: {
                title: intl.formatMessage({ id: "ADD.GUARDIAN.INFO.TITLE" }),
                content: intl.formatMessage({
                  id: "ADD.GUARDIAN.INFO.CONTENT",
                }),
              },
            }
          ),
      }),
      fields: addGuardianFields,
      buttonTitle: intl.formatMessage({ id: "ADD.GUARDIAN" }),
      buttonStatus: buttonStatus,
      headLines: [
        {
          index: 0,
          type: "above",
          title: "general",
          icon: <User size={18} />,
        },
        {
          index: 10,
          type: "below",
          title: "profile picture",
          icon: <Image size={18} />,
          content: (
            <input
              onChange={e => setImage(e.target.files[0])}
              type="file"
              accept="image/*"
              className="w-100"
            />
          ),
        },
        {
          index: 10,
          type: "below",
          title: "children",
          icon: <Users size={18} />,
          content: (
            <LinkStudentsToGuardian
              students={guardianStudents}
              setStudents={setGuardianStudents}
            />
          ),
          companion: (
            <Button
              onClick={() =>
                setGuardianStudents([
                  ...guardianStudents,
                  {
                    index: guardianStudents.length,
                    uuid: "",
                    guardianType: "",
                    shown: true,
                  },
                ])
              }
              type="button"
              color="success"
              className="p-50"
            >
              <Plus size={18} />
            </Button>
          ),
        },
      ],
      isLoading: addGuardianIsLoading,
    },
    select: {
      placeHolder: intl.formatMessage({ id: "CHOOSE.FILTER" }),
      array: [
        {
          label: intl.formatMessage({ id: "GENDER" }),
          options: [
            { value: "male", label: intl.formatMessage({ id: "MALE" }) },
            { value: "female", label: intl.formatMessage({ id: "FEMALE" }) },
          ],
        },
        {
          label: intl.formatMessage({ id: "STATUS" }),
          options: [
            { value: "enable", label: intl.formatMessage({ id: "ENABLED" }) },
            { value: "disable", label: intl.formatMessage({ id: "DISABLED" }) },
          ],
        },
      ],
      filteringObject: [
        {
          parent: intl.formatMessage({ id: "GENDER" }),
          attribute: "gender",
        },
        {
          parent: intl.formatMessage({ id: "STATUS" }),
          attribute: "status",
        },
      ],
    },
    search: {
      title: intl.formatMessage({ id: "FULL.NAME" }),
      filterArray: (array, searchField) =>
        array.filter(
          user =>
            user.fullName.toLowerCase().includes(searchField.toLowerCase()) ||
            user.fullNameArabic
              .toLowerCase()
              .includes(searchField.toLowerCase())
        ),
    },
    columns: [
      {
        title: intl.formatMessage({ id: "USERNAME" }),
        styles: { minWidth: "160px" },
      },
      {
        title: intl.formatMessage({ id: "FULL.NAME" }),
        styles: { minWidth: "180px" },
      },
      { title: intl.formatMessage({ id: "GENDER" }) },
      {
        title: intl.formatMessage({ id: "PHONE.NUMBER" }),
        styles: { minWidth: "170px" },
      },
      { title: intl.formatMessage({ id: "STATUS" }) },
      { title: "" },
    ],
    Row: GuardiansTableRow,
    getUsers: () => getGuardians(),
    title: intl.formatMessage({ id: "GUARDIANS" }),
    emptyMessage: intl.formatMessage({ id: "NO.GUARDIANS.AVAILABLE" }),
  }
  //--------------LECTURERS-------------
  const lecturersTableAttributes = {
    users: lecturers,
    dialogAttributes: {
      dialogTitle: intl.formatMessage({ id: "ADDING.LECTURER" }),
      errorMessage: addLecturerErrorMessage,
      isLoading: addLecturerIsLoading,
      closingAction: () => {
        setVisibleForClosingAction()
        setImage("")
      },
    },
    customFormAttributes: {
      formik: useFormik({
        validationSchema: addLecturerValidationSchema,
        initialValues: addLecturerInitialValues,
        enableReinitialize: true,
        onSubmit: values => {
          const messages = {
            success: {
              title: intl.formatMessage({ id: "CREATE.USER.SUCCESS.TITLE" }),
              content: intl.formatMessage({
                id: "CREATE.USER.SUCCESS.CONTENT",
              }),
            },
            error: {
              title: intl.formatMessage({ id: "CREATE.USER.ERROR.TITLE" }),
              content: intl.formatMessage({ id: "CREATE.USER.ERROR.CONTENT" }),
            },
          }
          let requestBody = { ...values, role: "lecturer", userAvatar: image }
          addLecturer(requestBody, messages)
        },
      }),
      fields: addLecturerFields,
      buttonTitle: intl.formatMessage({ id: "ADD.LECTURER" }),
      headLines: [
        {
          index: 0,
          type: "above",
          title: "general",
          icon: <User size={18} />,
        },
        {
          index: 12,
          type: "below",
          title: "profile picture",
          icon: <Image size={18} />,
          content: (
            <input
              onChange={e => setImage(e.target.files[0])}
              type="file"
              accept="image/*"
              className="w-100"
            />
          ),
        },
      ],
      isLoading: addLecturerIsLoading,
    },
    select: {
      placeHolder: intl.formatMessage({ id: "CHOOSE.FILTER" }),
      array: [
        {
          label: intl.formatMessage({ id: "GENDER" }),
          options: [
            { value: "male", label: intl.formatMessage({ id: "MALE" }) },
            { value: "female", label: intl.formatMessage({ id: "FEMALE" }) },
          ],
        },
        {
          label: intl.formatMessage({ id: "STATUS" }),
          options: [
            { value: "enable", label: intl.formatMessage({ id: "ENABLED" }) },
            { value: "disable", label: intl.formatMessage({ id: "DISABLED" }) },
          ],
        },
      ],
      filteringObject: [
        {
          parent: intl.formatMessage({ id: "GENDER" }),
          attribute: "gender",
        },
        {
          parent: intl.formatMessage({ id: "STATUS" }),
          attribute: "status",
        },
      ],
    },
    search: {
      title: intl.formatMessage({ id: "LECTURER.ID.OR.FULL.NAME" }),
      filterArray: (array, searchField) =>
        array.filter(
          user =>
            user.uuid.toLowerCase().includes(searchField.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchField.toLowerCase()) ||
            user.fullNameArabic
              .toLowerCase()
              .includes(searchField.toLowerCase())
        ),
    },
    columns: [
      {
        title: intl.formatMessage({ id: "LECTURER.ID" }),
        styles: { minWidth: "145px" },
      },
      {
        title: intl.formatMessage({ id: "USERNAME" }),
        styles: { minWidth: "160px" },
      },
      {
        title: intl.formatMessage({ id: "FULL.NAME" }),
        styles: { minWidth: "180px" },
      },
      { title: intl.formatMessage({ id: "GENDER" }) },
      {
        title: intl.formatMessage({ id: "PHONE.NUMBER" }),
        styles: { minWidth: "170px" },
      },
      { title: intl.formatMessage({ id: "STATUS" }) },
      { title: "" },
    ],
    Row: LecturersTableRow,
    getUsers: () => getLecturers(),
    title: intl.formatMessage({ id: "LECTURERS" }),
    emptyMessage: intl.formatMessage({ id: "NO.LECTURERS.AVAILABLE" }),
  }
  //-------------------------------

  const toBeDispatchedForStudentsUseEffect = students => {
    getStudentsUseEffect(students)
    getAllIntakes()
  }
  const toBeDispatchedForStudentsTryAgain = () => {
    getStudentsTryAgain()
    getAllIntakes()
  }

  const attributes = {
    cards: [],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
  }
  if (ability.can("manage", "students-GET"))
    attributes.cards.push({
      tab: {
        title: intl.formatMessage({ id: "STUDENTS" }),
      },
      content: (
        <UsersTableWithSpinner
          toBeDispatchedUseEffect={getStudents}
          toBeDispatchedTryAgain={getStudents}
          errorMessage={getStudentsErrorMessage || getAllIntakesErrorMessage}
          isLoading={getStudentsIsLoading || getAllIntakesIsLoading}
          {...studentsTableAttributes}
        />
      ),
    })
  if (ability.can("manage", "lecturers-GET"))
    attributes.cards.push({
      tab: {
        title: intl.formatMessage({ id: "LECTURERS" }),
      },
      content: (
        <UsersTableWithSpinner
          toBeDispatchedUseEffect={getLecturers}
          toBeDispatchedTryAgain={getLecturers}
          errorMessage={getLecturersErrorMessage}
          isLoading={getLecturersIsLoading}
          {...lecturersTableAttributes}
        />
      ),
    })
  if (ability.can("manage", "guardians-GET"))
    attributes.cards.push({
      tab: {
        title: intl.formatMessage({ id: "GUARDIANS" }),
      },
      content: (
        <UsersTableWithSpinner
          toBeDispatchedUseEffect={getGuardians}
          toBeDispatchedTryAgain={getGuardians}
          errorMessage={getGuardiansErrorMessage}
          isLoading={getGuardiansIsLoading}
          {...guardiansTableAttributes}
        />
      ),
    })
  if (ability.can("manage", "all_staff-GET"))
    attributes.cards.push({
      tab: {
        title: intl.formatMessage({ id: "ALL.STAFF" }),
      },
      content: (
        <UsersTableWithSpinner
          toBeDispatchedUseEffect={getAllStaff}
          toBeDispatchedTryAgain={getAllStaff}
          errorMessage={getAllStaffErrorMessage}
          isLoading={getAllStaffIsLoading}
          {...allStaffTableAttributes}
        />
      ),
    })

  return (
    <Card>
      <CardBody style={{ paddingBottom: "0px" }}>
        <CardViewerHorizontalNav {...attributes} />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  allStaff: selectAllStaff,
  students: selectStudents,
  guardians: selectGuardians,
  lecturers: selectLecturers,
  addStaffErrorMessage: selectAddStaffErrorMessage,
  addStudentErrorMessage: selectAddStudentErrorMessage,
  addGuardianErrorMessage: selectAddGuardianErrorMessage,
  addLecturerErrorMessage: selectAddLecturerErrorMessage,
  getAllStaffErrorMessage: selectGetAllStaffErrorMessage,
  getStudentsErrorMessage: selectGetStudentsErrorMessage,
  getGuardiansErrorMessage: selectGetGuardiansErrorMessage,
  getLecturersErrorMessage: selectGetLecturersErrorMessage,
  addStaffIsLoading: selectAddStaffIsLoading,
  addStudentIsLoading: selectAddStudentIsLoading,
  addGuardianIsLoading: selectAddGuardianIsLoading,
  addLecturerIsLoading: selectAddLecturerIsLoading,
  getAllStaffIsLoading: selectGetAllStaffIsLoading,
  getStudentsIsLoading: selectGetStudentsIsLoading,
  getGuardiansIsLoading: selectGetGuardiansIsLoading,
  getLecturersIsLoading: selectGetLecturersIsLoading,
  getAllIntakesErrorMessage: selectGetAllIntakesErrorMessage,
  getAllIntakesIsLoading: selectGetAllIntakesIsLoading,
})

const mapDispatchhToprops = dispatch => ({
  addStaff: (requestBody, messages) =>
    dispatch(addStaffAsync(requestBody, messages)),
  addStudent: (requestBody, messages) =>
    dispatch(addStudentAsync(requestBody, messages)),
  addGuardian: (requestBody, children, messages) =>
    dispatch(addGuardianAsync(requestBody, children, messages)),
  addLecturer: (requestBody, messages) =>
    dispatch(addLecturerAsync(requestBody, messages)),
  getAllStaff: () => dispatch(getAllStaffAsync()),
  getStudents: () => dispatch(getStudentsAsync()),
  getGuardians: () => dispatch(getGuardiansAsync()),
  getLecturers: () => dispatch(getLecturersAsync()),
  getAllIntakes: () => dispatch(getAllIntakesAsync()),
})

export default connect(
  mapStateToProps,
  mapDispatchhToprops
)(AddUserValidationSchema(UsersContainer))
