<input type="number" bind:value={ value }>
<button on:click={ () => count.update(n => n + 1) }>Count</button>

<script>
  import {count} from './store'

  let value
  const unsubscribe = count.subscribe(n => value = n)
</script>