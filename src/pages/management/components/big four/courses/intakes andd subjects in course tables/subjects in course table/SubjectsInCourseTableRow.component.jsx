import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { Trash } from "react-feather"
import { Spinner } from "reactstrap"
import Dialog from "../../../../../../../custom/dialog/dialog.component"
import { useRTL } from "../../../../../../../utility/hooks/useRTL"
import { AbilityContext } from "../../../../../../../utility/context/Can"
import {
  removeSubjectFromCourseAsync,
  clearRemoveSubjectFromCourseErrorMessage,
} from "../../../../../../../redux/index.actions"
import {
  selectRemoveSubjectFromCourseErrorMessage,
  selectRemoveSubjectFromCourseIsLoading,
} from "../../../../../../../redux/index.selectors"

const SubjectsInCourseTableRow = ({
  subject,
  removeSubjectFromCourse,
  clearRemoveSubjectFromCourseErrorMessage,
  removeSubjectFromCourseErrorMessage,
  removeSubjectFromCourseIsLoading,
}) => {
  const [rtl] = useRTL()
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const deleteCourseSubjectDialogAttributes = {
    button: {
      color: "flat-primary",
      title: <Trash size={20} />,
      className: "btn-icon p-50 mr-25",
    },
    dialog: {
      title: intl.formatMessage({ id: "REMOVING.SUBJECT.FROM.COURSE" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.REMOVE.THIS.SUBJECT.FROM.THE.COURSE",
      }),
      actions: [
        {
          title: removeSubjectFromCourseIsLoading ? (
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
            removeSubjectFromCourse(
              subject.courseSubjectUuid,
              subject.subjectCode,
              {
                success: {
                  title: intl.formatMessage({
                    id: "DELETE.SUBJECT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "DELETE.SUBJECT.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: removeSubjectFromCourseIsLoading,
        },
      ],
    },
    errorMessage: removeSubjectFromCourseErrorMessage,
    isLoading: removeSubjectFromCourseIsLoading,
    closingAction: () => clearRemoveSubjectFromCourseErrorMessage(),
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          {subject.subjectCode ? subject.subjectCode : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          {rtl
            ? subject.subjectTitleArabic
              ? subject.subjectTitleArabic
              : renderEmpty()
            : subject.subjectTitle
            ? subject.subjectTitle
            : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {subject.semester ? subject.semester : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {ability.can("manage", "remove_subject_course-DELETE") && (
            <Dialog {...deleteCourseSubjectDialogAttributes} />
          )}
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  removeSubjectFromCourseErrorMessage: selectRemoveSubjectFromCourseErrorMessage,
  removeSubjectFromCourseIsLoading: selectRemoveSubjectFromCourseIsLoading,
})

const mapDispatchToProps = dispatch => ({
  removeSubjectFromCourse: (subjectCourseUuid, courseUuid, messages) =>
    dispatch(
      removeSubjectFromCourseAsync(subjectCourseUuid, courseUuid, messages)
    ),
  clearRemoveSubjectFromCourseErrorMessage: () =>
    dispatch(clearRemoveSubjectFromCourseErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectsInCourseTableRow)
