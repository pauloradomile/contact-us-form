const $stepText = $('#step-text');
const $stepDescription = $('#step-description');
const $stepOne = $('.step.one');
const $stepTwo = $('.step.two');
const $stepThree = $('.step.three');
const $title = $('#title');
const $containerBtnFormOne = $('#containerBtnFormOne');
const $btnFormOne = $('#btnFormOne');
const $containerBtnFormTwo = $('#containerBtnFormTwo');
const $btnFormTwo = $('#btnFormTwo');
const $containerBtnFormThree = $('#containerBtnFormThree');
const $btnFormThree = $('#btnFormThree');
const $inputNome = $('#nome');
const $inputSobrenome = $('#sobrenome');
const $inputDataNascimento = $('#dataNascimento');
const $inputEmail = $('#email');
const $inputMinibio = $('#minibio');
const $inputEndereco = $('#endereco');
const $inputComplemento = $('#complemento');
const $inputCidade = $('#cidade');
const $inputCep = $('#cep');
const $inputHabilidades = $('#habilidades');
const $inputPontosForte = $('#pontosForte');

let nomeValido = false;
let sobrenomeValido = false;
let dataNascimentoValido = false;
let emailValido = false;
let enderecoValido = false;
let cidadeValido = false;
let cepValido = false;
let habilidadesValido = false;
let pontosForteValido = false;

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

function ValidaFormularioDois() {
    if (enderecoValido && cidadeValido && cepValido) {
        $containerBtnFormTwo.removeClass('disabled');
        $btnFormTwo.removeClass('disabled');
        $btnFormTwo.off('click').on('click', IniciarFormularioTres);
    } else {
        $containerBtnFormTwo.addClass('disabled');
        $btnFormTwo.addClass('disabled');
        $btnFormTwo.off('click');
    }
}

function ValidarFormularioTres() {
    if (habilidadesValido && pontosForteValido) {
        $containerBtnFormThree.removeClass('disabled');
        $btnFormThree.removeClass('disabled');
        $btnFormThree.off('click').on('click', salvarNoTrello);
    } else {
        $containerBtnFormThree.addClass('disabled');
        $btnFormThree.addClass('disabled');
        $btnFormThree.off('click')
    }
}

function finalizaFormario() {
    $stepThree.hide();
    $stepDescription.hide();
    $title.text('Incrição Realizada com sucesso.');
    $stepText.text('Obrigado pela inscrição, entraremos em contacto assim que possível, nosso prazo de análise são de cinco dias úteis.');

}

async function salvarNoTrello() {
    try {
        const nome = $inputNome.val();
        const sobrenome = $inputSobrenome.val();
        const dataNascimento = $inputDataNascimento.val();
        const email = $inputEmail.val();
        const minibio = $inputMinibio.val();
        const endereco = $inputEndereco.val();
        const complemento = $inputComplemento.val();
        const cidade = $inputCidade.val();
        const cep = $inputCep.val();
        const habilidades = $inputHabilidades.val();
        const pontosForte = $inputPontosForte.val();

        if (!nome || !sobrenome || !dataNascimento || !email || !endereco || !cidade || !cep || !habilidades || !pontosforte) {
            return alert('Favor preencher todos os campos obrigatórios para poder prosseguir');
        }

        const body = {
            name: "Candidato - " + nome + " " + sobrenome,
            desc: `
                Seguem os dados do candidato(a):

                -----------------------Dados Pessoais-------------------------
                Nome: ${nome}
                Sobrenome: ${sobrenome}
                Data de Nascimento: ${dataNascimento}
                E-mail: ${email}
                Minibio: ${minibio}

                -------------------Dados de Correspondência--------------------
                Endereço: ${endereco}
                Complemento: ${complemento}
                Cidade: ${cidade}
                CEP: ${cep}
                
                ----------------------Dados do Candidato-----------------------
                Habilidades: ${habilidades}
                Pontos Fortes: ${pontosForte}
            
                `
        }

        await fetch('https://api.trello.com/1/cards?idList=6563ba161118f583cecef55f&key=f6594a28bffc5c64558e90d0f2df1d12&token=ATTA3e119a53a6515c8e615a90bfcb2f4539b320921037b89ee49429ef1d591c705f9270165A', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return finalizaFormario();
    } catch (e) {
        console.log('Ocorreu erro ao salvar no trello.');
    }
}


function IniciarFormularioTres() {
    $stepText.text('Passo 3 de 3 - Suas Competências');
    $stepDescription.text('Aqui pode fazer uma breve descrição de suas competências para que possamos realizar nossa avaliação.');
    $stepTwo.hide();
    $stepThree.show();
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

    $inputEndereco.keyup(function () {
        enderecoValido = validarInput(this, minLegthTextArea);
        ValidaFormularioDois();
    })

    $inputComplemento.keyup(function () {
        ValidaFormularioDois();
    })

    $inputCidade.keyup(function () {
        cidadeValido = validarInput(this, minLegthText);
        ValidaFormularioDois();
    })

    $inputCep.keyup(function () {
        this.value = this.value.replace(/\D/g, '');
        cepValido = validarInput(this, null, null, cepRegex);
        if (cepValido) {
            this.value = this.value.replace(cepRegex, "$1.$2-$3");
        }
        ValidaFormularioDois();
    });

    $inputHabilidades.keyup(function () {
        habilidadesValido = validarInput(this, minLegthTextArea);
        ValidarFormularioTres();
    })

    $inputPontosForte.keyup(function () {
        pontosForteValido = validarInput(this, minLegthTextArea);
        ValidarFormularioTres();
    })

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
