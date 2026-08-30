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

    # Test open_application for web service (Instagram / WhatsApp)
    app_tool = registry.get_tool("open_application")
    ig_result = app_tool(app_name="instagram")
    print(f"Instagram Launch Result: {ig_result.data}")
    assert ig_result.success, "Instagram launch failed"
    assert "instagram.com" in ig_result.data["url"]
    assert "LAUNCH_APP" in ig_result.data["status"]

    # Test open_application for Notepad document generation
    np_result = app_tool(app_name="notepad", target="capabilities")
    print(f"Notepad Generation Result: {np_result.data['filename']}")
    assert np_result.success, "Notepad generation failed"
    assert "DOWNLOAD" in np_result.data["status"]

    # Test open_application for Calculator
    calc_result = app_tool(app_name="calculator", target="25 * 4 + 10")
    print(f"Calculator Result: {calc_result.data}")
    assert calc_result.success, "Calculator failed"
    assert calc_result.data["result"] == 110
    
    print("--- System Tools Tests Passed! ---")

if __name__ == "__main__":
    test_system_tools()
