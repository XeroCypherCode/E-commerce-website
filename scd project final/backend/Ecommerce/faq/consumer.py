import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Faq

class FaqConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()  # Accept the WebSocket connection
        print("WebSocket connected")  # This should print when a client connects

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        id = text_data_json['id']

        print(f"Received id: {id}") # Log the received id

        try:
            faq = Faq.objects.filter(id=id)
            print(f"Sending answer: {faq.answer}") # Log the answer before sending it
            await self.send(text_data=json.dumps({
                'answer': faq.answer
            }))
        except Faq.DoesNotExist:
            print("FAQ does not exist") # Log an error message if the FAQ does not exist
            await self.send(text_data=json.dumps({
                'error': 'FAQ does not exist'
            }))