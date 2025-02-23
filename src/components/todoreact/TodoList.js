import { useState , useEffect } from "react";

  // get the localStorage data back
  const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
  
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };
  

const TodoList = () => {
  const [inputdata , setInputData ] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);


   // add the items fucnction
   const addItem = () => {
    if (!inputdata) {
      alert("plz fill the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );

      setInputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
    //edit the items
    const editItem =  (index) => {
        const item_todo_edited = items.find((curEle) => {
          return curEle.id === index;
        })
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

    //delete the items'
    const deleteItem = (index) => {
        const updateItem = items.filter((curEle) =>{
          return curEle.id !== index;
        });

        setItems(updateItem);
    };

    //removeAll
    const removeALL = () => {
      setItems([]);
    };

      // adding localStorage
    useEffect(() => {
      localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);
  return (
   <>
     <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className='fa fa-edit add-btn' onClick={addItem}></i>       
            ) : (
              <i className='fa fa-plus add-btn' onClick={addItem}></i>   
            )}
               
          </div>
            {/* show our items */}
            <div className='showItems'>

              {
                items.map((curEle) => {

                  return (
                  <div className='eachItem' key={curEle.id}>
                    <h3>{curEle.name}</h3>
                    <div className='todo-btn'>
                        <i className='fa fa-edit add-btn' onClick={() => editItem(curEle.id)}></i>
                        <i className='fa fa-trash-alt add-btn' onClick={() => deleteItem(curEle.id)}></i>            
                    </div>

                </div>
                );
                })}
                
            </div>

          {/* remove all button */}

          <div className='showItems'>
            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeALL}>
            <span>CHECK LIST</span>
            </button>
            </div>
        </div>
      </div>
   </>
  );
};

export default TodoList
