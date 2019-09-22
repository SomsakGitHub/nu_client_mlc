import React from 'react';
import { Modal, ModalFooter, ModalHeader, Button, Container } from 'reactstrap';

class ModalLogout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  // confirmLogout*************************************************************************************************
  confirmLogout(){
    localStorage.removeItem('the_main_app')
    window.location.assign('login')
  } 

  render() {
    return (
      <div>
        <Button variant="extendedFab" aria-label="Delete" color="danger" style={{ fontFamily: 'Kanit', marginRight: 20}} onClick={this.toggle}>
          Logout (ออกจากระบบ)
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Container>
            <ModalHeader toggle={this.toggle} >คุณต้องการออกจากระบบใช่หรือไม่ ?</ModalHeader>
          </Container>
          <ModalFooter>
            <Button color="danger" onClick={this.confirmLogout}>ยืนยัน</Button>
            <Button color="secondary" onClick={this.toggle}>ยกเลิก</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalLogout;