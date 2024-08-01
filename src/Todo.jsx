import React, { useEffect, useState } from "react";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import "./Main.css";

function Todo() {
  const [inputTxt, setInput] = useState('');
  const [searchTxt, setSearchTxt] = useState('');
  const localStore = () => {
    let storage = localStorage.getItem('todo');
    if (storage) {
      return JSON.parse(localStorage.getItem('todo'));
    }
    return [];
  }

  const [listData, setList] = useState(localStore());
  const [editIndex, setEditIndex] = useState(null);
  const [editTxt, setEditTxt] = useState('');

  function addActivity() {
    setList([...listData, { text: inputTxt, done: false }]);
    setInput('');
  }

  function deleteData() {
    setList([]);
  }

  function deleteSingle(index) {
    const newList = [...listData];
    newList.splice(index, 1);
    setList(newList);
  }

  function editItem(index) {
    setEditIndex(index);
    setEditTxt(listData[index].text);
  }

  function saveEdit(index) {
    const newList = [...listData];
    newList[index].text = editTxt;
    setList(newList);
    setEditIndex(null);
    setEditTxt('');
  }

  function markDone(index) {
    const newList = [...listData];
    newList[index].done = !newList[index].done;
    setList(newList);
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(listData));
  }, [listData]);

  const filteredList = listData.filter(item =>
    item.text.toLowerCase().includes(searchTxt.toLowerCase())
  );

  return (
    <div className="input_cont">
      <h1>MY TODO</h1><br />
      <input
        type="text"
        className="input_todo"
        placeholder="Enter your todo"
        value={inputTxt}
        onChange={e => {
          setInput(e.target.value);
        }}
        required
      />
      {inputTxt.length >= 1 && <button className="btn" onClick={addActivity}><AddToPhotosOutlinedIcon /></button>}
      <input
        type="text"
        className="input_search"
        placeholder="Search todos"
        value={searchTxt}
        onChange={e => setSearchTxt(e.target.value)}
      />
      <p className="list">List heading</p>
      {filteredList.map((data, j) => (
        <div className={`main ${data.done ? 'done' : ''}`} key={j}>
          {editIndex === j ? (
            <>
              <input
                type="text"
                value={editTxt}
                onChange={e => setEditTxt(e.target.value)}
              />
              <button className="save" onClick={() => saveEdit(j)}><SaveIcon /></button>
            </>
          ) : (
            <>
              <div className="data">
                {data.text}
              </div>
              <button className="done-btn" onClick={() => markDone(j)}><CheckIcon /></button>
              <button className="edit" onClick={() => editItem(j)}><EditIcon /></button>
              <button className="delete" onClick={() => deleteSingle(j)}><AutoDeleteIcon /></button>
            </>
          )}
        </div>
      ))}
      <br />
      {listData.length >= 1 && <button onClick={deleteData} className="hello">Delete ALL</button>}
    </div>
  )
}

export default Todo;
