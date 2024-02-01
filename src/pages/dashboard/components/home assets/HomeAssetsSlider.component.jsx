import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  Plus,
  Trash,
  Image,
  File,
  AlignCenter,
  ChevronLeft,
  ChevronRight,
} from "react-feather"
import { Spinner, Card, CardHeader, CardBody } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Carousel, CarouselItem } from "react-bootstrap"
import HomeAsset from "./HomeAsset.component"
import CustomForm from "../../../../custom/customform/customform.component"
import Dialog from "../../../../custom/dialog/dialog.component"
import { useRTL } from "../../../../utility/hooks/useRTL"
import {
  deleteHomeAssetAsync,
  createHomeAssetAsync,
  clearCreateHomeAssetErrorMessage,
  clearDeleteHomeAssetErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectHomeAssets,
  selectDeleteHomeAssetErrorMessage,
  selectDeleteHomeAssetIsLoading,
  selectCreateHomeAssetErrorMessage,
  selectCreateHomeAssetIsLoading,
} from "../../../../redux/index.selectors"

const HomeAssetsSlider = ({
  createHomeAsset,
  deleteHomeAsset,
  clearCreateHomeAssetErrorMessage,
  clearDeleteHomeAssetErrorMessage,
  homeAssets,
  createHomeAssetErrorMessage,
  createHomeAssetIsLoading,
  deleteHomeAssetErrorMessage,
  deleteHomeAssetIsLoading,
}) => {
  const [image, setImage] = useState("")
  const [pdf, setPdf] = useState("")
  const [selectedHomeAsset, setSelectedHomeAsset] = useState(0)

  const intl = useIntl()
  const [rtl] = useRTL()

  const handleSelect = selectedIndex => setSelectedHomeAsset(selectedIndex)

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
      className: "btn-icon p-50 mr-25",
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

  const deleteHomeAssetDialogAttributes = {
    button: {
      color: "primary",
      title: <Trash size={15} />,
      className: "btn-icon p-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.HOME.FILE" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.HOME.FILE",
      }),
      actions: [
        {
          title: deleteHomeAssetIsLoading ? (
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
            deleteHomeAsset(homeAssets[selectedHomeAsset].displayName, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.HOME.ASSET.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.HOME.ASSET.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteHomeAssetIsLoading,
        },
      ],
    },
    errorMessage: deleteHomeAssetErrorMessage,
    isLoading: deleteHomeAssetIsLoading,
    closingAction: () => clearDeleteHomeAssetErrorMessage(),
  }

  return (
    <Card>
      <CardHeader
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ margin: "0" }}>
          <FormattedMessage id="HOME.FILES" />
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Dialog {...createHomeAssetDialogAttributes} />
          <Dialog {...deleteHomeAssetDialogAttributes} />
        </div>
      </CardHeader>
      <CardBody style={{ paddingBottom: "5px" }}>
        <Carousel
          indicators={false}
          interval={null}
          prevIcon={
            rtl ? <ChevronRight size={40} /> : <ChevronLeft size={40} />
          }
          nextIcon={
            rtl ? <ChevronLeft size={40} /> : <ChevronRight size={40} />
          }
          activeIndex={selectedHomeAsset}
          onSelect={handleSelect}
        >
          {homeAssets ? (
            homeAssets.map((asset, index) => (
              <CarouselItem key={index}>
                <HomeAsset
                  displayName={asset.displayName}
                  img={asset.jpgUrl}
                  pdf={asset.pdfUrl}
                />
              </CarouselItem>
            ))
          ) : (
            <></>
          )}
        </Carousel>
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  homeAssets: selectHomeAssets,
  createHomeAssetErrorMessage: selectCreateHomeAssetErrorMessage,
  createHomeAssetIsLoading: selectCreateHomeAssetIsLoading,
  deleteHomeAssetErrorMessage: selectDeleteHomeAssetErrorMessage,
  deleteHomeAssetIsLoading: selectDeleteHomeAssetIsLoading,
})

const mapDispatchToProps = dispatch => ({
  createHomeAsset: (requestBody, messages) =>
    dispatch(createHomeAssetAsync(requestBody, messages)),
  deleteHomeAsset: (folderName, messages) =>
    dispatch(deleteHomeAssetAsync(folderName, messages)),
  clearCreateHomeAssetErrorMessage: () =>
    dispatch(clearCreateHomeAssetErrorMessage()),
  clearDeleteHomeAssetErrorMessage: () =>
    dispatch(clearDeleteHomeAssetErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeAssetsSlider)
