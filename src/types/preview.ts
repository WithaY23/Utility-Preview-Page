export type BackgroundConfig =
  | { backgroundType: 'image'; backgroundImage: string }
  | { backgroundType: 'color'; backgroundColor: string }
  | { backgroundType: 'default' };// Neither is provided, falls back to gray shell / #6C757D
 type BasePreview = {
  id: string
  title: string
  description: string
  href: string
  // /** Optional site screenshot or art. Falls back to the gray shell. */
  // backgroundImage?: string
  // /** Optional shell tint. Falls back to Figma F1.1 (#6C757D). */
  // backgroundColor?: string
  // backgroundSetting: BackgroundConfig
  /** description box background color. Falls back to #6C757D. */
  descriptionBgColor: string
}
export type Preview = BasePreview & BackgroundConfig

export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;