import slugify from 'slugify';

export function getBookSlug(title, id) {
  return slugify(`${title} ${id}`, { lower: true, strict: true });
}

export function getBookIdFromSlug(slug) {
  return slug.match(/[a-z0-9]+$/)?.[0] ?? '';
}
