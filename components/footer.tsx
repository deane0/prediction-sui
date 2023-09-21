import Link from 'next/link'
import { GithubIcon, TwitterIcon } from 'lucide-react'

import { buttonVariants } from './ui/button'

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="container flex flex-col justify-center space-y-2 md:space-y-0 md:flex-row-reverse md:justify-between items-center py-6">
        <div className="space-x-2">
          <Link
            href="#"
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            <TwitterIcon className="w-4 h-4" />
          </Link>

          <Link
            href="#"
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            <GithubIcon className="w-4 h-4" />
          </Link>
        </div>
        <p className="text-sm">© 2023 Sui Prediction</p>
      </div>
    </footer>
  )
}
