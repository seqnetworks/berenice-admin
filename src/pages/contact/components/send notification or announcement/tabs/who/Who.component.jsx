import React, { useState, Fragment, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { connect } from "react-redux"
import {
  Row,
  Col,
  CustomInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap"
import { createStructuredSelector } from "reselect"
import { Search } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import { Divider } from "@material-ui/core"
import Select from "../../../../../../custom/select/select.component"
import { useRTL } from "../../../../../../utility/hooks/useRTL"
import {
  selectAllUsers,
  selectAllIntakes,
  selectAllSubjectsWithLecturer,
} from "../../../../../../redux/index.selectors"
import "./Who.styles.scss"
import "../../../../../../@core/scss/react/libs/swiper/swiper.scss"

const Who = ({
  users,
  intakes,
  subjects,
  selectedCategory,
  setSelectedCategory,
  selectedUser,
  setSelectedUser,
  selectedTargets,
  setSelectedTargets,
  selectedIntakes,
  setSelectedIntakes,
  setSelectedSubject,
  selectedSubject,
  studentsGroup,
  setStudentsGroup,
  slides,
}) => {
  const [searchField, setSearchField] = useState("")

  useEffect(() => {
    setSearchField("")
    setSelectedIntakes([])
    setSelectedSubject("")
  }, [studentsGroup])

  const intl = useIntl()
  const [rtl] = useRTL()

  let usersFullNames = []
  if (users)
    users.map(user =>
      usersFullNames.push(
        rtl
          ? { label: user.fullNameArabic, value: user.uuid }
          : { label: user.fullName, value: user.uuid }
      )
    )
  const params = {
    className: "swiper-container-who px-4 py-2",
    slidesPerView: 5,
    spaceBetween: 55,
    breakpoints: {
      1600: {
        slidesPerView: 3,
        spaceBetween: 85,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 55,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 55,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 55,
      },
    },
  }

  const targets = [
    { title: intl.formatMessage({ id: "NONE" }), value: "" },
    { title: intl.formatMessage({ id: "LECTURERS" }), value: "lecturer" },
    { title: intl.formatMessage({ id: "STUDENTS" }), value: "student" },
    { title: intl.formatMessage({ id: "GUARDIANS" }), value: "guardian" },
  ]

  let intakesArray = []
  if (intakes) intakes.map(intake => intakesArray.push(intake.code))

  let subjectsArray = []
  if (subjects)
    subjects.map(subject => {
      if (subject.status === "onGoing")
        subjectsArray.push({
          title: subject.subjectCode + " - " + subject.intakeCode,
          value: subject.lecturerSubjectUuid,
        })
    })

  let filteredIntakesArray = []
  if (intakesArray.length > 0)
    filteredIntakesArray = intakesArray.filter(intake =>
      intake.toLowerCase().includes(searchField.toLowerCase())
    )

  let filteredSubjectsArray = []
  if (subjectsArray.length > 0)
    filteredSubjectsArray = subjectsArray.filter(subject =>
      subject.title.toLowerCase().includes(searchField.toLowerCase())
    )

  const slidesSubContent = {
    0: <></>,
    1: (
      <Row>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
          md={6}
        >
          <span className="text-danger mb-25">
            <FormattedMessage id="YOU.CAN.NOT.SEND.AN.ANNOUNCEMENT.TO.A.SPECIFIC.USER" />
          </span>
          <Select
            array={usersFullNames}
            placeHolder={intl.formatMessage({ id: "SELECT.USER" })}
            height={160}
            stylesClassnames="marginBottom-150 input-custom-animation-5"
            handleChange={e => setSelectedUser(e)}
            value={selectedUser}
          />
        </Col>
      </Row>
    ),
    2: (
      <>
        <Row className="ml-1">
          {targets.map((target, index) => (
            <Col
              style={{ display: "flex", flexDirection: "row" }}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <CustomInput
                type="radio"
                id={index}
                checked={selectedTargets.includes(target.value)}
                onChange={e => {
                  if (e.target.checked) setSelectedTargets([target.value])
                  else setSelectedTargets([])
                }}
              />
              {target.title}
            </Col>
          ))}
        </Row>
        {selectedTargets.includes("student") ? (
          <>
            <Divider variant="middle" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20PX",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <CustomInput
                  checked={studentsGroup.all}
                  onChange={e => {
                    if (e.target.checked)
                      setStudentsGroup({
                        intake: false,
                        subject: false,
                        all: true,
                      })
                  }}
                  type="radio"
                  id="all"
                  style={{ marginRight: "5px" }}
                />
                <FormattedMessage id="ALL.STUDENTS" />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CustomInput
                  checked={studentsGroup.subject}
                  onChange={e => {
                    if (e.target.checked)
                      setStudentsGroup({
                        all: false,
                        intake: false,
                        subject: true,
                      })
                  }}
                  type="radio"
                  id="subject"
                  style={{ marginRight: "5px" }}
                />
                <FormattedMessage id="BY.SUBJECTS" />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <CustomInput
                  checked={studentsGroup.intake}
                  onChange={e => {
                    if (e.target.checked)
                      setStudentsGroup({
                        intake: true,
                        subject: false,
                        all: false,
                      })
                  }}
                  type="radio"
                  id="intake"
                  style={{ marginRight: "5px" }}
                />
                <FormattedMessage id="BY.INTAKES" />
              </div>
            </div>
            <Divider variant="middle" />
            {studentsGroup.intake ? (
              <>
                <Row className="ml-1">
                  <Col md={6} xs={12}>
                    <InputGroup className="mb-1" size="sm">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Search size={15} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder={intl.formatMessage({
                          id: "SEARCH.BY.INTAKE.CODE",
                        })}
                        onChange={e => setSearchField(e.target.value)}
                        value={searchField}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="ml-1">
                  {filteredIntakesArray.map((intake, index) => (
                    <Col
                      style={{ display: "flex", flexDirection: "row" }}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      <CustomInput
                        type="checkbox"
                        id={index + 4}
                        checked={selectedIntakes.includes(intake)}
                        onChange={e => {
                          if (e.target.checked)
                            setSelectedIntakes([...selectedIntakes, intake])
                          else {
                            let array = selectedIntakes
                            let toBeDeletedIndex = 0
                            selectedIntakes.map((innerIntake, innerIndex) => {
                              if (innerIntake === intake)
                                toBeDeletedIndex = innerIndex
                            })
                            array.splice(toBeDeletedIndex, 1)
                            setSelectedIntakes([...array])
                          }
                        }}
                      />
                      {intake}
                    </Col>
                  ))}
                </Row>
              </>
            ) : studentsGroup.subject ? (
              <>
                <Row className="ml-1">
                  <Col md={6} xs={12}>
                    <InputGroup className="mb-1" size="sm">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Search size={15} />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder={intl.formatMessage({
                          id: "SEARCH.BY.SUBJECT.CODE",
                        })}
                        onChange={e => setSearchField(e.target.value)}
                        value={searchField}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="ml-1">
                  {filteredSubjectsArray.map(subject => (
                    <Col
                      style={{ display: "flex", flexDirection: "row" }}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      <CustomInput
                        type="radio"
                        id={subject.value}
                        checked={selectedSubject.value === subject.value}
                        onChange={e => {
                          if (e.target.checked) setSelectedSubject(subject)
                        }}
                      />
                      {subject.title}
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </>
    ),
  }
  return (
    <Fragment>
      <Swiper {...params}>
        {slides.map((slide, index) => (
          <SwiperSlide
            className={`who-slide${
              index === selectedCategory ? "-selected" : ""
            }`}
            key={slide.name}
            onClick={() => setSelectedCategory(index)}
          >
            <a
              style={{ display: "flex", flexDirection: "column" }}
              href="/"
              onClick={e => e.preventDefault()}
            >
              <h1 className=" mb-1">{slide.name}</h1>
              <div className="img-container">
                <img src={slide.img} alt={index} style={{ maxWidth: "180%" }} />
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      {slidesSubContent[selectedCategory]}
    </Fragment>
  )
}

const mapStateToProps = createStructuredSelector({
  users: selectAllUsers,
  intakes: selectAllIntakes,
  subjects: selectAllSubjectsWithLecturer,
})

export default connect(mapStateToProps)(Who)
