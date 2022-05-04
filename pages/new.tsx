import Link from 'next/link'
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs'

import Title from 'components/typography/Title'
import Text from 'components/typography/Text'
import CodeEditor from 'components/CodeEditor'

export const getServerSideProps = withAuthRequired({ redirectTo: '/signin' })
function New() {
  return (
    <>
      {/* Fake breadcrumbs */}
      <div className="
        flex-1
        flex
        flex-col
        space-y-6
      ">
        <div className="
          flex
          items-center
          space-x-2
          min-h-[48px]
        ">
          <Link href="/">
            <a className="
              hover:no-underline
            ">
              <Title
                className="
                  hover:text-white-900
                "
                rank={Title.rank.Secondary}
              >
                Code Snippets
              </Title>
            </a>
          </Link>
          <Title>/</Title>
          <Title>New</Title>
        </div>

        <div className="
          flex-1
          flex
          flex-col
          space-y-4
        ">
          <div className="
            flex
            flex-row
            items-center
            space-x-4
          ">
            <Text
              text="Code"
            />
            <Text
              text="Design"
            />
            <Text
              text="Environment"
            />
            <Text
              text="Analytics"
            />
          </div>
          <div className="
            flex-1
            relative
            overflow-hidden
            bg-black-800
            border-black-700
            border
            rounded-lg
          ">
            <CodeEditor
              content="const a = 5;"
              className="
                absolute
                inset-0
              "
            />
          </div>
        </div>
      </div>
    </>
  )
}


export default New
