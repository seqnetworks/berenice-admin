import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { Settings, Users } from "react-feather"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import CardViewerVerticalNav from "../../../../custom/card viewer vertical nav/CardViewerVerticalNav.component"
import GroupGeneralInformation from "./tabs/GroupGeneralInformation.component"
import GroupActions from "./tabs/GroupActions.component"
import {
  selectSelectedGroup,
  selectGetGroupIsLoading,
  selectGetGroupErrorMessage,
} from "../../../../redux/index.selectors"
import { getGroupAsync } from "../../../../redux/index.actions"

//----------WITH SPINNERS---------------
const GroupGeneralInformationWithSpinner = WithSpinner(GroupGeneralInformation)
const GroupActionsWithSpinner = WithSpinner(GroupActions)
//--------------------------------------------

const GroupInformation = ({
  uuid,
  getGroup,
  group,
  getGroupErrorMessage,
  getGroupIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [tabsDisabled, setTabsDisabled] = useState(false)

  const intl = useIntl()

  const attributes = {
    cards: [
      {
        tab: {
          title: intl.formatMessage({ id: "GROUP.INFORMATION" }),
          icon: <Users size={18} />,
        },
        content: (
          <GroupGeneralInformationWithSpinner
            toBeDispatchedUseEffect={getGroup}
            toBeDispatchedTryAgain={getGroup}
            toBeDispatchedPropsUseEffect={uuid}
            toBeDispatchedPropsTryAgain={uuid}
            isLoading={getGroupIsLoading}
            errorMessage={getGroupErrorMessage}
            group={group}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "SETTINGS" }),
          icon: <Settings size={18} />,
        },
        content: (
          <GroupActionsWithSpinner
            toBeDispatchedUseEffect={getGroup}
            toBeDispatchedTryAgain={getGroup}
            toBeDispatchedPropsUseEffect={uuid}
            toBeDispatchedPropsTryAgain={uuid}
            isLoading={getGroupIsLoading}
            errorMessage={getGroupErrorMessage}
            uuid={uuid}
          />
        ),
      },
    ],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
    tabsDisabled: tabsDisabled,
  }
  return <CardViewerVerticalNav {...attributes} />
}

const mapStateToProps = createStructuredSelector({
  group: selectSelectedGroup,
  getGroupErrorMessage: selectGetGroupErrorMessage,
  getGroupIsLoading: selectGetGroupIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getGroup: uuid => dispatch(getGroupAsync(uuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupInformation)
