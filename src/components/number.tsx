import { MouseEvent, useContext } from 'react'
import { CalculatorContext } from '../hooks/context'

function Number({ value }: { value: number | string }) {
    const { dispatch } = useContext(CalculatorContext)

    // 숫자 클릭 이벤트
    const onClickNumber = (e: MouseEvent<HTMLDivElement>) => {
        dispatch({ type: value === '.' ? 'decimal' : 'number', payload: { input: e.currentTarget.innerText } })
    }

    // 취소 클릭 이벤트
    const onClickCancel = () => {
        dispatch({ type: 'cancel', payload: { input: null } })
    }

    return (
        <>
            {value === 'cancel' ? (
                <div
                    className="grid items-center justify-center w-[65px] h-[45px] bg-[#404258] rounded-full cursor-pointer active:bg-[#313348]"
                    onClick={onClickCancel}
                >
                    <img src="/icons/cancel.png" />
                </div>
            ) : (
                <div
                    className="w-[65px] h-[45px] leading-[45px] bg-[#404258] text-2xl text-white text-center rounded-full cursor-pointer active:bg-[#313348]"
                    onClick={onClickNumber}
                >
                    {value}
                </div>
            )}
        </>
    )
}

export default Number
