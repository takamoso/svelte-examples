<input type="number" bind:value={ $count }>
<button on:click={ () => count.update(n => n + 1) }>Count</button>

<script>
  import {count} from './store'
</script>