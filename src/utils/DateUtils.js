export default class DateUtils {
  static monthDay(date) {
    const diaInit = date.substring(0, 2);
    const mesInit = date.substring(3, 5);
    let value = '';
    value = `${diaInit} de ${this.mesString(mesInit)}`;
    return value;
  }

  static mesString(value) {
    switch (value) {
      case '01':
        return 'Janeiro';
      case '02':
        return 'Fevereiro';
      case '03':
        return 'Março';
      case '04':
        return 'Abril';
      case '05':
        return 'Maio';
      case '06':
        return 'Junho';
      case '07':
        return 'Julho';
      case '08':
        return 'Agosto';
      case '09':
        return 'Setembro';
      case '10':
        return 'Outubro';
      case '11':
        return 'Novembro';
      case '12':
        return 'Dezembro';
      default:
        return '';
    }
  }
}
