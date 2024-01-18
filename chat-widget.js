
let chat = {
  init(){
    this.insertChat()
    this.autoSizeWidth()
    this.sendingToChat()
    this.sendingUsingEnter()
    this.openChat()
    this.closeChat()
    this.textareaAutoSizeWidth()
    this.resizeChatWidth()
    this.textareaAutoHeight()
  },
  insertChat(){
    // document.head.insertAdjacentHTML('beforeend', '<link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" rel="stylesheet">');  
    document.head.insertAdjacentHTML('beforeend', '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">');  
    const style = document.createElement('style');
    style.innerHTML = `
    .hidden {
      display: none!important;
    }
    .chat-widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      flex-direction: column;
    }
    
    .chat-widget-container * {
      font-family: 'Inter', 'Segoe UI';
      box-sizing: border-box;
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    .chat-header h3{
      font-size: 18px;
      line-height: 28px;
      font-weight: 500;
      margin: 0;
    }

    .chat-header button{
      color: rgba(255,255,255,1);
      border-style: none;
      cursor: pointer;
      background-color: transparent;
      background-image: none;
      text-transform: none;
      -webkit-appearance: button;
      font-family: inherit;
      font-size: 100%;
      margin: 0;
      padding: 0px;
      text-indent: 0px;
      text-shadow: none;
      display: flex;
      align-items:center;
      justify-content: center
      letter-spacing: normal;
      word-spacing: normal;
      text-rendering: auto;
    }

    .chat-header button svg{
      width: 24px;
      height: 24px;
    }

    .chat-messages{
      flex: 1 1 0%;
      padding: 16px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #888 #F2F3F7;
    }

    
    .chat-messages::-webkit-scrollbar {
      width: 3px;
    }
    
    .chat-messages::-webkit-scrollbar-track {
      background-color: white;
    }
    
    .chat-messages::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }
    
    .chat-input-container{
      border-top: 1px solid var(--border-border-gray-200, #E5E7EB);
      border-top-width: 1px;
      border-color: rgba(229,231,235,1);
      padding: 16px;
      background: #FFF;
    }

    .chat-input-container-inner{
      display: flex;
      column-gap: 16px;
    }

    .chat-input{
      flex-grow: 1;
      background-color: #F2F3F7;
      border-radius: 8px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 400;
      padding: 8px 16px;
      outline: none;
      border: none;
      resize: none;
      height: 36px;
      max-height: 136px;
      overflow-y: auto;
      word-break: break-word;
      scrollbar-width: thin;
      scrollbar-color: #888 #F2F3F7;
    }

    .chat-input::-webkit-scrollbar {
      width: 3px;
    }
    
    .chat-input::-webkit-scrollbar-track {
      background-color: white;
    }
    
    .chat-input::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }

    .chat-submit{
      padding: 6px;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      background: #2A63EF;
      border: none;
      align-self: flex-end;
    }

    .chat-submit svg{
      width: 24px;
      height: 24px;
      fill: white;
    }
    
    .chat-message-user{
      max-width: 80%;
      color: rgba(255,255,255,1);
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 16px;
      padding-right: 16px;
      background-color: rgba(31,41,55,1);
      word-break: break-word;
      border-radius: 8px 8px 2px 8px;
      background: #2A63EF;
    }

    .chat-message-user-container{
      display: flex;
      justify-content: flex-end;
      margin-bottom: 12px;
    }

    .chat-message-bot-container{
      display: flex;
      margin-bottom: 12px;
    }

    .chat-message-bot{
      max-width: 80%;
      color: rgba(0,0,0,1);
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 16px;
      padding-right: 16px;
      background-color: rgba(229,231,235,1);
      word-break: break-word;
      border-radius: 8px 8px 8px 2px;
      background: #F2F3F7;
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
        max-width: initial;
        min-width: initial;
      }
      .chat-header{
        border-radius: 0px;
      }
    }

    .chat-widget-container-theme-1 .chat-header, .chat-widget-container-theme-2 .chat-header{
      background-color: #192C3D;
    }

    .chat-widget-container-theme-1 .chat-header h3, .chat-widget-container-theme-2 .chat-header h3{
      color: rgba(255,255,255,1);
    }

    .chat-widget-container-theme-2 .chat-message-user{
      background: #4B5563;
    }

    .chat-widget-container-theme-3 .chat-header{
      background-color: white;
      border-bottom: 1px solid #E5E7EB;
    }
    
    .chat-widget-container-theme-3 .chat-header h3{
      color: #000;
    }
    
    .chat-widget-container-theme-3 .chat-header button svg path{
      stroke: #192C3D;
    }


    .chat-widget-container-theme-3 .chat-message-user{
      background: #192C3D;
    }
    `;

    document.head.appendChild(style);

    // Create chat widget container
    const chatWidgetContainer = document.createElement('div');
    chatWidgetContainer.id = 'chat-widget-container';
    chatWidgetContainer.classList.add('chat-widget-container')
    // Theme 1
    chatWidgetContainer.classList.add('chat-widget-container-theme-1')
    // Theme 2
    // chatWidgetContainer.classList.add('chat-widget-container-theme-2')
    // Theme 3
    // chatWidgetContainer.classList.add('chat-widget-container-theme-3')
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id="chat-messages" class="chat-messages"></div>
        <div id="chat-input-container" class="chat-input-container">
          <div class="chat-input-container-inner">
            <textarea id="chat-input" class="chat-input" placeholder="Написать сообщение..."></textarea>
            <button id="chat-submit" class="chat-submit">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 5V19M12 5L18 11M12 5L6 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
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
    if(window.innerWidth < 768){ return }
    if(this.chatMessages.clientHeight < this.chatMessages.scrollHeight){
      this.chatMessages.style.paddingRight = '13px';
    }
  },
  messagesContainerCheckWidth(){
    if(window.innerWidth > 768 && this.chatMessages.clientHeight < this.chatMessages.scrollHeight){ 
      this.chatMessages.style.paddingRight = '13px';
    } else {
      this.chatMessages.style.paddingRight = '16px';
    }
  },
  resizeChatWidth(){
    window.addEventListener('resize', () => {
      this.messagesContainerCheckWidth()
    })
  },
  textareaCheckWidth(){
    if(window.innerWidth < 768){ return }
    const textareaMaxHeight = parseFloat(getComputedStyle(this.chatInput).maxHeight);
    if(textareaMaxHeight < this.chatInput.scrollHeight){
      this.chatInput.style.paddingRight = '13px';
    } else {
      this.chatInput.style.paddingRight = '16px';
    }
  },
  textareaAutoSizeWidth(){
    this.chatInput.addEventListener('input', () => {
      this.textareaCheckWidth();
    })
  },
  textareaCheckHeight(){
    this.chatInput.style.height = "36px"
    this.chatInput.style.height = this.chatInput.scrollHeight + 'px'; 
  },
  textareaAutoHeight(){
    this.chatInput.addEventListener('input', ()=>{
      this.textareaCheckHeight()
    })
  },
  sendingToChat(){
    this.chatSubmit.addEventListener('click', () => {
      const message = this.chatInput.value.trim();
      if (!message) return;
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
      this.onUserRequest(message);
      this.autoSizeWidth()
      this.textareaCheckHeight()
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
    messageElement.className = 'chat-message-user-container';
    messageElement.innerHTML = `
      <div class="chat-message-user">
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
    replyElement.className = 'flex mb-3 chat-message-bot-container';
    replyElement.innerHTML = `
      <div class="chat-message-bot">
        ${message}
      </div>
    `;
    this.chatMessages.appendChild(replyElement);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    this.autoSizeWidth()
  }
}
chat.init()