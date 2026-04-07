<div class="route-header">
  <span class="route-badge">Overlay</span>
  <h1>Popover</h1>
  <p>Rich interactive content panels toggled by click, with positioning and light dismiss.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Interactive overlay panels that appear on click. Supports the native Popover API, auto-generated IDs for template usage, proximity-based triggers, and full ARIA accessibility.</p>

  <h3>Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>popover</code></td><td>string (ID)</td><td>auto</td><td>Unique ID linking the popover to its trigger(s). Auto-generated if omitted</td></tr>
      <tr><td><code>popover-position</code></td><td><code>"top"</code> | <code>"bottom"</code> | <code>"left"</code> | <code>"right"</code></td><td><code>"bottom"</code></td><td>Placement relative to the trigger</td></tr>
      <tr><td><code>popover-trigger</code></td><td>string (ID)</td><td>auto</td><td>The popover ID to toggle. Finds nearest popover if omitted</td></tr>
      <tr><td><code>popover-dismiss</code></td><td>boolean attr</td><td>—</td><td>Closes the closest ancestor popover on click</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Triggers get <code>aria-haspopup</code>, <code>aria-expanded</code>, and <code>aria-controls</code> automatically. Uses the native Popover API (<code>popover="auto"</code>) for light dismiss — clicking outside closes it.</p>

</section>

<!-- Basic Popover -->
<section class="demo-section">
  <h2>Basic Popover</h2>
  <p>Click the button to toggle the popover. Use the dismiss button inside to close it.</p>
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
      <button popover-trigger="demo-pop">Toggle Popover</button>
      <div popover="demo-pop" class="popover-box">
        <h3>Popover Title</h3>
        <p>Rich content that stays open until dismissed.</p>
        <button popover-dismiss>Close</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;button</span>
<span class="ln"> 2</span>  <span class="hl-a">popover-trigger</span><span class="hl-p">=</span><span class="hl-s">"demo-pop"</span><span class="hl-t">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-x">Toggle Popover</span>
<span class="ln"> 4</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 5</span>
<span class="ln"> 6</span><span class="hl-t">&lt;div</span> <span class="hl-a">popover</span><span class="hl-p">=</span><span class="hl-s">"demo-pop"</span>
<span class="ln"> 7</span>     <span class="hl-a">class</span><span class="hl-p">=</span><span class="hl-s">"popover-box"</span><span class="hl-t">&gt;</span>
<span class="ln"> 8</span>  <span class="hl-t">&lt;h3&gt;</span><span class="hl-x">Popover Title</span><span class="hl-t">&lt;/h3&gt;</span>
<span class="ln"> 9</span>  <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Rich content that stays open until dismissed.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">10</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">popover-dismiss</span><span class="hl-t">&gt;</span>
<span class="ln">11</span>    <span class="hl-x">Close</span>
<span class="ln">12</span>  <span class="hl-t">&lt;/button&gt;</span>
<span class="ln">13</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Positioned Popover -->
<section class="demo-section">
  <h2>Position Variants</h2>
  <p>Popovers can be positioned in different directions relative to the trigger.</p>
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
    <div class="demo-tabbed-panel demo-tab-example" show="!showCode" style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button popover-trigger="pop-bottom">Bottom</button>
      <div popover="pop-bottom" popover-position="bottom" class="popover-box">
        <p>Positioned below the trigger.</p>
        <button popover-dismiss>Close</button>
      </div>

      <button popover-trigger="pop-top">Top</button>
      <div popover="pop-top" popover-position="top" class="popover-box">
        <p>Positioned above the trigger.</p>
        <button popover-dismiss>Close</button>
      </div>

      <button popover-trigger="pop-right">Right</button>
      <div popover="pop-right" popover-position="right" class="popover-box">
        <p>Positioned to the right.</p>
        <button popover-dismiss>Close</button>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;button</span> <span class="hl-a">popover-trigger</span><span class="hl-p">=</span><span class="hl-s">"pop-bottom"</span><span class="hl-t">&gt;</span><span class="hl-x">Bottom</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 2</span><span class="hl-t">&lt;div</span> <span class="hl-a">popover</span><span class="hl-p">=</span><span class="hl-s">"pop-bottom"</span>
