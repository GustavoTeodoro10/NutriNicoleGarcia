import os
from PIL import Image, ImageOps

SRC = os.path.join(os.path.dirname(__file__), "..", "src", "assets")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img")
os.makedirs(OUT, exist_ok=True)

JPEG_JOBS = [
    ("hero-bg.jpg", "hero-bg.jpg", 2000, 82),
    ("nicole-profile.jpg", "nicole-profile.jpg", 1400, 84),
    ("nicole-portrait-2.jpg", "nicole-portrait-2.jpg", 1400, 84),
    ("cat-longevidade.jpg", "cat-longevidade.jpg", 1200, 78),
    ("cat-hipertrofia.jpeg", "cat-hipertrofia.jpg", 1200, 78),
    ("cat-performance.jpg", "cat-performance.jpg", 1200, 78),
    ("cat-saude-clinica.jpg", "cat-saude-clinica.jpg", 1200, 78),
    ("cat-emagrecimento.jpg", "cat-emagrecimento.jpg", 1200, 78),
    ("atendimento-presencial.jpg", "atendimento-presencial.jpg", 1200, 78),
]

for src_name, out_name, max_w, quality in JPEG_JOBS:
    src_path = os.path.join(SRC, src_name)
    if not os.path.exists(src_path):
        print("MISSING", src_path)
        continue
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)
    img = img.convert("RGB")
    w, h = img.size
    if w > max_w:
        new_h = int(h * (max_w / w))
        img = img.resize((max_w, new_h), Image.LANCZOS)
    out_path = os.path.join(OUT, out_name)
    img.save(out_path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{src_name} -> {out_name}: {img.size}, {os.path.getsize(out_path)//1024}KB")

logo_path = os.path.join(SRC, "logo-nicole-garcia.png")
logo = Image.open(logo_path).convert("RGBA")
logo_out = os.path.join(OUT, "logo.png")
logo.save(logo_out, "PNG", optimize=True)
print("logo ->", logo.size, os.path.getsize(logo_out)//1024, "KB")

w, h = logo.size
crop_box = (int(w*0.28), 0, int(w*0.68), int(h*0.56))
icon = logo.crop(crop_box)
iw, ih = icon.size
side = max(iw, ih)
square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
square.paste(icon, ((side-iw)//2, (side-ih)//2), icon)
favicon_512 = square.resize((512, 512), Image.LANCZOS)
favicon_512.save(os.path.join(OUT, "favicon.png"), "PNG", optimize=True)
favicon_192 = square.resize((192, 192), Image.LANCZOS)
favicon_192.save(os.path.join(OUT, "favicon-192.png"), "PNG", optimize=True)
favicon_32 = square.resize((32, 32), Image.LANCZOS)
favicon_32.save(os.path.join(OUT, "favicon-32.png"), "PNG", optimize=True)
print("favicon crop box", crop_box, "square", square.size)
