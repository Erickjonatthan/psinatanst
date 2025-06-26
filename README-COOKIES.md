# 🍪 Sistema de Cookies - Guia de Uso

## ✅ O que foi implementado

### Sistema Completo de Gerenciamento de Cookies LGPD-Compliant:

1. **Banner de Cookies Responsivo**
   - Aparece automaticamente na primeira visita
   - Design moderno e acessível 
   - Suporte completo a modo escuro/claro
   - Botões: Aceitar Todos, Rejeitar, Configurar

2. **Modal de Preferências Granulares**
   - 4 tipos de cookies configuráveis:
     - 🔒 **Necessários** (sempre ativos)
     - ⚙️ **Preferências** (tema, configurações)
     - 📊 **Análise** (Google Analytics)
     - 📢 **Marketing** (publicidade)
   - Toggles individuais com descrições claras

3. **Integração Google Analytics**
   - Consent Mode V2 implementado
   - Rastreamento condicional
   - Eventos automáticos: scroll, cliques, tempo na página

4. **Política de Privacidade Completa**
   - Página dedicada (`politica-privacidade.html`)
   - Explicação detalhada sobre uso de dados
   - Conformidade total com LGPD

## 🚀 Como testar

### 1. Teste Básico
```
1. Abra o arquivo index.html
2. O banner deve aparecer na primeira visita
3. Teste as opções: Aceitar, Rejeitar, Configurar
4. Verifique se as preferências são salvas
```

### 2. Teste Avançado
```
1. Abra teste-cookies.html
2. Use os botões de controle para testar funcionalidades
3. Verifique o status em tempo real
4. Teste reset e re-consentimento
```

### 3. Teste de Integração
```
1. Configure Google Analytics (veja instruções abaixo)
2. Teste rastreamento com cookies aceitos/rejeitados
3. Verifique console do navegador para eventos
```

## 🔧 Configuração

### Google Analytics (Opcional)
```javascript
// No arquivo src/js/analytics.js, linha ~45, descomente:
window.analyticsManager.init('G-SEU-ID-AQUI');
```

### Personalização de Textos
```javascript
// No arquivo src/js/cookies.js, procure por:
banner.innerHTML = `...` // Para alterar textos do banner
modal.innerHTML = `...`  // Para alterar textos do modal
```

### Novos Tipos de Cookies
```javascript
// Adicione no objeto cookieTypes:
novoTipo: {
    name: 'Nome do Tipo',
    description: 'Descrição clara',
    required: false,
    enabled: false
}
```

## 📱 Funcionalidades Principais

### ✅ Implementadas:
- [x] Banner responsivo com animações
- [x] Modal de preferências granulares
- [x] Persistência de configurações
- [x] Integração Google Analytics + Consent Mode
- [x] Toast notifications
- [x] Política de privacidade completa
- [x] Re-consentimento automático (6 meses)
- [x] Suporte a modo escuro/claro
- [x] Totalmente responsivo
- [x] Acessibilidade (WCAG)
- [x] Conformidade LGPD
- [x] Página de teste incluída

### 🎯 Principais Métodos de Uso:

```javascript
// Verificar se tipo de cookie está ativo
window.cookieManager.isCookieTypeEnabled('analytics')

// Abrir modal de preferências
window.cookieManager.showPreferencesModal()

// Forçar re-consentimento
window.cookieManager.requestReConsent()

// Rastrear evento customizado
window.trackEvent('acao', 'categoria', 'label', valor)

// Exportar/Importar configurações
const config = window.cookieManager.exportSettings()
window.cookieManager.importSettings(config)
```

## 🗂️ Arquivos do Sistema

```
📁 Sistema de Cookies
├── 📄 src/js/cookies.js       # Sistema principal
├── 📄 src/js/analytics.js     # Integração Analytics
├── 📄 src/css/style.css       # Estilos (seção cookies)
├── 📄 politica-privacidade.html # Política LGPD
├── 📄 teste-cookies.html      # Página de testes
├── 📄 COOKIES.md             # Documentação técnica
└── 📄 README-COOKIES.md      # Este guia
```

## 🔍 Dados Armazenados

O sistema armazena apenas no **localStorage** do navegador:

```javascript
{
  "cookieConsent": "true",
  "cookieConsentDate": "2025-06-25T...",
  "cookiePreferences": {
    "necessary": true,
    "preferences": true,
    "analytics": false,
    "marketing": false
  },
  "theme": "light",
  "cookieBannerLastShown": "1719331200000"
}
```

## 🛡️ Conformidade LGPD

### ✅ Princípios Atendidos:
- **Transparência**: Política clara e acessível
- **Consentimento**: Opt-in explícito para não-essenciais
- **Controle**: Fácil alteração de preferências
- **Minimização**: Apenas dados necessários
- **Finalidade**: Uso específico e declarado

### 📋 Direitos do Usuário:
- Aceitar/rejeitar cookies opcionais
- Alterar preferências a qualquer momento
- Revogar consentimento facilmente
- Acessar política de privacidade
- Exportar suas configurações

## 🎨 Design e UX

- **Cores**: Integradas com o design do site
- **Animações**: Suaves e profissionais
- **Responsivo**: Funciona em todos os dispositivos
- **Acessível**: Navegação por teclado e screen readers
- **Performance**: Carregamento otimizado

## 🚀 Próximos Passos

1. **Testar o sistema** usando os arquivos fornecidos
2. **Configurar Google Analytics** se necessário
3. **Personalizar textos** conforme sua preferência
4. **Fazer deploy** para produção
5. **Monitorar** funcionamento e feedback dos usuários

## 📞 Suporte

Para dúvidas ou problemas:
- Consulte `COOKIES.md` para detalhes técnicos
- Use `teste-cookies.html` para debug
- Verifique console do navegador para logs
- Teste em diferentes dispositivos e navegadores

---

**✅ Sistema totalmente funcional e pronto para uso!**

O sistema está implementado e testado, seguindo as melhores práticas de UX, acessibilidade e conformidade legal. 🎉
