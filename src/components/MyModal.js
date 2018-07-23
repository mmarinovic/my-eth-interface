import React from 'react';
import { Modal } from 'react-bootstrap';

export function MyModal (props){
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

export function MyFormModal (props){
    return (
        <div className="static-modal">
            <Modal show={props.show}>
                <form onSubmit={props.onSubmit}>
                    <Modal.Header>
                        <Modal.Title>{props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {props.body}
                    </Modal.Body>
                    <Modal.Footer>
                        {props.footer}
                    </Modal.Footer>
               </form>
            </Modal>
        </div>
    );
}