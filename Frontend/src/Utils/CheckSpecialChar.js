export function isValidUsername(value) {
    console.log(value)
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/g;
    return !specialCharPattern.test(value);
}