import React, { useContext, useEffect, useState } from "react"
import * as Yup from "yup"
import { AtSign, Award, BookOpen, Calendar, Clipboard, Codepen, FileText, Filter, Globe, Key, Lock, MapPin, Smartphone, User, Users, Plus, Image } from "react-feather";
import { useIntl } from "react-intl";
import { connect, useSelector } from "react-redux";
import { Col, Row, Card, CardBody, Button } from "reactstrap"
import { selectAddGuardianErrorMessage, selectAddGuardianIsLoading, selectAddLecturerErrorMessage, selectAddLecturerIsLoading, selectAddStaffErrorMessage, selectAddStaffIsLoading, selectAddStudentErrorMessage, selectAddStudentIsLoading, selectAllIntakes, selectAllStaff, selectGetAllIntakesErrorMessage, selectGetAllIntakesIsLoading, selectGetAllStaffErrorMessage, selectGetAllStaffIsLoading, selectGetGuardiansErrorMessage, selectGetGuardiansIsLoading, selectGetLecturersErrorMessage, selectGetLecturersIsLoading, selectGetStudentsErrorMessage, selectGetStudentsIsLoading, selectGuardians, selectLecturers, selectStudents } from "../../redux/index.selectors";
import { selectArray } from "../../utility/custom/arabicCountries";
import { staffTypesArray } from "../../utility/custom/staffTypesArray";
import { studentTypesArray } from "../../utility/custom/StudentArrays";
import { lecturerPositions } from "../../utility/custom/lecturerPositions";
import { AbilityContext } from "../../utility/context/Can";
import WithSpinner from "../../custom/with spinner/WithSpinner.component";
import UsersTableComponent from "./components/users table/UsersTable.component";
import { useFormik } from "formik";
import LinkStudentsToGuardianComponent from "./components/guardians table/LinkStudentsToGuardian.component";
import CardViewerHorizontalNav from "../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component";
import { createStructuredSelector } from "reselect";
import { addGuardianAsync, addLecturerAsync, addStaffAsync, addStudentAsync, getAllIntakesAsync, getAllStaffAsync, getGuardiansAsync, getLecturersAsync, getStudentsAsync } from "../../redux/index.actions";
import StudentsTableRow from "./components/students table/StudentsTableRow.component"
import GuardiansTableRow from "./components/guardians table/GuardiansTableRow.component"
import LecturersTableRow from "./components/lecturers table/LecturersTableRow.component"
import AllStaffTableRow from "./components/all staff table/AllStaffTableRow.component";

//------------WITH SPINNERS-------------------
const UsersTableWithSpinner = WithSpinner(UsersTableComponent)
//-------------------------------------------------

