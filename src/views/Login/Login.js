import React, { Component } from 'react';
import logo from '../../logo.jpg';
import './Login.css';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { ModalFooter, Button } from 'reactstrap';
// @material-ui/icons
import Error from "@material-ui/icons/Error";
import { Icon } from '@material-ui/core';
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

//storage---------------------------------------------------------------------------------------------------------
import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

//style---------------------------------------------------------------------------------------------------------
const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Kanit','Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      loginError: '',
      loginUsername: '',
      loginPassword: '',
      bl: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      fetch('http://localhost:3001/api/users/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleInputChange(e) {
    this.setState({
      [e.currentTarget.id]: e.target.value
    });
  }
// login******************************************************************************************************************
  login(e, values) {
      fetch('http://localhost:3001/api/user/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
        }).then(res => res.json())
        .then(data => {
          if (data.status) {
            setInStorage('the_main_app', {
              token: data.token,
              username: data.username,
              user_type: data.user_type,
              user_type_id: data.user_type_id,
              department_name: data.department_name,
              blood_glucose_member_id: data.blood_glucose_member_id,
              hba1c_member_id: data.hba1c_member_id,
              hct_member_id: data.hct_member_id,
              blood_glucose_meter_qty: data.blood_glucose_meter_qty,
              sentBgResult: data.sentBgResult,
              _id: data._id
            });
            this.setState({
              loginError: data.message,
              loginUsername: '',
              loginPassword: '',
              token: data.token
            });
          } else {
            this.showNotification("bl");
            this.setState({
              loginError: data.message
            });
          }
        });
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.clearAlertTimeout();
    this.alertTimeout = setTimeout(
      function () {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      5000
    );
  }

  componentWillUnmount() {
    this.clearAlertTimeout();
  }

  clearAlertTimeout() {
    if (this.alertTimeout !== null) {
      clearTimeout(this.alertTimeout);
    }
  }

  render(){
    const { token, loginError, loginUsername, loginPassword } = this.state;
            if (!token) {
              return(
                <div className="App">
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to NU MLC Proficiency Testing</h1>
                  </header>
                  {
                  (loginError) ? (
                    <Snackbar
                      place="bl"
                      color="danger"
                      icon={Error}
                      message={loginError}
                      open={this.state.bl}
                      closeNotification={() => this.setState({ bl: false })}
                      close
                    />
                  ) : (null)
                  }
                  <Card style={{ width: 700, marginLeft: "auto", marginRight: "auto" }}>
                    <CardHeader color="info" >
                      <h4 className={style.cardTitleWhite}>เข้าสู่ระบบ</h4>
                    </CardHeader>
                    <CardBody>
                      <div className={style.typo}>
                        <AvForm onValidSubmit={this.login} >
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6} style={{ marginLeft: "auto", marginRight: "auto" }}>
                              <AvGroup>
                                  <AvInput
                                    onChange={this.handleInputChange} 
                                    value={loginUsername}
                                    id="username" 
                                    type="username" 
                                    name="username" 
                                    placeholder="User id"
                                    required
                                  />
                                <AvFeedback>Please enter a User id. (กรุณาระบุรหัสผู้ใช้)</AvFeedback>
                              </AvGroup>
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6} style={{ marginLeft: "auto", marginRight: "auto" }}>
                              <AvGroup>
                                <AvInput
                                  onChange={this.handleInputChange} 
                                  value={loginPassword}
                                  id="password"  
                                  type="password" 
                                  name="password" 
                                  placeholder="Password"
                                  required 
                                />
                                <AvFeedback>Please enter a password. (กรุณาระบุรหัสผ่าน)</AvFeedback>
                              </AvGroup>
                            </GridItem>
                          </GridContainer>
                          <ModalFooter>
                            <Button color="info" style={{ marginLeft: "auto", marginRight: "auto" }} type="submit" >Login
                              <Icon style={{ paddingLeft: 2, paddingTop: 5 }} >vpn_key</Icon>
                            </Button>
                          </ModalFooter>
                        </AvForm>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              )
            }
            window.location.assign('information');     
  }
}

export default Login;