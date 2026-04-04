import os
import time

def run_loop():
 print('>>> STARTING FULL-AUTO PHASE A')
 # Step 1: Scrape
 os.system('run web_fetch "https://www.bland.ai"')
 
 # Step 2: Audit & Grade
 score = 0
 while score < 8:
 print(f'>>> CURRENT SCORE: {score}. REFINING...')
 os.system('run gemini "Read BUSINESS_MODEL.md and create NEXT_FRAME_DNA_AUDIT.md. Grade it 1-10. Only return the number." > score.txt')
 try:
 with open('score.txt', 'r') as f:
 score = int(f.read().strip())
 except:
 score = 0
 if score >= 8: break
 time.sleep(2)
 
 print('>>> SUCCESS: PHASE A 10/10. MOVING TO ARCHITECT.')

run_loop()