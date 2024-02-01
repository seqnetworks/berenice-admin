import React, { useContext } from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Spinner, Button, Card } from "reactstrap"
import { useIntl, FormattedMessage } from "react-intl"
import { Trash, CreditCard, FileText } from "react-feather"
import { AbilityContext } from "../../../../../utility/context/Can"
import Dialog from "../../../../../custom/dialog/dialog.component"
import Avatar from "../../../../../utility/components/avatar/index"
import {
  deleteEFormAsync,
  clearDeleteEFormErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectDeleteEFormErrorMessage,
  selectDeleteEFormIsLoading,
} from "../../../../../redux/index.selectors"

const EFormsTableRow = ({
  eForm,
  deleteEForm,
  clearDeleteEFormErrorMessage,
  deleteEFormErrorMessage,
  deleteEFormIsLoading,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const deleteEFormDialogAttributes = {
    button: {
      color: "primary",
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <>
            <Trash className="mr-50" size={15} />
            <span>
              <FormattedMessage id="DELETE.FORM" />
            </span>
          </>
        </div>
      ),
      className: "btn-icon mr-75 p-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.EFORM" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.EFORM",
      }),
      actions: [
        {
          title: deleteEFormIsLoading ? (
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
            deleteEForm(eForm.displayName, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.EFORM.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.EFORM.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteEFormIsLoading,
        },
      ],
    },
    errorMessage: deleteEFormErrorMessage,
    isLoading: deleteEFormIsLoading,
    closingAction: () => clearDeleteEFormErrorMessage(),
  }

  const eFormPreviewDialogAttributes = {
    button: {
      color: "primary",
      title: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <>
            <CreditCard
              style={{ transform: "Rotate(180deg)" }}
              className="mr-50"
              size={15}
            />
            <span>
              <FormattedMessage id="VIEW.CARD" />
            </span>
          </>
        </div>
      ),
      className: "btn-icon p-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "EFORM.PREVIEW" }),
      content: (
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            height: "250px",
            width: "200px",
            borderRadius: "5px",
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <img
            src={eForm.jpgUrl}
            style={{ objectFit: "cover", height: "90%", width: "100%" }}
          />
          <h3 className="mt-25 ml-25">{eForm.displayName}</h3>
        </Card>
      ),
    },
  }
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          <Avatar
            img={eForm.jpgUrl}
            imgClassName="objectFit"
            imgHeight="40"
            imgWidth="40"
          />
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {eForm.displayName ? eForm.displayName : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {eForm.size ? eForm.size : renderEmpty()}
        </div>
      </td>
      <td>
        <div
          style={{ justifyContent: "space-between" }}
          className="d-flex align-items-center"
        >
          <div />
          <div className="d-flex align-items-center">
            <Button
              color="primary"
              className="btn-icon p-50 mr-75"
              href={eForm.pdfUrl}
              target="_blank"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <>
                <FileText size={15} className="mr-50" />
                <FormattedMessage id="VIEW.PDF" />
              </>
            </Button>
            {ability.can("manage", "eForm-DELETE") && (
              <Dialog {...deleteEFormDialogAttributes} />
            )}
            <Dialog {...eFormPreviewDialogAttributes} />
          </div>
          <div />
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteEFormErrorMessage: selectDeleteEFormErrorMessage,
  deleteEFormIsLoading: selectDeleteEFormIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteEForm: (folderName, messages) =>
    dispatch(deleteEFormAsync(folderName, messages)),
  clearDeleteEFormErrorMessage: () => dispatch(clearDeleteEFormErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EFormsTableRow)
