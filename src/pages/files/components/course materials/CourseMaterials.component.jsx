import React, { useState, useEffect, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Spinner,
  Button,
} from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import {
  AlignCenter,
  Book,
  Plus,
  Folder,
  File,
  Trash,
  RefreshCw,
  Image,
  HelpCircle,
} from "react-feather"
import * as Yup from "yup"
import { useFormik } from "formik"
import FileBrowser, { Icons } from "react-keyed-file-browser"
import classnames from "classnames"
import { AbilityContext } from "../../../../utility/context/Can"
import ErrorCard from "../../../../custom/errorcard/ErrorCard.component"
import CustomForm from "../../../../custom/customform/customform.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import Select from "../../../../custom/select/select.component"
import {
  getCourseMaterialsAsync,
  createCourseMaterialForSubjectAsync,
  deleteCourseMaterialForSubjectAsync,
  clearCreateCourseMaterialForSubjectErrorMessage,
  clearDeleteCourseMaterialForSubjectErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectSubjects,
  selectCourseMaterials,
  selectCurrentUserRole,
  selectCurrentLecturerOngoingSubjects,
  selectCreateCourseMaterialForSubjectErrorMessage,
  selectCreateCourseMaterialForSubjectIsLoading,
  selectDeleteCourseMaterialForSubjectErrorMessage,
  selectDeleteCourseMaterialForSubjectIsLoading,
} from "../../../../redux/index.selectors"
import "../../../../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css"
import "font-awesome/css/font-awesome.min.css"
import "./CourseMaterials.styles.scss"

