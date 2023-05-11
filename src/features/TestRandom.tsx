import { Button } from "antd";
import React, { useState } from "react";
import styles from '../styles/Home.module.css';

/**
 * questions - переменная которая содержит в себе ассоциативный массив
 * элемент под массива состоит из пары ключ значения
 * expression - содержит строку которая в дальнейшем будет преобразовываться в булевое значение
 * answer - это правильный ответ на expression - true или false 
*/
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

/**
 * TestRandom - это функция которая создает интерфейс
 * в котором отображаются рандмоные вопросы
 * после ключегого слова return 
 * react иттерирует ассоциативный массив - questions
 * где question - это элемент подмассива, а idx - это номер
 * текущего элемента
 * 
 * в этой функции мы создаем три локальных стэйта
 * rightAnswer - содержит количество правильных ответов
 * nonRightAnswer - содержит количество неправильных ответов
 * currentAnswer - это id текущего ответа
*/
export const TestRandom = () => {
    const [rightAnswer, setRightAnswer] = useState(0);
    const [nonRightAnswer, setNonRightAnswer] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(0);

    /**
     * isRightAnswer - это булевая функция которая принимает
     * flag и question, где
     * flag - это или true или false, взавимисоти от того
     * что выбрал пользователь, question же
     * это текущий вопрос,
     * когда мы иттерируем все вопросы, программа
     * работает с текущим question
     * в ходе которого, берет question.answer
     * т.е правильный ответ
     * и сравнивает его с тем, что выбрал пользователь
    */
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
                    /**
                     * если id текущего вопроса, например: 0,
                     * равен currentAnswer, то это говорит о том,
                     * что мы находимся на первом вопросе
                     * после выбора ответа, currentAnswer увеличивается на один
                     * что даёт гарантию, что пользователь не сможет ответить на вопрос
                     * которого не существует 
                    */
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
            /**
             * если currentAnswer равен максимальному количество вопросу в тесте
             */
            currentAnswer === 6 && <>
                <h1>Результат: {rightAnswer} / 6</h1>
            </>
        }
    </> 
}