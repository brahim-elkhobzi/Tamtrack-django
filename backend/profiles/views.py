# profiles/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from quiz.models import Topic, Question
from quiz import services as quiz_services
from .models import UserScore   

class SubmitAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, topic_name, question_text):
        user = request.user
        user_answer = request.data.get('answer')
        
        if not user_answer:
            return Response({'error': 'answer requis'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # 1. Utiliser le service de `quiz` pour vérifier si la réponse est correcte
            result = quiz_services.check_answer(user.level, topic_name, question_text, user_answer) 
            if result is None:
                return Response({'error': 'Question non trouvée par le service.'}, status=status.HTTP_404_NOT_FOUND)
            
            # 2. Logique de sauvegarde du score dans MySQL
            try:
                # Trouver l'objet Topic correspondant dans la DB
                topic_obj = Topic.objects.get(name__iexact=topic_name, level=user.level)
                
                # Récupérer l'enregistrement de score ou le créer
                score_obj, created = UserScore.objects.get_or_create(user=user, topic=topic_obj)
                
                # Mettre à jour les compteurs
                score_obj.total_answered += 1
                if result['is_correct']:
                    score_obj.correct_answers += 1
                score_obj.save() # L'instruction qui écrit dans la DB
                
                # 3. Renvoyer le feedback au frontend
                return Response(result)

            except Topic.DoesNotExist:
                print(f"ATTENTION : Thème '{topic_name}' non trouvé. Score non enregistré.")
                # On renvoie quand même le feedback, même si le score n'a pu être enregistré
                return Response(result)

        except Exception as e:
            print(f"ERREUR DANS SubmitAnswerView: {e}")
            return Response({'error': 'Erreur interne du serveur.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        




