import { injectable } from 'inversify'

@injectable()
export class Utils {
  head<T>(a: T[]): T {
    return a[0]
  }

  tail<T>(a: T[]): T[] {
    return a.slice(1)
  }

  identity(a: any): any {
    return a
  }

  isNil(a: any): boolean {
    return a === null || a === undefined
  }

  split(b: string, a: string): string[] {
    return a.split(b)
  }

  trim(a: string): string {
    return a.trim()
  }

  forEach<T>(f: (i: T) => void, a: T[]): void {
    return a.forEach(f)
  }

  keys(a: Record<string, any>): string[] {
    return Object(a) !== a ? [] : Object.keys(a)
  }

  replace(b: string | RegExp, c: string, a: string): string {
    return a.replace(b, c)
  }

  last<T>(a: T[]): T {
    return a[a.length - 1]
  }

  reject<T>(f: (i: T) => boolean, a: T[]): T[] {
    return a.filter(b => !f(b))
  }

  is(Ctor: any, val: any): boolean {
    return (val != null && val.constructor === Ctor) || val instanceof Ctor
  }

  takeLast<T>(n: number, a: T[]): T[] {
    return a.slice(-1 * n)
  }

  equals(a: string[], b: string[]): boolean {
    return a.length === b.length && a.every((v, i) => v === b[i])
  }

  times(fn: Function, n: number): any[] {
    const list = new Array(n)
    for (let i = 0; i < n; i++) {
      list[i] = fn(i)
    }
    return list
  }

  prop(p: string, obj: { [key: string]: any }): any {
    return obj[p]
  }
}
