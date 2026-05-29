import NoJS from '../../NoJS/src/index.js';
import { _disposeTree } from '../../NoJS/src/registry.js';
import NoJSElements from '../src/index.js';
import { _tableState } from '../src/table/state.js';

// ─── Install the plugin once before all tests ────────────────────────
beforeAll(() => {
  NoJS.use(NoJSElements);
});

// ─── Helper: build a sortable table with data ───────────────────────
function setupSortableTable(opts = {}) {
  const {
    columns = [
      { key: 'name', label: 'Name', sortType: 'string' },
      { key: 'age', label: 'Age', sortType: 'number' },
    ],
    data = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ],
    sortDefaults = {},
    fixedHeader = false,
    fixedCols = [],
  } = opts;

  const parent = document.createElement('div');
  parent.setAttribute('state', `{ rows: ${JSON.stringify(data)} }`);

  const table = document.createElement('table');
  table.setAttribute('sortable', '');

  // thead
  const thead = document.createElement('thead');
  if (fixedHeader) thead.setAttribute('fixed-header', '');
  const headerRow = document.createElement('tr');
  columns.forEach((col, i) => {
    const th = document.createElement('th');
    th.setAttribute('sort', col.key);
    th.setAttribute('sort-type', col.sortType || 'string');
    if (sortDefaults[col.key]) {
      th.setAttribute('sort-default', sortDefaults[col.key]);
    }
    if (fixedCols.includes(i)) {
      th.setAttribute('fixed-col', '');
    }
    th.textContent = col.label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // tbody with each binding
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');
  tr.setAttribute('each', 'row in rows');
  columns.forEach((col, i) => {
    const td = document.createElement('td');
    td.setAttribute('bind', `row.${col.key}`);
    if (fixedCols.includes(i)) {
      td.setAttribute('fixed-col', '');
    }
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
  table.appendChild(tbody);

  parent.appendChild(table);
  document.body.appendChild(parent);
  NoJS.processTree(parent);

  return { parent, table, thead, tbody, ctx: parent.__ctx };
}

// ─── Helper: get th elements from a table ───────────────────────────
function getHeaders(table) {
  return Array.from(table.querySelectorAll('th[data-sortable]'));
}

// =======================================================================
//  SORTABLE DIRECTIVE TESTS
// =======================================================================

describe('Sortable Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-table]').forEach(s => s.remove());
    _tableState.sorts.clear();
  });

  test('1 — injects table styles once', () => {
    setupSortableTable();
    const styles = document.querySelectorAll('style[data-nojs-table]');
    expect(styles.length).toBe(1);
    expect(styles[0].textContent).toContain('.nojs-sortable');
    expect(styles[0].textContent).toContain('.nojs-fixed-header');
    expect(styles[0].textContent).toContain('.nojs-fixed-col');

    // Second table doesn't inject again
    setupSortableTable();
    expect(document.querySelectorAll('style[data-nojs-table]').length).toBe(1);
  });
});

// =======================================================================
//  SORT DIRECTIVE TESTS
// =======================================================================

