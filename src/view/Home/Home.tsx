
function Home() {
  const test = 'Hello World!'

  // useEffect(() => {
  //   initLumit();
  // }, []);

  // const initLumit = async () => {
  //   const monitors = await lumi.monitors();
  //   console.log(monitors);
  // }

  return (
    <div>
      <h1>Home</h1>
      <p>{test}</p>
    </div>
  )
}

export default Home
