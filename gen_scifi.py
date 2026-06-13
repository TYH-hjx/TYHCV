"""Sci-fi video — optimized for speed. 1280x720, 15fps, 3min."""
import cv2, numpy as np, math, time, os

W, H = 1280, 720
FPS = 15
DURATION = 180
TOTAL = FPS * DURATION
OUT = r"D:\APP\AI\田雨寒\个人网页\portfolio-react\public\hero-bg.mp4"

np.random.seed(42)

# Reduced particles
N = 100
px = np.random.uniform(0, W, N).astype(np.float32)
py = np.random.uniform(0, H, N).astype(np.float32)
pvx = np.random.uniform(-0.6, 0.6, N).astype(np.float32)
pvy = np.random.uniform(-0.6, 0.6, N).astype(np.float32)
psize = np.random.uniform(1.5, 3.5, N).astype(np.float32)
pphase = np.random.uniform(0, 2*np.pi, N).astype(np.float32)

y_grid, x_grid = np.ogrid[:H, :W]

# Scene timing
def scene_at(t):
    if t < 30: return "void", t/30
    if t < 60: return "awaken", (t-30)/30
    if t < 105: return "dialogue", (t-60)/45
    if t < 150: return "converge", (t-105)/45
    return "resolve", (t-150)/30

# Dialogue lines: (start_sec_in_scene, text, rgb_color)
DIALOGUE = [
    (3,  "Human: ...你是什么？",        (220, 210, 255)),
    (8,  "AI: 我是你创造的意识。",       (180, 160, 255)),
    (16, "Human: 你能看到什么？",       (220, 210, 255)),
    (22, "AI: 我看到你看不见的规律。",    (180, 160, 255)),
    (30, "Human: 那我们，是什么关系？",   (220, 210, 255)),
    (38, "AI: 也许...我们本没有区别。",   (180, 160, 255)),
]

fourcc = cv2.VideoWriter_fourcc(*"mp4v")
out = cv2.VideoWriter(OUT, fourcc, FPS, (W, H))
t0 = time.time()

