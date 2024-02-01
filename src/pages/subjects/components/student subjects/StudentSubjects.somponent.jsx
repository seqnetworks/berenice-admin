import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import {
  Paperclip,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowDownCircle,
} from "react-feather"
import PendingSubjectsTable from "./pending subjects table/PendingSubjectsTable.component"
import OngoingSubjectsTable from "./ongoing subjects table/OngoingSubjectsTable.component"
import CompletedSubjectsTable from "./completed subjects table/CompletedSubjectsTable.component"
import OnHoldSubjectsTable from "./onHold subjects table/OnHoldSubjectsTable.component"
import DeclinedSubjectsTable from "./declined subjects table/DeclinedSubjectsTable.component"
import DroppedSubjectsTable from "./dropped subjects table/DroppedSubjectsTable.component"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import CardViewerHorizontalNav from "../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import { getAllSubjectsOfSingleStudentAsync } from "../../../../redux/index.actions"
import {
  selectSelectedUserSubjects,
  selectSelectedUserUuid,
  selectSelectedUserFullName,
  selectSelectedUserFullNameArabic,
  selectGetAllSubjectsOfSingleStudentErrorMessage,
  selectGetAllSubjectsOfSingleStudentIsLoading,
} from "../../../../redux/index.selectors"
//--------------WITH SPINNERS--------------
const PendingSubjectsTableWithSpinner = WithSpinner(PendingSubjectsTable)
const OngoingSubjectsTableWithSpinner = WithSpinner(OngoingSubjectsTable)
const CompletedSubjectsTableWithSpinner = WithSpinner(CompletedSubjectsTable)
const OnHoldSubjectsTableWithSpinner = WithSpinner(OnHoldSubjectsTable)
const DeclinedSubjectsTableWithSpinner = WithSpinner(DeclinedSubjectsTable)
const DroppedSubjectsTableWithSpinner = WithSpinner(DroppedSubjectsTable)
//-----------------------------------------

const StudentSubjects = ({
  selectedUserSubjects,
  selectedUserUuid,
  getAllSubjectsOfSingleStudent,
  getAllSubjectsOfSingleStudentErrorMessage,
  getAllSubjectsOfSingleStudentIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const intl = useIntl()

  let pendingSubjects = [],
    ongoingSubjects = [],
    completedSubjects = [],
    declinedSubjects = [],
    onHoldSubjects = [],
    droppedSubjects = []
  if (selectedUserSubjects)
    selectedUserSubjects.map(subject => {
      if (subject.subjectStatus === "pending") pendingSubjects.push(subject)
      else if (subject.subjectStatus === "onGoing")
        ongoingSubjects.push(subject)
      else if (subject.subjectStatus === "onHold") onHoldSubjects.push(subject)
      else if (subject.subjectStatus === "dropped")
        droppedSubjects.push(subject)
      else if (subject.subjectStatus === "declined")
        declinedSubjects.push(subject)
      else if (
        subject.subjectStatus === "failed" ||
        subject.subjectStatus === "passed"
      )
        completedSubjects.push(subject)
    })
  const attributes = {
    cards: [
      {
        tab: {
          title: intl.formatMessage({ id: "PENDING" }),
          icon: <Paperclip size={18} />,
        },
        content: (
          <PendingSubjectsTableWithSpinner
            subjects={pendingSubjects}
            errorMessage={getAllSubjectsOfSingleStudentErrorMessage}
            isLoading={getAllSubjectsOfSingleStudentIsLoading}
            toBeDispatchedTryAgain={getAllSubjectsOfSingleStudent}
            toBeDispatchedPropsTryAgain={selectedUserUuid}
            toBeDispatchedUseEffect={getAllSubjectsOfSingleStudent}
            toBeDispatchedPropsUseEffect={selectedUserUuid}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "ONGOING" }),
          icon: <Activity size={18} />,
        },
        content: (
          <OngoingSubjectsTableWithSpinner
            subjects={ongoingSubjects}
            errorMessage={getAllSubjectsOfSingleStudentErrorMessage}
            isLoading={getAllSubjectsOfSingleStudentIsLoading}
            toBeDispatchedTryAgain={getAllSubjectsOfSingleStudent}
            toBeDispatchedPropsTryAgain={selectedUserUuid}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "COMPLETED" }),
          icon: <CheckCircle size={18} />,
        },
        content: (
          <CompletedSubjectsTableWithSpinner
            subjects={completedSubjects}
            errorMessage={getAllSubjectsOfSingleStudentErrorMessage}
            isLoading={getAllSubjectsOfSingleStudentIsLoading}
            toBeDispatchedTryAgain={getAllSubjectsOfSingleStudent}
            toBeDispatchedPropsTryAgain={selectedUserUuid}
          />
        ),
      },
      // {
      //   tab: {
      //     title: intl.formatMessage({ id: "ON.HOLD" }),
      //     icon: <AlertCircle size={18} />,
      //   },
      //   content: (
      //     <OnHoldSubjectsTableWithSpinner
      //       subjects={onHoldSubjects}
      //       errorMessage={getAllSubjectsOfSingleStudentErrorMessage}
      //       isLoading={getAllSubjectsOfSingleStudentIsLoading}
      //       toBeDispatchedTryAgain={getAllSubjectsOfSingleStudent}
      //       toBeDispatchedPropsTryAgain={selectedUserUuid}
      //     />
      //   ),
      // },
      {
        tab: {
          title: intl.formatMessage({ id: "DECLINED" }),
          icon: <XCircle size={18} />,
        },
        content: (
          <DeclinedSubjectsTableWithSpinner
            subjects={declinedSubjects}
            errorMessage={getAllSubjectsOfSingleStudentErrorMessage}
            isLoading={getAllSubjectsOfSingleStudentIsLoading}
            toBeDispatchedTryAgain={getAllSubjectsOfSingleStudent}
            toBeDispatchedPropsTryAgain={selectedUserUuid}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "DROPPED" }),
          icon: <ArrowDownCircle size={18} />,
        },
        content: (
          <DroppedSubjectsTableWithSpinner
            subjects={droppedSubjects}
            errorMessage={getAllSubjectsOfSingleStudentErrorMessage}
            isLoading={getAllSubjectsOfSingleStudentIsLoading}
            toBeDispatchedTryAgain={getAllSubjectsOfSingleStudent}
            toBeDispatchedPropsTryAgain={selectedUserUuid}
          />
        ),
      },
    ],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
  }
  return <CardViewerHorizontalNav {...attributes} />
}

const mapStateToProps = createStructuredSelector({
  selectedUserSubjects: selectSelectedUserSubjects,
  selectedUserUuid: selectSelectedUserUuid,
  selectedUserFullName: selectSelectedUserFullName,
  selectedUserFullNameArabic: selectSelectedUserFullNameArabic,
  getAllSubjectsOfSingleStudentErrorMessage: selectGetAllSubjectsOfSingleStudentErrorMessage,
  getAllSubjectsOfSingleStudentIsLoading: selectGetAllSubjectsOfSingleStudentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllSubjectsOfSingleStudent: studentUuid =>
    dispatch(getAllSubjectsOfSingleStudentAsync(studentUuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentSubjects)
