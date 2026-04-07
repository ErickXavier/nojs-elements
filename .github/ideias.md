# NoJS Elements — Roadmap de Elementos

> Todos os elementos seguem a filosofia NoJS: atributos HTML declarativos, zero JavaScript pelo dev.
> Cada elemento é um módulo do plugin `nojs-elements`, registrado via `NoJS.directive()`.

## Padrão de implementação

Cada elemento segue a mesma estrutura do DnD:

```
src/<elemento>/
  ├── index.js      # barrel: registerX() + cleanupX()
  ├── state.js      # estado compartilhado entre directives do módulo
  ├── styles.js     # _injectXStyles() — CSS mínimo, genérico
  └── <diretiva>.js # registerDiretiva(NoJS) — lógica do atributo
```

**CSS:** O mínimo possível. Apenas posicionamento, display e layout. Sem cores, fontes ou decorações opinativas. Classes `.nojs-*` para que o dev customize com CSS próprio. Cada módulo injeta seu `<style data-nojs-X>` uma única vez.

**JS:** Cada `register*` recebe `NoJS` e usa a API de plugin:
- `NoJS.directive(name, { priority, init(el, name, expr) })` — registra diretiva
- `NoJS.findContext(el)` / `NoJS.evaluate(expr, ctx)` — avalia expressões
- `NoJS._onDispose(fn)` — cleanup de listeners
- `NoJS._execStatement(expr, ctx, vars)` — executa expressões com variáveis injetadas
- `NoJS._warn(msg)` — avisos no console

**Acessibilidade:** Todos os elementos adicionam ARIA roles, `tabindex`, navegação por teclado.

---

## Implementado

### DnD (Drag and Drop)
`drag`, `drop`, `drag-list`, `drag-multiple`
Drag-and-drop declarativo com suporte a listas, multi-seleção e tipos.

---

## Planejado

---

### 1. Tooltip / Popover

**Diretivas:** `tooltip`, `popover`, `popover-trigger`

**Arquivos:**
```
src/tooltip/
  ├── index.js
  ├── state.js        # registry de popovers ativos, timeouts
  ├── styles.js       # posicionamento, seta, z-index
  ├── tooltip.js      # registerTooltip(NoJS)
  └── popover.js      # registerPopover(NoJS)
```

**Como funciona:**

`tooltip` — texto simples, aparece no hover/focus:
```html
<button tooltip="Salvar documento">💾</button>
<button tooltip="Excluir item" tooltip-position="left">🗑️</button>
```

O JS cria um elemento flutuante (`<div class="nojs-tooltip" popover>`) posicionado via CSS anchor positioning (com fallback para cálculo manual). O texto vem do valor do atributo. Mostra em `mouseenter`/`focusin`, esconde em `mouseleave`/`focusout`.

`popover` — conteúdo rico, aparece no click:
```html
<div popover="config-menu">
  <h3>Configurações</h3>
  <label>Tema: <select model="tema">...</select></label>
</div>
<button popover-trigger="config-menu">⚙️ Config</button>
```

O JS encontra o elemento `[popover="id"]`, seta `popover="auto"` nativo no DOM, e vincula o trigger com `showPopover()`/`hidePopover()`. O conteúdo dentro do popover é HTML normal do NoJS (pode ter `model`, `bind`, etc). Light dismiss já vem de graça da Popover API.

**Atributos auxiliares:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `tooltip` | qualquer | Texto do tooltip |
| `tooltip-position` | qualquer | `top` (default), `bottom`, `left`, `right` |
| `tooltip-delay` | qualquer | Delay em ms antes de mostrar (default: 300) |
| `popover` | container | ID do popover + marca como conteúdo popover |
| `popover-trigger` | button/link | ID do popover que este botão abre |
| `popover-position` | container | Posição relativa ao trigger |
| `popover-dismiss` | qualquer dentro | Fecha o popover ao clicar |

