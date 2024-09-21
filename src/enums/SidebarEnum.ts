import { HomeIcon } from '@heroicons/vue/24/outline'
export default interface ISidebarEnum {
  name: string
  link: string
  icon?: any
}
export const SIDEBAR_ENUM: ISidebarEnum[] = [
  { name: 'Make a call', link: 'call-page', icon: HomeIcon }
]
