import "./write.css"

export default function Write() {
    return (
        <section className="write">
            <form>
                <div className="imageContainer">
                    <img src="/images/mountain.jpg" alt="Uploaded" />
                </div>

                <div className="formItems">
                    <div className="formTop">
                        <label htmlFor="fileInput">
                            <span className="imageButton">Add Image</span>
                        </label>
                        <input type="file" name="fileInput" id="fileInput" hidden />
                        <input className="writeTitle" type="text" placeholder="Title" autoFocus={true} />
                        <input type="submit" value="Publish" className="imageButton publishButton" />
                    </div>
                    <textarea rows="9" placeholder="Tell your story..."></textarea>
                </div>
            </form>
        </section>
    )
}
