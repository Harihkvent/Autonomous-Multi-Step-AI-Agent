import docx
import sys

def read_text(path):
    try:
        doc = docx.Document(path)
        fullText = []
        for para in doc.paragraphs:
            fullText.append(para.text)
        return '\n'.join(fullText)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    print(read_text(sys.argv[1]))
