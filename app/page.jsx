import Image from 'next/image';
const Home = () => {
  return (
    <section className="mt-12  w-full flex-center flex-col">
        <h1 className="main_heading text-center">
            KarelWorlds
            <br className="max-md:hidden" />
        </h1>
        <h2 className="sub_heading blue_purple_gradient text-center"> Create & Share Karel Puzzles</h2>
        <p className="description text-center">
            KarelWorlds is a platform for learning programming and computer science.
        </p>
        {/* TODO: Add the iframe for the KarelWorlds demo video*/}
        <div className="flex justify-center my-4">
          <a target="_blank" href="https://www.loom.com/share/9ffec75b168b44008ce85c833f50a8a9">
            <Image src="https://cdn.loom.com/sessions/thumbnails/9ffec75b168b44008ce85c833f50a8a9-1714352642717-with-play.gif" alt="KarelWorlds Demo" width={400} height={400} />
          </a>
        </div>


    </section>
  )
}

export default Home;