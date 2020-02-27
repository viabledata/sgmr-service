const sum = (a, b) => {
  return a + b;
};

test('sum function', () => {
  expect(sum(1, 3)).toBe(4);
});
