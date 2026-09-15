"use strict";

const categorias = [

    {
        titulo: "Etiquetas Personalizadas",
        descricao: "Organize o material escolar com muito mais estilo.",
        imagem: "assets/images/categorias/etiquetas.webp",
        link: "pages/catalogo.html?categoria=etiquetas",
        destaque: true
    },

    {
        titulo: "Personalizados",
        descricao: "Presentes únicos para momentos especiais.",
        imagem: "assets/images/categorias/personalizados.webp",
        link: "#",
        destaque: false
    },

    {
        titulo: "Escolar",
        descricao: "Tudo para a volta às aulas.",
        imagem: "assets/images/categorias/escolar.webp",
        link: "#",
        destaque: false
    },

    {
        titulo: "Novidades",
        descricao: "Conheça os últimos lançamentos.",
        imagem: "assets/images/categorias/novidades.webp",
        link: "#",
        destaque: false
    }

];

document.addEventListener("DOMContentLoaded", criarCategorias);

function criarCategorias(){

    const grid = document.getElementById("categorias-grid");

    if(!grid) return;

    grid.innerHTML = "";

    categorias.forEach(categoria=>{

        const card = document.createElement("a");

        card.href = categoria.link;

        card.className = categoria.destaque
            ? "categoria-principal"
            : "categoria-card";

        card.innerHTML = `

            <img src="${categoria.imagem}" alt="${categoria.titulo}">

            <div class="categoria-overlay">

                <h3>${categoria.titulo}</h3>

                <p>${categoria.descricao}</p>

                <span>Ver produtos →</span>

            </div>

        `;

        grid.appendChild(card);

    });

}