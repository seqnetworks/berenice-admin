import React, { useEffect } from "react"
import { Button } from "reactstrap"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { useIntl } from "react-intl"
import { X } from "react-feather"
import { Divider } from "@material-ui/core"
import { selectStudents } from "../../../../redux/index.selectors"
import Select from "../../../../custom/select/select.component"

const LinkStudentsToGuardian = ({ allStudents, students, setStudents }) => {
  const intl = useIntl()

  let allStudentsArray = []

  useEffect(
    () =>
      allStudents.map(allStudent => {
        let found = false
        students.map(student => {
          if (student.uuid === allStudent.uuid && student.shown === true)
            found = true
        })
        if (!found)
          allStudentsArray.push({
            label: allStudent.fullName + " - " + allStudent.uuid,
            value: allStudent.uuid,
          })
      }),
    [students]
  )

  return (
    <>
      {students &&
        students.map(
          (student, index) =>
            student.shown && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Select
                    array={allStudentsArray}
                    placeHolder={intl.formatMessage({ id: "STUDENT.NAME" })}
                    handleChange={e => {
                      let array = []
                      students.map(innerStudent =>
                        innerStudent.index === index
                          ? array.push({
                              index: index,
                              uuid: e ? e.value : "",
                              guardianType: innerStudent.guardianType,
                              name: e ? e.label : "",
                              shown: true,
                            })
                          : array.push(innerStudent)
                      )
                      setStudents([...array])
                    }}
                    height={100}
                    stylesClassnames="width-90"
                  />
                  <Button
                    className="p-25 btn-icon"
                    color="flat-danger"
                    onClick={() => {
                      let array = []
                      students.map(innerStudent => {
                        if (innerStudent.index !== student.index)
                          array.push(innerStudent)
                        else array.push({ ...innerStudent, shown: false })
                      })
                      setStudents([...array])
                    }}
                  >
                    <X size={25} />
                  </Button>
                </div>
                <Select
                  array={[
                    {
                      value: "mother",
                      label: intl.formatMessage({ id: "MOTHER" }),
                    },
                    {
                      value: "father",
                      label: intl.formatMessage({ id: "FATHER" }),
                    },
                    {
                      value: "grand mother",
                      label: intl.formatMessage({ id: "GRAND.MOTHER" }),
                    },
                    {
                      value: "grand father",
                      label: intl.formatMessage({ id: "GRAND.FATHER" }),
                    },
                    {
                      value: "cousin",
                      label: intl.formatMessage({ id: "COUSIN" }),
                    },
                    {
                      value: "sister",
                      label: intl.formatMessage({ id: "SISTER" }),
                    },
                    {
                      value: "brother",
                      label: intl.formatMessage({ id: "BROTHER" }),
                    },
                    {
                      value: "wife",
                      label: intl.formatMessage({ id: "WIFE" }),
                    },
                    {
                      value: "husband",
                      label: intl.formatMessage({ id: "HUSBAND" }),
                    },
                    {
                      value: "other",
                      label: intl.formatMessage({ id: "OTHER" }),
                    },
                  ]}
                  placeHolder={intl.formatMessage({ id: "GUARDIAN.TYPE" })}
                  handleChange={e => {
                    let array = []
                    students.map(innerStudent =>
                      innerStudent.index === index
                        ? array.push({
                            index: index,
                            uuid: innerStudent.uuid,
                            guardianType: e ? e.value : "",
                            name: e ? e.label : "",
                            shown: true,
                          })
                        : array.push(innerStudent)
                    )
                    setStudents([...array])
                  }}
                  height={80}
                  stylesClassnames="marginTop-10"
                />
                <Divider variant="middle" />
              </>
            )
        )}
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  allStudents: selectStudents,
})

export default connect(mapStateToProps)(LinkStudentsToGuardian)
