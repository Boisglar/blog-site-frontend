export function getRandomComments<T>(array: T[]): T[] {
  const result = [];
  const length = array.length;

  const randomIndex1 = Math.floor(Math.random() * length);
  const randomIndex2 = Math.floor(Math.random() * length);
  const randomIndex3 = Math.floor(Math.random() * length);

  result.push(array[randomIndex1]);
  result.push(array[randomIndex2]);
  result.push(array[randomIndex3]);

  return result;
}
