// Pole-star mark geometry — implements orchestra/research/brand-proposal.md
// section (b) in dhruva-app: an elongated 4-point compass needle, 64x64
// viewBox, center (32,32). Tips: N(32,4) E(58,32) S(32,60) W(6,32); each tip
// is flanked by two base corners 5px out from center on the perpendicular
// axis (N/S share the horizontal pair, E/W share the vertical pair).
//
// Shape is built as 4 overlapping "kite" subpaths (one per tip: corner -> Q
// -> tip -> Q -> corner -> close), unioned via the default nonzero fill
// rule. Each Bezier control point is that edge's straight-line midpoint
// pulled 3px toward center — the concave waist pinch the spec calls for.
// The center pinhole is a separate 2px-radius circle painted in the
// background color on top, per spec ("filled with the background color
// behind the mark") rather than a geometric cutout, so it works correctly
// regardless of fill-rule/winding without extra complexity.
//
// Shared by src/components/Logo.astro (live, CSS-var themed) and used as the
// reference for the hand-authored public/favicon.svg (a static file that
// can't consume page CSS vars, so it hardcodes the same coordinates).

export const STAR_VIEWBOX = '0 0 64 64';
export const STAR_CENTER = { x: 32, y: 32 };
export const STAR_PINHOLE_RADIUS = 2;

export const STAR_PATH_D = [
  // N kite — tip (32,4), corners (27,32) and (37,32)
  'M27,32 Q30.03,20.95 32,4 Q33.97,20.95 37,32 L27,32 Z',
  // S kite — tip (32,60), corners (37,32) and (27,32)
  'M37,32 Q33.97,43.05 32,60 Q30.03,43.05 27,32 Z',
  // E kite — tip (58,32), corners (32,27) and (32,37)
  'M32,27 Q42.05,30.07 58,32 Q42.05,33.93 32,37 Z',
  // W kite — tip (6,32), corners (32,37) and (32,27)
  'M32,37 Q21.95,33.93 6,32 Q21.95,30.07 32,27 Z',
].join(' ');