const CourseMaterials = ({
  subjects,
  currentLecturerOngoingSubjects,
  courseMaterials,
  currentUserRole,
  createCourseMaterialForSubject,
  getCourseMaterials,
  deleteCourseMaterialForSubject,
  createCourseMaterialForSubjectErrorMessage,
  createCourseMaterialForSubjectIsLoading,
  deleteCourseMaterialForSubjectErrorMessage,
  deleteCourseMaterialForSubjectIsLoading,
  clearCreateCourseMaterialForSubjectErrorMessage,
  clearDeleteCourseMaterialForSubjectErrorMessage,
}) => {
  const [file, setFile] = useState("")
  const [fileType, setFileType] = useState("")
  const [subjectCode, setSubjectCode] = useState("")
  const [newFolder, setNewFolder] = useState({ text: "", touched: false })
  const [toBeDeleted, setToBeDeleted] = useState("")

  const ability = useContext(AbilityContext)

  useEffect(() => {
    setNewFolder({ text: "", touched: false })
  }, [subjectCode])
  useEffect(() => setFile(""), [fileType])

  const intl = useIntl()

  const includesCheck = (array, subjectCode) => {
    let found = false
    array.map(item => {
      if (item == subjectCode) found = true
    })
    return found
  }

  if (currentLecturerOngoingSubjects) {
    let subjectsArray = []
    currentLecturerOngoingSubjects.map(subject =>
      subjectsArray.push(subject.subjectCode)
    )
    currentLecturerOngoingSubjects = subjectsArray
  }

  let subjectsArray = []
  if (subjects || currentLecturerOngoingSubjects)
    if (currentUserRole === "staff")
      subjects.map(subject =>
        subjectsArray.push({ title: subject, value: subject })
      )
    else
      currentLecturerOngoingSubjects.map(subject =>
        subjectsArray.push({ title: subject, value: subject })
      )

  let courseMaterialsKeysArray = []
  if (courseMaterials)
    courseMaterials.map(courseMaterial => {
      if (
        currentUserRole === "staff" ||
        includesCheck(
          currentLecturerOngoingSubjects,
          courseMaterial.key.split("/")[0]
        )
      )
        courseMaterialsKeysArray.push({
          value: courseMaterial.key,
          label: courseMaterial.key,
        })
    })

  let courseMaterialsArray = []
  if (courseMaterials)
    courseMaterials.map(courseMaterial => {
      if (
        currentUserRole === "staff" ||
        includesCheck(
          currentLecturerOngoingSubjects,
          courseMaterial.key.split("/")[0]
        )
      )
        courseMaterialsArray.push(courseMaterial)
    })

  const createCourseMaterialFields = [
    {
      title: intl.formatMessage({ id: "DISPLAY.NAME" }),
      value: "fileName",
      icon: <AlignCenter size={15} />,
    },
    {
      title: intl.formatMessage({ id: "SUBJECT" }),
      value: "subjectCode",
      icon: <Book size={15} />,
      setState: value => setSubjectCode(value),
      type: "select",
      options: [{ value: "", title: "" }, ...subjectsArray],
    },
    {
      title: intl.formatMessage({ id: "FILE.TYPE" }),
      value: "fileType",
      icon: <HelpCircle size={15} />,
      setState: value => setFileType(value),
      type: "select",
      options: [
        { value: "", title: "" },
        { value: "pdf", title: "PDF" },
        { value: "jpg", title: intl.formatMessage({ id: "IMAGE" }) },
      ],
    },
  ]

  if (currentUserRole === "staff")
    createCourseMaterialFields[1].options.push({
      value: "New Folder",
      title: intl.formatMessage({ id: "NEW.FOLDER" }),
    })

  const createCourseMaterialValidationSchema = Yup.object().shape({
    fileName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    subjectCode: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    subjectCode: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createCourseMaterialFormik = useFormik({
    initialValues: { fileName: "", subjectCode: "" },
    enableReinitialize: true,
    validationSchema: createCourseMaterialValidationSchema,
    onSubmit: values =>
      createCourseMaterialForSubject(
        {
          ...values,
          base64: file,
          fileType: file ? file.type.split("/")[1] : "",
        },
        newFolder.text,
        {
          success: {
            title: intl.formatMessage({
              id: "CREATE.COURSE.MATERIAL.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "CREATE.COURSE.MATERIAL.SUCCESS.CONTENT",
            }),
          },
        }
      ),
  })

  const createCourseMaterialDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1 mr-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "CREATE.COURSE.MATERIAL" }),
      content: (
        <CustomForm
          buttonTitle={intl.formatMessage({ id: "CREATING.COURSE.MATERIAL" })}
          fields={createCourseMaterialFields}
          isLoading={createCourseMaterialForSubjectIsLoading}
          formik={createCourseMaterialFormik}
          buttonStatus={
            !file || (subjectCode === "New Folder" && !newFolder.text)
          }
          additionalFields={[
            <FormGroup
              style={{
                marginBottom: "5px",
                display: subjectCode === "New Folder" ? "block" : "none",
              }}
            >
              <Label>
                <FormattedMessage id="NEW.FOLDER.NAME" />
              </Label>
              <InputGroup
                className={classnames({
                  "is-invalid": !newFolder.text && newFolder.touched,
                  "input-group-merge": false,
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Folder size={15} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  className={classnames({
                    "is-invalid": !newFolder.text && newFolder.touched,
                  })}
                  onBlur={() => setNewFolder({ ...newFolder, touched: true })}
                  onChange={e =>
                    setNewFolder({ ...newFolder, text: e.target.value })
                  }
                />
              </InputGroup>
              {!newFolder.text && newFolder.touched && (
                <span
                  className="input-custom-animation-5"
                  style={{ color: "red" }}
                >
                  <FormattedMessage id="THIS.FIELD.IS.REQUIRED" />
                </span>
              )}
            </FormGroup>,
            fileType ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  className="my-1"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "-3px",
                    }}
                  >
                    {fileType === "pdf" ? (
                      <File size={20} />
                    ) : (
                      <Image size={20} />
                    )}
                    <h4 className="mb-0 ml-50">
                      {fileType === "pdf" ? (
                        <FormattedMessage id="PDF.FILE" />
                      ) : (
                        <FormattedMessage id="IMAGE" />
                      )}
                    </h4>
                  </div>
                </div>
                <input
                  type="file"
                  accept={fileType === "pdf" ? "application/pdf" : "image/*"}
                  onChange={e => setFile(e.target.files[0])}
                />
              </div>
            ) : (
              <></>
            ),
          ]}
        />
      ),
    },
    errorMessage: createCourseMaterialForSubjectErrorMessage,
    isLoading: createCourseMaterialForSubjectIsLoading,
    closingAction: () => {
      createCourseMaterialFormik.resetForm()
      setSubjectCode("")
      setFile("")
      setFileType("")
      clearCreateCourseMaterialForSubjectErrorMessage()
      setNewFolder({ text: "", touched: false })
    },
  }

  const deleteCourseMaterialDialogAttributes = {
    button: {
      color: "primary",
      title: <Trash size={15} />,
      className: "px-1 mr-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.COURSE.MATERIAL" }),
      content: (
        <Select
          array={courseMaterialsKeysArray}
          handleChange={e => setToBeDeleted(e)}
          label={intl.formatMessage({ id: "CHOOSE.FILE" })}
          stylesClassnames="marginBottom-130"
          height={120}
        />
      ),
      actions: [
        {
          title: deleteCourseMaterialForSubjectIsLoading ? (
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
          disabled: deleteCourseMaterialForSubjectIsLoading || !toBeDeleted,
          clickHandler: () =>
            deleteCourseMaterialForSubject(toBeDeleted.value, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.COURSE.MATERIAL.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.COURSE.MATERIAL.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteCourseMaterialForSubjectIsLoading,
        },
      ],
    },
    errorMessage: deleteCourseMaterialForSubjectErrorMessage,
    isLoading: deleteCourseMaterialForSubjectIsLoading,
    closingAction: () => clearDeleteCourseMaterialForSubjectErrorMessage(),
  }

  const OurHeaders = () => (
    <tr className="folder">
      <th>
        <FormattedMessage id="FILE" />
      </th>
      <th className="size">
        <FormattedMessage id="SIZE" />
      </th>
      <th className="modified"></th>
    </tr>
  )
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2 className="m-0">
          <FormattedMessage id="COURSE.MATERIALS" />
        </h2>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {ability.can("manage", "courseMaterial-POST") && (
            <Dialog {...createCourseMaterialDialogAttributes} />
          )}
          {ability.can("manage", "courseMaterial-DELETE") && (
            <Dialog {...deleteCourseMaterialDialogAttributes} />
          )}
          <Button
            className="px-1 "
            color="primary"
            onClick={() => getCourseMaterials()}
          >
            <RefreshCw size={15} />
          </Button>
        </div>
      </div>
      {courseMaterialsArray.length > 0 ? (
        <FileBrowser
          onSelectFile={e => window.open(e.url)}
          icons={Icons.FontAwesome(4)}
          files={courseMaterialsArray}
          detailRenderer={() => <></>}
          headerRenderer={OurHeaders}
          searchRenderer={null}
        />
      ) : (
        <ErrorCard
          info={true}
          content={intl.formatMessage({ id: "NO.COURSE.MATERIALS.YET" })}
        />
      )}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  subjects: selectSubjects,
  courseMaterials: selectCourseMaterials,
  currentUserRole: selectCurrentUserRole,
  currentLecturerOngoingSubjects: selectCurrentLecturerOngoingSubjects,
  createCourseMaterialForSubjectErrorMessage: selectCreateCourseMaterialForSubjectErrorMessage,
  createCourseMaterialForSubjectIsLoading: selectCreateCourseMaterialForSubjectIsLoading,
  deleteCourseMaterialForSubjectErrorMessage: selectDeleteCourseMaterialForSubjectErrorMessage,
  deleteCourseMaterialForSubjectIsLoading: selectDeleteCourseMaterialForSubjectIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getCourseMaterials: () => dispatch(getCourseMaterialsAsync()),
  createCourseMaterialForSubject: (requestBody, newFolder, messages) =>
    dispatch(
      createCourseMaterialForSubjectAsync(requestBody, newFolder, messages)
    ),
  deleteCourseMaterialForSubject: (key, messages) =>
    dispatch(deleteCourseMaterialForSubjectAsync(key, messages)),
  clearCreateCourseMaterialForSubjectErrorMessage: () =>
    dispatch(clearCreateCourseMaterialForSubjectErrorMessage()),
  clearDeleteCourseMaterialForSubjectErrorMessage: () =>
    dispatch(clearDeleteCourseMaterialForSubjectErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseMaterials)