const UsersPage = (props) => {
  const [adminPassword, setAdminPassword] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [lecturerPassword, setLecturerPassword] = useState("");
  const [guardianPassword, setGuardianPassword] = useState("");
  const [visible, setVisible] = useState({
    staff: false,
    confirmStaff: false,
    student: false,
    confirmStudent: false,
    lecturer: false,
    confirmLecturer: false,
    guardian: false,
    confirmGuardian: false,
  })
  useEffect(() => {
    props.getStudents()
    props.getLecturers()
    props.getGuardians()
    props.getAllStaff()
  }, []);

  const [activeTab, setActiveTab] = useState(0)
  const [guardianStudents, setGuardianStudents] = useState([])
  const [image, setImage] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const intakes = useSelector(selectAllIntakes)
  let intakesArray = [{ title: "", value: "" }]
  if (intakes)
    intakes.map(intake =>
      intakesArray.push({ title: intake.code, value: intake.code })
    )

  //---------INITTIAL VALUES----------------
  const addStaffInitialValues = {
    fullName: "",
    fullNameArabic: "",
    username: "",
    phoneNumber: "",
    email: "",
    birthdate: "",
    nationality: "",
    gender: "",
    password: "",
    confirmPassword: "",
    userId: "",
    staffType: "",
    nationalIdentity: "",
  }
  const addStudentInitialValues = {
    fullName: "",
    fullNameArabic: "",
    username: "",
    phoneNumber: "",
    email: "",
    birthdate: "",
    nationality: "",
    gender: "",
    password: "",
    confirmPassword: "",
    userId: "",
    nationalIdentity: "",
    studentType: "",
    intakeCode: "",
  }
  const addLecturerInitialValues = {
    fullName: "",
    fullNameArabic: "",
    username: "",
    phoneNumber: "",
    email: "",
    birthdate: "",
    nationality: "",
    gender: "",
    password: "",
    confirmPassword: "",
    userId: "",
    lecturerPosition: "",
    nationalIdentity: "",
  }
  const addGuardianInitialValues = {
    fullName: "",
    fullNameArabic: "",
    username: "",
    phoneNumber: "",
    email: "",
    birthdate: "",
    nationality: "",
    gender: "",
    password: "",
    confirmPassword: "",
    nationalIdentity: "",
  }

  //---------FIELDS-----------
  const addStaffFields = [
    {
      title: intl.formatMessage({ id: "STAFF.ID" }),
      value: "userId",
      icon: <Codepen size={15} />,
    },
    {
      title: intl.formatMessage({ id: "STAFF.TYPE" }),
      value: "staffType",
      icon: <Filter size={15} />,
      type: "select",
      options: [{ title: "", value: "" }, ...staffTypesArray(intl)],
    },
    {
      title: intl.formatMessage({ id: "USERNAME" }),
      value: "username",
      icon: <User size={15} />,
    },
    {
      title: intl.formatMessage({ id: "FULL.NAME.ENGLISH" }),
      value: "fullName",
      icon: <FileText size={15} />,
    },
    {
      title: intl.formatMessage({ id: "FULL.NAME.ARABIC" }),
      value: "fullNameArabic",
      icon: <FileText size={15} />,
    },
    {
      title: intl.formatMessage({ id: "PASSWORD" }),
      value: "password",
      icon: <Key size={15} />,
      setState: value => setAdminPassword(value),
      type: "password",
      password: true,
      visible: visible["staff"],
      setVisible: () => setVisible({ ...visible, staff: !visible["staff"] }),
    },
    {
      title: intl.formatMessage({ id: "CONFIRM.PASSWORD" }),
      value: "confirmPassword",
      icon: <Lock size={15} />,
      type: "password",
      password: true,
      visible: visible["confirmStaff"],
      setVisible: () =>
        setVisible({ ...visible, confirmStaff: !visible["confirmStaff"] }),
    },
    {
      title: intl.formatMessage({ id: "BIRTH.DATE" }),
      value: "birthdate",
      icon: <Calendar size={15} />,
      type: "date",
    },
    {
      title: intl.formatMessage({ id: "PHONE.NUMBER" }),
      value: "phoneNumber",
      icon: <Smartphone size={15} />,
    },
    {
      title: intl.formatMessage({ id: "NATIONALITY" }),
      value: "nationality",
      icon: <MapPin size={15} />,
      type: "select",
      options: selectArray(intl),
    },
    {
      title: intl.formatMessage({ id: "NATIONAL.IDENTITY" }),
      value: "nationalIdentity",
      icon: <Globe size={15} />,
    },
    {
      title: intl.formatMessage({ id: "EMAIL" }),
      value: "email",
      icon: <AtSign size={15} />,
    },
    {
      title: intl.formatMessage({ id: "GENDER" }),
      value: "gender",
      icon: <Clipboard size={15} />,
      type: "select",
      options: [
        { value: "", title: "" },
        { value: "male", title: intl.formatMessage({ id: "MALE" }) },
        { value: "female", title: intl.formatMessage({ id: "FEMALE" }) },
      ],
    },
  ]
  const addStudentFields = [
    {
      title: intl.formatMessage({ id: "STUDENT.ID" }),
      value: "userId",
      icon: <Codepen size={15} />,
    },
    {
      title: intl.formatMessage({ id: "USERNAME" }),
      value: "username",
      icon: <User size={15} />,
    },
    {
      title: intl.formatMessage({ id: "INTAKE.CODE" }),
      value: "intakeCode",
      icon: <BookOpen size={15} />,
      type: "select",
      options: intakesArray,
    },
    {
      title: intl.formatMessage({ id: "FULL.NAME.ENGLISH" }),
      value: "fullName",
      icon: <FileText size={15} />,
    },
    {
      title: intl.formatMessage({ id: "FULL.NAME.ARABIC" }),
      value: "fullNameArabic",
      icon: <FileText size={15} />,
    },
    {
      title: intl.formatMessage({ id: "PASSWORD" }),
      value: "password",
      icon: <Key size={15} />,
      setState: value => setStudentPassword(value),
      type: "password",
      password: true,
      visible: visible["student"],
      setVisible: () =>
        setVisible({ ...visible, student: !visible["student"] }),
    },
    {
      title: intl.formatMessage({ id: "CONFIRM.PASSWORD" }),
      value: "confirmPassword",
      icon: <Lock size={15} />,
      type: "password",
      password: true,
      visible: visible["confirmStudent"],
      setVisible: () =>
        setVisible({ ...visible, confirmStudent: !visible["confirmStudent"] }),
    },
    {
      title: intl.formatMessage({ id: "STUDENT.TYPE" }),
      value: "studentType",
      icon: <Award size={15} />,
      type: "select",
      options: studentTypesArray(intl),
    },
    {
      title: intl.formatMessage({ id: "BIRTH.DATE" }),
      value: "birthdate",
      icon: <Calendar size={15} />,
      type: "date",
    },
    {
      title: intl.formatMessage({ id: "PHONE.NUMBER" }),
      value: "phoneNumber",
      icon: <Smartphone size={15} />,
    },
    {
      title: intl.formatMessage({ id: "NATIONALITY" }),
      value: "nationality",
      icon: <MapPin size={15} />,
      type: "select",
      options: selectArray(intl),
    },
    {
      title: intl.formatMessage({ id: "NATIONAL.IDENTITY" }),
      value: "nationalIdentity",
      icon: <Globe size={15} />,
    },
    {
      title: intl.formatMessage({ id: "EMAIL" }),
      value: "email",
      icon: <AtSign size={15} />,
    },
    {
      title: intl.formatMessage({ id: "GENDER" }),
      value: "gender",
      icon: <Clipboard size={15} />,
      type: "select",
      options: [
        { value: "", title: "" },
        { value: "male", title: intl.formatMessage({ id: "MALE" }) },
        { value: "female", title: intl.formatMessage({ id: "FEMALE" }) },
      ],
    },
  ]
  const addLecturerFields = [
    {
      title: intl.formatMessage({ id: "LECTURER.ID" }),
      value: "userId",
      icon: <Codepen size={15} />,
    },
    {
      title: intl.formatMessage({ id: "USERNAME" }),
      value: "username",
      icon: <User size={15} />,
    },
    {
      title: intl.formatMessage({ id: "FULL.NAME.ENGLISH" }),
      value: "fullName",
      icon: <FileText size={15} />,
    },
    {
      title: intl.formatMessage({ id: "FULL.NAME.ARABIC" }),
      value: "fullNameArabic",
      icon: <FileText size={15} />,
    },
    {
      title: intl.formatMessage({ id: "LECTURER.POSITION" }),
      value: "lecturerPosition",
      icon: <Award size={15} />,
      type: "select",
      options: lecturerPositions(intl),
    },
    {
      title: intl.formatMessage({ id: "PASSWORD" }),
      value: "password",
      icon: <Key size={15} />,
      setState: value => setLecturerPassword(value),
      type: "password",
      password: true,
      visible: visible["lecturer"],
      setVisible: () =>
        setVisible({ ...visible, lecturer: !visible["lecturer"] }),
    },
    {
      title: intl.formatMessage({ id: "CONFIRM.PASSWORD" }),
      value: "confirmPassword",
      icon: <Lock size={15} />,
      type: "password",
      password: true,
      visible: visible["confirmLecturer"],
      setVisible: () =>
        setVisible({
          ...visible,
          confirmLecturer: !visible["confirmLecturer"],
        }),
    },
    {
      title: intl.formatMessage({ id: "BIRTH.DATE" }),
      value: "birthdate",
      icon: <Calendar size={15} />,
      type: "date",
    },
    {
      title: intl.formatMessage({ id: "PHONE.NUMBER" }),
      value: "phoneNumber",
      icon: <Smartphone size={15} />,
    },
    {
      title: intl.formatMessage({ id: "NATIONALITY" }),
      value: "nationality",
      icon: <MapPin size={15} />,
      type: "select",
      options: selectArray(intl),
    },
    {
      title: intl.formatMessage({ id: "NATIONAL.IDENTITY" }),
      value: "nationalIdentity",
      icon: <Globe size={15} />,
    },
    {
      title: intl.formatMessage({ id: "EMAIL" }),
      value: "email",
      icon: <AtSign size={15} />,
    },
    {
      title: intl.formatMessage({ id: "GENDER" }),
      value: "gender",
      icon: <Clipboard size={15} />,
      type: "select",
      options: [
        { value: "", title: "" },
        { value: "male", title: intl.formatMessage({ id: "MALE" }) },
        { value: "female", title: intl.formatMessage({ id: "FEMALE" }) },
      ],
    },
  ]
  const addGuardianFields = [
    {
      title: intl.formatMessage({ id: "USERNAME" }),
      value: "username",
      icon: <User size={15} />,
    },
    {
      title: intl.formatMessage({ id: "FULL.NAME.ENGLISH" }),
      value: "fullName",
      icon: <FileText size={15} />,
    },
    {
      title: intl.formatMessage({ id: "FULL.NAME.ARABIC" }),
      value: "fullNameArabic",
      icon: <FileText size={15} />,
    },
    {
      title: intl.formatMessage({ id: "PASSWORD" }),
      value: "password",
      icon: <Key size={15} />,
      setState: value => setGuardianPassword(value),
      type: "password",
      password: true,
      visible: visible["guardian"],
      setVisible: () =>
        setVisible({ ...visible, guardian: !visible["guardian"] }),
    },
    {
      title: intl.formatMessage({ id: "CONFIRM.PASSWORD" }),
      value: "confirmPassword",
      icon: <Lock size={15} />,
      type: "password",
      password: true,
      visible: visible["confirmGuardian"],
      setVisible: () =>
        setVisible({
          ...visible,
          confirmGuardian: !visible["confirmGuardian"],
        }),
    },
    {
      title: intl.formatMessage({ id: "BIRTH.DATE" }),
      value: "birthdate",
      icon: <Calendar size={15} />,
      type: "date",
    },
    {
      title: intl.formatMessage({ id: "PHONE.NUMBER" }),
      value: "phoneNumber",
      icon: <Smartphone size={15} />,
    },
    {
      title: intl.formatMessage({ id: "NATIONALITY" }),
      value: "nationality",
      icon: <MapPin size={15} />,
      type: "select",
      options: selectArray(intl),
    },
    {
      title: intl.formatMessage({ id: "NATIONAL.IDENTITY" }),
      value: "nationalIdentity",
      icon: <Globe size={15} />,
    },
    {
      title: intl.formatMessage({ id: "EMAIL" }),
      value: "email",
      icon: <AtSign size={15} />,
    },
    {
      title: intl.formatMessage({ id: "GENDER" }),
      value: "gender",
      icon: <Clipboard size={15} />,
      type: "select",
      options: [
        { value: "", title: "" },
        { value: "male", title: intl.formatMessage({ id: "MALE" }) },
        { value: "female", title: intl.formatMessage({ id: "FEMALE" }) },
      ],
    },
  ]

  //---------VALIDATION SCHEMAS-----------
  const addStaffValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "len",
        intl.formatMessage({ id: "USERNAME.SHOULD.BE.MINIMUM.4.CHARACTERS" }),
        value => (value ? value.length > 3 : null)
      )
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        intl.formatMessage({ id: "SPACES.ARE.INVALID.IN.USERNAME" })
      ),
    userId: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      ),
    staffType: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    password: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        intl.formatMessage({
          id:
            "THE.PASSWORD.MUST.CONTAIN.AT.LEAST.EIGHT.CHARACTERS,.ONE.UPPERCASE.LETTER,.ONE.LOWERCASE.LETTER.AND.ONE.NUMBER",
        })
      ),
    confirmPassword: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "match",
        intl.formatMessage({ id: "PASSWORDS.MUST.MATCH" }),
        value => (value ? value === adminPassword : null)
      ),
    fullName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    fullNameArabic: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    nationalIdentity: Yup.string()
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })),
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
    email: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .email(intl.formatMessage({ id: "WRONG.EMAIL.FORMAT" })),
    gender: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    birthdate: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    nationality: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })
  const addStudentValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "len",
        intl.formatMessage({ id: "USERNAME.SHOULD.BE.MINIMUM.4.CHARACTERS" }),
        value => (value ? value.length > 3 : null)
      )
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        intl.formatMessage({ id: "SPACES.ARE.INVALID.IN.USERNAME" })
      ),
    password: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        intl.formatMessage({
          id:
            "THE.PASSWORD.MUST.CONTAIN.AT.LEAST.EIGHT.CHARACTERS,.ONE.UPPERCASE.LETTER,.ONE.LOWERCASE.LETTER.AND.ONE.NUMBER",
        })
      ),
    confirmPassword: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "match",
        intl.formatMessage({ id: "PASSWORDS.MUST.MATCH" }),
        value => (value ? value === studentPassword : null)
      ),
    fullName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    fullNameArabic: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    nationalIdentity: Yup.string()
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })),
    userId: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
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
    gender: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    birthdate: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    nationality: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    studentType: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    intakeCode: Yup.string(),
  })
  const addLecturerValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "len",
        intl.formatMessage({ id: "USERNAME.SHOULD.BE.MINIMUM.4.CHARACTERS" }),
        value => (value ? value.length > 3 : null)
      )
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        intl.formatMessage({ id: "SPACES.ARE.INVALID.IN.USERNAME" })
      ),
    userId: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      ),
    password: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        intl.formatMessage({
          id:
            "THE.PASSWORD.MUST.CONTAIN.AT.LEAST.EIGHT.CHARACTERS,.ONE.UPPERCASE.LETTER,.ONE.LOWERCASE.LETTER.AND.ONE.NUMBER",
        })
      ),
    confirmPassword: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "match",
        intl.formatMessage({ id: "PASSWORDS.MUST.MATCH" }),
        value => (value ? value === lecturerPassword : null)
      ),
    fullName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    fullNameArabic: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    lecturerPosition: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    nationalIdentity: Yup.string()
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })),
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
    email: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .email(intl.formatMessage({ id: "WRONG.EMAIL.FORMAT" })),
    gender: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    birthdate: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    nationality: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })
  const addGuardianValidationSchema = Yup.object().shape({
    username: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "len",
        intl.formatMessage({ id: "USERNAME.SHOULD.BE.MINIMUM.4.CHARACTERS" }),
        value => (value ? value.length > 3 : null)
      )
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        intl.formatMessage({ id: "SPACES.ARE.INVALID.IN.USERNAME" })
      ),
    password: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        intl.formatMessage({
          id:
            "THE.PASSWORD.MUST.CONTAIN.AT.LEAST.EIGHT.CHARACTERS,.ONE.UPPERCASE.LETTER,.ONE.LOWERCASE.LETTER.AND.ONE.NUMBER",
        })
      ),
    confirmPassword: Yup.string()
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" }))
      .test(
        "match",
        intl.formatMessage({ id: "PASSWORDS.MUST.MATCH" }),
        value => (value ? value === guardianPassword : null)
      ),
    fullName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    fullNameArabic: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    nationalIdentity: Yup.string()
      .matches(
        /^[0-9]*$/,
        intl.formatMessage({ id: "ONLY.NUMBERS.ARE.VALID.IN.THIS.FIELD" })
      )
      .required(intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })),
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
    gender: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    birthdate: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    nationality: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

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
    users: props.allStaff,
    dialogAttributes: {
      dialogTitle: intl.formatMessage({ id: "ADDING.STAFF" }),
      errorMessage: props.addStaffErrorMessage,
      isLoading: props.addStaffIsLoading,
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
          props.addStaff(requestBody, messages)
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
      isLoading: props.addStaffIsLoading,
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
    getUsers: () => props.getAllStaff(),
    title: intl.formatMessage({ id: "ALL.STAFF" }),
    emptyMessage: intl.formatMessage({ id: "NO.STAFF.MEMBERS.AVAILABLE" }),
  }
  //--------------STUDENTS-------------
  const studentsTableAttributes = {
    users: props.students,
    dialogAttributes: {
      dialogTitle: intl.formatMessage({ id: "ADDING.STUDENT" }),
      errorMessage: props.addStudentErrorMessage,
      isLoading: props.addStudentIsLoading,
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
          props.addStudent(requestBody, messages)
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
      isLoading: props.addStudentIsLoading,
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
      props.getAllIntakes()
      props.getStudents()
    },
    title: intl.formatMessage({ id: "STUDENTS" }),
    emptyMessage: intl.formatMessage({ id: "NO.STUDENTS.AVAILABLE" }),
  }
  //--------------GUARDIANS-------------
  const guardiansTableAttributes = {
    users: props.guardians,
    dialogAttributes: {
      dialogTitle: intl.formatMessage({ id: "ADDING.GUARDIAN" }),
      errorMessage: props.addGuardianErrorMessage,
      isLoading: props.addGuardianIsLoading,
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
          props.addGuardian(
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
            <LinkStudentsToGuardianComponent
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
      isLoading: props.addGuardianIsLoading,
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
    getUsers: () => props.getGuardians(),
    title: intl.formatMessage({ id: "GUARDIANS" }),
    emptyMessage: intl.formatMessage({ id: "NO.GUARDIANS.AVAILABLE" }),
  }
  //--------------LECTURERS-------------
  const lecturersTableAttributes = {
    users: props.lecturers,
    dialogAttributes: {
      dialogTitle: intl.formatMessage({ id: "ADDING.LECTURER" }),
      errorMessage: props.addLecturerErrorMessage,
      isLoading: props.addLecturerIsLoading,
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
          props.addLecturer(requestBody, messages)
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
      isLoading: props.addLecturerIsLoading,
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
    getUsers: () => props.getLecturers(),
    title: intl.formatMessage({ id: "LECTURERS" }),
    emptyMessage: intl.formatMessage({ id: "NO.LECTURERS.AVAILABLE" }),
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
          toBeDispatchedTryAgain={props.getStudents}
          errorMessage={props.getStudentsErrorMessage || props.getAllIntakesErrorMessage}
          isLoading={props.getStudentsIsLoading || props.getAllIntakesIsLoading}
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
          toBeDispatchedTryAgain={props.getLecturers}
          errorMessage={props.getLecturersErrorMessage}
          isLoading={props.getLecturersIsLoading}
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
          toBeDispatchedTryAgain={props.getGuardians}
          errorMessage={props.getGuardiansErrorMessage}
          isLoading={props.getGuardiansIsLoading}
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
          toBeDispatchedTryAgain={props.getAllStaff}
          errorMessage={props.getAllStaffErrorMessage}
          isLoading={props.getAllStaffIsLoading}
          {...allStaffTableAttributes}
        />
      ),
    })

  return (
    <Row className="match-height">
      <Col xs={12}>
        <Card>
          <CardBody style={{ paddingBottom: "0px" }}>
            <CardViewerHorizontalNav {...attributes} />
          </CardBody>
        </Card>
      </Col>
    </Row>
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
)(UsersPage)
