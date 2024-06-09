export function ErrorHandler(e: unknown) {
  let content = 'Не удалось выполнить запрос, попробуйте снова'
  if ((e as Error).message === 'Unauthorized') {
    content = 'Нужно авторизоваться'
  }
  if ((e as Error).message === 'has already been taken') {
    content = 'Вы уже откликались на данную вакансию с этим резюме'
  }
  return content
}
