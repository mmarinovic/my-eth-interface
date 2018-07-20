import React from 'react';
import { Modal } from 'react-bootstrap';

export default (props) => {
    return (
        <div className="static-modal">
            <Modal show={props.show}>
                <Modal.Header>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.body}
                </Modal.Body>
                <Modal.Footer>
                    {props.footer}
                </Modal.Footer>     
            </Modal>
        </div>
    );
}
