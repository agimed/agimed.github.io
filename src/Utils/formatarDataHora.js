export function formatarDataHora(dataHora) {
  try {
    const [data, hora] = dataHora.split('T')
    const dataFormatada = data.split('-').reverse().join('/')
    const horaFormatada = hora.split('.')[0]
  
    return `${dataFormatada} ${horaFormatada}`
  } catch (error) {
    return String(dataHora)
  }
}