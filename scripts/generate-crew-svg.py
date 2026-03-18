#!/usr/bin/env python3
"""
Generate stylized SVG illustration of the 10 Straw Hat Pirates crew.
Each character rendered with their most iconic visual feature.
"""

import os

W, H = 1200, 400
GROUND_Y = 345
TITLE_Y = 38

# Character data: name, body_color, hat/hair_color, x_center, head_y
# x_centers evenly spaced: (1200 - 100) / 9 ≈ 122 apart, starting at 60
XS = [60, 182, 304, 426, 548, 670, 792, 914, 1036, 1140]

CHARS = [
    # name,         body_col,  accent_col, skin_col,    x,       head_y
    ("Luffy",       "#C62828", "#D4A843", "#F5CBA7",  XS[0],   195),
    ("Zoro",        "#2E7D32", "#1B5E20", "#F5CBA7",  XS[1],   190),
    ("Nami",        "#E65100", "#F57C00", "#F5CBA7",  XS[2],   195),
    ("Usopp",       "#6D4C41", "#4E342E", "#D4A574",  XS[3],   195),
    ("Sanji",       "#FDD835", "#F9A825", "#F5CBA7",  XS[4],   193),
    ("Chopper",     "#E91E8B", "#C2185B", "#F5CBA7",  XS[5],   220),  # shorter
    ("Robin",       "#6A1B9A", "#4A148C", "#F0C5A3",  XS[6],   193),
    ("Franky",      "#1565C0", "#0D47A1", "#F5CBA7",  XS[7],   190),
    ("Brook",       "#424242", "#212121", "#EEEEEE",  XS[8],   180),  # tall
    ("Jinbe",       "#00695C", "#004D40", "#80CBC4",  XS[9],   190),
]

def star(cx, cy, r=1.5):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="white" opacity="0.7"/>'

def stars_bg():
    import random
    random.seed(42)
    parts = []
    for _ in range(120):
        x = random.randint(0, 1200)
        y = random.randint(0, 240)
        r = random.choice([1, 1, 1, 1.5, 2])
        op = random.uniform(0.3, 0.9)
        parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="white" opacity="{op:.1f}"/>')
    return '\n  '.join(parts)

def moon():
    return '''<circle cx="80" cy="60" r="30" fill="#FFF9C4" opacity="0.9"/>
  <circle cx="92" cy="50" r="28" fill="#0d2a50"/>'''

def wave():
    return '''<path d="M0 350 Q150 340 300 350 Q450 360 600 350 Q750 340 900 350 Q1050 360 1200 350 L1200 400 L0 400Z"
    fill="#060d1a" opacity="0.8"/>
  <path d="M0 360 Q200 352 400 360 Q600 368 800 360 Q1000 352 1200 360 L1200 400 L0 400Z"
    fill="#030810" opacity="0.6"/>'''