<span class="ln"> 3</span>     <span class="hl-a">popover-position</span><span class="hl-p">=</span><span class="hl-s">"bottom"</span>
<span class="ln"> 4</span>     <span class="hl-a">class</span><span class="hl-p">=</span><span class="hl-s">"popover-box"</span><span class="hl-t">&gt;</span>
<span class="ln"> 5</span>  <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Positioned below the trigger.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln"> 6</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">popover-dismiss</span><span class="hl-t">&gt;</span><span class="hl-x">Close</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 7</span><span class="hl-t">&lt;/div&gt;</span>
<span class="ln"> 8</span>
<span class="ln"> 9</span><span class="hl-t">&lt;button</span> <span class="hl-a">popover-trigger</span><span class="hl-p">=</span><span class="hl-s">"pop-top"</span><span class="hl-t">&gt;</span><span class="hl-x">Top</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">10</span><span class="hl-t">&lt;div</span> <span class="hl-a">popover</span><span class="hl-p">=</span><span class="hl-s">"pop-top"</span>
<span class="ln">11</span>     <span class="hl-a">popover-position</span><span class="hl-p">=</span><span class="hl-s">"top"</span>
<span class="ln">12</span>     <span class="hl-a">class</span><span class="hl-p">=</span><span class="hl-s">"popover-box"</span><span class="hl-t">&gt;</span>
<span class="ln">13</span>  <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Positioned above the trigger.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">14</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">popover-dismiss</span><span class="hl-t">&gt;</span><span class="hl-x">Close</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">15</span><span class="hl-t">&lt;/div&gt;</span>
<span class="ln">16</span>
<span class="ln">17</span><span class="hl-t">&lt;button</span> <span class="hl-a">popover-trigger</span><span class="hl-p">=</span><span class="hl-s">"pop-right"</span><span class="hl-t">&gt;</span><span class="hl-x">Right</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">18</span><span class="hl-t">&lt;div</span> <span class="hl-a">popover</span><span class="hl-p">=</span><span class="hl-s">"pop-right"</span>
<span class="ln">19</span>     <span class="hl-a">popover-position</span><span class="hl-p">=</span><span class="hl-s">"right"</span>
<span class="ln">20</span>     <span class="hl-a">class</span><span class="hl-p">=</span><span class="hl-s">"popover-box"</span><span class="hl-t">&gt;</span>
<span class="ln">21</span>  <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Positioned to the right.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">22</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">popover-dismiss</span><span class="hl-t">&gt;</span><span class="hl-x">Close</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">23</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Reusable Template -->
<section class="demo-section">
  <h2>Reusable Template</h2>
  <p>Define a popover once as a <code>&lt;template&gt;</code>, then reuse it with different data via <code>var-*</code> attributes.</p>
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
      <!-- Template definition -->
      <template id="info-popover">
        <div popover class="popover-box">
          <h3 bind="title"></h3>
          <p bind="content"></p>
          <button popover-dismiss>Got it</button>
        </div>
      </template>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <!-- Instance 1 -->
        <div>
          <div use="info-popover" var-title="'Keyboard Shortcuts'" var-content="'Press Ctrl+K to open the command palette.'"></div>
          <button popover-trigger>Shortcuts</button>
        </div>

        <!-- Instance 2 -->
        <div>
          <div use="info-popover" var-title="'Pro Tip'" var-content="'You can drag and drop items between lists.'"></div>
          <button popover-trigger>Tips</button>
        </div>

        <!-- Instance 3 -->
        <div>
          <div use="info-popover" var-title="'What is NoJS?'" var-content="'An HTML-first reactive framework with zero JavaScript required.'"></div>
          <button popover-trigger>About</button>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-c">&lt;!-- Define once --&gt;</span>
