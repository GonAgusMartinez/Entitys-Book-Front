// Validación para el email de formato Gmail
export function validateEmail(email: string): boolean {
  const emailRegex = /@gmail\.com$/;
  return emailRegex.test(email) && email.length >= 5;
}

// Validación para la contraseña
export function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,20}$/;
  return passwordRegex.test(password);
}

// Validación para el nombre de usuario
export function validateUsername(username: string): boolean {
  return username.length >= 3 && username.length <= 20;
}

// Validación para el formato de la imagen
export function validateProfilePicture(file: File | null): boolean {
  if (!file) return false;
  return ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
}
