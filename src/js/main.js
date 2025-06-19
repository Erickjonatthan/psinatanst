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
    
    // Funcionalidade de tema escuro
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;
    
    // Verificar preferência salva ou preferência do sistema
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema salvo ou usar preferência do sistema
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
      // Função para alternar o tema
    function toggleTheme() {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            
            // Alternar visibilidade dos ícones
            document.getElementById('light-icon').classList.remove('hidden');
            document.getElementById('light-icon').classList.add('block');
            document.getElementById('dark-icon').classList.add('hidden');
            document.getElementById('dark-icon').classList.remove('block');
            
            if (document.getElementById('light-icon-mobile')) {
                document.getElementById('light-icon-mobile').classList.remove('hidden');
                document.getElementById('light-icon-mobile').classList.add('block');
                document.getElementById('dark-icon-mobile').classList.add('hidden');
                document.getElementById('dark-icon-mobile').classList.remove('block');
            }
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            
            // Alternar visibilidade dos ícones
            document.getElementById('light-icon').classList.add('hidden');
            document.getElementById('light-icon').classList.remove('block');
            document.getElementById('dark-icon').classList.remove('hidden');
            document.getElementById('dark-icon').classList.add('block');
            
            if (document.getElementById('light-icon-mobile')) {
                document.getElementById('light-icon-mobile').classList.add('hidden');
                document.getElementById('light-icon-mobile').classList.remove('block');
                document.getElementById('dark-icon-mobile').classList.remove('hidden');
                document.getElementById('dark-icon-mobile').classList.add('block');
            }
        }
    }
    
    // Adicionar evento de clique aos botões de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
    
    // Atualizar ícones baseado no estado inicial
    function updateIconsVisibility() {
        if (html.classList.contains('dark')) {
            document.getElementById('light-icon').classList.add('hidden');
            document.getElementById('light-icon').classList.remove('block');
            document.getElementById('dark-icon').classList.remove('hidden');
            document.getElementById('dark-icon').classList.add('block');
            
            if (document.getElementById('light-icon-mobile')) {
                document.getElementById('light-icon-mobile').classList.add('hidden');
                document.getElementById('light-icon-mobile').classList.remove('block');
                document.getElementById('dark-icon-mobile').classList.remove('hidden');
                document.getElementById('dark-icon-mobile').classList.add('block');
            }
        } else {
            document.getElementById('light-icon').classList.remove('hidden');
            document.getElementById('light-icon').classList.add('block');
            document.getElementById('dark-icon').classList.add('hidden');
            document.getElementById('dark-icon').classList.remove('block');
            
            if (document.getElementById('light-icon-mobile')) {
                document.getElementById('light-icon-mobile').classList.remove('hidden');
                document.getElementById('light-icon-mobile').classList.add('block');
                document.getElementById('dark-icon-mobile').classList.add('hidden');
                document.getElementById('dark-icon-mobile').classList.remove('block');
            }
        }
    }
    
    // Garantir que os ícones estejam corretamente exibidos na inicialização
    updateIconsVisibility();
    
    // Funcionalidade de ampliação de imagens
    function configurarAmpliacaoImagem(seletor) {
        const imagem = document.querySelector(seletor);
        
        if (imagem) {
            imagem.style.cursor = 'pointer';
            
            imagem.addEventListener('click', function() {
                // Criar overlay para a imagem ampliada
                const overlay = document.createElement('div');
                overlay.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] p-4';
                
                // Criar container da imagem
                const imgContainer = document.createElement('div');
                imgContainer.className = 'relative max-w-4xl w-full';
                
                // Criar a imagem ampliada
                const imgAmpliada = document.createElement('img');
                imgAmpliada.src = this.src;
                imgAmpliada.className = 'max-w-full max-h-[80vh] mx-auto object-contain rounded-lg shadow-2xl';
                
                // Adicionar botão de fechar
                const btnFechar = document.createElement('button');
                btnFechar.className = 'absolute top-2 right-2 bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center';
                btnFechar.innerHTML = '<i class="fas fa-times"></i>';
                btnFechar.onclick = function() {
                    document.body.removeChild(overlay);
                    document.body.classList.remove('overflow-hidden');
                };
                
                // Montar a estrutura
                imgContainer.appendChild(imgAmpliada);
                imgContainer.appendChild(btnFechar);
                overlay.appendChild(imgContainer);
                
                // Adicionar ao body
                document.body.appendChild(overlay);
                document.body.classList.add('overflow-hidden');
                
                // Fechar ao clicar fora da imagem
                overlay.addEventListener('click', function(e) {
                    if (e.target === overlay) {
                        document.body.removeChild(overlay);
                        document.body.classList.remove('overflow-hidden');
                    }
                });
            });
        }
    }
      // Configurar ampliação da imagem na seção Sobre
    configurarAmpliacaoImagem('#sobre img');
    
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
        });    });      // Código do carrossel de fotos removido
      // Efeito de destaque para títulos quando hover nas imagens    // Configurando os efeitos de hover para as imagens com tratamento consistente para modo claro e escuro
    document.querySelectorAll('.image-container').forEach(container => {
        // Certifique-se de que o overlay exista para uma experiência consistente
        const overlay = container.querySelector('.overlay-effect');
        if (!overlay) {
            const newOverlay = document.createElement('div');
            newOverlay.className = 'overlay-effect';
            container.appendChild(newOverlay);
        }
          // Garantir que a animação seja aplicada à imagem
        const profileImage = container.querySelector('.profile-image');
        if (profileImage) {
            // Configurar transição suave em JavaScript também
            const easeOutBack = 'cubic-bezier(0.165, 0.84, 0.44, 1)';
            profileImage.style.willChange = 'transform';
            profileImage.style.transition = `transform 0.5s ${easeOutBack}`;
            profileImage.style.backfaceVisibility = 'hidden'; // Corrige problemas de renderização
            
            // Evitar possíveis transformações anteriores
            setTimeout(() => {
                profileImage.style.transform = 'scale(1)';
            }, 50);
        }
        
        // Adicionar efeito ao passar o mouse
        container.addEventListener('mouseenter', function() {
            // Encontrar o h2 mais próximo na seção
            const section = this.closest('section');
            const h2 = section ? section.querySelector('h2') : null;
            if (h2) h2.classList.add('text-accent');
            
            // Aplicar zoom de forma suave com timeout para garantir que seja processado corretamente
            if (profileImage) {
                requestAnimationFrame(() => {
                    profileImage.style.transform = 'scale(1.05)';
                });
            }
        });
        
        // Remover efeito ao tirar o mouse
        container.addEventListener('mouseleave', function() {
            // Encontrar o h2 mais próximo na seção
            const section = this.closest('section');
            const h2 = section ? section.querySelector('h2') : null;
            if (h2) h2.classList.remove('text-accent');
            
            // Remover efeito de zoom com animação suave
            if (profileImage) {
                requestAnimationFrame(() => {
                    profileImage.style.transform = 'scale(1)';
                });
            }
        });
    });
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
                // Desabilitar o botão durante o processo
                const submitButton = this.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.innerText = 'Redirecionando...';
                
                // Obter os valores do formulário
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;
                const serviceSelect = document.getElementById('service');
                const service = serviceSelect.options[serviceSelect.selectedIndex].text;
                const message = document.getElementById('message').value;
                
                // Construir a mensagem formatada para o WhatsApp
                const whatsappMessage = 
