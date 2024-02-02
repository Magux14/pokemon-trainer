import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const QuestionModal = ({ show, text, options, answer, successCallback, errorCallback }) => {

    const [userAnswer, setUserAnswer] = useState(null);

    const valiteAnswer = (userAnswer) => {
        setUserAnswer(userAnswer);
        if (userAnswer == answer) {
            setTimeout(() => {
                successCallback();
            }, 1_000);
        } else {
            setTimeout(() => {
                errorCallback();
            }, 2_000);
        }
    }

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{text}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {options.map((answerOption, index) =>
                    <div key={'answer-' + index} style={{ padding: 3 }}>
                        <div
                            style={{ borderRadius: 3, verticalAlign: 'center', padding: 12, border: '2px solid rgb(233, 233, 233)' }}
                            className={
                                userAnswer != null ?
                                    ((userAnswer == answer && userAnswer == answerOption) ? 'correct' :
                                        (userAnswer != answer && answer != answerOption ? 'incorrect' : '')) : ''}
                            onClick={() => !userAnswer && valiteAnswer(answerOption)}>
                            <span>
                                {answerOption}
                            </span>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}
export default QuestionModal;
