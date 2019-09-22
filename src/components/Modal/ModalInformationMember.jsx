import React from 'react';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Modal, Label, Button } from 'reactstrap';
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
// @material-ui/icons
import { Icon } from '@material-ui/core';
import ButtonMat from '@material-ui/core/Button';
//utils*********************************************************************************************************
import { PDFprint } from '../../utils/PDFprint';

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

class ModalInformationMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    const defaultValues = {
      partner: this.props.user.partner,
      department_name: this.props.user.department_name,
      username: this.props.user.username,
      password: this.props.user.password,
      _id: this.props.user._id,
      sentBgResult: this.props.user.sentBgResult
    }

    return (
      <div>
        <Button variant="fab" aria-label="Preview" color="warning" onClick={this.toggle}>
          <Icon >remove_red_eye</Icon>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Card >
            <CardHeader color="warning">
            <Icon className="float-right">remove_red_eye</Icon>
             <h4 className={style.cardTitleWhite}>{defaultValues.department_name}</h4>
            </CardHeader>
            <CardBody >
              <AvForm model={defaultValues}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <Label for="partner" style={{color: "#2979ff"}}>Partner (หน่วยงานที่สนับสนุน)</Label>
                    <AvGroup>
                      <AvInput
                        id="partner"
                        name="partner"
                        type="text"
                        value={defaultValues.partner}
                        disabled
                      />
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <Label for="username" style={{color: "#2979ff"}}>User id (รหัสผู้ใช้)</Label>
                    <AvGroup>
                      <AvInput
                        id="username"
                        name="username"
                        type="text"
                        value={defaultValues.username}
                        disabled
                      />
                    </AvGroup>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                    <Label for="password" style={{color: "#2979ff"}}>Password (รหัสผ่าน)</Label>
                      <AvGroup>
                        <AvInput
                        id="password"
                        name="password"
                        type="text"
                        value={defaultValues.password}
                        disabled
                        />
                      </AvGroup>
                  </GridItem>
                </GridContainer>

                {
                  (defaultValues.sentBgResult === true) ? 
                    (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={9} style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                        <ButtonMat onClick={() => PDFprint(defaultValues._id)} variant="extendedFab" aria-label="Delete"
                        style={{ fontFamily: 'Kanit', backgroundColor: "#5393ff" }} >
                          PDF ดาวน์โหลด
                            <Icon style={{ marginLeft: 10 }} >cloud_download</Icon>
                      </ButtonMat>
                        </GridItem>
                      </GridContainer>
                    )
                : (null)
                }
                
              </AvForm>
            </CardBody>
          </Card>
        </Modal>
      </div>
    );
  }
}

export default ModalInformationMember;