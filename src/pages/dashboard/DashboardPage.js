import React, { useEffect, useContext } from "react"
import { connect } from "react-redux"
import { Row, Col } from "reactstrap"
import { createStructuredSelector } from "reselect"
import WithSpinner from "../../custom/with spinner/WithSpinner.component"
import { AbilityContext } from "../../utility/context/Can"
import ImagesCarousel from "./components/images carousel/ImagesCarousel.component"
import AnnouncementsSlider from "./components/announcements slider/AnnouncementsSlider.component"
import {
  getCarouselImagesAsync,
  getAllAnnouncementsForLecturerAsync,
  getCurrentUserConsultationsAsync,
  getChatsOfUserAsync,
} from "../../redux/index.actions"
import {
  selectCurrentUserRole,
  selectGetCarouselImagesErrorMessage,
  selectGetCarouselImagesIsLoading,
  selectGetAllAnnouncementsForLecturerErrorMessage,
  selectGetAllAnnouncementsForLecturerIsLoading,
} from "../../redux/index.selectors"
import "./components/home assets/HomeAsset.styles.scss"
//------------WITH SPINNERS---------------
const ImagesCarouselWithSpinner = WithSpinner(ImagesCarousel)
const AnnouncementsSliderWithSpinner = WithSpinner(AnnouncementsSlider)
//----------------------------------------
const DashboardPage = ({
  getCarouselImages,
  getAllAnnouncementsForLecturer,
  getCurrentUserConsultations,
  getCurrentUserChats,
  currentUserRole,
  getCarouselImagesErrorMessage,
  getCarouselImagesIsLoading,
  getHomeAssetsErrorMessage,
  getAllAnnouncementsForLecturerIsLoading,
  getAllAnnouncementsForLecturerErrorMessage,
}) => {
  const ability = useContext(AbilityContext)

  useEffect(() => {
    if (currentUserRole === "lecturer") {
      getCurrentUserChats()
      getCurrentUserConsultations()
    }
  }, [])
  return (
    <Row>
      <Col md={6}>
        <ImagesCarouselWithSpinner
          card={true}
          errorMessage={getCarouselImagesErrorMessage}
          isLoading={getCarouselImagesIsLoading}
          toBeDispatchedUseEffect={getCarouselImages}
          toBeDispatchedTryAgain={getCarouselImages}
        />
      </Col>
      {currentUserRole === "lecturer" ? (
        <Col md={6}>
          <AnnouncementsSliderWithSpinner
            card={true}
            errorMessage={getAllAnnouncementsForLecturerErrorMessage}
            isLoading={getAllAnnouncementsForLecturerIsLoading}
            toBeDispatchedUseEffect={getAllAnnouncementsForLecturer}
            toBeDispatchedTryAgain={getAllAnnouncementsForLecturer}
          />
        </Col>
      ) : (
        <></>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUserRole: selectCurrentUserRole,
  getCarouselImagesErrorMessage: selectGetCarouselImagesErrorMessage,
  getCarouselImagesIsLoading: selectGetCarouselImagesIsLoading,
  getAllAnnouncementsForLecturerErrorMessage: selectGetAllAnnouncementsForLecturerErrorMessage,
  getAllAnnouncementsForLecturerIsLoading: selectGetAllAnnouncementsForLecturerIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getCarouselImages: () => dispatch(getCarouselImagesAsync()),
  getCurrentUserChats: () => dispatch(getChatsOfUserAsync({})),
  getCurrentUserConsultations: () =>
    dispatch(getCurrentUserConsultationsAsync()),
  getAllAnnouncementsForLecturer: () =>
    dispatch(getAllAnnouncementsForLecturerAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage)
