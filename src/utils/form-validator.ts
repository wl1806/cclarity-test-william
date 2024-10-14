const IsMatchField = (field: string, message?: string) => {
  return ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue(field) === value) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(message || `Your input doesn't match!`))
    }
  })
}

export default { IsMatchField }
