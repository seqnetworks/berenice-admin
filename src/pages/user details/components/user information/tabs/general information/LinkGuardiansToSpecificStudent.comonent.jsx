import React, { useState, useContext } from "react"
import { connect } from "react-redux"
import { useIntl, FormattedMessage } from "react-intl"
import { createStructuredSelector } from "reselect"
import { Col, Input, Spinner } from "reactstrap"
import { Divider } from "@material-ui/core"
import { X, Plus, Users } from "react-feather"
import UpdateGuardianType from "./UpdateGuardianType.component"
import DeleteGuardianAndStudent from "./DeleteGuardianAndStudent.component"
import { guardianTypesArray } from "../../../../../../utility/custom/guardianTypesArray"
import { AbilityContext } from "../../../../../../utility/context/Can"
import Dialog from "../../../../../../custom/dialog/dialog.component"
import ErrorCard from "../../../../../../custom/errorcard/ErrorCard.component"
import Select from "../../../../../../custom/select/select.component"
import {
  selectGuardians,
  selectSelectedUserGuardians,
  selectLinkGuardianAndStudentErrorMessage,
  selectLinkGuardianAndStudentIsLoading,
  selectDeleteGuardianAndStudentErrorMessage,
  selectDeleteGuardianAndStudentIsLoading,
} from "../../../../../../redux/index.selectors"
import {
  linkGuardianAndStudentAsync,
  clearLinkGuardianAndStudentErrorMessage,
} from "../../../../../../redux/index.actions"

const LinkStudentsToSpecificGuardian = ({
  studentId,
  guardians,
  selectedUserGuardians,
  linkGuardianAndStudent,
  clearLinkGuardianAndStudentErrorMessage,
  linkGuardianAndStudentErrorMessage,
  linkGuardianAndStudentIsLoading,
}) => {
  const [selectedGuardian, setSelectedGuardian] = useState("")
  const [selectedGuardianType, setSelectedGuardianType] = useState("")

  const intl = useIntl()
  const ability = useContext(AbilityContext)

  let allGuardians = []
  if (guardians && selectedUserGuardians)
    guardians.map(guardian => {
      let found = false
      selectedUserGuardians.map(parent => {
        if (parent.guardianUuid === guardian.uuid) found = true
      })
      if (!found)
        allGuardians.push({
          label: guardian.fullName,
          value: {
            uuid: guardian.uuid,
            studentGuardianUuid: guardian.studentGuardianUuid,
          },
        })
    })

  const addGuardianDialogAttributes = {
    dialog: {
      actions: [
        {
          color: "success",
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
            !selectedGuardian ||
            !selectedGuardianType,
          clickHandler: () => {
            const requestBody = {
              guardianUuid: selectedGuardian.value.uuid,
              studentUuid: studentId,
              guardianType: selectedGuardianType.value,
            }
            const messages = {
              success: {
                title: intl.formatMessage({
                  id: "LINK.GUARDIAN.AND.STUDENT.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "LINK.GUARDIAN.AND.STUDENT.SUCCESS.CONTENT",
                }),
              },
            }
            linkGuardianAndStudent(requestBody, "student", messages)
          },
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
            array={allGuardians}
            placeHolder={intl.formatMessage({ id: "SELECT.GUARDIAN" })}
            handleChange={e => setSelectedGuardian(e)}
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
      title: intl.formatMessage({ id: "LINKING.GUARDIAN.TO.CHILD" }),
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
            <FormattedMessage id="GUARDIANS" />
          </h4>
        </div>
        {ability.can("manage", "add_guardian_to_student-POST") ? (
          <Dialog {...addGuardianDialogAttributes} />
        ) : (
          <div />
        )}
      </Col>
      <Col className="px-2" xs={12} style={{ alignItems: "center" }}>
        {!selectedUserGuardians || selectedUserGuardians.length === 0 ? (
          <ErrorCard
            info={true}
            content={intl.formatMessage({ id: "NO.GUARDIANS.LINKED" })}
          />
        ) : (
          selectedUserGuardians &&
          selectedUserGuardians.map(guardian => (
            <div
              className="mb-50"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Input
                style={{ width: "90%" }}
                value={
                  guardian.fullName +
                  " - " +
                  intl.formatMessage({
                    id: guardian.guardianType
                      .toUpperCase()
                      .split(" ")
                      .join("."),
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
                      value: guardian.guardianType,
                      label: intl.formatMessage({
                        id: guardian.guardianType
                          .toUpperCase()
                          .split(" ")
                          .join("."),
                      }),
                    }}
                    studentGuardianUuid={guardian.studentGuardianUuid}
                    type="student"
                    id={studentId}
                  />
                )}
                {ability.can("manage", "delete_guardian_of_student-DELETE") && (
                  <DeleteGuardianAndStudent
                    type="student"
                    id={studentId}
                    studentGuardianUuid={guardian.studentGuardianUuid}
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
  guardians: selectGuardians,
  selectedUserGuardians: selectSelectedUserGuardians,
  linkGuardianAndStudentErrorMessage: selectLinkGuardianAndStudentErrorMessage,
  linkGuardianAndStudentIsLoading: selectLinkGuardianAndStudentIsLoading,
  deleteGuardianAndStudentErrorMessage: selectDeleteGuardianAndStudentErrorMessage,
  deleteGuardianAndStudentIsLoading: selectDeleteGuardianAndStudentIsLoading,
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
