import { HeartIcon } from '@heroicons/react/24/outline'

export function Footer() {
  return (
    <div className="min-h-0 px-1 py-5 mb-11 lg:mb-0">
      <div className="w-full">
        <ul className="w-full menu menu-horizontal">
          <div className="flex items-center justify-center w-full gap-2 text-sm">
            <div className="flex items-center justify-center gap-2">
              <p className="m-0 text-center">
                Powered by Wolfcito <HeartIcon className="inline-block w-4 h-4" />
              </p>
            </div>
          </div>
        </ul>
      </div>
    </div>
  )
}
