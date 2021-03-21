<h2>Size</h2>

{#each sizes as item}
  <label>
    <input type="radio" bind:group={ size } value={ item }>
    { item }
  </label>
{/each}

<h2>Menu</h2>

{#each menus as item}
  <label>
    <input type="checkbox" bind:group={ menu } value={ item }>
    { item }
  </label>
{/each}

{#if menu.length === 0 }
  <p>Please select at least one item</p>
{:else}
  <p>You ordered { size } size of { new Intl.ListFormat('en', {style: 'long', type: 'conjunction'}).format(menu) }</p>
{/if}

<script>
  const sizes = ['S', 'M', 'L']
  const menus = [
    'Big Mac',
    'World Famous Fries',
    'Coca-Cola',
  ]
  let size = sizes[0]
  let menu = []
</script>