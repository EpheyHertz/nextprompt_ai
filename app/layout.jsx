

import '@styles/global.css';
import Nav from '@components/nav';
import Provider from '@components/provider'
export const metadata = {
    title:"PromptAI",
    description:'Discover $ Share AI prompts'
}
const RootLayout = ({children}) => {
  return (
    <html lan="en">
        <body>
            <Provider>
            <div className='main'>
                <div className='gradient'/>

            </div>
            <main className='app'>
                <Nav/>
                {children}
            </main>
            </Provider>
        </body>

    </html>
  )
}

export default RootLayout