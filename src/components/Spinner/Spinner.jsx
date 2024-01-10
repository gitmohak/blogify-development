import "./spinner.css"

function Spinner() {
    return (
        <div className="spinner-border my-spinner" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner