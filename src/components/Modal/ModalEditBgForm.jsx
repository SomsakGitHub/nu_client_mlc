import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Modal, Label, ModalFooter } from 'reactstrap';
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from '@material-ui/core/Button';
// @material-ui/icons
import { Icon } from '@material-ui/core';

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

class ModalEditBgForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
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
//update*************************************************************************************
  update(e,values){
    // console.log("values ", values.issue_date);
    // console.log("valuess ", JSON.stringify(values.issue_date));
    // console.log(new Date(values.issue_date).getTime())
    values.issue_date = new Date(values.issue_date).getTime()
    console.log("values ", values.issue_date);
    // console.log("valuess ", JSON.stringify(values.issue_date));
    fetch('http://localhost:3001/api/settingProgramForm/update', {
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
          window.location.reload();
        }
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const defaultValues = {
            document_name: this.props.DocumentName,
            issue_date: this.props.IssueDate,
            no: this.props.No,
            edit_times: this.props.EditTimes,
            topic_name: this.props.ToPicName,
            PT_item_number_typeOne: this.props.PTItemNumberTypeOne,
            PT_item_number_typeTwo: this.props.PTItemNumberTypeTwo,
            form_name: this.props.FormName,
            email: this.props.Email,
            closing_day: this.props.ClosingDay,
            phone: this.props.Phone,
            line: this.props.Line,
            facebook: this.props.Facebook,
            company_name: this.props.CompanyName,
            explanation: this.props.Explanation
    }

    return (
      <div>
        <Button variant="extendedFab" aria-label="Delete" 
        style={{ fontFamily: 'Kanit', backgroundColor: "#ff9100", right: 10 }} onClick={this.toggle}>
                <Icon style={{marginRight: 5}}>
                  edit_icon
                </Icon>
                แก้ไขแบบฟอร์ม
        </Button>
        <Modal isOpen={this.state.modal} onClose={this.toggleModalClose} toggle={this.toggle} className={this.props.className} size="lg">
          <Card >
            <CardHeader style={{ backgroundColor: "#ff9100" }}>
            <Icon className="float-right">edit_icon</Icon>
             <h4 className={style.cardTitleWhite}>Form editting. (แก้ไขแบบฟอร์ม)</h4>
            </CardHeader>
            <CardBody >
            <AvForm onValidSubmit={this.update} model={defaultValues}>
              <GridContainer style={{ paddingTop: 20 }}>
                <Label style={{ color: "#ff1744", marginLeft: "auto", marginRight: "auto" }}>*************************** Quality documents setting. (ตั้งค่าเอกสารคุณภาพ) ***************************</Label>
              </GridContainer>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={5} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="document_name" style={{color: "#3d5afe"}}>Document name. (ชื่อเอกสาร)</Label>
                        <AvInput
                          id="document_name"
                          name="document_name"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.document_name}
                        />
                        <AvFeedback>Please enter a document name. (กรุณาระบุชื่อเอกสาร)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="form_name" style={{color: "#3d5afe"}}>Form name. (ชื่อแบบฟอร์ม)</Label>
                        <AvInput
                          id="form_name"
                          name="form_name"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.form_name}
                        />
                        <AvFeedback>Please enter a form name. (กรุณาระบุชื่อแบบฟอร์ม)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="issue_date" style={{color: "#3d5afe"}}>Issue date. (วันที่ออกเอกสาร)</Label>
                        <AvInput
                          id="issue_date"
                          name="issue_date"
                          onChange={this.handleInputChange}
                          required
                          type="date"
                          // value={defaultValues.issue_date}
                          value={console.log("issue_date ",defaultValues.issue_date)}
                        />
                        <AvFeedback>Please enter a issue date. <br/>(กรุณาระบุวันที่ออกเอกสาร)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="no" style={{color: "#3d5afe"}}>No. (ฉบับที่)</Label>
                        <AvInput
                          id="no"
                          name="no"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.no}
                        />
                        <AvFeedback>Please enter a no. <br/>(กรุณาระบุฉบับที่)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="edit_times" style={{color: "#3d5afe"}}>Edit times. (แก้ไขครั้งที่)</Label>
                        <AvInput
                          id="edit_times"
                          name="edit_times"
                          onChange={this.handleInputChange}
                          required
                          type="text"
                          value={this.edit_times}
                        />
                        <AvFeedback>Please enter a edit times. <br/>(กรุณาระบุแก้ไขครั้งที่)</AvFeedback>
                    </AvGroup>
                  </GridItem>
                </GridContainer>

              <GridContainer style={{ paddingTop: 20 }}>
                  <Label style={{ color: "#ff1744", marginLeft: "auto", marginRight: "auto" }}>*************************** Content. (เนื้อหา) ***************************</Label>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  <AvGroup>
                    <Label for="topic_name" style={{color: "#3d5afe"}}>Topic name. (ชื่อหัวข้อโปรแกรม)</Label>
                      <AvInput
                        id="topic_name"
                        name="topic_name"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.topic_name}
                      /> 
                      <AvFeedback>Please enter a topic name. (กรุณาระบุชื่อหัวข้อโปรแกรม)</AvFeedback>
                  </AvGroup>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                  <Label style={{ color: "#3d5afe" }}>PT item number. (หมายเลขวัสดุทดสอบความชำนาญ)</Label>
                </GridItem>
              </GridContainer>
              <GridContainer >
                <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <AvGroup > 
                      <AvInput
                        id="PT_item_number_typeOne"
                        name="PT_item_number_typeOne"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.PT_item_number_typeOne}
                      />
                      <AvFeedback>Please enter a pt item number. <br/>(กรุณาระบุหมายเลขวัสดุทดสอบความชำนาญ)</AvFeedback>
                  </AvGroup>
                </GridItem>
                <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto" }}>
                  <AvGroup>
                      <AvInput
                        id="PT_item_number_typeTwo"
                        name="PT_item_number_typeTwo"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.PT_item_number_typeTwo}
                      />
                      <AvFeedback>Please enter a pt item number. <br/>(กรุณาระบุหมายเลขวัสดุทดสอบความชำนาญ)</AvFeedback>
                  </AvGroup>
                </GridItem>
              </GridContainer>
              <GridContainer style={{ paddingTop: 20 }}>
                <Label style={{ color: "#ff1744", marginLeft: "auto", marginRight: "auto" }}>*************************** Note. (หมายเหตุ) ***************************</Label>
              </GridContainer>
              <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                      <Label for="explanation" style={{color: "#3d5afe"}}>Add explanation. (เพิ่มคำชี้แจง)</Label>
                        <AvInput
                          id="explanation"
                          name="explanation"
                          onChange={this.handleInputChange}
                          type="textarea"
                          value={this.explanation}
                        />
                    </AvGroup>
                    </GridItem>
                    </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  <AvGroup>
                    <Label for="email" style={{color: "#3d5afe"}}>e-mail. (อีเมลผู้รับผิดชอบโปรแกรม)</Label>
                      <AvInput
                        id="email"
                        name="email"
                        onChange={this.handleInputChange}
                        required
                        type="email"
                        value={this.email}
                        validate={{email: true}}
                        placeholder="someone@example.com"
                      />
                      <AvFeedback>Please enter a e-mail invalid. (กรุณาระบุอีเมลให้ถูกต้อง)</AvFeedback>
                  </AvGroup>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  <AvGroup>
                    <Label for="closing_day" style={{ color: "#ff1744", fontSize: 18 }}>Closing day. (วันปิดรับผล)</Label>
                      <AvInput
                        id="closing_day"
                        name="closing_day"
                        onChange={this.handleInputChange}
                        required
                        type="date"
                        value={this.closing_day}
                      />
                      <AvFeedback>Please enter a closing day invalid. (กรุณาระบุวันปิดรับผลให้ถูกต้อง)</AvFeedback>
                  </AvGroup>
                </GridItem>
              </GridContainer>
              <GridContainer style={{ marginLeft: "auto", marginRight: "auto" }}>
                <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  <AvGroup>
                    <Label for="phone" style={{color: "#3d5afe"}}>Phone. (หมายเลขโทรศัพท์)</Label>
                      <AvInput
                        id="phone"
                        name="phone"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.phone}
                      />
                      <AvFeedback>Please enter a phone. <br/>(กรุณาระบุหมายเลขโทรศัพท์)</AvFeedback>
                  </AvGroup>
                </GridItem>
                <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  <AvGroup>
                    <Label for="line" style={{color: "#3d5afe"}}>Line. (ไลน์)</Label>
                      <AvInput
                        id="line"
                        name="line"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.line}
                      />
                      <AvFeedback>Please enter a line. (กรุณาระบุไลน์)</AvFeedback>
                  </AvGroup>
                </GridItem>
                <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  <AvGroup>
                    <Label for="facebook" style={{color: "#3d5afe"}}>Facebook. (เฟซบุ๊ก)</Label>
                      <AvInput
                        id="facebook"
                        name="facebook"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.facebook}
                      />
                      <AvFeedback>Please enter a facebook. (กรุณาระบุเฟซบุ๊ก)</AvFeedback>
                  </AvGroup>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                  <AvGroup>
                    <Label for="company_name" style={{color: "#3d5afe"}}>Company name. (ชื่อบริษัท)</Label>
                      <AvInput
                        id="company_name"
                        name="company_name"
                        onChange={this.handleInputChange}
                        required
                        type="text"
                        value={this.company_name}
                      />
                      <AvFeedback>Please enter a company name. (กรุณาระบุชื่อบริษัท)</AvFeedback>
                  </AvGroup>
                </GridItem>
              </GridContainer>
                <ModalFooter>
                  <Button style={{ backgroundColor: "#ff1744", fontFamily: 'kanit',color: '#FAFAFA' }} variant="extendedFab" aria-label="Delete" type="submit" >บันทึก</Button>
                  <Button style={{ backgroundColor: "#757575", fontFamily: 'kanit',color: '#FAFAFA' }} variant="extendedFab" aria-label="Delete" onClick={this.toggle} >ยกเลิก</Button>
                </ModalFooter>
              </AvForm>
            </CardBody>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default ModalEditBgForm;