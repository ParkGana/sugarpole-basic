/* 연산 기호 변환 */
export const TransformSign = (sign: string) => {
    switch (sign) {
        case 'plus':
            return '+'
        case 'minus':
            return '-'
        case 'multiply':
        case '*':
            return 'x'
        case 'divide':
        case '/':
            return '÷'
        case 'remain':
            return '%'
        default:
            return sign
    }
}

/* 계산 */
export const CalculateValue = (value1: number, sign: string, value2: number) => {
    switch (sign) {
        case 'plus':
        case '+':
            return String(value1 + value2)
        case 'minus':
        case '-':
            return String(value1 - value2)
        case 'multiply':
        case '*':
            return String(value1 * value2)
        case 'divide':
        case '/':
            return String(value1 / value2)
        case 'remain':
        case '%':
            return String(value1 % value2)
        default:
            return ''
    }
}
