import React, { useState } from "react"
import * as Yup from "yup"
import { useIntl } from "react-intl"
import { useSelector } from "react-redux"
import {
  User,
  Key,
  Lock,
  Clipboard,
  FileText,
  Smartphone,
  AtSign,
  Users,
  Calendar,
  MapPin,
  Codepen,
  Filter,
  Globe,
  Award,
  BookOpen,
  Activity,
} from "react-feather"
import { selectArray } from "../../../utility/custom/arabicCountries"
import { studentTypesArray } from "../../../utility/custom/StudentArrays"
import { lecturerPositions } from "../../../utility/custom/lecturerPositions"
import { staffTypesArray } from "../../../utility/custom/staffTypesArray"
import { selectAllIntakes } from "../../../redux/index.selectors"

const AddingUserValidationSchema = WrappedComponent => props => {
  const [adminPassword, setAdminPassword] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const [lecturerPassword, setLecturerPassword] = useState("")
  const [guardianPassword, setGuardianPassword] = useState("")
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
  const intl = useIntl()

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

  props = {
    ...props,
    addStaffInitialValues,
    addStaffFields,
    addStaffValidationSchema,
    addStudentInitialValues,
    addStudentFields,
    addStudentValidationSchema,
    addLecturerInitialValues,
    addLecturerFields,
    addLecturerValidationSchema,
    addGuardianInitialValues,
    addGuardianFields,
    addGuardianValidationSchema,
    setVisible,
  }

  return <WrappedComponent {...props} />
}

export default AddingUserValidationSchema
