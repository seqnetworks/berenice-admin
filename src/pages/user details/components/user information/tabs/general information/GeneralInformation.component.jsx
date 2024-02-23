import React, { useState, useEffect, useContext } from "react"
import * as Yup from "yup"
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

const GeneralInformation = (props) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  useEffect(() => {
    if (props.user.role === "guardian" &&
      ability.can("manage", "guardian_sutdents-GET")) {
      props.getStudentsOfGuardian(props.user.uuid)
    } else if (props.user.role === "student" &&
      ability.can("manage", "student_guardians-GET")) {
      props.getGuardiansOfStudent(props.user.uuid)
    }
  }, []);

  const updatingUserDetailsValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "len",
        intl.formatMessage({ id: "USERNAME.SHOULD.BE.MINIMUM.4.CHARACTERS" }),
        value => (value ? value.length > 3 : null)
      ),
    fullName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    fullNameArabic: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    phoneNumber: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .test(
        "len",
        intl.formatMessage({ id: "ONLY.9.DIGITS.ARE.VALID" }),
        value => (value ? value.length === 9 : null)
      )
      .test(
        "zero",
        intl.formatMessage({
          id: "THE.PHONE.NUMBER.SHOULD.NOT.START.WITH.ZERO",
        }),
        value => (value ? value[0] !== "0" : null)
      ),
    email: Yup.string().email(intl.formatMessage({ id: "WRONG.EMAIL.FORMAT" })),
    nationality: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    gender: Yup.string(),
    birthdate: Yup.string(),
  })

  const userTypeHelper = {
    student: thisUser => {
      return {
        studentId: props.user.uuid,
        type: props.user.type,
        ...thisUser,
      }
    },
    staff: thisUser => {
      return { staffId: props.user.uuid, ...thisUser }
    },
    lecturer: thisUser => {
      return {
        lecturerId: props.paramAndType.lecturer ? props.user.userId : props.user.uuid,
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

  let thisUser = props.paramAndType.lecturer
    ? {
      username: props.user.username,
      fullName: props.user.fullName,
      fullNameArabic: props.user.fullNameArabic,
      phoneNumber: props.user.phoneNumber,
      gender: props.user.gender,
      email: props.user.email,
      birthdate: props.user.birthdate,
      nationality: props.user.nationality,
      nationalIdentity: props.user.nationalIdentity,
    }
    : {
      username: props.user.username,
      fullName: props.user.fullName,
      fullNameArabic: props.user.fullNameArabic,
      phoneNumber: props.user.phoneNumber,
      gender: props.user.gender,
      email: props.user.email,
      birthdate: props.user.birthdate,
      nationality: props.user.nationality,
      nationalIdentity: props.user.nationalIdentity,
      status: props.user.status,
      uuid: props.user.userUuid,
      author: props.user.author,
      createdAt: props.user.createdAt,
      updatedAt: props.user.updatedAt,
    }

  if (props.paramAndType.type === "admin") thisUser["uuid"] = props.user.uuid

  thisUser = userTypeHelper[props.paramAndType.type](thisUser)

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
      const uuid = props.user.userUuid
      const requestBody = {
        fullName: values.fullName,
        fullNameArabic: values.fullNameArabic,
        gender: values.gender,
        email: values.email,
        birthdate: values.birthdate,
        nationality: values.nationality,
        phoneNumber: values.phoneNumber,
      }
      props.updateUserDetails(requestBody, uuid, props.paramAndType, messages)
    },
  })

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    props.setTabsDisabled(isEditing)
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
          {props.currentUserRole === "lecturer" ? (
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
                      ) || props.updateUserDetailsIsLoading
                    }
                    type="submit"
                    color="success"
                  >
                    {props.updateUserDetailsIsLoading ? (
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
                    disabled={props.updateUserDetailsIsLoading}
                    onClick={() => {
                      props.setTabsDisabled(false)
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
                    props.setTabsDisabled(true)
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
            {index === inevitableBreakup[props.paramAndType.type] ? (
              <>
                {props.user.role === "staff" && ability.can("manage", "staff-PUT") ? (
                  <ChangeStaffType
                    staffId={props.user.uuid}
                    staffType={props.user.staffType}
                  />
                ) : props.user.role === "lecturer" &&
                  ability.can("manage", "lecturer-PUT") ? (
                  <EditLecturerPosition
                    lecturerUuid={props.user.uuid}
                    lecturerPosition={props.user.lecturerPosition}
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
        {props.user.role === "guardian" &&
          ability.can("manage", "guardian_sutdents-GET") ? (
          <LinkStudentsToSpecificGuardianWithSpinner
            guardianUuid={props.user.uuid}
            toBeDispatchedTryAgain={props.getStudentsOfGuardian}
            toBeDispatchedPropsTryAgain={props.user.uuid}
            isLoading={props.getStudentsOfGuardianIsLoading}
            errorMessage={props.getStudentsOfGuardianErrorMessage}
          />
        ) : props.user.role === "student" &&
          ability.can("manage", "student_guardians-GET") ? (
          <LinkGuardiansToSpecificStudentWithSpinner
            studentId={props.user.uuid}
            toBeDispatchedTryAgain={props.getGuardiansOfStudent}
            toBeDispatchedPropsTryAgain={props.user.uuid}
            isLoading={props.getGuardiansOfStudentIsLoading}
            errorMessage={props.getGuardiansOfStudentErrorMessage}
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
)(GeneralInformation)
