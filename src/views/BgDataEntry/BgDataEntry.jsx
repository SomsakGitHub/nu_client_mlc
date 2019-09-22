import React from "react";
import PropTypes from "prop-types";
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';
import { Button, Label, ModalFooter, Row, Col, FormGroup, Input } from 'reactstrap';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonMat from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import Error from "@material-ui/icons/Error";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
//utils*************************************************************************************
import { getFromStorage } from '../../utils/storage';
import { fetchGetSettingBgForm } from '../../utils/bgForm';
import { fetchUserById } from '../../utils/userById';
import { PDFprint } from '../../utils/PDFprint';

const styles = theme => ({
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Kanit','Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    }
  }
});

const user = getFromStorage('the_main_app');

let id = 0;
function createStep2DataTable(meter_number, serial_number, lot_strip, value_item_number_typeOne,
  value_item_number_typeTwo, receive_date, analyze_date) {
  id += 1;
  return { id, meter_number, serial_number, lot_strip, value_item_number_typeOne,
  value_item_number_typeTwo, receive_date, analyze_date};
}

class BgDataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.mainDataEntry
      this.state = {
        otherMeterBrandDisabled: true,
        meterBrandDisabled: false,
        constRequired: false,
        bl: false,
        messageRowMost: '',
        messageRowMinimum: '',
        messageMeterBrand: '',
        topic_name: '',
        blood_glucose_member_id: '',
        meter_brand: '',
        meter_number: '',
        serial_number: '',
        lot_strip: '',
        // code_item_number_typeOne: '',
        value_item_number_typeOne: '',
        // code_item_number_typeTwo: '',
        value_item_number_typeTwo: '',
        receive_date: '',
        analyze_date: '',
        auditor: '',
        auditor_appointment: '',
        // auditor_date: '',
        assessor: '',
        assessor_appointment: '',
        assessor_date: '',
        form_name: '',
        email: '',
        closing_day: '',
        phone: '',
        line: '',
        company_name: '',
        user: [],
        bgForm: [],
        mainDataEntry: this.mainDataEntry,
        countRows: 1,
        activeStep: 0,
        step2DataTable: [],
        resultForm: [],
        step2Data: {},
        totalStep2: {},
        other_meter_brand: ""
      };
    
      this.sendDataEntry = this.sendDataEntry.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleInputChangeMeterBrandOther = this.handleInputChangeMeterBrandOther.bind(this);
      this.handleInputChangeTwo = this.handleInputChangeTwo.bind(this);
      this.handleSelectMeterBrand = this.handleSelectMeterBrand.bind(this);
      this.addRowByMeterNumber = this.addRowByMeterNumber.bind(this);
      this.deleteRowByMeterNumber = this.deleteRowByMeterNumber.bind(this);
  }
    
    addRowByMeterNumber() {
      if (this.state.countRows >= user.blood_glucose_meter_qty) {
        this.showNotification("bl");
        this.setState({
          messageRowMost: "จำนวนเครื่องที่ลงทะเบียนเต็มแล้ว",
          messageRowMinimum: "",
          messageMeterBrand: ""
        });
        return false
      } else {

        this.setState((previousState, currentProps) => {
          let data = previousState.mainDataEntry;
          let rowNumber =  (this.state.countRows + 1);
          data.push(
            this.getEntry({
              meter_number: user.blood_glucose_member_id + "-" +rowNumber,
              serial_number: this.state.step2DataTable.serial_number,
              lot_strip: "",
              // code_item_number_typeOne: "",
              value_item_number_typeOne: "",
              // code_item_number_typeTwo: "" ,
              value_item_number_typeTwo: "",
              receive_date: "",
              analyze_date: ""
            }, false, this.state.mainDataEntry.length)
          );
          return {
            mainDataEntry: data,
            countRows: this.state.countRows + 1
          };
        });
      }
    }

    deleteRowByMeterNumber(){
      if (this.state.countRows<=1) {
        this.showNotification("bl");
        this.setState({
          messageRowMinimum: "กรุณาระบุอย่างน้อย 1 เครื่อง",
          messageRowMost: "",
          messageMeterBrand: ""
        });
        return false
      }else{
        this.setState((previousState, currentProps) => {
          let data = previousState.mainDataEntry;
          data.pop()
        return {
          mainDataEntry: data,
          countRows: this.state.countRows - 1
        };
      });
      }
  }

    componentDidMount(){
      getFromStorage('the_main_app');
      fetchGetSettingBgForm().then(data => {this.setState({ bgForm: data });})
      fetchUserById(user._id).then(data => {this.setState({ user: data });})
    }

    handleInputChange(e){
      this.setState({
        [e.currentTarget.id]: e.target.value
      });
    }

    sendDataEntry(e,values) {
      // console.log("values ", values);

      let rows = [];
      if (this.state.activeStep===0) {
        for (let index = 0; index < values.meter_number.length; index++) {
          rows.push(
            createStep2DataTable(
            values.meter_number[index], values.serial_number[index], values.lot_strip[index], 
            values.value_item_number_typeOne[index], values.value_item_number_typeTwo[index], 
            values.receive_date[index], values.analyze_date[index]
            )
          )
        }
    
        if ((values.meter_brand === "ไม่ระบุ")||(values.meter_brand === "")) {
          this.showNotification("bl");
          this.setState({
            messageMeterBrand: "กรุณาระบุข้อมูลให้ครบถ้วน",
            messageRowMinimum: "",
            messageRowMost: ""
          });
          document.getElementById("Err_meter_brand").innerHTML = "Please enter a meter brand. (กรุณาระบุยี่ห้อเครื่อง)";
          return false;
        }
        
        let notRow = {
          meter_brand: values.meter_brand,
          other_meter_brand: values.other_meter_brand,
          auditor: values.auditor, 
          auditor_appointment: values.auditor_appointment,
          // auditor_date: values.auditor_date, 
          assessor: values.assessor, 
          assessor_appointment: values.assessor_appointment, 
          assessor_date: values.assessor_date,
          blood_glucose_member_id: values.blood_glucose_member_id,
          department_name: values.department_name,
          topic_name: values.topic_name,
          _id: values._id
        };
    
        this.setState(state => ({
          activeStep: state.activeStep + 1,
          step2DataTable: rows,
          step2Data: notRow,
          totalStep2: values
        }));
      }else if (this.state.activeStep===1) {

        if (this.state.totalStep2.other_meter_brand) {
          this.state.totalStep2.meter_brand = this.state.totalStep2.other_meter_brand
        }

        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
          fetch(`http://localhost:3001/api/BgDataEntry/addBgDataEntry/${this.state.totalStep2._id}`, {
          method: 'POST',
          body: JSON.stringify(this.state.totalStep2),
          headers: {
              'Accept': 'application/json',
              'Content-Type' : 'application/json'
          }
      })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              this.setState({
                otherMeterBrandDisabled: true,
                meterBrandDisabled: false,
                constRequired: true,
                topic_name: '',
                blood_glucose_member_id: '',
                meter_brand: '',
                meter_number: '',
                serial_number: '',
                lot_strip: '',
                // code_item_number_typeOne: '',
                value_item_number_typeOne: '',
                // code_item_number_typeTwo: '',
                value_item_number_typeTwo: '',
                receive_date: '',
                analyze_date: '',
                auditor: '',
                auditor_appointment: '',
                assessor: '',
                assessor_appointment: '',
                form_name: '',
                email: '',
                closing_day: '',
                phone: '',
                line: '',
                company_name: '',
                countRows: 1,
                disableButton: false
              });
            }
          })
          .catch(err => console.error(err));
          window.location.reload();
      }
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

    componentWillMount(){
      fetchGetSettingBgForm().then(data => {
        this.data = data;
        this.setState({ mainDataEntry: [
          this.getEntry({
            meter_number: user.blood_glucose_member_id + "-" + 1,
            serial_number: "",
            lot_strip: "",
            // code_item_number_typeOne: "",
            value_item_number_typeOne: "",
            // code_item_number_typeTwo: "" ,
            value_item_number_typeTwo: "",
            receive_date: "",
            analyze_date: ""
          }, true)
        ]})
      })
    }

    getEntry = (data = null, header = false, index = 0) => {
      // if not set data default will be 'null'
      // if not set header default will be 'false'
      if (data == null) {
        data = {
          meter_number: "",
          serial_number: "",
          lot_strip: "",
          // code_item_number_typeOne: "",
          value_item_number_typeOne: "",
          // code_item_number_typeTwo: "" ,
          value_item_number_typeTwo: "",
          receive_date: "",
          analyze_date: ""
        }
      }
      if (header) {
        return (
          <div>
                <Row>
                  <Col xs="12" sm="2" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    <AvGroup>
                      <Label for="meter_number" style={{ color: "#3d5afe" }}>Meter number. <br/>(หมายเลขเครื่อง)</Label>
                        <AvInput
                          style={{ backgroundColor: "#FFFFFF" }}
                          id="meter_number[0]"
                          name="meter_number[0]"
                          onChange={this.handleInputChangeTwo}
                          type="text"
                          value={data.meter_number}
                          disabled
                        />
                    </AvGroup>
                    </Col>
                    <Col xs="12" sm="2" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    <AvGroup>
                      <Label for="serial_number" style={{ color: "#3d5afe" }}>Serial number. <br/><br/></Label>
                        <AvInput
                          style={{ backgroundColor: "#EEEEEE" }}
                          id="serial_number[0]"
                          name="serial_number[0]"
                          onChange={this.handleInputChangeTwo}
                          type="text"
                          value={data.serial_number}
                          required
                        />
                        <AvFeedback>Please enter a serial number. <br/>(กรุณาระบุ Serial number.)</AvFeedback>
                    </AvGroup>
                    </Col>
                    <Col xs="12" sm="2" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    <AvGroup>
                      <Label for="lot_strip" style={{color: "#3d5afe"}}>Lot Strip. <br/><br/></Label>
                        <AvInput
                         style={{ backgroundColor: "#EEEEEE" }}
                          id="lot_strip[0]"
                          name="lot_strip[0]"
                          onChange={this.handleInputChangeTwo}
                          type="text"
                          value={data.lot_strip}
                          required
                        />
                        <AvFeedback>Please enter a lot strip. <br/>(กรุณาระบุ Lot Strip)</AvFeedback>
                    </AvGroup>
                    </Col>
                    <Col xs="12" sm="1" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    <Label style={{ color: "#3d5afe" }}>หมายเลขวัสดุทดสอบ {this.data[0].PT_item_number_typeOne}</Label>
                        <Row>
                        {/* <Col xs="12" sm="6" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <AvGroup>
                          <AvInput
                           style={{ backgroundColor: "#EEEEEE" }}
                            id="code_item_number_typeOne[0]"
                            name="code_item_number_typeOne[0]"
                            onChange={this.handleInputChangeTwo}
                            type="text"
                            placeholder="ลำดับ"
                            minLength="4"
                            maxLength="4"
                            value={data.code_item_number_typeOne}
                            required
                          />
                          <AvFeedback>Please enter a order invalid. <br/>(กรุณาระบุลำดับให้ถูกต้อง)</AvFeedback>
                          </AvGroup>
                        </Col> */}
                        <Col xs="12" sm="12" style={{ fontSize: 2 }}>
                        <AvGroup>
                          <AvInput
                            style={{ fontSize: 13,  backgroundColor: "#EEEEEE" }}
                            id="value_item_number_typeOne[0]"
                            name="value_item_number_typeOne[0]"
                            onChange={this.handleInputChangeTwo}
                            type="number"
                            placeholder="ผลวิเคราะห์"
                            value={data.value_item_number_typeOne}
                            min={1}
                            required
                          />
                          <AvFeedback style={{ fontSize: 11 }}>Please enter a analyze value. <br/>(กรุณาระบุผลวิเคราะห์)</AvFeedback>
                          </AvGroup>
                        </Col>
                        </Row>
                    </Col>
                    <Col xs="12" sm="1" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    <Label style={{color: "#3d5afe"}}>หมายเลขวัสดุทดสอบ {this.data[0].PT_item_number_typeTwo}</Label>
                      <Row>
                      {/* <Col xs="12" sm="6" style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <AvGroup>
                        <AvInput
                         style={{ backgroundColor: "#EEEEEE" }}
                          id="code_item_number_typeTwo[0]"
                          name="code_item_number_typeTwo[0]"
                          onChange={this.handleInputChangeTwo}
                          type="text"
                          placeholder="ลำดับ"
                          minLength="4"
                          value={data.code_item_number_typeTwo}
                          maxLength="4"
                          required
                        />
                        <AvFeedback>Please enter a order invalid. <br/>(กรุณาระบุลำดับ)</AvFeedback>
                        </AvGroup>
                        </Col> */}
                        <Col xs="12" sm="12" style={{ fontSize: 2 }}>
                        <AvGroup>
                        <AvInput
                         style={{ fontSize: 13,  backgroundColor: "#EEEEEE" }}
                          id=" value_item_number_typeTwo[0]"
                          name="value_item_number_typeTwo[0]"
                          onChange={this.handleInputChangeTwo}
                          type="number"
                          placeholder="ผลวิเคราะห์"
                          value={data.value_item_number_typeTwo}
                          min={1}
                          required
                        />
                        <AvFeedback style={{ fontSize: 11 }}>Please enter a analyze value. <br/>(กรุณาระบุผลวิเคราะห์)</AvFeedback>
                        </AvGroup>
                    </Col>
                    </Row>
                    </Col>
                    <Col xs="12" sm="3" >
                    <AvGroup>
                    <Row>
                      <Col xs="12" sm="6" style={{ paddingLeft: 0, paddingRight: 5 }}>
                      <Label for="receive_date" style={{color: "#3d5afe"}}>Receive date. <br/>(วันที่ได้รับ)</Label>
                        <AvInput
                         
                          style={{ fontSize: 15,backgroundColor: "#EEEEEE" }}
                          id="receive_date[0]"
                          name="receive_date[0]"
                          onChange={this.handleInputChangeTwo}
                          value={data.receive_date}
                          type="date"
                        />
                    </Col>
                      <Col xs="12" sm="6" style={{ paddingLeft: 0, paddingRight: 0 }}>
                      <Label for="analyze_date" style={{color: "#3d5afe"}}>Analyze date. <br/>(วันตรวจวิเคราะห์)</Label>
                        <AvInput
                         style={{ fontSize: 15,backgroundColor: "#EEEEEE" }}
                          id="analyze_date[0]"
                          name="analyze_date[0]"
                          onChange={this.handleInputChangeTwo}
                          type="date"
                          value={data.analyze_date}
                        />
                        </Col>
                        </Row>
                    </AvGroup>
                    </Col>
                  </Row>
          </div>
        );
      } else {
        return (
          <div>
                <Row>
                  <Col xs="12" sm="2" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    <AvGroup>
                        <AvInput
                        style={{ backgroundColor: "#FFFFFF" }}
                          id={"meter_number["+index+"]"}
                          name={"meter_number["+index+"]"}
                          onChange={this.handleInputChangeTwo}
                          type="text"
                          value={data.meter_number}
                          disabled
                        />
                    </AvGroup>
                    </Col>
                    <Col xs="12" sm="2" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    <AvGroup>
                        <AvInput
                          style={{ backgroundColor: "#EEEEEE" }}
                          id={"serial_number["+index+"]"}
                          name={"serial_number["+index+"]"}
                          onChange={this.handleInputChangeTwo}
                          type="text"
                          value={data.serial_number}
                          required
                        />
                        <AvFeedback>Please enter a serial number. <br/>(กรุณาระบุ Serial number.)</AvFeedback>
                    </AvGroup>
                    </Col>
                    <Col xs="12" sm="2" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    <AvGroup>
                        <AvInput
                        style={{ backgroundColor: "#EEEEEE" }}
                          id={"lot_strip["+index+"]"}
                          name={"lot_strip["+index+"]"}
                          onChange={this.handleInputChangeTwo}
                          type="text"
                          value={data.lot_strip}
                          required
                        />
                        <AvFeedback>Please enter a lot strip. <br/>(กรุณาระบุ Lot Strip)</AvFeedback>
                    </AvGroup>
                    </Col>
                    <Col xs="12" sm="1" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    
                        <Row>
                        {/* <Col xs="12" sm="6" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <AvGroup>
                          <AvInput
                          style={{ backgroundColor: "#EEEEEE" }}
                            id={"code_item_number_typeOne["+index+"]"}
                            name={"code_item_number_typeOne["+index+"]"}
                            onChange={this.handleInputChangeTwo}
                            type="text"
                            placeholder="ลำดับ"
                            minLength="4"
                            maxLength="4"
                            value={data.code_item_number_typeOne}
                            required
                          />
                          <AvFeedback>Please enter a order invalid. <br/>(กรุณาระบุลำดับให้ถูกต้อง)</AvFeedback>
                          </AvGroup>
                        </Col> */}
                        <Col xs="12" sm="12" style={{ fontSize: 2 }}>
                        <AvGroup>
                          <AvInput
                            style={{ fontSize: 13, backgroundColor: "#EEEEEE" }}
                            id={"value_item_number_typeOne["+index+"]"}
                            name={"value_item_number_typeOne["+index+"]"}
                            onChange={this.handleInputChangeTwo}
                            type="number"
                            placeholder="ผลวิเคราะห์"
                            value={data.value_item_number_typeOne}
                            min={1}
                            required
                          />
                          <AvFeedback style={{ fontSize: 11 }}>Please enter a analyze value. <br/>(กรุณาระบุผลวิเคราะห์)</AvFeedback>
                          </AvGroup>
                        </Col>
                        </Row>
                    </Col>
                    <Col xs="12" sm="1" style={{ paddingLeft: 0, paddingRight: 5 }}>
                    
                      <Row>
                      {/* <Col xs="12" sm="6" style={{ paddingLeft: 0, paddingRight: 5 }}>
                      <AvGroup>
                        <AvInput
                        style={{ fontSize: 14, backgroundColor: "#EEEEEE" }}
                          id={"code_item_number_typeTwo["+index+"]"}
                          name={"code_item_number_typeTwo["+index+"]"}
                          onChange={this.handleInputChangeTwo}
                          type="text"
                          placeholder="ลำดับ"
                          minLength="4"
                          value={data.code_item_number_typeTwo}
                          maxLength="4"
                          required
                        />
                        <AvFeedback>Please enter a order invalid. <br/>(กรุณาระบุลำดับ)</AvFeedback>
                        </AvGroup>
                        </Col> */}
                        <Col xs="12" sm="12" style={{ fontSize: 2 }}>
                        <AvGroup>
                        <AvInput
                        
                          style={{ fontSize: 13, backgroundColor: "#EEEEEE" }}
                          id={"value_item_number_typeTwo["+index+"]"}
                          name={"value_item_number_typeTwo["+index+"]"}
                          onChange={this.handleInputChangeTwo}
                          type="number"
                          placeholder="ผลวิเคราะห์"
                          value={data.value_item_number_typeTwo}
                          min={1}
                          required
                        />
                        <AvFeedback style={{ fontSize: 11 }}>Please enter a analyze value. <br/>(กรุณาระบุผลวิเคราะห์)</AvFeedback>
                        </AvGroup>
                    </Col>
                    </Row>
                    </Col>
                    <Col xs="12" sm="3" >
                    <AvGroup>
                    <Row>
                      <Col xs="12" sm="6" style={{ paddingLeft: 0, paddingRight: 5 }}>
                      
                        <AvInput
                          style={{ fontSize: 15, backgroundColor: "#EEEEEE" }}
                          id={"receive_date["+index+"]"}
                          name={"receive_date["+index+"]"}
                          onChange={this.handleInputChangeTwo}
                          value={data.receive_date}
                          type="date"
                        />
                    </Col>
                      <Col xs="12" sm="6" style={{ paddingLeft: 0, paddingRight: 0 }}>
                    
                        <AvInput
                          style={{ fontSize: 15, backgroundColor: "#EEEEEE" }}
                          id={"analyze_date["+index+"]"}
                          name={"analyze_date["+index+"]"}
                          onChange={this.handleInputChangeTwo}
                          type="date"
                          value={data.analyze_date}
                        />
                        </Col>
                        </Row>
                    </AvGroup>
                    </Col>
                  </Row>
          </div>
        );
      }
    }

    clearAlertTimeout() {
      if (this.alertTimeout !== null) {
        clearTimeout(this.alertTimeout);
      }
    }

    handleInputChangeTwo(e){
      console.log(e.target.value);
    }

    handleSelectMeterBrand(e){
      if (e.target.value === "ไม่ระบุ"){
        document.getElementById("Err_meter_brand").innerHTML = "Please enter a meter brand. (กรุณาระบุยี่ห้อเครื่อง)"
      }else{
        document.getElementById("Err_meter_brand").innerHTML = ""
      }

      if (e.target.value === "Other") {
        this.state.otherMeterBrandDisabled = false,
        this.state.constRequired = true
      }else{
        this.state.otherMeterBrandDisabled = true,
        this.state.constRequired = false,
        this.state.step2Data.other_meter_brand = "",
        this.setState({
          other_meter_brand: ""
        });
      }

      this.setState({
        [e.currentTarget.id]: e.target.value
      });
    }

    handleInputChangeMeterBrandOther(e){
      this.setState({
        [e.currentTarget.id]: e.target.value,
      });
    }

    render(){
      let getSteps=()=>{
          return ['กรุณากรอกข้อมูลให้ครบถ้วน', 'กรุณาตรวจสอบความถูกต้อง', 'ส่งข้อมูลเรียบร้อยแล้ว'];
      }

      let getStepContent=(stepIndex,handleNext,handleBack,handleReset)=>{
        switch (stepIndex) {
          case 0:
            return <div>
              {
                this.state.bgForm.map(values =>
                  <AvForm onValidSubmit={this.sendDataEntry} style={{ fontFamily: 'Kanit' }}>
                    <GridContainer >
                      <GridItem xs={12} sm={12} md={6} style={{ marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>
                        <AvGroup>
                          <Label for="topic_name" style={{color: "#3d5afe"}}>Program name. (ชื่อหัวข้อโปรแกรม)</Label>
                          <br/>
                          <Label for="topic_name" style={{color: "#212121", fontSize: 18}}>{values.topic_name}</Label>
                            <AvInput
                              id="_id"
                              name="_id"
                              type="hidden"
                              value={user._id}
                            />
                            <AvInput
                              id="department_name"
                              name="department_name"
                              type="hidden"
                              value={user.department_name}
                            />
                            <AvInput
                              id="topic_name"
                              name="topic_name"
                              type="hidden"
                              value={values.topic_name}
                            />
                        </AvGroup>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>
                        <AvGroup>
                          <Label for="blood_glucose_member_id" style={{color: "#3d5afe"}}>Member id. (รหัสผู้รับบริการ)</Label>
                          <br/>
                          <Label for="topic_name" style={{color: "#212121", fontSize: 18}}>{user.blood_glucose_member_id}</Label>
                            <AvInput
                              id="blood_glucose_member_id"
                              name="blood_glucose_member_id"
                              type="hidden"
                              value={user.blood_glucose_member_id}
                            />
                        </AvGroup>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>
                        <AvGroup >
                          <Label for="meter_brand" style={{color: "#3d5afe"}}>Meter brand. (ยี่ห้อเครื่อง)</Label>
                            <AvField style={{ backgroundColor: "#EEEEEE" }} type="select" value={this.state.step2Data.meter_brand} id="meter_brand" name="meter_brand" onChange={this.handleSelectMeterBrand} disabled={this.state.meterBrandDisabled}>
                              <option>ไม่ระบุ</option>
                              <option>Accucheck Performa</option>
                              <option>Accucheck Instant</option>
                              <option>Advanced on call</option>
                              <option>Check glod</option>
                              <option>Code free</option>
                              <option>Gluconavii</option>
                              <option>Other</option>
                            </AvField >
                            <font size="2" id="Err_meter_brand" color="red"></font>
                        </AvGroup>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>
                        <AvGroup>
                          <Label for="other_meter_brand" style={{color: "#3d5afe"}} >Meter brand other. (ยี่ห้อ/รุ่น/เครื่องอื่นๆ)</Label>
                          {
                            (this.state.step2Data.other_meter_brand) ?
                            <AvInput
                            style={{ backgroundColor: "#EEEEEE" }}
                              id="other_meter_brand"
                              name="other_meter_brand"
                              onChange={this.handleInputChangeMeterBrandOther}
                              required={this.state.constRequired}
                              type="text"
                              disabled={this.state.otherMeterBrandDisabled}
                              value={this.state.step2Data.other_meter_brand}
                            />
                            
                            :
                            <AvInput
                            style={{ backgroundColor: "#EEEEEE" }}
                              id="other_meter_brand"
                              name="other_meter_brand"
                              onChange={this.handleInputChangeMeterBrandOther}
                              required={this.state.constRequired}
                              type="text"
                              disabled={this.state.otherMeterBrandDisabled}
                              value={this.state.other_meter_brand}
                            />
                            
                          }
                            <AvFeedback>Please enter a meter brand other. (กรุณาระบุ ยี่ห้อ/รุ่น/เครื่องอื่นๆ)</AvFeedback>
                        </AvGroup>
                      </GridItem>
                      
                    </GridContainer>
                    <GridContainer style={{paddingTop: 30, textAlign: 'center', }}>
                      <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <CardHeader plain color="warning" style={{ padding: 5 }}>
                          <h4 className={classes.cardTitleWhite}>จำนวนเครื่องที่ลงทะเบียน {user.blood_glucose_meter_qty} เครื่อง</h4>
                        </CardHeader>
                      </GridItem>
                    </GridContainer>
                    <br/>
                      {this.state.mainDataEntry}
      
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <ButtonMat onClick={this.deleteRowByMeterNumber} variant="extendedFab" aria-label="Delete" 
                          style={{ float: 'right', fontFamily: 'Kanit', backgroundColor: "#f50057", width: 110, height: 5 }} >
                            <Icon>
                              remove_circle_outline
                            </Icon>
                          ลบเครื่อง
                        </ButtonMat>
                        <ButtonMat onClick={this.addRowByMeterNumber} variant="extendedFab" aria-label="Delete"
                          style={{ float: 'right', fontFamily: 'Kanit', backgroundColor: "#00e676", marginRight: 10, width: 120, height: 5}} >
                            <Icon>
                              add_circle_outline
                            </Icon>
                          เพิ่มเครื่อง
                        </ButtonMat>
                      </GridItem>
                    </GridContainer>
                    
                    <GridContainer style={{paddingTop: 30}}>
                      <GridItem xs={12} sm={12} md={4} style={{marginLeft: "auto", marginRight: "auto" }}>
                        <AvGroup>
                          <Label for="auditor" style={{color: "#3d5afe"}}>Analyzed by. (ผู้ทำการตรวจวิเคราะห์)</Label>
                            <AvInput
                            style={{ backgroundColor: "#EEEEEE" }}
                              id="auditor"
                              name="auditor"
                              onChange={this.handleInputChange}
                              value={this.state.step2Data.auditor}
                              type="text"
                              required
                            />
                            <AvFeedback>Please enter a name. (กรุณาระบุชื่อ)</AvFeedback>
                        </AvGroup>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <AvGroup>
                          <Label for="assessor" style={{color: "#3d5afe"}}>Approved by. (ผู้ตรวจสอบ/หัวหน้าห้องปฏิบัติการ)</Label>
                            <AvInput
                            style={{ backgroundColor: "#EEEEEE" }}
                              id="assessor"
                              name="assessor"
                              onChange={this.handleInputChange}
                              value={this.state.step2Data.assessor}
                              type="text"
                              required
                            />
                            <AvFeedback>Please enter a approved by. (กรุณาระบุชื่อผู้ตรวจสอบ/หัวหน้าห้องปฏิบัติการ)</AvFeedback>
                        </AvGroup>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4} style={{marginLeft: "auto", marginRight: "auto" }}>
                        <AvGroup>
                          <Label for="auditor_appointment" style={{color: "#3d5afe"}}>position. (ตำแหน่งผู้ทำการตรวจวิเคราะห์)</Label>
                            <AvInput
                            style={{ backgroundColor: "#EEEEEE" }}
                              id="auditor_appointment"
                              name="auditor_appointment"
                              onChange={this.handleInputChange}
                              value={this.state.step2Data.auditor_appointment}
                              type="text"
                              required
                            />
                            <AvFeedback>Please enter a position. (กรุณาระบุตำแหน่งผู้ทำการตรวจวิเคราะห์)</AvFeedback>
                        </AvGroup>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <AvGroup>
                          <Label for="assessor_appointment" style={{color: "#3d5afe"}}>position. (ตำแหน่งผู้ตรวจสอบ/หัวหน้าห้อง)</Label>
                            <AvInput
                            style={{ backgroundColor: "#EEEEEE" }}
                              id="assessor_appointment"
                              name="assessor_appointment"
                              onChange={this.handleInputChange}
                              value={this.state.step2Data.assessor_appointment}
                              type="text"
                              required
                            />
                            <AvFeedback>Please enter a position. (กรุณาระบุตำแหน่งผู้ตรวจสอบ/หัวหน้าห้อง)</AvFeedback>
                        </AvGroup>
                      </GridItem>
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4} style={{marginLeft: "auto", marginRight: "auto" }}>
                        {/* <AvGroup>
                          <Label for="auditor_date" style={{color: "#3d5afe"}}>Audit date. (วันที่ตรวจวิเคราะห์)</Label>
                          <AvInput
                              id="auditor_date"
                              name="auditor_date"
                              onChange={this.handleInputChange}
                              value={this.state.step2Data.auditor_date}
                              type="date"
                              required
                            />
                            <AvFeedback>Please enter a audit date. (กรุณาระบุวันที่ตรวจวิเคราะห์)</AvFeedback>
                        </AvGroup> */}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
                        <AvGroup>
                          <Label for="assessor_date" style={{color: "#3d5afe"}}>Approved date. (วันที่ตรวจสอบ)</Label>
                          <AvInput
                          style={{ backgroundColor: "#EEEEEE" }}
                              id="assessor_date"
                              name="assessor_date"
                              onChange={this.handleInputChange}
                              // value={this.state.step2Data.assessor_date}
                              value={console.log("form p1 ",this.state.step2Data.assessor_date)}
                              type="date"
                              required
                            />
                            <AvFeedback>Please enter a approved date. (กรุณาระบุวันที่ตรวจสอบ)</AvFeedback>
                        </AvGroup>
                      </GridItem>
                    </GridContainer>
                              
                      <ModalFooter>
                        <Button color="primary" type="submit" >ต่อไป</Button>
                          <div>
                            {
                              this.state.activeStep === steps.length ? (
                              <div>
                                <Typography className={classes.instructions}>All steps completed</Typography>
                                <Button onClick={handleReset}>Reset</Button>
                              </div>
                              ) : (
                                    <div>
                                      <div>
                                      </div>
                                    </div>
                                  )
                            }
                          </div>
                      </ModalFooter>
                  </AvForm>
                )}
              </div>;
            case 1:
              return <div style={{ fontFamily: 'Kanit' }}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>
                    <FormGroup>
                      <Label style={{color: "#3d5afe"}}>Meter brand. (ยี่ห้อเครื่อง)</Label>
                      {
                        (this.state.step2Data.meter_brand === "Other") ? <Input value={this.state.step2Data.other_meter_brand} disabled />
                          : <Input value={this.state.step2Data.meter_brand} disabled />
                      }
                    </FormGroup>
                  </GridItem>
                </GridContainer>

                <Table className={classes.table} style={{ fontFamily: 'Kanit', color: "#2979ff" }}>
                  <TableHead >
                    <TableRow >
                      <TableCell style={{ fontSize: 15, color: '#2979ff', textAlign: 'center' }} rowSpan={2}>Meter number. <br/>(หมายเลขเครื่อง)</TableCell>
                      <TableCell style={{ fontSize: 15, color: '#2979ff', textAlign: 'center' }} numeric rowSpan={2}>Serial number</TableCell>
                      <TableCell style={{ fontSize: 15, color: '#2979ff', textAlign: 'center' }} numeric rowSpan={2}>Lot. Strip</TableCell>
                      <TableCell style={{ fontSize: 15, textAlign: 'center', color: '#2979ff' }} numeric colSpan={2}>หมายเลขวัสดุทดสอบความชำนาญ</TableCell>
                      <TableCell style={{ fontSize: 15, color: '#2979ff', textAlign: 'center' }} numeric rowSpan={2}>Receive date. <br/>(วันที่ได้รับ)</TableCell>
                      <TableCell style={{ fontSize: 15, color: '#2979ff', textAlign: 'center' }} numeric rowSpan={2}>Analyze date. <br/>(วันที่ตรวจวิเคราะห์)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ fontSize: 15, textAlign: 'center', color: '#2979ff' }} numeric >{this.state.bgForm[0].PT_item_number_typeOne}</TableCell>
                      <TableCell style={{ fontSize: 15, textAlign: 'center', color: '#2979ff' }} numeric >{this.state.bgForm[0].PT_item_number_typeTwo}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      this.state.step2DataTable.map(row => {
                        return (
                          <TableRow key={row.id} className={classes.row}>
                            <TableCell component="th" scope="row">
                              {row.meter_number}
                            </TableCell>
                            <TableCell >{row.serial_number}</TableCell>
                            <TableCell >{row.lot_strip}</TableCell>
                            {/* <TableCell >{row.code_item_number_typeOne}</TableCell> */}
                            <TableCell >{row.value_item_number_typeOne}</TableCell>
                            {/* <TableCell >{row.code_item_number_typeTwo}</TableCell> */}
                            <TableCell >{row.value_item_number_typeTwo}</TableCell>
                            <TableCell >{row.receive_date}</TableCell>
                            <TableCell >{row.analyze_date}</TableCell>
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Table>

                <GridContainer style={{paddingTop: 30}}>
                  <GridItem xs={12} sm={12} md={4} style={{marginLeft: "auto", marginRight: "auto" }}>
                    <FormGroup>
                      <Label for="auditor" style={{color: "#3d5afe"}}>Analyzed by. (ผู้ทำการตรวจวิเคราะห์)</Label>
                        <Input value={this.state.step2Data.auditor} disabled style={{ marginBottom: 10 }} />
                      <Label for="auditor_appointment" style={{color: "#3d5afe"}}>position. (ตำแหน่งผู้ทำการตรวจวิเคราะห์)</Label>
                        <Input value={this.state.step2Data.auditor_appointment} disabled style={{ marginBottom: 10 }}/>
                      {/* <Label for="analyze_date" style={{color: "#3d5afe"}}>Auditor date. (วันที่ตรวจวิเคราะห์)</Label>
                        <Input value={this.state.step2Data.analyze_date} disabled /> */}
                    </FormGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{marginLeft: "auto", marginRight: "auto" }}>
                    <FormGroup>
                      <Label for="assessor" style={{color: "#3d5afe"}}>Approved by. (ผู้ตรวจสอบ/หัวหน้าห้องปฏิบัติการ)</Label>
                        <Input value={this.state.step2Data.assessor} disabled style={{ marginBottom: 10 }} />
                      <Label for="assessor_appointment" style={{color: "#3d5afe"}}>position. (ตำแหน่งผู้ตรวจสอบ/หัวหน้าห้อง)</Label>
                        <Input value={this.state.step2Data.assessor_appointment} disabled style={{ marginBottom: 10 }}/>
                      <Label for="assessor_date" style={{color: "#3d5afe"}}>approved date. (วันที่ตรวจสอบ)</Label>
                     
                     {/* <Input value={this.state.step2Data.assessor_date} disabled /> */}
                        <Input value={console.log("form p2 ",this.state.step2Data.assessor_date)} disabled />
                    </FormGroup>
                  </GridItem>
                </GridContainer>
                <ModalFooter>
                  <Button color="primary" disabled={activeStep === 0} onClick={handleBack} className={classes.backButton} >
                    แก้ไข
                  </Button>
                  <Button color="danger" onClick={this.sendDataEntry}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'ยืนยัน'}
                  </Button>
                  </ModalFooter>
              </div>;
            case 2:
              return <div>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <ButtonMat onClick={() => PDFprint(this.state.user._id) } variant="extendedFab" aria-label="Delete"
                      style={{ fontFamily: 'Kanit', backgroundColor: "#5393ff" }} >
                        PDF ดาวน์โหลด <Icon style={{ marginLeft: 10 }} >cloud_download</Icon>
                    </ButtonMat>
                  </GridItem>
                </GridContainer>
              </div>;
            default:
              return 'Uknown stepIndex';
          }
        }

    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, messageRowMost, messageRowMinimum, messageMeterBrand } = this.state;

    let handleNext = () => {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    };
  
    let handleBack = () => {
      const { mainDataEntry } = this.state;
      let data = [];
      for(let i = 0; i< mainDataEntry.length; i++) {
        if (i == 0) {
          data.push(
            this.getEntry({
              meter_number: this.state.step2DataTable[i].meter_number,
                serial_number: this.state.step2DataTable[i].serial_number,
                lot_strip: this.state.step2DataTable[i].lot_strip,
                // code_item_number_typeOne: this.state.step2DataTable[i].code_item_number_typeOne,
                value_item_number_typeOne: this.state.step2DataTable[i].value_item_number_typeOne,
                // code_item_number_typeTwo: this.state.step2DataTable[i].code_item_number_typeTwo ,
                value_item_number_typeTwo: this.state.step2DataTable[i].value_item_number_typeTwo,
                receive_date: this.state.step2DataTable[i].receive_date,
                analyze_date: this.state.step2DataTable[i].analyze_date
            }, true)
          )
        } else {
          data.push(
            this.getEntry({
              meter_number: this.state.step2DataTable[i].meter_number,
                serial_number: this.state.step2DataTable[i].serial_number,
                lot_strip: this.state.step2DataTable[i].lot_strip,
                // code_item_number_typeOne: this.state.step2DataTable[i].code_item_number_typeOne,
                value_item_number_typeOne: this.state.step2DataTable[i].value_item_number_typeOne,
                // code_item_number_typeTwo: this.state.step2DataTable[i].code_item_number_typeTwo ,
                value_item_number_typeTwo: this.state.step2DataTable[i].value_item_number_typeTwo,
                receive_date: this.state.step2DataTable[i].receive_date,
                analyze_date: this.state.step2DataTable[i].analyze_date
            }, false,i)
          )
        }
        
      }
      this.setState(state => ({
        activeStep: state.activeStep - 1,
        mainDataEntry: data
      }));
    };

    let handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };

    return (
      <div> 
        { 
          
          this.state.user.sentBgResult === true ? 
          <div >
            <Card >
          <CardHeader color="rose" >
            <Row >
              <Col>
                <h4 className={styles.cardTitleWhite}>ส่งผลการวัดระดับน้ำตาล</h4>
              </Col>
              <Stepper style={{ backgroundColor: '#ed4b82', height: 30}} activeStep={2}>
              {
                steps.map(label => {
                  return (
                    <Step key={label} >
                      <StepLabel >{label}</StepLabel>
                    </Step>
                  );
                })
              }
              </Stepper>
            </Row>
          </CardHeader>
          <CardBody >
            <Typography className={classes.instructions}>{getStepContent(2,handleNext,handleBack,handleReset)}</Typography>
            <GridContainer>
            <GridItem xs={12} sm={12} md={8} style={{ marginLeft: "auto", marginRight: "auto", textAlign: 'center' }}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={styles.cardTitleWhite}>คำชี้แจง</h4>
                </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        {
                          this.state.bgForm.map(values => {
                            return <CardBody>
                              <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: 'Left' }}>
                              {values.explanation.split(/(?:\r\n|\r|\n)/g).map(obj => {
                                return <p>{obj}</p>
                              })}
                              </div>
                              หากมีข้อซักถามประการใด กรุณาติดต่อ {values.phone} หรือ อีเมล: {values.email}<br/>
                              Line: {values.line} Facebook: {values.facebook}<br/>
                              <Label style={{ color: "#212121", fontSize: 14, fontWeight: 'bold' }}> {values.company_name}ขอขอบคุณที่ไว้วางใจเข้าร่วมโปรแกรมกับเรา</Label>
                            </CardBody>
                          })
                        } 
                      </GridItem>
                    </GridContainer>
                  </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          </CardBody>
        </Card>
          </div>
          : <div>
        { messageRowMost ? 
          <Snackbar
            place="bl"
            color="danger"
            icon={Error}
            message={messageRowMost}
            open={this.state.bl}
            closeNotification={() => this.setState({ bl: false, messageRowMinimum: "", messageRowMost: "", messageMeterBrand: "" })}
            close
          />
          : null
        }

        {
          messageRowMinimum ?
          <Snackbar
            place="bl"
            color="danger"
            icon={Error}
            message={messageRowMinimum}
            open={this.state.bl}
            closeNotification={() => this.setState({ bl: false, messageRowMinimum: "", messageRowMost: "", messageMeterBrand: "" })}
            close
          />
          : null
        }

        {
          messageMeterBrand?
          <Snackbar
            place="bl"
            color="warning"
            icon={Error}
            message={messageMeterBrand}
            open={this.state.bl}
            closeNotification={() => this.setState({ bl: false, messageRowMinimum: "", messageRowMost: "", messageMeterBrand: "" })}
            close
          />
          : null
        }
        
        <Card>
          <CardHeader color="rose" >
            <Row >
              <Col>
                <h4 className={styles.cardTitleWhite}>ส่งผลการวัดระดับน้ำตาล</h4>
              </Col>
              <Stepper style={{ backgroundColor: '#ed4b82', height: 30}} activeStep={activeStep}>
              {
                steps.map(label => {
                  return (
                    <Step key={label} >
                      <StepLabel style={{fontFamily: 'kanit'}}>{label}</StepLabel>
                    </Step>
                  );
                })
              }
              </Stepper>
            </Row>
          </CardHeader>
          <CardBody >
            <Typography className={classes.instructions}>{getStepContent(activeStep,handleNext,handleBack,handleReset)}</Typography>
          </CardBody>
        </Card>
          </div>
          
        }
      </div>
    );
  }
}

BgDataEntry.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BgDataEntry);