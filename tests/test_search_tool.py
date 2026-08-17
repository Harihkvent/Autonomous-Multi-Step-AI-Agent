import unittest
from unittest.mock import patch, MagicMock
import os
import sys

# Add the project root to sys.path
sys.path.append(os.getcwd())

from tools.search_tool import search_web

class TestSearchTool(unittest.TestCase):
    @patch('tools.search_tool.DDGS')
    def test_search_web_ddgs_success(self, MockDDGS):
        mock_instance = MockDDGS.return_value
        mock_instance.text.return_value = [
            {"title": "Test Title 1", "snippet": "Test Snippet 1", "link": "https://example.com/1"},
            {"title": "Test Title 2", "snippet": "Test Snippet 2", "link": "https://example.com/2"}
        ]
        result = search_web("test query")
        self.assertIn("Live Search Results for 'test query':", result)
        self.assertIn("Test Title 1", result)

    def test_search_web_hardcoded_fallback(self):
        result = search_web("available tools")
        self.assertIn("The available tools are:", result)

if __name__ == '__main__':
    unittest.main()
