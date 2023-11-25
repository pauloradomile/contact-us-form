const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');

const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');

let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;

const minLegthText = 2;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validarInput(element, minLength, maxLength, regex) {
    const closest = $(element).closest('.input-data');
    if (!element.value
        || (minLength && element.value.trim().length < minLength)
        || (maxLength && element.value.trim().length > maxLength)
        || (regex && !element.value.toLowerCase().match(regex))) {
        closest.addClass('error');
        return false;
    }
    closest.removeClass('error');
    return true;
}

function ValidaFormularioUm() {
    if (nomeValido && sobrenomeValido && emailValido && dataNascimentoValido) {
        $containerBtnFormOne.removeClass('disabled');
        $btnFormOne.removeClass('disabled');
    } else {
        $containerBtnFormOne.addClass('disabled');
        $btnFormOne.addClass('disabled');
    }
}

function init() {
    $stepText.text('Passo 1 de 3  - Dados Pessoais.');
    $stepDescription.text('Descreva seus dados para que possamos te conhecer melhor. ');
    $stepTwo.hide();
    $stepThree.hide();

    $inputNome.keyup(function () {
        nomeValido = validarInput(this, minLegthText);
        ValidaFormularioUm();
    });

    $inputSobrenome.keyup(function () {
        sobrenomeValido = validarInput(this, minLegthText);
        ValidaFormularioUm();
    });

    $inputDataNascimento.keyup(function () {
        dataNascimentoValido = validarInput(this, minLegthText);
        ValidaFormularioUm();
    });

    $inputDataNascimento.change(function () {
        dataNascimentoValido = validarInput(this, minLegthText);
        ValidaFormularioUm();
    });

    $inputEmail.keyup(function () {
        emailValido = validarInput(this, null, null, emailRegex);
        ValidaFormularioUm();
    });

    $inputMinibio.keyup(function () {
        ValidaFormularioUm();
    });

    $inputDataNascimento.on('focus', function () {
        this.type = 'date';
    });

    $inputDataNascimento.on('blur', function () {
        if (!this.value) {
            this.type = 'text';
        }
    });
}
init();