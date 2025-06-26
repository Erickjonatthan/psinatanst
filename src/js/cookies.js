// Gerenciamento de Cookies - LGPD Compliant
// Sistema de gerenciamento de cookies para conformidade com LGPD

class CookieManager {
    constructor() {
        this.cookieTypes = {
            necessary: {
                name: 'Necessários',
                description: 'Cookies essenciais para o funcionamento básico do site',
                required: true,
                enabled: true
            },
            preferences: {
                name: 'Preferências',
                description: 'Cookies que lembram suas preferências e configurações',
                required: false,
                enabled: false
            },
            analytics: {
                name: 'Análise',
                description: 'Cookies que nos ajudam a entender como você usa o site',
                required: false,
                enabled: false
            },
            marketing: {
                name: 'Marketing',
                description: 'Cookies usados para personalizar anúncios e conteúdo',
                required: false,
                enabled: false
            }
        };

        this.init();
    }    init() {
        this.loadCookiePreferences();
        this.createCookieBanner();
        this.createCookiePreferencesModal();
        this.bindEvents();
        
        // Verificar se o banner deve ser mostrado
        if (!this.hasUserMadeChoice() || this.shouldShowBanner()) {
            this.showCookieBanner();
            this.markBannerShown();
        }
    }

    // Verificar se o usuário já fez uma escolha sobre cookies
    hasUserMadeChoice() {
        return localStorage.getItem('cookieConsent') !== null;
    }

