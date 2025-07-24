export async function queryLLM(prompt, options = {}) {
  const response = await fetch('http://localhost:8000/api/llm/chat/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      ...options
    })
  });

  if (!response.ok) {
    throw new Error(`LLM API error: ${response.status}`);
  }

  return response.json();
}