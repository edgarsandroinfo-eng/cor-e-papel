/**
 * ==========================================================
 * HEADER
 * Troca o menu conforme a página atual
 * ==========================================================
 */

console.log("HEADER CARREGADO");

const menu = document.getElementById("menu-principal");

console.log(menu);

const pagina = window.location.pathname.split("/").pop();

console.log("Página:", pagina);

if (menu) {

    if (pagina === "catalogo.html") {

        console.log("ENTROU NO IF");

        menu.innerHTML = `
            <li><a href="#">Meninas</a></li>
            <li><a href="#">Meninos</a></li>
            <li><a href="#">Personalizados</a></li>
            <li><a href="#">Contato</a></li>
        `;
    }

}