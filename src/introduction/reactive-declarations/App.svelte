<button on:click={ () => count++ }>Count: { count }</button>
<p>{ count } * 2 = { double }</p>
<p>{ double } * 2 = { quadruple }</p>

<script>
  let count = 1
  
  $: double = count * 2
  $: quadruple = double * 2
</script>