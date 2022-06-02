export const VALIDATE_EMAIL_REGEX = /\S+@\S+\.\S+/;

// MESSAGES
export const EMAIL_NOT_VALID = "El campo email no es válido"
export const fieldMessageRequired = (field: string) => `El campo ${field} es requerido`;

export const trapSpacesForRequiredFields = (value: string) => !!value.trim() || 'El formato no es válido'