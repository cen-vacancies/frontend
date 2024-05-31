export function ErrorHandler(e: unknown) {
  let content = 'Сохранение не удалось, попробуйте снова'
  if ((e as Error).message === 'Unauthorized') {
    content = 'Нужно авторизоваться'
  }
  return content
}
