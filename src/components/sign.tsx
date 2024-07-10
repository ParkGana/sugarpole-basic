import { useContext } from 'react'
import { CalculatorContext } from '../hooks/context'

function Sign({ value }: { value: string }) {
    const { dispatch } = useContext(CalculatorContext)

    // 기호 클릭 이벤트
    const onClickSign = () => {
        dispatch({ type: 'sign', payload: { input: value } })
    }

    // 계산 클릭 이벤트
    const onClickCalculate = () => {
        dispatch({ type: 'calculate', payload: { input: null } })
    }

    return (
        <>
            {value === 'calculate' ? (
                <div
                    className="grid items-center justify-center w-full h-[45px] bg-[#b2b2b2] rounded-full cursor-pointer active:bg-[#828181]"
                    onClick={onClickCalculate}
                >
                    <img src={`/icons/${value}.png`} />
                </div>
            ) : (
                <div
                    className="grid items-center justify-center w-[45px] h-[45px] bg-[#f49d1a] rounded-full cursor-pointer active:bg-[#B66D00]"
                    onClick={onClickSign}
                >
                    <img src={`/icons/${value}.png`} />
                </div>
            )}
        </>
    )
}

export default Sign
