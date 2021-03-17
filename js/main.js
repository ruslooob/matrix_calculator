$(".sizes").change(function () {
  // получение названия класса
  var allClasses = $(this).attr('class');
  // вычленение класса-идентификатора
  var mainClass = getClass(allClasses, 'sizes-');
  deleteTable(mainClass);
  var sizes = countSizes(mainClass);
  var rows = sizes[0];
  var cols = sizes[1];
  createTable(mainClass, rows, cols);
  // удаление таблицы ответов
  var tbody = document.getElementsByClassName('answer-table-body')[0];
  tbody.innerHTML = "";
});


$('.choose-option').change(function () {
  var title = document.getElementsByClassName('title')[0];
  var buttonBlockText = document.getElementsByClassName('button-block')[0]
    .getElementsByClassName('text')[0];
  var value = this.value;
  if (value == '+') {
    title.textContent = 'Сложение матриц';
    buttonBlockText.textContent = 'A + B';
  } else if (value == '-') {
    title.textContent = 'Вычитание матриц';
    buttonBlockText.textContent = 'A - B';
  } else if (value == '*') {
    title.textContent = 'Умножение матриц';
    buttonBlockText.textContent = 'A · B';
  }
});


$(".answer-btn").click(function () {
  if (hasErrors()) return;

  var action = document.getElementsByClassName('choose-option')[0].value;
  if (action == '+') {
    sumMatrix();
  } else if (action == '-') {
    subMatrix();
  } else if (action == '*') {
    multiplyMatrix();
  }
});


function getClass(classes, exp) {
  index = classes.indexOf(exp);
  return classes.slice(6);
}

function deleteTable(className) {
  // получение имени класса таблицы
  var tbody;
  if (className == 'sizes-A-rows' || className == 'sizes-A-cols') {
    tbody = document.getElementsByClassName('matrix-A-body')[0];
  } else if (className == 'sizes-B-rows' || className == 'sizes-B-cols') {
    tbody = document.getElementsByClassName('matrix-B-body')[0];
  }
  // удаление таблицы
  tbody.innerHTML = "";
}

function countSizes(className) {
  var rows, cols;
  // определение нужного параметра размера
  if (className == 'sizes-A-rows' || className == 'sizes-A-cols') {
    rows = document.getElementsByClassName('sizes-A-rows')[0].value;
    cols = document.getElementsByClassName('sizes-A-cols')[0].value;

  } else if (className == 'sizes-B-rows' || className == 'sizes-B-cols') {
    rows = document.getElementsByClassName('sizes-B-rows')[0].value;
    cols = document.getElementsByClassName('sizes-B-cols')[0].value;
  }
  return [rows, cols];
}

function createTable(className, rows, cols) {
  var tbody;
  // определение создаваемой таблицы
  if (className == 'sizes-A-rows' || className == 'sizes-A-cols') {
    tbody = document.getElementsByClassName('matrix-A-body')[0];
  } else if (className == 'sizes-B-rows' || className == 'sizes-B-cols') {
    tbody = document.getElementsByClassName('matrix-B-body')[0];
  }
  // создание ячеек
  for (var i = 0; i < rows; i++) {
    var tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (var j = 0; j < cols; j++) {
      var td = document.createElement('td');
      td.innerHTML = "<input type='text' class='cell'>";
      tr.appendChild(td);
    }
  }
}



function sumMatrix() {
  // это повторяющийся блок кода,  потом его можно заменить на ф-цию
  rows1 = document.getElementsByClassName('sizes-A-rows')[0].value;
  rows2 = document.getElementsByClassName('sizes-B-rows')[0].value;
  cols1 = document.getElementsByClassName('sizes-A-cols')[0].value;
  cols2 = document.getElementsByClassName('sizes-B-cols')[0].value;
  tbody = document.getElementsByClassName('answer-table-body')[0];
  // end
  // получение матрицы - из введенных данных
  var matrixA = getMatrix('matrix-A-body', rows1, cols1);
  var matrixB = getMatrix('matrix-B-body', rows2, cols2);

  // удаление предыдущей таблицы ответов
  var tbody = document.getElementsByClassName('answer-table-body')[0];
  tbody.innerHTML = "";
  // создание матрицы-ответа
  for (var i = 0; i < rows1; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols1; j++) {
      tbody.appendChild(tr);
      var td = document.createElement('td');
      td.innerHTML = "<input type='text' class='cell'>";
      td.getElementsByClassName('cell')[0].value = Number(matrixA[i][j]) + Number(matrixB[i][j]);
      tr.appendChild(td);
    }
  }
}

function subMatrix() {
  // это повторяющийся блок кода,  потом его можно заменить на ф-цию
  rows1 = document.getElementsByClassName('sizes-A-rows')[0].value;
  rows2 = document.getElementsByClassName('sizes-B-rows')[0].value;
  cols1 = document.getElementsByClassName('sizes-A-cols')[0].value;
  cols2 = document.getElementsByClassName('sizes-B-cols')[0].value;
  tbody = document.getElementsByClassName('answer-table-body')[0];
  // end
  // получение матрицы - из введенных данных
  var matrixA = getMatrix('matrix-A-body', rows1, cols1);
  var matrixB = getMatrix('matrix-B-body', rows2, cols2);
  // удаление предыдущей таблицы ответов
  var tbody = document.getElementsByClassName('answer-table-body')[0];
  tbody.innerHTML = "";
  // создание матрицы-ответа и слжение в этом же цикле
  for (var i = 0; i < rows1; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols1; j++) {
      tbody.appendChild(tr);
      var td = document.createElement('td');
      td.innerHTML = "<input type='text' class='cell'>";
      td.getElementsByClassName('cell')[0].value = Number(matrixA[i][j]) - Number(matrixB[i][j]);
      tr.appendChild(td);
    }
  }
}


