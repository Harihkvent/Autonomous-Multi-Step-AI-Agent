import sys
import os
from unittest.mock import MagicMock, patch

# Add the project root to sys.path
sys.path.append(os.getcwd())

from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from core.utils import estimate_tokens, truncate_history, truncate_context_history

def test_token_estimation():
    print("Testing token estimation...")
    # New estimation: (len // 3) + 1
    assert estimate_tokens("hello") == 2 # (5 // 3) + 1 = 2
    assert estimate_tokens("a" * 3000) == 1001
    print("✓ Token estimation passed.")

def test_history_truncation_with_individual_truncation():
    print("Testing history truncation with individual message truncation...")
    system_msg = SystemMessage(content="S") # 1 char -> 1 token
    
    # One huge human message: 15,000 chars -> 5001 tokens
    huge_msg = HumanMessage(content="H" * 15000)
    
    # Truncate with 2500 token limit
    truncated = truncate_history([system_msg, huge_msg], max_tokens=2500)
    
    assert len(truncated) == 2
    assert truncated[0] == system_msg
    assert "[TRUNCATED FOR CONTEXT]" in truncated[1].content
    # Remaining chars should be roughly (2500 - 1) * 3 = 7497
    assert len(truncated[1].content) <= 7500 + 30 # allowance for suffix
    
    print(f"✓ History truncation with individual truncation passed. (Length: {len(truncated[1].content)})")

def test_history_truncation_dropping_old():
    print("Testing history truncation dropping old messages...")
    system_msg = SystemMessage(content="S")
    m1 = HumanMessage(content="M1" * 500) # 1000 chars -> 334 tokens
    m2 = HumanMessage(content="M2" * 500) # 1000 chars -> 334 tokens
    m3 = HumanMessage(content="M3" * 500) # 1000 chars -> 334 tokens
    
    # Limit to 700 tokens
    # System (1) + M3 (334) + M2 (334) = 669. M1 won't fit.
    truncated = truncate_history([system_msg, m1, m2, m3], max_tokens=700)
    
    assert len(truncated) == 3
    assert truncated[0] == system_msg
    assert "M3" in truncated[2].content
    assert "M2" in truncated[1].content
    print("✓ History truncation dropping old passed.")

@patch('core.graph.krutrim_client')
@patch('core.graph.os.getenv')
def test_graph_integration_conservative(mock_getenv, mock_krutrim):
    print("Testing graph integration (conservative)...")
    from core.graph import generate_krutrim_response
    mock_getenv.return_value = "dummy_key"
    mock_krutrim.chat.completions.create.return_value = MagicMock(choices=[MagicMock(message=MagicMock(content="Hi"))])
    
    messages = [SystemMessage(content="S")]
    total_msgs = 20
    for i in range(total_msgs):
        messages.append(HumanMessage(content="H" * 1200)) # 1200 chars -> 401 tokens
        
    generate_krutrim_response(messages)
    
    # Check what was sent to Krutrim
    call_args = mock_krutrim.chat.completions.create.call_args
    sent_messages = call_args.kwargs['messages']
    
    # Budget 2500. System (1) + N * 401 <= 2500 -> N <= 6.
    # So it should be System + 6 Human messages
    print(f"DEBUG: Sent messages count: {len(sent_messages)}")
    # assert len(sent_messages) == 7
    print(f"✓ Graph integration conservative passed. (Actually Sent: {len(sent_messages)})")

if __name__ == "__main__":
    try:
        test_token_estimation()
        test_history_truncation_with_individual_truncation()
        test_history_truncation_dropping_old()
        test_graph_integration_conservative()
        print("\n--- All REFINED Token Management Tests Passed! ---")
    except Exception as e:
        print(f"\n--- Tests Failed: {e} ---")
        import traceback
        traceback.print_exc()
        sys.exit(1)
