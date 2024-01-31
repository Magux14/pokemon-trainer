import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({ show, title, message, okText, cancelText, cancelCallback, acceptCallback, imgUrl }) => {
    return (
        <Modal show={show} onHide={cancelCallback}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                <div className='flex-center'>
                { imgUrl && <img src={imgUrl} alt=""/>}
                </div>
                </Modal.Body>
            
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