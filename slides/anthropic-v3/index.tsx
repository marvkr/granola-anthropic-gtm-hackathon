import type { DesignSystem, Page, SlideMeta } from "@open-slide/core";
import type { ReactNode, SVGProps } from "react";

// Demo deck. Every figure comes from a public source named in the notes.
// It is not an Anthropic document.

export const meta: SlideMeta = {
  title: "Anthropic V3",
  createdAt: "2026-10-21T02:37:46.682Z",
};

export const design: DesignSystem = {
  palette: { bg: "#f4f1ea", text: "#1c1b18", accent: "#c4643f" },
  fonts: {
    display: '"Geist Variable", Geist, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    body: '"Geist Variable", Geist, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  },
  typeScale: { hero: 72, body: 24 },
  radius: 24,
};

const css = `
.pitch-deck-page {
  --background: var(--osd-bg);
  --foreground: var(--osd-text);
  --card: #ffffff;
  --muted: #ece8df;
  --muted-foreground: #66625a;
  --border: #e2ddd2;
  --accent-surface: color-mix(in oklch, var(--osd-accent) 12%, var(--card));
  --accent-border: color-mix(in oklch, var(--osd-accent) 38%, var(--card));
  --accent-ink: color-mix(in oklch, var(--osd-accent) 62%, black);
  --shadow-sm: 0 0 0 0.0625rem rgb(28 27 24 / 0.03), 0 0.0625rem 0.125rem rgb(28 27 24 / 0.05);
  --shadow-lg: 0 0 0 0.0625rem rgb(28 27 24 / 0.03), 0 0.75rem 2.5rem -1.25rem rgb(28 27 24 / 0.12);
  --radius: 0.875rem;
  --radius-panel: var(--osd-radius);
  --radius-control: 0.875rem;
  --radius-card: 1.25rem;
  --font-mono: ui-monospace, "SF Mono", Menlo, monospace;
  font-family: var(--osd-font-body);
}

.pitch-deck-page--dark {
  --background: #1b1a17;
  --foreground: #f2efe8;
  --card: #24221e;
  --muted: #2e2b26;
  --muted-foreground: #aaa59b;
  --border: #3a372f;
  --accent-surface: color-mix(in oklch, var(--osd-accent) 18%, var(--card));
  --accent-border: color-mix(in oklch, var(--osd-accent) 45%, var(--card));
  --accent-ink: color-mix(in oklch, var(--osd-accent) 45%, white);
  --shadow-sm: 0 0 0 0.0625rem rgb(0 0 0 / 0.3), 0 0.0625rem 0.125rem rgb(0 0 0 / 0.3);
  --shadow-lg: 0 0 0 0.0625rem rgb(0 0 0 / 0.28), 0 0.75rem 2.5rem -1.25rem rgb(0 0 0 / 0.5);
}

.pitch-cover-note {
  margin: 1.5rem 0 0;
  color: var(--muted-foreground);
  font-size: 1.375rem;
  font-weight: 560;
}

.pitch-deck-page {
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 67.5rem;
  flex-direction: column;
  overflow: hidden;
  padding: 6rem 7rem 4.5rem;
  background: var(--background);
  color: var(--foreground);
}

.pitch-deck-illustration {
  position: absolute;
  top: 4rem;
  right: -2rem;
  z-index: 0;
  width: 32.5rem;
  height: 32.5rem;
  overflow: hidden;
  color: var(--muted-foreground);
  opacity: 0.055;
  pointer-events: none;
}

.pitch-deck-illustration svg {
  width: 35rem;
  height: 35rem;
  transform: translateX(3.5rem) rotate(-8deg);
  transform-origin: center;
}

.pitch-deck-content {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
}

.pitch-deck-footer {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.375rem;
  padding-top: 1.5rem;
  border-top: 0.0625rem solid var(--border);
  color: var(--muted-foreground);
  font-size: 1.3125rem;
  font-weight: 650;
  letter-spacing: -0.01em;
}

.pitch-deck-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.pitch-cover-layout {
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
}

.pitch-cover-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.pitch-cover-brand,
.pitch-slide-title {
  margin: 0;
  text-align: left;
  text-transform: none;
}

.pitch-cover-brand {
  font-size: 2.125rem;
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1;
}

.pitch-slide-title {
  max-width: 96.25rem;
  font-size: 4.5rem;
  font-weight: 680;
  letter-spacing: -0.06em;
  line-height: 1;
  text-wrap: balance;
}

.pitch-before-after {
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.125rem;
  margin: 3.125rem 0 1.25rem;
}

.pitch-before-after section {
  display: grid;
  min-height: 24.375rem;
  grid-template-rows: auto 1fr;
  gap: 1.875rem;
  padding: 2.5rem 2.75rem;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius-panel);
  background: var(--card);
  box-shadow: var(--shadow-sm);
}

.pitch-before-after section.pitch-before-after--emphasis {
  border-color: var(--accent-border);
  background: var(--accent-surface);
  color: var(--accent-ink);
}

.pitch-before-after h3 {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 1.5rem;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.pitch-before-after--emphasis h3 {
  color: var(--accent-ink);
}

.pitch-before-after ul {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pitch-before-after li {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border-top: 0.0625rem solid var(--border);
  font-size: 2.1875rem;
  font-weight: 660;
  letter-spacing: -0.035em;
}

.pitch-before-after li svg {
  width: 2.125rem;
  height: 2.125rem;
  color: var(--muted-foreground);
}

.pitch-before-after--emphasis li svg {
  color: var(--accent-ink);
}

.pitch-signal-grid {
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem;
  margin: 3.125rem 0 1.25rem;
}

.pitch-signal-grid section {
  display: flex;
  min-height: 24.375rem;
  flex-direction: column;
  padding: 2.375rem;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius-panel);
  background: var(--card);
  box-shadow: var(--shadow-sm);
}

.pitch-signal-grid svg {
  width: 2.625rem;
  height: 2.625rem;
  color: var(--muted-foreground);
}

.pitch-signal-grid strong {
  margin-top: auto;
  font-size: 5.75rem;
  font-weight: 700;
  letter-spacing: -0.07em;
  line-height: 0.9;
}

.pitch-signal-grid span {
  min-height: 3.75rem;
  margin-top: 1.5rem;
  color: var(--muted-foreground);
  font-size: 1.5625rem;
  font-weight: 620;
  line-height: 1.2;
}

.pitch-signal-grid small {
  margin-top: 1.375rem;
  padding-top: 1.125rem;
  border-top: 0.0625rem solid var(--border);
  color: var(--muted-foreground);
  font-size: 1.0625rem;
  font-weight: 600;
}

.pitch-product-flow {
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: minmax(0, 1fr) 3.625rem minmax(0, 1fr) 3.625rem minmax(0, 1fr);
  gap: 1rem;
  margin: 3.125rem 0 1.25rem;
}

.pitch-product-flow section {
  display: flex;
  min-height: 25rem;
  flex-direction: column;
  padding: 2.125rem;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius-panel);
  background: var(--card);
  box-shadow: var(--shadow-sm);
}

.pitch-product-flow section.pitch-product-flow--active {
  border-color: var(--accent-border);
  background: var(--accent-surface);
  color: var(--accent-ink);
}

.pitch-flow-icon {
  display: flex;
  width: 3.625rem;
  height: 3.625rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-control);
  background: var(--muted);
  color: var(--muted-foreground);
}

.pitch-product-flow--active .pitch-flow-icon {
  background: var(--background);
  color: var(--accent-ink);
}

.pitch-flow-icon svg {
  width: 2rem;
  height: 2rem;
}

.pitch-product-flow strong {
  margin-top: auto;
  font-size: 2.4375rem;
  font-weight: 680;
  letter-spacing: -0.045em;
  line-height: 1;
}

.pitch-product-flow p {
  min-height: 3.625rem;
  margin: 1.25rem 0 0;
  color: var(--muted-foreground);
  font-size: 1.1875rem;
  font-weight: 610;
  line-height: 1.35;
}

.pitch-product-flow--active p {
  color: var(--accent-ink);
}

.pitch-flow-arrow {
  color: var(--muted-foreground);
  font-size: 2.625rem;
  text-align: center;
}

.pitch-traction-layout {
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 4.125rem;
  margin: 3rem 0 1.25rem;
}

.pitch-traction-primary {
  position: relative;
  display: flex;
  min-height: 26.25rem;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3rem 3.375rem;
  border: 0.0625rem solid var(--accent-border);
  border-radius: var(--radius-panel);
  background: var(--accent-surface);
  color: var(--accent-ink);
  box-shadow: var(--shadow-lg);
}

.pitch-traction-primary > svg {
  position: absolute;
  top: 2.875rem;
  right: 3.125rem;
  width: 3.75rem;
  height: 3.75rem;
  opacity: 0.72;
}

.pitch-traction-primary strong {
  font-size: 8.875rem;
  font-weight: 700;
  letter-spacing: -0.075em;
  line-height: 0.88;
}

.pitch-traction-primary span {
  margin-top: 1.625rem;
  font-size: 1.75rem;
  font-weight: 650;
}

.pitch-traction-supporting {
  border-top: 0.0625rem solid var(--border);
}

.pitch-traction-supporting > div {
  display: grid;
  align-items: center;
  grid-template-columns: 2.875rem 10rem minmax(0, 1fr);
  gap: 1.25rem;
  padding: 1.6875rem 0;
  border-bottom: 0.0625rem solid var(--border);
}

.pitch-traction-supporting svg {
  width: 2rem;
  height: 2rem;
  color: var(--muted-foreground);
}

.pitch-traction-supporting strong {
  font-size: 2.5rem;
  font-weight: 690;
  letter-spacing: -0.05em;
}

.pitch-traction-supporting span {
  color: var(--muted-foreground);
  font-size: 1.4375rem;
  font-weight: 620;
}

.pitch-expansion-path {
  display: flex;
  flex: 1;
  align-items: center;
  margin: 2.875rem 0 1.125rem;
}

.pitch-expansion-step {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
}

.pitch-expansion-step section {
  display: flex;
  min-height: 20.625rem;
  flex: 1;
  flex-direction: column;
  padding: 2.25rem;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius-panel);
  background: var(--card);
  box-shadow: var(--shadow-sm);
}

.pitch-expansion-step svg {
  width: 2.625rem;
  height: 2.625rem;
  color: var(--muted-foreground);
}

.pitch-expansion-step strong {
  margin-top: auto;
  font-size: 2.6875rem;
  font-weight: 680;
  letter-spacing: -0.045em;
}

.pitch-expansion-step span:not(.pitch-expansion-arrow) {
  min-height: 3.5rem;
  margin-top: 1.125rem;
  color: var(--muted-foreground);
  font-size: 1.3125rem;
  font-weight: 610;
  line-height: 1.3;
}

.pitch-expansion-arrow {
  flex: 0 0 3.375rem;
  color: var(--muted-foreground);
  font-size: 2.25rem;
  text-align: center;
}

.pitch-source-note {
  max-width: 90.625rem;
  margin: 0;
  color: var(--muted-foreground);
  font-size: 1.0625rem;
  font-weight: 580;
  line-height: 1.35;
}

.pitch-business-model {
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem;
  margin: 3rem 0 1.25rem;
}

.pitch-business-model section {
  display: flex;
  min-height: 24.375rem;
  flex-direction: column;
  padding: 2.375rem;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius-panel);
  background: var(--card);
  box-shadow: var(--shadow-sm);
}

.pitch-business-model section:last-child {
  border-color: var(--accent-border);
  background: var(--accent-surface);
  color: var(--accent-ink);
}

.pitch-business-model svg {
  width: 2.625rem;
  height: 2.625rem;
  color: var(--muted-foreground);
}

.pitch-business-model section:last-child svg {
  color: var(--accent-ink);
}

.pitch-business-model h3 {
  margin: auto 0 0;
  font-size: 2.6875rem;
  font-weight: 680;
  letter-spacing: -0.045em;
}

.pitch-business-model strong {
  margin-top: 1.25rem;
  font-size: 1.5rem;
  font-weight: 650;
}

.pitch-business-model p {
  min-height: 3.5rem;
  margin: 1rem 0 0;
  color: var(--muted-foreground);
  font-size: 1.25rem;
  font-weight: 610;
  line-height: 1.35;
}

.pitch-business-model section:last-child p {
  color: var(--accent-ink);
}

.pitch-comparison {
  display: flex;
  flex: 1;
  align-items: center;
  margin: 3rem 0 1.25rem;
}

.pitch-comparison table {
  width: 100%;
  overflow: hidden;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius-panel);
  border-spacing: 0;
  background: var(--card);
  box-shadow: var(--shadow-sm);
  table-layout: fixed;
}

.pitch-comparison th,
.pitch-comparison td {
  padding: 1.5625rem 1.75rem;
  border-right: 0.0625rem solid var(--border);
  border-bottom: 0.0625rem solid var(--border);
  font-size: 1.4375rem;
  text-align: left;
}

.pitch-comparison tr > :last-child {
  border-right: 0;
}

.pitch-comparison tbody tr:last-child > * {
  border-bottom: 0;
}

.pitch-comparison thead th {
  color: var(--muted-foreground);
  font-size: 1.1875rem;
  font-weight: 650;
}

.pitch-comparison tbody th {
  width: 18%;
  color: var(--muted-foreground);
  font-weight: 620;
}

.pitch-comparison td {
  font-weight: 660;
}

.pitch-comparison .pitch-comparison-better {
  border-color: var(--accent-border);
  background: var(--accent-surface);
  color: var(--accent-ink);
}

.pitch-founder-layout {
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: minmax(0, 0.68fr) minmax(0, 1.32fr);
  gap: 6.625rem;
  margin: 3rem 0 1.25rem;
}

.pitch-founder-profile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.125rem;
}

.pitch-founder-identity {
  display: flex;
  align-items: center;
  gap: 1.625rem;
}

.pitch-founder-avatar {
  display: flex;
  width: 7.625rem;
  height: 7.625rem;
  flex: 0 0 7.625rem;
  align-items: center;
  justify-content: center;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius-panel);
  background: var(--card);
  box-shadow: var(--shadow-sm);
}

.pitch-founder-avatar svg {
  width: 3.875rem;
  height: 3.875rem;
  color: var(--muted-foreground);
}

.pitch-founder-identity > div {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.pitch-founder-profile strong {
  font-size: 2.9375rem;
  font-weight: 680;
  letter-spacing: -0.045em;
  line-height: 1;
}

.pitch-founder-identity div span {
  color: var(--muted-foreground);
  font-size: 1.3125rem;
  font-weight: 620;
}

.pitch-founder-stats {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 0.0625rem solid var(--border);
  border-bottom: 0.0625rem solid var(--border);
}

.pitch-founder-stats > div {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.625rem;
  padding: 1.5rem 1.375rem 1.5rem 0;
}

.pitch-founder-stats > div + div {
  padding-left: 1.375rem;
  border-left: 0.0625rem solid var(--border);
}

.pitch-founder-stats strong {
  font-size: 3.0625rem;
  font-weight: 700;
  letter-spacing: -0.055em;
  line-height: 0.95;
}

.pitch-founder-stats span {
  color: var(--muted-foreground);
  font-size: 1.125rem;
  font-weight: 610;
  line-height: 1.25;
}

.pitch-founder-proof {
  margin: 0;
  padding: 0;
  border-top: 0.0625rem solid var(--border);
  list-style: none;
}

.pitch-founder-proof li {
  display: grid;
  align-items: center;
  grid-template-columns: 3.25rem minmax(0, 1fr);
  gap: 1.5rem;
  padding: 1.875rem 0;
  border-bottom: 0.0625rem solid var(--border);
}

.pitch-founder-proof svg {
  width: 2.125rem;
  height: 2.125rem;
  color: var(--muted-foreground);
}

.pitch-founder-proof strong {
  font-size: 1.9375rem;
  font-weight: 650;
  letter-spacing: -0.025em;
}

.pitch-founder-source {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 1rem;
  font-weight: 580;
}

.pitch-milestones {
  display: grid;
  flex: 1;
  align-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.75rem;
  margin: 3rem 0 1.25rem;
  padding: 0;
  list-style: none;
}

.pitch-milestones li {
  display: flex;
  min-height: 23.125rem;
  flex-direction: column;
  padding: 2.25rem;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius-panel);
  background: var(--card);
  box-shadow: var(--shadow-sm);
}

.pitch-closing-layout {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.pitch-closing-brand {
  display: inline-flex;
  align-items: center;
  gap: 1.125rem;
  color: var(--foreground);
  font-size: 2.125rem;
  font-weight: 680;
  letter-spacing: -0.035em;
}

.pitch-closing-title {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin: 4.375rem 0 0;
  font-size: 5.75rem;
  font-weight: 680;
  letter-spacing: -0.065em;
  line-height: 0.98;
  text-wrap: balance;
}

.pitch-closing-command {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  margin-top: 4.5rem;
  padding: 1.25rem 1.75rem;
  border: 0.0625rem solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--foreground);
  box-shadow: var(--shadow-sm);
  font-size: 1.6875rem;
}

.pitch-closing-command > span {
  color: var(--muted-foreground);
}

.pitch-closing-command code {
  font-family: var(--font-mono);
  font-weight: 620;
}

.pitch-milestone-horizon {
  color: var(--muted-foreground);
  font-size: 1.1875rem;
  font-weight: 650;
}

.pitch-milestones svg {
  width: 2.625rem;
  height: 2.625rem;
  margin-top: 2.125rem;
  color: var(--muted-foreground);
}

.pitch-milestones strong {
  margin-top: auto;
  font-size: 2.625rem;
  font-weight: 680;
  letter-spacing: -0.045em;
}

.pitch-milestones p {
  min-height: 3.625rem;
  margin: 1.125rem 0 0;
  color: var(--muted-foreground);
  font-size: 1.25rem;
  font-weight: 610;
  line-height: 1.35;
}
`;

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}>
      {children}
    </svg>
  );
}

