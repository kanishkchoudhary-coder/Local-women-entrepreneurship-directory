"""Download HerLocal's licensed Pexels photos once into assets/images/.

Run from the repository folder: python download_images.py
The website itself has no Python dependency. Images are used as illustrations.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

BASE = Path(__file__).resolve().parent
PHOTOS = {
    "assets/images/visitor-hero.jpg": (6755627, 1200),
    "assets/images/owner-hero.jpg": (7857530, 1200),
    "assets/images/admin-hero.jpg": (34147402, 1200),
    "assets/images/businesses/bakery.jpg": (7328591, 900),
    "assets/images/businesses/fashion.jpg": (6461169, 900),
    "assets/images/businesses/candles.jpg": (5933781, 900),
    "assets/images/businesses/jewellery.jpg": (5830198, 900),
    "assets/images/businesses/ceramics.jpg": (6611187, 900),
    "assets/images/businesses/beauty.jpg": (8394923, 900),
    "assets/images/businesses/education.jpg": (6193138, 900),
    "assets/images/businesses/handmade-gifts.jpg": (6755793, 900),
}


def main():
    success, failed = 0, []
    for relative, (photo_id, width) in PHOTOS.items():
        destination = BASE / relative
        if destination.is_file() and destination.stat().st_size > 1024:
            print(f"Already present: {relative}")
            success += 1
            continue
        url = (f"https://images.pexels.com/photos/{photo_id}/"
               f"pexels-photo-{photo_id}.jpeg?cs=tinysrgb&w={width}")
        request = Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept": "image/jpeg"})
        try:
            with urlopen(request, timeout=25) as response:
                data = response.read()
                if not data.startswith(b"\xff\xd8\xff"):
                    raise ValueError("Image server did not return a JPEG")
                if len(data) < 1024:
                    raise ValueError("Downloaded JPEG is unexpectedly small")
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(data)
            print(f"Saved: {relative} ({len(data) // 1024} KB)")
            success += 1
        except (HTTPError, URLError, ValueError, OSError) as error:
            print(f"Could not download {relative}: {error}")
            failed.append(relative)
    print(f"\n{success}/{len(PHOTOS)} images available locally.")
    if failed:
        print("If a download fails, save its Pexels photo manually using")
        print("the filename in assets/images/IMAGE_SOURCES.txt.")
        print("Business listings will still use the online image fallback.")

if __name__ == "__main__":
    main()
