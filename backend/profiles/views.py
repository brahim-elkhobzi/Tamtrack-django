
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Il est mieux de n'importer que les fonctions nécessaires
from quiz.services import check_answer 
from quiz.models import Topic # Assurez-vous d'importer Topic depuis l'app quiz
from .models import UserScore

class SubmitAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, topic_name, question_text):
        user = request.user
        user_answer = request.data.get('answer')
        
        if not user_answer:
            return Response({'error': 'answer requis'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # ==========================================================
            # DÉBUT DE LA CORRECTION POUR L'HÉRITAGE
            # ==========================================================

            # 1. Vérifier que l'utilisateur est bien un étudiant
            if not hasattr(user, 'student'):
                return Response(
                    {"detail": "Seuls les étudiants peuvent soumettre des réponses."},
                    status=status.HTTP_403_FORBIDDEN
                )

            # 2. Récupérer le niveau de manière sécurisée et appliquer une valeur par défaut
            user_level = user.student.level
            if not user_level:
                user_level = "tronc commun"

            # ==========================================================
            # FIN DE LA CORRECTION
            # ==========================================================
            
            # 3. Utiliser le service de `quiz` avec la variable `user_level` corrigée
            result = check_answer(user_level, topic_name, question_text, user_answer) 
            
            if result is None:
                return Response({'error': 'Question non trouvée par le service.'}, status=status.HTTP_404_NOT_FOUND)
            
            # 4. Logique de sauvegarde du score (qui utilise aussi `user_level`)
            try:
                # Utiliser la variable `user_level` corrigée ici aussi
                topic_obj = Topic.objects.get(name__iexact=topic_name, level=user_level)
                
                # Le reste de votre logique de sauvegarde est bon
                score_obj, created = UserScore.objects.get_or_create(user=user, topic=topic_obj)
                
                score_obj.total_answered += 1
                if result['is_correct']:
                    score_obj.correct_answers += 1
                score_obj.save()
                
            except Topic.DoesNotExist:
                # C'est une bonne pratique de loguer cette situation
                print(f"ATTENTION : Thème '{topic_name}' pour le niveau '{user_level}' non trouvé en base de données. Score non enregistré pour l'utilisateur {user.email}.")

            # 5. Renvoyer le feedback au frontend
            # Le score a pu être enregistré (ou non), mais le feedback de la réponse est renvoyé
            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"ERREUR INATTENDUE DANS SubmitAnswerView: {e}")
            return Response({'error': 'Erreur interne du serveur.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)