**CSS injetado** (`<style data-nojs-tooltip>`):
```css
.nojs-tooltip {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.nojs-tooltip[aria-hidden="false"] {
  opacity: 1;
}
.nojs-popover {
  position: fixed;
  z-index: 9998;
  margin: 0;
}
```

**ARIA:** `tooltip` seta `aria-describedby` no trigger. `popover` seta `aria-haspopup`, `aria-expanded`, `aria-controls`.

---

### 2. Modal

**Diretivas:** `modal`, `modal-open`, `modal-close`

**Arquivos:**
```
src/modal/
  ├── index.js
  ├── state.js        # stack de modais abertos (para modais aninhados)
  ├── styles.js       # overlay/backdrop, centralização, z-index
  ├── modal.js        # registerModal(NoJS)
  ├── modal-open.js   # registerModalOpen(NoJS)
  └── modal-close.js  # registerModalClose(NoJS)
```

**Como funciona:**

```html
<!-- Trigger -->
<button modal-open="confirmar-exclusao">Excluir conta</button>

<!-- Modal (pode estar em qualquer lugar do DOM) -->
<div modal="confirmar-exclusao">
  <h2>Tem certeza?</h2>
  <p>Essa ação não pode ser desfeita.</p>
  <button modal-close>Cancelar</button>
  <button modal-close on:click="excluirConta()">Confirmar</button>
</div>

<!-- Modal com dados dinâmicos do NoJS -->
<div modal="editar-usuario" modal-class="dialog-wide">
  <h2>Editar <span bind="usuario.nome"></span></h2>
  <form>
    <input model="usuario.nome" />
    <input model="usuario.email" />
    <button modal-close on:click="salvar()">Salvar</button>
  </form>
</div>
```

O JS pega o `[modal="id"]` e seta `popover="manual"` nativo (manual = sem light dismiss, controlamos nós). O `modal-open` chama `el.showPopover()` e o `modal-close` chama `el.hidePopover()`. Usamos o `::backdrop` nativo da Popover API para o overlay.

**Focus trap:** Ao abrir, o focus vai pro primeiro focusável dentro do modal. Tab circula dentro do modal. Esc fecha (se permitido). Ao fechar, focus volta ao trigger.

**Stack de modais:** Modais aninhados empilham. Cada modal novo fica acima do anterior com z-index incremental. Fechar um revela o anterior.

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `modal` | container | ID do modal — marca como conteúdo modal |
| `modal-open` | button/link | ID do modal que este botão abre |
| `modal-close` | qualquer dentro | Fecha o modal mais próximo (ou específico via valor) |
| `modal-class` | container | Classe CSS extra ao abrir |
| `modal-backdrop` | container | `true` (default) / `false` — mostra/esconde backdrop |
| `modal-escape` | container | `true` (default) / `false` — permite fechar com Esc |

**CSS injetado** (`<style data-nojs-modal>`):
```css
.nojs-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  margin: 0;
  border: none;
  padding: 0;
  max-width: 100dvw;
  max-height: 100dvh;
}
.nojs-modal::backdrop {
  background: rgb(0 0 0 / 0.5);
}
```

**Integração com templates:** O conteúdo do modal é processado pelo NoJS como qualquer outro nó. `[get]`, `[bind]`, `[model]`, `[each]` — tudo funciona normalmente dentro do modal.

**ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apontando pro primeiro heading.

---

### 3. Dropdown

**Diretivas:** `dropdown`, `dropdown-toggle`, `dropdown-menu`, `dropdown-item`

**Arquivos:**
```
src/dropdown/
  ├── index.js
  ├── state.js        # registry de dropdowns abertos
  ├── styles.js       # posicionamento do menu
  ├── dropdown.js     # registerDropdown(NoJS)
  └── item.js         # registerDropdownItem(NoJS) — navegação por teclado
```

**Como funciona:**

