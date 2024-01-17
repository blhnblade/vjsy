
let chat = {
  init(){
    this.insertChat()
    this.autoSizeWidth()
    this.sendingToChat()
    this.sendingUsingEnter()
    this.openChat()
    this.closeChat()
  },
  insertChat(){
    document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">');  
    const style = document.createElement('style');
    style.innerHTML = `
    .hidden {
      display: none!important;
    }
    #chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      flex-direction: column;
    }
    .chat-bubble{
      font-size: 30px;
      line-height: 36px;
      border-radius: 100%;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: rgba(31,41,55,1);
    }
    .chat-bubble svg{
      width: 40px;
      height: 40px;
      --tw-text-opacity: 1;
      color: rgba(255,255,255,1);
      display: block;
      vertical-align: middle;
    }

    .chat-popup{
      height: 70vh;
      max-height: 70vh;
      transition: all 0.3s;
      overflow: hidden;
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4,0,0.2,1);
      transition-duration: 150ms;
      box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-radius: 6px;
      font-size: 14px;
      line-height: 20px;
      background-color: rgba(255,255,255, 1);
      width: 384px;
      max-width: 384px;
      min-width: 384px;
      display: flex;
      flex-direction: column;
      position: absolute;
      bottom: 80px;
      right: 0;
    }

    .chat-header{
      color: rgba(255,255,255,1);
      padding: 16px;
      background-color: rgba(31,41,55,1);
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .chat-header h3{
      font-size: 18px;
      line-height: 28px;
      margin: 0;
    }

    .chat-header button{
      color: rgba(255,255,255,1);
      border-style: none;
      cursor: pointer;
    }

    .chat-header button svg{
      width: 24px;
      height: 24px;
    }

    .chat-messages{
      flex: 1 1 0%;
      padding: 16px;
      overflow-y: auto;
    }

    .chat-input-container{
      padding: 16px;
      border-top-width: 1px;
      border-color: rgba(229,231,235,1);

    }

    @media (max-width: 768px) {
      .chat-popup {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }
    }
    `;

    document.head.appendChild(style);

    // Create chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    document.body.appendChild(chatWidgetContainer);
    
    // Inject the HTML
    chatWidgetContainer.innerHTML = `
      <div id="chat-bubble" class="chat-bubble">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <div id="chat-popup" class="chat-popup hidden ">
        <div id="chat-header" class="chat-header">
          <h3>Chat Widget by GPT4</h3>
          <button id="close-popup">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="chat-messages" class="chat-messages"></div>
        <div id="chat-input-container" class="chat-input-container">
          <div class="flex space-x-4 items-center">
            <input type="text" id="chat-input" class="flex-1 border border-gray-300 rounded-md px-4 py-2 outline-none w-3/4" placeholder="Type your message...">
            <button id="chat-submit" class="bg-gray-800 text-white rounded-md px-4 py-2 cursor-pointer">Send</button>
          </div>
        </div>
      </div>
    `;
    this.elementSearch()
  },
  elementSearch(){
    this.chatInput = document.getElementById('chat-input');
    this.chatSubmit = document.getElementById('chat-submit');
    this.chatMessages = document.getElementById('chat-messages');
    this.chatBubble = document.getElementById('chat-bubble');
    this.chatPopup = document.getElementById('chat-popup');
    this.closePopup = document.getElementById('close-popup');
  },
  autoSizeWidth(){
    if(this.chatMessages.clientHeight < this.chatMessages.scrollHeight){
      this.chatMessages.style.paddingRight = '2px';
    }
  },
  sendingToChat(){
    this.chatSubmit.addEventListener('click', () => {
      const message = this.chatInput.value.trim();
      if (!message) return;
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
      this.chatInput.value = '';
      this.onUserRequest(message);
      this.autoSizeWidth()
    });
  },
  sendingUsingEnter(){
    this.chatInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        this.chatSubmit.click();
        this.autoSizeWidth()
      }
    });
  },
  openChat(){
    this.chatBubble.addEventListener('click', () => {
      this.togglePopup();
    });
  },
  closeChat(){
    this.closePopup.addEventListener('click', () => {
      this.togglePopup();
    });
  },
  togglePopup(){
    this.chatPopup.classList.toggle('hidden');
    if (!this.chatPopup.classList.contains('hidden')) {
      document.getElementById('chat-input').focus();
    }
  },

  onUserRequest(message){
    // Handle user request here
    console.log('User request:', message);
  
    // Display user message
    const messageElement = document.createElement('div');
    messageElement.className = 'flex justify-end mb-3';
    messageElement.innerHTML = `
      <div class="bg-gray-800 text-white rounded-lg py-2 px-4 max-w-[70%]">
        ${message}
      </div>
    `;
    this.chatMessages.appendChild(messageElement);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  
    this.chatInput.value = '';
  
    // Reply to the user
    setTimeout(() => {
      this.reply('Hello! This is a sample reply.');
    }, 1000);
  },

  reply(message){
    const replyElement = document.createElement('div');
    replyElement.className = 'flex mb-3';
    replyElement.innerHTML = `
      <div class="bg-gray-200 text-black rounded-lg py-2 px-4 max-w-[70%]">
        ${message}
      </div>
    `;
    this.chatMessages.appendChild(replyElement);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    this.autoSizeWidth()
  }
}
chat.init()
