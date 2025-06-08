import os
import re
import requests
from urllib.request import urlretrieve

INPUT_FILE = r"C:\Users\pelor\Documents\Coding\StupidIdeasHackathon\stupididea\src\imageExtract\source_text.txt"
OUTPUT_DIR = "extracted_images"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_image_links(text):
    # Match URLs in the form: "image": "https://...."
    return re.findall(r'"image"\s*:\s*"([^"]+)"', text)

def download_images(urls):
    for i, url in enumerate(urls):
        ext = url.split('.')[-1].split('?')[0]
        filename = os.path.join(OUTPUT_DIR, f'image_{i+1}.{ext}')
        try:
            urlretrieve(url, filename)
            print(f'✅ Downloaded: {filename}')
        except Exception as e:
            print(f'❌ Failed to download {url}: {e}')

def main():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    image_urls = extract_image_links(content)
    print(f'🔍 Found {len(image_urls)} image URLs')
    download_images(image_urls)

if __name__ == '__main__':
    main()