```html
<div dropdown>
  <button dropdown-toggle>Opções ▾</button>
  <ul dropdown-menu>
    <li dropdown-item on:click="editar()">Editar</li>
    <li dropdown-item on:click="duplicar()">Duplicar</li>
    <li dropdown-item disabled on:click="excluir()">Excluir</li>
  </ul>
</div>

<!-- Dropdown com conteúdo dinâmico -->
<div dropdown>
  <button dropdown-toggle>Selecionar país ▾</button>
  <ul dropdown-menu>
    <li dropdown-item each="pais in paises" on:click="selecionar(pais)">
      <span bind="pais.nome"></span>
    </li>
  </ul>
</div>
```

O JS seta `popover="auto"` no `dropdown-menu`. O toggle chama `togglePopover()`. Light dismiss automático (clicou fora, fecha). Posicionamento: o menu aparece abaixo do toggle por padrão, flipa pra cima se não houver espaço.

**Navegação por teclado:**
- `Enter`/`Space` no toggle → abre menu, foca primeiro item
- `↓`/`↑` → navega entre itens (skippa `disabled`)
- `Enter` no item → ativa o item
- `Esc` → fecha menu, foca toggle
- `Home`/`End` → primeiro/último item

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `dropdown` | wrapper | Marca o container do dropdown |
| `dropdown-toggle` | button | Controle que abre/fecha |
| `dropdown-menu` | ul/div | Container dos itens |
| `dropdown-item` | li/a/button | Item navegável do menu |
| `dropdown-position` | wrapper | `bottom` (default), `top`, `left`, `right` |
| `dropdown-align` | wrapper | `start` (default), `end` — alinhamento horizontal |

**CSS injetado** (`<style data-nojs-dropdown>`):
```css
.nojs-dropdown-menu {
  position: fixed;
  z-index: 9999;
  margin: 0;
  min-width: max-content;
  list-style: none;
  padding: 0;
}
.nojs-dropdown-item[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.5;
}
.nojs-dropdown-item:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: -2px;
}
```

**ARIA:** Toggle: `aria-haspopup="menu"`, `aria-expanded`. Menu: `role="menu"`. Items: `role="menuitem"`, `tabindex="-1"` (roving tabindex).

---

### 4. Toast

**Diretivas:** `toast-container`, `toast`

**Arquivos:**
```
src/toast/
  ├── index.js
  ├── state.js        # fila de toasts, timers ativos
  ├── styles.js       # posicionamento do container, stacking
  └── toast.js        # registerToast(NoJS)
```

**Como funciona:**

```html
<!-- Container (um por posição na página) -->
<div toast-container="top-right"></div>

<!-- Toasts disparados via expressão -->
<button on:click="$toast('Salvo com sucesso!', 'success')">Salvar</button>
<button on:click="$toast('Erro ao excluir', 'error', 5000)">Excluir</button>

<!-- Ou declarativo, vinculado a estado -->
<div toast="mensagem" toast-type="success" toast-duration="3000"></div>
```

O `toast-container` define uma região fixa na tela. Quando `$toast(msg, type, duration)` é invocado (função global registrada pelo plugin), o JS cria um elemento `<div popover="manual" class="nojs-toast">` dentro do container, chama `showPopover()`, e agenda `hidePopover()` + remoção após a duração.

O toast declarativo (`[toast]`) observa a expressão. Quando o valor muda pra algo truthy, dispara o toast.

**Stack:** Múltiplos toasts empilham verticalmente com gap. Novos entram no topo ou fundo dependendo da posição do container.

**API global:** O plugin registra `$toast` no contexto via `NoJS.global()`:
```js
NoJS.global("$toast", (msg, type = "info", duration = 3000) => { ... });
```

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `toast-container` | div | Posição: `top-right` (default), `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center` |
| `toast` | qualquer | Expressão que dispara toast quando truthy |
| `toast-type` | qualquer | `info` (default), `success`, `error`, `warning` |
| `toast-duration` | qualquer | Duração em ms (default: 3000, `0` = permanente) |
| `toast-dismiss` | qualquer | `true` (default) — mostra botão de fechar |

