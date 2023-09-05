const formatCurrency = (currency) => {
  const formatted = currency.tolocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL'
  })

  return formatted
}

export {
  formatCurrency
}
