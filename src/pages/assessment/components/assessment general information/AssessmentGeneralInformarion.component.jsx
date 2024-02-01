import React from "react"
import { useSelector } from "react-redux"
import { useIntl, FormattedMessage } from "react-intl"
import { Card, CardHeader, CardBody } from "reactstrap"
import { selectSelectedAssessmentInfo } from "../../../../redux/index.selectors"
import "../../../subject details/components/subject general information/SubjectGeneralInformation.styles.scss"

const AssessmentGeneralInformarion = () => {
  const info = useSelector(selectSelectedAssessmentInfo)

  const intl = useIntl()

  let checker = {
    exam: intl.formatMessage({ id: "EXAM" }),
    quiz: intl.formatMessage({ id: "QUIZ" }),
    assignment: intl.formatMessage({ id: "ASSIGNMENT" }),
    homework: intl.formatMessage({ id: "HOMEWORK" }),
  }

  const subHeader = [
    {
      title: <FormattedMessage id="SUBJECT.CODE" />,
      content: info.subjectCode,
    },
    {
      title: <FormattedMessage id="TITLE" />,
      content: info.title,
    },
    {
      title: <FormattedMessage id="OVERALL.MARK" />,
      content: info.overallMark,
    },
    {
      title: <FormattedMessage id="ASSESSMENT.TYPE" />,
      content: checker[info.type] ? checker[info.type] : info.type,
    },
  ]

  return (
    <Card className="attendance-sheet-card">
      <CardHeader>
        <span className="attendance-sheet-card-header">
          <span>
            <FormattedMessage id="ASSESSMENT.IN" />
          </span>{" "}
          <span>{info.date}</span>
        </span>
      </CardHeader>

      <CardBody className="attendance-sheet-card-sub-header">
        {subHeader.map(item => (
          <div className="attendance-sheet-card-sub-header-block">
            <span className="mr-50 text-primary attendance-sheet-card-sub-header-block-title">
              {item.title}
            </span>
            {item.content}
          </div>
        ))}
      </CardBody>
      <CardBody className="pt-0">
        <div className="attendance-sheet-card-sub-header-block">
          <span className="mr-50 text-primary attendance-sheet-card-sub-header-block-title">
            <FormattedMessage id="DESCRIPTION" />
          </span>
          {info.description}
        </div>
      </CardBody>
    </Card>
  )
}

export default AssessmentGeneralInformarion
