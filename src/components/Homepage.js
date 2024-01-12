import "./Homepage.css";

function Homepage() {
    return (
        <div class="homepage-div">
            <div class="homepage-header"> TO-DO LIST </div>
            <div class="add-task-div">
                <button class="add-task-button"> Add Task </button>
            </div>
            <div class="parent-content-box">
                <div class="content-area">
                    <div class="content-text"> Description </div>
                    <div class="content-buttons">
                        <button class="delete-button"> Delete </button>
                        <button class="edit-button"> Edit </button>
                    </div>
                </div>

                {/* below div is for UI testing purpose */}
                <div class="content-area">
                    <div class="content-text">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available. It is also used to temporarily replace text in a process called greeking, which allows designers to consider the form of a webpage or publication, without the meaning of the text influencing the design. </div>
                    <div class="content-buttons">
                        <button class="delete-button"> Delete </button>
                        <button class="edit-button"> Edit </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
