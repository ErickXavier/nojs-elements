<style>
  .tabs-scroll-wrap {
    position: relative;
  }
  .tabs-scroll-btn {
    position: absolute;
    top: 0;
    width: 2rem;
    height: 38px;
    z-index: 2;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: var(--color-text-muted);
    padding: 0;
  }
  .tabs-scroll-btn:hover { color: var(--color-accent); }
  .tabs-scroll-btn[hidden] { display: none; }
  .tabs-scroll-btn { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
  .tabs-scroll-left  { left: 0; background: linear-gradient(90deg, var(--color-bg) 60%, transparent); }
  .tabs-scroll-right { right: 0; background: linear-gradient(-90deg, var(--color-bg) 60%, transparent); }
  .nojs-panel h3 { margin-top: 0; }
</style>

<div class="route-header">
  <span class="route-badge">Navigation</span>
  <h1>Tabs</h1>
  <p>Accessible tabbed interface with keyboard navigation, positions, and disabled states.</p>
</div>

<div class="container" style="padding: 2rem;">

<!-- API Documentation -->
<section class="docs-api">

  <p>Accessible tabbed interface with automatic ARIA roles, roving tabindex, and full keyboard navigation. Tabs and panels are paired by order, with support for horizontal and vertical layouts, disabled tabs, and pre-selected indices.</p>

  <h3>Container Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>tabs</code></td><td>number (0-based)</td><td><code>0</code></td><td>Initial active tab index. When empty, the first tab is selected</td></tr>
      <tr><td><code>tab-position</code></td><td><code>"top"</code> | <code>"bottom"</code> | <code>"left"</code> | <code>"right"</code></td><td><code>"top"</code></td><td>Placement of the tab list relative to panels</td></tr>
    </tbody>
  </table>

  <h3>Tab Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>tab</code></td><td>boolean attr</td><td><em>required</em></td><td>Marks an element as a tab trigger. Paired with a <code>panel</code> by order</td></tr>
      <tr><td><code>tab-disabled</code></td><td>expression</td><td><code>false</code></td><td>When truthy, the tab cannot be activated and is skipped by keyboard navigation</td></tr>
    </tbody>
  </table>

  <h3>Panel Attributes</h3>
  <table class="docs-table">
    <thead><tr><th>Attribute</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>panel</code></td><td>boolean attr</td><td><em>required</em></td><td>Marks an element as a tab panel. The first <code>tab</code> controls the first <code>panel</code>, and so on</td></tr>
    </tbody>
  </table>

  <h3>Keyboard Navigation</h3>
  <table class="docs-table">
    <thead><tr><th>Key</th><th>Action</th></tr></thead>
    <tbody>
      <tr><td><code>ArrowRight</code> / <code>ArrowDown</code></td><td>Move to next enabled tab (wraps around)</td></tr>
      <tr><td><code>ArrowLeft</code> / <code>ArrowUp</code></td><td>Move to previous enabled tab (wraps around)</td></tr>
      <tr><td><code>Home</code></td><td>Move to first enabled tab</td></tr>
      <tr><td><code>End</code></td><td>Move to last enabled tab</td></tr>
      <tr><td><code>Tab</code></td><td>Move focus from the tab list into the active panel</td></tr>
    </tbody>
  </table>

  <h3>Accessibility</h3>
  <p>Adds <code>role="tablist"</code> on the wrapper, <code>role="tab"</code> with <code>aria-selected</code> and <code>aria-controls</code> on each tab, <code>role="tabpanel"</code> with <code>aria-labelledby</code> on each panel, roving <code>tabindex</code>, and <code>aria-hidden</code>/<code>inert</code> on inactive panels. Disabled tabs receive <code>aria-disabled="true"</code>.</p>

</section>

<!-- Demo 1: Basic Tabs -->
<section class="demo-section">
  <h2>Basic Tabs</h2>
  <p>A standard tabbed interface with three panels. The first tab is active by default.</p>
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
      <div tabs>
        <button tab>Overview</button>
        <button tab>Details</button>
        <button tab>Settings</button>
        <div panel>
          <h3>Project Overview</h3>
          <p>NoJS Elements is a plugin that provides accessible, interactive UI components using only HTML attributes. No JavaScript knowledge is required to build rich interfaces. Each element is fully keyboard-navigable and follows WAI-ARIA best practices.</p>
        </div>
        <div panel>
          <h3>Technical Details</h3>
          <p>The tabs element manages focus, selection state, and panel visibility automatically. It supports horizontal and vertical orientations, disabled tabs, keyboard support, and pre-selected indices. All ARIA roles and properties are applied at initialization.</p>
        </div>
        <div panel>
          <h3>Configuration Settings</h3>
          <p>You can customize tab behavior through HTML attributes. Use <code>tab-position</code> to change layout orientation, the <code>disabled</code> attribute to prevent interaction, and set a numeric value on the <code>tabs</code> attribute to pre-select a tab.</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;div</span> <span class="hl-a">tabs</span><span class="hl-t">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Overview</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 3</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Details</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 4</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Settings</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 5</span>
<span class="ln"> 6</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln"> 7</span>    <span class="hl-t">&lt;h3&gt;</span><span class="hl-x">Project Overview</span><span class="hl-t">&lt;/h3&gt;</span>
<span class="ln"> 8</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">NoJS Elements is a plugin that provides accessible, interactive UI components using only HTML attributes. No JavaScript knowledge is required to build rich interfaces. Each element is fully keyboard-navigable and follows WAI-ARIA best practices.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln"> 9</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">10</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">11</span>    <span class="hl-t">&lt;h3&gt;</span><span class="hl-x">Technical Details</span><span class="hl-t">&lt;/h3&gt;</span>
<span class="ln">12</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">The tabs element manages focus, selection state, and panel visibility automatically. It supports horizontal and vertical orientations, disabled tabs, keyboard support, and pre-selected indices. All ARIA roles and properties are applied at initialization.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">13</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">14</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">15</span>    <span class="hl-t">&lt;h3&gt;</span><span class="hl-x">Configuration Settings</span><span class="hl-t">&lt;/h3&gt;</span>
<span class="ln">16</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">You can customize tab behavior through HTML attributes. Use tab-position to change layout orientation, the disabled attribute to prevent interaction, and set a numeric value on the tabs attribute to pre-select a tab.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">17</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">21</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Demo 2: Pre-selected Tab -->
<section class="demo-section">
  <h2>Pre-selected Tab</h2>
  <p>Use <code>tabs="1"</code> to start with the second tab active (zero-indexed).</p>
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
      <div tabs="1">
        <button tab>First</button>
        <button tab>Second</button>
        <button tab>Third</button>
        <div panel>
          <p>This is the first panel. It is not visible on load because the second tab is pre-selected.</p>
        </div>
        <div panel>
          <p>This is the second panel. It is visible by default because <code>tabs="1"</code> pre-selects this tab.</p>
        </div>
        <div panel>
          <p>This is the third panel. Navigate here by clicking the third tab.</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;div</span> <span class="hl-a">tabs</span><span class="hl-p">=</span><span class="hl-s">"1"</span><span class="hl-t">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">First</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 3</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Second</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 4</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Third</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 5</span>
<span class="ln"> 6</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln"> 7</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">First panel (hidden on load).</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln"> 8</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln"> 9</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">10</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Second panel (visible by default).</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">11</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">12</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">13</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Third panel.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">14</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">15</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Demo 3: Tab Positions -->
<section class="demo-section">
  <h2>Tab Positions</h2>
  <p>Use <code>tab-position="left"</code> to render tabs vertically on the left side.</p>
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
      <div tabs tab-position="left">
        <button tab>Profile</button>
        <button tab>Security</button>
        <button tab>Notifications</button>
        <div panel>
          <h3>Profile Settings</h3>
          <p>Manage your display name, avatar, and bio. Changes are saved automatically when you navigate away from this panel.</p>
        </div>
        <div panel>
          <h3>Security Settings</h3>
          <p>Configure two-factor authentication, manage active sessions, and update your password. We recommend enabling 2FA for maximum account security.</p>
        </div>
        <div panel>
          <h3>Notification Preferences</h3>
          <p>Choose which notifications you receive by email or push. You can configure alerts for mentions, direct messages, and project updates independently.</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;div</span> <span class="hl-a">tabs</span> <span class="hl-a">tab-position</span><span class="hl-p">=</span><span class="hl-s">"left"</span><span class="hl-t">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Profile</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 3</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Security</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 4</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Notifications</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 5</span>
<span class="ln"> 6</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln"> 7</span>    <span class="hl-t">&lt;h3&gt;</span><span class="hl-x">Profile Settings</span><span class="hl-t">&lt;/h3&gt;</span>
<span class="ln"> 8</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Manage your display name,</span>
<span class="ln"> 9</span>       <span class="hl-x">avatar, and bio.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">10</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">11</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">12</span>    <span class="hl-t">&lt;h3&gt;</span><span class="hl-x">Security Settings</span><span class="hl-t">&lt;/h3&gt;</span>
<span class="ln">13</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Configure 2FA and manage</span>
<span class="ln">14</span>       <span class="hl-x">active sessions.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">15</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">16</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">17</span>    <span class="hl-t">&lt;h3&gt;</span><span class="hl-x">Notification Preferences</span><span class="hl-t">&lt;/h3&gt;</span>
<span class="ln">18</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Choose which notifications</span>
<span class="ln">19</span>       <span class="hl-x">you receive.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">20</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">21</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Demo 4: Scrollable (Many Tabs) -->
<section class="demo-section">
  <h2>Scrollable Tabs</h2>
  <p>When there are too many tabs, the tab bar scrolls horizontally.</p>
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
      <div style="max-width: 400px;">
      <div class="tabs-scroll-wrap">
        <button class="tabs-scroll-btn tabs-scroll-left" hidden id="scroll-left">&lsaquo;</button>
        <button class="tabs-scroll-btn tabs-scroll-right" id="scroll-right">&rsaquo;</button>
      <div tabs>
        <button tab>Dashboard</button>
        <button tab>Analytics</button>
        <button tab>Reports</button>
        <button tab>Users</button>
        <button tab>Settings</button>
        <button tab>Billing</button>
        <button tab>Integrations</button>
        <button tab>API Keys</button>
        <button tab>Webhooks</button>
        <button tab>Logs</button>
        <div panel><p>Dashboard overview with key metrics and recent activity.</p></div>
        <div panel><p>Analytics showing traffic, engagement, and conversion data.</p></div>
        <div panel><p>Generated reports with export options.</p></div>
        <div panel><p>User management and role assignment.</p></div>
        <div panel><p>Application settings and preferences.</p></div>
        <div panel><p>Billing history, invoices, and payment methods.</p></div>
        <div panel><p>Third-party integrations and connected services.</p></div>
        <div panel><p>API key management and access tokens.</p></div>
        <div panel><p>Webhook endpoints and delivery logs.</p></div>
        <div panel><p>Application logs and audit trail.</p></div>
      </div>
      </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-c">&lt;!-- Constrain width to trigger scroll --&gt;</span>
<span class="ln"> 2</span><span class="hl-t">&lt;div</span> <span class="hl-a">style</span><span class="hl-p">=</span><span class="hl-s">"max-width: 400px"</span><span class="hl-t">&gt;</span>
<span class="ln"> 3</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">tabs</span><span class="hl-t">&gt;</span>
<span class="ln"> 4</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Dashboard</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 5</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Analytics</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 6</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Reports</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 7</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Users</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 8</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Settings</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 9</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Billing</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">10</span>    <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Integrations</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln">11</span>    <span class="hl-c">&lt;!-- ... more tabs --&gt;</span>
<span class="ln">12</span>
<span class="ln">13</span>    <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span><span class="hl-t">&lt;p&gt;</span><span class="hl-x">Dashboard overview...</span><span class="hl-t">&lt;/p&gt;&lt;/div&gt;</span>
<span class="ln">14</span>    <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span><span class="hl-t">&lt;p&gt;</span><span class="hl-x">Analytics data...</span><span class="hl-t">&lt;/p&gt;&lt;/div&gt;</span>
<span class="ln">15</span>    <span class="hl-c">&lt;!-- ... more panels --&gt;</span>
<span class="ln">16</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">17</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<!-- Demo 5: Disabled Tab -->
<section class="demo-section">
  <h2>Disabled Tab</h2>
  <p>Add the <code>disabled</code> attribute to a tab to prevent selection. The disabled tab is skipped during keyboard navigation.</p>
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
      <div tabs>
        <button tab>Available</button>
        <button tab tab-disabled="true">Unavailable</button>
        <button tab>Also Available</button>
        <div panel>
          <p>This panel belongs to the first tab, which is fully interactive.</p>
        </div>
        <div panel>
          <p>This panel belongs to the disabled tab. It should not be reachable through normal interaction.</p>
        </div>
        <div panel>
          <p>This panel belongs to the third tab. You can reach it by clicking or using keyboard navigation, which skips the disabled tab.</p>
        </div>
      </div>
    </div>
    <div class="demo-tabbed-panel demo-tab-code" show="showCode">
      <div class="demo-code-scroll">
        <pre>
<span class="ln"> 1</span><span class="hl-t">&lt;div</span> <span class="hl-a">tabs</span><span class="hl-t">&gt;</span>
<span class="ln"> 2</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Available</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 3</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span>
<span class="ln"> 4</span>    <span class="hl-a">tab-disabled</span><span class="hl-p">=</span><span class="hl-s">"true"</span><span class="hl-t">&gt;</span>
<span class="ln"> 5</span>    <span class="hl-x">Unavailable</span>
<span class="ln"> 6</span>  <span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 7</span>  <span class="hl-t">&lt;button</span> <span class="hl-a">tab</span><span class="hl-t">&gt;</span><span class="hl-x">Also Available</span><span class="hl-t">&lt;/button&gt;</span>
<span class="ln"> 8</span>
<span class="ln"> 9</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">10</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">First tab panel.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">11</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">12</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">13</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Disabled tab panel (unreachable).</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">14</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">15</span>  <span class="hl-t">&lt;div</span> <span class="hl-a">panel</span><span class="hl-t">&gt;</span>
<span class="ln">16</span>    <span class="hl-t">&lt;p&gt;</span><span class="hl-x">Third tab panel.</span><span class="hl-t">&lt;/p&gt;</span>
<span class="ln">17</span>  <span class="hl-t">&lt;/div&gt;</span>
<span class="ln">18</span><span class="hl-t">&lt;/div&gt;</span></pre>
      </div>
    </div>
  </div>
</section>

<script>
  // Wire scroll buttons for scrollable tabs
  requestAnimationFrame(function() {
    var wrap = document.querySelector('.tabs-scroll-wrap');
    if (!wrap) return;
    var tl = wrap.querySelector('.nojs-tablist');
    var btnL = document.getElementById('scroll-left');
    var btnR = document.getElementById('scroll-right');
    if (!tl || !btnL || !btnR) return;
    function update() {
      btnL.hidden = tl.scrollLeft <= 0;
      btnR.hidden = tl.scrollLeft + tl.clientWidth >= tl.scrollWidth - 1;
    }
    btnL.addEventListener('click', function() { tl.scrollBy({left: -200, behavior: 'smooth'}); });
    btnR.addEventListener('click', function() { tl.scrollBy({left: 200, behavior: 'smooth'}); });
    tl.addEventListener('scroll', update);
    update();
  });
</script>

</div>
