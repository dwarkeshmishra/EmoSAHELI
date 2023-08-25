from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

# Load your JSON dataset
with open('conversation.json', 'r') as json_file:
    conversation_data = json.load(json_file)

@app.route('/')
def index():
    return render_template('index.html')

def generate_chatbot_response(user_message, chat_history):
    conversation = conversation_data[0]['conversations']
    found = 0

    for entry in conversation:
        if found:
            return entry['value']

        if entry['from'] == 'human' and user_message in entry['value'] and len(user_message) > 10:
            chat_history.append({'from': 'user', 'value': user_message})
            found = 1
            continue

    return "I'm here to support you. Please tell me more."

@app.route('/get_chatbot_response', methods=['POST'])
def get_chatbot_response():
    user_message = request.json['user_input']
    chat_history = request.json['chat_history']

    chatbot_response = generate_chatbot_response(user_message, chat_history)
    chat_history.append({'from': 'chatbot', 'value': chatbot_response})

    return jsonify({'response': chatbot_response, 'chat_history': chat_history})

if __name__ == '__main__':
    app.run(debug=True)
app = Flask(__name__, static_url_path='/static')
