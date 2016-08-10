var tabela = document.querySelector('.tabela');
var lista = document.querySelector('.lista');
var novoForm = document.querySelector('.novo');
var remover = document.querySelector('.remover');
var selecionarTodos = document.querySelector('.todos');

var ranges = document.querySelectorAll('input[type="range"]');

var personagens = [];

var ids = 0;

criarPersonagem('Kirk');
criarPersonagem('Spock');

for (var i = 0; i < ranges.length; i++) {
  ranges[i].oninput = function(evt) {
    evt.target.previousElementSibling.children[1].textContent = evt.target.value;

    if(evt.target.className.indexOf('padding') !== -1) {
      tabela.style.padding = evt.target.value + 'px';
    }
    else if(evt.target.className.indexOf('width') !== -1) {
      tabela.style.width = evt.target.value + 'px';
    }
    else if(evt.target.className.indexOf('opacity') !== -1) {
      tabela.style.opacity = evt.target.value / 100;
      console.log(evt.target.value / 100)
    }
  }
}

novoForm.onsubmit = function(evt) {
  evt.preventDefault();

  var nome = evt.target.children[0].value;

  criarPersonagem(nome);

  evt.target.children[0].value = '';
}

remover.onclick = function() {
  personagens = personagens.filter(function(personagem) {
    return !personagem.selecionado;
  });

  atualizarLista(lista, personagens);

  selecionarTodos.checked = false;
}

selecionarTodos.onchange = function(evt) {
  personagens = personagens.map(function(personagem) {
    personagem.selecionado = evt.target.checked;

    return personagem;
  });

  atualizarLista(lista, personagens);
}

function criarPersonagem(nome) {
  var personagem = {
    'id': ids++,
    'nome': nome,
    'selecionado': false
  };

  personagens.push(personagem);

  atualizarLista(lista, personagens);
}

function atualizarLista(lista, personagens) {
  lista.innerHTML = '';

  personagens.forEach(function(personagem) {
    var item = document.createElement('p');

    var checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = personagem.selecionado;

    checkbox.onchange = function(evt) {
      personagem.selecionado = evt.target.checked;

      personagens.map(function(p) {
        if(p.id === personagem.id)
          p.selecionado = evt.target.checked;

        return p;
      });
    }

    item.appendChild(checkbox);

    var nome = document.createElement('span');
    nome.textContent = personagem.nome;

    item.appendChild(nome);

    lista.appendChild(item);
  });
}