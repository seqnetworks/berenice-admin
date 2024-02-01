import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { Card, CardBody } from "reactstrap"
import { Users, FileText, BarChart2 } from "react-feather"
import SubjectStudentsTable from "./subject students table/SubjectStudentsTable.component"
import SubjectAttendanceSheetsTable from "./subject attendance sheets table/SubjectAttendanceSheetsTable.component"
import SubjectAssessmentsTable from "./subject assessments table/SubjectAssessmentsTable.component"
import { AbilityContext } from "../../../../utility/context/Can"
import CardViewerHorizontalNav from "../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import {
  getAllStudentsInClassAsync,
  getAllAttendanceSheetsInClassAsync,
  getAllAssessmentsOfSubjectForLecturerAsync,
  getStudentsAttendancesInSubjectAsync,
} from "../../../../redux/index.actions"
import {
  selectSelectedSubject,
  selectGetAllStudentsInClassErrorMessage,
  selectGetAllStudentsInClassIsLoading,
  selectGetAllAttendanceSheetsInClassErrorMessage,
  selectGetAllAttendanceSheetsInClassIsLoading,
  selectGetAllAssessmentsOfSubjectForLecturerErrorMessage,
  selectGetAllAssessmentsOfSubjectForLecturerIsLoading,
  selectGetStudentsAttendancesInSubjectErrorMessage,
  selectGetStudentsAttendancesInSubjectIsLoading,
} from "../../../../redux/index.selectors"
//----------WITH SPINNER----------
const SubjectStudentsTableWithSpinner = WithSpinner(SubjectStudentsTable)
const SubjectAssessmentsTableWithSpinner = WithSpinner(SubjectAssessmentsTable)
const SubjectAttendanceSheetsTableWithSpinner = WithSpinner(
  SubjectAttendanceSheetsTable
)
//--------------------------------
const SubjectDetails = ({
  getAllStudentsInClass,
  getAllAttendanceSheetsInClass,
  getAllAssessmentsOfSubjectForLecturer,
  getStudentsAttendancesInSubject,
  selectedSubject,
  getAllStudentsInClassErrorMessage,
  getAllStudentsInClassIsLoading,
  getAllAttendanceSheetsInClassErrorMessage,
  getAllAttendanceSheetsInClassIsLoading,
  getAllAssessmentsOfSubjectForLecturerErrorMessage,
  getAllAssessmentsOfSubjectForLecturerIsLoading,
  getStudentsAttendancesInSubjectErrorMessage,
  getStudentsAttendancesInSubjectIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const attributes = {
    cards: [],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
  }
  const cards = [
    {
      ability: ability.can(
        "manage",
        "get_all_students_of_lecturer_subject-GET"
      ),
      tab: {
        title: intl.formatMessage({ id: "STUDENTS" }),
        icon: <Users size={18} />,
      },
      content: (
        <SubjectStudentsTableWithSpinner
          errorMessage={getAllStudentsInClassErrorMessage}
          isLoading={getAllStudentsInClassIsLoading}
          toBeDispatchedUseEffect={getAllStudentsInClass}
          toBeDispatchedPropsUseEffect={selectedSubject.lecturerSubjectUuid}
          toBeDispatchedTryAgain={getAllStudentsInClass}
          toBeDispatchedPropsTryAgain={selectedSubject.lecturerSubjectUuid}
        />
      ),
    },
    {
      ability: ability.can(
        "manage",
        "lecturer_attendance_sheets_single_subject-GET"
      ),
      tab: {
        title: intl.formatMessage({ id: "ATTENDANCE.SHEETS" }),
        icon: <FileText size={18} />,
      },
      content: (
        <SubjectAttendanceSheetsTableWithSpinner
          errorMessage={
            getAllAttendanceSheetsInClassErrorMessage ||
            getStudentsAttendancesInSubjectErrorMessage
          }
          isLoading={
            getAllAttendanceSheetsInClassIsLoading ||
            getStudentsAttendancesInSubjectIsLoading
          }
          toBeDispatchedUseEffect={lecturerSubjectUuid => {
            getAllAttendanceSheetsInClass(lecturerSubjectUuid)
            getStudentsAttendancesInSubject(lecturerSubjectUuid)
          }}
          toBeDispatchedPropsUseEffect={selectedSubject.lecturerSubjectUuid}
          toBeDispatchedTryAgain={lecturerSubjectUuid => {
            getAllAttendanceSheetsInClass(lecturerSubjectUuid)
            getStudentsAttendancesInSubject(lecturerSubjectUuid)
          }}
          toBeDispatchedPropsTryAgain={selectedSubject.lecturerSubjectUuid}
        />
      ),
    },
    {
      ability: ability.can("manage", "assessments-GET"),
      tab: {
        title: intl.formatMessage({ id: "ASSESSMENTS" }),
        icon: <BarChart2 size={18} />,
      },
      content: (
        <SubjectAssessmentsTableWithSpinner
          errorMessage={getAllAssessmentsOfSubjectForLecturerErrorMessage}
          isLoading={getAllAssessmentsOfSubjectForLecturerIsLoading}
          toBeDispatchedUseEffect={getAllAssessmentsOfSubjectForLecturer}
          toBeDispatchedPropsUseEffect={selectedSubject.lecturerSubjectUuid}
          toBeDispatchedTryAgain={getAllAssessmentsOfSubjectForLecturer}
          toBeDispatchedPropsTryAgain={selectedSubject.lecturerSubjectUuid}
        />
      ),
    },
  ]
  cards.map(card => {
    if (card.ability) attributes.cards.push(card)
  })
  return (
    <Card>
      <CardBody>
        <CardViewerHorizontalNav {...attributes} />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedSubject: selectSelectedSubject,
  getAllStudentsInClassErrorMessage: selectGetAllStudentsInClassErrorMessage,
  getAllStudentsInClassIsLoading: selectGetAllStudentsInClassIsLoading,
  getAllAttendanceSheetsInClassErrorMessage: selectGetAllAttendanceSheetsInClassErrorMessage,
  getAllAttendanceSheetsInClassIsLoading: selectGetAllAttendanceSheetsInClassIsLoading,
  getAllAssessmentsOfSubjectForLecturerErrorMessage: selectGetAllAssessmentsOfSubjectForLecturerErrorMessage,
  getAllAssessmentsOfSubjectForLecturerIsLoading: selectGetAllAssessmentsOfSubjectForLecturerIsLoading,
  getStudentsAttendancesInSubjectErrorMessage: selectGetStudentsAttendancesInSubjectErrorMessage,
  getStudentsAttendancesInSubjectIsLoading: selectGetStudentsAttendancesInSubjectIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getAllStudentsInClass: classUuid =>
    dispatch(getAllStudentsInClassAsync(classUuid)),
  getAllAttendanceSheetsInClass: classUuid =>
    dispatch(getAllAttendanceSheetsInClassAsync(classUuid)),
  getAllAssessmentsOfSubjectForLecturer: classUuid =>
    dispatch(getAllAssessmentsOfSubjectForLecturerAsync(classUuid)),
  getStudentsAttendancesInSubject: lecturerSubjectUuid =>
    dispatch(getStudentsAttendancesInSubjectAsync(lecturerSubjectUuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubjectDetails)
