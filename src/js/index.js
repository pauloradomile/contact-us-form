const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');

const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $containerBtnFormTwo = $('#containerBtnFormTwo');
const $btnFormTwo = $('#btnFormTwo');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');
const $inputEndereco = $('#endereco');
const $inputComplento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');

let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValido = false;
let cepValido = false;

const minLegthText = 2;
const minLegthTextArea = 10;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;

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
        $btnFormOne.off('click').on('click', IniciarFormularioDois);
    } else {
        $containerBtnFormOne.addClass('disabled');
        $btnFormOne.addClass('disabled');
        $btnFormOne.off('click');

    }
}

function ValidaFormularioDois(){
    if (enderecoValido && cidadeValido && cepValido){
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');       

    }else{
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled');
    }
}

function IniciarFormularioDois() {
    $stepText.text('Passo 2 de 3 - Dados de Correspondência');
    $stepDescription.text('Precisamos dos dados de correnpondência para que possamos entrar em contacto caso seja necessário.');
    $stepOne.hide();
    $stepTwo.show();
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

    $inputEndereco.keyup(function (){
        enderecoValido = validarInput(this, minLegthTextArea);
        ValidaFormularioDois();
    })

    $inputComplento.keyup(function (){
        ValidaFormularioDois();
    })

    $inputCidade.keyup(function (){
        cidadeValido = validarInput(this, minLegthText);
        ValidaFormularioDois();
    })

    $inputCep.keyup(function () {
        this.value = this.value.replace(/\D/g, '');
        cepValido = validarInput(this, null, null, cepRegex);
        if(cepValido){
            this.value = this.value.replace(cepRegex, "$1.$2-$3");
         }
         ValidaFormularioDois();       
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