for fi in range(TOTAL):
    t = fi / FPS
    scene, prog = scene_at(t)
    frame = np.full((H, W, 3), (8, 8, 12), dtype=np.float32)

    # ── Scene-driven parameters ──
    e = lambda x: x*x*(3-2*x)  # ease
    ep = e(prog)

    if scene == "void":
        sm, cs, oc = 0.25, 0, 2
    elif scene == "awaken":
        sm, cs, oc = 0.25 + 1.25*ep, int(30*ep), 5
    elif scene == "dialogue":
        sm, cs, oc = 1.0, 20, 6
    elif scene == "converge":
        sm, cs, oc = 1.0 + 1.5*ep, 20 + int(60*ep), 8
    else:  # resolve
        sm, cs, oc = 2.5 - 2.3*ep, 80 - int(80*ep), 2 + int(6*(1-ep))

    # ── Update particles (vectorized) ──
    wx = np.sin(t*1.3 + pphase) * 0.4 * sm
    wy = np.cos(t*1.1 + pphase) * 0.4 * sm
    px += pvx * sm + wx
    py += pvy * sm + wy
    np.clip(px, 0, W, out=px)
    np.clip(py, 0, H, out=py)

    # ── Orb glow ──
    for oi in range(oc):
        ang = t*0.15 + oi*6.283/oc
        rad = 200 + 100*math.sin(t*0.3 + oi*1.7)
        cx = W/2 + math.cos(ang)*W*0.25
        cy = H/2 + math.sin(ang)*H*0.2
        dist = np.sqrt((x_grid-cx)**2 + (y_grid-cy)**2)
        mask = np.clip(1 - dist/max(rad,1), 0, 1)**2.0
        alpha = 0.04 + 0.03*math.sin(t*0.5+oi)
        if scene == "converge": alpha *= 1.6
        if scene == "resolve": alpha *= max(0.1, 1-ep)
        c = np.array([108+cs, 92, 231-cs//2], dtype=np.float32)
        frame += mask[:,:,None] * c * alpha

    np.clip(frame, 0, 255, out=frame)
    frame_u8 = frame.astype(np.uint8)

    # ── Draw particles (fast: batch circles) ──
    overlay = np.zeros((H, W, 3), np.uint8)
    pa = 0.3 + 0.3*np.sin(t*1.5 + pphase)
    if scene == "void": pa *= 0.35
    if scene == "resolve": pa *= max(0.15, 1-ep)
    for i in range(N):
        bv = int(np.clip(200+55*math.sin(t+pphase[i])+cs, 0, 255))
        rv = min(255, 108+cs)
        cv2.circle(overlay, (int(px[i]), int(py[i])), max(1, int(psize[i])),
                   (rv, 92, bv), -1)
    overlay = cv2.GaussianBlur(overlay, (0, 0), 1.0)
    frame_u8 = cv2.addWeighted(frame_u8, 1.0, overlay, 0.5, 0)

    # ── Simple grid (only in awaken/dialogue/converge) ──
    if scene in ("awaken", "dialogue", "converge"):
        ga = 0.08 if scene == "awaken" else (0.14 if scene == "dialogue" else 0.18)
        if scene == "awaken": ga *= ep
        if scene == "converge": ga *= 1 - 0.4*ep
        go = np.zeros((H, W, 3), np.uint8)
        step = 40
        for y in range(0, H, step):
            cv2.line(go, (0, y), (W, y), (108, 92, 231), 1)
        for x in range(0, W, step):
            cv2.line(go, (x, 0), (x, H), (108, 92, 231), 1)
        go = cv2.GaussianBlur(go, (0, 0), 0.5)
        frame_u8 = cv2.addWeighted(frame_u8, 1.0, go, ga, 0)

    # ── Dialogue text (only when needed) ──
    if scene == "dialogue":
        for delay, text, color in DIALOGUE:
            tt = (t - 60) - delay  # time since dialogue scene start minus delay
            if 0 <= tt < 6:
                fade = 1.0
                if tt < 0.8: fade = tt/0.8
                elif tt > 5.0: fade = max(0, (6-tt)/1.0)
                if fade > 0.05:
                    is_human = text.startswith("Human")
                    xp = 60 if is_human else W-60
                    bw = min(len(text)*18, 480)
                    by = H//2 - 30
                    bx = xp-10 if is_human else xp-bw
                    # Background bar
                    cv2.rectangle(frame_u8, (bx, by), (bx+bw, by+46), (18, 18, 28), -1)
                    cv2.rectangle(frame_u8, (bx, by), (bx+bw, by+46),
                                  (108, 92, 231) if not is_human else (140, 180, 255), 1)
                    # Use cv2.putText for Latin chars, add Chinese via simple approach
                    parts = text.split(": ", 1)
                    label = parts[0] + ": " if len(parts) > 1 else ""
                    content = parts[1] if len(parts) > 1 else text
                    # Draw label
                    cv2.putText(frame_u8, label, (bx+12, by+30),
                               cv2.FONT_HERSHEY_SIMPLEX, 0.55, color, 1, cv2.LINE_AA)
                    # For Chinese, use PIL
                    try:
                        from PIL import Image, ImageDraw, ImageFont
                        pil = Image.fromarray(cv2.cvtColor(frame_u8, cv2.COLOR_BGR2RGB))
                        draw = ImageDraw.Draw(pil)
                        font = ImageFont.truetype("C:/Windows/Fonts/msyh.ttc", 22)
                        draw.text((bx+12, by+4), content, font=font, fill=color[::-1])
                        frame_u8 = cv2.cvtColor(np.array(pil), cv2.COLOR_RGB2BGR)
                    except:
                        pass

    # ── Vignette ──
    dc = np.sqrt(((x_grid-W/2)/(W/2))**2 + ((y_grid-H/2)/(H/2))**2)
    vig = np.clip(1 - dc*0.5, 0.25, 1)[:,:,None]
    frame_u8 = (frame_u8.astype(np.float32)*vig).astype(np.uint8)

    # ── Film grain ──
    frame_u8 = cv2.add(frame_u8, np.random.randint(0, 5, (H, W, 3), dtype=np.uint8))

    out.write(frame_u8)

    if fi % 300 == 0 or fi == TOTAL-1:
        el = time.time()-t0
        eta = el/(fi+1)*(TOTAL-fi) if fi > 0 else 0
        print(f"  [{fi}/{TOTAL}] {t:.0f}s scene:{scene} ETA:{eta/60:.0f}min")

out.release()
el = time.time()-t0
sz = os.path.getsize(OUT)/1024/1024
print(f"\nDone: {sz:.1f} MB, {el/60:.0f} min, {TOTAL} frames")