def luffy(x, hy, bc, ac, sk):
    """Straw hat + red vest + scar"""
    by = hy + 32  # body top
    return f'''<!-- Luffy -->
  <g>
    <!-- Straw hat brim (wide ellipse) -->
    <ellipse cx="{x}" cy="{hy-33}" rx="42" ry="9" fill="{ac}" stroke="#7C4F0A" stroke-width="1.5"/>
    <!-- Hat dome -->
    <path d="M{x-26} {hy-33} Q{x-26} {hy-60} {x} {hy-64} Q{x+26} {hy-60} {x+26} {hy-33}Z"
          fill="{ac}" stroke="#7C4F0A" stroke-width="1.5"/>
    <!-- Hat red band -->
    <path d="M{x-26} {hy-33} Q{x} {hy-28} {x+26} {hy-33}" stroke="#C62828" stroke-width="3" fill="none"/>
    <!-- Head -->
    <circle cx="{x}" cy="{hy}" r="28" fill="{sk}" stroke="#C8956C" stroke-width="1"/>
    <!-- Eyes -->
    <ellipse cx="{x-9}" cy="{hy}" rx="5" ry="6" fill="#1a1a1a"/>
    <ellipse cx="{x+9}" cy="{hy}" rx="5" ry="6" fill="#1a1a1a"/>
    <!-- Eye whites -->
    <ellipse cx="{x-10}" cy="{hy-1}" rx="2" ry="2.5" fill="white" opacity="0.8"/>
    <ellipse cx="{x+8}" cy="{hy-1}" rx="2" ry="2.5" fill="white" opacity="0.8"/>
    <!-- Smile -->
    <path d="M{x-12} {hy+10} Q{x} {hy+20} {x+12} {hy+10}" stroke="#8B4513" stroke-width="2" fill="none"/>
    <!-- Scar under left eye -->
    <path d="M{x-6} {hy+6} L{x-4} {hy+14}" stroke="#C62828" stroke-width="2" stroke-linecap="round"/>
    <!-- Body: red vest open -->
    <path d="M{x-22} {by} L{x-28} {GROUND_Y} L{x+28} {GROUND_Y} L{x+22} {by}Z" fill="{bc}" opacity="0.9"/>
    <path d="M{x-5} {by} L{x-3} {GROUND_Y} M{x+5} {by} L{x+3} {GROUND_Y}" stroke="{sk}" stroke-width="4" fill="none"/>
    <!-- Shorts: blue -->
    <path d="M{x-28} {GROUND_Y-55} L{x-30} {GROUND_Y} L{x+30} {GROUND_Y} L{x+28} {GROUND_Y-55}Z"
          fill="#1565C0" opacity="0.85"/>
  </g>'''

def zoro(x, hy, bc, ac, sk):
    """3 swords most distinctive feature"""
    by = hy + 32
    return f'''<!-- Zoro -->
  <g>
    <!-- Swords: 2 at hips + 1 in mouth -->
    <!-- Left sword -->
    <rect x="{x-46}" y="{hy+20}" width="6" height="60" rx="2" fill="#B0BEC5" stroke="#78909C" stroke-width="1"/>
    <rect x="{x-50}" y="{hy+18}" width="14" height="10" rx="2" fill="#FDD835"/>
    <!-- Right sword -->
    <rect x="{x+40}" y="{hy+20}" width="6" height="60" rx="2" fill="#B0BEC5" stroke="#78909C" stroke-width="1"/>
    <rect x="{x+36}" y="{hy+18}" width="14" height="10" rx="2" fill="#FDD835"/>
    <!-- Sword in mouth (diagonal) -->
    <line x1="{x-30}" y1="{hy+16}" x2="{x+30}" y2="{hy+8}" stroke="#90A4AE" stroke-width="4"/>
    <rect x="{x-10}" y="{hy+9}" width="18" height="7" rx="2" fill="#FDD835"/>
    <!-- Head -->
    <circle cx="{x}" cy="{hy}" r="28" fill="{sk}" stroke="#C8956C" stroke-width="1"/>
    <!-- Green bandana -->
    <path d="M{x-28} {hy-10} Q{x} {hy-16} {x+28} {hy-10}" stroke="{bc}" stroke-width="6" fill="none"/>
    <!-- Eyes -->
    <ellipse cx="{x-9}" cy="{hy}" rx="5" ry="5" fill="#1a1a1a"/>
    <ellipse cx="{x+9}" cy="{hy}" rx="5" ry="5" fill="#1a1a1a"/>
    <!-- Left eye scar -->
    <line x1="{x-12}" y1="{hy-10}" x2="{x-6}" y2="{hy+10}" stroke="#8B0000" stroke-width="2"/>
    <!-- Body: green haramaki -->
    <path d="M{x-24} {by} L{x-26} {GROUND_Y} L{x+26} {GROUND_Y} L{x+24} {by}Z" fill="{bc}" opacity="0.85"/>
    <rect x="{x-30}" y="{hy+65}" width="60" height="18" rx="2" fill="{ac}" opacity="0.9"/>
  </g>'''

