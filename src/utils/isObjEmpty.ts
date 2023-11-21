export default function isObjEmpty<T extends Object>(obj: T): boolean {
  if (Object.keys(obj).length > 0) {
    return false;
  }
  return true;
}