describe('Sort Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-table]').forEach(s => s.remove());
    _tableState.sorts.clear();
  });

  test('2 — sort directive marks th as data-sortable', () => {
    const { table } = setupSortableTable();
    const ths = getHeaders(table);
    expect(ths.length).toBe(2);
    ths.forEach(th => {
      expect(th.hasAttribute('data-sortable')).toBe(true);
    });
  });

  test('3 — initial aria-sort is "none"', () => {
    const { table } = setupSortableTable();
    const ths = getHeaders(table);
    ths.forEach(th => {
      expect(th.getAttribute('aria-sort')).toBe('none');
    });
  });

  test('4 — click cycles sort: asc -> desc -> none', () => {
    const { table } = setupSortableTable();
    const ths = getHeaders(table);
    const nameTh = ths[0];

    // First click -> asc
    nameTh.click();
    expect(nameTh.getAttribute('data-sort-dir')).toBe('asc');
    expect(nameTh.getAttribute('aria-sort')).toBe('ascending');

    // Second click -> desc
    nameTh.click();
    expect(nameTh.getAttribute('data-sort-dir')).toBe('desc');
    expect(nameTh.getAttribute('aria-sort')).toBe('descending');

    // Third click -> none
    nameTh.click();
    expect(nameTh.hasAttribute('data-sort-dir')).toBe(false);
    expect(nameTh.getAttribute('aria-sort')).toBe('none');
  });

  test('5 — clicking different column resets previous column indicator', () => {
    const { table } = setupSortableTable();
    const ths = getHeaders(table);

    ths[0].click(); // Name asc
    expect(ths[0].getAttribute('data-sort-dir')).toBe('asc');

    ths[1].click(); // Age asc
    expect(ths[1].getAttribute('data-sort-dir')).toBe('asc');
    expect(ths[0].hasAttribute('data-sort-dir')).toBe(false);
    expect(ths[0].getAttribute('aria-sort')).toBe('none');
  });

  test('6 — sort reorders rows by string comparison (asc)', () => {
    const { table, ctx } = setupSortableTable();
    const ths = getHeaders(table);

    ths[0].click(); // Name asc
    expect(ctx.rows[0].name).toBe('Alice');
    expect(ctx.rows[1].name).toBe('Bob');
    expect(ctx.rows[2].name).toBe('Charlie');
  });

  test('7 — sort reorders rows by string comparison (desc)', () => {
    const { table, ctx } = setupSortableTable();
    const ths = getHeaders(table);

    ths[0].click(); // Name asc
    ths[0].click(); // Name desc
    expect(ctx.rows[0].name).toBe('Charlie');
    expect(ctx.rows[1].name).toBe('Bob');
    expect(ctx.rows[2].name).toBe('Alice');
  });

  test('8 — sort reorders rows by number comparison', () => {
    const { table, ctx } = setupSortableTable();
    const ths = getHeaders(table);

    ths[1].click(); // Age asc
    expect(ctx.rows[0].age).toBe(25);
    expect(ctx.rows[1].age).toBe(30);
    expect(ctx.rows[2].age).toBe(35);
  });

  test('9 — sort-type="date" sorts by date', () => {
    const { table, ctx } = setupSortableTable({
      columns: [
        { key: 'date', label: 'Date', sortType: 'date' },
      ],
      data: [
        { date: '2024-03-15' },
        { date: '2024-01-01' },
        { date: '2024-06-30' },
      ],
    });
    const ths = getHeaders(table);

    ths[0].click(); // Date asc
    expect(ctx.rows[0].date).toBe('2024-01-01');
    expect(ctx.rows[1].date).toBe('2024-03-15');
    expect(ctx.rows[2].date).toBe('2024-06-30');
  });

  test('10 — removing sort restores original order', () => {
    const { table, ctx } = setupSortableTable();
    const originalOrder = ctx.rows.map(r => r.name);
    const ths = getHeaders(table);

    ths[0].click(); // asc
    ths[0].click(); // desc
    ths[0].click(); // none — restore

    expect(ctx.rows.map(r => r.name)).toEqual(originalOrder);
  });
});

// =======================================================================
//  SORT-DEFAULT TESTS
// =======================================================================

describe('Sort Default', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-table]').forEach(s => s.remove());
    _tableState.sorts.clear();
  });

  test('11 — sort-default="asc" applies ascending sort on init', () => {
    const { table, ctx } = setupSortableTable({
      sortDefaults: { name: 'asc' },
    });
    const ths = getHeaders(table);

    expect(ths[0].getAttribute('data-sort-dir')).toBe('asc');
    expect(ths[0].getAttribute('aria-sort')).toBe('ascending');
    expect(ctx.rows[0].name).toBe('Alice');
  });

  test('12 — sort-default="desc" applies descending sort on init', () => {
    const { table, ctx } = setupSortableTable({
      sortDefaults: { age: 'desc' },
    });
    const ths = getHeaders(table);

    expect(ths[1].getAttribute('data-sort-dir')).toBe('desc');
    expect(ths[1].getAttribute('aria-sort')).toBe('descending');
    expect(ctx.rows[0].age).toBe(35);
  });

  // ─── #52: multiple sort-default columns — first wins ───────────────
  test('22 — multiple sort-default columns: only the first applies', () => {
    const { table } = setupSortableTable({
      sortDefaults: { name: 'asc', age: 'desc' },
    });
    const ths = getHeaders(table);

    // First-declared column (name) keeps its default; the later one is ignored
    // instead of silently overriding the shared sort state.
    expect(ths[0].getAttribute('data-sort-dir')).toBe('asc');
    expect(ths[1].hasAttribute('data-sort-dir')).toBe(false);
    expect(ths[1].getAttribute('aria-sort')).toBe('none');

    const state = _tableState.sorts.get(table);
    expect(state.column).toBe('name');
    expect(state.direction).toBe('asc');
  });
});

