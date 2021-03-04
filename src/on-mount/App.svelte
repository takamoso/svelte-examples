<ul class="photos">
  { #each photos as {title, thumbnailUrl} } 
    <li>
      <img src={ thumbnailUrl } alt={ title }>
    </li>
  { :else }
    <p>Loading...</p>
  { /each }
</ul>

<script>
  import {onMount} from 'svelte'

  let photos = []

  onMount(async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=50`')
    
    photos = await res.json()
  })
</script>

<style lang="scss">
  .photos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    list-style: none;
    img {
      display: block;
      width: 100%;
    }
  }
</style>