def nami(x, hy, bc, ac, sk):
    """Orange hair + clima-tact staff"""
    by = hy + 30
    return f'''<!-- Nami -->
  <g>
    <!-- Clima-Tact staff -->
    <line x1="{x+32}" y1="{hy-20}" x2="{x+36}" y2="{GROUND_Y}" stroke="#E0E0E0" stroke-width="4"/>
    <circle cx="{x+33}" cy="{hy-22}" r="7" fill="#FFD54F" stroke="#FFA000" stroke-width="1.5"/>
    <!-- Orange hair (spiky on top) -->
    <ellipse cx="{x}" cy="{hy-20}" rx="26" ry="18" fill="{bc}"/>
    <path d="M{x-20} {hy-20} Q{x-28} {hy-42} {x-18} {hy-38}
             Q{x-10} {hy-52} {x-2} {hy-44}
             Q{x+8} {hy-52} {x+16} {hy-40}
             Q{x+26} {hy-44} {x+22} {hy-24}Z" fill="{bc}"/>
    <!-- Head -->
    <circle cx="{x}" cy="{hy}" r="26" fill="{sk}" stroke="#C8956C" stroke-width="1"/>
    <!-- Eyes (happy) -->
    <path d="M{x-12} {hy-3} Q{x-9} {hy-8} {x-6} {hy-3}" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
    <path d="M{x+6} {hy-3} Q{x+9} {hy-8} {x+12} {hy-3}" stroke="#1a1a1a" stroke-width="2.5" fill="none"/>
    <!-- Smile -->
    <path d="M{x-10} {hy+10} Q{x} {hy+18} {x+10} {hy+10}" stroke="#8B4513" stroke-width="2" fill="none"/>
    <!-- Body -->
    <path d="M{x-20} {by} Q{x-22} {hy+80} {x-22} {GROUND_Y} L{x+22} {GROUND_Y} Q{x+22} {hy+80} {x+20} {by}Z"
          fill="{ac}" opacity="0.85"/>
    <!-- Tangerine tattoo on shoulder -->
    <circle cx="{x-22}" cy="{by+20}" r="7" fill="#FF6F00" opacity="0.8"/>
    <path d="M{x-22} {by+13} Q{x-18} {by+8} {x-16} {by+13}" stroke="#2E7D32" stroke-width="1.5" fill="none"/>
  </g>'''

def usopp(x, hy, bc, ac, sk):
    """Long nose most distinctive"""
    by = hy + 30
    return f'''<!-- Usopp -->
  <g>
    <!-- Slingshot -->
    <path d="M{x+30} {hy+10} L{x+44} {hy-10} M{x+30} {hy+10} L{x+44} {hy+28}" stroke="#8D6E63" stroke-width="3" fill="none"/>
    <line x1="{x+44}" y1="{hy-10}" x2="{x+44}" y2="{hy+28}" stroke="#1a1a1a" stroke-width="1.5"/>
    <!-- Goggles on forehead -->
    <ellipse cx="{x-6}" cy="{hy-22}" rx="10" ry="6" fill="none" stroke="#FF8F00" stroke-width="2.5"/>
    <ellipse cx="{x+8}" cy="{hy-22}" rx="10" ry="6" fill="none" stroke="#FF8F00" stroke-width="2.5"/>
    <line x1="{x-16}" y1="{hy-22}" x2="{x+18}" y2="{hy-22}" stroke="#FF8F00" stroke-width="2.5"/>
    <!-- Curly hair -->
    <path d="M{x-22} {hy-20} Q{x-30} {hy-38} {x-14} {hy-38}
             Q{x} {hy-46} {x+14} {hy-36}
             Q{x+24} {hy-42} {x+22} {hy-20}" fill="{ac}"/>
    <!-- Head -->
    <circle cx="{x}" cy="{hy}" r="26" fill="{sk}" stroke="#C8956C" stroke-width="1"/>
    <!-- LONG NOSE (most distinctive!) -->
    <path d="M{x-4} {hy+4} Q{x+2} {hy+6} {x+8} {hy+24} Q{x+10} {hy+30} {x+6} {hy+30} Q{x+0} {hy+28} {x-2} {hy+24} Q{x-6} {hy+8} {x-4} {hy+4}Z"
          fill="#D4956A" stroke="#C8956C" stroke-width="1"/>
    <!-- Eyes -->
    <ellipse cx="{x-9}" cy="{hy-4}" rx="5" ry="5.5" fill="#1a1a1a"/>
    <ellipse cx="{x+9}" cy="{hy-4}" rx="5" ry="5.5" fill="#1a1a1a"/>
    <!-- Body: overalls -->
    <path d="M{x-22} {by} L{x-24} {GROUND_Y} L{x+24} {GROUND_Y} L{x+22} {by}Z" fill="{bc}" opacity="0.85"/>
    <!-- Overalls straps -->
    <rect x="{x-14}" y="{by-5}" width="8" height="40" rx="2" fill="{ac}" opacity="0.9"/>
    <rect x="{x+6}" y="{by-5}" width="8" height="40" rx="2" fill="{ac}" opacity="0.9"/>
  </g>'''

