import { Button, Input } from "antd";
import React, { useState } from "react";
import styles from '../styles/Home.module.css';

/**
 * TestYourOwn - это функция которая создает интерфейс
 * в котором отображаются вопросы которые создал сам пользователь
 * после ключегого слова return 
 * react иттерирует пустой массив в которм находится 6 элементов, 
 * далее, метод .map заполняет этот массив цифрами от 0 до 5 (6 элементов в сумме)
 * где currentQuestion - это текущий вопрос, а idx - это номер
 * текущего элемента
 * 
 * в этой функции мы создаем три локальных стэйта
 * currentAnswer - содержит правильный ответ на текущий вопрос
 * fieldValue - содержит значение с клавиатуры, которое ввёл пользователь
 * questions - содержит все вопросы которые ввел пользователь
*/
export const TestYourOwn = () => {
    const [currentAnswer, setCurrentAnswer] = useState(0);
    const [fieldValue, setFieldValue] = useState<string>('');
    const [questions, setQuestions] = useState<string[]>([]);

    return <>
        {
            Array.from({ length: 6 }).map((_, idx) => ++idx)
                .map((currentQuestion, idx) => {
                    return currentAnswer === idx
                        /**
                         * когда currentAnswer равен id текущего вопроса
                         * то это во первых, обеспечивает защиту того
                         * что пользователь не может ответить на вопрос
                         * прежде чем он - не заполнил предыдущий
                         * 
                         * если всё ок, 
                         * то отображается какой номер вопроса в тэге "p"
                         * дальше вызывается Input компонент из библиотеки antd, для которого мы указываем 
                         * fieldValue в виде value, это обеспечивает полный контроль над тем, 
                         * что вводит пользователь
                         * onChange функция, которая отслеживает изменение текстового поля
                         * т.е любой ввод с клавиатуры вызывает setFieldValue
                         * который, в свою очередь записывает то что ввел пользователь в стейт
                         * что именно ввел пользователь - получаем из e.target.value
                         */
                        ? <div key={currentQuestion}>
                            <p>Вопрос: {currentAnswer} / 6</p>
                            <br />
                            <Input placeholder='Выражение' value={fieldValue} onChange={(e) => {
                                setFieldValue(e.target.value);
                            }} />

                            {/**
                             * Button это компонент, который предоставляет antd, 
                             * этот компонент служит для перехода к следущем вопросу
                             * мы создем функцию onClick
                             * которая смотрит - нажимал ли пользователь на кнопку
                             * если пользователь нажал на кнопку, то
                             * программа добавляет к currentAnswer + 1, чтобы текущий вопрос был следующий
                             * сохраняем текущий вопрос к другим вопросами, которые были созданы ранее
                             * очищаем текстовое поле, чтобы при переходе к следущему вопросу
                             * пользователь не видел в текстовом поле
                             * текст прошлого вопроса
                             */}
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
            /**
             * если currentAnwer равен максимальному количество вопросов (6)
             * то иттерируем все вопросы и выводим каждый
             * где question это вопрос, а idx - id вопроса
             */
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
