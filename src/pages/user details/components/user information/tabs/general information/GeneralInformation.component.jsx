import React, { useState, useEffect, useContext } from "react"
import { useFormik } from "formik"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl, FormattedMessage } from "react-intl"
import {
  Col,
  Row,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Spinner,
} from "reactstrap"
import {
  User,
  Activity,
  AtSign,
  Phone,
  Key,
  Edit,
  Check,
  X,
  Calendar,
  Clipboard,
  UserCheck,
  Edit3,
  AlertTriangle,
  Codepen,
  Codesandbox,
  MapPin,
  Globe,
  Award,
  BookOpen,
} from "react-feather"
import classnames from "classnames"
import LinkStudentsToSpecificGuardian from "./LinkStudentsToSpecificGuardian.component"
import LinkGuardiansToSpecificStudent from "./LinkGuardiansToSpecificStudent.comonent"
import ChangeStaffType from "./ChangeStaffType.component"
import EditLecturerPosition from "./EditLecturerPosition.component"
import { selectArray } from "../../../../../../utility/custom/arabicCountries"
import { studentTypesArray } from "../../../../../../utility/custom/StudentArrays"
import { AbilityContext } from "../../../../../../utility/context/Can"
import WithSpinner from "../../../../../../custom/with spinner/WithSpinner.component"
import UpdatingUserDetailsValidationSchema from "../../../../../../custom/validation schemas/updating user details/UpdatingUserDetailsValidationSchema.component"
import {
  updateUserDetailsAsync,
  getStudentsOfGuardianAsync,
  getGuardiansOfStudentAsync,
} from "../../../../../../redux/index.actions"
import {
  selectSelectedUser,
  selectCurrentUserRole,
  selectUpdateUserDetailsIsLoading,
  selectGetStudentsOfGuardianErrorMessage,
  selectGetStudentsOfGuardianIsLoading,
  selectGetGuardiansOfStudentErrorMessage,
  selectGetGuardiansOfStudentIsLoading,
} from "../../../../../../redux/index.selectors"
import "../../../../../../custom/styles/dateEmptyPlaceholder.styles.scss"
import "../../../../../../custom/styles/animations.styles.scss"
//------------------WITH SPINNERS--------------------
const LinkStudentsToSpecificGuardianWithSpinner = WithSpinner(
  LinkStudentsToSpecificGuardian
)
const LinkGuardiansToSpecificStudentWithSpinner = WithSpinner(
  LinkGuardiansToSpecificStudent
)
//--------------------------------------------------------