def sanji(x, hy, bc, ac, sk):
    """Suit + hair over one eye + curly eyebrow"""
    by = hy + 30
    return f'''<!-- Sanji -->
  <g>
    <!-- Hair covering left eye -->
    <path d="M{x-28} {hy-28} Q{x-24} {hy-44} {x-10} {hy-42}
             Q{x+2} {hy-50} {x+20} {hy-44}
             Q{x+28} {hy-36} {x+26} {hy-20}" fill="{ac}"/>
    <!-- Hair falling over left eye -->
    <path d="M{x-28} {hy-28} Q{x-36} {hy-10} {x-28} {hy+4} Q{x-22} {hy+8} {x-16} {hy+4}Z" fill="{ac}"/>
    <!-- Head -->
    <circle cx="{x}" cy="{hy}" r="27" fill="{sk}" stroke="#C8956C" stroke-width="1"/>
    <!-- Visible right eye only -->
    <ellipse cx="{x+10}" cy="{hy-2}" rx="6" ry="6" fill="#1a1a1a"/>
    <ellipse cx="{x+9}" cy="{hy-3}" rx="2.5" ry="2.5" fill="white" opacity="0.8"/>
    <!-- Curly eyebrow (right) -->
    <path d="M{x+4} {hy-12} Q{x+10} {hy-18} {x+18} {hy-14} Q{x+22} {hy-8} {x+18} {hy-8}"
          stroke="#5D4037" stroke-width="2.5" fill="none"/>
    <!-- Cigarette -->
    <line x1="{x-2}" y1="{hy+12}" x2="{x+18}" y2="{hy+10}" stroke="#EEEEEE" stroke-width="3"/>
    <circle cx="{x+18}" cy="{hy+10}" r="2.5" fill="#FF8A65"/>
    <!-- Smoke dot -->
    <circle cx="{x+22}" cy="{hy+4}" r="3" fill="white" opacity="0.3"/>
    <!-- Suit: black jacket -->
    <path d="M{x-22} {by} L{x-26} {GROUND_Y} L{x+26} {GROUND_Y} L{x+22} {by}Z" fill="#212121" opacity="0.9"/>
    <!-- Tie -->
    <path d="M{x-3} {by} L{x-6} {GROUND_Y-80} L{x} {GROUND_Y-60} L{x+6} {GROUND_Y-80} L{x+3} {by}Z" fill="{bc}" opacity="0.85"/>
    <!-- Shirt white -->
    <path d="M{x-8} {by} L{x-8} {GROUND_Y-50} L{x+8} {GROUND_Y-50} L{x+8} {by}Z" fill="white" opacity="0.7"/>
    <!-- Kick leg pose -->
    <path d="M{x+10} {GROUND_Y} Q{x+30} {GROUND_Y-40} {x+50} {GROUND_Y-30}" stroke="#212121" stroke-width="12" fill="none" stroke-linecap="round"/>
  </g>'''