**CSS injetado** (`<style data-nojs-toast>`):
```css
.nojs-toast-container {
  position: fixed;
  z-index: 10001;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  pointer-events: none;
  max-width: min(24rem, calc(100vw - 2rem));
}
.nojs-toast-container[data-position="top-right"] { top: 0; right: 0; }
.nojs-toast-container[data-position="top-left"] { top: 0; left: 0; }
.nojs-toast-container[data-position="bottom-right"] { bottom: 0; right: 0; }
.nojs-toast-container[data-position="bottom-left"] { bottom: 0; left: 0; }
.nojs-toast-container[data-position="top-center"] { top: 0; left: 50%; transform: translateX(-50%); }
.nojs-toast-container[data-position="bottom-center"] { bottom: 0; left: 50%; transform: translateX(-50%); }
.nojs-toast {
  pointer-events: auto;
  padding: 0;
  margin: 0;
  border: none;
  min-width: 16rem;
}
```

**ARIA:** Container: `role="log"`, `aria-live="polite"`. Toast `error`: `aria-live="assertive"`.

---

### 5. Tabs / Tab / Panel

**Diretivas:** `tabs`, `tab`, `panel`

**Arquivos:**
```
src/tabs/
  ├── index.js
  ├── state.js        # tab ativa por container
  ├── styles.js       # layout mínimo
  ├── tabs.js         # registerTabs(NoJS)
  └── tab.js          # registerTab(NoJS) + registerPanel(NoJS)
```

**Como funciona:**

```html
<div tabs>
  <button tab>Visão Geral</button>
  <div panel>
    <p>Conteúdo da visão geral...</p>
  </div>
  <button tab>Detalhes</button>
  <div panel>
    <p>Conteúdo dos detalhes...</p>
  </div>
  <button tab>Histórico</button>
  <div panel>
    <div get="/api/historico" each="item in items">
      <span bind="item.data"></span>: <span bind="item.acao"></span>
    </div>
  </div>
</div>

<!-- Com tab ativa inicial -->
<div tabs="1">  <!-- index 0-based da tab ativa inicial -->
  ...
</div>
```

O JS no init do `[tabs]` coleta todos os `[tab]` e `[panel]` filhos (intercalados). Gera um tablist wrapper e associa cada tab com seu panel por índice. A primeira tab (ou a indicada pelo valor) fica ativa.

Clicar numa tab: `aria-selected="true"` nela, mostra o panel correspondente, esconde os outros. Panels inativos recebem `display: none` + `inert` (para que não sejam focáveis/lidos por screen readers).

**Navegação por teclado:**
- `←`/`→` → navega entre tabs
- `Home`/`End` → primeira/última tab
- `Tab` → move focus do tablist pro painel ativo

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `tabs` | wrapper | Container. Valor opcional = índice da tab ativa inicial |
| `tab` | button | Aba clicável. Valor opcional = ID explícito do panel |
| `panel` | div | Conteúdo da aba |
| `tab-position` | wrapper | `top` (default), `bottom`, `left`, `right` |
| `tab-disabled` | tab | Expressão — desabilita a tab se truthy |

**CSS injetado** (`<style data-nojs-tabs>`):
```css
.nojs-tabs {
  display: flex;
  flex-direction: column;
}
.nojs-tabs[data-position="left"], .nojs-tabs[data-position="right"] {
  flex-direction: row;
}
.nojs-tabs[data-position="bottom"] {
  flex-direction: column-reverse;
}
.nojs-tabs[data-position="right"] .nojs-tablist {
  order: 1;
}
.nojs-tablist {
  display: flex;
  gap: 0;
}
.nojs-tabs[data-position="left"] .nojs-tablist,
.nojs-tabs[data-position="right"] .nojs-tablist {
  flex-direction: column;
}
.nojs-tab[aria-disabled="true"] {
  pointer-events: none;
  opacity: 0.5;
}
.nojs-panel[aria-hidden="true"] {
  display: none;
}
```

