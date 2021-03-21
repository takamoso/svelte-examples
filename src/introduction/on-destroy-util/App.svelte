<p>
	The page has been open for
	{ seconds } { seconds <= 1 ? 'second' : 'seconds' }
</p>

<script>
  import {onInterval} from './util'

  let seconds = 0
  
  onInterval(() => seconds += 1, 1000)
</script>