def chopper(x, hy, bc, ac, sk):
    """Small + pink hat"""
    by = hy + 24  # shorter character
    return f'''<!-- Chopper -->
  <g>
    <!-- Pink hat -->
    <ellipse cx="{x}" cy="{hy-30}" rx="28" ry="7" fill="{bc}" stroke="#880E4F" stroke-width="1.5"/>
    <path d="M{x-22} {hy-30} Q{x-22} {hy-58} {x} {hy-62} Q{x+22} {hy-58} {x+22} {hy-30}Z" fill="{bc}" stroke="#880E4F" stroke-width="1.5"/>
    <!-- X mark on hat -->
    <line x1="{x-8}" y1="{hy-46}" x2="{x+8}" y2="{hy-36}" stroke="white" stroke-width="3"/>
    <line x1="{x+8}" y1="{hy-46}" x2="{x-8}" y2="{hy-36}" stroke="white" stroke-width="3"/>
    <!-- Reindeer ears -->
    <ellipse cx="{x-22}" cy="{hy-22}" rx="7" ry="12" fill="#8D6E63" transform="rotate(-15,{x-22},{hy-22})"/>
    <ellipse cx="{x+22}" cy="{hy-22}" rx="7" ry="12" fill="#8D6E63" transform="rotate(15,{x+22},{hy-22})"/>
    <ellipse cx="{x-22}" cy="{hy-22}" rx="4" ry="8" fill="#FFCCBC" transform="rotate(-15,{x-22},{hy-22})"/>
    <ellipse cx="{x+22}" cy="{hy-22}" rx="4" ry="8" fill="#FFCCBC" transform="rotate(15,{x+22},{hy-22})"/>
    <!-- Head (round!) -->
    <circle cx="{x}" cy="{hy}" r="30" fill="#BCAAA4" stroke="#8D6E63" stroke-width="1.5"/>
    <!-- Big nose (blue/pink) -->
    <ellipse cx="{x}" cy="{hy+8}" rx="9" ry="7" fill="#1565C0"/>
    <!-- Eyes (big cute) -->
    <ellipse cx="{x-10}" cy="{hy-6}" rx="7" ry="8" fill="white"/>
    <ellipse cx="{x+10}" cy="{hy-6}" rx="7" ry="8" fill="white"/>
    <ellipse cx="{x-9}" cy="{hy-5}" rx="5" ry="6" fill="#1a1a1a"/>
    <ellipse cx="{x+9}" cy="{hy-5}" rx="5" ry="6" fill="#1a1a1a"/>
    <ellipse cx="{x-8}" cy="{hy-6}" rx="2" ry="2.5" fill="white" opacity="0.8"/>
    <ellipse cx="{x+8}" cy="{hy-6}" rx="2" ry="2.5" fill="white" opacity="0.8"/>
    <!-- Tiny smile -->
    <path d="M{x-8} {hy+16} Q{x} {hy+22} {x+8} {hy+16}" stroke="#5D4037" stroke-width="2" fill="none"/>
    <!-- Small body -->
    <path d="M{x-20} {by} L{x-22} {GROUND_Y} L{x+22} {GROUND_Y} L{x+20} {by}Z" fill="{ac}" opacity="0.85"/>
    <!-- Tiny legs -->
    <rect x="{x-18}" y="{GROUND_Y-18}" width="14" height="18" rx="4" fill="#5D4037"/>
    <rect x="{x+4}" y="{GROUND_Y-18}" width="14" height="18" rx="4" fill="#5D4037"/>
  </g>'''