**ARIA:** Tablist: `role="tablist"`. Tab: `role="tab"`, `aria-selected`, `aria-controls`. Panel: `role="tabpanel"`, `aria-labelledby`, `tabindex="0"`.

---

### 6. Tree / Branch / Subtree

**Diretivas:** `tree`, `branch`, `subtree`

**Arquivos:**
```
src/tree/
  ├── index.js
  ├── state.js        # mapa de branches expandidos
  ├── styles.js       # indentação, ícones expand/collapse
  └── tree.js         # registerTree, registerBranch, registerSubtree
```

**Como funciona:**

```html
<ul tree>
  <li branch>
    Projetos
    <ul subtree>
      <li branch>
        NoJS
        <ul subtree>
          <li>Core</li>
          <li>LSP</li>
        </ul>
      </li>
      <li>README.md</li>
    </ul>
  </li>
  <li branch>
    Documentação
    <ul subtree>
      <li>API</li>
      <li>Guia</li>
    </ul>
  </li>
</ul>

<!-- Com dados dinâmicos -->
<ul tree>
  <template each="pasta in arvore">
    <li branch>
      <span bind="pasta.nome"></span>
      <ul subtree if="pasta.filhos.length">
        <template each="filho in pasta.filhos">
          <li bind="filho.nome"></li>
        </template>
      </ul>
    </li>
  </template>
</ul>
```

O JS no `[branch]` cria um toggle: ao clicar no texto do branch (não no subtree), alterna o `[subtree]` entre visível/escondido. O estado expandido/colapsado é gerenciado por branch.

Inicialmente todos os subtrees ficam colapsados (ou o dev pode setar `branch="expanded"` para abrir).

**Navegação por teclado:**
- `→` no branch colapsado → expande
- `→` no branch expandido → foca primeiro filho
- `←` no filho → foca branch pai
- `←` no branch expandido → colapsa
- `↑`/`↓` → move entre itens visíveis
- `Enter`/`Space` → toggle expand/collapse
- `Home`/`End` → primeiro/último item visível
- Typeahead: digitar letras foca o próximo item que começa com aquela letra

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `tree` | ul | Raiz da árvore |
| `branch` | li | Nó expansível. `"expanded"` = começa aberto |
| `subtree` | ul | Filhos de um branch |
| `tree-icon` | tree | `true` (default) / `false` — mostra ▸/▾ |

**CSS injetado** (`<style data-nojs-tree>`):
```css
.nojs-tree {
  list-style: none;
  padding-left: 0;
}
.nojs-tree .nojs-tree {
  padding-left: 1.25rem;
}
.nojs-branch {
  cursor: pointer;
  user-select: none;
}
.nojs-branch::before {
  content: "▸ ";
  display: inline-block;
  transition: transform 0.15s ease;
}
.nojs-branch[aria-expanded="true"]::before {
  content: "▾ ";
}
.nojs-subtree[aria-hidden="true"] {
  display: none;
}
```

**ARIA:** Tree: `role="tree"`. Branch: `role="treeitem"`, `aria-expanded`. Subtree: `role="group"`. Todos usam roving tabindex.

---

### 7. Stepper / Step

**Diretivas:** `stepper`, `step`

**Arquivos:**
```
src/stepper/
  ├── index.js
  ├── state.js        # step atual, validação por step
  ├── styles.js       # indicador de progresso, layout de steps
  ├── stepper.js      # registerStepper(NoJS)
  └── step.js         # registerStep(NoJS)
```

**Como funciona:**