<span class="ln"> 2</span><span class="hl-t">&lt;template</span> <span class="hl-a">id</span><span class="hl-p">=</span><span class="hl-s">"info-popover"</span><span class="hl-t">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">popover</span> <span class="hl-a">class</span><span class="hl-p">=</span><span class="hl-s">"popover-box"</span><span class="hl-t">&gt;</span>
<span class="ln"> 4</span>    <span class="hl-t">&lt;h3</span> <span class="hl-a">bind</span><span class="hl-p">=</span><span class="hl-s">"title"</span><span class="hl-t">&gt;&lt;/h3&gt;</span>
<span class="ln"> 5</span>    <span class="hl-t">&lt;p</span> <span class="hl-a">bind</span><span class="hl-p">=</span><span class="hl-s">"content"</span><span class="hl-t">&gt;&lt;/p&gt;</span>
<span class="ln"> 6</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">popover-dismiss</span><span class="hl-t">&gt;</span>
<span class="ln"> 7</span>      <span class="hl-x">Got it</span>
<span class="ln"> 8</span>    <span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 9</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">10</span><span class="hl-t">&lt;/template&gt;</span>
<span class="ln">11</span>
<span class="ln">12</span><span class="hl-c">&lt;!-- Reuse with different data --&gt;</span>
<span class="ln">13</span><span class="hl-t">&lt;div&gt;</span>
<span class="ln">14</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">use</span><span class="hl-p">=</span><span class="hl-s">"info-popover"</span>
<span class="ln">15</span>    <span class="hl-a">var-title</span><span class="hl-p">=</span><span class="hl-s">"'Keyboard Shortcuts'"</span>
<span class="ln">16</span>    <span class="hl-a">var-content</span><span class="hl-p">=</span><span class="hl-s">"'Press Ctrl+K to open the command palette.'"</span><span class="hl-t">&gt;</span>
<span class="ln">17</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">18</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">popover-trigger</span><span class="hl-t">&gt;</span><span class="hl-x">Shortcuts</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">19</span><span class="hl-t">&lt;/div&gt;</span>
<span class="ln">20</span>
<span class="ln">21</span><span class="hl-t">&lt;div&gt;</span>
<span class="ln">22</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">use</span><span class="hl-p">=</span><span class="hl-s">"info-popover"</span>
<span class="ln">23</span>    <span class="hl-a">var-title</span><span class="hl-p">=</span><span class="hl-s">"'Pro Tip'"</span>
<span class="ln">24</span>    <span class="hl-a">var-content</span><span class="hl-p">=</span><span class="hl-s">"'You can drag and drop items between lists.'"</span><span class="hl-t">&gt;</span>
<span class="ln">25</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">26</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">popover-trigger</span><span class="hl-t">&gt;</span><span class="hl-x">Tips</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">27</span><span class="hl-t">&lt;/div&gt;</span>
<span class="ln">28</span>
<span class="ln">29</span><span class="hl-t">&lt;div&gt;</span>
<span class="ln">30</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">use</span><span class="hl-p">=</span><span class="hl-s">"info-popover"</span>
<span class="ln">31</span>    <span class="hl-a">var-title</span><span class="hl-p">=</span><span class="hl-s">"'What is NoJS?'"</span>
<span class="ln">32</span>    <span class="hl-a">var-content</span><span class="hl-p">=</span><span class="hl-s">"'An HTML-first reactive framework with zero JavaScript required.'"</span><span class="hl-t">&gt;</span>
<span class="ln">33</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">34</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">popover-trigger</span><span class="hl-t">&gt;</span><span class="hl-x">About</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">35</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Triggered by GET -->
<section class="demo-section">
  <h2>Triggered by API Response</h2>
  <p>Open a popover programmatically after a <code>call</code> request completes using <code>NoJS.popover.open()</code>.</p>
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
      <div state="{ user: null }">
        <button
          call="https://jsonplaceholder.typicode.com/users/1"
          as="user"
          then="NoJS.popover.open('user-card', $el)">
          Fetch User & Show
        </button>

        <div popover="user-card" popover-position="bottom" class="popover-box">
          <div if="user">
            <h3 bind="user.name"></h3>
            <p bind="user.email" style="color: var(--color-text-muted); font-size: 0.85rem;"></p>
            <p bind="user.company.name" style="color: var(--color-text-faint); font-size: 0.8rem;"></p>
          </div>
          <button popover-dismiss style="margin-top: 0.5rem;">Close</button>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;div</span> <span class="hl-a">state</span><span class="hl-p">=</span><span class="hl-s">"{ user: null }"</span><span class="hl-t">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-t">&lt;button</span>
<span class="ln"> 3</span>    <span class="hl-a">call</span><span class="hl-p">=</span><span class="hl-s">"https://jsonplaceholder.typicode.com/users/1"</span>
<span class="ln"> 4</span>    <span class="hl-a">as</span><span class="hl-p">=</span><span class="hl-s">"user"</span>
<span class="ln"> 5</span>    <span class="hl-a">then</span><span class="hl-p">=</span><span class="hl-s">"NoJS.popover.open('user-card', $el)"</span><span class="hl-t">&gt;</span>
<span class="ln"> 6</span>    <span class="hl-x">Fetch User &amp; Show</span>
<span class="ln"> 7</span>  <span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 8</span>
<span class="ln"> 9</span>  <span class="hl-t">&lt;div</span>
<span class="ln">10</span>    <span class="hl-a">popover</span><span class="hl-p">=</span><span class="hl-s">"user-card"</span>
<span class="ln">11</span>    <span class="hl-a">popover-position</span><span class="hl-p">=</span><span class="hl-s">"bottom"</span>
<span class="ln">12</span>    <span class="hl-a">class</span><span class="hl-p">=</span><span class="hl-s">"popover-box"</span><span class="hl-t">&gt;</span>
<span class="ln">13</span>    <span class="hl-t">&lt;div</span> <span class="hl-a">if</span><span class="hl-p">=</span><span class="hl-s">"user"</span><span class="hl-t">&gt;</span>
<span class="ln">14</span>      <span class="hl-t">&lt;h3</span> <span class="hl-a">bind</span><span class="hl-p">=</span><span class="hl-s">"user.name"</span><span class="hl-t">&gt;&lt;/h3&gt;</span>
<span class="ln">15</span>      <span class="hl-t">&lt;p</span> <span class="hl-a">bind</span><span class="hl-p">=</span><span class="hl-s">"user.email"</span><span class="hl-t">&gt;&lt;/p&gt;</span>
<span class="ln">16</span>      <span class="hl-t">&lt;p</span> <span class="hl-a">bind</span><span class="hl-p">=</span><span class="hl-s">"user.company.name"</span><span class="hl-t">&gt;&lt;/p&gt;</span>
<span class="ln">17</span>    <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">18</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">popover-dismiss</span><span class="hl-t">&gt;</span>
<span class="ln">19</span>      <span class="hl-x">Close</span>
<span class="ln">20</span>    <span class="hl-t">&lt;/button&gt;</span>
<span class="ln">21</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">22</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

</div>
