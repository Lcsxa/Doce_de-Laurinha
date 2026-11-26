/* ==========================================================================
   DOCE DE LAURINHA — Interatividade
   --------------------------------------------------------------------------
   EDITE AQUI: número e texto padrão do WhatsApp usados pelo formulário.
   Os links dos botões também estão no index.html (procure por wa.me).
   ========================================================================== */
document.documentElement.classList.add('js');

const WHATSAPP_NUMERO = '5521974932021';
const WHATSAPP_TEXTO_PADRAO = 'Olá! Vim pelo site e gostaria de um orçamento de apliques de pasta americana.';

/** Monta o link do WhatsApp com uma mensagem já codificada na URL. */
function linkWhatsApp(texto) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

/* --------------------------------------------------------------------------
   CABEÇALHO: sombra ao rolar + link ativo do menu
   -------------------------------------------------------------------------- */
const cabecalho = document.querySelector('.cabecalho');
const atualizarCabecalho = () => cabecalho.classList.toggle('rolado', window.scrollY > 20);
atualizarCabecalho();
window.addEventListener('scroll', atualizarCabecalho, { passive: true });

const linksMenu = Array.from(document.querySelectorAll('.nav__lista a'));
const secoesMenu = ['inicio', 'trabalhos', 'sobre', 'contato']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observadorSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      linksMenu.forEach((link) => {
        link.classList.toggle('ativo', link.getAttribute('href') === `#${entrada.target.id}`);
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  secoesMenu.forEach((secao) => observadorSecoes.observe(secao));
}

/* --------------------------------------------------------------------------
   MENU HAMBÚRGUER (celular/tablet)
   -------------------------------------------------------------------------- */
const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu-principal');

function fecharMenu() {
  menu.classList.remove('aberto');
  botaoMenu.setAttribute('aria-expanded', 'false');
  botaoMenu.setAttribute('aria-label', 'Abrir menu');
}

botaoMenu.addEventListener('click', () => {
  const vaiAbrir = !menu.classList.contains('aberto');
  menu.classList.toggle('aberto', vaiAbrir);
  botaoMenu.setAttribute('aria-expanded', String(vaiAbrir));
  botaoMenu.setAttribute('aria-label', vaiAbrir ? 'Fechar menu' : 'Abrir menu');
});

menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fecharMenu));
document.addEventListener('click', (evento) => {
  if (!evento.target.closest('.cabecalho')) fecharMenu();
});
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') fecharMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 980) fecharMenu();
});

/* --------------------------------------------------------------------------
   ANIMAÇÕES DE ENTRADA (fade / slide suave)
   -------------------------------------------------------------------------- */
const elementosRevelar = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observadorRevelar = new IntersectionObserver((entradas, observador) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  elementosRevelar.forEach((elemento) => observadorRevelar.observe(elemento));
} else {
  elementosRevelar.forEach((elemento) => elemento.classList.add('visivel'));
}

/* --------------------------------------------------------------------------
   GALERIA + LIGHTBOX (foto ampliada com setas, teclado e arraste)
   -------------------------------------------------------------------------- */
const fotos = Array.from(document.querySelectorAll('#galeria .foto'));
const lightbox = document.getElementById('lightbox');
const lbImagem = document.getElementById('lightbox-imagem');
const lbLegenda = document.getElementById('lightbox-legenda');
const lbContador = document.getElementById('lightbox-contador');
const botaoFechar = document.getElementById('lightbox-fechar');
const botaoAnterior = document.getElementById('lightbox-anterior');
const botaoProxima = document.getElementById('lightbox-proxima');

let indiceAtual = 0;

function atualizarLightbox() {
  const imagem = fotos[indiceAtual].querySelector('img');
  lbImagem.src = imagem.getAttribute('src');
  lbImagem.alt = imagem.alt;
  lbLegenda.textContent = imagem.alt;
  lbContador.textContent = `${indiceAtual + 1} / ${fotos.length}`;
}

