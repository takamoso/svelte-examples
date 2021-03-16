<Inner on:message={ event => dispatch('message', event.detail) }/>

<script>
  import Inner from './Inner'
  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher()
</script>