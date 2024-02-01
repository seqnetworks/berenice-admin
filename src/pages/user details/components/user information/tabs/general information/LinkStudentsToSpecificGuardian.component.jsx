import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { useIntl, FormattedMessage } from "react-intl"
import { createStructuredSelector } from "reselect"
import { Col, Input, Spinner } from "reactstrap"
import { Divider } from "@material-ui/core"
import { X, Users, Plus } from "react-feather"
import DeleteGuardianAndStudent from "./DeleteGuardianAndStudent.component"
import UpdateGuardianType from "./UpdateGuardianType.component"
import { guardianTypesArray } from "../../../../../../utility/custom/guardianTypesArray"
import { AbilityContext } from "../../../../../../utility/context/Can"
import Dialog from "../../../../../../custom/dialog/dialog.component"
import ErrorCard from "../../../../../../custom/errorcard/ErrorCard.component"
import Select from "../../../../../../custom/select/select.component"
import {
  selectStudents,
  selectSelectedUserChildren,
  selectLinkGuardianAndStudentErrorMessage,
  selectLinkGuardianAndStudentIsLoading,
} from "../../../../../../redux/index.selectors"
import {
  linkGuardianAndStudentAsync,
  clearLinkGuardianAndStudentErrorMessage,
} from "../../../../../../redux/index.actions"

const LinkStudentsToSpecificGuardian = ({
  guardianUuid,
  students,
  selectedUserChildren,
  linkGuardianAndStudent,
  linkGuardianAndStudentErrorMessage,
  linkGuardianAndStudentIsLoading,
  clearLinkGuardianAndStudentErrorMessage,
}) => {
  const [selectedStudent, setSelectedStudent] = useState("")
  const [selectedGuardianType, setSelectedGuardianType] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let allStudents = []
  if (students && selectedUserChildren)
    students.map(student => {
      let found = false
      selectedUserChildren.map(child => {
        if (child.studentUuid === student.uuid) found = true
      })
      if (!found)
        allStudents.push({
          label: student.fullName + " - " + student.uuid,
          value: {
            uuid: student.uuid,
            studentGuardianUuid: student.studentGuardianUuid,
          },
        })
    })
  const addChildDialogAttributes = {
    dialog: {
      actions: [
        {
          color: "primary",
          title: linkGuardianAndStudentIsLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              aria-hidden="true"
            />
          ) : (
            intl.formatMessage({ id: "LINK" })
          ),
          disabled:
            linkGuardianAndStudentIsLoading ||
            !selectedStudent ||
            !selectedGuardianType,
          clickHandler: () =>
            linkGuardianAndStudent(
              {
                guardianUuid: guardianUuid,
                studentUuid: selectedStudent.value.uuid,
                guardianType: selectedGuardianType.value,
              },
              "guardian",
              {
                success: {
                  title: intl.formatMessage({
                    id: "LINK.GUARDIAN.AND.STUDENT.SUCCESS.TITLE",
                  }),
                  content: intl.formatMessage({
                    id: "LINK.GUARDIAN.AND.STUDENT.SUCCESS.CONTENT",
                  }),
                },
              }
            ),
        },
        {
          color: "secondary",
          title: intl.formatMessage({ id: "CANCEL" }),
          disabled: linkGuardianAndStudentIsLoading,
        },
      ],
      content: (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Select
            height={140}
            disabled={linkGuardianAndStudentIsLoading}
            array={allStudents}
            placeHolder={intl.formatMessage({ id: "SELECT.STUDENT" })}
            handleChange={e => setSelectedStudent(e)}
          />
          <Select
            height={140}
            stylesClassnames="marginTop-10 marginBottom-150"
            disabled={linkGuardianAndStudentIsLoading}
            array={guardianTypesArray(intl)}
            placeHolder={intl.formatMessage({ id: "GUARDIAN.TYPE" })}
            handleChange={e => setSelectedGuardianType(e)}
          />
        </div>
      ),
      title: intl.formatMessage({ id: "LINKING.CHILD.TO.GUARDIAN" }),
    },
    button: {
      className: "p-50",
      color: "success",
      title: <Plus size={18} />,
    },
    errorMessage: linkGuardianAndStudentErrorMessage,
    isLoading: linkGuardianAndStudentIsLoading,
    closingAction: () => clearLinkGuardianAndStudentErrorMessage(),
  }

  return (
    <>
      <Divider style={{ width: "90%", margin: "0 auto" }} />
      <Col
        xs={12}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "12px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Users size={18} />
          <h4 className="mb-0 ml-75">
            <FormattedMessage id="STUDENTS" />
          </h4>
        </div>
        {ability.can("manage", "add_guardian_to_student-POST") ? (
          <Dialog {...addChildDialogAttributes} />
        ) : (
          <div />
        )}
      </Col>
      <Col xs={12} style={{ alignItems: "center" }}>
        {!selectedUserChildren || selectedUserChildren.length === 0 ? (
          <ErrorCard
            info={true}
            content={intl.formatMessage({ id: "NO.CHILDREN.LINKED" })}
          />
        ) : (
          selectedUserChildren &&
          selectedUserChildren.map(student => (
            <div
              className="mb-50"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Input
                style={{ width: "90%" }}
                value={
                  student.fullName +
                  " - " +
                  student.studentUuid +
                  " - " +
                  intl.formatMessage({
                    id: student.guardianType.toUpperCase().split(" ").join("."),
                  })
                }
                readOnly
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {ability.can("manage", "guardian-PUT") && (
                  <UpdateGuardianType
                    guardianType={{
                      value: student.guardianType,
                      label: intl.formatMessage({
                        id: student.guardianType
                          .toUpperCase()
                          .split(" ")
                          .join("."),
                      }),
                    }}
                    studentGuardianUuid={student.studentGuardianUuid}
                    id={guardianUuid}
                    type="guardian"
                  />
                )}
                {ability.can("manage", "delete_guardian_of_student-DELETE") && (
                  <DeleteGuardianAndStudent
                    type="guardian"
                    id={guardianUuid}
                    studentGuardianUuid={student.studentGuardianUuid}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </Col>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  students: selectStudents,
  selectedUserChildren: selectSelectedUserChildren,
  linkGuardianAndStudentErrorMessage: selectLinkGuardianAndStudentErrorMessage,
  linkGuardianAndStudentIsLoading: selectLinkGuardianAndStudentIsLoading,
})

const mapDispatchToProps = dispatch => ({
  linkGuardianAndStudent: (requestBody, type, messages) =>
    dispatch(linkGuardianAndStudentAsync(requestBody, type, messages)),
  clearLinkGuardianAndStudentErrorMessage: () =>
    dispatch(clearLinkGuardianAndStudentErrorMessage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkStudentsToSpecificGuardian)
