import React from 'react';
import { Modal, ModalFooter, ModalHeader, Button, Container } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';

class ModalDeleteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
//delete*********************************************************************************************
  delete(id) {
    fetch(`http://localhost:3001/api/user/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
      });
    window.location = '/member'
  }

  render() {
    const defaultValues = {
      _id: this.props.user._id,
      department_name: this.props.user.department_name,
    }

    return (
      <div>
        <Button mini variant="fab" color="danger" aria-label="Delete" onClick={this.toggle} >
          <DeleteIcon />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Container>
            <ModalHeader toggle={this.toggle} >คุณต้องการลบ ?</ModalHeader>
            <div style={{ color: "#ff1744", paddingLeft: 20 }}>
              ( {defaultValues.department_name} )
            </div>
          </Container>
          <ModalFooter>
            <Button color="danger" onClick={() => this.delete(defaultValues._id)}>ยืนยัน</Button>
            <Button color="secondary" onClick={this.toggle}>ยกเลิก</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalDeleteUser;