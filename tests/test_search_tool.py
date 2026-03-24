import unittest
from unittest.mock import patch, MagicMock
import os
import sys

# Add the project root to sys.path
sys.path.append(os.getcwd())

from tools.search_tool import search_web

class TestSearchTool(unittest.TestCase):
    @patch('tools.search_tool.GoogleSearch')
    @patch.dict(os.environ, {"SERPAPI_API_KEY": "fake_key"})
    def test_search_web_success(self, MockGoogleSearch):
        # Mocking SerpApi response
        mock_instance = MockGoogleSearch.return_value
        mock_instance.get_dict.return_value = {
            "organic_results": [
                {
                    "title": "Test Title 1",
                    "snippet": "Test Snippet 1",
                    "link": "https://example.com/1"
                },
                {
                    "title": "Test Title 2",
                    "snippet": "Test Snippet 2",
                    "link": "https://example.com/2"
                }
            ]
        }
        
        result = search_web("test query")
        
        self.assertIn("Live Search Results for 'test query':", result)
        self.assertIn("Title: Test Title 1", result)
        self.assertIn("Snippet: Test Snippet 1", result)
        self.assertIn("Link: https://example.com/1", result)
        self.assertIn("Title: Test Title 2", result)
        
        # Verify SerpApi was called correctly
        MockGoogleSearch.assert_called_once_with({
            "q": "test query",
            "api_key": "fake_key",
            "num": 3
        })

    @patch.dict(os.environ, {}, clear=True)
    def test_search_web_no_api_key(self):
        # Remove SERPAPI_API_KEY from env if it exists (patch.dict with clear=True handles it)
        result = search_web("test query")
        self.assertEqual(result, "Error: SERPAPI_API_KEY not found in environment variables.")

    @patch('tools.search_tool.GoogleSearch')
    @patch.dict(os.environ, {"SERPAPI_API_KEY": "fake_key"})
    def test_search_web_no_results(self, MockGoogleSearch):
        mock_instance = MockGoogleSearch.return_value
        mock_instance.get_dict.return_value = {"organic_results": []}
        
        result = search_web("empty query")
        self.assertEqual(result, "No results found for 'empty query'.")

    def test_search_web_hardcoded_fallback(self):
        result = search_web("available tools")
        self.assertIn("The available tools are:", result)

if __name__ == '__main__':
    unittest.main()
