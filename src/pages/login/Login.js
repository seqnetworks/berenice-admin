import { useState, Fragment } from "react";
import ErrorCard from "../../custom/errorcard/ErrorCard.component";
import classnames from "classnames";
import Avatar from "../../utility/components/avatar";
import { useSkin } from "@hooks/useSkin";
import { connect } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useIntl, FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { toast, Slide } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import { Coffee } from "react-feather";
import Logo from "../../assets/images/bereniceLogo.png";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Spinner,
  Row,
} from "reactstrap";
import "@styles/base/pages/page-auth.scss";
import { logInAsync } from "../../redux/index.actions";
import {
  selectCurrentUserUsername,
  selectLoginErrorMessage,
  selectLoginIsLoading,
} from "../../redux/auth/auth.selectors";

const ToastContent = ({ name }) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Coffee size={12} />} />
        <h6 className="toast-title font-weight-bold">Welcome, {name}</h6>
      </div>
    </div>
    <div className="toastify-body">
      <span>
        You have successfully logged in as an admin user to Berenice University
        Admin Panel
      </span>
    </div>
  </Fragment>
);

const Login = ({
  login,
  currentUserUsername,
  loginIsLoading,
  loginErrorMessage,
}) => {
  const [skin, setSkin] = useSkin();
  const [visible, setVisible] = useState(false);
  const [actionDone, setActionDone] = useState(false);
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  const intl = useIntl();
  const logInValidationSchema = Yup.object().shape({
    username: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
    password: Yup.string().required(
      intl.formatMessage({ id: "THIS.FIELD.IS.REQUIRED" })
    ),
  });
  const logInFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: logInValidationSchema,
    onSubmit: async (values) => {
      await login(values);
      setActionDone(true);
    },
  });

  const renderIcon = () => {
    if (visible === true) return <EyeOff size={14} />;
    else return <Eye size={14} />;
  };

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <Logo />
          <h2 className="brand-text text-primary ml-1">
            <FormattedMessage id="SIMSIM" />
          </h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1 text-center">
              <FormattedMessage id="WELCOME.TO.SIMSIM" />
            </CardTitle>
            {actionDone && !loginErrorMessage
              ? toast.success(<ToastContent name={currentUserUsername} />, {
                  transition: Slide,
                  hideProgressBar: true,
                  autoClose: 2500,
                })
              : null}
            {actionDone && !loginErrorMessage ? <Redirect to="/" /> : null}
            {loginErrorMessage ? (
              loginErrorMessage === "not admin" ? (
                <ErrorCard
                  content={intl.formatMessage({
                    id: "ONLY.ADMINS.ARE.ABLE.TO.LOGIN",
                  })}
                />
              ) : (
                <ErrorCard
                  content={intl.formatMessage({
                    id: "USERNAME.OR.PASSWORD.WAS.WRONG",
                  })}
                />
              )
            ) : null}
            <Form
              className="auth-login-form mt-2"
              onSubmit={logInFormik.handleSubmit}
            >
              <FormGroup>
                <Input
                  autoFocus
                  placeholder={intl.formatMessage({
                    id: "USERNAME.OR.PHONE.NUMBER",
                  })}
                  type="text"
                  {...logInFormik.getFieldProps("username")}
                  className={classnames({
                    "is-invalid":
                      logInFormik.errors["username"] &&
                      logInFormik.touched["username"]
                        ? true
                        : false,
                  })}
                />
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-merge">
                  <Input
                    {...loginFormik.getFieldProps("password")}
                    className={classnames({
                      "is-invalid":
                        loginFormik.errors["password"] &&
                        loginFormik.touched["password"],
                    })}
                    placeholder={intl.formatMessage({ id: "PASSWORD" })}
                    type={visible ? "text" : "password"}
                  />
                  <InputGroupAddon
                    addonType="append"
                    onClick={() => setVisible(!visible)}
                  >
                    <InputGroupText className="cursor-pointer">
                      {renderIcon()}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <Button
                disabled={
                  loginIsLoading || !(logInFormik.dirty && logInFormik.isValid)
                }
                type="submit"
                color="primary"
                block
              >
                {loginIsLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    aria-hidden="true"
                  />
                ) : (
                  <FormattedMessage id="SIGN.IN" />
                )}
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserUsername: selectCurrentUserUsername,
  loginIsLoading: selectLoginIsLoading,
  loginErrorMessage: selectLoginErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(logInAsync(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
