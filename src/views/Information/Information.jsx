import React from "react";
import { Label} from 'reactstrap';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import ModalLogout from "components/Modal/ModalLogout.jsx";

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

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    window.location.assign('dashboard');
  }

  render(){
    const { classes } = this.props;

    return (
          <div>
            <GridContainer >
              <GridItem xs={12} sm={12} md={2} style={{ marginLeft: 'auto', marginTop: 20 }}>
                <ModalLogout />
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={12} sm={12} md={5} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                <Card>
                  <CardHeader color="info">
                    <h4 className={classes.cardTitleWhite}>กรุณากรอกข้อมูลส่วนตัว</h4>
                    </CardHeader>
                    <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                      <Label style={{color: "#3d5afe"}}>User id (รหัสผู้ใช้) : </Label>
                      </GridItem>
                    </GridContainer>
                    </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            
          </div>
        );
  }
}

export default withStyles(styles)(Information);