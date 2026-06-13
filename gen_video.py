import cv2, numpy as np, math, random, time, os

W, H = 1920, 1080
FPS = 24
DURATION = 8
TOTAL = FPS * DURATION

# Use mp4v codec which doesn't need external H264 lib
fourcc = cv2.VideoWriter_fourcc(*"mp4v")
out = cv2.VideoWriter(r"D:\APP\AI\田雨寒\个人网页\portfolio-react\public\hero-bg.mp4", fourcc, FPS, (W, H))

if not out.isOpened():
    # fallback: try MJPG in AVI
    fourcc = cv2.VideoWriter_fourcc(*"MJPG")
    out = cv2.VideoWriter(r"D:\APP\AI\田雨寒\个人网页\portfolio-react\public\hero-bg.avi", fourcc, FPS, (W, H))
    print("Falling back to MJPG/AVI")

random.seed(42)
np.random.seed(42)

class Orb:
    def __init__(self):
        self.x = random.uniform(0.2, 0.8) * W
        self.y = random.uniform(0.2, 0.8) * H
        self.vx = random.uniform(-0.4, 0.4)
        self.vy = random.uniform(-0.4, 0.4)
        self.r = random.uniform(180, 400)
        c = random.choice([(108,92,231),(140,110,240),(80,70,200),(160,120,220),(90,75,210)])
        self.color = np.array(c, dtype=np.float32)
        self.alpha = random.uniform(0.03, 0.09)

orbs = [Orb() for _ in range(6)]

P = 180
parts = []
for _ in range(P):
    parts.append({
        "x": random.uniform(0, W), "y": random.uniform(0, H),
        "vx": random.uniform(-0.6, 0.6), "vy": random.uniform(-0.6, 0.6),
        "s": random.uniform(1, 3.5), "a": random.uniform(0.1, 0.4),
        "ph": random.uniform(0, 6.28),
    })

y_grid, x_grid = np.ogrid[:H, :W]
t0 = time.time()

for fi in range(TOTAL):
    t = fi / FPS
    img = np.full((H, W, 3), (10, 10, 15), dtype=np.float32)

    for o in orbs:
        o.x += o.vx
        o.y += o.vy
        if o.x < -o.r: o.x = W + o.r
        if o.x > W + o.r: o.x = -o.r
        if o.y < -o.r: o.y = H + o.r
        if o.y > H + o.r: o.y = -o.r
        dist = np.sqrt((x_grid - o.x) ** 2 + (y_grid - o.y) ** 2)
        mask = np.clip(1 - dist / o.r, 0, 1) ** 1.8
        img += mask[:, :, None] * o.color * o.alpha

    np.clip(img, 0, 255, out=img)
    img_u8 = img.astype(np.uint8)

    overlay = np.zeros((H, W, 3), np.uint8)
    for p in parts:
        p["x"] += p["vx"] + math.sin(t * 1.4 + p["ph"]) * 0.35
        p["y"] += p["vy"] + math.cos(t * 1.2 + p["ph"]) * 0.35
        if p["x"] < 0: p["x"] = W
        if p["x"] > W: p["x"] = 0
        if p["y"] < 0: p["y"] = H
        if p["y"] > H: p["y"] = 0
        a = p["a"] * (0.55 + 0.45 * math.sin(t * 1.6 + p["ph"]))
        b_val = int(200 + 55 * math.sin(t + p["ph"]))
        cv2.circle(overlay, (int(p["x"]), int(p["y"])), max(1, int(p["s"])),
                   (108, 92, min(255, b_val)), -1)

    overlay = cv2.GaussianBlur(overlay, (0, 0), 1.0)
    img_u8 = cv2.addWeighted(img_u8, 1.0, overlay, 0.5, 0)

    dc = np.sqrt(((x_grid - W / 2) / (W / 2)) ** 2 + ((y_grid - H / 2) / (H / 2)) ** 2)
    vig = np.clip(1 - dc * 0.55, 0.25, 1)[:, :, None]
    img_u8 = (img_u8.astype(np.float32) * vig).astype(np.uint8)

    img_u8 = cv2.add(img_u8, np.random.randint(0, 7, (H, W, 3), dtype=np.uint8))
    out.write(img_u8)
    if fi % 40 == 0:
        print(f"  {fi}/{TOTAL}  ({time.time()-t0:.0f}s)")

out.release()
print(f"Done in {time.time()-t0:.0f}s")