// Icon paths follow Lucide (ISC licence).
const CodeIcon = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </Icon>
);
const LayersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </Icon>
);
const ShieldCheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);
const ChartBarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </Icon>
);
const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);
const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 0 0-16 0" />
  </Icon>
);
const CreditCardIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect height="14" rx="2" width="20" x="2" y="5" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </Icon>
);
const RefreshIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </Icon>
);
const BuildingIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </Icon>
);
const CpuIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect height="16" rx="2" width="16" x="4" y="4" />
    <rect height="6" rx="1" width="6" x="9" y="9" />
    <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
  </Icon>
);
const FileTextIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M16 13H8M16 17H8M10 9H8" />
  </Icon>
);
const ZapIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </Icon>
);
const EyeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect height="11" rx="2" width="18" x="3" y="11" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Icon>
);
const GlobeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </Icon>
);

interface SlideFrameProps {
  children: ReactNode;
  illustration?: ReactNode;
  page: number;
  showFooter?: boolean;
  titleId: string;
  tone?: "light" | "dark";
}

function SlideFrame({
  children,
  illustration,
  page,
  showFooter = true,
  titleId,
  tone = "light",
}: SlideFrameProps) {
  return (
    <article aria-labelledby={titleId} className={`pitch-deck-page pitch-deck-page--${tone}`}>
      <style>{css}</style>
      {illustration ? (
        <div aria-hidden="true" className="pitch-deck-illustration">
          {illustration}
        </div>
      ) : null}
      <div className="pitch-deck-content">{children}</div>
      {showFooter ? (
        <footer className="pitch-deck-footer">
          <span className="pitch-deck-brand">Anthropic</span>
          <span>{String(page).padStart(2, "0")}</span>
        </footer>
      ) : null}
    </article>
  );
}

