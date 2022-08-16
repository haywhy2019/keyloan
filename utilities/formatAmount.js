export const formattedAmount = (amount) => {
 const formatAmount =  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount)

  return formatAmount

}