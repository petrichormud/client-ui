<script>
	import { onMount } from "svelte";
	import "../../styles/xterm.css";
	import { connect } from "$lib/backend";

	onMount(async () => {
		const terminalNode = document.getElementById("terminal");
		if (!terminalNode) return;

		const { Terminal } = await import("xterm");
		const { FitAddon } = await import("xterm-addon-fit");

		const terminal = new Terminal({
			theme: {
				background: "#0f172a",
				cursor: "#0f172a"
			}
		});
		const fitAddon = new FitAddon();
		terminal.loadAddon(fitAddon);

		terminal.open(terminalNode);
		fitAddon.fit();

		window.addEventListener("resize", () => {
			fitAddon.fit();
		});

		connect((message) => {
			const bytes = Array.from(message.data, (char) => char.charCodeAt(0));
			terminal.write(bytes);
		});

		// const { invoke } = await import("@tauri-apps/api");
		// const { listen } = await import("@tauri-apps/api/event");
		//
		// const unlisten = await listen(
		//   "output",
		//   (e: Event<Uint8Array>) => {
		//     processPrompt(e.payload);
		//     terminal.write(e.payload);
		//   }
		// );
		//
		// invoke("connect");

		return () => {
			terminal.dispose();
			// unlisten();
		};
	});
</script>

<section id="terminal" class="w-full grow"></section>
