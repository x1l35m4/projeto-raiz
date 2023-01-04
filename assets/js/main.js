console.log("main.js");

import Divisao from '/assets/js/componets/divisao.js'

const numInputA = document.querySelector("#num-input-a");
const numInputB = document.querySelector("#num-input-b");
const resultInput = document.querySelector("#result-input");
const btnResolver = document.querySelector("#btn-resolver")
const btnReset = document.querySelector("#btn-reset");

var mensagem = "Preencha os campos corretamente e tente novamente"


var inputsNumber = document.querySelectorAll(".input-number")

inputsNumber.forEach(inputNumber => {
  const input = inputNumber.querySelector(".input-value")
  const msg = inputNumber.querySelector(".msg")

  input.addEventListener("blur", (evt) => {

    if (evt.target.value == "") {
      msg.classList.add('d-block');
      msg.classList.remove('d-none')
    } else {
      msg.classList.remove('d-block');
      msg.classList.add('d-none')
    };

  });

})


btnResolver.addEventListener("click", resolverDivisao);

btnReset.addEventListener("click", resetInputs);

function resolver() {
  console.log("resolver");
  let listNum = [];
  let numero = numInputA.value;
  listNum = gerarListImpar(numero);
  resultInput.value = listNum.length;
  console.log(listNum);
}

function resolverDivisao() {
  const result = dividir(numInputA.value, numInputB.value);

  if (result != null) {
    resultInput.value = result.quociente;
    console.log(result);
  }

}


function gerarListImpar(valor) {

  let listNum = [];
  var soma = 0;

  for (let i = 1; i < valor; i += 2) {
    soma = somaValores(listNum);
    if (valor > soma) {
      listNum.push(i)
    }
  }
  return listNum;

}

function somaValores(listValores) {
  let valor = 0;

  listValores.forEach(numero => {

    if (numero != null) {
      valor += numero;
    }
  })

  return valor;
}


function haveRest(number, divPer) {
  return (number % divPer);
}

//console.log(dividir(3, 2));

function dividir(divisor, dividendo) {
  const divisao = new Divisao(divisor, dividendo);
  const quociente = (divisor / dividendo)

  if (!validInput(divisor, dividendo)) {
    openModal("modal-error", mensagem);
    return;
  };

  divisao.resto = Math.round((quociente - Math.floor(quociente)) * dividendo);

  divisao.quociente = Math.floor(quociente);
  dividendo

  return divisao;
}


function resetInputs() {
  numInputA.value = "";
  numInputB.value = "";
  resultInput.value = "";
}

function validInput(...list) {
  if (list.indexOf("") > -1) {
    return false;
  }
  return true;
}


function openModal(modalId, msg) {
  const modalElement = document.querySelector(`#${modalId}`);
  modalElement.querySelector("p").innerHTML = msg;
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}