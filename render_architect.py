import asyncio
from playwright.async_api import async_playwright

async def run():
    print('--- BRIDGE CONNECTED ---')
    async with async_playwright() as p:
        try:
            # Connect to your 'Special Chrome'
            browser = await p.chromium.connect_over_cdp("http://localhost:9222")
            context = browser.contexts[0]
            page = context.pages[0]
            
            print('Scanning for the Architect...')
            
            # This hunts for ANY generated image on the page
            # We look for blobs, large images, or anything with 'generated' in the description
            selectors = [
                'img[src*="blob"]',
                'img[alt*="Architect"]',
                'img[alt*="generated"]',
                '.faded-image-box img'
            ]
            
            found_image = None
            for selector in selectors:
                locator = page.locator(selector).last
                if await locator.count() > 0:
                    found_image = locator
                    print(f'Target identified using: {selector}')
                    break
            
            if found_image:
                print('Taking high-res snapshot...')
                await asyncio.sleep(1) # Final sharpening
                await found_image.screenshot(path='C:/Users/Leonp/NextFrame-Agency/output/Hero_Avatar.jpg')
                print('--- SUCCESS: Hero_Avatar.jpg secured! ---')
            else:
                print('--- FAILED: I can see the page, but I cannot see the image. ---')
                print('Is the image visible on your screen in the Chrome window?')

        except Exception as e:
            print(f'Bridge Error: {e}')

if __name__ == "__main__":
    asyncio.run(run())