// =======================================================================
//  FIXED-HEADER DIRECTIVE TESTS
// =======================================================================

describe('Fixed-Header Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-table]').forEach(s => s.remove());
    _tableState.sorts.clear();
  });

  test('13 — fixed-header adds nojs-fixed-header class', () => {
    const { thead } = setupSortableTable({ fixedHeader: true });
    expect(thead.classList.contains('nojs-fixed-header')).toBe(true);
  });
});

// =======================================================================
//  FIXED-COL DIRECTIVE TESTS
// =======================================================================

describe('Fixed-Col Directive', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-table]').forEach(s => s.remove());
    _tableState.sorts.clear();
  });

  test('14 — fixed-col adds nojs-fixed-col class to th', () => {
    const { table } = setupSortableTable({ fixedCols: [0] });
    const th = table.querySelector('th');
    expect(th.classList.contains('nojs-fixed-col')).toBe(true);
  });

  test('15 — fixed-col adds nojs-fixed-col class to td', () => {
    const { table } = setupSortableTable({ fixedCols: [0] });
    // After each renders, the tds should have the class
    const tds = table.querySelectorAll('td.nojs-fixed-col');
    expect(tds.length).toBeGreaterThanOrEqual(1);
  });
});

// =======================================================================
//  CLEANUP TESTS
// =======================================================================

describe('Table Cleanup', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-table]').forEach(s => s.remove());
    _tableState.sorts.clear();
  });

  test('16 — table state tracked in _tableState.sorts', () => {
    const { table } = setupSortableTable();
    expect(_tableState.sorts.has(table)).toBe(true);
  });

  test('17 — sort state tracks column and direction', () => {
    const { table } = setupSortableTable();
    const ths = getHeaders(table);

    ths[0].click();
    const state = _tableState.sorts.get(table);
    expect(state.column).toBe('name');
    expect(state.direction).toBe('asc');
  });

  test('18 — resetTableState clears all sort state', () => {
    const { table } = setupSortableTable();
    const ths = getHeaders(table);
    ths[0].click();

    expect(_tableState.sorts.size).toBeGreaterThan(0);
    _tableState.sorts.clear();
    expect(_tableState.sorts.size).toBe(0);
  });

  // ─── #23: prune _tableState.sorts on table disposal ────────────────
  test('19 — disposing a detached table prunes its sort state and snapshots', () => {
    const { parent, table } = setupSortableTable();
    getHeaders(table)[0].click(); // populate state + original-order snapshot

    expect(_tableState.sorts.has(table)).toBe(true);
    expect(table._nojsOriginalOrder).toBeDefined();

    // Detach, then dispose like the router/each does on teardown
    parent.remove();
    _disposeTree(parent);

    expect(_tableState.sorts.has(table)).toBe(false);
    expect(table._nojsOriginalOrder).toBeUndefined();
  });

  test('20 — disposing while still connected keeps sort state intact', () => {
    const { parent, table } = setupSortableTable();
    getHeaders(table)[0].click();

    // Table still in the document — a partial re-render must not wipe state
    _disposeTree(parent);

    expect(_tableState.sorts.has(table)).toBe(true);
  });
});

// =======================================================================
//  EDGE CASE TESTS
// =======================================================================