```html
<div stepper>
  <div step>
    <h3>Dados Pessoais</h3>
    <input model="nome" required />
    <input model="email" type="email" required />
  </div>
  <div step>
    <h3>Endereço</h3>
    <input model="rua" required />
    <input model="cidade" required />
  </div>
  <div step>
    <h3>Confirmação</h3>
    <p>Nome: <span bind="nome"></span></p>
    <p>Email: <span bind="email"></span></p>
  </div>
</div>

<!-- Navegação livre (não-linear) -->
<div stepper stepper-mode="free">
  <div step step-label="Conta">...</div>
  <div step step-label="Perfil">...</div>
  <div step step-label="Review">...</div>
</div>
```

O JS coleta todos os `[step]` filhos. Gera um indicador de progresso no topo (1 → 2 → 3) e botões Anterior/Próximo no rodapé. Apenas o step ativo é visível.

**Modo linear (default):** Só avança se o step atual é válido. O JS verifica inputs com `required`/`validate` antes de avançar — se integra com o sistema de validação do NoJS.

**Modo free:** Qualquer step pode ser clicado no indicador de progresso.

O plugin expõe `$stepper` no contexto local do elemento:
```js
// Disponível dentro do stepper via expressões NoJS:
$stepper.current   // índice do step atual
$stepper.total     // total de steps
$stepper.next()    // avança (se validação passar)
$stepper.prev()    // volta
$stepper.goTo(i)   // vai para step específico
$stepper.isFirst   // boolean
$stepper.isLast    // boolean
```

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `stepper` | container | Wrapper. Valor = step inicial (default: 0) |
| `step` | div | Um step do wizard |
| `step-label` | step | Label para o indicador de progresso |
| `stepper-mode` | container | `linear` (default) / `free` |
| `stepper-indicator` | container | `true` (default) / `false` — mostra indicador |
| `stepper-nav` | container | `true` (default) / `false` — mostra botões prev/next |
| `step-validate` | step | Expressão extra de validação além dos inputs |

**CSS injetado** (`<style data-nojs-stepper>`):
```css
.nojs-stepper-indicator {
  display: flex;
  align-items: center;
  gap: 0;
  counter-reset: step;
}
.nojs-stepper-indicator-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  counter-increment: step;
}
.nojs-stepper-indicator-item::before {
  content: counter(step);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid currentColor;
  font-size: 0.875rem;
}
.nojs-stepper-indicator-item[data-completed]::before {
  content: "✓";
}
.nojs-stepper-separator {
  flex: 1;
  height: 2px;
  background: currentColor;
  opacity: 0.3;
  margin: 0 0.5rem;
}
.nojs-step[aria-hidden="true"] {
  display: none;
}
.nojs-stepper-nav {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
```

**ARIA:** Stepper: `role="group"`, `aria-label="Progresso"`. Steps: `role="tabpanel"`. Indicador: `role="tablist"` + `role="tab"` por step.

---

### 8. Skeleton

**Diretivas:** `skeleton`

**Arquivos:**
```
src/skeleton/
  ├── index.js
  ├── styles.js       # shimmer animation
  └── skeleton.js     # registerSkeleton(NoJS)
```

**Como funciona:**

```html
<!-- Aplicado em qualquer elemento — substitui conteúdo por placeholder -->
<h2 skeleton="loading">Título do artigo</h2>
<p skeleton="loading">Parágrafo com conteúdo que será carregado...</p>
<img skeleton="loading" src="" />

<!-- Skeleton puro, sem conteúdo de fallback -->
<div skeleton="loading" skeleton-lines="3"></div>
<div skeleton="loading" skeleton-type="circle" skeleton-size="64"></div>
```

O JS observa a expressão do atributo `skeleton`. Enquanto for truthy:
- Esconde o conteúdo real (`opacity: 0`, `pointer-events: none`)
- Adiciona um overlay com animação shimmer via `::after`
- Mantém as dimensões do elemento original (ou usa `skeleton-lines`/`skeleton-size` para dimensionar)

