import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import { Plus, AlignCenter, Image, File, RefreshCw } from "react-feather"
import * as Yup from "yup"
import HomeAssetsTableRow from "./HomeAssetsTableRow.component"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import Table from "../../../../../custom/table/table.component"
import CustomForm from "../../../../../custom/customform/customform.component"
import {
  getHomeAssetsAsync,
  createHomeAssetAsync,
  clearCreateHomeAssetErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectHomeAssets,
  selectCreateHomeAssetErrorMessage,
  selectCreateHomeAssetIsLoading,
} from "../../../../../redux/index.selectors"

const HomeAssetsTable = ({
  getHomeAsset,
  createHomeAsset,
  clearCreateHomeAssetErrorMessage,
  homeAssets,
  createHomeAssetErrorMessage,
  createHomeAssetIsLoading,
}) => {
  const [searchField, setSearchField] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [image, setImage] = useState("")
  const [pdf, setPdf] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let filteredHomeAssets = []
  if (homeAssets)
    filteredHomeAssets = homeAssets.filter(homeAsset =>
      homeAsset.displayName.toLowerCase().includes(searchField.toLowerCase())
    )

  const createHomeAssetValidationSchema = Yup.object().shape({
    fileName: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  })

  const createHomeAssetFormik = useFormik({
    initialValues: { fileName: "" },
    enableReinitialize: true,
    validationSchema: createHomeAssetValidationSchema,
    onSubmit: values =>
      createHomeAsset(
        { ...values, imageBase64: image, pdfBase64: pdf },
        {
          success: {
            title: intl.formatMessage({
              id: "CREATE.HOME.ASSET.SUCCESS.TITLE",
            }),
            content: intl.formatMessage({
              id: "CREATE.HOME.ASSET.SUCCESS.CONTENT",
            }),
          },
        }
      ),
  })

  const createHomeAssetFields = [
    {
      title: intl.formatMessage({ id: "DISPLAY.NAME" }),
      value: "fileName",
      icon: <AlignCenter size={15} />,
    },
  ]

  const createHomeAssetDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "px-1 mr-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "CREATING.HOME.FILE" }),
      content: (
        <CustomForm
          buttonTitle={intl.formatMessage({ id: "CREATE.HOME.FILE" })}
          fields={createHomeAssetFields}
          isLoading={createHomeAssetIsLoading}
          formik={createHomeAssetFormik}
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
    errorMessage: createHomeAssetErrorMessage,
    isLoading: createHomeAssetIsLoading,
    closingAction: () => {
      createHomeAssetFormik.resetForm()
      setImage("")
      setPdf("")
      clearCreateHomeAssetErrorMessage()
    },
  }

  const tableAttributes = {
    buttons: [
      <Button className="px-1 " color="primary" onClick={() => getHomeAsset()}>
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
      row: homeAsset => <HomeAssetsTableRow homeAsset={homeAsset} />,
    },
    givenArray: filteredHomeAssets,
    title: intl.formatMessage({ id: "HOME.FILES" }),
    emptyMessage: intl.formatMessage({ id: "NO.HOME.FILES.YET" }),
  }
  if (ability.can("manage", "home_asset-POST"))
    tableAttributes.buttons = [
      <Dialog {...createHomeAssetDialogAttributes} />,
      ...tableAttributes.buttons,
    ]
  return <Table {...tableAttributes} />
}

const mapStateToProps = createStructuredSelector({
  homeAssets: selectHomeAssets,
  createHomeAssetErrorMessage: selectCreateHomeAssetErrorMessage,
  createHomeAssetIsLoading: selectCreateHomeAssetIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getHomeAsset: () => dispatch(getHomeAssetsAsync()),
  createHomeAsset: (requestBody, messages) =>
    dispatch(createHomeAssetAsync(requestBody, messages)),
  clearCreateHomeAssetErrorMessage: () =>
    dispatch(clearCreateHomeAssetErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeAssetsTable)
