import { Button } from "antd";
import React, { useState } from "react";
import styles from '../styles/Home.module.css';

const questions = [
    {
        expression: `1 > 0`,
        answer: Boolean(1 > 0)
    },
    {
        expression: `1 > 3`,
        answer: Boolean(1 > 3)
    },
    {
        expression: `14 <= 5`,
        answer: Boolean(14 <= 5)
    },
    {
        expression: `15 > 0 && 64 >= 0`,
        answer: Boolean(15 > 0 && 64 >= 0)
    },
    {
        expression: `0 || 1 && 0 && 1`,
        answer: Boolean(0 || 1 && 0 && 1)
    },
    {
        expression: `(1 && 0) || 0`,
        answer: Boolean((1 && 0) || 0)
    },
]

export const TestRandom = () => {
    const [rightAnswer, setRightAnswer] = useState(0);
    const [nonRightAnswer, setNonRightAnswer] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);

    const isRightAnswer = (flag: boolean, question: any) => {
        if (flag === question.answer) {
            setRightAnswer(rightAnswer + 1);
        } else {
            setNonRightAnswer(nonRightAnswer + 1);
        }
    }

    return <>
        {
            questions.map((question, idx) => {
                return idx === currentAnswer 
                    ? <div>
                        <p>{question.expression}</p>
                        <Button type="primary" onClick={() => {
                            isRightAnswer(true, question);
                            setCurrentAnswer(currentAnswer + 1);
                        }} className={styles['Btn']}>True</Button>
                        <Button type="primary" onClick={() => {
                            isRightAnswer(false, question);
                            setCurrentAnswer(currentAnswer + 1);
                        }}>False</Button>
                    </div>
                    : null
            })
        }

        {
            currentAnswer === 6 && <>
                <h1>Результат: {rightAnswer} / 6</h1>
            </>
        }
    </> 
}