function multiplyMatrix() {
  // это повторяющийся блок кода,  потом его можно заменить на ф-цию
  rows1 = document.getElementsByClassName('sizes-A-rows')[0].value;
  rows2 = document.getElementsByClassName('sizes-B-rows')[0].value;
  cols1 = document.getElementsByClassName('sizes-A-cols')[0].value;
  cols2 = document.getElementsByClassName('sizes-B-cols')[0].value;
  tbody = document.getElementsByClassName('answer-table-body')[0];
  // end
  // получение матрицы - из введенных данных
  var matrixA = getMatrix('matrix-A-body', rows1, cols1);
  var matrixB = getMatrix('matrix-B-body', rows2, cols2);
  var matrixC = new Array(cols2);
  for (var i = 0; i < cols2; i++) {
    matrixC[i] = new Array(rows1);
  }
  // удаление предыдущей матрицы
  var tbody = document.getElementsByClassName('answer-table-body')[0];
  tbody.innerHTML = "";
  /* 
    при умножениии матриц LxM and MxN получится матрица LxN
      т.е число строк в 1 и число столбцов во 2
  */
  // вывод матрицы на экран
  for (var i = 0; i < rows1; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols2; j++) {
      matrixC[i][j] = 0;
      tbody.appendChild(tr);
      var td = document.createElement('td');
      td.innerHTML = "<input type='text' class='cell'>";
      for (var k = 0; k < cols1; k++) {
        matrixC[i][j] += Number(matrixA[i][k]) * Number(matrixB[k][j]);
        td.getElementsByClassName('cell')[0].value = matrixC[i][j];
      }
      tr.appendChild(td);
    }
  }

}


// конвертирует из таблицу в матрицу и возвращает ее
function getMatrix(tbodyName, rows, cols) {
  // можно написать ф-цию созданию нужного массива
  var matrix = new Array(cols);
  for (var i = 0; i < rows; i++) {
    matrix[i] = new Array(rows);
  }
  var cells;
  if (tbodyName == 'matrix-A-body') {
    // получаем все ячейки у нужной матрицы
    cells = document.getElementsByClassName('matrix-A-body')[0].getElementsByClassName('cell');
  } else if (tbodyName == 'matrix-B-body') {
    // получаем все ячейки у нужной матрицы
    cells = document.getElementsByClassName('matrix-B-body')[0].getElementsByClassName('cell');
  }
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      matrix[i][j] = cells[i * cols + j].value;
    }
  }

  return matrix;
}



// при умножениии матриц LxM and MxN получится матрица LxN

function hasErrors() {
  // возможны несколько вызвов alert, можно исправить ифами
  var rows1, rows2, cols1, cols2, action;
  rows1 = document.getElementsByClassName('sizes-A-rows')[0].value;
  rows2 = document.getElementsByClassName('sizes-B-rows')[0].value;
  cols1 = document.getElementsByClassName('sizes-A-cols')[0].value;
  cols2 = document.getElementsByClassName('sizes-B-cols')[0].value;
  action = document.getElementsByClassName('choose-option')[0].value;
  // тут можно обойтись 2 ретурнами
  if (!correctSizes(rows1, cols1, rows2, cols2, action)) return 1;
  else if (!filledCells()) return 1;
  else if (!notTrash()) return 1;
  return 0;
}

function correctSizes(rows1, cols1, rows2, cols2, action) {
  if (action == '+' || action == '-') {
    if (rows1 != rows2 || cols1 != cols2) {
      alert('Размеры матриц не совпадают!1');
      return 0;
    }
  } else if (action == '*') {
    if (cols1 != rows2) {
      alert('Размеры матриц не совпадают!2');
      return 0;
    }
  }
  return 1;
}

function filledCells() {
  //массив ячеек
  var firstMatrixCells = document.getElementsByClassName('matrix')[0].getElementsByClassName('cell');
  var secondMatrixCells = document.getElementsByClassName('matrix')[1].getElementsByClassName('cell');

  for (var i = 0; i < firstMatrixCells.length; i++) {
    if (firstMatrixCells[i].value === "") {
      alert('В матрице А присутствует пустые ячейки!3');
      return 0;
    }
  }

  for (var i = 0; i < secondMatrixCells.length; i++) {
    if (secondMatrixCells[i].value === "") {
      alert('В матрице В присутствует пустые ячейки!4');
      return 0;
    }
  }


  return 1;
}

function notTrash() {
  //массив ячеек
  var firstMatrixCells = document.getElementsByClassName('matrix')[0].getElementsByClassName('cell');
  var secondMatrixCells = document.getElementsByClassName('matrix')[1].getElementsByClassName('cell');

  for (var i = 0; i < firstMatrixCells.length; i++) {
    if (!Number(firstMatrixCells[i].value)) {
      alert('В матрице А присутствует нечисловые значения!5');
      return 0;
    }
  }

  for (var i = 0; i < secondMatrixCells.length; i++) {
    if (!Number(secondMatrixCells[i].value)) {
      alert('В матрице B присутствует нечисловые значения!6');
      return 0;
    }
  }
  return 1;
}