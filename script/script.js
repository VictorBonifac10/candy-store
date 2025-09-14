// --> Imports

import { products } from './data.js'; // precisa do .js no final

// --> AOS Animate

AOS.init();

// --> Numbers Animate

$(document).ready(function () {
    const counters = $(".counter-section .count");
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $this = $(entry.target);
                const target = parseInt($this.data("statistics_percent"));
                $this.animateNumber({ number: target }, 4000);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.each(function () {
        observer.observe(this);
    });
});

// --> Catalog

const catalog = document.querySelector('.catalog');
const productsCart = document.querySelector('.productsCart'); // <ul> ou <div> do carrinho
const totalElement = document.querySelector('.total');

// --> Função (Atualiza o total do carrinho )

const updateCartTotal = () => {
    const items = Array.from(productsCart.querySelectorAll('li'));

    const total = items.reduce((acc, li) => {
        const priceText = li.querySelector('p.font-lobster.text-rose-400').textContent;
        const priceNumber = Number(priceText.replace(/[R$\.\s]/g, '').replace(',', '.'));
        return acc + priceNumber;
    }, 0);

    totalElement.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --> Exibe os itens do catalogo no HTML

const product = document.createElement('div');
product.classList.add('h-full'); // --> garante que o wrapper ocupe a célula da grid

products.forEach((element) => {
    const flavorOptions = element.flavors.map(flavor => `
        <label class="sabor flex items-center gap-2">
            <input type="radio" name="sabor-${element.name}" value="${flavor}" class="accent-rose-400">
            <span>${flavor}</span>
        </label>
    `).join('');

    const product = document.createElement('div');
    product.innerHTML += `
<div class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between h-full transition-all hover:scale-105">
            <img src="${element.src}" alt="Doce 1" class="w-full h-40 object-cover">
            <div class="p-4 flex flex-col justify-between flex-grow">
                <h3 class="font-lobster not-first:text-xl font-bold text-rose-400 mb-2">${element.name}</h3>
                <form class="flex flex-col space-y-2">
                    ${flavorOptions}
                </form>
                <div class="flex justify-between items-center mt-auto gap-4">
                    <button class="whatsApp flex items-center justify-center w-12 h-12 bg-rose-400 text-white hover:bg-rose-500 rounded-full">
                        <i class="ri-whatsapp-fill text-2xl"></i>
                    </button>
                    <button class="addCart flex items-center justify-center w-12 h-12 bg-gray-200 text-rose-400 hover:bg-gray-300 rounded-full">
                        <i class="ri-shopping-cart-fill text-2xl"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    product.querySelector('.addCart').addEventListener('click', () => {
        const form = product.querySelector('form');
        const selectedFlavor = form.querySelector('input[type="radio"]:checked');

        // --> Alert (Deve ser selecionado um valor)
        if (!selectedFlavor) return alert('Selecione um sabor!');

        // --> Adiciona os itens selecionados no carrinho de compras        

        const li = document.createElement('li');
        li.className = "flex flex-col gap-3 items-center justify-center text-center w-full px-3 py-2";

        li.innerHTML = `
            <div class="flex items-center justify-center text-center w-full">
                <img class="rounded-full" src="${element.src}" width="50px" height="50px" alt="Produto Carrinho">
                <p class="flex-1 text-center m-0">${element.name} (${selectedFlavor.value})</p>
                <p class="font-lobster text-rose-400 m-0">${element.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>
            <div class="flex items-center gap-3 justify-between text-center w-full">
                <p class="font-lobster m-0 text-lg text-gray-400">Quantidade: </p>
                <div class="quantidade flex items-center gap-1">
                    <button class="less flex items-center justify-center rounded-full bg-rose-400 hover:bg-rose-600 text-white w-5 h-5">-</button>
                    <input class="countNumberInput w-[30px] border-1 border-gray-400 rounded-lg text-center font-light text-gray-400" type="text" value="1">
                    <button class="more flex items-center justify-center rounded-full bg-rose-400 hover:bg-rose-600 text-white w-5 h-5">+</button>
                    <button class="delete text-gray-400 hover:text-gray-500">
                        <i class="ri-delete-bin-7-fill"></i>
                    </button>
                </div>
            </div>
        `;

        productsCart.appendChild(li);
        updateCartTotal();

        // --> Counter Cart

        const cartCounter = document.querySelector('.cart-counter');

        const updateCartCounter = () => {
            const productsCart = document.querySelector('.productsCart');
            const totalItems = productsCart.querySelectorAll('li').length;
            cartCounter.textContent = totalItems;
        };

        updateCartCounter();

        const input = li.querySelector('.countNumberInput');
        let countNumber = 1;
        const priceElement = li.querySelector('p.font-lobster.text-rose-400');

        // --> Função (multiplica o valor do item pela quantidade no input)

        const updatePrice = () => {
            priceElement.textContent = (element.price * countNumber).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        };

        // --> More Button

        li.querySelector('.more').addEventListener('click', () => {
            countNumber++;
            input.value = countNumber;
            updatePrice();
            updateCartTotal();
        });

        // --> Less Button

        li.querySelector('.less').addEventListener('click', () => {
            if (countNumber > 1) {
                countNumber--;
                input.value = countNumber;
                updatePrice();
                updateCartTotal();
            }
        });

        // --> Delete Button

        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            updateCartTotal();
            updateCartCounter();
        });

        // --> Shop Button

        const shopButton = document.querySelector('.buy').addEventListener('click', () => {
            const items = productsCart.querySelectorAll('li');

            if (items.length > 0) {
                alert("Parabéns! Sua compra foi realizada com sucesso!");
                productsCart.innerHTML = ""; //-->  esvazia o carrinho
                updateCartTotal(); // --> atualiza o total para zerar
                updateCartCounter(); // --> atualiza o counter
            }
        });
    });

    // --> Whatsapp Button

    product.querySelector('.whatsApp').addEventListener('click', () => {
        alert('WhatsApp indisponível no momento!');
    });

    catalog.appendChild(product);
});