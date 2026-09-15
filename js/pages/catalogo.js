/**
 * ==========================================================
 * Projeto.....: Cor & Papel
 * Arquivo.....: catalogo.js
 * ----------------------------------------------------------
 * Catálogo de Kits
 * ==========================================================
 */

"use strict";


/* ==========================================================
   CRIA O CATÁLOGO
========================================================== */

function criarCatalogo() {

 console.log("CRIAR CATÁLOGO EXECUTOU");

    const kitGrid = document.getElementById("kit-grid");

        console.log(kitGrid);

    produtos.forEach((produto) => {

        kitGrid.innerHTML += `

            <article class="kit-card ${produto.publico}">

                <a href="produto.html?codigo=${produto.codigo}">

                    <div class="kit-image">

                        <img
                            src="../assets/images/etiquetas/${produto.publico}/${produto.imagem}"
                            alt="${produto.nome}"

                    </div>

                    <div class="kit-info">


    <h2>${produto.nome}</h2>

    <div class="kit-link">

        Ver detalhes →

    </div>

</div>


                </a>

            </article>

        `;

    });

}



/* ==========================================================
   FILTRO POR CATEGORIA
========================================================== */

function filtrarCategoria(categoria){

    const cards = document.querySelectorAll(".kit-card");

    cards.forEach(card=>{

        if(card.classList.contains(categoria)){

            card.style.display="";

        }else{

            card.style.display="none";

        }

    });

}


function iniciarFiltro(){

    const btnMeninas = document.getElementById("btn-meninas");
    const btnMeninos = document.getElementById("btn-meninos");

    if(btnMeninas){

        btnMeninas.addEventListener("click", function(e){

            e.preventDefault();

            const url = new URLSearchParams(window.location.search);

const categoria = url.get("categoria");

if(categoria === "meninos"){

    filtrarCategoria("meninos");

    btnMeninos.classList.add("active");
    btnMeninas.classList.remove("active");

}else{const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");

if (categoria === "meninos") {

    filtrarCategoria("meninos");

    btnMeninos.classList.add("active");
    btnMeninas.classList.remove("active");

} else {

    filtrarCategoria("meninas");

    btnMeninas.classList.add("active");
    btnMeninos.classList.remove("active");

}
}

return;

                     btnMeninas.classList.add("active");
            btnMeninos.classList.remove("active");

        });

    }

    if(btnMeninos){

        btnMeninos.addEventListener("click", function(e){

            e.preventDefault();

            filtrarCategoria("meninos");

            btnMeninos.classList.add("active");
            btnMeninas.classList.remove("active");

        });

    }

    filtrarCategoria("meninas");

}


/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

document.addEventListener("headerLoaded", ()=>{

    criarCatalogo();

    iniciarFiltro();

});

document.addEventListener("click", function(e){

    if(e.target.id === "btn-meninas"){

        e.preventDefault();

        filtrarCategoria("meninas");

        document.getElementById("btn-meninas").classList.add("active");
        document.getElementById("btn-meninos").classList.remove("active");

    }

    if(e.target.id === "btn-meninos"){

        e.preventDefault();

        filtrarCategoria("meninos");

        document.getElementById("btn-meninos").classList.add("active");
        document.getElementById("btn-meninas").classList.remove("active");

    }

});