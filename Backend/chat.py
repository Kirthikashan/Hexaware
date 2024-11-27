import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from together import Together
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)

# CORS Middleware to allow requests from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Together API Key
TOGETHER_API_KEY = "1121e34f5ab31666f0c57095d74d11043c960e9fdcda8f92bb6f7b88395e8776"  # Replace with your actual API key
client = Together(api_key=TOGETHER_API_KEY)

# Define the input model for the chatbot API
class ChatRequest(BaseModel):
    message: str

# Chatbot response route
@app.post("/api/chat")
async def chat_with_bot(request: ChatRequest):
    try:
        # Create a prompt based on user input
        prompt = f"You are a helpful assistant. Answer the following question: {request.message}"

        # Send the prompt to the Together API and get the bot's response
        response = client.chat.completions.create(
            model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=512,
            temperature=0.7,
            top_p=0.9,
            top_k=50,
            repetition_penalty=1.2,
            stop=["<|eot_id|>", "<|eom_id|>"],
            stream=False
        )

        # Log the response for debugging
        logging.info("Together API response: %s", response)

        # Extract the bot's response content
        if response.choices and response.choices[0].message:
            bot_message = response.choices[0].message.content.strip()
            # Remove any Markdown formatting and line breaks
            bot_message = bot_message.replace("", "").replace("*", "").replace("_", "")
            # Replace newlines with spaces to form a single paragraph
            bot_message = " ".join(bot_message.splitlines()).strip()
            # Optionally, you can further adjust the message to remove extra spaces
            bot_message = " ".join(bot_message.split())
        else:
            bot_message = "No valid response from the Together API."

        return {"response": bot_message}

    except Exception as e:
        # Log the error
        logging.error("Error: %s", str(e))
        # Handle any exceptions and return an error message
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Route to handle favicon requests
@app.get("/favicon.ico")
async def favicon():
    return {"detail": "No favicon available"}

# Root route
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Chatbot API!"}