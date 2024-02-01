import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { FormattedMessage } from "react-intl"
import { Power, User } from "react-feather"
import { Link, useHistory } from "react-router-dom"
import Avatar from "../../../../utility/components/avatar/index"
import { logOut } from "../../../../redux/index.actions"
import {
  selectCurrentUserUsername,
  selectCurrentUserRole,
  selectCurrentUserAvatar,
  selectCurrentUserUuid,
  selectCurrentUserId,
  selectCurrentUser,
} from "../../../../redux/index.selectors"
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap"
import defaultAvatar from "../../../../assets/images/avatar-blank.png"

const UserDropdown = ({
  logOut,
  currentUserUsername,
  currentUserRole,
  currentUserAvatar,
  currentUserUuid,
  currentUserId,
}) => {
  const history = useHistory()

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={e => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name font-weight-bold">
            {currentUserUsername}
          </span>
          <span className="user-status">
            {currentUserRole ? (
              <FormattedMessage id={currentUserRole.toUpperCase()} />
            ) : null}
          </span>
        </div>
        <Avatar
          img={
            currentUserAvatar !== "false"
              ? `${currentUserAvatar}?random=${Math.random()
                  .toString(36)
                  .substring(7)}`
              : defaultAvatar
          }
          imgClassName="objectFit"
          imgHeight="40"
          imgWidth="40"
        />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem
          tag={Link}
          to={{
            pathname: "/userdetails",
            state: {
              paramAndType: {
                lecturer: true,
                param: currentUserId,
                type: currentUserRole === "lecturer" ? "lecturer" : "staff",
              },
              uuid: currentUserId,
              userUuid: currentUserUuid,
            },
          }}
        >
          <User size={14} className="mr-75" />
          <span className="align-middle">
            <FormattedMessage id="PROFILE" />
          </span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={() => logOut()}>
          <Power size={14} className="mr-75" />
          <span className="align-middle">
            <FormattedMessage id="LOGOUT" />
          </span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

const mapStateToProps = createStructuredSelector({
  currentUserUsername: selectCurrentUserUsername,
  currentUserRole: selectCurrentUserRole,
  currentUserAvatar: selectCurrentUserAvatar,
  currentUser: selectCurrentUser,
  currentUserUuid: selectCurrentUserUuid,
  currentUserId: selectCurrentUserId,
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown)
