import React, { useContext } from "react"
import { connect } from "react-redux"
import { Card, CardBody } from "reactstrap"
import { useHistory } from "react-router-dom"
import { AbilityContext } from "../../../../utility/context/Can"
import { useRTL } from "../../../../utility/hooks/useRTL"
import { setSelectedSubject } from "../../../../redux/index.actions"
import { selectCurrentUserRole } from "../../../../redux/index.selectors"
import "./LecturerSubjectCard.styles.scss"
import { createStructuredSelector } from "reselect"

const LecturerSubjectCard = ({
  subject,
  setSelectedSubject,
  currentUserRole,
}) => {
  const [rtl] = useRTL()
  const history = useHistory()
  const ability = useContext(AbilityContext)

  return (
    <Card
      className="lecturer-subject-card"
      onClick={e => {
        if (
          ability.can("manage", "get_single_subject_of_lecturer-GET") ||
          currentUserRole === "lecturer"
        ) {
          e.preventDefault()
          setSelectedSubject(subject)
          history.push("/subjectDetails")
        }
      }}
    >
      <CardBody
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 className="text-primary mb-25">
            {rtl ? subject.subjectTitleArabic : subject.subjectTitle}
          </h2>
          <h5>{subject.subjectCode}</h5>
        </div>
        <span className="">{subject.intakeCode}</span>
      </CardBody>
    </Card>
  )
}

const mapDispatchToProps = dispatch => ({
  setSelectedSubject: subject => dispatch(setSelectedSubject(subject)),
})

const mapStateToProps = createStructuredSelector({
  currentUserRole: selectCurrentUserRole,
})

export default connect(mapStateToProps, mapDispatchToProps)(LecturerSubjectCard)
