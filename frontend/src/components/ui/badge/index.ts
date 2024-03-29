import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        red: 'border-transparent bg-red-500 text-primary-foreground hover:bg-red-400',
        yellow: 'border-transparent bg-yellow-500 text-primary-foreground hover:bg-yellow-400',
        green: 'border-transparent bg-green-500 text-primary-foreground hover:bg-green-400',
        blue: 'border-transparent bg-blue-500 text-primary-foreground hover:bg-blue-400',
        purple: 'border-transparent bg-purple-500 text-primary-foreground hover:bg-purple-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
