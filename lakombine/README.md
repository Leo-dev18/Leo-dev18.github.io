# La Kombine — site institucional

Site one-page da **La Kombine**, cabine fotográfica em Kombi retrô, totem retrô e
totem moderno para casamentos, festas e eventos corporativos.

🔗 **No ar em:** https://lakombine.com.br/
📷 **Instagram:** [@la.kombine](https://www.instagram.com/la.kombine)

---

## O que precisa ser trocado antes de divulgar

O WhatsApp já está aplicado. Faltam as fotos e a revisão dos depoimentos/afirmações.

### 1. ~~Número do WhatsApp~~ ✅ feito

O número real (`+55 11 91526-9335` → `5511915269335`) já está nos 3 lugares:
os dois links `wa.me` e o campo `telephone` do JSON-LD. Se mudar de número,
troque nos três — um `sed 's/5511915269335/NOVO/g' index.html` resolve.

### 2. Fotos

Todo espaço de imagem é um `<div class="ph" data-slot="assets/nome.jpg">`.
O atributo `data-slot` diz **qual arquivo aquele espaço espera**. Para publicar uma foto real,
troque a `div` inteira por uma `img`:

```html
<!-- antes -->
<div class="ph" data-slot="assets/exp-kombi.jpg" data-label="Kombi Retrô"></div>

<!-- depois -->
<img src="assets/exp-kombi.jpg" alt="Kombi retrô montada em um casamento ao ar livre" loading="lazy" />
```

Arquivos esperados (coloque em `assets/`):

| Arquivo | Onde aparece | Proporção sugerida |
|---|---|---|
| `kombi-01.jpg` | polaroid do topo | 4:3 |
| `tirinha-01..03.jpg` | tirinha de fotos do topo | 4:3 (recorte quadrado funciona) |
| `totem-01.jpg` | segunda polaroid do topo | 4:3 |
| `sobre-kombi.jpg` | seção “Quem somos” | 4:5 (retrato) |
| `exp-kombi.jpg` | card Kombi Retrô | 16:11 |
| `exp-totem-retro.jpg` | card Totem Retrô | 16:11 |
| `exp-totem-moderno.jpg` | card Totem Moderno | 16:11 |
| `galeria-01..08.jpg` | galeria horizontal | alterna 4:3 e 3:4 |

Sempre preencha o `alt` descrevendo a cena — é o que leitores de tela leem e o que o
Google usa para indexar as imagens.

**Dica de peso:** exporte em no máximo ~1600px de largura e qualidade 80. Fotos direto
do celular têm 4–8 MB e deixam o site lento no 4G dos convidados.

### 3. Depoimentos

Os três depoimentos vieram do perfil público da La Kombine no Casamentos.com.br e estão
atribuídos genericamente (“Avaliação no Casamentos.com.br”). **Confirme os textos e troque
pela atribuição real** (nome do casal + data/local do evento) — depoimento com nome
converte muito mais. O bloco está marcado com um comentário `ATENÇÃO` no `index.html`.

O mesmo vale para os números do hero (5,0 · 9 avaliações · 100% recomendam · Casamentos
Awards 2026): confira se continuam corretos antes de publicar.

### 4. Afirmações que precisam de confirmação sua

Tudo abaixo veio do perfil público da marca, não de você. Confirme antes de divulgar:

| Onde | Afirmação |
|---|---|
| Hero | 5,0 · 9 avaliações · 100% dos casais recomendam |
| Depoimentos | Casamentos Awards 2026 |
| FAQ | montagem em ~60 min · 3 a 6 h de duração · reservar com 3 meses |
| FAQ | pagamento: transferência, PIX, cartão, parcelado |
| FAQ | funciona ao ar livre |
| Rodapé / FAQ | base em Guarulhos, atende a Grande São Paulo |

O rodapé **não** exibe horário de atendimento — eu não tenho esse dado. Se quiser mostrar,
há um comentário no `index.html` marcando o lugar.

---

## Estrutura

```
LaKombine/
├── index.html              # página inteira (one-page)
├── styles/
│   ├── fonts.css           # @font-face das fontes auto-hospedadas
│   └── main.css            # design system + todas as seções
├── scripts/main.js         # nav mobile, reveals, contadores, FAQ, galeria
├── assets/
│   ├── logo.png            # logo original
│   ├── favicon.svg         # ícone da aba
│   ├── apple-touch-icon.png
│   ├── og-image.png        # preview no WhatsApp/Instagram/Facebook
│   └── fonts/              # 14 arquivos .woff2 (subsets latin + latin-ext)
├── .nojekyll               # impede o Jekyll do GitHub Pages de ignorar arquivos
└── README.md
```

Seções, na ordem: Hero → Marquee → Sobre → Experiências → Como funciona → Galeria →
Depoimentos → FAQ → CTA final → Rodapé.

## Stack

HTML5 + CSS3 + JavaScript puro. **Sem build, sem dependências, sem CDN.**
É só abrir o `index.html` — ou servir a pasta:

```bash
python3 -m http.server 5500   # depois abra http://localhost:5500
```

## Paleta

Extraída direto do gradiente da logo:

| Token | Hex | Uso |
|---|---|---|
| `--teal-400` | `#61AFA1` | ponta clara da logo, detalhes decorativos |
| `--teal-500` | `#4E9488` | meio do gradiente |
| `--teal-700` | `#37766B` | botões, superfície escura principal |
| `--surface-1/2/3` | `#37766B → #316A60 → #204A43` | fundos que recebem texto branco |
| `--cream` | `#FBF5E9` | fundo claro (bege quente, pegada retrô) |
| `--sand` | `#F2E7D4` | fundo claro alternado |
| `--ink` | `#14312C` | texto e rodapé |
| `--amber` | `#E3A44F` | acento retrô (tags, estrelas, separadores) |

> **Por que os fundos não usam o verde claro da logo?** Texto branco sobre `#61AFA1`
> dá 2,6:1 de contraste — reprova em acessibilidade (o mínimo é 4,5:1). Por isso as áreas
> com texto usam a ponta escura do próprio gradiente da marca, e o verde claro fica nos
> elementos decorativos. Todos os 191 blocos de texto do site passam em **WCAG 2.1 AA**.

## Tipografia

Auto-hospedada em `assets/fonts/` (SIL Open Font License). Nada é buscado no Google.

- **Poppins** — títulos e interface
- **Inter** — texto corrido
- **Yellowtail** — os detalhes em manuscrito, ecoando o “Kombine” da logo

## Acessibilidade

- Contraste WCAG AA verificado por auditoria automatizada em todos os nós de texto
- Navegação por teclado com `:focus-visible` visível e link “pular para o conteúdo”
- `aria-expanded`/`aria-controls` no menu mobile, `Esc` fecha
- `prefers-reduced-motion` desliga marquee, selo giratório, contadores e reveals
- HTML semântico (`header`/`main`/`section`/`article`/`footer`) e dados estruturados
  `LocalBusiness` para o Google

## SEO

- `<title>` e meta description com serviço + cidade
- `canonical`, Open Graph e Twitter Card
- Dados estruturados `LocalBusiness` (com catálogo das 3 experiências) e `FAQPage`
  (as 9 perguntas — o texto marcado é idêntico ao visível, como o Google exige)
- `sitemap.xml` e `robots.txt`
- Um `<h1>` só, hierarquia limpa de `<h2>`/`<h3>`

**Não** declaramos `aggregateRating`. A nota 5,0 vem do Casamentos.com.br, e marcar
avaliação de terceiro como se fosse coletada no próprio site viola as diretrizes do
Google e pode gerar penalidade manual.

## Domínio e deploy

O domínio é **lakombine.com.br** (registrado no Registro.br). O arquivo `CNAME` na raiz
deste repositório é o que informa isso ao GitHub Pages.

> ⚠️ O `CNAME` só tem efeito na **raiz da fonte de publicação**. Enquanto o site estiver
> como subpasta de outro repositório, ele é ignorado — o domínio exige que este projeto
> esteja em um repositório próprio.

### DNS no Registro.br

No painel do Registro.br → **Configurar endereçamento** → **Modo avançado**.

> O painel do Registro.br **não aceita `@`** nem campo vazio: o campo NOME leva o nome
> completo, como nos exemplos da própria tela (`meudominio.com.br A 200.160.10.251`).
> E o CNAME vai **sem ponto final**.

| TIPO | NOME | DADOS |
|---|---|---|
| A | `lakombine.com.br` | `185.199.108.153` |
| A | `lakombine.com.br` | `185.199.109.153` |
| A | `lakombine.com.br` | `185.199.110.153` |
| A | `lakombine.com.br` | `185.199.111.153` |
| AAAA | `lakombine.com.br` | `2606:50c0:8000::153` |
| AAAA | `lakombine.com.br` | `2606:50c0:8001::153` |
| AAAA | `lakombine.com.br` | `2606:50c0:8002::153` |
| AAAA | `lakombine.com.br` | `2606:50c0:8003::153` |
| CNAME | `www.lakombine.com.br` | `leo-dev18.github.io` |

São 9 registros, dentro do limite de 40 do modo avançado. O `www` **precisa** ser CNAME
com nome preenchido: o protocolo DNS proíbe CNAME na raiz, porque lá já existem SOA e NS.
É exatamente por isso que o GitHub pede A/AAAA no apex e CNAME só no `www`.

Configurando apex e `www` juntos, o GitHub cria o redirecionamento entre os dois
automaticamente.

**Ordem importa:** configure o DNS **antes** de ativar o Pages. Com o `CNAME` já no repo,
o GitHub adota o domínio assim que o Pages sobe — e aí `leo-dev18.github.io/LaKombine/`
passa a redirecionar para um domínio que ainda não resolve.

### No GitHub

**Settings → Pages** → Custom domain: `lakombine.com.br` → Save. Espere o check verde e
então marque **Enforce HTTPS** (o certificado Let's Encrypt sai sozinho; pode levar
algumas horas).

O DNS propaga em minutos, mas pode levar até 24 h. Para conferir:

```bash
dig +short lakombine.com.br
curl -sI https://lakombine.com.br | head -1
```