    // Carregar preferências salvas
    loadCookiePreferences() {
        const savedPreferences = localStorage.getItem('cookiePreferences');
        if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            Object.keys(preferences).forEach(type => {
                if (this.cookieTypes[type]) {
                    this.cookieTypes[type].enabled = preferences[type];
                }
            });
        }
    }

    // Salvar preferências de cookies
    saveCookiePreferences() {
        const preferences = {};
        Object.keys(this.cookieTypes).forEach(type => {
            preferences[type] = this.cookieTypes[type].enabled;
        });
        
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
    }

    // Criar banner de cookies
    createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50 p-4 md:p-6';
        banner.style.display = 'none';

        banner.innerHTML = `
            <div class="max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div class="flex-1">                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            🍪 Este site utiliza cookies
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300">
                            Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                            Você pode gerenciar suas preferências de cookies ou aceitar todos para continuar navegando.
                            <span id="cookie-update-notice" class="hidden text-blue-600 dark:text-blue-400 font-medium block mt-1">
                                ℹ️ Atualizamos nossa política de cookies. Por favor, revise suas preferências.
                            </span>
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-2 min-w-fit">
                        <button id="cookie-settings" class="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Configurar
                        </button>
                        <button id="cookie-reject" class="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Rejeitar
                        </button>
                        <button id="cookie-accept-all" class="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Aceitar Todos
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
    }

    // Criar modal de preferências
    createCookiePreferencesModal() {
        const modal = document.createElement('div');
        modal.id = 'cookie-preferences-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        modal.style.display = 'none';

        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-600 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                            Preferências de Cookies
                        </h2>
                        <button id="close-cookie-modal" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="mb-6">
                        <p class="text-gray-600 dark:text-gray-300">
                            Gerenciamos seus dados com responsabilidade. Você pode escolher quais tipos de cookies aceitar. 
                            Cookies necessários são sempre habilitados para garantir o funcionamento básico do site.
                        </p>
                    </div>

                    <div id="cookie-types-list" class="space-y-4 mb-6">
                        <!-- Tipos de cookies serão inseridos aqui -->
                    </div>

                    <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div class="flex flex-col sm:flex-row gap-3 justify-end">
                            <button id="cookie-save-preferences" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Salvar Preferências
                            </button>
                            <button id="cookie-accept-all-modal" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                Aceitar Todos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.populateCookieTypes();
    }

    // Preencher tipos de cookies no modal
    populateCookieTypes() {
        const container = document.getElementById('cookie-types-list');
        
        Object.keys(this.cookieTypes).forEach(type => {
            const cookieType = this.cookieTypes[type];
            const item = document.createElement('div');
            item.className = 'border border-gray-200 dark:border-gray-700 rounded-lg p-4';
            
            item.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                            ${cookieType.name}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            ${cookieType.description}
                        </p>
                        ${cookieType.required ? '<span class="text-xs text-blue-600 dark:text-blue-400">Sempre ativo</span>' : ''}
                    </div>
                    <div class="ml-4">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" 
                                   id="cookie-${type}" 
                                   class="sr-only peer" 
                                   ${cookieType.enabled ? 'checked' : ''}
                                   ${cookieType.required ? 'disabled' : ''}>
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            `;
            
            container.appendChild(item);
        });
    }

    // Vincular eventos
    bindEvents() {
        // Banner events
        document.getElementById('cookie-accept-all')?.addEventListener('click', () => {
            this.acceptAllCookies();
        });

        document.getElementById('cookie-reject')?.addEventListener('click', () => {
            this.rejectAllCookies();
        });

        document.getElementById('cookie-settings')?.addEventListener('click', () => {
            this.showPreferencesModal();
        });

        // Modal events
        document.getElementById('close-cookie-modal')?.addEventListener('click', () => {
            this.hidePreferencesModal();
        });

        document.getElementById('cookie-save-preferences')?.addEventListener('click', () => {
            this.savePreferences();
        });

        document.getElementById('cookie-accept-all-modal')?.addEventListener('click', () => {
            this.acceptAllCookies();
        });

        // Fechar modal ao clicar fora
        document.getElementById('cookie-preferences-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'cookie-preferences-modal') {
                this.hidePreferencesModal();
            }
        });

        // Event listeners para checkboxes
        Object.keys(this.cookieTypes).forEach(type => {
            const checkbox = document.getElementById(`cookie-${type}`);
            if (checkbox && !this.cookieTypes[type].required) {
                checkbox.addEventListener('change', (e) => {
                    this.cookieTypes[type].enabled = e.target.checked;
                });
            }
        });
    }

    // Mostrar banner de cookies
    showCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.display = 'block';
            setTimeout(() => {
                banner.style.opacity = '1';
            }, 100);
        }
    }

    // Esconder banner de cookies
    hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.style.opacity = '0';
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    // Mostrar modal de preferências
    showPreferencesModal() {
        const modal = document.getElementById('cookie-preferences-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Esconder modal de preferências
    hidePreferencesModal() {
        const modal = document.getElementById('cookie-preferences-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Aceitar todos os cookies
    acceptAllCookies() {
        Object.keys(this.cookieTypes).forEach(type => {
            this.cookieTypes[type].enabled = true;
        });
        
        this.saveCookiePreferences();
        this.applyCookieSettings();
        this.hideCookieBanner();
        this.hidePreferencesModal();
        
        this.showToast('Todos os cookies foram aceitos!', 'success');
    }

    // Rejeitar cookies opcionais
    rejectAllCookies() {
        Object.keys(this.cookieTypes).forEach(type => {
            if (!this.cookieTypes[type].required) {
                this.cookieTypes[type].enabled = false;
            }
        });
        
        this.saveCookiePreferences();
        this.applyCookieSettings();
        this.hideCookieBanner();
        
        this.showToast('Apenas cookies necessários foram mantidos.', 'info');
    }

    // Salvar preferências customizadas
    savePreferences() {
        this.saveCookiePreferences();
        this.applyCookieSettings();
        this.hideCookieBanner();
        this.hidePreferencesModal();
        
        this.showToast('Preferências de cookies salvas!', 'success');
    }

    // Aplicar configurações de cookies
    applyCookieSettings() {
        // Analytics
        if (this.cookieTypes.analytics.enabled) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }

        // Marketing/Advertising
        if (this.cookieTypes.marketing.enabled) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }

        // Preferences
        if (this.cookieTypes.preferences.enabled) {
            this.enablePreferences();
        }
    }

    // Habilitar Google Analytics
    enableAnalytics() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    // Desabilitar Analytics
    disableAnalytics() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    // Habilitar Marketing
    enableMarketing() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
            });
        }
    }

    // Desabilitar Marketing
    disableMarketing() {
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
            });
        }
    }

    // Habilitar cookies de preferências
    enablePreferences() {
        // Salvar tema atual se não existir
        if (!localStorage.getItem('theme')) {
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
    }

    // Mostrar toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white shadow-lg transform transition-all duration-300 translate-x-full`;
        
        switch (type) {
            case 'success':
                toast.classList.add('bg-green-600');
                break;
            case 'error':
                toast.classList.add('bg-red-600');
                break;
            case 'warning':
                toast.classList.add('bg-yellow-600');
                break;
            default:
                toast.classList.add('bg-blue-600');
        }
        
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Animação de entrada
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        // Remover após 3 segundos
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Método público para verificar se um tipo de cookie está habilitado
    isCookieTypeEnabled(type) {
        return this.cookieTypes[type] && this.cookieTypes[type].enabled;
    }

    // Método para adicionar link de política de cookies no footer
    addCookiePolicyLink() {
        const footer = document.querySelector('footer');
        if (footer) {
            const cookieLink = document.createElement('button');
            cookieLink.id = 'cookie-policy-link';
            cookieLink.className = 'text-sm text-gray-400 hover:text-gray-300 transition-colors cursor-pointer';
            cookieLink.textContent = 'Política de Cookies';
            cookieLink.addEventListener('click', () => {
                this.showPreferencesModal();
            });
            
            // Adicionar ao final do footer
            const footerContent = footer.querySelector('.text-center');
            if (footerContent) {
                const separator = document.createElement('span');
                separator.textContent = ' | ';
                separator.className = 'text-gray-400';
                
                footerContent.appendChild(separator);
                footerContent.appendChild(cookieLink);
            }
        }
    }

    // Método para verificar se deve mostrar banner baseado em tempo
    shouldShowBanner() {
        const lastShown = localStorage.getItem('cookieBannerLastShown');
        const now = new Date().getTime();
        const sixMonths = 6 * 30 * 24 * 60 * 60 * 1000; // 6 meses em millisegundos
        
        if (!lastShown) return true;
        
        return (now - parseInt(lastShown)) > sixMonths;
    }

    // Método para marcar quando o banner foi mostrado
    markBannerShown() {
        localStorage.setItem('cookieBannerLastShown', new Date().getTime().toString());
    }    // Método público para forçar re-consentimento (útil para atualizações da política)
    requestReConsent() {
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieConsentDate');
        localStorage.removeItem('cookieBannerLastShown');
        this.showCookieBanner();
        
        // Mostrar aviso de atualização
        const updateNotice = document.getElementById('cookie-update-notice');
        if (updateNotice) {
            updateNotice.classList.remove('hidden');
        }
        
        this.showToast('Por favor, revise suas preferências de cookies devido a atualizações em nossa política.', 'warning');
    }

    // Método para exportar configurações (útil para backup)
    exportSettings() {
        const settings = {
            consent: localStorage.getItem('cookieConsent'),
            consentDate: localStorage.getItem('cookieConsentDate'),
            preferences: localStorage.getItem('cookiePreferences'),
            theme: localStorage.getItem('theme'),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(settings, null, 2);
    }

    // Método para importar configurações
    importSettings(settingsJson) {
        try {
            const settings = JSON.parse(settingsJson);
            
            if (settings.consent) localStorage.setItem('cookieConsent', settings.consent);
            if (settings.consentDate) localStorage.setItem('cookieConsentDate', settings.consentDate);
            if (settings.preferences) localStorage.setItem('cookiePreferences', settings.preferences);
            if (settings.theme) localStorage.setItem('theme', settings.theme);
            
            this.loadCookiePreferences();
            this.applyCookieSettings();
            
            this.showToast('Configurações importadas com sucesso!', 'success');
            return true;
        } catch (error) {
            this.showToast('Erro ao importar configurações: ' + error.message, 'error');
            return false;
        }
    }
}

// Inicializar gerenciador de cookies quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    window.cookieManager = new CookieManager();
    
    // Adicionar link de política de cookies no footer
    window.cookieManager.addCookiePolicyLink();
    
    // Log para debug
    console.log('🍪 Sistema de Cookies inicializado');
    console.log('📊 Para debug: window.cookieManager');
    console.log('📈 Para analytics: window.analyticsManager');
});

// Tornar disponível globalmente
window.CookieManager = CookieManager;
