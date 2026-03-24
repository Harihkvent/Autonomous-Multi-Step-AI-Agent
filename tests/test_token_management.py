import sys
import os
from unittest.mock import MagicMock, patch

# Add the project root to sys.path
sys.path.append(os.getcwd())

from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from core.utils import estimate_tokens, truncate_history, truncate_context_history

def test_token_estimation():
    print("Testing token estimation...")
    assert estimate_tokens("hello") == 1 # 5 // 4 = 1
    assert estimate_tokens("a" * 4000) == 1000
    print("✓ Token estimation passed.")

def test_history_truncation():
    print("Testing history truncation...")
    system_msg = SystemMessage(content="You are a helpful assistant.") # 29 chars -> 7 tokens
    messages = [system_msg]
    # Add 10 human messages of 1000 characters each (~250 tokens each)
    for i in range(10):
        messages.append(HumanMessage(content="a" * 1000))
    
    # Total tokens ~ 7 + 10 * 250 = 2507
    # If we limit to 1000 tokens, we should keep system_msg and ~ 3.9 human messages
    truncated = truncate_history(messages, max_tokens=1000)
    
    assert truncated[0] == system_msg
    # Each human message is 250 tokens. System is 7. 
    # 7 + 3*250 = 757 (fits)
    # 7 + 4*250 = 1007 (exceeds)
    # So it should keep system + 3 human messages
    assert len(truncated) == 4
    for msg in truncated[1:]:
        assert isinstance(msg, HumanMessage)
    print("✓ History truncation passed.")

def test_context_history_truncation():
    print("Testing context history truncation...")
    history = [{"step": i} for i in range(10)]
    truncated = truncate_context_history(history, max_steps=5)
    assert len(truncated) == 5
    assert truncated[-1] == {"step": 9}
    print("✓ Context history truncation passed.")

@patch('core.graph.krutrim_client')
@patch('core.graph.os.getenv')
def test_graph_integration(mock_getenv, mock_krutrim):
    print("Testing graph integration...")
    from core.graph import generate_krutrim_response
    mock_getenv.return_value = "dummy_key"
    mock_krutrim.chat.completions.create.return_value = MagicMock(choices=[MagicMock(message=MagicMock(content="Hi"))])
    
    messages = [SystemMessage(content="S")]
    for i in range(20):
        messages.append(HumanMessage(content="H" * 1000))
        
    generate_krutrim_response(messages)
    
    # Check what was sent to Krutrim
    call_args = mock_krutrim.chat.completions.create.call_args
    sent_messages = call_args.kwargs['messages']
    
    # Should be truncated to fit 3000 tokens
    # System (0) + N * 250 <= 3000 -> N <= 12
    assert len(sent_messages) <= 13 # System + 12 Human
    print("✓ Graph integration passed.")

if __name__ == "__main__":
    try:
        test_token_estimation()
        test_history_truncation()
        test_context_history_truncation()
        test_graph_integration()
        print("\n--- All Token Management Tests Passed! ---")
    except Exception as e:
        print(f"\n--- Tests Failed: {e} ---")
        sys.exit(1)
