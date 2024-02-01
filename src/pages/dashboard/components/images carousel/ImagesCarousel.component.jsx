import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Card, CardBody, CardHeader, Spinner } from "reactstrap"
import { Carousel, CarouselItem } from "react-bootstrap"
import { Plus, Trash, ChevronLeft, ChevronRight } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import Dialog from "../../../../custom/dialog/dialog.component"
import { useRTL } from "../../../../utility/hooks/useRTL"
import { AbilityContext } from "../../../../utility/context/Can"
import {
  addImageToCarouselAsync,
  deleteImageFromCarouselAsync,
  clearAddImageToCarouselErrorMessage,
  clearDeleteImageFromCarouselErrorMessage,
} from "../../../../redux/index.actions"
import {
  selectCarouselImages,
  selectCurrentUserRole,
  selectAddImageToCarouselErrorMessage,
  selectAddImageToCarouselIsLoading,
  selectDeleteImageFromCarouselErrorMessage,
  selectDeleteImageFromCarouselIsLoading,
} from "../../../../redux/index.selectors"

const ImagesCarousel = ({
  images,
  currentUserRole,
  addImageToCarousel,
  deleteImageFromCarousel,
  clearAddImageToCarouselErrorMessage,
  clearDeleteImageFromCarouselErrorMessage,
  addImageToCarouselErrorMessage,
  addImageToCarouselIsLoading,
  deleteImageFromCarouselErrorMessage,
  deleteImageFromCarouselIsLoading,
}) => {
  const [selectedImage, setSelectedImage] = useState("")
  const [currentImage, setCurrentImage] = useState(0)

  const [rtl] = useRTL()
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const handleSelect = selectedIndex => setCurrentImage(selectedIndex)

  const addImageToCarouselDialogAttributes = {
    button: {
      color: "primary",
      title: <Plus size={15} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "ADDING.IMAGE.TO.CAROUSEL" }),
      content: (
        <input
          onChange={e => setSelectedImage(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-100"
        />
      ),
      actions: [
        {
          title: addImageToCarouselIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "ADD" })
          ),
          color: "primary",
          clickHandler: () =>
            addImageToCarousel(selectedImage, {
              success: {
                title: intl.formatMessage({
                  id: "ADD.IMAGE.TO.CAROUSEL.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "ADD.IMAGE.TO.CAROUSEL.SUCCESS.CONTENT",
                }),
              },
            }),
          disabled: addImageToCarouselIsLoading || !selectedImage,
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: addImageToCarouselIsLoading,
        },
      ],
    },
    errorMessage: addImageToCarouselErrorMessage,
    isLoading: addImageToCarouselIsLoading,
    closingAction: () => {
      setSelectedImage("")
      clearAddImageToCarouselErrorMessage()
    },
  }

  const deleteImageFromCarouselDialogAttributes = {
    button: {
      color: "primary",
      title: <Trash size={15} />,
      className: "btn-icon p-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.IMAGE.FROM.CAROUSEL" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.IMAGE.FROM.CAROUSEL",
      }),
      actions: [
        {
          title: deleteImageFromCarouselIsLoading ? (
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
            deleteImageFromCarousel(images[currentImage].key, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.IMAGE.FROM.CAROUSEL.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.IMAGE.FROM.CAROUSEL.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteImageFromCarouselIsLoading,
        },
      ],
    },
    errorMessage: deleteImageFromCarouselErrorMessage,
    isLoading: deleteImageFromCarouselIsLoading,
    closingAction: () => {
      setSelectedImage("")
      clearDeleteImageFromCarouselErrorMessage()
    },
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
          <FormattedMessage id="NEWS.CAROUSEL" />
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {currentUserRole !== "lecturer" ? (
            <>
              {ability.can("manage", "file-POST") && (
                <Dialog {...addImageToCarouselDialogAttributes} />
              )}
              {ability.can("manage", "file-DELETE") && (
                <Dialog {...deleteImageFromCarouselDialogAttributes} />
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <Carousel
          indicators={images.length > 8 ? false : true}
          interval={currentUserRole === "lecturer" ? 2500 : null}
          prevIcon={
            rtl ? <ChevronRight size={40} /> : <ChevronLeft size={40} />
          }
          nextIcon={
            rtl ? <ChevronLeft size={40} /> : <ChevronRight size={40} />
          }
          activeIndex={currentImage}
          onSelect={handleSelect}
        >
          {images.length ? (
            images.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  className="d-block w-100"
                  src={image.url}
                  style={{
                    objectFit: "cover",
                    height: "300px",
                  }}
                  alt="carousel"
                />
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <img />
            </CarouselItem>
          )}
        </Carousel>
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  images: selectCarouselImages,
  currentUserRole: selectCurrentUserRole,
  addImageToCarouselErrorMessage: selectAddImageToCarouselErrorMessage,
  addImageToCarouselIsLoading: selectAddImageToCarouselIsLoading,
  deleteImageFromCarouselErrorMessage: selectDeleteImageFromCarouselErrorMessage,
  deleteImageFromCarouselIsLoading: selectDeleteImageFromCarouselIsLoading,
})

const mapDispatchToProps = dispatch => ({
  addImageToCarousel: (image, messages) =>
    dispatch(addImageToCarouselAsync(image, messages)),
  deleteImageFromCarousel: (key, messages) =>
    dispatch(deleteImageFromCarouselAsync(key, messages)),
  clearAddImageToCarouselErrorMessage: () =>
    dispatch(clearAddImageToCarouselErrorMessage()),
  clearDeleteImageFromCarouselErrorMessage: () =>
    dispatch(clearDeleteImageFromCarouselErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImagesCarousel)
