import { useEffect, useState } from "react";
import './listTodo.css'
import AddTodo from "./addTodo";
import axios from "axios";
import Items from "./item";
import ReactPaginate from 'react-paginate';

const itemsPerPage = 9;

const ListTodo = (props) => {

    
    const [isShow, setIsShow] = useState(false)
    const handleOnShow = () => setIsShow(true)
    const token = localStorage.getItem('token')
    const [todoList, setTodoList] = useState([])
    const [newContent, setNewContent] = useState()
    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0)
    const [slice, setSlice] = useState(null)

    const handleOnChange = (e) => {

        setNewContent(e.target.value)
        console.log(e.target.value)


    }


    const handleOnclick = () => {
        


        axios.post(`https://api-nodejs-todolist.herokuapp.com/task`, {
            "description": newContent
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                showData()
            })
            .catch(error => console.log(error));

        setIsShow(false)
    }

    const showData = async () => {
       
        axios.get(`https://api-nodejs-todolist.herokuapp.com/task`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                setTodoList(res.data.data)
                setSlice(todoList.slice(offset , offset + itemsPerPage))
                 
                 setPageCount(Math.ceil(todoList.length / itemsPerPage))
                console.log(res);
                console.log(res.data);

            })
            .catch(error => console.log(error));

    }

    const handlePageClick = (event) => {
        const selectedPage = (event.selected * itemsPerPage) % todoList.length;
        setOffset(selectedPage)
    };
    

    const handleDelete = (todo) => {
        console.log(todo._id)
        
        axios.delete(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                showData()
            })
            .catch(error => console.log(error));
    }
    const keyDownHandler = (event, todo) => {
       
        if (event.key === 'Enter') {
            axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
                "description": event.target.value
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {

                    showData()
                })
                .catch(error => console.log(error));

        }
    }

    const DataSave = (event, todo) => {
       
        axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
            "description": event.target.value
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                // showData()
            })
            .catch(error => console.log(error));


    }

    const handleEditTodo = (todo, e) => {

        setNewContent(todo)
        const TodoItem = todoList.find(item => item._id === todo._id)

        setTodoList(
            todoList.map(item => item._id === todo._id ? { ...TodoItem, description: '' } : item)

        )
        


    }

    const DoneTodo = (todo) => {
        axios.put(`https://api-nodejs-todolist.herokuapp.com/task/${todo._id}`, {
            "completed": true
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                // showData()
            })
            .catch(error => console.log(error));



    }

    const failTodo = (todo) => {
        let todoChange = todoList.find((item) => item._id === todo._id)
        setTodoList(
            todoList.map((item) => item._id === todo._id ? { ...todoChange, color: "red" } : item))
        

    }


    useEffect(() => {
        showData()
    }, [offset])

    



//     const PaginatedItems = () => {
//         // We start with an empty list of items.

//         const [currentItems, setCurrentItems] = useState(null);
//         const [pageCount, setPageCount] = useState(0);

//         // Here we use item offsets; we could also use page offsets
//         // following the API or data you're working with.
//         const [itemOffset, setItemOffset] = useState(0);

//     //      useEffect(() => {
//     // // Fetch items from another resources.
//     //         const endOffset = itemOffset + itemsPerPage;
//     //         console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     //         setCurrentItems(todoList.slice(itemOffset, endOffset));
//     //         setPageCount(Math.ceil(todoList.length / itemsPerPage));
           
            
            
//     //     }, [check]);
//     useEffect(() => {
//    getAllPosts()
//  }, [offset])

//         // Invoke when user click to request another page.
//         const handlePageClick = (event) => {
//             const newOffset = (event.selected * itemsPerPage) % todoList.length;
//             console.log(
//                 `User requested page number ${event.selected}, which is offset ${newOffset}`
//             );
//             setItemOffset(newOffset);
//         };

//         return (
//             <>
//                 <Items currentItems={currentItems}
//                     handleEditTodo={handleEditTodo}
//                     keyDownHandler={keyDownHandler}
//                     DoneTodo={DoneTodo}
//                     failTodo={failTodo}
//                     handleDelete={handleDelete}
//                     DataSave={DataSave}
//                     newContent={newContent}
//                     todoList={todoList}
//                 />

//                 <ReactPaginate
//                     previousLabel={"← Previous"}
//                     nextLabel={"Next →"}
//                     pageCount={pageCount}
//                     onPageChange={handlePageClick}
//                     containerClassName={"pagination"}
//                     previousLinkClassName={"pagination__link"}
//                     nextLinkClassName={"pagination__link"}
//                     disabledClassName={"pagination__link--disabled"}
//                     activeClassName={"pagination__link--active"}
//                 />
//             </>
//         );
//     }

    return (
        <div className="mainList">
            <div className="add_button">


                {isShow ? <AddTodo
                    handleOnclick={handleOnclick}
                    handleOnChange={handleOnChange}

                /> :
                    <button onClick={() => handleOnShow()} className="addTodo">create</button>}
            </div>
            <div className="list_todo">
                
                <Items currentItems={slice}
                    handleEditTodo={handleEditTodo}
                    keyDownHandler={keyDownHandler}
                    DoneTodo={DoneTodo}
                    failTodo={failTodo}
                    handleDelete={handleDelete}
                    DataSave={DataSave}
                    newContent={newContent}
                    todoList={todoList}
                />

                 <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                />
                
            </div>


        </div >
    )

}

export default ListTodo