(function() {
    // Create Chatbot UI elements
    const chatContainer = document.createElement('div');
    chatContainer.id = 'noah-chatbot';
    chatContainer.innerHTML = `
        <style>
            #noah-chatbot {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 350px;
                max-width: 90vw;
                height: 450px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                display: none;
                flex-direction: column;
                z-index: 10000;
                overflow: hidden;
                font-family: 'Source Serif 4', serif;
            }
            #noah-chatbot.active {
                display: flex;
            }
            .chat-header {
                background: #003F87;
                color: white;
                padding: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .chat-header h4 {
                margin: 0;
                font-family: 'Bebas Neue', sans-serif;
                letter-spacing: 1px;
            }
            .chat-messages {
                flex-grow: 1;
                padding: 15px;
                overflow-y: auto;
                background: #f9f9f9;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .message {
                padding: 10px 15px;
                border-radius: 18px;
                max-width: 80%;
                font-size: 0.9rem;
            }
            .bot-message {
                background: #e0e0e0;
                align-self: flex-start;
                border-bottom-left-radius: 2px;
            }
            .user-message {
                background: #009A44;
                color: white;
                align-self: flex-end;
                border-bottom-right-radius: 2px;
            }
            .chat-input-area {
                padding: 15px;
                border-top: 1px solid #ddd;
                display: flex;
                gap: 10px;
            }
            .chat-input-area input {
                flex-grow: 1;
                border: 1px solid #ddd;
                padding: 8px 12px;
                border-radius: 20px;
                outline: none;
            }
            .chat-input-area button {
                background: #C9A84C;
                border: none;
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                cursor: pointer;
                font-family: 'Bebas Neue', sans-serif;
            }
            .chat-trigger {
                position: fixed;
                bottom: 30px;
                right: 100px;
                background: #003F87;
                color: white;
                padding: 12px 20px;
                border-radius: 30px;
                cursor: pointer;
                z-index: 9999;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                font-family: 'Bebas Neue', sans-serif;
                letter-spacing: 1px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
        </style>
        <div class="chat-header">
            <h4>NOAH-AI 🤖</h4>
            <button id="close-chat" style="background:none; border:none; color:white; cursor:pointer; font-size:1.2rem;">&times;</button>
        </div>
        <div class="chat-messages" id="chat-messages">
            <div class="message bot-message">
                Bonjour ! Je suis NOAH-AI 🤖. Comment puis-je vous aider aujourd'hui ?
            </div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chat-input" placeholder="Tapez votre message...">
            <button id="send-chat">Envoyer</button>
        </div>
    `;

    const trigger = document.createElement('div');
    trigger.className = 'chat-trigger';
    trigger.innerHTML = '<span>Discuter avec NOAH-AI</span> 🤖';

    document.body.appendChild(chatContainer);
    document.body.appendChild(trigger);

    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendBtn = document.getElementById('send-chat');
    const closeBtn = document.getElementById('close-chat');

    trigger.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });

    function addMessage(text, isUser = false) {
        const msg = document.createElement('div');
        msg.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        msg.innerText = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleBotResponse(text) {
        let response = "Je traite votre demande. Pour une assistance immédiate, vous pouvez aussi nous contacter sur WhatsApp !";
        const input = text.toLowerCase();

        if (input.includes('bois') || input.includes('essence')) {
            response = "Nous proposons 12 essences certifiées du Gabon, dont l'Okoumé et le Padouk. Consultez notre galerie 3D !";
        } else if (input.includes('prix') || input.includes('bourse')) {
            response = "Les cours du bois sont mis à jour quotidiennement sur notre plateforme. L'Okoumé est actuellement à $485/m³.";
        } else if (input.includes('nkok') || input.includes('zes')) {
            response = "La ZES de Nkok offre des avantages fiscaux exceptionnels. Vous pouvez télécharger le guide dans notre section Documents.";
        } else if (input.includes('abonnement') || input.includes('payer')) {
            response = "Nos abonnements commencent à 50 000 FCFA/mois via Airtel Money. Voir la section Abonnements.";
        }

        setTimeout(() => {
            addMessage(response);
        }, 1000);
    }

    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, true);
            chatInput.value = '';
            handleBotResponse(text);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
})();
