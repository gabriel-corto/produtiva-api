import { nanoid } from 'nanoid'
const id = nanoid(4)

function normalize(name: string) {
  return name
    .normalize('NFD') // separa letras e acentos
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/\s+/g, '-') // espaços viram hífen
    .replace(/[^a-zA-Z0-9\-]/g, '') // remove caracteres especiais
    .toLowerCase()
}

export function generateSlug(name: string) {
  const slug = `${normalize(name)}-${id}`

  return slug
}
