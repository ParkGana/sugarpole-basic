import { CalculateValue, TransformSign } from './tool'

export const CalculatorState = {
    value1: '0',
    value2: null,
    decimal: false,
    sign: null,
    prevInput: 'value1',
    str: '0'
}

export const CalculatorReducer = (state: any, action: any) => {
    const { str, value1, value2, decimal, sign, prevInput } = state
    const { input } = action.payload

    switch (action.type) {
        /* 숫자 입력 */
        case 'number':
            // 이전 입력 값이 value1인 경우
            if (prevInput === 'value1') {
                // value1 값이 소수인 경우
                if (decimal) {
                    const newValue1 = value1 + input
                    return { ...state, value1: newValue1, str: newValue1 }
                }
                // value1 값이 정수인 경우
                else {
                    const newValue1 = String(Number(value1) * 10 + Number(input))
                    return { ...state, value1: newValue1, str: newValue1 }
                }
            }
            // 이전 입력 값이 value2인 경우
            else if (prevInput === 'value2') {
                // value2 값이 소수인 경우
                if (decimal) {
                    const newValue2 = value2 + input
                    const newStr = value1 + TransformSign(sign) + newValue2
                    return { ...state, value2: newValue2, str: newStr }
                }
                // value2 값이 정수인 경우
                else {
                    const newValue2 = String(Number(value2) * 10 + Number(input))
                    const newStr = value1 + TransformSign(sign) + newValue2
                    return { ...state, value2: newValue2, str: newStr }
                }
            }
            // 이전 입력 값이 sign인 경우
            else {
                const newStr = str + input
                return { ...state, value2: input, prevInput: 'value2', str: newStr }
            }

        /* 소수점 입력 */
        case 'decimal':
            // 이전 입력 값이 value1인 경우
            if (prevInput === 'value1') {
                const newValue1 = value1 + (value1.includes('.') ? '' : '.')
                return { ...state, value1: newValue1, decimal: true, str: newValue1 }
            }
            // 이전 입력 값이 value2인 경우
            if (prevInput === 'value2') {
                const newValue2 = value2 + (value2.includes('.') ? '' : '.')
                const newStr = value1 + TransformSign(sign) + newValue2
                return { ...state, value2: newValue2, decimal: true, str: newStr }
            }
            // 이전 입력 값이 sign인 경우
            else {
                return { ...state, value2: '0.', decimal: true, prevInput: 'value2', str: str + '0.' }
            }

        /* 취소 입력 */
        case 'cancel':
            // 이전 입력 값이 value1인 경우
            if (prevInput === 'value1') {
                const newValue1 = value1.length > 1 ? value1.slice(0, -1) : '0'
                const newDecimal = value1.charAt(value1.length - 1) === '.' ? false : decimal
                return { ...state, value1: newValue1, decimal: newDecimal, str: newValue1 }
            }
            // 이전 입력 값이 value2인 경우
            else if (prevInput === 'value2') {
                const newValue2 = value2.length > 1 ? value2.slice(0, -1) : '0'
                const newDecimal = value2.charAt(value2.length - 1) === '.' ? false : decimal
                const newStr = value1 + TransformSign(sign) + newValue2
                return { ...state, value2: newValue2, decimal: newDecimal, str: newStr }
            }
            // 이전 입력 값이 sign인 경우
            else {
                return state
            }

        /* 연산 기호 입력 */
        case 'sign':
            // 이전 입력 값이 value1인 경우
            if (prevInput === 'value1') {
                // 제곱 연산인 경우
                if (input === 'square' || input === '^') {
                    const newValue1 = String(Number(value1) * Number(value1))
                    return { ...state, value1: newValue1, str: newValue1 }
                }
                // 제곱 연산이 아닌 경우
                else {
                    const newStr = value1 + TransformSign(input)
                    return { ...state, decimal: false, sign: input, prevInput: 'sign', str: newStr }
                }
            }
            // 이전 입력 값이 value2인 경우
            else if (prevInput === 'value2') {
                // 제곱 연산인 경우
                if (input === 'square' || input === '^') {
                    const newValue2 = String(Number(value2) * Number(value2))
                    const newStr = value1 + TransformSign(sign) + newValue2
                    return { ...state, value2: newValue2, str: newStr }
                }
                // 제곱 연산이 아닌 경우
                else {
                    const newValue1 = CalculateValue(Number(value1), sign, Number(value2))
                    const newStr = newValue1 + TransformSign(input)
                    return {
                        value1: newValue1,
                        value2: null,
                        decimal: false,
                        sign: input,
                        prevInput: 'sign',
                        str: newStr
                    }
                }
            }
            // 이전 입력 값이 sign인 경우
            else {
                // 제곱 연산인 경우
                if (input === 'square' || input === '^') {
                    const newValue2 = String(Number(value1) * Number(value1))
                    const newStr = value1 + TransformSign(sign) + newValue2
                    return { ...state, value2: newValue2, prevInput: 'value2', str: newStr }
                }
                // 제곱 연산이 아닌 경우
                else {
                    const newStr = value1 + TransformSign(input)
                    return { ...state, sign: input, str: newStr }
                }
            }

        /* 계산 기호 입력 */
        case 'calculate':
            // 이전 입력 값이 value1인 경우
            if (prevInput === 'value1') {
                return state
            }
            // 이전 입력 값이 value2인 경우
            else if (prevInput === 'value2') {
                // 계산이 불가능한 경우 (0으로 나누는 경우)
                if (sign === 'divide' && value2 === '0') {
                    const newStr = '0으로 나눌 수 없음'
                    return {
                        value1: '0',
                        value2: null,
                        decimal: false,
                        sign: null,
                        prevInput: 'value1',
                        str: newStr
                    }
                }
                // 계산이 가능한 경우
                else {
                    const newValue1 = CalculateValue(Number(value1), sign, Number(value2))
                    const newDecimal = !Number.isInteger(newValue1)
                    return {
                        value1: newValue1,
                        value2: null,
                        decimal: newDecimal,
                        sign: null,
                        prevInput: 'value1',
                        str: newValue1
                    }
                }
            }
            // 이전 입력 값이 sign인 경우
            else {
                const newValue1 = CalculateValue(Number(value1), sign, Number(value1))
                const newDecimal = !Number.isInteger(newValue1)
                return {
                    ...state,
                    value1: newValue1,
                    decimal: newDecimal,
                    sign: null,
                    prevInput: 'value1',
                    str: newValue1
                }
            }

        default:
            return state
    }
}
