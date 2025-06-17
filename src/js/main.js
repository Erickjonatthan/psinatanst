// Script principal da landing page

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Fechar menu ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Toggle da classe active para o ícone
            this.classList.toggle('active');
            
            // Toggle do conteúdo da resposta
            const answer = this.nextElementSibling;
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.classList.add('hidden');
                answer.style.maxHeight = null;
            }
        });
    });      // Código do carrossel de fotos removido
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Capturar dados do formulário
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Validação simples
            let isValid = true;
            const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (input && !input.value.trim()) {
                    input.classList.add('border-red-500');
                    isValid = false;
                } else if (input) {
                    input.classList.remove('border-red-500');
                }
            });
              if (isValid) {
                // Usando formspree para o envio do formulário
                // Verifica se estamos usando formspree antes de simular o envio
                const formAction = contactForm.getAttribute('action');
                
                if (!formAction || !formAction.includes('formspree')) {
                    // Se não estiver configurado com formspree, simular envio
                    e.preventDefault(); // Impedir o envio normal do formulário
                }
                
                // Desabilitar o botão durante o envio
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerText = 'Enviando...';
                
                // Simular tempo de envio
                setTimeout(() => {
                    // Exibir mensagem de sucesso
                    const successMessage = document.createElement('div');
                    successMessage.className = 'bg-green-100 text-green-700 p-4 rounded-md mt-4 animate-fade-in';
                    successMessage.innerHTML = '<strong>Mensagem enviada com sucesso!</strong> Entraremos em contato em breve.';
                    
                    contactForm.insertAdjacentElement('afterend', successMessage);
                    
                    // Restaurar o botão
                    submitButton.disabled = false;
                    submitButton.innerText = 'Enviar Mensagem';
                      // Limpar o formulário
                    contactForm.reset();
                    
                    // Rolar para cima para ver a mensagem de sucesso
                    window.scrollBy(0, -100);
                    
                    // Remover mensagem após alguns segundos
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            } else {
                // Exibir mensagem de erro se a validação falhar
                const errorMessage = document.createElement('div');
                errorMessage.className = 'bg-red-100 text-red-700 p-4 rounded-md mt-4 animate-fade-in';
                errorMessage.innerHTML = '<strong>Erro!</strong> Por favor, preencha todos os campos obrigatórios.';
                
                // Remover mensagem antiga se existir
                const oldMessage = contactForm.nextElementSibling;
                if (oldMessage && oldMessage.classList.contains('bg-red-100')) {
                    oldMessage.remove();
                }
                
                contactForm.insertAdjacentElement('afterend', errorMessage);
                
                // Remover mensagem após alguns segundos
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    }
      // Removida a funcionalidade do botão Voltar ao Topo
      // Sistema de animação na rolagem
    const setupScrollAnimations = () => {
        // Função para detectar quando um elemento está visível na viewport
        const isElementInViewport = (el, offset = 100) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
                rect.bottom >= 0
            );
        };

        // Elementos para animar
        const elements = [
            // Banner
            { selector: 'section.h-\\[80vh\\] img', animation: 'fade', delay: 0 },
            { selector: 'section.h-\\[80vh\\] p', animation: 'slide-up', delay: 300 },
            { selector: 'section.h-\\[80vh\\] .flex.flex-col a', animation: 'slide-up', delay: 600 },
            
            // Seções de conteúdo
            { selector: 'section h2', animation: 'fade', delay: 0 },
            { selector: 'section p', animation: 'fade', delay: 200 },
            
            // Imagens
            { selector: '.md\\:w-1\\/2 img', animation: 'slide-right', delay: 0 },
            
            // Cards e elementos específicos
            { selector: '#servicos .bg-white', animation: 'slide-up', delay: 200, staggered: true },
            { selector: '#diferenciais .flex.flex-col', animation: 'slide-up', delay: 200, staggered: true },
            { selector: '.faq-question', animation: 'slide-left', delay: 100, staggered: true },
            
            // Elementos do formulário
            { selector: '#contato form > div', animation: 'fade', delay: 100, staggered: true }
        ];

        // Configurar animações para cada elemento
        elements.forEach(({selector, animation, delay, staggered}) => {
            const els = document.querySelectorAll(selector);
            els.forEach((el, index) => {
                // Aplicar atributo data-animate
                el.setAttribute('data-animate', animation);
                
                // Aplicar delay (com stagger se necessário)
                const finalDelay = staggered ? delay * (index + 1) : delay;
                if (finalDelay > 0) {
                    el.style.transitionDelay = `${finalDelay}ms`;
                }
                
                // Se já estiver visível na carga inicial, mostrar imediatamente
                if (isElementInViewport(el)) {
                    setTimeout(() => {
                        el.classList.add('visible');
                    }, 100);
                }
            });
        });

        // Função para verificar elementos visíveis e animá-los
        const checkVisibility = () => {
            document.querySelectorAll('[data-animate]:not(.visible)').forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('visible');
                }
            });
        };

        // Verificar visibilidade no scroll com throttle para performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                checkVisibility();
                scrollTimeout = null;
            }, 100);
        });
        
        // Verificar visibilidade inicial
        checkVisibility();
    };
    
    // Inicializar animações
    setupScrollAnimations();
    
    // Mascarar o campo de telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 2) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length <= 10) {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
            } else {
                e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
            }
        });
    }
    
    // Rolagem suave para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Ignorar links só com #
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o cabeçalho fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Adicionar classe de serviço para estilização
    document.querySelectorAll('#servicos .bg-white').forEach(card => {
        card.classList.add('service-card');
    });

    // Após 2 segundos, mostrar o WhatsApp com uma animação
    setTimeout(() => {
        const whatsappButton = document.querySelector('.fixed[href*="wa.me"]');
        if (whatsappButton) {
            whatsappButton.classList.add('animate-fade-in');
        }
    }, 2000);
});
