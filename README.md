# Landing Page para Psicólogo

Este projeto é uma landing page moderna e responsiva para um psicólogo, desenvolvida com HTML, CSS (utilizando Tailwind CSS) e JavaScript puro.

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
