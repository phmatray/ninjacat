export interface NinjacatPatchingPatchOptions {
  /* String to be inserted */
  insert?: string
  /* Insert before this string */
  before?: string | RegExp
  /* Insert after this string */
  after?: string | RegExp
  /* Replace this string */
  replace?: string | RegExp
  /* Delete this string */
  delete?: string | RegExp
  /* Write even if it already exists  */
  force?: boolean
}
