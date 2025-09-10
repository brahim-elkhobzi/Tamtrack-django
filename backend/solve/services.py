# solve/services.py

from groq import Groq
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

# Initialisez le client ici, où il est utilisé
client = Groq(api_key=settings.GROQ_API_KEY) if settings.GROQ_API_KEY else None

def get_domain_prompt(domain):
    # Logique pour obtenir le prompt système...
    return f"You are a helpful assistant specialized in {domain}..."

def solve_math_problem(problem_text, domain=None):
    """Solve a math problem using Groq API"""
    if not problem_text:
        logger.error("Problem text is empty. Cannot solve math problem.")
        return "Error: Problem text is required to solve the problem."

    if client is None:
        logger.error("Groq client not initialized. Please check your API key.")
        return "Error: Groq client not initialized. Please check your API key."

    try:
        # Auto-detect domain if not specified
        if domain is None:
            domain = detect_math_domain(problem_text)

        # Get domain-specific prompt
        system_prompt = get_domain_prompt(domain)

        # Format the problem
        formatted_problem = f"Solve this mathematics problem step-by-step:\n\n{problem_text}"

        # Call Groq API with Claude model
        completion = client.chat.completions.create(
            model="moonshotai/kimi-k2-instruct",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": formatted_problem}
            ],
            temperature=0.2,
            max_tokens=4000
        )

        solution = completion.choices[0].message.content
        logger.info(f"Generated solution for {domain} problem") 

        

        return solution

    except Exception as e:
        logger.error(f"Error solving math problem: {str(e)}")
        return f"Error solving math problem: {str(e)}"

def detect_math_domain(problem_text):
    """Simple heuristic to detect math domain based on keywords"""
    problem_text = problem_text.lower()
    
    if any(kw in problem_text for kw in ["derivative", "integral", "differentiate", "integrate", "limit"]):
        return "calculus"
    elif any(kw in problem_text for kw in ["matrix", "vector", "linear", "determinant", "eigenvalue", "eigenvector", "span"]):
        return "linear_algebra"
    elif any(kw in problem_text for kw in ["probability", "distribution", "random", "variance", "standard deviation", "mean", "median", "hypothesis"]):
        return "statistics"
    elif any(kw in problem_text for kw in ["differential equation", "ode", "pde", "solve for y", "d/dx", "∂/∂t"]):
        return "differential_equations"
    else:
        return "general"