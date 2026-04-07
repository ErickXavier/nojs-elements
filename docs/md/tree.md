# Tree

## `tree` — Tree Container

```html
<!-- Basic tree -->
<ul tree>
  <li branch>
    Documents
    <ul subtree>
      <li branch>
        Work
        <ul subtree>
          <li>Report.pdf</li>
          <li>Slides.pptx</li>
        </ul>
      </li>
      <li>README.md</li>
    </ul>
  </li>
  <li branch>
    Photos
    <ul subtree>
      <li>Vacation.jpg</li>
      <li>Profile.png</li>
    </ul>
  </li>
</ul>
```

### Tree Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `tree` | boolean attr | *required* | Marks the element as a tree root |
| `tree-icon` | `"true"` \| `"false"` | `"true"` | When `"false"`, hides the built-in expand/collapse triangle icons |

---

## `branch` — Expandable Tree Item

Marks an element as a tree item that can be expanded or collapsed. Each `[branch]` should contain a `[subtree]` child with its nested content.

```html
<ul tree>
  <!-- Collapsed by default -->
  <li branch>
    Projects
    <ul subtree>
      <li>NoJS</li>
      <li>LSP</li>
    </ul>
  </li>

  <!-- Starts expanded -->
  <li branch="expanded">
    Favorites
    <ul subtree>
      <li>Home</li>
      <li>Dashboard</li>
    </ul>
  </li>
</ul>
```

### Branch Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `branch` | `""` \| `"expanded"` | `""` (collapsed) | When set to `"expanded"`, the branch starts open |

---

## `subtree` — Nested Group

Marks a child element as the collapsible content of a `[branch]`. The subtree is shown or hidden when its parent branch is toggled.

```html
<ul tree>
  <li branch>
    src
    <ul subtree>
      <li branch>
        components
        <ul subtree>
          <li>Header.html</li>
          <li>Footer.html</li>
        </ul>
      </li>
      <li>index.html</li>
      <li>styles.css</li>
    </ul>
  </li>
</ul>
```

### Subtree Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `subtree` | boolean attr | *required* | Marks the element as a collapsible subtree group |

---

## Nested Trees

Trees support unlimited nesting depth. Each level is automatically indented by the built-in styles.

```html
<ul tree>
  <li branch="expanded">
    Root
    <ul subtree>
      <li branch>
        Level 1
        <ul subtree>
          <li branch>
            Level 2
            <ul subtree>
              <li>Level 3 Leaf</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

---

## Initially Expanded Branches

Use `branch="expanded"` to open specific branches when the tree initializes.

```html
<ul tree>
  <li branch="expanded">
    Open by default
    <ul subtree>
      <li branch>
        Closed child
        <ul subtree>
          <li>Hidden until expanded</li>
        </ul>
      </li>
      <li>Visible immediately</li>
    </ul>
  </li>
  <li branch>
    Closed by default
    <ul subtree>
      <li>Hidden</li>
    </ul>
  </li>
</ul>
```

---

## Dynamic Trees

Trees work with No.JS data-binding directives like `each` for dynamic content.

```html
<div state="{ folders: [
  { name: 'src', children: [
    { name: 'index.js' },
    { name: 'utils.js' }
  ]},
  { name: 'docs', children: [
    { name: 'README.md' }
  ]}
]}">
  <ul tree>
    <template each="folder in folders">
      <li branch>
        <span bind="folder.name"></span>
        <ul subtree if="folder.children.length">
          <template each="file in folder.children">
            <li bind="file.name"></li>
          </template>
        </ul>
      </li>
    </template>
  </ul>
</div>
```

---

## Hiding Icons

Set `tree-icon="false"` to remove the built-in triangle icons, allowing fully custom styling.

```html
<ul tree tree-icon="false">
  <li branch>
    <span class="custom-icon">&#128193;</span> Folder
    <ul subtree>
      <li>File A</li>
    </ul>
  </li>
</ul>
```

---

## Selected State

Clicking a branch selects it, adding the `nojs-branch-selected` class and `aria-selected="true"` to the element. Only one branch can be selected at a time -- selecting a new branch automatically deselects the previous one.

- **Click** selects a branch
- **Enter** / **Space** also selects the focused branch
- Selection is mutually exclusive across the entire tree

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowRight` | Expand a collapsed branch; if already expanded, focus the first child |
| `ArrowLeft` | Collapse an expanded branch; if already collapsed, focus the parent branch |
| `ArrowDown` | Move focus to the next visible tree item |
| `ArrowUp` | Move focus to the previous visible tree item |
| `Enter` / `Space` | Toggle expand/collapse and select the focused branch |
| `Home` | Move focus to the first visible tree item |
| `End` | Move focus to the last visible tree item |
| *Printable character* | **Typeahead** — focuses the next item whose label starts with the typed characters (resets after 500ms of inactivity) |

---

## CSS Classes

No.JS automatically injects these classes:

| Class | When applied |
|-------|-------------|
| `.nojs-tree` | On the `[tree]` root and on every `[subtree]` element |
| `.nojs-branch` | On each `[branch]` element |
| `.nojs-subtree` | On each `[subtree]` element |
| `.nojs-branch-selected` | On the currently selected branch |

### Built-in Style Behavior

| Selector | Style |
|----------|-------|
| `.nojs-tree` | `list-style: none; padding-left: 0; margin: 0` |
| `.nojs-tree .nojs-tree` | `padding-left: 1.25rem` (nested indentation) |
| `.nojs-branch` | `cursor: pointer; user-select: none` |
| `.nojs-branch::before` | Displays a right-pointing triangle (`▸`) with a rotation transition |
| `.nojs-branch[aria-expanded="true"]::before` | Displays a down-pointing triangle (`▾`) |
| `.nojs-tree[data-tree-icon="false"] .nojs-branch::before` | Hides the triangle icon |
| `.nojs-subtree[aria-hidden="true"]` | `display: none` |

---

## Accessibility

No.JS automatically adds:

- `role="tree"` on the tree root
- `role="treeitem"` on each branch
- `role="group"` on each subtree
- `aria-expanded="true/false"` on branches reflecting their expand/collapse state
- `aria-hidden="true/false"` on subtrees reflecting visibility
- `aria-selected="true/false"` on branches reflecting selection state
- Roving `tabindex` — only the focused item has `tabindex="0"`, all others have `tabindex="-1"`
- Full keyboard navigation including typeahead search

---

**Previous:** [Tabs](tabs.md)
