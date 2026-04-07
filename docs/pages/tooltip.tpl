<style>
  /* ─── Tooltip-specific ─────────────────────── */
  .tooltip-grid {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 1rem;
  }
  .tooltip-grid button {
    padding: 0.6rem 1.2rem;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-surface);
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    transition: background 0.12s, border-color 0.12s;
  }
  .tooltip-grid button:hover {
    background: var(--color-hover);
    border-color: var(--color-hover-border);
  }
</style>

<div class="route-header">
  <span class="route-badge">Overlay</span>
  <h1>Tooltip</h1>
  <p>Lightweight text hints on hover and focus, with positioning, delay, and reactive disable.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Passive text hints that appear on hover or focus. Positioned automatically with viewport awareness, full keyboard support, and reactive disable control.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>tooltip</code></td><td>string</td><td><em>required</em></td><td>Text content displayed in the tooltip</td></tr>
      <tr><td><code>tooltip-position</code></td><td><code>"top"</code> | <code>"bottom"</code> | <code>"left"</code> | <code>"right"</code></td><td><code>"top"</code></td><td>Placement relative to the trigger element</td></tr>
      <tr><td><code>tooltip-delay</code></td><td>number (ms)</td><td><code>300</code></td><td>Delay before the tooltip appears</td></tr>
      <tr><td><code>tooltip-disabled</code></td><td>expression</td><td>—</td><td>Reactive boolean. When truthy, prevents tooltip from showing</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>role="tooltip"</code>, <code>aria-describedby</code>, and <code>aria-hidden</code> automatically. Shows on <code>focusin</code>, hides on <code>focusout</code>, and dismisses on <code>Escape</code>.</p>

</section>

<!-- Basic Tooltip -->
<section class="demo-section">
  <h2>Basic Tooltip</h2>
  <p>Hover over each button to see the tooltip at different positions.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <div class="tooltip-grid">
        <button tooltip="Tooltip on top" tooltip-position="top">Top</button>
        <button tooltip="Tooltip on bottom" tooltip-position="bottom">Bottom</button>
        <button tooltip="Tooltip on left" tooltip-position="left">Left</button>
        <button tooltip="Tooltip on right" tooltip-position="right">Right</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"Tooltip on top"</span>
<span class="ln"> 3</span>  <span class="hl-a">tooltip-position</span><span class="hl-p">=</span><span class="hl-s">"top"</span><span class="hl-t">&gt;</span>
<span class="ln"> 4</span>  <span class="hl-x">Top</span>
<span class="ln"> 5</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span><span class="hl-t">&lt;button</span>
<span class="ln"> 8</span>  <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"Tooltip on bottom"</span>
<span class="ln"> 9</span>  <span class="hl-a">tooltip-position</span><span class="hl-p">=</span><span class="hl-s">"bottom"</span><span class="hl-t">&gt;</span>
<span class="ln">10</span>  <span class="hl-x">Bottom</span>
<span class="ln">11</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">12</span>
<span class="ln">13</span><span class="hl-t">&lt;button</span>
<span class="ln">14</span>  <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"Tooltip on left"</span>
<span class="ln">15</span>  <span class="hl-a">tooltip-position</span><span class="hl-p">=</span><span class="hl-s">"left"</span><span class="hl-t">&gt;</span>
<span class="ln">16</span>  <span class="hl-x">Left</span>
<span class="ln">17</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">18</span>
<span class="ln">19</span><span class="hl-t">&lt;button</span>
<span class="ln">20</span>  <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"Tooltip on right"</span>
<span class="ln">21</span>  <span class="hl-a">tooltip-position</span><span class="hl-p">=</span><span class="hl-s">"right"</span><span class="hl-t">&gt;</span>
<span class="ln">22</span>  <span class="hl-x">Right</span>
<span class="ln">23</span><span class="hl-t">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Custom Delay -->
<section class="demo-section">
  <h2>Custom Delay</h2>
  <p>The first tooltip appears instantly, the second after a 1-second delay.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <div class="tooltip-grid">
        <button tooltip="I appear instantly" tooltip-delay="0">Instant (0ms)</button>
        <button tooltip="I appear after 1s" tooltip-delay="1000">Slow (1000ms)</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"I appear instantly"</span>
<span class="ln"> 3</span>  <span class="hl-a">tooltip-delay</span><span class="hl-p">=</span><span class="hl-s">"0"</span><span class="hl-t">&gt;</span>
<span class="ln"> 4</span>  <span class="hl-x">Instant (0ms)</span>
<span class="ln"> 5</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 6</span>
<span class="ln"> 7</span><span class="hl-t">&lt;button</span>
<span class="ln"> 8</span>  <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"I appear after 1s"</span>
<span class="ln"> 9</span>  <span class="hl-a">tooltip-delay</span><span class="hl-p">=</span><span class="hl-s">"1000"</span><span class="hl-t">&gt;</span>
<span class="ln">10</span>  <span class="hl-x">Slow (1000ms)</span>
<span class="ln">11</span><span class="hl-t">&lt;/button&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Disabled Tooltip -->
<section class="demo-section">
  <h2>Disabled Tooltip</h2>
  <p>Use <code>tooltip-disabled</code> to reactively prevent the tooltip from showing.</p>
  <div class="demo-tabbed" state="{ showCode: false }">
    <div class="demo-tabbed-bar">
      <div class="demo-tabbed-dots"><span></span><span></span><span></span></div>
      <div class="demo-tabbed-tabs">
        <button class-active="!showCode" on:click="showCode = false">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          Preview
        </button>
        <button class-active="showCode" on:click="showCode = true">
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code
        </button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode">
      <div state="{ off: false }" class="tooltip-grid">
        <button tooltip="I can be disabled" tooltip-disabled="off">Hover me</button>
        <button on:click="off = !off" bind="off ? 'Enable Tooltip' : 'Disable Tooltip'"></button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;div</span> <span class="hl-a">state</span><span class="hl-p">=</span><span class="hl-s">"{ off: false }"</span><span class="hl-t">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-t">&lt;button</span>
<span class="ln"> 3</span>    <span class="hl-a">tooltip</span><span class="hl-p">=</span><span class="hl-s">"I can be disabled"</span>
<span class="ln"> 4</span>    <span class="hl-a">tooltip-disabled</span><span class="hl-p">=</span><span class="hl-s">"off"</span><span class="hl-t">&gt;</span>
<span class="ln"> 5</span>    <span class="hl-x">Hover me</span>
<span class="ln"> 6</span>  <span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 7</span>
<span class="ln"> 8</span>  <span class="hl-t">&lt;button</span>
<span class="ln"> 9</span>    <span class="hl-a">on:click</span><span class="hl-p">=</span><span class="hl-s">"off = !off"</span>
<span class="ln">10</span>    <span class="hl-a">bind</span><span class="hl-p">=</span><span class="hl-s">"off ? 'Enable Tooltip' : 'Disable Tooltip'"</span><span class="hl-t">&gt;</span>
<span class="ln">11</span>  <span class="hl-t">&lt;/button&gt;</span>
<span class="ln">12</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>


</div>
