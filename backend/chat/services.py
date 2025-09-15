# chat/services.py
from langchain_groq import ChatGroq
from langchain.memory import ConversationBufferMemory
from langchain_core.messages import AIMessage, HumanMessage # Pour reconstruire la mémoire
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from langchain.chains import LLMChain
from django.conf import settings
import json

# L'import qui va tout changer
from .models import ChatHistory

# --- Initialisation du LLM (ne change pas) ---
llm = None
try:
    if settings.GROQ_API_KEY:
        llm = ChatGroq(model_name="llama-3.3-70b-versatile", groq_api_key=settings.GROQ_API_KEY, temperature=0.7)
        print("INFO: Client LangChain/Groq pour le chat initialisé.")
except Exception as e:
    print(f"ERREUR d'initialisation du client LangChain/Groq : {e}")


def get_ai_chat_response(user, user_prompt: str) -> str:
    """
    Fonction principale qui gère la conversation avec une mémoire persistante
    chargée et sauvegardée correctement en base de données pour chaque utilisateur.
    """
    if not llm:
        return "Le service IA est actuellement indisponible."

    # ==========================================================
    # 1. RÉCUPÉRER OU CRÉER L'HISTORIQUE DE L'UTILISATEUR (logique corrigée)
    # ==========================================================
    # get_or_create est la méthode la plus sûre pour un OneToOneField
    chat_history_obj, created = ChatHistory.objects.get_or_create(user=user)
    
    # Si l'objet vient d'être créé, son historique est vide (une liste vide par défaut)
    # S'il existait, chat_history_obj.history contient notre JSON de LangChain
    
    # 2. CONFIGURER LA MÉMOIRE LANGCHAIN EN LA CHARGEANT DEPUIS LA BDD
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    
    # CORRECTION : La reconstruction de la mémoire doit utiliser les objets LangChain
    for message_data in chat_history_obj.history:
        # LangChain utilise maintenant 'type' et 'content' directement dans le message
        if message_data.get('type') == 'human':
            memory.chat_memory.add_message(HumanMessage(content=message_data.get('content')))
        elif message_data.get('type') == 'ai':
            memory.chat_memory.add_message(AIMessage(content=message_data.get('content')))

    # --- Le Prompt Template (ne change pas, il est parfait) ---
    system_prompt_template = """
        Tu es TamTrack IA, un coach d'apprentissage amical et encourageant.
        Tu te souviens du fil de notre conversation pour m'aider au mieux.
        Tu as une fonction spéciale : si un utilisateur te demande d'analyser son profil, ses points forts, 
        ou quoi que ce soit qui nécessite ses données personnelles,
        tu dois répondre avec le texte suivant et RIEN D'AUTRE : **[ANALYSE_PROFIL]**
        Pour toutes les autres questions, réponds normalement.
    """
    prompt_template = ChatPromptTemplate(
        messages=[
            SystemMessagePromptTemplate.from_template(system_prompt_template),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{question}")
        ]
    )

    # --- Création de la chaîne (ne change pas) ---
    conversation_chain = LLMChain(
        llm=llm,
        prompt=prompt_template,
        memory=memory,
        verbose=True
    )

    # 4. EXÉCUTER LA CHAÎNE
    # On ajoute un try/except ici pour une meilleure gestion d'erreur
    try:
        response = conversation_chain.predict(question=user_prompt)
    except Exception as e:
        print(f"ERREUR pendant l'appel .predict() de LangChain : {e}")
        return "Je suis désolé, je n'ai pas pu traiter votre demande pour le moment."
    
    # ==========================================================
    # 5. METTRE À JOUR LA MÉMOIRE EN BDD (logique corrigée)
    # ==========================================================
    # memory.chat_memory.messages contient la liste complète des objets `HumanMessage` et `AIMessage`
    # Nous devons les convertir en un format JSON simple
    updated_history_json = []
    for message in memory.chat_memory.messages:
        updated_history_json.append({
            "type": message.type, # 'human' ou 'ai'
            "content": message.content
        })
    
    chat_history_obj.history = updated_history_json
    chat_history_obj.save() # C'est cette ligne qui sauvegarde en BDD !
    
    return response