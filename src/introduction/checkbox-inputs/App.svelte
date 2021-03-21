<label>
  <input type="checkbox" bind:checked>
  I agree to the terms of use.
</label>
<button disabled={ !checked }>Sign Up</button>

<script>
  let checked = false
</script>