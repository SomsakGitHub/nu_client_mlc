import React from 'react';
import PropTypes from 'prop-types';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Modal, Label, ModalFooter, Button } from 'reactstrap';
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
// @material-ui/icons
import { Icon } from '@material-ui/core';
import Error from "@material-ui/icons/Error";
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import { fetchPartner } from '../../utils/partner';

  // var suggestions = [
  //   { label: 'Afghanistan' },
  //   { label: 'Aland Islands' }
  // ];

  var suggestions = [];

  fetchPartner().then(res => {
    suggestions = res.map(obj => ({
      label: obj
      // suggestions.push(suggestion);
    }))
  });

const style = {
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

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  // const suggestions = [
  //   { label: 'Afghanistan' },
  //   { label: 'Aland Islands' }
  // ];

  // var suggestionss = fetch('http://localhost:3001/api/user/getPartner').then(res => res.json());
  
  // const Partner = suggestionss.map(suggestion => ({
  //   label: suggestion,
  // }));;

  // console.log("suggestions ",suggestions);
  // console.log("Partner ",Partner);

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class ModalAddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addUserError: '',
      bl: false,
      modal: false,
      partner: 'ทำการลงทะเบียนเข้ามาเอง',
      department_name: '',
      blood_glucose_member_id: '',
      blood_glucose_meter_qty: '',
      // hba1c_member_id: '',
      // hct_member_id: '',
      username: '',
      password: '',
      single: '',
      popper: '',
      suggestions: [],
    };
    this.toggle = this.toggle.bind(this);
    this.register = this.register.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  handleInputChange(e) {
    this.setState({
      [e.currentTarget.id]: e.target.value
    });
  }

  // register****************************************************************************************************************
  register(e, values) {
    console.log("values ", values);
    if(values == undefined) {
      // this.showNotification("bl");
      //   this.setState({
      //     addUserError: "กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง"
      //   });
      console.log("valuesIF");
    }else{
    // document.getElementById("Err_PT").innerHTML = "";
      console.log("valuesElse");
    // if ((values.blood_glucose_member_id == "") && (values.hba1c_member_id == "") && (values.hct_member_id == "")) {
    //       document.getElementById("Err_PT").innerHTML = "กรุณาระบุโปรแกรมการทดสอบความชำนาญ";
    //     return false;
    // } else {
      fetch('http://localhost:3001/api/user/addUser', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.status) {
            this.setState({
              partner: 'ทำการลงทะเบียนเข้ามาเอง',
              department_name: '',
              blood_glucose_member_id: '',
              blood_glucose_meter_qty: '',
              // hba1c_member_id: '',
              // hct_member_id: '',
              username: '',
              password: '',
              modal: !this.state.modal
            });
            window.location = '/member'
          } else {
            this.showNotification("bl");
            this.setState({
              addUserError: data.message
            });
          }
        })
        .catch(err => console.error(err));
      }
    // }
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
      3000
    );
  }

  clearAlertTimeout() {
    if (this.alertTimeout !== null) {
      clearTimeout(this.alertTimeout);
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { addUserError } = this.state;
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div>
        {
          (addUserError) ? (
            <Snackbar
              place="bl"
              color="danger"
              icon={Error}
              message={addUserError}
              open={this.state.bl}
              closeNotification={() => this.setState({ bl: false })}
              close
            />
          ) : (null)
        }
        <Button variant="contained" color="success" style={{ marginRight: 10 }} onClick={this.toggle}>เพิ่มสมาชิก
          <Icon style={{ paddingLeft: 3, paddingTop: 4 }} >person_add</Icon>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Card>
            <CardHeader color="success">
              <Icon className="float-right">person_add</Icon>
              <h4 className={style.cardTitleWhite}>Add member (เพิ่มสมาชิก)</h4>
            </CardHeader>
            <CardBody>
            <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Search a country (start with a)',
            value: this.state.single,
            options: suggestions,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        </div>
              <AvForm onValidSubmit={this.register} >
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="partner" style={{ color: "#2979ff" }}>Partner (หน่วยงานที่สนับสนุน) </Label>
                      <AvInput
                        id="partner"
                        name="partner"
                        onChange={this.handleInputChange}
                        type="text"
                        value={this.state.partner}
                      />
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="department_name" style={{ color: "#2979ff" }}>Department name (ชื่อหน่วยงาน) </Label>
                      <AvInput
                        id="department_name"
                        name="department_name"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.state.department_name}
                      />
                      <AvFeedback>Please enter a department name. (กรุณาระบุชื่อหน่วยงาน)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <Label for="blood_glucose_member_id" style={{ color: "#2979ff" }}>Member id of Blood Glucose Program <br/>(รหัสผู้รับบริการ Blood Glucose)</Label>
                    <AvGroup>
                      <AvInput
                        id="blood_glucose_member_id"
                        name="blood_glucose_member_id"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.state.blood_glucose_member_id}
                      />
                      <AvFeedback>Please enter a Member id of Blood Glucose Program. <br/>(กรุณาระบุรหัสผู้รับบริการ Blood Glucose)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <Label for="blood_glucose_meter_qty" style={{ color: "#2979ff" }}>Quantity Meter<br />(จำนวนเครื่องตรวจวัด Blood Glucose)</Label>
                      <AvGroup>
                        <AvInput
                          id="blood_glucose_meter_qty"
                          name="blood_glucose_meter_qty"
                          onChange={this.handleInputChange}
                          required
                          type="number"
                          min={1}
                          value={this.state.blood_glucose_meter_qty}
                        />
                      <AvFeedback>Please enter a Quantity Meter. <br/>(กรุณาระบุจำนวนเครื่องตรวจวัด Blood Glucose)</AvFeedback>
                      </AvGroup>
                  </GridItem>
                </GridContainer>
                {/* <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Label for="hct_member_id" style={{ color: "#2E7D32" }}>Hct member id. <br />(รหัสผู้รับบริการชนิด Hct)</Label>
                    <AvGroup>
                      <AvInput
                        id="hct_member_id"
                        name="hct_member_id"
                        onChange={this.handleInputChange}
                        type="text"
                        value={this.state.hct_member_id}
                      />
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Label for="hba1c_member_id" style={{ color: "#2E7D32" }}>HbA1c member id. <br />(รหัสผู้รับบริการชนิด HbA1c)</Label>
                    <AvGroup>
                      <AvInput
                        id="hba1c_member_id"
                        name="hba1c_member_id"
                        onChange={this.handleInputChange}
                        type="text"
                        value={this.state.hba1c_member_id}
                      />
                    </AvGroup>
                  </GridItem>
                </GridContainer> */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="username" style={{ color: "#2979ff" }}>User id (รหัสผู้ใช้)</Label>
                      <AvInput
                        id="username"
                        name="username"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.state.username}
                      />
                      <AvFeedback>Please enter a User id. (กรุณาระบุรหัสผู้ใช้)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <Label for="password" style={{ color: "#2979ff" }}>Password (รหัสผ่าน)</Label>
                    <AvGroup>
                      <AvInput
                        id="password"
                        name="password"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.state.password}
                        minLength="4"
                        maxLength="6"
                        placeholder="โปรดระบุ 4-6 ตัวอักษร"
                      />
                      <AvFeedback>Please enter a password valid. (กรุณาระบุรหัสผ่านให้ถูกต้อง)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                {/* <font size="2" id="Err_PT" color="red"></font> */}
                <ModalFooter>
                  <Button color="danger" type="submit" >บันทึก</Button>
                  <Button color="secondary" onClick={this.toggle}>ยกเลิก</Button>
                </ModalFooter>
              </AvForm>
            </CardBody>
          </Card>
        </Modal>
      </div>
    );
  }
}
ModalAddUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (ModalAddUser);