import React from 'react';
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

class ModalEditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bl: false,
      modal: false,
      users: []
    };
    this.toggle = this.toggle.bind(this);
    this.update = this.update.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e){
    this.setState({
      [e.currentTarget.id]: e.target.value
    });
  }

  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.clearAlertTimeout();
    this.alertTimeout = setTimeout(
      function() {
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

//update*****************************************************************************************************
  update(e,values){
    console.log(values);
    values.blood_glucose_meter_qty = parseInt(values.blood_glucose_meter_qty);
    // document.getElementById("Err_PT").innerHTML = "";

    // if ((values.blood_glucose_member_id == "")&&(values.hba1c_member_id == "")&&(values.hct_member_id == "")) {
    //   document.getElementById("Err_PT").innerHTML = "กรุณาระบุโปรแกรมการทดสอบความชำนาญ";
    //   return false;
    // }
    // else{
    fetch(`http://localhost:3001/api/user/update/${values._id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          this.setState({
            modal: !this.state.modal
          });
          window.location = '/member'
        }else{
          this.showNotification("bl");
          this.setState({
            editUserError: data.message
          });
        }
      });
    // }
  }

  render() {
    const { editUserError } = this.state;

    const defaultValues = {
      _id: this.props.user._id,
      partner: this.props.user.partner,
      department_name: this.props.user.department_name,
      blood_glucose_member_id: this.props.user.blood_glucose_member_id,
      // hba1c_member_id: this.props.user.hba1c_member_id,
      // hct_member_id: this.props.user.hct_member_id,
      username: this.props.user.username,
      password: this.props.user.password,
      blood_glucose_meter_qty: this.props.user.blood_glucose_meter_qty,
      sentBgResult: this.props.user.sentBgResult
    }

    return (
      <div>
        {
          (editUserError ) ? (
            <Snackbar
              place="bl"
              color="danger"
              icon={Error}
              message={editUserError}
              open={this.state.bl}
              closeNotification={() => this.setState({ bl: false })}
              close
            />
          ) : (null)
        }
        <Button variant="fab" color="primary" aria-label="Edit" onClick={this.toggle}>
          <Icon>edit_icon</Icon>
        </Button>
        <Modal isOpen={this.state.modal} onClose={this.toggleModalClose} toggle={this.toggle} className={this.props.className}>
          <Card >
            <CardHeader color="info">
              <Icon className="float-right">edit_icon</Icon>
              <h4 className={style.cardTitleWhite}>Edit member (แก้ไขสมาชิก)</h4>
            </CardHeader>
            <CardBody >
              <AvForm onValidSubmit={this.update} model={defaultValues}>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="partner" style={{color: "#2979ff"}}>Partner (หน่วยงานที่สนับสนุน)</Label>
                        <AvInput
                          id="_id"
                          name="_id"
                          onChange={this.handleInputChange}
                          type="hidden"
                          value={this.state._id}
                        />
                        <AvInput
                          id="partner"
                          name="partner"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.partner}
                        />
                        <AvFeedback>Please enter a partner. (กรุณาระบุหน่วยงานที่สนับสนุน)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="department_name" style={{color: "#2979ff"}}>Department name (ชื่อหน่วยงาน) </Label>
                        <AvInput
                          id="department_name"
                          name="department_name"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.department_name}
                        />
                        <AvFeedback>Please enter a department name. (กรุณาระบุชื่อหน่วยงาน)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <Label for="blood_glucose_member_id" style={{color: "#2979ff"}}>Member id of Blood Glucose Program <br/>(รหัสผู้รับบริการ Blood Glucose)</Label>
                      <AvGroup>
                        <AvInput
                          id="blood_glucose_member_id"
                          name="blood_glucose_member_id"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.blood_glucose_member_id}
                        />
                        <AvFeedback>Please enter a Member id of Blood Glucose Program. <br/>(กรุณาระบุรหัสผู้รับบริการ Blood Glucose)</AvFeedback>
                      </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <Label for="blood_glucose_meter_qty" style={{color: "#2979ff"}}>Quantity Meter. <br/>(จำนวนเครื่องตรวจวัด Blood Glucose)</Label>
                      <AvGroup>
                        <AvInput
                          id="blood_glucose_meter_qty"
                          name="blood_glucose_meter_qty"
                          onChange={this.handleInputChange}
                          required
                          type="number"
                          min={1}
                          value={this.blood_glucose_meter_qty}
                        />
                        <AvFeedback>Please enter a Quantity Meter. <br/>(กรุณาระบุจำนวนเครื่องตรวจวัด Blood Glucose)</AvFeedback>
                      </AvGroup>
                  </GridItem>
                </GridContainer>
                  {/* <GridContainer>
                    <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <Label for="hct_member_id" style={{color: "#2979ff"}}>Hct Member ID <br/>(รหัสผู้รับบริการชนิด Hct)</Label>
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
                    <Label for="hba1c_member_id" style={{color: "#2979ff"}}>HbA1c Member ID <br/>(รหัสผู้รับบริการชนิด HbA1c)</Label>
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
                      <Label for="username" style={{color: "#2979ff"}}>User id. (รหัสผู้ใช้)</Label>
                        <AvInput
                          id="username"
                          name="username"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.username}
                        />
                        <AvFeedback>Please enter a User id. (กรุณาระบุรหัสผู้ใช้)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="password" style={{color: "#2979ff"}}>Password. (รหัสผ่าน)</Label>
                        <AvInput
                          id="password"
                          name="password"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.password}
                          minLength="4"
                          maxLength="6"
                          placeholder="โปรดระบุ 4-6 ตัวอักษร"
                        />
                        <AvFeedback>Please enter a password valid. (กรุณาระบุรหัสผ่านให้ถูกต้อง)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                {defaultValues.sentBgResult === true ? 
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto"}}>
                    <AvGroup check>
                      <AvInput type="checkbox" name="result_approve_again" /> 
                      <Label for="result_approve_again" style={{color: "#ff1744" }}>Approve for re-enter a new result. <br/>(อนุมัติให้ส่งผลใหม่)</Label>
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                : null }
                <font size="2" id="Err_PT" color="red"></font>
                <ModalFooter>
                  <Button color="danger" type="submit" >บันทึก</Button>
                  <Button color="secondary" onClick={this.toggle} >ยกเลิก</Button>
                </ModalFooter>
              </AvForm>
            </CardBody>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default ModalEditUser;