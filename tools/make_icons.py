from PIL import Image, ImageDraw

BG=(14,16,19); VIOLET=(139,135,245); BRIGHT=(171,160,251); DOT=(190,179,253)

def make(S):
    ss=4; W=S*ss
    img=Image.new("RGBA",(W,W),BG+(255,)); d=ImageDraw.Draw(img,"RGBA")
    cx,cy=0.40*W,0.5*W; lw,lh=0.075*W,0.30*W
    F=(0.85*W,cy); rw=max(2,int(0.024*W))
    lensL,lensR=cx-lw,cx+lw
    ys=[cy-0.185*W,cy,cy+0.185*W]
    for i,y in enumerate(ys):
        col=BRIGHT if i==1 else VIOLET; a=240 if i==1 else 175
        d.line([(0.10*W,y),(lensL,y)],fill=col+(a,),width=rw)      # parallel beams in
        d.line([(lensR,y),F],fill=col+(a,),width=rw)               # refracted, converging
    # converging lens (vertical ellipse): translucent fill + bright rim
    d.ellipse([cx-lw,cy-lh,cx+lw,cy+lh],fill=VIOLET+(60,),outline=VIOLET+(255,),width=max(2,int(0.022*W)))
    r=0.052*W
    d.ellipse([F[0]-r,F[1]-r,F[0]+r,F[1]+r],fill=DOT+(255,))       # focal point
    return img.resize((S,S),Image.LANCZOS).convert("RGB")

for S,name in [(16,"favicon-16"),(32,"favicon-32"),(180,"apple-touch-icon"),(192,"icon-192"),(512,"icon-512")]:
    make(S).save(f"icons/{name}.png")
    print("wrote icons/"+name+".png")
