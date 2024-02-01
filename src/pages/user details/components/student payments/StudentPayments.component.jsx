import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { DollarSign, FileText } from "react-feather"
import { Card, CardBody } from "reactstrap"
import CardViewerHorizontalNav from "../../../../custom/card viewer horizontal nav/CardViewerHorizontalNav.component"
import WithSpinner from "../../../../custom/with spinner/WithSpinner.component"
import StudentPaymentsTable from "./student payments table/StudentPaymentsTable.component"
import StudentDetailedPaymentsTable from "./student detailed payments/StudentDetailedPaymentsTable.component"
import {
  getStudentPaymentsAsync,
  getAllSubjectsOfSingleStudentAsync,
} from "../../../../redux/index.actions"
import {
  selectSelectedUserSubjects,
  selectSelectedUserUuid,
  selectGetStudentPaymentsErrorMessage,
  selectGetStudentPaymentsIsLoading,
  selectGetAllSubjectsOfSingleStudentErrorMessage,
  selectGetAllSubjectsOfSingleStudentIsLoading,
} from "../../../../redux/index.selectors"
//----------WITH SPINNER----------
const StudentPaymentsTableWithSpinner = WithSpinner(StudentPaymentsTable)
const StudentDetailedPaymentsTableWithSpinner = WithSpinner(
  StudentDetailedPaymentsTable
)
//--------------------------------

const StudentPayments = ({
  getStudentPayments,
  getAllSubjectsOfSingleStudent,
  selectedUserSubjects,
  selectedUserUuid,
  getStudentPaymentsErrorMessage,
  getStudentPaymentsIsLoading,
  getAllSubjectsOfSingleStudentErrorMessage,
  getAllSubjectsOfSingleStudentIsLoading,
}) => {
  const [activeTab, setActiveTab] = useState(0)

  const intl = useIntl()

  const attributes = {
    cards: [
      {
        tab: {
          title: intl.formatMessage({ id: "PAYMENTS" }),
          icon: <DollarSign size={18} />,
        },
        content: (
          <StudentPaymentsTableWithSpinner
            card={true}
            studentUuid={selectedUserUuid}
            isLoading={getStudentPaymentsIsLoading}
            errorMessage={getStudentPaymentsErrorMessage}
            toBeDispatchedUseEffect={getStudentPayments}
            toBeDispatchedTryAgain={getStudentPayments}
            toBeDispatchedPropsTryAgain={selectedUserUuid}
            toBeDispatchedPropsUseEffect={selectedUserUuid}
          />
        ),
      },
      {
        tab: {
          title: intl.formatMessage({ id: "DETAILED.REPORTS" }),
          icon: <FileText size={18} />,
        },
        content: (
          <StudentDetailedPaymentsTableWithSpinner
            subjects={selectedUserSubjects}
            studentUuid={selectedUserUuid}
            errorMessage={getAllSubjectsOfSingleStudentErrorMessage}
            isLoading={getAllSubjectsOfSingleStudentIsLoading}
            toBeDispatchedTryAgain={getAllSubjectsOfSingleStudent}
            toBeDispatchedPropsTryAgain={selectedUserUuid}
            toBeDispatchedUseEffect={getAllSubjectsOfSingleStudent}
            toBeDispatchedPropsUseEffect={selectedUserUuid}
          />
        ),
      },
    ],
    activeTab: activeTab,
    setActiveTab: index => setActiveTab(index),
  }
  return (
    <Card>
      <CardBody>
        <CardViewerHorizontalNav {...attributes} />
      </CardBody>
    </Card>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedUserSubjects: selectSelectedUserSubjects,
  selectedUserUuid: selectSelectedUserUuid,
  getStudentPaymentsErrorMessage: selectGetStudentPaymentsErrorMessage,
  getStudentPaymentsIsLoading: selectGetStudentPaymentsIsLoading,
  getAllSubjectsOfSingleStudentErrorMessage: selectGetAllSubjectsOfSingleStudentErrorMessage,
  getAllSubjectsOfSingleStudentIsLoading: selectGetAllSubjectsOfSingleStudentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  getStudentPayments: studentUuid =>
    dispatch(getStudentPaymentsAsync(studentUuid)),
  getAllSubjectsOfSingleStudent: studentUuid =>
    dispatch(getAllSubjectsOfSingleStudentAsync(studentUuid)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentPayments)
