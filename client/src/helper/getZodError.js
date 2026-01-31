
export const getZodError = (errors) => {
    const newError = {}
    if (!errors || !Array.isArray(errors)) {
        return newError;
    }
    errors.forEach(err => {
        newError[err.path[0]] = err.message
    });
    return newError
}