function formSubmitCheck(answer) {
  console.log(Object.values(answer))
  Object.values(answer).forEach(value => {
    if (value === '') {
      return false
    }
  })
  return true
}

module.exports = formSubmitCheck