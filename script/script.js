const imgHeader = document.querySelector('#img-header');
const mask = document.querySelector('.mask');

function mudarVisual(novaImagem, novaCor) {
    // começa fade out
    imgHeader.classList.remove('opacity-100');
    imgHeader.classList.add('opacity-0');

    // troca a imagem **meio fade**, para o efeito contínuo
    setTimeout(() => {
        imgHeader.src = novaImagem;
        // fade in
        imgHeader.classList.remove('opacity-0');
        imgHeader.classList.add('opacity-100');
    }, 500); // metade da duração da animação
    
    mask.style.background = novaCor;
}
