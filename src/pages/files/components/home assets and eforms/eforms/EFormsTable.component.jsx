import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import { Plus, AlignCenter, Image, File, RefreshCw } from "react-feather"
import * as Yup from "yup"
import EFormsTableRow from "./EFormsTableRow.component"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import Table from "../../../../../custom/table/table.component"
import CustomForm from "../../../../../custom/customform/customform.component"
import {
  getEFormsAsync,
  createEFormAsync,
  clearCreateEFormErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectEForms,
  selectCreateEFormErrorMessage,
  selectCreateEFormIsLoading,
} from "../../../../../redux/index.selectors"

const EFormsTable = ({
  getEForms,
  createEForm,
  clearCreateEFormErrorMessage,
  eForms,
  createEFormErrorMessage,
  createEFormIsLoading,
}) => {
  const [searchField, setSearchField] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [image, setImage] = useState("")
  const [pdf, setPdf] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let filteredEForms = []
  if (eForms)
    filteredEForms = eForms.filter(eForm =>
      eForm.displayName.toLowerCase().includes(searchField.toLowerCase())
    )

  const createEFormValidationSchema = Yup.object().shape({
    fileName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createEFormFormik = useFormik({
    initialValues: { fileName: "" },
    enableReinitialize: true,
    validationSchema: createEFormValidationSchema,
    onSubmit: values =>
      createEForm(
        { ...values, imageBase64: image, pdfBase64: pdf },
        {
          success: {
            title: intl.formatMessage({
              id: "CREATE.EFORM.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "CREATE.EFORM.SUCCESS.CONTENT",
            }),
          },
        }
      ),
  })

  const createEFormFields = [
    {
      title: intl.formatMessage({ id: "DISPLAY.NAME" }),
      value: "fileName",
      icon: <AlignCenter size={15} />,
    },
  ]

  const createEFormDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1 mr-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "CREATING.EFORM" }),
      content: (
        <CustomForm
          buttonTitle={intl.formatMessage({ id: "CREATE.EFORM" })}
          fields={createEFormFields}
          isLoading={createEFormIsLoading}
          formik={createEFormFormik}
          buttonStatus={!image || !pdf}
          additionalFields={[
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
                  <Image size={20} />
                  <h4 className="mb-0 ml-50">
                    <FormattedMessage id="IMAGE" />
                  </h4>
                </div>
                <></>
              </div>
              {
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImage(e.target.files[0])}
                />
              }
            </div>,
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
                  <File size={20} />
                  <h4 className="mb-0 ml-50">
                    <FormattedMessage id="PDF.FILE" />
                  </h4>
                </div>
                <></>
              </div>
              {
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={e => setPdf(e.target.files[0])}
                />
              }
            </div>,
          ]}
        />
      ),
    },
    errorMessage: createEFormErrorMessage,
    isLoading: createEFormIsLoading,
    closingAction: () => {
      createEFormFormik.resetForm()
      setImage("")
      setPdf("")
      clearCreateEFormErrorMessage()
    },
  }

  const tableAttributes = {
    buttons: [
      <Button className="px-1 " color="primary" onClick={() => getEForms()}>
        <RefreshCw size={15} />
      </Button>,
    ],
    search: {
      placeHolder: intl.formatMessage({ id: "SEARCH.BY.FILE.NAME" }),
      handleChange: e => setSearchField(e.target.value),
      value: searchField,
    },
    pagination: {
      handleChange: page => setCurrentPage(page),
      rowsPerPage: 7,
      currentPage: currentPage,
    },
    table: {
      columns: [
        {
          title: intl.formatMessage({ id: "PHOTO" }),
        },
        {
          title: intl.formatMessage({ id: "DISPLAY.NAME" }),
        },
        {
          title: intl.formatMessage({ id: "SIZE" }),
        },
        {
          title: "",
        },
      ],
      row: eForm => <EFormsTableRow eForm={eForm} />,
    },
    givenArray: filteredEForms,
    title: intl.formatMessage({ id: "EFORMS" }),
    emptyMessage: intl.formatMessage({ id: "NO.EFORMS.YET" }),
  }
  if (ability.can("manage", "eForm-POST"))
    tableAttributes.buttons = [
      <Dialog {...createEFormDialogAttributes} />,
      ...tableAttributes.buttons,
    ]
  return <Table {...tableAttributes} />
}

const mapStateToProps = createStructuredSelector({
  eForms: selectEForms,
  createEFormErrorMessage: selectCreateEFormErrorMessage,
  createEFormIsLoading: selectCreateEFormIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getEForms: () => dispatch(getEFormsAsync()),
  createEForm: (requestBody, messages) =>
    dispatch(createEFormAsync(requestBody, messages)),
  clearCreateEFormErrorMessage: () => dispatch(clearCreateEFormErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EFormsTable)
