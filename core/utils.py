from typing import Sequence, List, Dict, Any
from langchain_core.messages import BaseMessage, SystemMessage, HumanMessage, AIMessage

def estimate_tokens(text: str) -> int:
    """
    Roughly estimate tokens based on character count.
    A common heuristic is 4 characters per token, but for safety
    and to account for overhead, we will use 3 characters per token.
    """
    if not text:
        return 0
    return (len(text) // 3) + 1

def truncate_history(messages: Sequence[BaseMessage], max_tokens: int = 2000) -> List[BaseMessage]:
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
        content = msg.content if hasattr(msg, 'content') else str(msg)
        msg_tokens = estimate_tokens(content)
        
        # If a single message is still larger than the entire budget, 
        # truncate its content to avoid dropping it!
        if msg_tokens > max_tokens - current_tokens:
            # Drop the older messages as they won't fit at all,
            # but truncate the current one locally.
            # Leave a 150 character buffer for suffix and estimation overhead
            available_chars = ((max_tokens - current_tokens) * 3) - 150
            if available_chars > 300: # Only truncate if we have meaningful space
                 new_content = content[:available_chars] + "\n...[TRUNCATED FOR CONTEXT]"
                 # Create a new message object of the same type
                 if isinstance(msg, HumanMessage):
                     msg = HumanMessage(content=new_content)
                 elif isinstance(msg, AIMessage):
                     msg = AIMessage(content=new_content)
                 else:
                     msg = type(msg)(content=new_content)
                 msg_tokens = estimate_tokens(new_content)
            else:
                break # Not enough space even for a truncated version

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
