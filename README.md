# Leonardo Moreira — Portfólio

Site currículo-portfólio de **Leonardo Moreira Rocha Alves**, desenvolvedor Power Platform e analista de processos.

## Stack

- HTML5, CSS3 (mobile-first, custom properties, grid/flexbox)
- JavaScript vanilla (Canvas 2D para fundo de partículas, IntersectionObserver para reveals e contadores)
- Google Fonts: Sora, Inter, JetBrains Mono
- Sem dependências externas, sem build step

## Estrutura

```
portfolio-leonardo/
├── index.html
├── styles/main.css
├── scripts/main.js
├── assets/
│   ├── foto-perfil.jpg
│   └── favicon.svg
├── .nojekyll
└── README.md
```

## Rodando localmente

Basta servir os arquivos estáticos. Por exemplo:

```bash
# Python 3
python -m http.server 5500

# Node (npx)
npx serve .
```

Depois abra `http://localhost:5500`.

## Deploy no GitHub Pages

1. Crie um repositório no GitHub (ex.: `leonardo-moreira-portfolio` ou `<seu-usuario>.github.io`).
2. Faça o push do conteúdo desta pasta para o branch `main`.
3. No repositório, vá em **Settings → Pages** e selecione o branch `main`, pasta `/ (root)`.
4. Em ~1 minuto o site estará no ar.

O arquivo `.nojekyll` já está incluído para evitar que o Jekyll do GitHub Pages ignore arquivos.

## Acessibilidade & Performance

- Contraste verificado para o tema dark
- `prefers-reduced-motion` desativa animações pesadas
- Imagens com `loading="eager"` (apenas a foto de hero) e `object-fit: cover`
- Fonts com `preconnect` e `display=swap`