const Cover: Page = () => (
  <SlideFrame illustration={<LayersIcon />} page={1} titleId="cover-title" tone="dark">
    <div className="pitch-cover-layout">
      <div className="pitch-cover-copy">
        <h1 className="pitch-cover-brand" id="cover-title">
          Anthropic
        </h1>
        <p className="pitch-cover-note">Demo deck built from public sources. Not an Anthropic document.</p>
      </div>
    </div>
  </SlideFrame>
);

const aiDoes = [
  { label: "Code", icon: CodeIcon },
  { label: "Research", icon: FileTextIcon },
  { label: "Actions", icon: ZapIcon },
];

const enterprisesNeed = [
  { label: "Safety", icon: ShieldCheckIcon },
  { label: "Predictable behaviour", icon: EyeIcon },
  { label: "Governance: access, data, audit", icon: LockIcon },
];

type IconItem = { label: string; icon: (p: IconProps) => ReactNode };

function IconList({ items }: { items: IconItem[] }) {
  return (
    <ul>
      {items.map(({ icon: ItemIcon, label }) => (
        <li key={label}>
          <ItemIcon aria-hidden="true" />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

const Problem: Page = () => (
  <SlideFrame page={2} titleId="problem-title">
    <h2 className="pitch-slide-title" id="problem-title">
      AI can do the work. Enterprises still have to trust it.
    </h2>
    <div className="pitch-before-after">
      <section aria-label="What AI does">
        <h3>AI does</h3>
        <IconList items={aiDoes} />
      </section>
      <section aria-label="What enterprises still need" className="pitch-before-after--emphasis">
        <h3>Enterprises still need</h3>
        <IconList items={enterprisesNeed} />
      </section>
    </div>
  </SlideFrame>
);

const signals = [
  {
    value: "$37B",
    label: "enterprise generative AI spend in 2025, up 3.2× in a year",
    source: "Menlo Ventures, Dec 2025",
    icon: ChartBarIcon,
  },
  {
    value: "$4.0B",
    label: "spent by enterprises on AI coding in 2025, across all vendors",
    source: "Menlo Ventures, Dec 2025",
    icon: CodeIcon,
  },
  {
    value: "73%",
    label: "of developers who use AI coding tools use them every day",
    source: "Stack Overflow, 2026",
    icon: UsersIcon,
  },
];

const WhyNow: Page = () => (
  <SlideFrame page={3} titleId="why-now-title" tone="dark">
    <h2 className="pitch-slide-title" id="why-now-title">
      Enterprise AI spend tripled in a year.
    </h2>
    <div className="pitch-signal-grid">
      {signals.map(({ icon: SignalIcon, label, source, value }) => (
        <section key={value}>
          <SignalIcon aria-hidden="true" />
          <strong>{value}</strong>
          <span>{label}</span>
          <small>{source}</small>
        </section>
      ))}
    </div>
  </SlideFrame>
);

const Product: Page = () => (
  <SlideFrame page={4} titleId="product-title">
    <h2 className="pitch-slide-title" id="product-title">
      One model family behind every surface teams use.
    </h2>
    <div
      aria-label="Teams reach Claude through the apps, Claude Code, the API and the major clouds, and ship production work"
      className="pitch-product-flow"
      role="img">
      <section>
        <span className="pitch-flow-icon">
          <UsersIcon aria-hidden="true" />
        </span>
        <strong>Where teams work</strong>
        <p>Claude apps · Claude Code · Claude API · AWS · Google Cloud</p>
      </section>
      <span aria-hidden="true" className="pitch-flow-arrow">
        →
      </span>
      <section className="pitch-product-flow--active">
        <span className="pitch-flow-icon">
          <LayersIcon aria-hidden="true" />
        </span>
        <strong>Claude</strong>
        <p>Opus, Sonnet and Haiku 5.5</p>
      </section>
      <span aria-hidden="true" className="pitch-flow-arrow">
        →
      </span>
      <section>
        <span className="pitch-flow-icon">
          <ShieldCheckIcon aria-hidden="true" />
        </span>
        <strong>Production work</strong>
        <p>Code, analysis and agents that teams can trust</p>
      </section>
    </div>
  </SlideFrame>
);

const supportingMetrics = [
  { value: "500+", label: "customers above $1M a year, Feb 2026", icon: BuildingIcon },
  { value: "8 of 10", label: "Fortune 10 companies are customers, Feb 2026", icon: UsersIcon },
  { value: "$2.5B+", label: "Claude Code run-rate revenue, Feb 2026", icon: CodeIcon },
];

const Traction: Page = () => (
  <SlideFrame illustration={<LayersIcon />} page={5} titleId="traction-title">
    <h2 className="pitch-slide-title" id="traction-title">
      Run-rate revenue went from $47B to $65B+ in about two months.
    </h2>
    <div className="pitch-traction-layout">
      <div className="pitch-traction-primary">
        <RefreshIcon aria-hidden="true" />
        <strong>$65B+</strong>
        <span>run-rate revenue by the end of July 2026, per press reports</span>
        <span>Up from $47B in May 2026, Anthropic's own figure</span>
      </div>
      <div className="pitch-traction-supporting">
        {supportingMetrics.map(({ icon: MetricIcon, label, value }) => (
          <div key={label}>
            <MetricIcon aria-hidden="true" />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
    <p className="pitch-source-note" style={{ fontSize: 24 }}>
      $47B: Anthropic, May 2026. $65B+: AI Magazine, Aug 2026. Customer and Claude Code figures: Anthropic,
      Feb 2026.
    </p>
  </SlideFrame>
);

const expansion = [
  { title: "Developer", body: "Claude Code in the terminal", icon: CodeIcon },
  { title: "Team", body: "Claude across every function", icon: UsersIcon },
  { title: "Enterprise", body: "SSO, audit logs and admin controls", icon: BuildingIcon },
];

const Market: Page = () => (
  <SlideFrame page={6} titleId="market-title" tone="dark">
    <h2 className="pitch-slide-title" id="market-title">
      A developer wedge opens the $37B enterprise market.
    </h2>
    <div className="pitch-expansion-path">
      {expansion.map(({ body, icon: StepIcon, title }, index) => (
        <div className="pitch-expansion-step" key={title}>
          <section>
            <StepIcon aria-hidden="true" />
            <strong>{title}</strong>
            <span>{body}</span>
          </section>
          {index < expansion.length - 1 ? (
            <span aria-hidden="true" className="pitch-expansion-arrow">
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
    <p className="pitch-source-note" style={{ fontSize: 24 }}>
      Market: $37B enterprise generative AI spend in 2025. Anthropic's share of enterprise LLM API spend (not
      total AI spend): 40%, vs OpenAI 27% and Google 21%; 54% in coding. All figures: Menlo Ventures, Dec
      2025. Menlo is an Anthropic investor.
    </p>
  </SlideFrame>
);

const model = [
  {
    title: "Developer",
    model: "Usage-based API",
    body: "Pay per token on the Claude API",
    icon: CodeIcon,
  },
  {
    title: "Team",
    model: "Seat subscriptions",
    body: "Pro, Max and Team plans",
    icon: CreditCardIcon,
  },
  {
    title: "Enterprise",
    model: "Annual contracts",
    body: "Enterprise plans and cloud marketplaces",
    icon: ShieldCheckIcon,
  },
];

const BusinessModel: Page = () => (
  <SlideFrame page={7} titleId="business-model-title">
    <h2 className="pitch-slide-title" id="business-model-title">
      Usage starts with developers. Contracts expand the account.
    </h2>
    <div className="pitch-business-model">
      {model.map(({ body, icon: ModelIcon, model: revenueModel, title }) => (
        <section key={title}>
          <ModelIcon aria-hidden="true" />
          <h3>{title}</h3>
          <strong>{revenueModel}</strong>
          <p>{body}</p>
        </section>
      ))}
    </div>
  </SlideFrame>
);

const comparison = [
  {
    dimension: "Safety",
    capability: "Constitutional AI and the Responsible Scaling Policy",
    value: "Predictable behaviour in production",
  },
  {
    dimension: "Coding",
    capability: "Claude Code, the agent 66% of agent users pick",
    value: "Faster software delivery",
  },
  {
    dimension: "Distribution",
    capability: "Partnerships with Amazon, Google and Microsoft",
    value: "Buy through the cloud you already use",
  },
];

const Competition: Page = () => (
  <SlideFrame page={8} titleId="competition-title" tone="dark">
    <h2 className="pitch-slide-title" id="competition-title">
      Our edge: safety research that ships as product.
    </h2>
    <div className="pitch-comparison">
      <table aria-label="Anthropic's competitive strengths and customer value">
        <thead>
          <tr>
            <th scope="col">Strength</th>
            <th scope="col">Capability</th>
            <th className="pitch-comparison-better" scope="col">
              Benefit
            </th>
          </tr>
        </thead>
        <tbody>
          {comparison.map((row) => (
            <tr key={row.dimension}>
              <th scope="row">{row.dimension}</th>
              <td>{row.capability}</td>
              <td className="pitch-comparison-better">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SlideFrame>
);

const proof = [
  { label: "Daniela Amodei, co-founder and President", icon: UserIcon },
  { label: "Founded by former OpenAI employees", icon: FileTextIcon },
  { label: "Ships Claude Opus, Sonnet and Haiku 5.5", icon: LayersIcon },
];

const Team: Page = () => (
  <SlideFrame page={9} titleId="team-title">
    <h2 className="pitch-slide-title" id="team-title">
      Researchers who put safety at the frontier.
    </h2>
    <div className="pitch-founder-layout">
      <section className="pitch-founder-profile">
        <div className="pitch-founder-identity">
          <span className="pitch-founder-avatar">
            <UserIcon aria-hidden="true" />
          </span>
          <div>
            <strong>Dario Amodei</strong>
            <span>Co-founder &amp; CEO · San Francisco</span>
          </div>
        </div>
        <div aria-label="Company facts" className="pitch-founder-stats">
          <div>
            <strong>2021</strong>
            <span>year founded</span>
          </div>
          <div>
            <strong>$965B</strong>
            <span>valuation, May 2026</span>
          </div>
        </div>
      </section>
      <ul aria-label="Team facts" className="pitch-founder-proof">
        {proof.map(({ icon: ProofIcon, label }) => (
          <li key={label}>
            <ProofIcon aria-hidden="true" />
            <strong>{label}</strong>
          </li>
        ))}
      </ul>
    </div>
    <p className="pitch-founder-source">Sources: anthropic.com/news, Wikipedia (Anthropic)</p>
  </SlideFrame>
);

const compute = [
  {
    horizon: "Google + Broadcom",
    title: "5 GW",
    body: "of next-generation TPU capacity",
    icon: CpuIcon,
  },
  {
    horizon: "Amazon",
    title: "Up to 5 GW",
    body: "of new capacity",
    icon: GlobeIcon,
  },
  {
    horizon: "Microsoft + NVIDIA",
    title: "$30B",
    body: "of Azure compute, up to 1 GW of NVIDIA systems",
    icon: CpuIcon,
  },
];

const Raise: Page = () => (
  <SlideFrame page={10} titleId="raise-title" tone="dark">
    <h2 className="pitch-slide-title" id="raise-title">
      $65B Series H funds the compute that keeps revenue compounding.
    </h2>
    <ol aria-label="Compute commitments" className="pitch-milestones">
      {compute.map(({ body, horizon, icon: ComputeIcon, title }) => (
        <li key={horizon}>
          <span className="pitch-milestone-horizon">{horizon}</span>
          <ComputeIcon aria-hidden="true" />
          <strong>{title}</strong>
          <p>{body}</p>
        </li>
      ))}
    </ol>
    <p className="pitch-source-note" style={{ fontSize: 24 }}>
      The Series H (May 2026) funds the build-out. These deals are the capacity it secures, for training and
      customer inference. Units differ because each partner announced its deal that way. More capacity lets
      revenue keep compounding without rationing access.
    </p>
  </SlideFrame>
);

const Closing: Page = () => (
  <SlideFrame illustration={<LayersIcon />} page={11} showFooter={false} titleId="closing-title" tone="dark">
    <div className="pitch-closing-layout">
      <div className="pitch-closing-brand">
        <span>Anthropic</span>
      </div>
      <h2 className="pitch-closing-title" id="closing-title">
        <span>AI research and products</span>
        <span>that put safety at the frontier.</span>
      </h2>
      <div aria-label="Install Claude Code" className="pitch-closing-command">
        <span aria-hidden="true">$</span>
        <code>curl -fsSL https://claude.ai/install.sh | bash</code>
      </div>
    </div>
  </SlideFrame>
);

export const notes: (string | undefined)[] = [
  `Anthropic builds Claude. This is a demo deck: every number comes from a public source, and the source is in these notes.`,
  `AI now writes code, does research and takes actions. The enterprise question is no longer "can it do the work" but "can we trust it with the work".
Changed after the Oct 20, 2026 call. This answers "what do you mean by control" and "how is reliability different". The slide now names both.
Governance: admins decide who gets access and what data Claude can see, and they get audit logs.
Predictable behaviour: the model behaves the same way in production. It is not about uptime.
Emphasize: control here means governance over access and data, not steering the model.`,
  `Enterprise generative AI spend went from 11.5 billion dollars in 2024 to 37 billion in 2025. Coding alone was 4 billion. Most developers who use AI coding tools use them every day.
Changed after the simulated V2 call, Oct 20, 2026. This answers "is that Anthropic's coding revenue, or the whole market?" and "73 percent of whom?". The labels now say whose figures they are.
Emphasize: these are whole-market figures, not Anthropic's numbers.
Sources: Menlo Ventures, "2025: The State of Generative AI in the Enterprise", Dec 2025. Stack Overflow 2026 Developer Survey, Oct 2026.`,
  `Claude is one model family. Teams reach it through the Claude apps, Claude Code, the API, or their cloud provider. The output is production work: code, analysis and agents.`,
  `Anthropic's own figure: run-rate revenue crossed 47 billion dollars in May 2026. Press reports put it above 65 billion by the end of July.
More than 500 customers spend over a million dollars a year, and 8 of the Fortune 10 are customers. Claude Code alone passed 2.5 billion in run-rate revenue in February.
Sources: Anthropic Series H post, May 2026. Anthropic Series G post, Feb 2026. AI Magazine, Aug 2026.
Changed after the Oct 20, 2026 call. This answers "do you have anything more recent?" and "make the dates obvious". The $65B+ press figure is now on the slide, and a source line dates every figure.
Emphasize: $47B is Anthropic's own number. $65B+ is press reporting from August.
Changed after the simulated V2 call, Oct 20, 2026. This answers "which number should I remember, 47 or 65?". The headline now states the growth, and the big number is the latest figure.
Emphasize: lead with the growth, 47 to 65+ in about two months.
If asked about gross margin (no slide covers it): Anthropic doesn't publish gross margin, so the deck doesn't show one. Say that before anyone asks.
TODO: Claude Code run-rate and $1M+ customer count dated after Feb 2026, from an Anthropic source, so the supporting figures line up with the headline.
TODO: a cited public figure for gross margin or compute cost, or keep the "not published" answer.`,
  `Adoption starts with a developer using Claude Code, spreads to the team, and becomes an enterprise deployment.
Menlo Ventures puts Anthropic at 40% of enterprise LLM API spend and 54% for coding. Menlo is an Anthropic investor, and the slide now says so.
Changed after the Oct 20, 2026 call. This answers "40% of what exactly?", "Isn't Menlo an Anthropic investor?" and "how big is the prize?".
The 40% is a share of enterprise LLM API spend, not total AI spend. The market today is the $37B of enterprise generative AI spend in 2025 from slide 3.
Emphasize: name the Menlo conflict out loud before anyone asks.
Changed after the simulated V2 call, Oct 20, 2026. This answers "what does governed deployments mean, concretely?". The Enterprise step now names the controls: single sign-on, SCIM, audit logs and admin controls (claude.com/max).
TODO: a forward market-size estimate with a named source, if we want more than the 2025 spend figure.`,
  `Three ways to buy: usage-based API, seat subscriptions, and annual enterprise contracts, including through cloud marketplaces.`,
  `The edge is that safety research ships as product. Constitutional AI and the Responsible Scaling Policy make behaviour predictable. Claude Code is the agent most developers pick: 66% in the 2026 Stack Overflow survey. Partnerships with Amazon, Google and Microsoft let customers buy through the cloud they already use.
Changed after the Oct 20, 2026 call. This answers "Why is safety a moat, though?" and "How do you prove predictable behaviour to a buyer?".
Why it's hard to copy: rivals can publish a policy. What they can't copy quickly is the safety research that makes the model predictable in production, which Anthropic has done since 2021. It shows up in the product, for example in how Claude handles ambiguous instructions.
Emphasize: enterprises buy the behaviour, not the policy.
Proof: 8 of the Fortune 10 are customers (slide 5) and Anthropic has the 54% coding share (slide 6). Those buyers ran their own evaluations.
If asked about open-weight models such as Llama, DeepSeek and Mistral (no slide covers them): most enterprises still pay for frontier quality and support.
TODO: a public benchmark or named customer story for predictable behaviour.
TODO: a sourced figure on enterprise use of open-weight models.`,
  `Dario Amodei is co-founder and CEO. Daniela Amodei is co-founder and President. Anthropic was founded in 2021 by former OpenAI employees.`,
  `Series H: 65 billion dollars at a 965 billion post-money valuation, May 2026. Led by Altimeter, Dragoneer, Greenoaks and Sequoia.
The compute behind it: 5 GW of TPU capacity with Google and Broadcom, up to 5 GW with Amazon, and 30 billion of Azure compute with up to 1 GW of NVIDIA systems.
Sources: Anthropic Series H post, May 2026. Microsoft, NVIDIA and Anthropic partnership post, Nov 2025.
Changed after the Oct 20, 2026 call. This answers "I don't follow how these connect" and "what does the compute buy you?".
The raise funds the compute build-out, and the partnerships are the capacity it secures. The units differ because each partner announced its deal that way. The capacity serves both training and customer inference.
Emphasize: capacity is what lets revenue keep compounding without rationing access.
Changed after the simulated V2 call, Oct 20, 2026. This answers "does the 65 billion just flow back to them?" and "what does the rest fund?".
Emphasize: 15 billion of the round is earlier hyperscaler commitments, 5 billion of it from Amazon. Say it before anyone asks.
TODO: what the round funds beyond compute. The call asked, and the deck has no answer yet. Candidate new slide.`,
  `Close on the mission, then the one command to try Claude Code today.`,
];

export default [
  Cover,
  Problem,
  WhyNow,
  Product,
  Traction,
  Market,
  BusinessModel,
  Competition,
  Team,
  Raise,
  Closing,
] satisfies Page[];
