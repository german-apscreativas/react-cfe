export const typeStatus = (status) => {
    switch (status) {
      case 'NO_ATENDIDO':
        return 'No atendido'
      case 'ATENDIDO':
        return 'Atendido'
      case 'EN_PROGRESO':
        return 'En progreso'
      case 'FINALIZADO':
        return 'Finalizado'
      case 'CERRADO':
        return 'Cerrado'
      default:
        return 'No atendido'
    }
  }