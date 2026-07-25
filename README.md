# SitesLink

Plataforma multi-site que hospeda landing pages independentes sob um mesmo deploy Netlify, cada uma com subdomínio próprio e identidade visual única.

> **siteslink.com.br** — um repositório, múltiplos negócios.

---

## Sites ativos

| Negócio | Subdomínio | Stack |
|---------|-----------|-------|
| **Cris Doces** — Confeitaria artesanal | `crisdoces.siteslink.com.br` | HTML5, CSS3 (Plus Jakarta Sans) |
| **Ulisses Informática** — Suporte técnico & TI | `ulissesinformatica.siteslink.com.br` | HTML5, CSS3 (Inter) |
| **Sítio Mendes** — Eventos, casamentos & lazer | `sitiomendes.siteslink.com.br` | HTML5, CSS3 (Outfit) |
| **William Auto Mecânica** — Oficina premium | `williammecanica.siteslink.com.br` | HTML5, CSS3 (Montserrat) |

---

## Arquitetura

```
siteslink/
├── index.html                  # Hub central (ambiente local/dev)
├── _redirects                  # Rewrite de subdomínios (Netlify)
├── start.bat                   # Servidor local com IP de rede
├── assets/
│   ├── css/base.css            # Reset, WhatsApp FAB, animações compartilhadas
│   └── js/animations.js        # IntersectionObserver, parallax, reveal
├── cris-doces/
│   ├── index.html
│   ├── style.css
│   └── favicon.svg
├── ulisses-informatica/
│   ├── index.html
│   ├── style.css
│   └── favicon.svg
├── sitio-mendes/
│   ├── index.html
│   ├── style.css
│   └── favicon.svg
└── william-automecanica/
    ├── index.html
    ├── style.css
    └── favicon.svg
```

### Princípios

- **Zero frameworks** — HTML5 + CSS3 + vanilla JS. Sem build step, sem dependências.
- **CSS isolado** — cada site usa prefixo exclusivo (`cd-`, `ui-`, `sm-`, `wm-`) para evitar colisões.
- **Mobile-first** — breakpoints em 900px, 768px e 400px. Heroes, cards e navegação adaptados.
- **Performance** — assets inline (SVG, fontes via Google Fonts), sem bundle. Cada página carrega apenas seu próprio CSS.
- **Acessibilidade** — `prefers-reduced-motion` desativa animações; ARIA labels nos FABs e imagens.

### Como funciona o roteamento

O Netlify serve todas as páginas de um único deploy. O arquivo `_redirects` faz rewrite transparente (status 200):

```
https://crisdoces.siteslink.com.br/*  →  /cris-doces/:splat
```

O visitante acessa `crisdoces.siteslink.com.br` e vê a página como se fosse um site independente.

---

## Desenvolvimento local

### Pré-requisitos

- [Node.js](https://nodejs.org/) (qualquer versão recente, para `npx`)

### Iniciar o servidor

**Windows (recomendado):**
```bash
start.bat
```
Exibe o IP local, mata processos na porta 3000 e sobe `http-server` em `0.0.0.0:3000`.

**Manual:**
```bash
npx http-server . -a 0.0.0.0 -p 3000 -c-1
```

### Testar no celular

Conecte o celular na mesma rede Wi-Fi e acesse:
```
http://<seu-ip>:3000/cris-doces/
http://<seu-ip>:3000/ulisses-informatica/
http://<seu-ip>:3000/sitio-mendes/
http://<seu-ip>:3000/william-automecanica/
```

---

## Adicionar um novo site

1. Criar a pasta com `index.html`, `style.css` e `favicon.svg`
2. Usar um prefixo CSS novo (ex: `ab-` para um negócio "AB")
3. Importar `../assets/css/base.css` e `../assets/js/animations.js`
4. Adicionar a regra de rewrite no `_redirects`:
   ```
   https://novonegocio.siteslink.com.br/*  /novo-negocio/:splat  200
   ```
5. Configurar o subdomínio no painel DNS e no Netlify
6. Adicionar o card no `index.html` (hub)

---

## Funcionalidades compartilhadas

| Recurso | Implementação |
|---------|--------------|
| WhatsApp FAB | CSS puro com pulse animation (`base.css`) |
| Scroll reveal | `IntersectionObserver` com stagger delay (`animations.js`) |
| Hero entrance | Sequência tag → título → desc → CTA com delays CSS |
| Parallax | `requestAnimationFrame` + `translateY` no hero bg (desktop) |
| Hamburger menu | CSS dropdown + vanilla JS toggle (por página) |
| Footer Airbnb-style | Grid 3 colunas centralizado, links com ícones SVG |

---

## Deploy

Push para o branch principal. Netlify faz build automático (publish directory: `/`).

Domínios customizados e subdomínios são configurados no painel do Netlify + registros DNS (CNAME ou A).

---

## Roadmap

- [ ] Imagens reais por negócio (hero, cards)
- [ ] Meta tags Open Graph e Twitter Card por página
- [ ] Google Analytics / tag por subdomínio
- [ ] Formulário de contato (Netlify Forms ou Formspree)
- [ ] PWA básico (manifest + service worker)
- [ ] Novos sites conforme demanda dos clientes

---

## Licença

Projeto privado. Todos os direitos reservados.