const GeneralInformation = ({
  user,
  currentUserRole,
  paramAndType,
  setTabsDisabled,
  updateUserDetails,
  updatingUserDetailsValidationSchema,
  updateUserDetailsIsLoading,
  getStudentsOfGuardian,
  getStudentsOfGuardianErrorMessage,
  getStudentsOfGuardianIsLoading,
  getGuardiansOfStudent,
  getGuardiansOfStudentErrorMessage,
  getGuardiansOfStudentIsLoading,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const userTypeHelper = {
    student: thisUser => {
      return {
        studentId: user.uuid,
        type: user.type,
        ...thisUser,
      }
    },
    staff: thisUser => {
      return { staffId: user.uuid, ...thisUser }
    },
    lecturer: thisUser => {
      return {
        lecturerId: paramAndType.lecturer ? user.userId : user.uuid,
        ...thisUser,
      }
    },
    guardian: thisUser => {
      return { ...thisUser }
    },
  }

  const inevitableBreakup = {
    student: 12,
    lecturer: 11,
    staff: 11,
    guardian: 10,
  }

  let thisUser = paramAndType.lecturer
    ? {
        username: user.username,
        fullName: user.fullName,
        fullNameArabic: user.fullNameArabic,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        email: user.email,
        birthdate: user.birthdate,
        nationality: user.nationality,
        nationalIdentity: user.nationalIdentity,
      }
    : {
        username: user.username,
        fullName: user.fullName,
        fullNameArabic: user.fullNameArabic,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        email: user.email,
        birthdate: user.birthdate,
        nationality: user.nationality,
        nationalIdentity: user.nationalIdentity,
        status: user.status,
        uuid: user.userUuid,
        author: user.author,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }

  if (paramAndType.type === "admin") thisUser["uuid"] = user.uuid

  thisUser = userTypeHelper[paramAndType.type](thisUser)

  const updatingUserDetailsFormik = useFormik({
    validationSchema: updatingUserDetailsValidationSchema,
    enableReinitialize: true,
    initialValues: thisUser,
    onSubmit: values => {
      const messages = {
        success: {
          title: intl.formatMessage({
            id: "UPDATE.USER.DETAILS.SUCCESS.TITLE",
          }),
          content: intl.formatMessage({
            id: "UPDATE.USER.DETAILS.SUCCESS.CONTENT",
          }),
        },
        error: {
          title: intl.formatMessage({ id: "UPDATE.USER.DETAILS.ERROR.TITLE" }),
          content: intl.formatMessage({
            id: "UPDATE.USER.DETAILS.ERROR.CONTENT",
          }),
        },
      }
      const uuid = user.userUuid
      const requestBody = {
        fullName: values.fullName,
        fullNameArabic: values.fullNameArabic,
        gender: values.gender,
        email: values.email,
        birthdate: values.birthdate,
        nationality: values.nationality,
        phoneNumber: values.phoneNumber,
      }
      updateUserDetails(requestBody, uuid, paramAndType, messages)
    },
  })

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setTabsDisabled(isEditing)
  }, [isEditing])

  const fieldLabel = {
    studentId: intl.formatMessage({ id: "STUDENT.ID" }),
    lecturerId: intl.formatMessage({ id: "LECTURER.ID" }),
    staffId: intl.formatMessage({ id: "STAFF.ID" }),
    username: intl.formatMessage({ id: "USERNAME" }),
    phoneNumber: intl.formatMessage({ id: "PHONE.NUMBER" }),
    email: intl.formatMessage({ id: "EMAIL" }),
    type: intl.formatMessage({ id: "STUDENT.TYPE" }),
    fullName: intl.formatMessage({ id: "FULL.NAME.ENGLISH" }),
    fullNameArabic: intl.formatMessage({ id: "FULL.NAME.ARABIC" }),
    nationality: intl.formatMessage({ id: "NATIONALITY" }),
    nationalIdentity: intl.formatMessage({ id: "NATIONAL.IDENTITY" }),
    status: intl.formatMessage({ id: "STATUS" }),
    gender: intl.formatMessage({ id: "GENDER" }),
    birthdate: intl.formatMessage({ id: "BIRTH.DATE" }),
    uuid: intl.formatMessage({ id: "UUID" }),
    author: intl.formatMessage({ id: "AUTHOR" }),
    createdAt: intl.formatMessage({ id: "CREATED.AT" }),
    updatedAt: intl.formatMessage({ id: "UPDATED.AT" }),
  }

  const fieldIcon = {
    studentId: () => <Codepen size={15} />,
    lecturerId: () => <Codepen size={15} />,
    staffId: () => <Codepen size={15} />,
    username: () => <Key size={15} />,
    phoneNumber: () => <Phone size={15} />,
    email: () => <AtSign size={15} />,
    type: () => <BookOpen size={15} />,
    fullName: () => <User size={15} />,
    fullNameArabic: () => <User size={15} />,
    nationality: () => <MapPin size={15} />,
    nationalIdentity: () => <Globe size={15} />,
    status: () => <Activity size={15} />,
    gender: () => <Clipboard size={15} />,
    birthdate: () => <Calendar size={15} />,
    uuid: () => <Codesandbox size={15} />,
    author: () => <UserCheck size={15} />,
    createdAt: () => <Edit3 size={15} />,
    updatedAt: () => <Edit size={15} />,
  }

  const fieldType = {
    birthdate: "date",
    gender: "select",
    nationality: "select",
    type: "select",
  }

  const fieldOptions = {
    gender: [
      { value: "male", title: intl.formatMessage({ id: "MALE" }) },
      { value: "female", title: intl.formatMessage({ id: "FEMALE" }) },
    ],
    nationality: selectArray(intl),
    type: studentTypesArray(intl),
  }

  const status = {
    enable: intl.formatMessage({ id: "ENABLED" }),
    disable: intl.formatMessage({ id: "DISABLED" }),
  }

  return (
    <Form onSubmit={updatingUserDetailsFormik.handleSubmit}>
      <Row>
        <Col
          xs="12"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <User size={18} />
            <h4 className="mb-0 ml-75">
              <FormattedMessage id="GENERAL" />
            </h4>
          </div>
          {currentUserRole === "lecturer" ? (
            <></>
          ) : ability.can("manage", "user-PUT") ? (
            <div>
              {isEditing ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",
                  }}
                >
                  <Button
                    className="mr-75 p-50 input-custom-animation-2"
                    disabled={
                      !(
                        updatingUserDetailsFormik.dirty &&
                        updatingUserDetailsFormik.isValid
                      ) || updateUserDetailsIsLoading
                    }
                    type="submit"
                    color="success"
                  >
                    {updateUserDetailsIsLoading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        aria-hidden="true"
                      />
                    ) : (
                      <Check size={18} />
                    )}
                  </Button>
                  <Button
                    className="p-50 input-custom-animation-2"
                    disabled={updateUserDetailsIsLoading}
                    onClick={() => {
                      setTabsDisabled(false)
                      setIsEditing(false)
                      updatingUserDetailsFormik.resetForm()
                    }}
                    color="danger"
                  >
                    <X size={18} />
                  </Button>
                </div>
              ) : (
                <Button
                  className="p-50 input-custom-animation-2"
                  onClick={() => {
                    setTabsDisabled(true)
                    setIsEditing(true)
                  }}
                  color="primary"
                >
                  <Edit size={18} />
                </Button>
              )}
            </div>
          ) : (
            <div />
          )}
        </Col>

        {Object.keys(thisUser).map((key, index) => (
          <>
            {index === inevitableBreakup[paramAndType.type] ? (
              <>
                {user.role === "staff" && ability.can("manage", "staff-PUT") ? (
                  <ChangeStaffType
                    staffId={user.uuid}
                    staffType={user.staffType}
                  />
                ) : user.role === "lecturer" &&
                  ability.can("manage", "lecturer-PUT") ? (
                  <EditLecturerPosition
                    lecturerUuid={user.uuid}
                    lecturerPosition={user.lecturerPosition}
                  />
                ) : null}
                <Col
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "12px 0",
                  }}
                >
                  <AlertTriangle size={18} />
                  <h4 className="mb-0 ml-75">
                    <FormattedMessage id="INEVITABLE.INFORMATION" />
                  </h4>
                </Col>
              </>
            ) : null}
            <Col sm="6">
              <FormGroup>
                <Label>{fieldLabel[key]}</Label>
                <InputGroup
                  className={classnames({
                    "is-invalid":
                      updatingUserDetailsFormik.touched[key] &&
                      updatingUserDetailsFormik.errors[key],
                    "input-group-merge": true,
                  })}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>{fieldIcon[key]()}</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    readOnly={
                      isEditing &&
                      key !== "username" &&
                      key !== "author" &&
                      key !== "uuid" &&
                      key !== "studentId" &&
                      key !== "guardianUuid" &&
                      key !== "staffId" &&
                      key !== "updatedAt" &&
                      key !== "createdAt" &&
                      key !== "status"
                        ? false
                        : true
                    }
                    disabled={
                      fieldType[key] === "select" || fieldType[key] === "date"
                        ? isEditing
                          ? false
                          : true
                        : false
                    }
                    key={key}
                    className={classnames({
                      "is-invalid":
                        updatingUserDetailsFormik.touched[key] &&
                        updatingUserDetailsFormik.errors[key],
                    })}
                    type={fieldType[key] ? fieldType[key] : "text"}
                    {...updatingUserDetailsFormik.getFieldProps(key)}
                    value={
                      key === "status"
                        ? status[
                            updatingUserDetailsFormik.getFieldProps(key).value
                          ]
                        : updatingUserDetailsFormik.getFieldProps(key).value
                    }
                  >
                    {fieldType[key] === "select"
                      ? fieldOptions[key].map(option => (
                          <option value={option.value}>{option.title}</option>
                        ))
                      : null}
                  </Input>
                </InputGroup>
                {updatingUserDetailsFormik.touched[key] &&
                  updatingUserDetailsFormik.errors[key] && (
                    <span
                      className="input-custom-animation-5"
                      style={{ color: "red" }}
                    >
                      {" "}
                      {updatingUserDetailsFormik.errors[key]}{" "}
                    </span>
                  )}
              </FormGroup>
            </Col>
          </>
        ))}
        {user.role === "guardian" &&
        ability.can("manage", "guardian_sutdents-GET") ? (
          <LinkStudentsToSpecificGuardianWithSpinner
            guardianUuid={user.uuid}
            toBeDispatchedUseEffect={getStudentsOfGuardian}
            toBeDispatchedTryAgain={getStudentsOfGuardian}
            toBeDispatchedPropsTryAgain={user.uuid}
            toBeDispatchedPropsUseEffect={user.uuid}
            isLoading={getStudentsOfGuardianIsLoading}
            errorMessage={getStudentsOfGuardianErrorMessage}
          />
        ) : user.role === "student" &&
          ability.can("manage", "student_guardians-GET") ? (
          <LinkGuardiansToSpecificStudentWithSpinner
            studentId={user.uuid}
            toBeDispatchedUseEffect={getGuardiansOfStudent}
            toBeDispatchedTryAgain={getGuardiansOfStudent}
            toBeDispatchedPropsTryAgain={user.uuid}
            toBeDispatchedPropsUseEffect={user.uuid}
            isLoading={getGuardiansOfStudentIsLoading}
            errorMessage={getGuardiansOfStudentErrorMessage}
          />
        ) : null}
      </Row>
    </Form>
  )
}

const mapStateToProps = createStructuredSelector({
  user: selectSelectedUser,
  currentUserRole: selectCurrentUserRole,
  updateUserDetailsIsLoading: selectUpdateUserDetailsIsLoading,
  getStudentsOfGuardianErrorMessage: selectGetStudentsOfGuardianErrorMessage,
  getStudentsOfGuardianIsLoading: selectGetStudentsOfGuardianIsLoading,
  getGuardiansOfStudentErrorMessage: selectGetGuardiansOfStudentErrorMessage,
  getGuardiansOfStudentIsLoading: selectGetGuardiansOfStudentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  updateUserDetails: (requestBody, uuid, paramAndType, messages) =>
    dispatch(updateUserDetailsAsync(requestBody, uuid, paramAndType, messages)),
  getStudentsOfGuardian: guardianUuid =>
    dispatch(getStudentsOfGuardianAsync(guardianUuid)),
  getGuardiansOfStudent: studentId =>
    dispatch(getGuardiansOfStudentAsync(studentId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatingUserDetailsValidationSchema(GeneralInformation))
