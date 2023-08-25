document.addEventListener("DOMContentLoaded", function () {
    const chatHistory = document.getElementById("chat-history");
    const userInputElement = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
  
    sendButton.addEventListener("click", async function () {
      const userInput = userInputElement.value;
      if (userInput.trim() !== "") {
        addMessage("user", userInput);
        userInputElement.value = "";
  
        const chatHistory = getChatHistory();
        const response = await getChatbotResponse(userInput, chatHistory);
        addMessage("chatbot", response.response);
  
        chatHistory.push(response.response); // Add chatbot response to chat history
      }
    });
  
    async function getChatbotResponse(userInput, chatHistory) {
      const response = await fetch("/get_chatbot_response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userInput, chat_history: chatHistory }),
      });
  
      const responseData = await response.json();
      return responseData;
    }
  
    function addMessage(sender, message) {
      const messageElement = document.createElement("div");
      messageElement.classList.add(
        sender === "user" ? "user-message" : "chatbot-message"
      );
  
      if (sender === "chatbot") {
        const chatbotImage = document.createElement("img");
        chatbotImage.src = "static/chatbot.jfif"; // Update image source
        chatbotImage.alt = "Chatbot";
        chatbotImage.classList.add("chatbot-image");
        messageElement.appendChild(chatbotImage);
      }
  
      const messageText = document.createElement("div");
      messageText.classList.add("chatbot-text");
      messageText.innerText = message;
      messageElement.appendChild(messageText);
  
      chatHistory.appendChild(messageElement);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  
    function getChatHistory() {
      const chatHistoryElements = document.querySelectorAll(".chatbot-text");
      const chatHistory = Array.from(chatHistoryElements).map(
        (el) => el.innerText
      );
      return chatHistory;
    }
  });
  