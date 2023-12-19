export default function Modal({myModalRef, message, handleDelete}) {

  return (
    <>
    <button hidden ref={myModalRef} data-bs-toggle="modal" data-bs-target="#formModal"></button>

    <div className="modal fade" data-bs-backdrop="static" id="formModal" tabIndex="-1" aria-labelledby="formModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content text-light" style={{backgroundColor: "black"}}>

                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="formModalLabel">Confirmation</h1>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    {message}
                </div>

                <div className="modal-footer">
                    <button type="button" onClick={handleDelete} className="btn btn-danger" data-bs-dismiss="modal">YES</button>

                    <button type="button" className="btn btn-success" data-bs-dismiss="modal">NO</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
