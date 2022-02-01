const select = document.getElementById('currency');
const eurValue = document.querySelector('input#amount');
const result = document.querySelector('div.result');
const btn = document.querySelector('button');

let xmlContent = '';
let currency = '';
let rateValue = '';


fetch('currencyRates.xml').then(response => {
    response.text().then(xml => {
        xmlContent = xml;

        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let cubes = xmlDOM.querySelectorAll('Cube[currency]');
        
        cubes.forEach((cubeXmlNode) => {

            currency = cubeXmlNode.getAttribute('currency');
            rate = cubeXmlNode.getAttribute('rate');

            let currencyOption = document.createElement('option');
            currencyOption.innerText = currency;
            currencyOption.setAttribute('currency', currency);
            currencyOption.setAttribute('value', rate);

            select.appendChild(currencyOption);

        })
    })
})

class Calculator {
    constructor(eurValue, rateValue, currency) {
        this.eurValue = eurValue;
        this.rateValue = rateValue;
        this.currency = currency;
    }

    getEurValue() {
        return this.eurValue = eurValue.value;
    }

    getRateValue() {
        return this.rateValue = select.options[select.selectedIndex].value;
    }

    getCurrValue() {
        return this.currency = select.options[select.selectedIndex].text;
    }
    
    compute(result) {
        let computation = (this.eurValue * this.rateValue).toFixed(2);
        result.innerText = computation + ' ' + this.getCurrValue();
      }

}

const calculator = new Calculator(eurValue, rateValue, currency);

btn.addEventListener('click', (e) => {
    e.preventDefault();
    calculator.getEurValue();
    calculator.getRateValue();
    calculator.getCurrValue();
    calculator.compute(result);
});


// Rozwiązanie 2. (bez użycia klasy)

// function calc(event) {
//         event.preventDefault();

//         let rateValue = select.options[select.selectedIndex].value;
//         let currValue = select.options[select.selectedIndex].text;

//     result.innerText = (eurValue.value * rateValue).toFixed(2) + ' ' + currValue;
// }

// btn.addEventListener('click', calc);