def robin(x, hy, bc, ac, sk):
    """Long dark hair + elegant"""
    by = hy + 30
    return f'''<!-- Robin -->
  <g>
    <!-- Long dark hair (left side) -->
    <path d="M{x-26} {hy-14} Q{x-34} {hy+20} {x-30} {GROUND_Y-40}" stroke="{bc}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <!-- Long dark hair behind -->
    <path d="M{x-20} {hy-28} Q{x-10} {hy-48} {x+14} {hy-44}
             Q{x+28} {hy-36} {x+26} {hy-16}" fill="{bc}"/>
    <path d="M{x+24} {hy-10} Q{x+32} {hy+30} {x+28} {GROUND_Y-50}" stroke="{bc}" stroke-width="10" fill="none"/>
    <!-- Head -->
    <circle cx="{x}" cy="{hy}" r="26" fill="{sk}" stroke="#C8956C" stroke-width="1"/>
    <!-- Calm eyes -->
    <ellipse cx="{x-9}" cy="{hy-2}" rx="5" ry="4.5" fill="#1a1a1a"/>
    <ellipse cx="{x+9}" cy="{hy-2}" rx="5" ry="4.5" fill="#1a1a1a"/>
    <ellipse cx="{x-8}" cy="{hy-3}" rx="2" ry="2" fill="white" opacity="0.7"/>
    <ellipse cx="{x+8}" cy="{hy-3}" rx="2" ry="2" fill="white" opacity="0.7"/>
    <!-- Slight smile -->
    <path d="M{x-8} {hy+10} Q{x} {hy+16} {x+8} {hy+10}" stroke="#8B4513" stroke-width="1.5" fill="none"/>
    <!-- Elegant outfit -->
    <path d="M{x-20} {by} L{x-22} {GROUND_Y} L{x+22} {GROUND_Y} L{x+20} {by}Z" fill="{bc}" opacity="0.85"/>
    <!-- Collar/neckline -->
    <path d="M{x-10} {by} L{x} {by+20} L{x+10} {by}" fill="{sk}" opacity="0.6"/>
    <!-- Robin's cross-arm pose: two arms crossing -->
    <path d="M{x-24} {by+20} Q{x-10} {by+35} {x+20} {by+15}" stroke="{sk}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M{x+24} {by+20} Q{x+10} {by+35} {x-20} {by+15}" stroke="{sk}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <!-- Flower ornament in hair -->
    <circle cx="{x+18}" cy="{hy-28}" r="7" fill="#E91E63" opacity="0.8"/>
    <circle cx="{x+18}" cy="{hy-28}" r="3" fill="#FFF9C4"/>
  </g>'''

def franky(x, hy, bc, ac, sk):
    """Very wide shoulders + star hair + sunglasses"""
    by = hy + 30
    return f'''<!-- Franky -->
  <g>
    <!-- Star-shaped blue hair -->
    <path d="M{x} {hy-60} L{x-10} {hy-40} L{x-30} {hy-45} L{x-18} {hy-30}
             L{x-35} {hy-20} L{x-14} {hy-18} L{x-20} {hy+0}
             L{x} {hy-10} L{x+20} {hy+0} L{x+14} {hy-18}
             L{x+35} {hy-20} L{x+18} {hy-30} L{x+30} {hy-45}
             L{x+10} {hy-40}Z" fill="{bc}"/>
    <!-- Head -->
    <circle cx="{x}" cy="{hy}" r="28" fill="{sk}" stroke="#C8956C" stroke-width="1"/>
    <!-- Sunglasses (heart-shaped in some outfits) -->
    <ellipse cx="{x-9}" cy="{hy-4}" rx="9" ry="7" fill="{bc}" opacity="0.9"/>
    <ellipse cx="{x+9}" cy="{hy-4}" rx="9" ry="7" fill="{bc}" opacity="0.9"/>
    <line x1="{x-18}" y1="{hy-4}" x2="{x+18}" y2="{hy-4}" stroke="{ac}" stroke-width="2"/>
    <line x1="{x-27}" y1="{hy-4}" x2="{x-18}" y2="{hy-4}" stroke="{ac}" stroke-width="2"/>
    <line x1="{x+18}" y1="{hy-4}" x2="{x+27}" y2="{hy-4}" stroke="{ac}" stroke-width="2"/>
    <!-- Wide grin -->
    <path d="M{x-14} {hy+12} Q{x} {hy+22} {x+14} {hy+12}" stroke="#333" stroke-width="2.5" fill="none"/>
    <!-- VERY WIDE mechanical body (most distinctive feature!) -->
    <path d="M{x-55} {by+5} L{x-50} {GROUND_Y} L{x+50} {GROUND_Y} L{x+55} {by+5} L{x+24} {by} L{x-24} {by}Z"
          fill="{bc}" opacity="0.9"/>
    <!-- Franky logo on chest -->
    <text x="{x}" y="{by+45}" text-anchor="middle" font-family="Arial Black" font-size="12" fill="white" font-weight="900">F</text>
    <!-- Wide arms (mechanical) -->
    <rect x="{x-55}" y="{by+5}" width="16" height="50" rx="6" fill="{ac}" opacity="0.9"/>
    <rect x="{x+39}" y="{by+5}" width="16" height="50" rx="6" fill="{ac}" opacity="0.9"/>
    <!-- Cola bottles in hair -->
    <rect x="{x-38}" y="{hy-36}" width="8" height="20" rx="3" fill="#90CAF9" opacity="0.8"/>
    <rect x="{x+30}" y="{hy-36}" width="8" height="20" rx="3" fill="#90CAF9" opacity="0.8"/>
  </g>'''

