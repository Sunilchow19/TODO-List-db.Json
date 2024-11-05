import axios from "axios";
import { useEffect, useState } from "react";

import "./todo.css";

function Todo() {
  let [str, setstr] = useState("");
  let [data, setData] = useState([]);

  function main() {
    axios
      .get("http://localhost:3000/posts", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        setData(val.data);
      });
  }

  useEffect(() => {
    main();
  }, []);

  let rep = (e) => {
    setstr(e.target.value);
  };

  let sub = (e) => {
    e.preventDefault();

    if (!str) {
      alert("Input cannot be empty!");
      return;
    }

    if (data.find((item) => item.title === str)) {
      alert("This item already exists!");
      return;
    }


    let obj = { title: e.target[0].value };

    axios
      .post("http://localhost:3000/posts", obj, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => main());

    setstr(""); 
  };

  let replace = (val) => {
    console.log(val);

    let obj = {
      title: prompt(`Edit ${val.title}`),
    };

   
    axios
      .patch("http://localhost:3000/posts/" + val.id, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        console.log(val);
        main();
      });
  };

  let del = (val) => {
    axios
      .delete("http://localhost:3000/posts/" + val.id, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        console.log(val);

        main();
      });
  };

  let res = data.map((val, ind) => {
    return (
      <div key={ind}>
        <li>
          {val.title}
          <button
            onClick={() => {
              replace(val);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              del(val, ind);
            }}
          >
            Delete
          </button>
        </li>
      </div>
    );
  });

  return (
    <>
      {/* {console.log(data)} */}
      <h1>Todo List</h1>
      <form action="" onSubmit={sub}>
        <input type="text" value={str} onChange={rep} />
        <input type="submit" value="Add" />
      </form>

      <ul>{res}</ul>
    </>
  );
}

export default Todo;