Quando a expressão vira falsy → remove a classe com um fade suave, revela o conteúdo.

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `skeleton` | qualquer | Expressão — mostra skeleton enquanto truthy |
| `skeleton-type` | qualquer | `text` (default), `circle`, `rect` |
| `skeleton-lines` | qualquer | Número de linhas de texto simuladas |
| `skeleton-size` | qualquer | Dimensão para circle/rect (px) |

**CSS injetado** (`<style data-nojs-skeleton>`):
```css
.nojs-skeleton {
  position: relative;
  overflow: hidden;
}
.nojs-skeleton > * {
  opacity: 0;
  pointer-events: none;
}
.nojs-skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg,
    color-mix(in srgb, currentColor 8%, transparent) 25%,
    color-mix(in srgb, currentColor 15%, transparent) 50%,
    color-mix(in srgb, currentColor 8%, transparent) 75%
  );
  background-size: 200% 100%;
  animation: nojs-shimmer 1.5s ease-in-out infinite;
}
@keyframes nojs-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.nojs-skeleton-circle::after { border-radius: 50%; }
```

Usa `color-mix` com `currentColor` para que o shimmer herde a cor do contexto automaticamente — funciona em dark mode sem configuração extra.

**ARIA:** `aria-busy="true"` enquanto loading.

---

### 9. Split / Pane

**Diretivas:** `split`, `pane`

**Arquivos:**
```
src/split/
  ├── index.js
  ├── state.js        # tamanhos dos panes, estado de resize
  ├── styles.js       # layout flex, gutter
  ├── split.js        # registerSplit(NoJS)
  └── pane.js         # registerPane(NoJS)
```

**Como funciona:**

```html
<!-- Horizontal (lado a lado) -->
<div split="horizontal">
  <div pane="30%">
    <nav>Sidebar...</nav>
  </div>
  <div pane>
    <main>Conteúdo principal...</main>
  </div>
</div>

<!-- Vertical (um sobre o outro) -->
<div split="vertical">
  <div pane="70%">
    <div>Editor de código...</div>
  </div>
  <div pane>
    <div>Terminal...</div>
  </div>
</div>

<!-- Aninhado -->
<div split="horizontal">
  <div pane="250px" pane-min="150" pane-max="400">
    Sidebar
  </div>
  <div pane>
    <div split="vertical">
      <div pane="60%">Editor</div>
      <div pane>Console</div>
    </div>
  </div>
</div>
```

O JS insere um gutter (handle de resize) entre cada par de panes. O gutter é arrastável. Ao arrastar, recalcula as porcentagens dos panes adjacentes via `flex-basis`.

**Teclado:** Focus no gutter + `←`/`→` (horizontal) ou `↑`/`↓` (vertical) redimensiona em incrementos de 10px. `Home` = tamanho mínimo, `End` = tamanho máximo.

**Persistência:** Se `split-persist="minha-key"`, os tamanhos são salvos em `localStorage` e restaurados no init.

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `split` | container | `horizontal` (default) / `vertical` |
| `pane` | filho direto | Tamanho inicial: `"30%"`, `"250px"`, ou vazio (flex: 1) |
| `pane-min` | pane | Tamanho mínimo em px |
| `pane-max` | pane | Tamanho máximo em px |
| `split-persist` | container | Key para localStorage — persiste tamanhos |
| `split-gutter` | container | Tamanho do gutter em px (default: 6) |
| `pane-collapsible` | pane | `true` — pane pode ser colapsado clicando no gutter |

**CSS injetado** (`<style data-nojs-split>`):
```css
.nojs-split {
  display: flex;
  overflow: hidden;
  height: 100%;
}
.nojs-split[data-direction="vertical"] {
  flex-direction: column;
}
.nojs-pane {
  overflow: auto;
  min-width: 0;
  min-height: 0;
}
.nojs-gutter {
  flex-shrink: 0;
  background: color-mix(in srgb, currentColor 10%, transparent);
  z-index: 1;
}
.nojs-split[data-direction="horizontal"] > .nojs-gutter {
  width: var(--nojs-gutter-size, 6px);
  cursor: col-resize;
}
.nojs-split[data-direction="vertical"] > .nojs-gutter {
  height: var(--nojs-gutter-size, 6px);
  cursor: row-resize;
}
.nojs-gutter:hover, .nojs-gutter:active {
  background: color-mix(in srgb, currentColor 20%, transparent);
}
```

