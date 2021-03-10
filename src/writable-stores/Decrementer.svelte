<button on:click={ () => count.update(n => n - 1) }>-</button>

<script>
  import {count} from './store'
</script>