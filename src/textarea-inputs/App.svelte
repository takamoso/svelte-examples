<textarea bind:value={ text }></textarea>
{ @html marked(text) }

<script>
  import marked from 'marked'

  let text = 'Some words are *italic*, some are **bold**'
</script>

<style>
  textarea {
    width: 100%;
    height: 100px;
  }
</style>