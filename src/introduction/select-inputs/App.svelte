<h2>Insecurity questions</h2>

<form on:submit|preventDefault={ () => alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`) }>
  <select bind:value={ selected } on:change={ () => answer = '' }>
    { #each questions as question }
      <option value={ question }>{ question.text }</option>
    { /each }
  </select>
  <input type="text" bind:value={ answer }>
  <button disabled={ !answer }>Submit</button>
</form>

<script>
  const questions = [
		{id: 1, text: `Where did you go to school?`},
		{id: 2, text: `What is your mother's name?`},
		{id: 3, text: `What is another personal fact that an attacker could easily find with Google?`},
	]
  let selected
  let answer = ''
</script>