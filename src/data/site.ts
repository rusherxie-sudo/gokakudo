export const SITE_URL = "https://gokakudo.com";
export const SITE_NAME = "合格堂";
export const SITE_DESCRIPTION = "第一種衛生管理者と危険物乙4を、根拠資料つきの無料問題で学べる資格試験学習サイト。";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const CONTENT_UPDATED_AT = "2026-08-29";

export const absoluteUrl = (path = "/") => new URL(path, `${SITE_URL}/`).toString();

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
