let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';
}
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

document.getElementById("voice-btn").onclick = () => {
  if (recognition) recognition.start();
};
if (recognition) {
  recognition.onresult = (event) => {
    const voiceText = event.results[0][0].transcript;
    input.value = voiceText;
  };
}

async function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;
  const model = document.getElementById("model-select").value;
  showMessage(msg, "user");
  input.value = "";
  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg, model })
  });
  const data = await res.json();
  showMessage(data.reply, "ai");
  speak(data.reply);
}

function showMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-ES";
  synth.speak(utter);
}
