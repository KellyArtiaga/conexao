

export default function chassiValidator(control): { [key: string]: boolean } | null {
  if (!control.value) {
    return {"InvalidValue": true}
  }
  if (control.value.length != 17) {
    return {"InvalidLength": true};
  }
  if (control.value.match(/[^A-Na-nP-Zp-z0-9]/)) {
    return {"InvalidChars": true}
  }

  return null;
}