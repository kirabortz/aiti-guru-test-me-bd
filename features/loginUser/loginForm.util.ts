

export const validateLoginForm = (login: string, password: string): {
    login?: string, password?: string
} => {
    const newErrors = {
        login: '',
        password: ''
    };

    if (!login) {
      newErrors.login = 'Нет логина пользователя';
    } else if (login.length < 4) {
      newErrors.login = 'Логин должен быть длиной минимум 4 символа';
    }

    if (!password) {
      newErrors.password = 'Нет пароля';
    } else if (password.length < 4) {
      newErrors.password = 'Пароль должен быть длиной минимум 4 символа';
    }

    return newErrors
}