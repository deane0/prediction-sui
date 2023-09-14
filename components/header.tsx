import Link from 'next/link'

import { ConnectWallet } from './connect-wallet'
import { RefreshButton } from './refresh-button'
import { Claim } from './claim'

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex justify-between items-center px-6 md:px-8 h-24">
        <div>
          <Link href="/" className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="12.199999809265137 12.199999809265137 75.69999694824219 75.5999984741211"
              className="w-7 h-7"
            >
              <g fill="#2f84f4">
                <path d="M19.4 63.1H25c.3 0 .5-.2.5-.5V31.7c0-3.4 2.8-6.2 6.2-6.2h30.9c.3 0 .5-.2.5-.5v-5.6c0-4-3.2-7.2-7.2-7.2H19.4c-4 0-7.2 3.2-7.2 7.2V56c0 3.9 3.2 7.1 7.2 7.1zM36.9 75v5.6c0 4 3.2 7.2 7.2 7.2h36.6c4 0 7.2-3.2 7.2-7.2V44c0-4-3.2-7.2-7.2-7.2H75c-.3 0-.5.2-.5.5v30.9c0 3.4-2.8 6.2-6.2 6.2H37.4c-.3.1-.5.3-.5.6z"></path>
                <path d="M37.4 63.1H56c4 0 7.2-3.2 7.2-7.2V37.4c0-.3-.2-.5-.5-.5H44c-4 0-7.2 3.2-7.2 7.2v18.6c.1.2.3.4.6.4z"></path>
              </g>
            </svg>
            <span className="hidden text-xl font-semibold italic ml-2 md:block">
              <span className="text-sky-600">SUI</span>{' '}
              <span className="text-blue-600">Prediction</span>
            </span>
          </Link>
        </div>

        <div className="space-x-2">
          <RefreshButton />
          <Claim />
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
