<script>
  import { onMount, afterUpdate } from "svelte";

  let value = "";
  let history = [];
  let historyPosition = 0;
  let selectValueOnUpdate = false;

  onMount(async () => {
    const textAreaNode = document.querySelector("#input-textarea");
    if (!textAreaNode) return;
    textAreaNode.focus();
  });

  afterUpdate(() => {
    if (selectValueOnUpdate) {
      selectValue();
      selectValueOnUpdate = false;
    }
  });

  function handleInputChange(event) {
    const target = event?.target;

    if (target) {
      value = target.value;
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      historyUp();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      historyDown();
    }
  }

  function handleKeyUp(event) {
    if (event.shiftKey) return;

    if (event.key === "Enter") {
      submitInput();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
    }
  }

  function submitInput() {
    if (getLastHistory() !== value && value.length > 0) {
      history.push(value);
      historyPosition = history.length;
    }

    selectValue();
  }

  function historyUp() {
    if (historyPosition > 0) {
      historyPosition = historyPosition - 1;
    } else {
      return;
    }

    setValueToHistoryAtHistoryPosition();
    selectValue();
  }

  function historyDown() {
    if (historyPosition == history.length) {
      value = "";
      return;
    }

    if (historyPosition < history.length) {
      historyPosition = historyPosition + 1;
    }

    setValueToHistoryAtHistoryPosition();
    selectValue();
  }

  function setValueToHistoryAtHistoryPosition() {
    if (history[historyPosition]) {
      value = history[historyPosition];
    } else {
      value = "";
    }
  }

  function selectValue() {
    const textAreaNode = document.querySelector("#input-textarea");
    if (!textAreaNode) return;
    textAreaNode.select();
  }

  function getLastHistory() {
    if (history.length === 0) return null;
    return history[history.length - 1];
  }
</script>

<section id="input" class="w-full px-4 pt-6 pb-8">
  <textarea
    id="input-textarea"
    class="w-full bg-gray-800 text-white p-4 rounded focus:ring-0 focus:border-transparent border-transparent"
    {value}
    on:input={handleInputChange}
    on:keydown={handleKeyDown}
    on:keyup={handleKeyUp}
    type="text"
    rows="2"
  />
  <div class="text-sm text-gray-400 flex justify-end">Press &#9166; Enter to send</div>
</section>

<style>
  textarea {
    resize: none;
  }
</style>
