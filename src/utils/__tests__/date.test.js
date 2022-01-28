import {
  formatDate, formatUIDate, isDateValid, isInThePast, splitDate,
} from '../date';

describe('date.js', () => {
  it('should format date', () => {
    const result = formatDate('2022', '01', '01');
    expect(result).toEqual('2022-1-1');
  });

  it('should format UI date', () => {
    const result = formatUIDate('2022-1-1');
    expect(result).toEqual('01/01/2022');
  });

  it('should not validate incorrect dates', () => {
    const result = isDateValid('2022', '13', '01');
    expect(result).toEqual(false);
  });

  it('should validate correct dates', () => {
    const result = isDateValid('2022', '01', '01');
    expect(result).toEqual(true);
  });

  it('should not validate dates in the future', () => {
    const result = isInThePast('3000', '01', '01');
    expect(result).toEqual(false);
  });

  it('should validate dates in the past', () => {
    const result = isInThePast('2000', '01', '01');
    expect(result).toEqual(true);
  });

  it('should split dates by dash', () => {
    const fieldName = 'test';
    const result = splitDate('2022-1-1', fieldName);
    expect(result).toEqual({ testYear: '2022', testMonth: '1', testDay: '1' });
  });
});
