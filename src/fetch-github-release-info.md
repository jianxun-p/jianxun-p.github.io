# Fetch GitHub Repo Latest Release Info

Link to GitHub Repository: [https://github.com/jianxun-p/github-repo-release-info-pulling](https://github.com/jianxun-p/github-repo-release-info-pulling)

## About

AI-Agent for pulling GitHub release information with automated browsers and vision models.

This project uses [LangGraph](https://github.com/langchain-ai/langgraph) along with OpenAI's API ([GPT-5.1 model](https://developers.openai.com/api/docs/models/gpt-5.1)).

It controls the browser to fetch the latest release information of the specified repository (openclaw in the example, see `navigate.py`) from GitHub.

<video src="./videos/demo-fetch-github-release-info.mp4" controls></video>

## Development Proccess

### Initial Approach

Initial Approach & Visual Challenges Initially, I implemented a bordered selection box on
screenshots and prompted a multimodal model to "move the selection box to include the
target." The model was provided with the following function-calling tools:

- Translate Box: Moves the box in four directions by fixed increments.
- Zoom Box: Scales the box up or down by fixed increments.
- Interactions: Executes keyboard inputs, clicks, and double-clicks.

This approach yielded no progress. I suspected the model struggled to perceive the thin
selection border, but even after switching to a high-contrast red shaded rectangle,
performance remained poor.

### Introducing ReAct Agentic Loops

Transition to ReAct Agentic Loops To improve reliability, I decomposed the problem into smaller
tasks by introducing an agentic loop. The system now constantly monitors the current state
to determine if the target is within the box. If the target is not captured, the logic determines
the next necessary action (zooming, moving, or inputting text).

While this improved performance—correctly moving toward the target in roughly 50% of
cases—the model frequently suffered from "looping," where it moved the box back to
previously visited coordinates. Resetting the message history and refining the prompt
offered negligible improvements.

### Locating the Target First with Divide and Conquer

Divide and Conquer Observing that the model was significantly more
accurate at verifying the target's presence than manipulating the tools, I shifted to a
"divide and conquer" strategy. I restricted the model’s role solely to locating the target,
while the Python backend handles the search logic.

This narrowed focus allows the system to locate targets using a logarithmic search
pattern. To mitigate hallucinations, I implemented a "zoom-out" recovery step, allowing
the system to backtrack if a false positive is detected. This final iteration has proven to be
the most robust.

### Generators for Function Calling Tools

Generators for Function Calling Tools To further optimize the codebase, I refactored the function-calling tools to utilize Python generators. This allows for more efficient state management and cleaner code, as the generator can yield control back to the main loop after each action, enabling better handling of asynchronous interactions with the browser and model responses.

It take advantage of the document comments of the functions to automatically generate the tool descriptions for the model, which significantly reduces the amount of tokens used and also makes it easier to maintain the codebase since there is no need to manually update the tool descriptions when the function signatures change.

See `tool.py` for the implementation of the generators for function-calling tools.

See `browser.py` for the usage of the generators.

This was significant improvement in readability and maintainability of the code, as well as reducing token usage and improving the overall performance of the agent.

### Target Localization Based On Text Recognition

Since LLMs excel at interpreting text, I also implemented an OCR-based approach for target localization. The model extracts text from screenshots and uses function-calling tools to invoke the appropriate `Playwright` functions. This yielded higher accuracy while reducing token usage and improving speed.

### Changing Model to GPT-5.1 and Refactoring with LangGraph

GPT-4.1-mini was used in the initial implementation, but it struggled with hallucinations and had limited context window. After switching to GPT-5.1, the model's performance improved significantly, with more accurate target localization and reduced hallucinations. However, this change cause money cost to increase significantly, so I had to optimize the prompt and reduce token usage.

LangGraph Integration With the introduction of LangGraph, I restructured the codebase to leverage its agentic capabilities. The core logic of the agent remains consistent with the previous
iteration, butthe implementation is now more modular and maintainable. LangGraph's framework allows for clearer separation of concerns, making it easier to manage the agent's state and interactions with the environment.

### Future Improvements

Need a way to backtrack when the model makes a wrong move, which is inevitable. The current method is to zoom out to the previous state, but it is not ideal since it is not guaranteed that the target would be in the box after zooming out, and it also wastes a lot of tokens and time.
