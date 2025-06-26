// Arquivo para Google Tag Manager e Analytics
// Sistema de Analytics com conformidade LGPD

// Configuração inicial do Google Analytics com consent mode
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Configurar consent mode antes de carregar o GA
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
});

// Configurar Google Analytics
gtag('js', new Date());

// Analytics Manager Class
class AnalyticsManager {
    constructor() {
        this.gaId = null; // Adicione seu GA4 ID aqui quando disponível
        this.isInitialized = false;
        this.events = [];
    }

    // Inicializar Google Analytics
    init(measurementId) {
        if (!measurementId || this.isInitialized) return;
        
        this.gaId = measurementId;
        
        // Carregar script do Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${G-MD7K2BNFSS}`;
        document.head.appendChild(script);
        
        script.onload = () => {
            gtag('config', measurementId, {
                'anonymize_ip': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false
            });
            this.isInitialized = true;
            
            // Processar eventos em fila
            this.processQueuedEvents();
        };
    }

    // Processar eventos que foram enfileirados antes da inicialização
    processQueuedEvents() {
        this.events.forEach(event => {
            this.trackEvent(event.action, event.category, event.label, event.value);
        });
        this.events = [];
    }

    // Verificar se analytics está habilitado
    isAnalyticsEnabled() {
        return window.cookieManager && window.cookieManager.isCookieTypeEnabled('analytics');
    }

    // Rastrear evento
    trackEvent(action, category = 'General', label = null, value = null) {
        if (!this.isAnalyticsEnabled()) {
            console.log('Analytics tracking skipped - cookies not accepted');
            return;
        }

        if (!this.isInitialized) {
            // Enfileirar evento para processar depois
            this.events.push({ action, category, label, value });
            return;
        }

        const eventData = {
            'event_category': category,
            'event_label': label,
            'value': value
        };

        // Remover propriedades null/undefined
        Object.keys(eventData).forEach(key => {
            if (eventData[key] === null || eventData[key] === undefined) {
                delete eventData[key];
            }
        });

        gtag('event', action, eventData);
    }

    // Rastrear visualização de página
    trackPageView(pagePath = null) {
        if (!this.isAnalyticsEnabled() || !this.isInitialized) return;

        gtag('event', 'page_view', {
            'page_location': window.location.href,
            'page_path': pagePath || window.location.pathname,
            'page_title': document.title
        });
    }

    // Rastrear clique em link externo
    trackExternalLink(url, linkText = null) {
        this.trackEvent('click', 'External Link', linkText || url);
    }

    // Rastrear envio de formulário
    trackFormSubmission(formName, success = true) {
        this.trackEvent(success ? 'form_submit_success' : 'form_submit_error', 'Form', formName);
    }

    // Rastrear clique no WhatsApp
    trackWhatsAppClick() {
        this.trackEvent('whatsapp_click', 'Contact', 'WhatsApp Button');
    }

    // Rastrear tempo na página (chamado quando o usuário sai)
    trackTimeOnPage() {
        if (!this.isAnalyticsEnabled()) return;

        const timeOnPage = Math.round((Date.now() - window.pageLoadTime) / 1000);
        
        if (timeOnPage > 10) { // Só rastrear se ficou mais de 10 segundos
            this.trackEvent('time_on_page', 'Engagement', null, timeOnPage);
        }
    }

    // Rastrear scroll depth
    trackScrollDepth(percentage) {
        if (!this.isAnalyticsEnabled()) return;
        
        this.trackEvent('scroll_depth', 'Engagement', `${percentage}%`, percentage);
    }

    // Atualizar consent quando cookies são aceitos/rejeitados
    updateConsent(analyticsEnabled, marketingEnabled = false) {
        gtag('consent', 'update', {
            'analytics_storage': analyticsEnabled ? 'granted' : 'denied',
            'ad_storage': marketingEnabled ? 'granted' : 'denied',
            'ad_user_data': marketingEnabled ? 'granted' : 'denied',
            'ad_personalization': marketingEnabled ? 'granted' : 'denied'
        });

        // Se analytics foi habilitado e ainda não inicializamos, inicializar agora
        if (analyticsEnabled && !this.isInitialized && this.gaId) {
            this.init(this.gaId);
        }
    }
}

// Instância global do analytics
window.analyticsManager = new AnalyticsManager();

// Configurar eventos automáticos quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Registrar tempo de carregamento da página
    window.pageLoadTime = Date.now();

    // Rastrear cliques em links externos
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.hostname !== window.location.hostname) {
            window.analyticsManager.trackExternalLink(link.href, link.textContent.trim());
        }
    });

    // Rastrear cliques no botão do WhatsApp
    const whatsappButtons = document.querySelectorAll('a[href*="whatsapp"], a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.analyticsManager.trackWhatsAppClick();
        });
    });

    // Rastrear profundidade de scroll
    let maxScrollDepth = 0;
    const scrollDepthThresholds = [25, 50, 75, 90];
    let trackedThresholds = [];

    window.addEventListener('scroll', function() {
        const scrollPercentage = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercentage > maxScrollDepth) {
            maxScrollDepth = scrollPercentage;
        }

        scrollDepthThresholds.forEach(threshold => {
            if (scrollPercentage >= threshold && !trackedThresholds.includes(threshold)) {
                trackedThresholds.push(threshold);
                window.analyticsManager.trackScrollDepth(threshold);
            }
        });
    });

    // Rastrear tempo na página quando o usuário sair
    window.addEventListener('beforeunload', function() {
        window.analyticsManager.trackTimeOnPage();
    });

    // Também rastrear quando a página fica inativa (mudança de aba)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            window.analyticsManager.trackTimeOnPage();
        }
    });
});

// Integração com o sistema de cookies
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar o cookie manager estar disponível
    const checkCookieManager = setInterval(() => {
        if (window.cookieManager) {
            clearInterval(checkCookieManager);
            
            // Verificar se analytics já está permitido
            if (window.cookieManager.isCookieTypeEnabled('analytics')) {
                // Atualizar consent e inicializar se necessário
                window.analyticsManager.updateConsent(true, window.cookieManager.isCookieTypeEnabled('marketing'));
                
                // Inicializar com ID do GA4 quando disponível
                window.analyticsManager.init('G-MD7K2BNFSS'); // Descomente e adicione seu ID
            }
        }
    }, 100);
});

// Função para ser chamada quando as preferências de cookies mudarem
window.updateAnalyticsConsent = function() {
    if (window.cookieManager && window.analyticsManager) {
        const analyticsEnabled = window.cookieManager.isCookieTypeEnabled('analytics');
        const marketingEnabled = window.cookieManager.isCookieTypeEnabled('marketing');
        
        window.analyticsManager.updateConsent(analyticsEnabled, marketingEnabled);
    }
};

// Expor funções úteis globalmente
window.trackEvent = (action, category, label, value) => {
    window.analyticsManager.trackEvent(action, category, label, value);
};

window.trackPageView = (pagePath) => {
    window.analyticsManager.trackPageView(pagePath);
};
