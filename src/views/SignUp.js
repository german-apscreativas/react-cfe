import { useState } from "react"
import { useSkin } from "@hooks/useSkin"
import { Link, useHistory } from "react-router-dom"
import { Facebook, Twitter, Mail, GitHub } from "react-feather"
import InputPasswordToggle from "@components/input-password-toggle"
import { Loader } from '../components/Loader/Loader'
import { useDispatch, useSelector } from "react-redux"
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button
} from "reactstrap"
import "@styles/base/pages/page-auth.scss"
import { handleRegister } from "../redux/actions/auth"
import { signinWithGoogle, signinWithFb } from "../firebase"
import Swal from "sweetalert2"

const SignUp = () => {
  const loading = useSelector((state) => state.auth.loading)
  const [skin, setSkin] = useSkin()
  const history = useHistory()
  const [state, setState] = useState({
    nombre: "",
    username: "",
    email: "",
    password: "",
    vPassword: "",
    telefono: "",
    role: ""
  })
  const dispatch = useDispatch()
  const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default

  const hanldeSubmit = (e) => {
    e.preventDefault()
    if (state.nombre.length > 0 && state.email.length > 0 && state.password.length > 0) {
      if (state.password === state.vPassword) {
        dispatch(handleRegister({ 
          nombre: state.nombre.trim(), 
          email: state.email.trim(), 
          password: state.password.trim(), 
          username: state.username.trim(), 
          telefono: state.telefono.trim(),
          role: state.role.trim() 
        }, history))
      } else {
        Swal.fire({
          icon: 'error',
          text: 'Las contraseñas no coinciden'
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Rellene los campos'
      })
    }
  }
  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/">
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ml-1">Vuexy</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        {loading && <Loader />}
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="font-weight-bold mb-1">
              ¡Bienvenido a Ticket System! 👋
            </CardTitle>
            <Form className="auth-login-form mt-2" onSubmit={hanldeSubmit}>
              <FormGroup>
                <Label className="form-label" for="login-nombre">
                  Nombre completo
                </Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    setState({ ...state, nombre: e.currentTarget.value })
                  }}
                  id="signup-nombre"
                  placeholder="john Wick"
                  autoFocus
                  value={state.nombre}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="login-username">
                  Username
                </Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    setState({ ...state, username: e.currentTarget.value })
                  }}
                  id="signup-username"
                  placeholder="John1234"
                  autoFocus
                  value={state.username}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="login-telefono">
                  Telefono
                </Label>
                <Input
                  type="text"
                  onChange={(e) => {
                    setState({ ...state, telefono: e.currentTarget.value })
                  }}
                  id="signup-telefono"
                  placeholder="+529931456576"
                  autoFocus
                  value={state.telefono}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Correo Electronico
                </Label>
                <Input
                  type="email"
                  onChange={(e) => {
                    setState({ ...state, email: e.currentTarget.value })
                  }}
                  id="login-email"
                  placeholder="john@example.com"
                  value={state.email}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="login-password">
                  Contraseña
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  value={state.password}
                  id="login-password"
                  onChange={(e) => {
                    setState({ ...state, password: e.currentTarget.value })
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="login-vpassword">
                  Verificar contraseña
                </Label>
                <InputPasswordToggle
                  className="input-group-merge"
                  value={state.vPassword}
                  id="login-vpassword"
                  onChange={(e) => {
                    setState({ ...state, vPassword: e.currentTarget.value })
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="login-role">Role</Label>
                <Input onChange={(e) => {
                  setState({ ...state, role: e.currentTarget.value })
                }} type="select" name="select-role" id="selectRole">
                  <option>Seleccione un role</option>
                  <option>ADMIN</option>
                  <option>CAPTURADOR</option>
                  <option>REPORTES</option>
                </Input>  
              </FormGroup>
              <Button.Ripple type="submit" color="primary" block>
                Registrarse
              </Button.Ripple>
            </Form>
            <p className="text-center mt-2"></p>
            <div className="auth-footer-btn d-flex justify-content-center">
              <Button.Ripple color="facebook" onClick={async () => {
                dispatch({ type: 'LOADING', loading: true })
                try {
                  await signinWithFb('REGISTER')
                } catch (e) {
                  dispatch({ type: 'LOADING', loading: false })
                }
              }}>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color="google" onClick={async () => {
                dispatch({ type: 'LOADING', loading: true })
                try {
                  const isValid = await signinWithGoogle('REGISTER')
                } catch (e) {
                  dispatch({ type: 'LOADING', loading: false })
                }
              }
              }>
                <Mail size={14} />
              </Button.Ripple>
            </div>
            <p className="text-center mt-2">
              ¿Ya tienes una cuenta?, <Link to="/login"><a>Inicia sesión</a></Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default SignUp
