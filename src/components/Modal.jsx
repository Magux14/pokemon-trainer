import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({ show, title, message, okText, cancelText, cancelCallback, acceptCallback }) => {
    return (
        <Modal show={show} onHide={cancelCallback}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                {cancelCallback &&
                    <Button variant="secondary" onClick={cancelCallback}>
                        {cancelText}
                    </Button>
                }
                {acceptCallback &&
                    <Button variant="primary" onClick={acceptCallback}>
                        {okText}
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    );
}
export default CustomModal;