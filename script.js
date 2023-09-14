var xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
); 
xhr.responseType = "json"; 
xhr.send();
xhr.onload = function () {
  
  var data = xhr.response;
  var div = document.createElement("div");
  div.className = "table-responsive";
  div.id = "paginated-list";
  var Table = document.createElement("table");
  Table.className = "table table-bordered";
  document.body.appendChild(div);
  div.appendChild(Table);
  var headerRow = document.createElement("tr");
  var headercell1 = document.createElement("th");
  var headercell2 = document.createElement("th");
  var headercell3 = document.createElement("th");

  headercell1.innerHTML="ID";
  headercell2.innerHTML="NAME";
  headercell3.innerHTML="MAIL";
    headercell3.className="last-coloumn";
    headercell2.className="mid-coloumn";
    headercell1.className="first-coloumn";

  headerRow.appendChild(headercell1);
  headerRow.appendChild(headercell2);
  headerRow.appendChild(headercell3);

  Table.appendChild(headerRow);

  for (var i = 0; i < data.length; i++) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    cell3.className="last-coloumn";
    cell2.className="mid-coloumn";
    cell1.className="first-coloumn";

    cell1.innerHTML=data[i].id;
    cell2.innerHTML=data[i].name;
    cell3.innerHTML=data[i].email;
    
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    Table.appendChild(row);
  }

  
  var list = document.getElementById("paginated-list").getElementsByTagName("tr");
  var paginationNumber = document.getElementById("pagination-numbers");
  var display = 12;
  var count = 1;
  var buttonCount = Math.ceil(list.length / display);

  for (let i = 1; i <= buttonCount; i++) {
      var button = document.createElement("button");
      button.innerHTML = i;
      paginationNumber.appendChild(button);
  }

  document.getElementById("next-button").addEventListener("click", next);
  document.getElementById("first-button").addEventListener("click", first);
  document.getElementById("last-button").addEventListener("click", last);
  document.getElementById("prev-button").addEventListener("click", prev);
  document.getElementById("prev-button").setAttribute("disabled", true);

  function main(pageNum) {
      var nextPage = display * pageNum;
      var prevPage = display * (pageNum - 1);
      for (let i = 0; i < list.length; i++) {
          list[i].style.display = "none";
          if (i < nextPage && i >= prevPage) {
              list[i].style.display = "block";
          }
      }
  }

  main(1);


  var buttnNumbers = paginationNumber.getElementsByTagName("button");
  for (let i = 0; i < buttnNumbers.length; i++) {
      buttnNumbers[i].addEventListener("click", buttonClick);
  }
  buttnNumbers[count - 1].classList.add("active");

  function buttonClick() {
      buttnNumbers[count - 1].classList.remove("active");
      if (this.innerHTML == buttonCount ) {
          document.getElementById("next-button").setAttribute("disabled", true);
          document.getElementById("prev-button").removeAttribute("disabled");
      }
      else if (this.innerHTML == 1) {
          document.getElementById("prev-button").setAttribute("disabled", true);
          document.getElementById("next-button").removeAttribute("disabled");
      }
      else {
          document.getElementById("next-button").removeAttribute("disabled");
          document.getElementById("prev-button").removeAttribute("disabled");
      }
      count = this.innerHTML;
      main(count);
      this.classList.add("active");
  }

  function next() {
      document.getElementById("prev-button").removeAttribute("disabled");
      if (count !== buttonCount) {
          buttnNumbers[count - 1].classList.remove("active");
          buttnNumbers[count].classList.add("active");
          count++;
      }
      if (count === buttonCount) {
          document.getElementById("next-button").setAttribute("disabled", true);
      }
      main(count);
  }

  function prev() {
      buttnNumbers[count - 1].classList.remove("active");
      buttnNumbers[count - 2].classList.add("active");
      document.getElementById("next-button").removeAttribute("disabled");
      if (count !== 1) {
          count--;
      }
      if (count === 1) {
          document.getElementById("prev-button").setAttribute("disabled", true);
      }
      main(count);
  }
 function first() {
  count = 1;
  buttnNumbers[count - 1].classList.add("active");
  buttnNumbers[buttnNumbers.length - 1].classList.remove("active");
  document.getElementById("prev-button").setAttribute("disabled", true);
  document.getElementById("next-button").removeAttribute("disabled");
  main(count);
}

function last() {
  count = buttonCount;
  buttnNumbers[count - 1].classList.add("active");
  buttnNumbers[0].classList.remove("active");
  document.getElementById("next-button").setAttribute("disabled", true);
  document.getElementById("prev-button").removeAttribute("disabled");
  main(count);
            }

};
