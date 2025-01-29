import {useState, useEffect} from "react"

// icons
import {FaRegTrashCan} from "react-icons/fa6"
import {FaPlus} from "react-icons/fa"

const App = () => {
    const [inputValue, setInputValue] = useState("")
    const [items, setItems] = useState([])
    const [error, setError] = useState("")
    const [editingIndex, setEditingIndex] = useState(null) 
    const [editText, setEditText] = useState("") 


    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("todo"))
        if (storedItems) {
            setItems(storedItems)
        }
    }, [setItems])

    const handleAddItem = (e) => {
        e.preventDefault()
        if (inputValue.trim() === "") {
            setError("*Please add something")
            return
        }

        const newItems = [...items, inputValue]
        setItems(newItems)
        localStorage.setItem("todo", JSON.stringify(newItems))
        setInputValue("")
        setError("")
    }

    const handleRemoveItem = (idx) => {
        const filterData = items.filter((_, i) => i !== idx)
        setItems(filterData)
        localStorage.setItem("todo", JSON.stringify(filterData))
    }

    const handleEditItem = (idx) => {
        setEditingIndex(idx)
        setEditText(items[idx])
    }

    const handleSaveEdit = (idx) => {
        const updatedItems = [...items]
        updatedItems[idx] = editText
        setItems(updatedItems)
        localStorage.setItem("todo", JSON.stringify(updatedItems))
        setEditingIndex(null)
        setEditText("") 
    }

    return (
        <div className="container2 m-auto bg-[#0d0714]">
            <div className="flex justify-center items-center w-full h-[100vh]">
                <div className="w-[700px] max-[800px]:w-[600px] flex flex-col gap-[30px]">
                    {/* form */}
                    <form
                        onSubmit={handleAddItem}
                        className="form relative flex w-full justify-between items-center gap-[10px] h-[50px]">
                        {error && (
                            <p className="error absolute top-[-20px] left-[10px] text-[#d15151] bg-[#0d0714] p-[5px]">
                                {error}
                            </p>
                        )}
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="addTextInput border border-[#fff] outline-none w-full h-full text-[#fff] rounded-md bg-transparent p-[10px]"
                            maxLength="55"
                        />
                        <button
                            type="submit"
                            className="cursor-pointer h-[50px] w-[50px] active:scale-[.96] text-[#fff] flex justify-center items-center rounded-md bg-[#9e78cf]">
                            <FaPlus />
                        </button>
                    </form>

                    {/* list */}
                    <div className="flex flex-col overflow-y-auto h-[330px] gap-[10px] pr-2 pt-2">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-[10px] bg-[#15101c] text-[#9e78cf] rounded-md border border-[#ffffff34]">
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) =>
                                            setEditText(e.target.value)
                                        }
                                        className="editInput border-b border-[#fff] outline-none w-[85%] text-[#fff] bg-transparent "
                                    />
                                ) : (
                                    <span>{item}</span>
                                )}
                                <div className="flex gap-[10px]">
                                    {editingIndex === index ? (
                                        <button
                                            onClick={() =>
                                                handleSaveEdit(index)
                                            }
                                            className="text-green-400 cursor-pointer text-[22px]">
                                            save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                handleEditItem(index)
                                            }
                                            className="text-blue-400 cursor-pointer text-[22px]">
                                            edit
                                        </button>
                                    )}
                                    <button
                                        className="text-red-400 cursor-pointer text-[22px]"
                                        onClick={() => handleRemoveItem(index)}>
                                        <FaRegTrashCan />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
