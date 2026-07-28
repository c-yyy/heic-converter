// Single source of truth for the "Convert Tools" navigation links.
// Both the Header and the Footer consume this list, so the top and bottom
// navigation can never drift out of sync again.
//
// `key` points at the `footer` i18n namespace (the same labels the footer
// already uses), guaranteeing identical wording in both places.
export const TOOL_LINKS = [
  { href: '/heic-to-jpg', key: 'heicToJpg' },
  { href: '/heic-to-png', key: 'heicToPng' },
  { href: '/heic-to-webp', key: 'heicToWebp' },
  { href: '/heic-to-pdf', key: 'heicToPdf' },
] as const;

export type ToolLink = (typeof TOOL_LINKS)[number];