describe('Table Edge Cases', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    document.querySelectorAll('style[data-nojs-table]').forEach(s => s.remove());
    _tableState.sorts.clear();
  });

  test('19 — sort handles null values gracefully', () => {
    const { table, ctx } = setupSortableTable({
      columns: [{ key: 'name', label: 'Name', sortType: 'string' }],
      data: [
        { name: 'Bob' },
        { name: null },
        { name: 'Alice' },
      ],
    });
    const ths = getHeaders(table);

    // Should not throw
    expect(() => ths[0].click()).not.toThrow();
    // null should sort before others
    expect(ctx.rows[0].name).toBe(null);
  });

  test('20 — sort handles empty array', () => {
    const { table, ctx } = setupSortableTable({
      data: [],
    });
    const ths = getHeaders(table);

    expect(() => ths[0].click()).not.toThrow();
    expect(ctx.rows).toEqual([]);
  });

  test('21 — multiple sort cycles maintain data integrity', () => {
    const { table, ctx } = setupSortableTable();
    const ths = getHeaders(table);

    // Sort by name asc, then desc, then none
    ths[0].click();
    ths[0].click();
    ths[0].click();

    // Sort by age asc, then desc, then none
    ths[1].click();
    ths[1].click();
    ths[1].click();

    // Data should still have 3 items
    expect(ctx.rows.length).toBe(3);
    expect(ctx.rows.map(r => r.name).sort()).toEqual(['Alice', 'Bob', 'Charlie']);
  });

  // ─── #24: NaN comparators must keep a total order ──────────────────
  test('22 — number sort sinks non-numeric values to the end (asc)', () => {
    const { table, ctx } = setupSortableTable({
      columns: [{ key: 'age', label: 'Age', sortType: 'number' }],
      data: [
        { age: 30 },
        { age: 'N/A' },
        { age: 10 },
        { age: '1,200' },
      ],
    });
    const ths = getHeaders(table);

    ths[0].click(); // Age asc

    // Valid numbers sorted ascending first, invalid (NaN) sink to the end —
    // deterministic total order rather than garbage ordering.
    const order = ctx.rows.map(r => r.age);
    expect(order[0]).toBe(10);
    expect(order[1]).toBe(30);
    // Remaining two are the non-numeric entries (order between them is stable/equal)
    expect(order.slice(2).sort()).toEqual(['1,200', 'N/A'].sort());
  });

  test('23 — number sort preserves negatives and decimals', () => {
    const { table, ctx } = setupSortableTable({
      columns: [{ key: 'val', label: 'Val', sortType: 'number' }],
      data: [
        { val: 0 },
        { val: -5 },
        { val: 2.5 },
        { val: -0.5 },
      ],
    });
    const ths = getHeaders(table);

    ths[0].click(); // asc
    expect(ctx.rows.map(r => r.val)).toEqual([-5, -0.5, 0, 2.5]);
  });

  test('24 — date sort sinks invalid dates to the end (asc)', () => {
    const { table, ctx } = setupSortableTable({
      columns: [{ key: 'date', label: 'Date', sortType: 'date' }],
      data: [
        { date: '2024-03-15' },
        { date: 'not-a-date' },
        { date: '2024-01-01' },
      ],
    });
    const ths = getHeaders(table);

    ths[0].click(); // asc
    const order = ctx.rows.map(r => r.date);
    expect(order[0]).toBe('2024-01-01');
    expect(order[1]).toBe('2024-03-15');
    expect(order[2]).toBe('not-a-date'); // Invalid Date sinks to end
  });

  test('25 — number sort produces a consistent total order regardless of input order', () => {
    const baseData = [
      { age: 'N/A' },
      { age: 5 },
      { age: 'abc' },
      { age: 3 },
    ];
    const run = (data) => {
      const { table, ctx } = setupSortableTable({
        columns: [{ key: 'age', label: 'Age', sortType: 'number' }],
        data,
      });
      getHeaders(table)[0].click();
      return ctx.rows.map(r => (typeof r.age === 'number' ? r.age : 'X'));
    };

    const first = run(baseData);
    document.body.innerHTML = '';
    _tableState.sorts.clear();
    const second = run([...baseData].reverse());

    // Numeric prefix is identical and total order is stable across permutations.
    expect(first.filter(v => v !== 'X')).toEqual([3, 5]);
    expect(second.filter(v => v !== 'X')).toEqual([3, 5]);
  });
});
