import React, { Component } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label,} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Card Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="card-name">Card</Label>
              <Input
                type="text"
                id="card-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter Card Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="card-description">Description</Label>
              <Input
                type="text"
                id="card-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Card description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="card-image">Image</Label>
              <Input
                type="text"
                id="card-image"
                name="image"
                value={this.state.activeItem.image}
                onChange={this.handleChange}
                placeholder="Enter Card Image URL"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="large"
                  checked={this.state.activeItem.large}
                  onChange={this.handleChange}
                />
                Large
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}