function abrirLightbox(indice) {
  indiceAtual = indice;
  atualizarLightbox();
  lightbox.hidden = false;
  document.body.classList.add('lightbox-aberto');
  botaoFechar.focus();
}

function fecharLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove('lightbox-aberto');
  fotos[indiceAtual].focus();
}

function navegarFotos(direcao) {
  indiceAtual = (indiceAtual + direcao + fotos.length) % fotos.length;
  atualizarLightbox();
}

fotos.forEach((foto, indice) => {
  foto.addEventListener('click', () => abrirLightbox(indice));
});

botaoFechar.addEventListener('click', fecharLightbox);
botaoAnterior.addEventListener('click', () => navegarFotos(-1));
botaoProxima.addEventListener('click', () => navegarFotos(1));

// Clicar fora da foto também fecha
lightbox.addEventListener('click', (evento) => {
  if (evento.target === lightbox) fecharLightbox();
});

// Teclado: Esc fecha, setas navegam, Tab fica preso dentro da janela
document.addEventListener('keydown', (evento) => {
  if (lightbox.hidden) return;

  if (evento.key === 'Escape') fecharLightbox();
  if (evento.key === 'ArrowLeft') navegarFotos(-1);
  if (evento.key === 'ArrowRight') navegarFotos(1);

  if (evento.key === 'Tab') {
    const focaveis = [botaoFechar, botaoAnterior, botaoProxima];
    const posicao = focaveis.indexOf(document.activeElement);
    if (evento.shiftKey && posicao <= 0) {
      evento.preventDefault();
      focaveis[focaveis.length - 1].focus();
    } else if (!evento.shiftKey && posicao === focaveis.length - 1) {
      evento.preventDefault();
      focaveis[0].focus();
    }
  }
});

// Arraste para o lado no celular
let toqueInicialX = 0;
lightbox.addEventListener('touchstart', (evento) => {
  toqueInicialX = evento.changedTouches[0].screenX;
}, { passive: true });
lightbox.addEventListener('touchend', (evento) => {
  const distancia = evento.changedTouches[0].screenX - toqueInicialX;
  if (Math.abs(distancia) > 50) navegarFotos(distancia < 0 ? 1 : -1);
}, { passive: true });

/* --------------------------------------------------------------------------
   FORMULÁRIO → abre o WhatsApp com a mensagem preenchida
   -------------------------------------------------------------------------- */
const formulario = document.getElementById('form-orcamento');
const statusForm = document.getElementById('form-status');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const valor = (id) => document.getElementById(id).value.trim();
  const nome = valor('nome');
  const telefone = valor('telefone');
  const data = valor('data');
  const tema = valor('tema');
  const mensagem = valor('mensagem');

  let dataFormatada = data;
  if (data) {
    const objetoData = new Date(`${data}T12:00:00`);
    if (!Number.isNaN(objetoData.getTime())) {
      dataFormatada = objetoData.toLocaleDateString('pt-BR');
    }
  }

  const linhas = [
    WHATSAPP_TEXTO_PADRAO,
    '',
    `Nome: ${nome}`,
    `Telefone: ${telefone}`,
  ];
  if (dataFormatada) linhas.push(`Data do evento: ${dataFormatada}`);
  if (tema) linhas.push(`Tema da festa: ${tema}`);
  linhas.push('', `Mensagem: ${mensagem}`);

  const url = linkWhatsApp(linhas.join('\n'));
  const novaJanela = window.open(url, '_blank', 'noopener,noreferrer');
  if (!novaJanela) window.location.href = url;

  statusForm.textContent = 'Mensagem pronta no WhatsApp.';
  window.setTimeout(() => { statusForm.textContent = ''; }, 7000);
});

/* --------------------------------------------------------------------------
   ANO DO RODAPÉ (atualiza automaticamente)
   -------------------------------------------------------------------------- */
const anoAtual = document.getElementById('ano');
if (anoAtual) anoAtual.textContent = String(new Date().getFullYear());
