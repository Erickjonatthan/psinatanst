# Sistema de Gerenciamento de Cookies - LGPD Compliant

## Visão Geral

Este sistema implementa um gerenciamento completo de cookies em conformidade com a LGPD (Lei Geral de Proteção de Dados) para o site do Psicólogo Natan Santos.

## Arquivos Adicionados/Modificados

### Novos Arquivos:
- `src/js/cookies.js` - Sistema principal de gerenciamento de cookies
- `politica-privacidade.html` - Página de política de privacidade
- `COOKIES.md` - Esta documentação

### Arquivos Modificados:
- `index.html` - Adicionado script de cookies e link para política de privacidade
- `src/css/style.css` - Adicionados estilos para banner e modal de cookies
- `src/js/analytics.js` - Integração com Google Analytics e consent mode
- `src/js/main.js` - Integração entre cookies e analytics

## Funcionalidades Implementadas

### 1. Banner de Cookies
- Aparece na primeira visita do usuário
- Opções: Aceitar Todos, Rejeitar ou Configurar
- Design responsivo e acessível
- Suporte a modo escuro/claro

### 2. Modal de Preferências
- Gerenciamento granular de tipos de cookies:
  - **Necessários**: Sempre ativos (funcionamento básico)
  - **Preferências**: Configurações do usuário (tema, idioma)
  - **Análise**: Google Analytics e métricas
  - **Marketing**: Publicidade e remarketing
- Toggles individuais para cada categoria
- Descrições claras de cada tipo

### 3. Integração com Google Analytics
- Consent Mode V2 implementado
- Rastreamento condicional baseado no consentimento
- Eventos automáticos:
  - Cliques em links externos
  - Cliques no WhatsApp
  - Profundidade de scroll
  - Tempo na página
  - Envios de formulário

### 4. Persistência de Preferências
- Configurações salvas no localStorage
- Data do consentimento registrada
- Preferências aplicadas automaticamente em visitas futuras

### 5. Interface do Usuário
- Toast notifications para feedback
- Animações suaves e modernas
- Design consistente com o site
- Totalmente responsivo

## Como Usar

### Configuração Inicial

1. **Google Analytics** (quando necessário):
   ```javascript
   // No arquivo analytics.js, descomente e configure:
   window.analyticsManager.init('G-XXXXXXXXXX'); // Seu ID do GA4
   ```

2. **Personalização de Cookies**:
   ```javascript
   // Adicionar novos tipos de cookies no cookies.js:
   this.cookieTypes.novoTipo = {
       name: 'Nome do Tipo',
       description: 'Descrição do que faz',
       required: false,
       enabled: false
   };
   ```

### Uso no Código

1. **Verificar se um tipo de cookie está habilitado**:
   ```javascript
   if (window.cookieManager.isCookieTypeEnabled('analytics')) {
       // Executar código que precisa de analytics
   }
   ```

2. **Rastrear eventos personalizados**:
   ```javascript
   window.trackEvent('acao', 'categoria', 'label', valor);
   ```

3. **Mostrar modal de preferências programaticamente**:
   ```javascript
   window.cookieManager.showPreferencesModal();
   ```

## Conformidade com LGPD

### Princípios Implementados:

1. **Transparência**: 
   - Política de privacidade clara e acessível
   - Descrições detalhadas de cada tipo de cookie

2. **Consentimento**:
   - Opt-in explícito para cookies não essenciais
   - Granularidade na escolha de tipos

3. **Controle do Usuário**:
   - Facilidade para alterar preferências
   - Opção de rejeitar cookies opcionais

4. **Minimização de Dados**:
   - Apenas cookies necessários são obrigatórios
   - Coleta condicional baseada no consentimento

### Dados Armazenados:

- `cookieConsent`: Flag de consentimento
- `cookieConsentDate`: Data do consentimento
- `cookiePreferences`: Preferências específicas de cada tipo
- `theme`: Tema escolhido (apenas se permitido)

## Estrutura do Código

### CookieManager Class
```javascript
class CookieManager {
    constructor()              // Inicialização
    init()                     // Configuração inicial
    createCookieBanner()       // Criar banner
    createCookiePreferencesModal() // Criar modal
    bindEvents()               // Vincular eventos
    saveCookiePreferences()    // Salvar preferências
    applyCookieSettings()      // Aplicar configurações
    // ... outros métodos
}
```

### AnalyticsManager Class
```javascript
class AnalyticsManager {
    init(measurementId)        // Inicializar GA
    trackEvent()               // Rastrear eventos
    updateConsent()            // Atualizar consentimento
    // ... outros métodos
}
```

## Personalização

### Cores e Estilos
Edite `src/css/style.css` na seção "COOKIE BANNER & MODAL STYLES" para personalizar:
- Cores do banner e modal
- Animações
- Espaçamentos
- Responsividade

### Textos e Mensagens
Edite `src/js/cookies.js` para alterar:
- Mensagens do banner
- Descrições dos tipos de cookies
- Textos dos botões
- Notificações toast

### Tipos de Cookies
Adicione novos tipos no objeto `cookieTypes` do `CookieManager`:
```javascript
novoTipo: {
    name: 'Nome Exibido',
    description: 'Descrição clara do propósito',
    required: false, // true para obrigatórios
    enabled: false   // estado padrão
}
```

## Testes

### Verificações Recomendadas:

1. **Funcionalidade Básica**:
   - Banner aparece na primeira visita
   - Preferências são salvas corretamente
   - Modal abre e fecha adequadamente

2. **Integração Analytics**:
   - Eventos são rastreados apenas com consentimento
   - Consent mode funciona corretamente
   - Dados não são enviados quando rejeitado

3. **Responsividade**:
   - Banner funciona em dispositivos móveis
   - Modal é acessível em telas pequenas
   - Botões são clicáveis em touch

4. **Acessibilidade**:
   - Navegação por teclado funciona
   - Screen readers conseguem ler o conteúdo
   - Contraste adequado em modo escuro/claro

## Suporte e Manutenção

### Logs de Debug
O sistema inclui logs para debug. Para habilitá-los, adicione no console:
```javascript
window.cookieManager.debugMode = true;
```

### Atualizações Futuras
- Versões de API do Google Analytics
- Novos tipos de cookies conforme necessário
- Melhorias na interface baseadas no feedback dos usuários

### Backup de Configurações
As preferências são salvas localmente. Para implementar backup em servidor, adicione sincronização no método `saveCookiePreferences()`.

## Créditos e Licença

Sistema desenvolvido para conformidade com LGPD para o site do Psicólogo Natan Santos.
- Framework CSS: Tailwind CSS
- Animações: CSS3 Transitions
- Armazenamento: LocalStorage API
- Analytics: Google Analytics 4 com Consent Mode V2
