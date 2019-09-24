// from https://github.com/Microsoft/TypeScript/blob/master/src/lib/dom.generated.d.ts#L12209-L12223
// added manually so we don't have to import typescript's dom typings
export interface URL {
  hash: string
  host: string
  hostname: string
  href: string
  readonly origin: string
  password: string
  pathname: string
  port: string
  protocol: string
  search: string
  username: string
  readonly searchParams: any
  toString(): string
}