**ARIA:** Gutter: `role="separator"`, `aria-orientation`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `tabindex="0"`.

---

### 10. Sortable Table

**Diretivas:** `sortable`, `sort`, `fixed-header`, `fixed-col`

**Arquivos:**
```
src/table/
  ├── index.js
  ├── state.js        # sort direction por coluna
  ├── styles.js       # indicadores de sort, sticky positioning
  └── table.js        # registerSortable, registerSort, registerFixed
```

**Como funciona:**

```html
<table sortable>
  <thead fixed-header>
    <tr>
      <th sort="nome" fixed-col>Nome</th>
      <th sort="idade">Idade</th>
      <th sort="email">Email</th>
      <th>Ações</th> <!-- sem sort = não ordenável -->
    </tr>
  </thead>
  <tbody>
    <tr each="user in usuarios">
      <td fixed-col bind="user.nome"></td>
      <td bind="user.idade"></td>
      <td bind="user.email"></td>
      <td><button on:click="excluir(user)">🗑️</button></td>
    </tr>
  </tbody>
</table>
```

O JS intercepta cliques nos `th[sort]`. O valor do `sort` indica a key de ordenação. Ao clicar, ordena o array de dados no contexto. Click alterna: `asc → desc → sem sort`. Indicador visual (▲/▼) via CSS `::after`.

**A ordenação não reordena o DOM.** Ela modifica o array de dados no contexto do NoJS, e o `[each]` re-renderiza automaticamente. O plugin encontra o `each` binding no `tbody` para identificar qual array ordenar.

**Fixed header:** `thead[fixed-header]` aplica `position: sticky; top: 0` quando a tabela está dentro de um container com scroll.

**Fixed columns:** `th[fixed-col]` e `td[fixed-col]` aplicam `position: sticky; left: 0` para manter a coluna visível durante scroll horizontal.

**Atributos:**
| Atributo | Elemento | Descrição |
|---|---|---|
| `sortable` | table | Marca a tabela como ordenável |
| `sort` | th | Key de ordenação = propriedade no objeto do array |
| `sort-type` | th | `string` (default), `number`, `date` — tipo de comparação |
| `sort-default` | th | `asc` / `desc` — ordenação inicial |
| `fixed-header` | thead | Header fixo no scroll vertical |
| `fixed-col` | th/td | Coluna fixa no scroll horizontal |

**CSS injetado** (`<style data-nojs-table>`):
```css
.nojs-sortable th[data-sortable] {
  cursor: pointer;
  user-select: none;
}
.nojs-sortable th[data-sortable]::after {
  content: " ⇅";
  opacity: 0.3;
}
.nojs-sortable th[data-sort-dir="asc"]::after {
  content: " ▲";
  opacity: 1;
}
.nojs-sortable th[data-sort-dir="desc"]::after {
  content: " ▼";
  opacity: 1;
}
.nojs-fixed-header {
  position: sticky;
  top: 0;
  z-index: 2;
}
.nojs-fixed-col {
  position: sticky;
  left: 0;
  z-index: 1;
}
.nojs-fixed-header .nojs-fixed-col {
  z-index: 3;
}
```

**ARIA:** TH sortable: `aria-sort="ascending"` / `"descending"` / `"none"`.

---

## Descartado

### Masonry
Já resolvido nativamente com CSS `columns` + `break-inside: avoid`.

### Infinite Scroll
Melhor como atributo nativo do NoJS core, atrelado ao `[get]` (ex: `get-append`).
