const AddTodo = (props) => {
    let { handleOnclick, handleOnChange } = props
    return (
        <div className="addForm">
            <form onSubmit={() => handleOnclick()}>
                <input type="text" placeholder="Enter your content" onChange={(e) => handleOnChange(e)}></input>
                <button className="addTodo">Save</button>
            </form>

        </div>
    )
}

export default AddTodo