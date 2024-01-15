import { BSON } from "../../node_modules/bson/lib/bson.mjs";

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
		ws.send(BSON.serialize({ action: input }));
	}
}

export { connect, send };
