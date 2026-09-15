"use strict";

// ==========================================================
// DADOS DO PRODUTO
// ==========================================================

const parametros = new URLSearchParams(window.location.search);
const codigo = parametros.get("codigo");
console.log(codigo);
const produto = produtos.find(p => p.codigo === codigo);

if (!produto) {

    window.location.href = "catalogo.html";

}

// ==========================================================
// ELEMENTOS
// ==========================================================

const imagem = document.getElementById("produto-img");
const titulo = document.getElementById("produto-codigo");
const botao = document.getElementById("btn-whatsapp");

// ==========================================================
// PREENCHER PÁGINA
// ==========================================================

titulo.textContent = produto.nome;

document.getElementById("codigo-card").textContent =
    produto.nome.replace("Modelo ", "");

document.getElementById("codigo-interno").textContent =
    `Código interno: ${produto.codigo}`;

imagem.src = `../assets/images/etiquetas/${produto.publico}/${produto.imagem}`;

imagem.alt = produto.nome;

botao.href =
`https://wa.me/5527995829817?text=Olá! Gostaria de fazer um orçamento do Kit de Etiquetas ${produto.nome}. (Código ${produto.codigo})`;

// ==========================================================
// ZOOM DA IMAGEM
// ==========================================================

const zoom = document.querySelector(".zoom-container");

// ==========================================================
// DESKTOP
// ==========================================================

if(window.innerWidth > 768){

    zoom.addEventListener("mousemove", (e)=>{

        const rect = zoom.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;

        const y = ((e.clientY - rect.top) / rect.height) * 100;

        imagem.style.transformOrigin = `${x}% ${y}%`;

        imagem.style.transform = "scale(3)";

    });

    zoom.addEventListener("mouseleave", ()=>{

        imagem.style.transformOrigin = "center";

        imagem.style.transform = "scale(1)";

    });

}

// ==========================================================
// MOBILE
// ==========================================================

else{

    let escala = 1;

    let inicioDistancia = 0;

    let posX = 0;
    let posY = 0;

    let inicioX = 0;
    let inicioY = 0;

    let arrastando = false;

    const MAX_ZOOM = 4;

    function distancia(t1,t2){

        const dx = t2.clientX - t1.clientX;

        const dy = t2.clientY - t1.clientY;

        return Math.sqrt(dx*dx + dy*dy);

    }

    function atualizar(){

        imagem.style.transform =
            `translate(${posX}px, ${posY}px) scale(${escala})`;

    }

    zoom.addEventListener("touchstart",(e)=>{

        if(e.touches.length===2){

            inicioDistancia = distancia(
                e.touches[0],
                e.touches[1]
            );

        }

        if(e.touches.length===1 && escala>1){

            arrastando = true;

            inicioX = e.touches[0].clientX - posX;

            inicioY = e.touches[0].clientY - posY;

        }

    },{passive:false});

    zoom.addEventListener("touchmove",(e)=>{

        e.preventDefault();

        // PINCH

        if(e.touches.length===2){

            const novaDistancia = distancia(
                e.touches[0],
                e.touches[1]
            );

            const fator = novaDistancia / inicioDistancia;

            escala *= fator;

            if(escala < 1){

                escala = 1;

            }

            if(escala > MAX_ZOOM){

                escala = MAX_ZOOM;

            }

            inicioDistancia = novaDistancia;

            atualizar();

        }

        // ARRASTAR

        if(e.touches.length===1 && arrastando){

            posX = e.touches[0].clientX - inicioX;

            posY = e.touches[0].clientY - inicioY;

            atualizar();

        }

    },{passive:false});

    zoom.addEventListener("touchend",()=>{

        arrastando = false;

        if(escala <= 1){

            escala = 1;

            posX = 0;

            posY = 0;

            atualizar();

        }

    });

}