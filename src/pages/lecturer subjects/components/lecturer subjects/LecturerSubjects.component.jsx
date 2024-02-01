import React, { useState } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Row, Col, Card, CardBody } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import LecturerSubjectCard from "../lecturer subject card/LecturerSubjectCard.component"
import { useRTL } from "../../../../utility/hooks/useRTL"
import Select from "../../../../custom/select/select.component"
import ErrorCard from "../../../../custom/errorcard/ErrorCard.component"
import BackButton from "../../../../custom/back button/BackButton.component"
import {
  selectSelectedLecturerSubjects,
  selectCurrentUserRole,
  selectSelectedUserFullNameArabic,
  selectSelectedUserFullName,
} from "../../../../redux/index.selectors"

const LecturerSubjects = ({
  subjects,
  currentUserRole,
  selectedUserFullNameArabic,
  selectedUserFullName,
}) => {
  const intl = useIntl()
  const [rtl] = useRTL()

  const [selectedSubjectStatus, setSelectedSubjectStatus] = useState({
    label: intl.formatMessage({ id: "ONGOING" }),
    value: "onGoing",
  })

  let subjectsArray = []
  if (subjects) {
    if (selectedSubjectStatus.value === "all") subjectsArray = subjects
    else {
      subjects.map(subject => {
        console.log(selectedSubjectStatus)
        console.log(subject)
        console.log("==========")
        if (subject.status === selectedSubjectStatus.value)
          subjectsArray.push(subject)
      })
    }

    console.log(subjectsArray)
  }

  return (
    <Row>
      {currentUserRole === "lecturer" ? (
        <></>
      ) : (
        <BackButton messageId="BACK.TO.PROFILE" />
      )}
      <Col xs={12}>
        <Card>
          <CardBody>
            <Row>
              <Col sm={9} className="pr-0">
                {currentUserRole === "lecturer" ? (
                  <h2 className="">
                    <FormattedMessage id="MY.SUBJECTS" />
                  </h2>
                ) : (
                  <h3 className="">
                    {rtl
                      ? intl.formatMessage({ id: "'S.SUBJECTS" }) +
                        selectedUserFullNameArabic
                      : selectedUserFullName +
                        intl.formatMessage({ id: "'S.SUBJECTS" })}
                  </h3>
                )}
              </Col>
              <Col sm={3}>
                <Select
                  value={selectedSubjectStatus}
                  array={[
                    {
                      label: intl.formatMessage({ id: "ONGOING" }),
                      value: "onGoing",
                    },
                    {
                      label: intl.formatMessage({ id: "FINISHED" }),
                      value: "finished",
                    },
                    {
                      label: intl.formatMessage({ id: "ALL" }),
                      value: "all",
                    },
                  ]}
                  handleChange={e => setSelectedSubjectStatus(e)}
                  stylesClassnames="minWidth-25"
                  fixed={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
      {subjectsArray.length > 0 ? (
        subjectsArray.map(subject => (
          <Col md={6}>
            <LecturerSubjectCard subject={subject} />
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <ErrorCard
            info={true}
            content={intl.formatMessage({ id: "NO.SUBJECTS.YET" })}
          />
        </Col>
      )}
    </Row>
  )
}

const mapStateToProps = createStructuredSelector({
  subjects: selectSelectedLecturerSubjects,
  currentUserRole: selectCurrentUserRole,
  selectedUserFullNameArabic: selectSelectedUserFullNameArabic,
  selectedUserFullName: selectSelectedUserFullName,
})

export default connect(mapStateToProps)(LecturerSubjects)
