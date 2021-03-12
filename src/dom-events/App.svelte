<div on:mousemove={ event => {
  position.x = event.clientX
  position.y = event.clientY
} }>The mouse position is { position.x } × { position.y }</div>

<script>
  const position = {x: 0, y: 0}
</script>

<style type="scss">
  div {
    width: 100%;
    height: 100vh;
  }
</style>