/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// html deki ul tag ina ulas
// Nous commençons par créer une référence à notre liste non ordonnée en utilisant la méthode 
// querySelector et en passant le type d'élément, car nous savons que nous en aurons un seul 
//sur la page :
var ul = document.querySelector('ul'); // Nous commençons par créer deux références dont nous aurons besoin :
// Nous récupérons le form en utilisant le type d'élément car nous savons que nous n'en aurons qu'un seul.
// Pour le champ, nous allons simplement préciser qu'il s'agit d'un enfant direct d'un élément form car nous en aurons un autre plus tard.
// Nous allons ensuite créer un écouteur et le gestionnaire d'événement correspondant :

var form = document.querySelector('form');
var input = document.querySelector('form > input'); // Nous créons un écouteur sur l'élément form grâce à la méthode addEventListener. Nous écoutons uniquement l'événement submit.
// L'événement submit est très particulier : il signifie que le formulaire est envoyé au serveur.
// Il est déclenché sur l'élément form lorsque l'utilisateur tape sur la touche entrée dans un champ input d'un formulaire, ou lorsque l'utilisateur clique sur un élément input ou un button avec l'attribut type ayant la valeur submit.
// A noter que par défaut, lorsqu'un bouton n'a pas de type il se comporte comme un bouton de type submit.
// C'est notre cas ici, l'événement sera donc déclenché sur notre élément form soit lorsque l'utilisateur cliquera sur le bouton, soit lorsqu'il tapera entrée.
// Ensuite nous passons notre fonction de rappel en deuxième argument à la méthode, à savoir notre gestionnaire d'événement.
// Nous commençons par empêcher le comportement par défaut qui consiste à envoyer une requête HTTP et à recharger la page, car nous voulons gérer nous-mêmes le comportement. Nous utilisons donc immédiatement la méthode preventDefault().
// Ensuite, nous récupérons la valeur de notre champ grâce à la propriété value.
// Enfin, nous vidons le champ afin de pouvoir ajouter d'autres todos, et nous appelons la fonction qui va ajouter la nouvelle todo à la liste.

form.addEventListener('submit', function (event) {
  event.preventDefault();
  var value = input.value;
  input.value = '';
  addTodo(value);
  displayTodo();
}); //Data degiskenini olustur tablo içinde obje..
// Ensuite, nous ajoutons un tableau de todos de départ pour l'exemple :

var todos = [{
  text: 'todos text',
  done: false,
  editMode: true
}, {
  text: 'text javascript',
  done: true,
  editMode: false
}]; // görünecek todos olustur 'displaytodo'
//bir degisken olustur fonction flchée
// La structure de nos todos est un tableau contenant des objets, où chaque objet est une todo.
// Chaque todo contient deux propriétés : un texte et son statut. Le texte est une chaîne de 
// caractères que nous afficherons. La propriété done a pour valeur un booléen nous indiquant si 
// la todo est terminée.

var displayTodo = function displayTodo() {
  //bir degiskende olustur ve  map ile dön (her bir todo yu ve indexi ile)
  var todosNode = todos.map(function (todo, index) {
    if (todo.editMode) {
      return createTodoEditElement(todo, index);
    } else {
      return createTodoElement(todo, index);
    }
  }); //ul yi bosalt

  ul.innerHTML = ''; //ul icine ul yi yerlestir

  ul.append.apply(ul, _toConsumableArray(todosNode));
}; // degiskenle eleman olustur todo ve index parametreli
// Ensuite nous créons une fonctions qui permet d'afficher nos todos initiales :
// Nous itérons sur la liste des todos avec la méthode map() qui nous permet de retourner un nouvel élément HTML pour chaque todo de notre tableau.
// Nous créons cet élément HTML avec la fonction createTodoElement() que nous allons définir.
// Ensuite, en sortie, nous obtenons donc un tableau d'éléments HTML dans notre constante todosNode.
// Nous vidons le HTML contenu éventuellement dans l'élément ul.
// Il nous suffit enfin d'utiliser l'opérateur spread pour convertir notre tableau en liste de noeuds HTML séparés par des virgules : ...todosNode.
// Cette conversion est nécessaire, en effet, append() prend une liste de noeuds séparés par des virgules et non un tableau.
// Nous créons enfin la fonction qui va créer une élément HTML pour chaque objet todo de notre tableau de todos :


var createTodoElement = function createTodoElement(todo, index) {
  //li degismezi ile (elementyarat)
  var li = document.createElement('li'); // Nous modifions la fonction permettant de créer les éléments todo sur le DOM :
  // Pour chaque todo, nous créons un élément bouton dont nous stockons la référence dans une constante.

  var butttonDelete = document.createElement('buttton'); // Ensuite, nous ajoutons un écouteur pour l'événement click et nous créons une fonction fléchée que nous utilisons comme gestionnaire d'événement.

  butttonDelete.innerHTML = 'Supprimer';
  butttonDelete.addEventListener('click', function (event) {
    event.stopPropagation();
    deleteTodo(index);
  }); //(yaratilani listeyi) string littéral le html ye yerlestir

  li.innerHTML = "\n    <!--  \n    bir span (span dolar kivircikli paranez le kisa if isaretli yada degil True/false), p, ve button olustur -->\n    <span class=\"todo ".concat(todo.done ? 'done' : '', "\"></span>\n    <!-- p dolar kivircikli paranez le todos yazilari gelecek-->\n    <p>").concat(todo.text, "</p>\n    ");
  li.addEventListener('click', function (event) {
    toggleTodo(index);
  });
  li.appendChild(butttonDelete); //li yi geri cagir

  return li;
};

var createTodoEditElement = function createTodoEditElement(todo, index) {
  var li = document.createElement('li');
  var input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;
  var buttonSave = document.createElement('button');
  buttonSave.innerHTML = 'Save';
  var buttonCancel = document.createElement('button');
  buttonCancel.innerHTML = 'Cancel';
  li.append(input, buttonSave, buttonCancel);
  return li;
}; // La fonction est très simple. Elle reçoit en argument le texte de la todo à créer qui provient du champ du formulaire.
// Ensuite, elles utilise la méthode push() pour ajouter une nouvelle todo à la liste.
// La todo est un objet avec une propriété text qui a pour valeur l'argument text passé, nous utilisons donc le raccourci syntaxique que nous avons appris, et une propriété done qui a la valeur false.
// Enfin, nous appelons la méthode displayTodo() qui va recréer les éléments et les afficher sur le DOM.


var addTodo = function addTodo(text) {
  todos.push({
    text: text,
    done: false
  });
  displayTodo();
};

var deleteTodo = function deleteTodo(index) {
  todos.splice(index, 1);
  displayTodo();
};

var toggleTodo = function toggleTodo(index) {
  todos[index].done = !todos[index].done;
  displayTodo();
}; // display fonc. cagir


displayTodo();
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map