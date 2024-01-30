<script>
  import { Body } from 'svelte-body';
	import "../styles/app.css";
</script>

<Body class="dark" />

<main class="flex h-screen w-screen items-center justify-center">
	<slot />
</main>
