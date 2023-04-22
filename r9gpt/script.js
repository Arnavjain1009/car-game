const form = document.querySelector('form');
const chatContainer = document.getElementById('chat_container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const prompt = e.target.prompt.value;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": `${prompt}`}]
    }),
  });

  const data = await response.json();
  
  const message = data.choices[0].message.content;
  const chatBubble = document.createElement('div');
  chatBubble.className = 'chat';

  const profile = document.createElement('div');
  profile.className = 'profile';

  const img = document.createElement('img');
  img.src = 'assets/ai.png';
  img.alt = 'AI';

  profile.appendChild(img);

  const messageContainer = document.createElement('div');
  messageContainer.className = 'message ai';
  messageContainer.textContent = message;

  chatBubble.appendChild(profile);
  chatBubble.appendChild(messageContainer);

  chatContainer.appendChild(chatBubble);

  // Scroll to bottom of chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Clear the prompt input
  e.target.prompt.value = '';
});
