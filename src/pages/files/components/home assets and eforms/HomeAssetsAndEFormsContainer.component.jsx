import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { Home, FileText } from "react-feather"
import { AbilityContext } from "../../../../utility/context/Can"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import CardViewerHorizontalNav from "../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import HomeAssetsTable from "./home assets/HomeAssetsTable.component"
import EFormsTable from "./eforms/EFormsTable.component"
import {
  getHomeAssetsAsync,
  getEFormsAsync,
} from "../../../../redux/index.actions"
import {
  selectHomeAssets,
  selectEForms,
  selectGetHomeAssetsErrorMessage,
  selectGetHomeAssetsIsLoading,
  selectGetEFormsErrorMessage,
  selectGetEFormsIsLoading,
} from "../../../../redux/index.selectors"

//---------WITH SPINNERS---------
const HomeAssetsTableWithSpinner = WithSpinner(HomeAssetsTable)
const EFormsTableWithSpinner = WithSpinner(EFormsTable)
//-------------------------------
const HomeAssetsAndEFormsContainer = ({
  getHomeAssetsUseEffect,
  getHomeAssetsTryAgain,
  getEFormsUseEffect,
  getEFormsTryAgain,
  homeAssets,
  eForms,
  getHomeAssetsErrorMessage,
  getHomeAssetsIsLoading,
  getEFormsErrorMessage,
  getEFormsIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const cards = [
    {
      ability: ability.can("manage", "home_asset-GET"),
      tab: {
        title: intl.formatMessage({ id: "HOME.FILES" }),
        icon: <Home size={18} />,
      },
      content: (
        <HomeAssetsTableWithSpinner
          toBeDispatchedUseEffect={getHomeAssetsUseEffect}
          toBeDispatchedPropsUseEffect={homeAssets}
          toBeDispatchedTryAgain={getHomeAssetsTryAgain}
          errorMessage={getHomeAssetsErrorMessage}
          isLoading={getHomeAssetsIsLoading}
        />
      ),
    },
    {
      ability: ability.can("manage", "eForms-GET"),
      tab: {
        title: intl.formatMessage({ id: "EFORMS" }),
        icon: <FileText size={18} />,
      },
      content: (
        <EFormsTableWithSpinner
          toBeDispatchedUseEffect={getEFormsUseEffect}
          toBeDispatchedPropsUseEffect={eForms}
          toBeDispatchedTryAgain={getEFormsTryAgain}
          errorMessage={getEFormsErrorMessage}
          isLoading={getEFormsIsLoading}
        />
      ),
    },
  ]

  const attributes = {
    cards: [],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
  }
  cards.map(card => {
    if (card.ability) attributes.cards.push(card)
  })
  return <CardViewerHorizontalNav {...attributes} />
}

const mapStateToProps = createStructuredSelector({
  homeAssets: selectHomeAssets,
  eForms: selectEForms,
  getHomeAssetsErrorMessage: selectGetHomeAssetsErrorMessage,
  getHomeAssetsIsLoading: selectGetHomeAssetsIsLoading,
  getEFormsErrorMessage: selectGetEFormsErrorMessage,
  getEFormsIsLoading: selectGetEFormsIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getHomeAssetsUseEffect: homeAssets => {
    if (!homeAssets) dispatch(getHomeAssetsAsync())
  },
  getHomeAssetsTryAgain: () => dispatch(getHomeAssetsAsync()),
  getEFormsUseEffect: eForms => {
    if (!eForms) dispatch(getEFormsAsync())
  },
  getEFormsTryAgain: () => dispatch(getEFormsAsync()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeAssetsAndEFormsContainer)
