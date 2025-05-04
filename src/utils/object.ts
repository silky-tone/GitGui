export function getType(target: any): string {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

export function isType(target: any, types: string): boolean {
  return getType(target) === types.toLowerCase();
}

export function isString(target: any): target is string {
  return isType(target, 'string');
}

export function isNumber(target: any): target is number {
  if (isNaN(target)) return false;
  return isType(target, 'number');
}

export function isArray(target: any): target is Array<any> {
  return Array.isArray(target);
}

export function isObject(target: any): target is Object {
  return isType(target, 'object');
}

export function isEmpty(target: any): boolean {
  if (['', null, undefined].includes(target)) return true;
  return (isArray(target) ? target.length : Object.keys(target).length) === 0;
}

export function deepObject(target: Record<string, any>): Record<string, any> {
  return Object.keys(target).reduce(function(prev: Record<string, any>, key: string) {
    if (isObject(target[key])) {
      prev[key] = deepObject(target[key]);
    } else if (isArray(target[key])) {
      prev[key] = [...target[key]];
    } else {
      prev[key] = target[key];
    }
    return prev;
  }, {});
}

export function mergeObject(target: Record<string, any>, ...options: Record<string, any>[]): Record<string, any> {
  return options.reduce(function(prev, option) {
    if (isEmpty(option)) return prev;
    for (const key of Object.keys(option)) {
      const [t1, t2] = [getType(prev[key]), getType(option[key])];
      if (t2 === 'array') {
        prev[key] = [...option[key]];
      } else if (t1 === t2 && t2 === 'object') {
        prev[key] = mergeObject(prev[key], option[key]);
      } else {
        prev[key] = option[key];
      }
    }
    return prev;
  }, target);
}
