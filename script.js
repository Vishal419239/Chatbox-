let count = 0;

document.getElementById("prompt-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent page reload
    getChat();
});

async function getChat() {
    const promptInput = document.getElementById('prompt');
    const chatBox = document.getElementById('chat-box');
    const userMessage = promptInput.value;

    // Append user message to chat
    chatBox.innerHTML += `
        <div class="message user-message">
            <p class="message-text">${userMessage}</p>
        </div>
    `;
    
    // Clear input
    promptInput.value = "";

    const url = 'https://chatgpt-42.p.rapidapi.com/gpt4';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '6b24145f8cmsh1b79517766cc76ap17c4bajsncfdfb6be8d42',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: userMessage }],
            web_access: false
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        count++;

        // Append bot message
        chatBox.innerHTML += `
            <div class="message bot-message">
                <img src="gemini-chatbot-logo.svg" class="avatar">
                <p class="message-text">${result.result}</p>
            </div>
        `;

        // Auto-scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;

    } catch (error) {
        console.error(error);
        chatBox.innerHTML += `
            <div class="message bot-message error">
                <p class="message-text">❌ Error fetching response. Check console.</p>
            </div>
        `;
    }
}
