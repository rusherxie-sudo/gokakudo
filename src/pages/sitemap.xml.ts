import type { APIRoute } from "astro";
import { predictionQuestions } from "../data/questions";
import { otsu4Questions } from "../data/otsu4-questions";
import { trustDocuments } from "../data/trust";
import { CONTENT_UPDATED_AT, SITE_URL } from "../data/site";

const staticPaths = ["/", "/exams/", "/exams/eisei-kanrisha/", "/exams/eisei-kanrisha/questions/", "/exams/kikenbutsu-otsu4/", "/exams/kikenbutsu-otsu4/questions/", "/trust/", ...trustDocuments.map((document) => `/trust/${document.slug}/`)];

export const GET: APIRoute = () => {
  const paths = [...staticPaths, ...predictionQuestions.map((question) => `/exams/eisei-kanrisha/questions/${question.id}/`), ...otsu4Questions.map((question) => `/exams/kikenbutsu-otsu4/questions/${question.id}/`)];
  const urls = paths.map((path) => `<url><loc>${SITE_URL}${path}</loc><lastmod>${CONTENT_UPDATED_AT}</lastmod></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
};
