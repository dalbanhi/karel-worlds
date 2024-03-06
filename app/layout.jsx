import '@styles/globals.css';
import Nav from '@/components/Nav';

export const metadata = {
    title: 'KarelWorlds',
    description: 'KarelWorlds is a platform for learning programming and computer science.',
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <style lang="postcss"></style>

        <body>
            
            <main className="app">
                <Nav />
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout;