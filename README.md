# Doce de Laurinha — landing page

Site one-page estático para a loja de apliques de pasta americana da Lidiane Magalhães.
Feito em HTML, CSS e JavaScript puro. Não há dependências, banco de dados, login ou build.

## Publicar no GitHub e na Vercel

1. Crie um repositório novo no GitHub (pode ser privado ou público).
2. Envie **todos** os arquivos e pastas desta pasta para o repositório, mantendo a estrutura:
   - `index.html`, `robots.txt`, `vercel.json`, `.gitignore`, `README.md`
   - pasta `css/`, pasta `js/` e pasta `imagens/`
3. Acesse [vercel.com/new](https://vercel.com/new), clique em **Add New → Project** e importe esse repositório do GitHub.
4. A Vercel reconhece o `index.html` na raiz automaticamente. Deixe **Build Command** vazio e **Output Directory** como `.` (padrão). Clique em **Deploy**.
5. Pronto. A cada `git push` no repositório, a Vercel publica a versão nova sozinha.

> Se preferir testar antes, basta abrir o `index.html` no navegador. O site funciona sem servidor local.

### Depois do primeiro deploy (prévia no WhatsApp)

O WhatsApp exige uma URL absoluta para a imagem de compartilhamento. Com a URL da sua Vercel em mãos (ex.: `https://doce-de-laurinha.vercel.app`), edite o `<head>` do `index.html`:

```html
<meta property="og:image" content="https://SEU-PROJETO.vercel.app/imagens/og-image.png">
<meta name="twitter:image" content="https://SEU-PROJETO.vercel.app/imagens/og-image.png">
<!-- opcional -->
<meta property="og:url" content="https://SEU-PROJETO.vercel.app/">
```

Depois, commite e faça push: a Vercel atualiza o site automaticamente.

Se quiser usar seu próprio domínio, configure em **Project Settings → Domains** na Vercel e use esse endereço nos metadados acima.

## Estrutura

```
index.html          textos, links, SEO e conteúdo
vercel.json         configuração de URLs limpas da Vercel
robots.txt          libera a indexação pelos buscadores
css/style.css       design tokens, grid de 12 colunas e responsividade
js/script.js        menu, lightbox e formulário
imagens/
  logo.png          cabeçalho e rodapé
  favicon.png       cupcake da logo (ícone da aba)
  og-image.png      pré-visualização para WhatsApp/redes (1200 x 630)
  hero-menina.png   ilustração da Laurinha com fundo transparente
  elementos.png     cupcake e fuê da seção Sobre
  trabalho-01.jpg a trabalho-12.jpg  fotos provisórias da galeria
```

## Trocar as fotos dos trabalhos

As 12 imagens da galeria são provisórias: o Instagram exige API própria para importar publicações.

1. Exporte as fotos em JPG (ou WebP) com no máximo 1200 px de largura.
2. Substitua os arquivos em `imagens/` mantendo os nomes `trabalho-01.jpg` a `trabalho-12.jpg`. Se mudar o formato, ajuste o `src` no `index.html`.
3. A galeria usa proporção 4:5 com `object-fit: cover`. Escolha fotos que funcionem nesse corte, ou mude a proporção em `.foto img` no CSS.
4. Edite o `alt` e a legenda de cada foto no `index.html`.
5. Para adicionar fotos, copie um bloco `<button class="foto">` dentro de `<div class="galeria">`. O lightbox e a contagem se ajustam sozinhos.

## Onde editar

- **Textos:** direto no `index.html`, escritos na voz da Lidiane.
- **WhatsApp:** número e mensagem nas constantes do início de `js/script.js` e nos links `wa.me` do `index.html`.
- **Instagram e endereço:** seções Contato e Rodapé do `index.html`, inclusive as duas URLs do Google Maps.
- **SEO:** `<head>` do `index.html`, incluindo os dados de negócio local (`LocalBusiness`).
- **Cores, fontes, espaçamento e raios:** variáveis no início de `css/style.css` (`:root`).

## Sistema visual

- Grid de 12 colunas no desktop; espaçamento 8 / 16 / 24 / 40 / 64 / 96 px.
- Duas fontes: Pacifico só para a marca e um título; DM Sans para o resto.
- Rosa forte apenas no botão principal; rosa e azul bebê como apoio.
- Sem gradientes, glassmorphism, sombras coloridas ou selos decorativos.

Feito com cuidado para a Doce de Laurinha By Lidiane Magalhães.
