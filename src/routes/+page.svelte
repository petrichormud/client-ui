<script>
	import Terminal from "$lib/components/Terminal.svelte";
	import Input from "$lib/components/Input.svelte";
</script>

<svelte:head>
  <title>PetrichorMUD</title>
</svelte:head>

<svelte:body class="dark"></svelte:body>

<section id="left" class="grow px-6"></section>
<section id="center" class="flex h-full w-2/3 flex-col items-center justify-end">
	<Terminal />
	<Input />
</section>
<section id="right" class="grow px-6"></section>
