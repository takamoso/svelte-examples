<button on:click={ () => dispatch('message', {text: 'Hello!'}) }>Click to say hello</button>

<script>
  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher()
</script>