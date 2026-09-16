"use strict";

document.addEventListener("DOMContentLoaded", () => {

    carregarHeader();

});

async function carregarHeader(){

    const header = document.querySelector("#header");

    if(!header) return;

    const caminhoHeader = window.location.pathname.includes("/pages/")
        ? "header.html"
        : "pages/header.html";

    try{

        const resposta = await fetch(caminhoHeader);

      header.innerHTML = await resposta.text();

      const estaNaHome = !window.location.pathname.includes("/pages/");
const caminhoBase = estaNaHome ? "" : "../";

// Corrige o link da logomarca para abrir a página inicial
header.querySelectorAll(".logo, #drawerHome").forEach(link => {
    link.href = `${caminhoBase}index.html`;
});

// Corrige o caminho das imagens das logomarcas
header.querySelectorAll(".logo img, #drawerHome img").forEach(img => {
    img.src = `${caminhoBase}assets/images/logo/logo.png`;
});

// Corrige o caminho da imagem dos lápis
const lapis = header.querySelector(".logo-ilustracao");

if (lapis) {
    lapis.src = `${caminhoBase}assets/images/lapis/lapis.png`;
}

    corrigirLinksMenu();

    corrigirLinksDrawer();

    atualizarMenu();

    iniciarMenuMobile();

    atualizarDrawerMobile();

/* AVISA QUE O HEADER TERMINOU DE CARREGAR */
document.dispatchEvent(new Event("headerLoaded"));

    }

    catch(erro){

        console.error("Erro ao carregar o Header.", erro);

    }

}

/**
 * ==========================================================
 * Atualiza o menu conforme a página
 * ==========================================================
 */

function corrigirLinksMenu(){

    const estaNaHome = !window.location.pathname.includes("/pages/");

    const links = document.querySelectorAll("#menu-principal a");

    if(links.length < 5) return;

    if(estaNaHome){

        links[0].href = "index.html";
        links[1].href = "pages/catalogo.html";
        links[3].href = "pages/empresa.html";
        links[4].href = "pages/contato.html";

    }else{

        links[0].href = "../index.html";
        links[1].href = "catalogo.html";
        links[3].href = "empresa.html";
        links[4].href = "contato.html";

    }

}
 /* ==========================================================
 * Corrige os links do Menu Mobile
 * ==========================================================
 */
function corrigirLinksDrawer(){

    const estaNaHome = !window.location.pathname.includes("/pages/");

    const links = document.querySelectorAll("#mobileDrawer nav a");

    const logo = document.getElementById("drawerHome");

    if(links.length < 5) return;

    if(estaNaHome){

        if(logo){
            logo.href = "index.html";
        }

        links[0].href = "index.html";
        links[1].href = "pages/catalogo.html";
        links[3].href = "pages/empresa.html";
        links[4].href = "pages/contato.html";

    }else{

        if(logo){
            logo.href = "../index.html";
        }

        links[0].href = "../index.html";
        links[1].href = "catalogo.html";
        links[3].href = "empresa.html";
        links[4].href = "contato.html";

    }

}

function atualizarMenu(){

    const menu = document.getElementById("menu-principal");

    if(!menu) return;

    const pagina = window.location.pathname.split("/").pop();

    let primeiroItem = "";

    // ======================================================
    // CATÁLOGO
    // ======================================================

    if(pagina === "catalogo.html"){

        primeiroItem = `

            <div class="categoria-selector">

                <button id="btn-meninas" class="categoria-btn active">

                    👧 Meninas

                </button>

                <button id="btn-meninos" class="categoria-btn">

                    👦 Meninos

                </button>

            </div>

        `;

    }

    // ======================================================
    // PRODUTO
    // ======================================================

    if(pagina === "produto.html"){

        primeiroItem = `

            <a href="catalogo.html" class="btn-voltar-catalogo">

                ← Escolher outro modelo

            </a>

        `;

    }

    if(primeiroItem !== ""){

        menu.innerHTML = `

            <li>

                ${primeiroItem}

            </li>

            <li><a href="#">Personalizados</a></li>

            <li><a href="${window.location.pathname.includes("/pages/") ? "contato.html" : "pages/contato.html"}">Contato</a></li>

        `;

    }

}

/**
 * ==========================================================
 * MENU MOBILE
 * ==========================================================
 */

function iniciarMenuMobile(){

    const botao = document.getElementById("menu-toggle");

    const drawer = document.getElementById("mobileDrawer");

    const overlay = document.getElementById("drawerOverlay");

    const fechar = document.getElementById("drawerClose");

    if(!botao || !drawer || !overlay) return;

    botao.addEventListener("click", ()=>{

        drawer.classList.toggle("open");

        overlay.classList.toggle("open");

    });

    overlay.addEventListener("click", ()=>{

        drawer.classList.remove("open");

        overlay.classList.remove("open");

    });

if(fechar){

    fechar.addEventListener("click", ()=>{

        drawer.classList.remove("open");

        overlay.classList.remove("open");

    });

}

} // <-- ESTA CHAVE ESTAVA FALTANDO

/**
 * ==========================================================
 * Atualiza o Menu Mobile conforme a página atual
 * ==========================================================
 */

function atualizarDrawerMobile(){

    const pagina = window.location.pathname.split("/").pop();

    // Caminho correto para o catálogo
    const estaNaHome = !window.location.pathname.includes("/pages/");

    const caminhoCatalogo = estaNaHome
        ? "pages/catalogo.html"
        : "catalogo.html";

    // Apenas catálogo e produto possuem comportamento especial
    if(pagina !== "catalogo.html" && pagina !== "produto.html"){
        return;
    }

    const links = document.querySelectorAll("#mobileDrawer nav a");

    if(links.length < 4){
        return;
    }

    // ======================================================
    // CATÁLOGO
    // ======================================================

    if(pagina === "catalogo.html"){

        // Ajusta os textos
        links[0].querySelector(".menu-icon").textContent = "👧";
        links[0].querySelector(".menu-text").textContent = "Meninas";

        links[1].querySelector(".menu-icon").textContent = "👦";
        links[1].querySelector(".menu-text").textContent = "Meninos";

        links[1].style.display = "flex";

        links[0].href = "#";
        links[1].href = "#";

        links[0].onclick = function(e){

            e.preventDefault();

            filtrarCategoria("meninas");

            document.getElementById("btn-meninas").classList.add("active");
            document.getElementById("btn-meninos").classList.remove("active");

            document.getElementById("mobileDrawer").classList.remove("open");
            document.getElementById("drawerOverlay").classList.remove("open");

        };

        links[1].onclick = function(e){

            e.preventDefault();

            filtrarCategoria("meninos");

            document.getElementById("btn-meninos").classList.add("active");
            document.getElementById("btn-meninas").classList.remove("active");

            document.getElementById("mobileDrawer").classList.remove("open");
            document.getElementById("drawerOverlay").classList.remove("open");

        };

    }

    // ======================================================
    // PRODUTO
    // ======================================================

    if(pagina === "produto.html"){

        links[0].querySelector(".menu-icon").textContent = "⬅️";
        links[0].querySelector(".menu-text").textContent = "Escolher outro modelo";

        links[0].href = caminhoCatalogo;
        links[0].onclick = null;

        // Esconde o segundo item (Meninos)
        links[1].style.display = "none";
        links[1].onclick = null;

    }

}