`Olá, sou *${name}*!

*Serviço:* ${service}
*E-mail:* ${email}
*Telefone:* ${phone}

*Mensagem:*
${message}

Gostaria de agendar uma consulta.`;
                
                // Codificar a mensagem para URL
                const encodedMessage = encodeURIComponent(whatsappMessage);
                
                // Construir a URL do WhatsApp
                const whatsappURL = `https://wa.me/5581998138936?text=${encodedMessage}`;
                
                // Exibir mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 text-green-700 p-4 rounded-md mt-4 animate-fade-in';
                successMessage.innerHTML = '<strong>Redirecionando para o WhatsApp!</strong> Uma nova janela será aberta.';
                
                contactForm.insertAdjacentElement('afterend', successMessage);
                
                // Limpar o formulário
                contactForm.reset();
                  // Abrir o WhatsApp em uma nova guia com a mensagem formatada
                // Isso permitirá que o usuário envie uma mensagem pré-formatada diretamente pelo WhatsApp
                window.open(whatsappURL, '_blank');
                
                // Restaurar o botão
                submitButton.disabled = false;
                submitButton.innerText = 'Enviar Mensagem';
                
                // Remover mensagem após alguns segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
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
      // Removida a funcionalidade do botão Voltar ao Topo    // Inicializar AOS (Animate on Scroll)
    AOS.init({
        duration: 800,        // duração da animação em ms
        easing: 'ease-in-out', // tipo de easing
        once: false,          // se true, a animação ocorre apenas uma vez
        mirror: true,         // se true, os elementos são animados ao entrar e sair da tela
        offset: 120,          // offset (em px) a partir do qual os elementos começam a animar
        delay: 0,             // atraso padrão
        anchorPlacement: 'top-bottom', // define qual posição do elemento em relação à janela deve acionar a animação
    });
    
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
    });    // Após 2 segundos, mostrar o WhatsApp com uma animação
    setTimeout(() => {
        const whatsappButton = document.getElementById('whatsapp-fixed');
        if (whatsappButton) {
            whatsappButton.style.opacity = '1';
        }
    }, 2000);
});
