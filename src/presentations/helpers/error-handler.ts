import { RequestErrorCode } from '../../domain/api/data'

export function ErrorHandler(e: unknown) {
  let content = 'Не удалось выполнить запрос, попробуйте снова'
  const message = (e as Error).message as RequestErrorCode
  switch (message) {
    case 'fail_update_email':
      content = 'При обновление почты произошла ошибка'
      break
    case 'fail_update_password':
      content = 'При обновлении пароля произошла ошибка'
      break
    case 'has already been taken':
      content = 'Вы уже откликались на данную вакансию с этим резюме'
      break
    case 'unauthorized':
      content = 'Нужно авторизоваться'
      break
  }
  return content
}
