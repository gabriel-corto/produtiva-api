function normalizeString(str: string) {
  return str
    .normalize('NFD') // separa os acentos
    .replace(/[\u0300-\u036f]/g, '') // remove os acentos
    .replace(/\s+/g, '') // remove espaços
    .toLowerCase() // deixa tudo minúsculo
}

export { normalizeString }
