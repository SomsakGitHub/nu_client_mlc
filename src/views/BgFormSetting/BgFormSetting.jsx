import React from "react";
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Label, ModalFooter, Row, Col } from 'reactstrap';
// @material-ui/core components
// import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import ModalAddBgForm from "components/Modal/ModalAddBgForm.jsx";
import ModalEditBgForm from "components/Modal/ModalEditBgForm.jsx";
//utils************************************************************************************************
import { fetchGetSettingBgForm } from '../../utils/bgForm';

const styles = {
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

class BgFormSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgForm: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e){
    this.setState({
      [e.currentTarget.id]: e.target.value
    });
  }

  componentDidMount(){
    fetchGetSettingBgForm().then(data => {this.setState({ bgForm: data });})
  }

  formatDate(){
    let dateOriginal = this.state.bgForm.map(values => {
      return values.issue_date
    })

    console.log("dateOriginal ",dateOriginal[0])

    // const formatDate1 = await new Date(dateOriginal).getTime()
    const formatDate1 = new Date(dateOriginal[0])
    console.log("formatDate1 ",formatDate1)

    // console.log(new Intl.DateTimeFormat('en-GB', {year: 'numeric', day: '2-digit', month: '2-digit'}).format(formatDate1));

    const formatDate2 = formatDate1.toLocaleDateString()
    console.log("formatDate2 ",formatDate2)

    return formatDate2
  }

  render(){

    const date = this.formatDate();

    return (
      <div>
        {this.state.bgForm == "" ? 
        <Card >
          <CardHeader color="rose" >
            <Row >
              <Col>
                <h4 className={styles.cardTitleWhite}>แบบฟอร์มการตรวจวัดปริมาณน้ำตาลในเลือด</h4>
              </Col>
              <ModalAddBgForm/>
            </Row>
            </CardHeader>
            <CardBody>
            </CardBody>
        </Card>
        : 
        <div>
          {this.state.bgForm.map(values =>
            <Card>
              <CardHeader color="rose" >
              <Row >
                <Col>
                  <h4 className={styles.cardTitleWhite}>แบบฟอร์มการตรวจวัดปริมาณน้ำตาลในเลือด</h4>
                </Col>
                  <ModalEditBgForm  
                    DocumentName={values.document_name}
                    // IssueDate={values.issue_date}
                    IssueDate={values.issue_date}
                    No={values.no}
                    EditTimes={values.edit_times}
                    ToPicName={values.topic_name} 
                    PTItemNumberTypeOne={values.PT_item_number_typeOne}
                    PTItemNumberTypeTwo={values.PT_item_number_typeTwo}
                    FormName={values.form_name}
                    Email={values.email}
                    ClosingDay={values.closing_day}
                    Phone={values.phone}
                    Line={values.line}
                    Facebook={values.facebook}
                    CompanyName={values.company_name}
                    Explanation = {values.explanation}
                  />
              </Row>
              </CardHeader>
              <CardBody >
                <AvForm>
                  <GridContainer style={{ paddingTop: 50 }}>
                    <Label style={{ color: "#ff1744", marginLeft: "auto", marginRight: "auto" }}>********************************************************* Quality documents setting (ตั้งค่าเอกสารคุณภาพ) *********************************************************</Label>
                  </GridContainer>
                  <GridContainer>
                  <GridItem xs={12} sm={12} md={5} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="document_name" style={{color: "#3d5afe"}}>Document name (ชื่อเอกสาร)</Label>
                        <AvInput
                          id="document_name"
                          name="document_name"
                          disabled
                          type="text"
                          value={values.document_name}
                        />
                    </AvGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="form_name" style={{color: "#3d5afe"}}>Form name (ชื่อแบบฟอร์ม)</Label>
                        <AvInput
                          id="form_name"
                          name="form_name"
                          disabled
                          type="text"
                          value={values.form_name}
                        />
                    </AvGroup>
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="issue_date" style={{color: "#3d5afe"}}>Issued date. (วันที่ออกเอกสาร)</Label>
                        <AvInput
                          id="issue_date"
                          name="issue_date"
                          disabled
                          type="text"
                          value={date}
                        />
                    </AvGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="no" style={{color: "#3d5afe"}}>No. (ฉบับที่)</Label>
                        <AvInput
                          id="no"
                          name="no"
                          disabled
                          type="text"
                          value={values.no}
                        />
                    </AvGroup>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <AvGroup>
                      <Label for="edit_times" style={{color: "#3d5afe"}}>Edit number. (แก้ไขครั้งที่)</Label>
                        <AvInput
                          id="edit_times"
                          name="edit_times"
                          disabled
                          type="text"
                          value={values.edit_times}
                        />
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer style={{ paddingTop: 50 }}>
                    <Label style={{ color: "#ff1744", marginLeft: "auto", marginRight: "auto" }}>********************************************************* Content (เนื้อหา) *********************************************************</Label>
                </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="topic_name" style={{color: "#3d5afe"}}>Program name. (ชื่อหัวข้อโปรแกรม)</Label>
                          <AvInput
                            id="topic_name"
                            name="topic_name"
                            type="text"
                            value={values.topic_name}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="PT_item_number_typeOne" style={{color: "#3d5afe"}}>PT item number. <br/>(หมายเลขวัสดุทดสอบความชำนาญ)</Label>
                          <AvInput
                            id="PT_item_number_typeOne"
                            name="PT_item_number_typeOne"
                            type="text"
                            value={values.PT_item_number_typeOne}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="PT_item_number_typeTwo" style={{color: "#3d5afe"}}>PT item number. <br/>(หมายเลขวัสดุทดสอบความชำนาญ)</Label>
                          <AvInput
                            id="PT_item_number_typeTwo"
                            name="PT_item_number_typeTwo"
                            type="text"
                            value={values.PT_item_number_typeTwo}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                  </GridContainer>
                  <GridContainer style={{ paddingTop: 50 }}>
                    <Label style={{ color: "#ff1744", marginLeft: "auto", marginRight: "auto" }}>***************************************************************************** Note (หมายเหตุ) *****************************************************************************</Label>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                      <Label for="explanation" style={{color: "#3d5afe"}}>Add explanation. (เพิ่มคำชี้แจง)</Label>
                        <AvInput
                          id="explanation"
                          name="explanation"
                          disabled
                          type="textarea"
                          value={values.explanation}
                        />
                    </AvGroup>
                    </GridItem>
                    </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="email" style={{color: "#3d5afe"}}>E-mail program director. <br/>(อีเมลผู้รับผิดชอบโปรแกรม)</Label>
                          <AvInput
                            id="email"
                            name="email"
                            type="text"
                            value={values.email}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="closing_day" style={{ color: "#ff1744", fontSize: 18 }}>Closing date. (วันปิดรับผล)</Label>
                          <AvInput
                            id="closing_day"
                            name="closing_day"
                            type="text"
                            value={values.closing_day}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="phone" style={{color: "#3d5afe"}}>Phone number (หมายเลขโทรศัพท์)</Label>
                          <AvInput
                            id="phone"
                            name="phone"
                            type="text"
                            value={values.phone}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="line" style={{color: "#3d5afe"}}>Line id (รหัสไลน์)</Label>
                          <AvInput
                            id="line"
                            name="line"
                            type="text"
                            value={values.line}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="facebook" style={{color: "#3d5afe"}}>Facebook (เฟซบุ๊ก)</Label>
                          <AvInput
                            id="facebook"
                            name="facebook"
                            type="text"
                            value={values.facebook}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                      <AvGroup>
                        <Label for="company_name" style={{color: "#3d5afe"}}>Company name (ชื่อบริษัท)</Label>
                          <AvInput
                            id="company_name"
                            name="company_name"
                            type="text"
                            value={values.company_name}
                            disabled
                          />
                      </AvGroup>
                    </GridItem>
                  </GridContainer>
                  <ModalFooter>
                  </ModalFooter> 
                </AvForm>
              </CardBody>
            </Card>
          )}
        </div>
        }
      </div>
        );
  }
}

export default BgFormSetting;