import "./noPage.css"

function NoPage() {
  return (
    <section className='notFound'>
        <h1>404 - Error</h1>
        <h4>The requested URL was not found on this server.</h4>
        <img src="/images/not-found.png" alt="404 Not Found" />
    </section>
  )
}

export default NoPage