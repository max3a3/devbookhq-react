import BrowserOnly from '@docusaurus/BrowserOnly'

export default () => {
  return (
    <BrowserOnly>
      {() => {
        const DevbookTerminal = require('./DevbookTerminal').default
        return <DevbookTerminal />
      }}
    </BrowserOnly>
  )
}
