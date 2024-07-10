import { useEffect, useReducer } from 'react'
import './App.css'
import Number from './components/number'
import Sign from './components/sign'
import { CalculatorContext } from './hooks/context'
import { CalculatorReducer, CalculatorState } from './hooks/reducer'

function App() {
    const [state, dispatch] = useReducer(CalculatorReducer, CalculatorState)

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)

        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    const onKeyDown = (e: any) => {
        // 숫자 키패드
        if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
            dispatch({ type: 'number', payload: { input: e.key } })
        }
        // 소수점 키패드
        else if (e.key === '.') {
            dispatch({ type: 'decimal', payload: { input: e.key } })
        }
        // Backspace 키패드
        else if (e.key === 'Backspace') {
            dispatch({ type: 'cancel', payload: { input: null } })
        }
        // 연산 키패드
        else if (['+', '-', '*', '/', '%', '^'].includes(e.key)) {
            dispatch({ type: 'sign', payload: { input: e.key } })
        }
        // Enter 키패드
        else if (e.key === 'Enter') {
            dispatch({ type: 'calculate', payload: { input: null } })
        }
    }

    return (
        <CalculatorContext.Provider value={{ state, dispatch }}>
            <div className="grid gap-5 bg-[#242530] p-[25px]">
                <div className="w-full h-[70px] leading-[70px] bg-[#3a3f77] text-3xl text-white text-right rounded-[20px] px-8">
                    {state.str}
                </div>
                <div className="grid grid-cols-[auto_auto] gap-5">
                    <div className="grid grid-cols-3 gap-4">
                        <Number value={1} />
                        <Number value={2} />
                        <Number value={3} />
                        <Number value={4} />
                        <Number value={5} />
                        <Number value={6} />
                        <Number value={7} />
                        <Number value={8} />
                        <Number value={9} />
                        <Number value={'.'} />
                        <Number value={0} />
                        <Number value={'cancel'} />
                    </div>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Sign value={'multiply'} />
                            <Sign value={'divide'} />
                            <Sign value={'plus'} />
                            <Sign value={'minus'} />
                            <Sign value={'remain'} />
                            <Sign value={'square'} />
                        </div>
                        <Sign value={'calculate'} />
                    </div>
                </div>
            </div>
        </CalculatorContext.Provider>
    )
}

export default App
