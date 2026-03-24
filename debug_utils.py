from typing import Sequence, List, Dict, Any

class MockMsg:
    def __init__(self, content):
        self.content = content
    def __repr__(self):
        return f"MockMsg({self.content[:10]}...)"

def estimate_tokens(text: str) -> int:
    if not text:
        return 0
    return (len(text) // 3) + 1

def truncate_history(messages, max_tokens: int = 2500):
    if not messages:
        return []

    system_msg = None
    other_msgs = []

    for msg in messages:
        if "System" in str(type(msg)): # Simple check for mock
            system_msg = msg
        else:
            other_msgs.append(msg)

    current_tokens = estimate_tokens(system_msg.content if system_msg else "")
    truncated_others = []
    
    for msg in reversed(other_msgs):
        content = msg.content
        msg_tokens = estimate_tokens(content)
        
        if msg_tokens > max_tokens - current_tokens:
            available_chars = ((max_tokens - current_tokens) * 3) - 100
            if available_chars > 300:
                 new_content = content[:available_chars] + "\n...[TRUNC]"
                 msg = type(msg)(content=new_content)
                 msg_tokens = estimate_tokens(new_content)
            else:
                break

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

# Test it
class SystemMsg(MockMsg): pass
class HumanMsg(MockMsg): pass

sys_msg = SystemMsg("You are an AI.")
h1 = HumanMsg("H" * 15000)
res = truncate_history([sys_msg, h1], max_tokens=2500)
print(f"Result count: {len(res)}")
if len(res) > 1:
    print(f"H1 length: {len(res[1].content)}")
    print(f"H1 content end: {res[1].content[-20:]}")

h2 = HumanMsg("H" * 1200) # 401 tokens
res2 = truncate_history([sys_msg] + [h2]*20, max_tokens=2500)
print(f"Result count 2: {len(res2)}")
