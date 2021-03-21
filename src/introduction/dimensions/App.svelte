<input type="range" bind:value={ size }>
<input type="text" bind:value={ text }>
<p>size: { width }px × { height }px</p>
<div bind:clientWidth={ width } bind:clientHeight={ height }>
  <span style="font-size: { size }px">{ text }</span>
</div>

<script>
  let width
  let height
  let size = 42
  let text = 'Edit me'
</script>