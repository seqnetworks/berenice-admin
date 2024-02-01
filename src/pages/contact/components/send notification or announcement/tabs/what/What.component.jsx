import React, { useEffect, useContext } from "react"
import {
  Col,
  Row,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap"
import { Divider } from "@material-ui/core"
import { Edit3, AlignCenter, Link, FileText } from "react-feather"
import { useIntl, FormattedMessage } from "react-intl"
import classnames from "classnames"
import { AbilityContext } from "../../../../../../utility/context/Can"
import { announcementTypesArray } from "../../../../../../utility/custom/announcementTypesArray"
import CollapseRadioButton from "./CollapseRadioButton.component"
import Select from "../../../../../../custom/select/select.component"
import "./What.styles.scss"

const What = ({
  notificationTitle,
  setNotificationTitle,
  notificationContent,
  setNotificationContent,
  checkedTemplate,
  setCheckedTemplate,
  contactType,
  slides,
  setContactType,
  selectedCategory,
  announcementType,
  setAnnouncementType,
  selectedTargets,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const templates = [
    {
      title: intl.formatMessage({ id: "NONE" }),
      description: "",
    },
    {
      title: "غدا عطلة",
      description: "أكدت إدارة الجامعة رسميا أن يوم الغد هو يوم عطلة رسمي",
    },
    {
      title: "موعد الامتحانات",
      description: "ستقوم الإداره غدا بالإعلان عن موعد الامتحانات النهائية",
    },
  ]

  useEffect(() => {
    if (checkedTemplate !== 0)
      setNotificationTitle({
        ...notificationTitle,
        text: templates[checkedTemplate].title,
      })
    else setNotificationTitle({ ...notificationTitle, text: "" })
    setNotificationContent({
      ...notificationContent,
      text: templates[checkedTemplate].description,
    })
  }, [checkedTemplate])

  useEffect(() => {
    if (ability.can("manage", "notification-POST"))
      if (slides[selectedCategory].name === intl.formatMessage({ id: "USER" }))
        setContactType({
          label: intl.formatMessage({ id: "NOTIFICATION" }),
          value: "notification",
        })
    if (ability.can("manage", "announcement-POST"))
      if (
        slides[selectedCategory].name ===
          intl.formatMessage({ id: "TARGETS" }) &&
        selectedTargets[0] !== "lecturer"
      )
        setContactType({
          label: intl.formatMessage({ id: "ANNOUNCEMENT" }),
          value: "announcement",
        })
  }, [selectedCategory])

  let contactTypes = []
  if (
    slides[selectedCategory].name !== intl.formatMessage({ id: "USER" }) &&
    ability.can("manage", "announcement-POST")
  )
    contactTypes.push({
      label: intl.formatMessage({ id: "ANNOUNCEMENT" }),
      value: "announcement",
    })

  if (
    slides[selectedCategory].name === intl.formatMessage({ id: "USER" }) &&
    ability.can("manage", "notification-POST")
  )
    contactTypes.push({
      label: intl.formatMessage({ id: "NOTIFICATION" }),
      value: "notification",
    })
  return (
    <Row>
      <Col style={{ display: "flex", flexDirection: "column" }} md={6}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Link className="mr-50" size={15} />
          <h6>
            <FormattedMessage id="CONTACT.TYPE" />
          </h6>
        </div>
        <Select
          value={contactType}
          array={contactTypes}
          handleChange={e => setContactType(e)}
          fixed={true}
        />
        <Divider variant="middle" />
        {contactType.value === "announcement" ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {" "}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <FileText className="mr-50" size={15} />
              <h6>
                <FormattedMessage id="ANNOUNCEMENT.TYPE" />
              </h6>
            </div>
            <Select
              value={announcementType}
              array={announcementTypesArray(intl)}
              handleChange={e => setAnnouncementType(e)}
              fixed={true}
              stylesClassnames="marginBottom-10"
            />{" "}
          </div>
        ) : (
          <></>
        )}
        <InputGroup
          className={classnames("input-group-merge mb-1", {
            "is-invalid": !notificationTitle.text && notificationTitle.touched,
          })}
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Edit3 size={17} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            key="title"
            className={classnames({
              "is-invalid":
                !notificationTitle.text && notificationTitle.touched,
            })}
            type="text"
            onChange={e =>
              setNotificationTitle({
                ...notificationTitle,
                text: e.target.value,
              })
            }
            onBlur={e =>
              setNotificationTitle({ ...notificationTitle, touched: true })
            }
            value={notificationTitle.text}
            placeholder={intl.formatMessage({ id: "TITLE" })}
          />
        </InputGroup>
        <InputGroup
          className={classnames("input-group-merge mb-1", {
            "is-invalid":
              !notificationContent.text && notificationContent.touched,
          })}
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <AlignCenter size={17} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            key="content"
            style={{ resize: "none" }}
            className={classnames({
              "is-invalid":
                !notificationContent.text && notificationContent.touched,
            })}
            type="textarea"
            onChange={e =>
              setNotificationContent({
                ...notificationContent,
                text: e.target.value,
              })
            }
            onBlur={e =>
              setNotificationContent({ ...notificationContent, touched: true })
            }
            value={notificationContent.text}
            placeholder={intl.formatMessage({ id: "CONTENT" })}
          />
        </InputGroup>
      </Col>
      <Col style={{ display: "flex", flexDirection: "column" }} md={6}>
        <h2>
          <FormattedMessage id="TEMPLATES" />
        </h2>
        {templates.map((template, index) => (
          <CollapseRadioButton
            title={template.title}
            description={template.description}
            handleChange={e => {
              if (e.target.value === "on") setCheckedTemplate(index)
            }}
            checked={index === checkedTemplate}
          />
        ))}
      </Col>
    </Row>
  )
}

export default What
