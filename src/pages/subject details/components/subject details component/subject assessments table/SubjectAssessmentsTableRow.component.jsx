import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Button, Spinner } from "reactstrap"
import { Eye, Trash } from "react-feather"
import { FormattedMessage, useIntl } from "react-intl"
import { useHistory } from "react-router-dom"
import Dialog from "../../../../../custom/dialog/dialog.component"
import { AbilityContext } from "../../../../../utility/context/Can"
import {
  setSelectedAssessment,
  deleteAssessmentAsync,
  clearDeleteAssessmentErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectSelectedSubject,
  selectDeleteAssessmentErrorMessage,
  selectDeleteAssessmentIsLoading,
} from "../../../../../redux/index.selectors"

const SubjectAssessmentsTableRow = ({
  assessment,
  deleteAssessment,
  clearDeleteAssessmentErrorMessage,
  selectedSubject,
  setSelectedAssessment,
  deleteAssessmentErrorMessage,
  deleteAssessmentIsLoading,
}) => {
  const history = useHistory()
  const ability = useContext(AbilityContext)
  const intl = useIntl()

  const renderEmpty = () => <h1 style={{ textAlign: "center" }}>-</h1>

  let checker = {
    exam: <FormattedMessage id="EXAM" />,
    quiz: <FormattedMessage id="QUIZ" />,
    assignment: <FormattedMessage id="ASSIGNMENT" />,
    homework: <FormattedMessage id="HOMEWORK" />,
  }

  const deleteAssessmentDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.ASSESSMENT" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.ASSESSMENT",
      }),
      actions: [
        {
          title: deleteAssessmentIsLoading ? (
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
            deleteAssessment(
              assessment.uuid,
              selectedSubject.lecturerSubjectUuid,
              {
                success: {
                  title: intl.formatMessage({
                    id: "DELETE.ASSESSMENT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "DELETE.ASSESSMENT.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteAssessmentIsLoading,
        },
      ],
    },
    errorMessage: deleteAssessmentErrorMessage,
    isLoading: deleteAssessmentIsLoading,
    closingAction: () => clearDeleteAssessmentErrorMessage(),
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {assessment.title ? assessment.title : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {assessment.type
            ? checker[assessment.type]
              ? checker[assessment.type]
              : assessment.type
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {assessment.overallMark ? assessment.overallMark : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {assessment.date ? assessment.date : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {ability.can("manage", "assessment_results-GET") && (
            <Button
              onClick={() => {
                setSelectedAssessment({
                  subjectCode: selectedSubject.subjectCode,
                  intakeCode: selectedSubject.intakeCode,
                  title: assessment.title,
                  description: assessment.description,
                  type: assessment.type,
                  overallMark: assessment.overallMark,
                  date: assessment.date,
                  uuid: assessment.uuid,
                })
                history.push("/assessment")
              }}
              style={{ padding: "5px" }}
              color="flat-primary"
              className="btn-icon"
            >
              <Eye size={20} />
            </Button>
          )}
          {ability.can("manage", "assessment-DELETE") && (
            <Dialog {...deleteAssessmentDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  selectedSubject: selectSelectedSubject,
  deleteAssessmentErrorMessage: selectDeleteAssessmentErrorMessage,
  deleteAssessmentIsLoading: selectDeleteAssessmentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  setSelectedAssessment: info => dispatch(setSelectedAssessment(info)),
  deleteAssessment: (assessmentUuid, classUuid, messages) =>
    dispatch(deleteAssessmentAsync(assessmentUuid, classUuid, messages)),
  clearDeleteAssessmentErrorMessage: () =>
    dispatch(clearDeleteAssessmentErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectAssessmentsTableRow)
