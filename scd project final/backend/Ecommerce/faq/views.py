from django.http import JsonResponse
from .models import FAQ

def get_faqs(request):
   faqs = FAQ.objects.all()
   return JsonResponse([faq.serialize() for faq in faqs], safe=False)
from django.http import JsonResponse
from .models import FAQ


def get_faq_answer(request):
   question_id = request.GET.get('question_id', None)
   response_data = {'status': 'failed', 'answer': None}

   if question_id is not None:
       try:
           faq = FAQ.objects.get(id=question_id)
           response_data['answer'] = faq.answer
           response_data['status'] = 'success'
       except FAQ.DoesNotExist:
           response_data['error'] = 'Question does not exist.'

   return JsonResponse(response_data)