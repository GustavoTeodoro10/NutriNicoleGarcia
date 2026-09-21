# Nicole Garcia — Nutricionista Esportiva e Estética

Site institucional (redesign) desenvolvido pela **TeoCode** para a nutricionista Nicole Garcia (CRN-3 56925), atendimento em Mauá/SP e São Paulo/SP, presencial e online.

Site anterior (referência de conteúdo): https://nicolegarcianutri.wixstudio.com/nutricionista

## Stack

Site estático, sem build step — HTML5 + [Tailwind CSS](https://tailwindcss.com) (via CDN) + CSS custom properties para o design system + JavaScript puro (vanilla) para as interações. Isso significa que o projeto pode ser publicado diretamente em qualquer host estático (GitHub Pages, Netlify, Vercel, Hostinger, etc.) sem precisar de Node.js, npm install ou passo de build.

## Estrutura do projeto

```
NutriNicoleGarcia/
├── index.html                 # Página única (single-page site), todas as seções
├── assets/
│   ├── css/
│   │   └── style.css          # Design tokens + estilos autorais (usado junto com utilitários Tailwind)
│   ├── js/
│   │   └── main.js            # Menu mobile, accordion FAQ, seletor de serviços, scroll reveal, links de WhatsApp
│   └── img/
│       ├── logo.png           # Logotipo original do site atual (não alterado)
│       ├── favicon.png / favicon-192.png / favicon-32.png   # Recorte do próprio monograma "NG" do logo
│       ├── nicole-profile.jpg
│       ├── nicole-portrait-2.jpg
│       ├── cat-longevidade.jpg
│       ├── cat-hipertrofia.jpg
│       ├── cat-performance.jpg
│       ├── cat-saude-clinica.jpg
│       └── cat-emagrecimento.jpg
├── scripts/
│   └── process_images.py      # Script usado para otimizar/redimensionar as imagens originais (referência)
├── package.json                # Metadados + script opcional de servidor local (não exige build)
├── .gitignore
└── README.md
```

> A pasta `src/assets/` (imagens originais em alta resolução, antes da otimização) não é versionada — está no `.gitignore` — pois as versões já otimizadas em `assets/img/` são as usadas pelo site.

## Rodando localmente

Não é necessário instalar nada. Qualquer servidor estático simples funciona, por exemplo:

```bash
npx serve . -l 5500
```

ou, se preferir Python:

```bash
python -m http.server 5500
```

Depois acesse `http://localhost:5500`.

## Publicando (deploy)

O projeto é 100% estático, então qualquer uma destas opções funciona sem configuração adicional:

- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / `/ (root)`.
- **Netlify** ou **Vercel**: importar o repositório, sem comando de build, publish directory = `.` (raiz).
- **Hospedagem tradicional (cPanel, FTP, etc.)**: copiar todos os arquivos para a pasta pública (`public_html`).

## Conteúdo

Todo o conteúdo (textos, serviços, FAQ, avaliações, endereço, telefone e redes sociais) foi extraído do site atual da cliente e da ficha dela no Google (Nutricionista Nicole Garcia — Mauá, 5,0★, 82 avaliações). Nenhuma informação foi inventada. O logotipo é exatamente o mesmo do site atual, sem alterações.

- **WhatsApp**: `+55 11 95248-9846` — todos os botões de CTA abrem o WhatsApp com uma mensagem pré-preenchida de acordo com a seção (ex.: um clique na seção "Plano de 90 dias" já inicia a conversa mencionando o plano de 90 dias). A lógica está centralizada em `assets/js/main.js` (`wireWhatsappLinks`), lendo o atributo `data-wa-msg` de cada link.
- **Avaliações do Google**: os depoimentos exibidos na seção "O que dizem no Google" são avaliações reais, extraídas da ficha do Google Meu Negócio da cliente.

## Editando conteúdo

Como é um site estático de página única, todo o conteúdo está em `index.html`, organizado em seções com `id` (`#inicio`, `#servicos`, `#filosofia`, `#planos`, `#depoimentos`, `#sobre`, `#faq`, `#contato`). As cores, tipografia e demais tokens de design ficam centralizados no topo de `assets/css/style.css` (`:root { ... }`), então trocar uma cor ali propaga para o site inteiro.

Para trocar a mensagem de WhatsApp de qualquer botão, basta editar o atributo `data-wa-msg="..."` no elemento correspondente em `index.html`.

---

Site desenvolvido por **TeoCode** · © 2026 TeoCode
