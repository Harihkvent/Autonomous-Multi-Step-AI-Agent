import sys
import os

# Add the project root to sys.path
sys.path.append(os.getcwd())

from tools.registry import registry
import tools.system_tools

def test_system_tools():
    print("--- Testing System Tools ---")
    
    # Check if tools are registered
    tools = registry.list_tools()
    print(f"Registered tools: {list(tools.keys())}")
    
    assert "get_current_date" in tools, "get_current_date not registered"
    assert "get_system_info" in tools, "get_system_info not registered"
    
    # Test get_current_date
    date_tool = registry.get_tool("get_current_date")
    date_result = date_tool()
    print(f"Current Date Result: {date_result.data['current_date']}")
    assert date_result.success, "get_current_date failed"
    
    # Test get_system_info
    info_tool = registry.get_tool("get_system_info")
    info_result = info_tool()
    print(f"System Info Result: {info_result.data}")
    assert info_result.success, "get_system_info failed"
    assert "os" in info_result.data, "OS info missing"
    
    print("--- System Tools Tests Passed! ---")

if __name__ == "__main__":
    test_system_tools()
