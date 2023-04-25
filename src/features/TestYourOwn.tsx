import { Button, Input } from "antd";
import React, { useState } from "react";
import styles from '../styles/Home.module.css';

export const TestYourOwn = () => {
    const [currentAnswer, setCurrentAnswer] = useState(0);
    const [fieldValue, setFieldValue] = useState<string>('');
    
    const [questions, setQuestions] = useState<string[]>([]);

    return <>
        {
            Array.from({ length: 6 }).map((_, idx) => ++idx)
                .map((currentQuestion, idx) => {
                    return currentAnswer === idx
                        ? <div key={currentQuestion}>
                            <p>Вопрос: {currentAnswer} / 6</p>
                            <br />
                            <Input placeholder='Выражение' value={fieldValue} onChange={(e) => {
                                setFieldValue(e.target.value);
                            }} />

                            <Button type="primary" onClick={() => {
                                setCurrentAnswer(currentAnswer + 1);
                                setQuestions([ ...questions, fieldValue ]);
                                setFieldValue('');
                            }} className={styles['Btn']}>Следующий вопрос</Button>
                        </div>
                        : null
                }
                )
        }

        {
            currentAnswer === 6 && <>
                <h1>Тест создан</h1>
                { questions.map((question, idx) => 
                    <div key={idx}>
                        <b>{idx + 1}.</b> {question}
                    </div>
                ) }
            </>
        }
    </>
}