def brook(x, hy, bc, ac, sk):
    """Skeleton face + huge afro — very tall"""
    by = hy + 30
    afro_r = 42  # huge afro
    return f'''<!-- Brook (very tall, skeleton) -->
  <g>
    <!-- HUGE afro -->
    <circle cx="{x}" cy="{hy - 55}" r="{afro_r}" fill="#1a1a1a"/>
    <!-- Afro highlights -->
    <ellipse cx="{x-10}" cy="{hy-70}" rx="12" ry="8" fill="#333" opacity="0.8"/>
    <!-- Skull face (no flesh = very distinctive) -->
    <circle cx="{x}" cy="{hy}" r="26" fill="#EEEEEE" stroke="#BDBDBD" stroke-width="1.5"/>
    <!-- Eye sockets (dark hollows) -->
    <ellipse cx="{x-9}" cy="{hy-4}" rx="7" ry="8" fill="#212121"/>
    <ellipse cx="{x+9}" cy="{hy-4}" rx="7" ry="8" fill="#212121"/>
    <!-- Nose hole -->
    <ellipse cx="{x}" cy="{hy+7}" rx="3" ry="4" fill="#212121"/>
    <!-- Skull teeth grin -->
    <rect x="{x-11}" y="{hy+14}" width="5" height="8" rx="1" fill="#212121"/>
    <rect x="{x-5}" y="{hy+14}" width="5" height="8" rx="1" fill="#212121"/>
    <rect x="{x+1}" y="{hy+14}" width="5" height="8" rx="1" fill="#212121"/>
    <rect x="{x+7}" y="{hy+14}" width="5" height="8" rx="1" fill="#212121"/>
    <!-- Violin/cane sword -->
    <line x1="{x+34}" y1="{hy-10}" x2="{x+38}" y2="{GROUND_Y}" stroke="#795548" stroke-width="4" stroke-linecap="round"/>
    <!-- Top hat (Brook's signature) -->
    <ellipse cx="{x}" cy="{hy-90}" rx="22" ry="5" fill="{bc}"/>
    <rect x="{x-16}" y="{hy-120}" width="32" height="30" rx="3" fill="{bc}"/>
    <!-- Tail coat (thin elegant body) -->
    <path d="M{x-16} {by} L{x-18} {GROUND_Y} L{x-10} {GROUND_Y} M{x+10} {GROUND_Y} L{x+18} {GROUND_Y} L{x+16} {by}Z"
          fill="{bc}" opacity="0.9"/>
    <rect x="{x-16}" y="{by}" width="32" height="30" fill="{bc}" opacity="0.9"/>
  </g>'''

