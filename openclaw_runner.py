import json, os, time, requests
from datetime import datetime

# Setup paths
BASE_DIR = r'C:\Users\Leonp\NextFrame-Agency'
OUTPUT_DIR = os.path.join(BASE_DIR, 'output')
if not os.path.exists(OUTPUT_DIR): os.makedirs(OUTPUT_DIR)

def generate_hero_photo():
    print("[AGENT 3] Generating 'The Architect' via Cloud Engine...")
    # Using a high-fidelity pollinator for the first render
    prompt = "Cinematic shot of a Filipino tech entrepreneur, matte black tech-wear, teal neon accents, Makati skyline background, 8k, cyberpunk"
    url = f"https://image.pollinations.ai/prompt/{prompt.replace(' ', '%20')}"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            file_path = os.path.join(OUTPUT_DIR, 'Hero_Avatar.jpg')
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print(f"[SUCCESS] Photo saved to: {file_path}")
            return True
    except Exception as e:
        print(f"[ERROR] Production failed: {e}")
    return False

def main_loop():
    print('--- NEXT-FRAME ENGINE: PRODUCTION MODE ---')
    # Execute the actual work immediately
    success = generate_hero_photo()
    if success:
        print("\n[SYSTEM] Check your 'output' folder. The Architect has arrived.")
    else:
        print("\n[SYSTEM] Production failed. Check your internet connection.")

if __name__ == '__main__':
    main_loop()
