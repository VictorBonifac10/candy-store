// --> Imports

import { products } from './data.js'; // precisa do .js no final

// --> AOS Animate

AOS.init();

// --> Numbers Animate

$(document).ready(function () {
    // Seleciona todos os contadores
    const counters = $(".counter-section .count");
    // Cria observer
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const $this = $(entry.target);
                const target = parseInt($this.data("statistics_percent"));
                $this.animateNumber({ number: target }, 4000);
                obs.unobserve(entry.target); // garante que só anima uma vez
            }
        });
    }, { threshold: 0.5 }); // anima quando 50% visível

    counters.each(function () {
        observer.observe(this);
    });
});


const catalog = document.querySelector('.catalog')

products.forEach(element => {

    const flavorOptions = element.flavors.map(flavor => `

        <label class="flex items-center gap-2">
            <input type="radio" name="sabor-${element.name}" value="${flavor}" class="accent-rose-400">
            <span>${flavor}</span>
        </label>
    `).join('');

    catalog.innerHTML += `
                <div
                    class="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all hover:scale-105">
                    <img src="${element.src}" alt="Doce 1" class="w-full h-40 object-cover">
                    <div class="p-4 flex flex-col justify-between flex-grow">
                        <h3 class="font-lobster not-first:text-xl font-bold text-rose-400 mb-2">${element.name}</h3>
                        <form class="flex flex-col space-y-2">
                        ${flavorOptions}
                        </form>
                        <div class="flex justify-between items-center mt-auto gap-4">
                            <button
                                class="flex items-center justify-center w-12 h-12 bg-rose-400 text-white hover:bg-rose-500 rounded-full">
                                <i class="ri-whatsapp-fill text-2xl"></i>
                            </button>
                            <button
                                class="flex items-center justify-center w-12 h-12 bg-gray-200 text-rose-400 hover:bg-gray-300 rounded-full">
                                <i class="ri-shopping-cart-fill text-2xl"></i>
                            </button>
                        </div>
                    </div>
                </div>

`
});



