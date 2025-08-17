 $(document).ready(function() {
            // Seleciona todos os contadores
            const counters = $(".counter-section .count");

            // Cria observer
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        const $this = $(entry.target);
                        const target = parseInt($this.data("statistics_percent"));
                        $this.animateNumber({ number: target }, 4000);
                        obs.unobserve(entry.target); // garante que só anima uma vez
                    }
                });
            }, { threshold: 0.5 }); // anima quando 50% visível

            counters.each(function() {
                observer.observe(this);
            });
        });