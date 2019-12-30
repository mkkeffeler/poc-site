import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  ModalBody,
  Col,
  ModalFooter,
  Spinner
} from 'reactstrap'
import Octicon, { Smiley, Report } from '@githubprimer/octicons-react'

export class ModalWindow extends React.Component {
  renderModalFooter = () => {
    const request = this.props.request
    const theclass = request.failed ? 'warning' : 'primary'
    return (
      <Row>
        <Col>
          <Button
            color={theclass}
            onClick={this.props.footerButtonOnClick}
          >
            {this.props.footerButtonText}
          </Button>
        </Col>
        <Col>
          <Button
            color={theclass}
            onClick={this.props.closeModal}
          >
        Close Window and Try Again
          </Button>
        </Col>
      </Row>
    )
  };

  getProcessingHeader = () => {
    const { processing } = this.props
    if (typeof processing !== 'undefined') {
      if (typeof processing.header !== 'undefined') {
        return processing.header
      }
    }
    return 'Please wait!'
  };

  getProcessingBody = () => {
    const { processing } = this.props
    if (typeof processing !== 'undefined') {
      if (typeof processing.body !== 'undefined') {
        return processing.body
      }
    }
    return 'We are processing your request.'
  };

  getErrorHeader = () => {
    const { error } = this.props
    if (typeof error !== 'undefined') {
      if (typeof error.header !== 'undefined') {
        return error.header
      }
    }
    return 'Request has failed!'
  };

  getErrorBody = () => {
    const { error } = this.props
    if (typeof error !== 'undefined') {
      if (typeof error.body !== 'undefined') {
        return error.body
      }
    }
    return 'Your request has failed, please reach out to InfoSec IAM team for further assitance!'
  };

  getSuccessBody = () => {
    const { success } = this.props
    if (typeof success !== 'undefined') {
      if (typeof success.body !== 'undefined') {
        return success.body
      }
    }
    return 'Your request has been submitted, please provide us up to 4 hours to review and process the request.'
  };

  render () {
    const request = this.props.request
    return (
      <Modal isOpen={request.showModal} className="font-weight-bold">
        <ModalHeader hidden={!request.processing} className="bg-warning">
          <Spinner type="grow" />
          &nbsp; {this.getProcessingHeader()}
        </ModalHeader>
        <ModalBody hidden={!request.processing} className="bg-warning">
          {this.getProcessingBody()}
        </ModalBody>
        <ModalHeader hidden={!request.submitted} className="bg-success">
          <span>
            <Octicon icon={Smiley} />
          </span>
          &nbsp; Request has been successfully processed!
        </ModalHeader>
        <ModalBody hidden={!request.submitted} className="bg-success">
          {this.getSuccessBody()}
          <br />
          Thank you for using InfoSec Self Service!
        </ModalBody>
        <ModalFooter hidden={!request.submitted} className="bg-success">
          {this.renderModalFooter()}
        </ModalFooter>
        <ModalHeader hidden={!request.failed} className="bg-danger">
          <span>
            <Octicon icon={Report} />
          </span>
          &nbsp; {this.getErrorHeader()}
        </ModalHeader>
        <ModalBody hidden={!request.failed} className="bg-danger">
          {this.getErrorBody()}
        </ModalBody>
        <ModalFooter hidden={!request.failed} className="bg-danger">
          {this.renderModalFooter()}
        </ModalFooter>
      </Modal>
    )
  }
}
