import {
  isTimeValid, isCurrentDateWithTimeBeforeNow, isTimeAndDateBeforeNow, splitTime,
} from '../time';

describe('time.js', () => {
  it('should validate correct times', () => {
    const result = isTimeValid('08', '30');
    expect(result).toEqual(true);
  });

  it('should not validate incorrect times', () => {
    const result = isTimeValid('08', '70');
    expect(result).toEqual(false);
  });

  it('should return true if the time is in the past but the date is current', () => {
    const testDate = new Date();
    const result = isCurrentDateWithTimeBeforeNow(testDate.getFullYear(), testDate.getMonth() + 1, testDate.getDate(), testDate.getHours(), testDate.getMinutes() - 5);
    expect(result).toEqual(true);
  });

  it('should validate times before the current time', () => {
    const testDate = new Date();
    const minutes = testDate.getMinutes() - 5;
    const monthOffset = testDate.getMonth() + 1;
    const result = isTimeAndDateBeforeNow(testDate.getFullYear(), monthOffset, testDate.getDate(), testDate.getHours(), minutes);
    expect(result).toEqual(true);
  });

  it('should not validate times after the current time', () => {
    const testDate = new Date();
    const minutes = testDate.getMinutes() + 5;
    const monthOffset = testDate.getMonth() + 1;
    const result = isTimeAndDateBeforeNow(testDate.getFullYear(), monthOffset, testDate.getDate(), testDate.getHours(), minutes);
    expect(result).toEqual(false);
  });

  it('should split the time by colon', () => {
    const fieldName = 'test';
    const result = splitTime('10:30', fieldName);
    expect(result).toEqual({ testHour: '10', testMinute: '30' });
  });
});
