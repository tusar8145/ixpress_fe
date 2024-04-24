import { React, useState } from "react";

const Appx = () => {
    const [data, setForm]= useState([{
        name:"",
        email:"",

    }])


const handleCheck = (index, e, selected)=>{
    console.log(index, e.target.value, selected);
    let temp = [...data];
    temp[index][selected] = e.target.value;
    setForm(temp);
    }

const handleNewRow = () => {
    setForm([...data,{
        name:"",
        email:"",
  
    }])}

    const handleSubmit = (e) => {  
        e.preventDefault();
        console.log(data);
        setForm([{
            name:"",
            email:"",
     
        }])
     }

     return (
      <section>
        <form onSubmit={handleSubmit}>
            {
                data.map((details, index)=>(
                    <>
                    <section key={index}>
                        <div>
                            <input type="text" onChange={(e)=>handleCheck(index,e,"name")} value={details?.name}/> 
                            <input type="text" onChange={(e)=>handleCheck(index,e,"email")} value={details?.email}/> 
                        </div>
                    </section>
                   
                    </>
                ))
            }
            <span onClick={handleNewRow}>add</span>
            <button>submit</button>
        </form>
      </section>

      )

};

export default Appx;