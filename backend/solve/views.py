# solve/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
import logging

# Supposez que vos fonctions solve se trouvent dans un fichier de services
from .services import solve_math_problem 

logger = logging.getLogger(__name__)

class SolveProblemView(APIView):
    # Autoriser l'envoi de fichiers (images) et de données de formulaire
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        problem_text = request.data.get('problem_text', '')
        problem_image = request.FILES.get('problem_image')
        # Le domaine est maintenant détecté automatiquement, donc pas besoin de le récupérer
        # domain = request.data.get('domain', 'general')

        if not problem_text and not problem_image:
            return Response(
                {'error': "Veuillez fournir un problème sous forme de texte ou d'image."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        final_problem_text = problem_text
        
        # Logique pour gérer l'image (si vous implémentez l'OCR)
        if problem_image:
            try:
                # ICI, vous mettriez votre logique OCR pour extraire le texte de l'image
                # Exemple factice :
                # ocr_text = ocr_service(problem_image)
                # final_problem_text += f"\n\n--- Problème extrait de l'image ---\n{ocr_text}"
                pass # Pour l'instant, on ignore l'image
            except Exception as e:
                logger.error(f"Erreur OCR: {e}")
                return Response({'error': "Erreur lors de l'analyse de l'image."}, status=500)
        
        try:
            # On appelle votre logique métier principale
            solution = solve_math_problem(problem_text=final_problem_text)
            
            return Response({
                'problem': final_problem_text,
                'solution': solution
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Erreur lors de la résolution du problème : {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)