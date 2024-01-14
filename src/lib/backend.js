let ws;

/** Connect the web client to Reverie's websocket listener
 * @param {(Message) => void} f - The callback to fire when a message is received.
 */
function connect(f) {
	ws = new WebSocket("ws://localhost:8091");
	ws.addEventListener("message", f);
}

/** Sends input to the MUD
 * @param {string} input - The input to send.
 */
function send(input) {
	if (ws.readyState <= 1) {
		ws.send(input);
	}
}

export { connect, send };
