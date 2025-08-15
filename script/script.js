const imgHeader = document.querySelector('#img-header');
const imgHeaderCustom = document.querySelector('#img-bg');
const mask = document.querySelector('.mask');

function mudarVisual(novaImagem, novaCor, imgFundo) {
    // começa fade out
    imgHeader.classList.remove('opacity-100');
    imgHeader.classList.add('opacity-0');
    imgHeaderCustom.classList.remove('opacity-100');
    imgHeaderCustom.classList.add('opacity-0');

    // troca a imagem **meio fade**, para o efeito contínuo
    setTimeout(() => {
        imgHeader.src = novaImagem;
        imgHeaderCustom.src = imgFundo;
        // fade in
        imgHeader.classList.remove('opacity-0');
        imgHeader.classList.add('opacity-100');
        imgHeaderCustom.classList.remove('opacity-0');
        imgHeaderCustom.classList.add('opacity-100');

    }, 500); // metade da duração da animação

    mask.style.background = novaCor;
}
