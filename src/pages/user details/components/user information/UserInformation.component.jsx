import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import {
  Lock,
  User,
  Settings,
  List,
  MessageSquare,
  CreditCard,
} from "react-feather"
import { AbilityContext } from "../../../../utility/context/Can"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import CardViewerVerticalNav from "../../../../custom/card viewer vertical nav/CardViewerVerticalNav.component"
import ChangePassword from "./tabs/ChangePassword.component"
import GeneralInformation from "./tabs/general information/GeneralInformation.component"
import EditPermissions from "./tabs/edit permissions/EditPermissions.component"
import Contact from "./tabs/contact/Contact.component"
import Actions from "./tabs/Actions.component"
import StudentIntake from "./tabs/student intake/StudentIntake.component"
import {
  getUserAsync,
  getUserAclAsync,
  getSelectedUserIntakesAsync,
} from "../../../../redux/index.actions"
import {
  selectCurrentUserUuid,
  selectSelectedUserRole,
  selectCurrentUserRole,
  selectGetUserErrorMessage,
  selectGetUserIsLoading,
  selectGetUserAclErrorMessage,
  selectGetUserAclIsLoading,
  selectSelectedUserUuid,
  selectGetSelectedUserIntakesErrorMessage,
  selectGetSelectedUserIntakesIsLoading,
} from "../../../../redux/index.selectors"

//--------WITH SPINNERS-----------
const GeneralInformationWithSpinner = WithSpinner(GeneralInformation)
const StudentIntakeWithSpinner = WithSpinner(StudentIntake)
const ActionsWithSpinner = WithSpinner(Actions)
const EditPermissionsWithSpinner = WithSpinner(EditPermissions)
const ChangePasswordWithSpinner = WithSpinner(ChangePassword)
//-------------------------------------
const UserInformation = ({
  getUser,
  getSelectedUserIntakes,
  getUserAcl,
  uuid,
  userUuid,
  selectedUserRole,
  currentUserRole,
  selectedUserUuid,
  paramAndType,
  currentUserUuid,
  getUserIsLoading,
  getUserErrorMessage,
  getUserAclIsLoading,
  getUserAclErrorMessage,
  getSelectedUserIntakesErrorMessage,
  getSelectedUserIntakesIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [tabsDisabled, setTabsDisabled] = useState(false)

  const ability = useContext(AbilityContext)

  const intl = useIntl()

  const cards = [
    {
      ability: true,
      tab: {
        title: intl.formatMessage({
          id: `ABOUT.${paramAndType.type.toUpperCase()}`,
        }),
        icon: <User size={18} />,
      },
      content: (
        <GeneralInformationWithSpinner
          toBeDispatchedTryAgain={getUser}
          toBeDispatchedPropsTryAgain={
            currentUserRole === "lecturer"
              ? { ...paramAndType, lecturer: true }
              : paramAndType
          }
          toBeDispatchedUseEffect={getUser}
          toBeDispatchedPropsUseEffect={
            currentUserRole === "lecturer"
              ? { ...paramAndType, lecturer: true }
              : paramAndType
          }
          isLoading={getUserIsLoading}
          errorMessage={getUserErrorMessage}
          setTabsDisabled={setTabsDisabled}
          paramAndType={paramAndType}
        />
      ),
    },
    {
      ability: selectedUserRole === "student",
      tab: {
        title: intl.formatMessage({
          id: "STUDENT.INTAKE",
        }),
        icon: <CreditCard size={18} />,
      },
      content: (
        <StudentIntakeWithSpinner
          studentUuid={paramAndType.param}
          toBeDispatchedUseEffect={getSelectedUserIntakes}
          toBeDispatchedPropsUseEffect={paramAndType.param}
          toBeDispatchedTryAgain={getSelectedUserIntakes}
          toBeDispatchedPropsTryAgain={paramAndType.param}
          isLoading={getSelectedUserIntakesIsLoading}
          errorMessage={getSelectedUserIntakesErrorMessage}
        />
      ),
    },
    {
      ability: currentUserRole !== "lecturer",
      tab: {
        title: intl.formatMessage({ id: "SETTINGS" }),
        icon: <Settings size={18} />,
      },
      content: (
        <ActionsWithSpinner
          toBeDispatchedTryAgain={getUser}
          toBeDispatchedPropsTryAgain={paramAndType}
          isLoading={getUserIsLoading}
          errorMessage={getUserErrorMessage}
          paramAndType={paramAndType}
        />
      ),
    },

    {
      ability:
        selectedUserRole === "staff" &&
        ability.can("manage", "acl-POST") &&
        currentUserUuid !== userUuid,
      tab: {
        title: intl.formatMessage({ id: "EDIT.PERMISSIONS" }),
        icon: <List size={18} />,
      },
      content: (
        <EditPermissionsWithSpinner
          toBeDispatchedTryAgain={getUserAcl}
          toBeDispatchedPropsTryAgain={userUuid}
          toBeDispatchedUseEffect={getUserAcl}
          toBeDispatchedPropsUseEffect={userUuid}
          isLoading={getUserAclIsLoading}
          errorMessage={getUserAclErrorMessage}
          uuid={userUuid}
          setTabsDisabled={setTabsDisabled}
        />
      ),
    },
    {
      ability:
        currentUserUuid === userUuid &&
        ability.can("manage", "change_password-POST"),
      tab: {
        title: intl.formatMessage({ id: "CHANGE.PASSWORD" }),
        icon: <Lock size={18} />,
      },
      content: (
        <ChangePassword
          activeTab={activeTab}
          setTabsDisabled={setTabsDisabled}
        />
      ),
    },
    {
      ability:
        currentUserUuid !== userUuid &&
        (selectedUserRole === "student" || selectedUserRole === "guardian") &&
        ability.can("manage", "follow_up-POST"),
      tab: {
        title: intl.formatMessage({ id: "WRITE.FOLLOW.UP" }),
        icon: <MessageSquare size={18} />,
      },
      content: <Contact userUuid={userUuid} />,
    },
  ]

  const attributes = {
    cards: [],
    activeTab: activeTab,
    tabsDisabled: tabsDisabled,
    setActiveTab: index => setActiveTab(index),
  }
  cards.map(card => {
    if (card.ability) attributes.cards.push(card)
  })

  return <CardViewerVerticalNav {...attributes} />
}

const mapStateToProps = createStructuredSelector({
  currentUserUuid: selectCurrentUserUuid,
  selectedUserRole: selectSelectedUserRole,
  currentUserRole: selectCurrentUserRole,
  selectedUserUuid: selectSelectedUserUuid,
  getUserIsLoading: selectGetUserIsLoading,
  getUserErrorMessage: selectGetUserErrorMessage,
  getUserAclIsLoading: selectGetUserAclIsLoading,
  getUserAclErrorMessage: selectGetUserAclErrorMessage,
  getSelectedUserIntakesErrorMessage: selectGetSelectedUserIntakesErrorMessage,
  getSelectedUserIntakesIsLoading: selectGetSelectedUserIntakesIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getUser: paramAndType => dispatch(getUserAsync(paramAndType)),
  getUserAcl: uuid => dispatch(getUserAclAsync(uuid)),
  getSelectedUserIntakes: studentUuid =>
    dispatch(getSelectedUserIntakesAsync(studentUuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation)
