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
  deleteHomeAssetAsync,
  clearDeleteHomeAssetErrorMessage,
} from "../../../../../redux/index.actions"
import {
  selectDeleteHomeAssetErrorMessage,
  selectDeleteHomeAssetIsLoading,
} from "../../../../../redux/index.selectors"

const HomeAssetsTableRow = ({
  homeAsset,
  deleteHomeAsset,
  clearDeleteHomeAssetErrorMessage,
  deleteHomeAssetErrorMessage,
  deleteHomeAssetIsLoading,
}) => {
  const intl = useIntl()
  const ability = useContext(AbilityContext)

  const deleteHomeAssetDialogAttributes = {
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
              <FormattedMessage id="DELETE.FILE" />
            </span>
          </>
        </div>
      ),
      className: "btn-icon mr-75 p-50",
    },
    dialog: {
      title: intl.formatMessage({ id: "DELETE.HOME.FILE" }),
      content: intl.formatMessage({
        id: "ARE.YOU.SURE.YOU.WANT.TO.DELETE.THIS.HOME.FILE",
      }),
      actions: [
        {
          title: deleteHomeAssetIsLoading ? (
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
            deleteHomeAsset(homeAsset.displayName, {
              success: {
                title: intl.formatMessage({
                  id: "DELETE.HOME.ASSET.SUCCESS.TITLE",
                }),
                content: intl.formatMessage({
                  id: "DELETE.HOME.ASSET.SUCCESS.CONTENT",
                }),
              },
            }),
        },
        {
          title: intl.formatMessage({ id: "CANCEL" }),
          color: "secondary",
          disabled: deleteHomeAssetIsLoading,
        },
      ],
    },
    errorMessage: deleteHomeAssetErrorMessage,
    isLoading: deleteHomeAssetIsLoading,
    closingAction: () => clearDeleteHomeAssetErrorMessage(),
  }

  const homeAssetPreviewDialogAttributes = {
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
      title: intl.formatMessage({ id: "HOME.FILE.PREVIEW" }),
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
            src={homeAsset.jpgUrl}
            style={{ objectFit: "cover", height: "90%", width: "100%" }}
          />
          <h3 className="mt-25 ml-25">{homeAsset.displayName}</h3>
        </Card>
      ),
    },
  }
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center ">
          <Avatar
            img={homeAsset.jpgUrl}
            imgClassName="objectFit"
            imgHeight="40"
            imgWidth="40"
          />
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {homeAsset.displayName ? homeAsset.displayName : renderEmpty()}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center ">
          {homeAsset.size ? homeAsset.size : renderEmpty()}
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
              href={homeAsset.pdfUrl}
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
            {ability.can("manage", "home_asset-DELETE") && (
              <Dialog {...deleteHomeAssetDialogAttributes} />
            )}
            <Dialog {...homeAssetPreviewDialogAttributes} />
          </div>
          <div />
        </div>
      </td>
    </tr>
  )
}

const mapStateToProps = createStructuredSelector({
  deleteHomeAssetErrorMessage: selectDeleteHomeAssetErrorMessage,
  deleteHomeAssetIsLoading: selectDeleteHomeAssetIsLoading,
})

const mapDispatchToProps = dispatch => ({
  deleteHomeAsset: (folderName, messages) =>
    dispatch(deleteHomeAssetAsync(folderName, messages)),
  clearDeleteHomeAssetErrorMessage: () =>
    dispatch(clearDeleteHomeAssetErrorMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeAssetsTableRow)
