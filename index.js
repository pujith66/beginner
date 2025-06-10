const display = document.querySelector('.box-212');

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let fact = 1;
    for (let i = 2; i <= n; i++) fact *= i;
    return fact;
}

function evaluateExpression(expr) {
    try {
        return Function('"use strict"; return (' + expr + ')')();
    } catch {
        return "Error";
    }
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        let value = button.innerText;

        switch (value) {
            case 'AC':
                display.innerText = '';
                break;

            case 'CE':
                display.innerText = display.innerText.slice(0, -1);
                break;

            case '=':
                let expression = display.innerText
                    .replace(/x/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/π/g, Math.PI)
                    .replace(/e/g, Math.E)
                    .replace(/√/g, 'Math.sqrt')
                    .replace(/sin/g, 'Math.sin')
                    .replace(/cos/g, 'Math.cos')
                    .replace(/tan/g, 'Math.tan')
                    .replace(/log/g, 'Math.log10')
                    .replace(/exp/g, 'Math.exp');

                expression = expression.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, (match, func, val) => {
                    return `Math.${func}(toRadians(${val}))`;
                });

                expression = expression.replace(/(\d+)!/g, (match, n) => {
                    return `factorial(${n})`;
                });

                expression = expression.replace(/(\d)(Math\.)/g, '$1*$2');

                display.innerText = evaluateExpression(expression);
                break;

            case 'pi':
                display.innerText += 'π';
                break;

            case 'x!':
                display.innerText += '!';
                break;

            case 'rt':
                display.innerText += '√';
                break;

            case 'csc':
                display.innerText += '1/sin(';
                break;

            case 'sec':
                display.innerText += '1/cos(';
                break;

            case 'cot':
                display.innerText += '1/tan(';
                break;

            default:
                display.innerText += value;
        }
    });
});
