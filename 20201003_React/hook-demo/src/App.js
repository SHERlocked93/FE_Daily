/* eslint-disable */
import React, { useState, useContext, useCallback, useEffect, useRef, useReducer, useMemo, useLayoutEffect } from 'react'

function App() {
    const Child = ({ handle }) => {
        console.log('child-render!')
        useEffect(() => {
            handle()
        }, [handle])

        return (
          <div>
              <p>child</p>
          </div>
        )
    }

    const calNum = [1, 2, 2, 3, 4, 5]

    const Father = () => {
        const [count, setCount] = useState(0)

        const countRef = useRef(0)
        useEffect(() => {
            countRef.current = count
        }, [count])

        const handle = useCallback(() => {
            new Promise(() => {   // 这里有一个异步请求
                console.log('curr Count: ', countRef.current)
                setTimeout(() => setCount(calNum.pop()), 1000)
            })
        }, [countRef])   // 如果去掉这里的count，就只会执行一次，因为没有依赖，函数引用也就没有变化

        return (
          <div>
              <h2 onClick={ handle }>father count: { count }</h2>
              <Child handle={ handle }/>
          </div>
        )
    }

    const Form = () => {
        const [text, setText] = useState('')
        const textRef = useRef()

        useEffect(() => {
            textRef.current = text // 将 text 写入到 ref
        }, [text])

        const handleSubmit = useCallback(() => {
            const currentText = textRef.current // 从 ref 中读取 text
            console.log(currentText)
        }, [textRef]) // handleSubmit 只会依赖 textRef 的变化。不会在 text 改变时更新

        return (
          <>
              text:{ text }
              <input value={ text } onChange={ e => setText(e.target.value) }/>
              <button onClick={ handleSubmit }>click</button>
          </>
        )
    }

    return (
      <div>
          <Form/>
      </div>
    )
}

export default App
