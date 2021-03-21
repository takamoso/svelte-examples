<label>
  Upload a file:
  <input type="file" bind:files>
</label>
<label>
  Upload multiple files:
  <input type="file" multiple bind:files>
</label>

{ #if files }
  <h2>Selected files:</h2>
  { #each Array.from(files) as {name, size} }
    <p>{ name } ({ size } bytes)</p>
  { /each }
{ /if }

<script>
  let files
</script>