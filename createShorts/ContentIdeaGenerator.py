import json
from openai import OpenAI

class ContentIdeaGenerator:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)
    
    def read_file(self, file_name):
        """Reads and returns the content of a JSON file."""
        try:
            with open(file_name, 'r', encoding='utf-8') as file:
                content = json.load(file)
            return content
        except FileNotFoundError:
            print(f"{file_name} cannot find the file.")
            return None
        except Exception as e:
            print(f"Error: {e}")
            return None

    def generate_suggestions(self, content):
        """Generates video suggestions based on the provided text content."""
        text = str(content["results"]["transcripts"][0]["transcript"])
        completion = self.client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
            messages=[
                {"role": "user", "content": "You are a professional youtuber consultant. Based on the following text," +
                 "please generate the top three suggestions for titles and descriptions for a video." +
                 "Additionally, provide exactly five hashtags suitable for an SNS shorts video" +
                "All in a consistent JSON format with 'title_suggestions', 'description_suggestions', and 'hashtags' as keys: " +
                text},
            ],
            response_format={"type": "json_object"}
        )
        return completion.choices[0].message.content
    
    def run(self, file_name):
        """Executes the workflow to generate video suggestions from a file."""
        content = self.read_file(file_name)
        if content:
            suggestions = self.generate_suggestions(content)
            print(suggestions)

# Usage example:
# Create an instance of the class with your API key
contentIdea = ContentIdeaGenerator(api_key="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")

# Run the consultant with the file name