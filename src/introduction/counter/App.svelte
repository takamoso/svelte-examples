<input type="number" bind:value={ count }>
<button on:click={ () => count++ }>Count</button>

<script>
  let count = 0
</script>