import Feed from "@components/feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Discover $ Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptAI is an open-source AI prompting tool Developed by
        Ephey Hertz for modern world to discover and share 
        the best AI Prompts.
      </p>
      {/* feeds */}
      <Feed/>


    </section>
 
  )
}

export default Home