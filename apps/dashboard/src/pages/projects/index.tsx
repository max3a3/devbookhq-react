import { withPageAuth } from '@supabase/supabase-auth-helpers/nextjs'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { LayoutGrid } from 'lucide-react'
import { useEffect } from 'react'

import ItemList from 'components/ItemList'
import Feedback from 'components/Feedback'
import SpinnerIcon from 'components/icons/Spinner'
import Text from 'components/typography/Text'

import useApps from 'hooks/useApps'

import { showErrorNotif } from 'utils/notification'

export const getServerSideProps = withPageAuth({
  redirectTo: '/signin',
})

function Projects() {
  const { user } = useUser()
  const { apps, isLoading, error: csError } = useApps(user?.id || '')

  useEffect(
    function checkAppError() {
      if (!csError) return
      showErrorNotif(`Error retrieving apps: ${csError}`)
    },
    [csError],
  )

  return (
    <>
      <div className="fixed left-4 bottom-4">
        <Feedback />
      </div>
      <div
        className="
      flex
      flex-1
      flex-col
      space-x-0
      overflow-hidden
      p-12
      md:flex-row
      md:space-y-0
      md:p-16
    "
      >
        <div className="flex items-start justify-start">
          <div className="items-center flex space-x-2">
            <LayoutGrid size="30px" strokeWidth="1.5" />
            <Text
              size={Text.size.S1}
              text="Projects"
            />
          </div>
        </div>

        <div
          className="
        flex
        flex-1
        flex-col
        items-stretch
        overflow-hidden
        "
        >
          {isLoading && (
            <div
              className="
            flex
            flex-1
            items-center
            justify-center
          "
            >
              <SpinnerIcon className="text-slate-400" />
            </div>
          )}

          {!isLoading && (
            <div className="flex flex-1 justify-center overflow-hidden">
              <ItemList
                items={apps.map(i => ({
                  ...i,
                  path: '/projects/[slug]',
                  type: 'Project',
                  icon: <LayoutGrid size="22px" strokeWidth="1.7" />,
                }))}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Projects
