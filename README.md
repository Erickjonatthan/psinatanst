# Landing Page para o Psicólogo Natan Santos

Este projeto é uma landing page moderna, responsiva e otimizada para SEO para o psicólogo Natan Santos, desenvolvida com HTML, CSS (utilizando Tailwind CSS) e JavaScript puro. O site está hospedado em https://psinatanst.com.br/

## Otimização SEO

O site foi otimizado para SEO (Search Engine Optimization) seguindo as melhores práticas:

### Meta Tags e Dados Estruturados
- Title, Description e Keywords otimizados
- Open Graph Tags para redes sociais
- Schema.org para Rich Snippets (LocalBusiness, ProfessionalService e FAQPage)
- Meta tags de geolocalização

### Acessibilidade e UX
- Semântica HTML5 correta com estrutura hierárquica de cabeçalhos
- Breadcrumbs para navegação
- Alt text descritivo em todas as imagens
- Lazy loading para imagens não críticas

### Desempenho
- Preload de recursos críticos
- Lazy loading para CSS não crítico
- Otimização de imagens
- Core Web Vitals melhorados

### Arquivos para Indexação
- robots.txt
- sitemap.xml
- manifest.json para PWA

## Palavras-chave Principais
- Psicólogo Natan Santos
- Psicólogo Online
- Psicólogo Recife
- Psicanálise
- Psicoterapia
- Atendimento Psicológico
- CRP 02/30840
- Ansiedade
- Depressão
- Terapia Online

## Manutenção e Atualização
Para manter o bom posicionamento do site nos buscadores, recomenda-se:

1. Atualizar regularmente o conteúdo
2. Monitorar o desempenho via Google Analytics e Search Console
3. Manter as informações de contato atualizadas
4. Responder às avaliações e comentários online
5. Publicar conteúdos relevantes sobre psicologia e saúde mental

## Estrutura do Projeto

```
psinatanst/
│
├── index.html           # Página principal
├── src/
│   ├── css/
│   │   └── style.css    # Estilos CSS personalizados
│   ├── js/
│   │   └── main.js      # Script JavaScript
│   └── img/            # Imagens do site
└── README.md            # Documentação
```

## Tecnologias Utilizadas

- HTML5
- CSS3 com Tailwind CSS via CDN
- JavaScript puro
- Font Awesome para ícones
- Google Fonts para tipografia

## Recursos e Funcionalidades

- Design responsivo para dispositivos móveis e desktop
- Menu de navegação com versão mobile
- Carrossel de depoimentos
- Seção de FAQ (Perguntas Frequentes) interativa
- Formulário de contato com validação
- Animações de scroll
- Botão "Voltar ao topo"

## Como Executar

1. Clone este repositório:
```
git clone https://github.com/seu-usuario/psinatanst.git
```

2. Abra o arquivo `index.html` em seu navegador.

## Personalização

### Cores

O site utiliza um esquema de cores definido nas configurações do Tailwind no arquivo `index.html`. Para alterá-lo, modifique os valores na seção `tailwind.config`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#4A6FA5',    // Azul principal
                secondary: '#BAD7F2',  // Azul claro
                accent: '#F2C791',     // Laranja/Âmbar
                light: '#F8F8F8',      // Cinza claro
                dark: '#333333'        // Cinza escuro
            }
        }
    }
}
```

### Imagens

Para personalizar as imagens, substitua os arquivos na pasta `src/img/` por suas próprias imagens, mantendo os mesmos nomes de arquivo ou atualizando as referências no HTML.

## Conteúdo

Para personalizar o conteúdo da landing page para outro profissional de psicologia, edite os textos no arquivo `index.html`.

---

Desenvolvido em Junho de 2025
