import Modal from 'react-bootstrap/Modal';

const QuestionModal = ({ show, text, options, answer, successCallback, errorCallback }) => {

    const valiteAnswer = (userAnswer) => {
        console.log(userAnswer);
        console.log(answer);
        if (userAnswer == answer) {
            successCallback();
        } else {
            errorCallback();
        }
    }
    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{text}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {options.map((answer, index) => <p key={'answer-' + index} onClick={() => valiteAnswer(answer)}>{answer}</p>)}
            </Modal.Body>
        </Modal>
    );
}
export default QuestionModal;
