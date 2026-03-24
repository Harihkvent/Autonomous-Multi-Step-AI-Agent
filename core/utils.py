from typing import Sequence, List, Dict, Any
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage, AIMessage

def estimate_tokens(text: str) -> int:
    """
    Roughly estimate tokens based on character count.
    A common heuristic is 4 characters per token.
    """
    if not text:
        return 0
    return len(text) // 4

def truncate_history(messages: Sequence[BaseMessage], max_tokens: int = 3000) -> List[BaseMessage]:
    """
    Truncate message history to fit within max_tokens.
    Always keep the SystemMessage if present.
    Keep the most recent Human/AI messages that fit the budget.
    """
    if not messages:
        return []

    system_msg = None
    other_msgs = []

    for msg in messages:
        if isinstance(msg, SystemMessage):
            system_msg = msg
        else:
            other_msgs.append(msg)

    # Estimate system message tokens
    current_tokens = estimate_tokens(system_msg.content if system_msg else "")
    
    truncated_others = []
    # Work backwards from the most recent message
    for msg in reversed(other_msgs):
        msg_tokens = estimate_tokens(msg.content if hasattr(msg, 'content') else str(msg))
        if current_tokens + msg_tokens <= max_tokens:
            truncated_others.insert(0, msg)
            current_tokens += msg_tokens
        else:
            break

    final_msgs = []
    if system_msg:
        final_msgs.append(system_msg)
    final_msgs.extend(truncated_others)

    return final_msgs

def truncate_context_history(history: List[Dict[str, Any]], max_steps: int = 5) -> List[Dict[str, Any]]:
    """
    Truncate the context history to the last N steps.
    """
    if not history:
        return []
    return history[-max_steps:]