def jinbe(x, hy, bc, ac, sk):
    """Large fishman + blue skin + gill marks"""
    by = hy + 34  # wider body
    return f'''<!-- Jinbe (large!) -->
  <g>
    <!-- Head (large, round, fishman) -->
    <circle cx="{x}" cy="{hy}" r="34" fill="{sk}" stroke="#00695C" stroke-width="2"/>
    <!-- Gill marks on cheeks (diagonal lines) -->
    <line x1="{x-28}" y1="{hy-8}" x2="{x-18}" y2="{hy+4}" stroke="#004D40" stroke-width="2.5" opacity="0.7"/>
    <line x1="{x-26}" y1="{hy+0}" x2="{x-16}" y2="{hy+12}" stroke="#004D40" stroke-width="2.5" opacity="0.7"/>
    <line x1="{x+18}" y1="{hy-8}" x2="{x+28}" y2="{hy+4}" stroke="#004D40" stroke-width="2.5" opacity="0.7"/>
    <line x1="{x+16}" y1="{hy+0}" x2="{x+26}" y2="{hy+12}" stroke="#004D40" stroke-width="2.5" opacity="0.7"/>
    <!-- Eyes (calm, determined) -->
    <ellipse cx="{x-12}" cy="{hy-4}" rx="7" ry="6" fill="#1a1a1a"/>
    <ellipse cx="{x+12}" cy="{hy-4}" rx="7" ry="6" fill="#1a1a1a"/>
    <ellipse cx="{x-11}" cy="{hy-5}" rx="3" ry="3" fill="white" opacity="0.7"/>
    <ellipse cx="{x+11}" cy="{hy-5}" rx="3" ry="3" fill="white" opacity="0.7"/>
    <!-- Stern expression -->
    <path d="M{x-12} {hy+14} Q{x} {hy+20} {x+12} {hy+14}" stroke="#004D40" stroke-width="2.5" fill="none"/>
    <!-- WIDE body (karate gi) -->
    <path d="M{x-46} {by} L{x-48} {GROUND_Y} L{x+48} {GROUND_Y} L{x+46} {by}Z" fill="white" opacity="0.85"/>
    <!-- Gi opening -->
    <path d="M{x-8} {by} L{x-12} {GROUND_Y-40} M{x+8} {by} L{x+12} {GROUND_Y-40}" stroke="{bc}" stroke-width="2" fill="none"/>
    <!-- Gi belt -->
    <rect x="{x-48}" y="{hy+100}" width="96" height="14" rx="3" fill="{bc}" opacity="0.85"/>
  </g>'''

CHAR_FUNCS = [luffy, zoro, nami, usopp, sanji, chopper, robin, franky, brook, jinbe]

def build_svg():
    # Per-char name labels
    name_labels = []
    for i, (name, bc, ac, sk, cx, hy) in enumerate(CHARS):
        name_labels.append(
            f'<text x="{cx}" y="{GROUND_Y + 28}" text-anchor="middle" '
            f'font-family="Bangers, Arial Black, sans-serif" font-size="13" '
            f'letter-spacing="1" fill="{ac}" opacity="0.95">{name.upper()}</text>'
        )

    # Character SVG bodies
    char_svgs = []
    for i, (name, bc, ac, sk, cx, hy) in enumerate(CHARS):
        char_svgs.append(CHAR_FUNCS[i](cx, hy, bc, ac, sk))

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<defs>
  <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#060a14"/>
    <stop offset="55%" stop-color="#0b1f40"/>
    <stop offset="100%" stop-color="#1a3560"/>
  </linearGradient>
  <filter id="glow">
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- Background ocean -->
<rect width="{W}" height="{H}" fill="url(#sky-grad)"/>

<!-- Stars -->
{stars_bg()}

<!-- Moon -->
{moon()}

<!-- Title -->
<text x="{W//2}" y="{TITLE_Y}" text-anchor="middle"
      font-family="Bangers, Arial Black, sans-serif" font-size="22"
      letter-spacing="10" fill="#D4A843" filter="url(#glow)" opacity="0.9">STRAW HAT PIRATES</text>

<!-- Ground / ocean surface -->
{wave()}

<!-- ========== CHARACTERS ========== -->
{chr(10).join(char_svgs)}

<!-- ========== CHARACTER NAMES ========== -->
{chr(10).join(name_labels)}

</svg>'''
    return svg

if __name__ == '__main__':
    out_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'straw-hat-crew.svg')
    svg_content = build_svg()
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f'Generated: {out_path} ({len(svg_content)} chars)')
