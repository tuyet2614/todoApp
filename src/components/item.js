const Items = (props) => {
    let { currentItems, handleEditTodo, keyDownHandler, DoneTodo, failTodo, handleDelete, DataSave, newContent} = props
    return (
        <>
            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Action</th>
                        <th></th>
                    </tr>

                    {currentItems && currentItems.map((item, index) => (
                        <tr key={item._id} style={{ color: item.color }}>
                            <td>{item._id}</td>
                            <td onClick={(e) => handleEditTodo(item, e)} className="description" onBlur={(e) => DataSave(e, item)}>
                                {item.description
                                    ? item.description : <input type="text" defaultValue={newContent.description} onKeyDown={(e) => keyDownHandler(e, item)} ></input>}

                            </td>
                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => DoneTodo(item)}>v</button>
                                <button onClick={() => failTodo(item)}>x</button>
                            </td>
                            <td><button onClick={() => handleDelete(item)}>Delete</button></td>
                        </tr>


                    ))}


                </table>
            </div>

        </>
    );
}

export default Items