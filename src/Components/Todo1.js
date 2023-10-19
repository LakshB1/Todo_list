import {useEffect, useState} from 'react';

function Todo1()
{

    let [record,setRecord]  = useState([])
    let [com, setCom] = useState("All");

    useEffect(()=>
    {
        let localRecord = JSON.parse(localStorage.getItem('todo'));
        if(localRecord == null)
        {
            setRecord([]);
        }
        else
        {
            setRecord(localRecord);
        }
    },setRecord);


    let handleSubmit = (e)=>
    {
        e.preventDefault();
        let obj = {
            name : e.target.addtask.value,
            active : false,
            id : Math.round(Math.random)*1000,
        }
        console.log(obj.name);
        let newrecord = ([...record,obj]);
        setRecord(newrecord);
        localStorage.setItem('todo',JSON.stringify(newrecord));
        e.target.addtask.value = "";
    }



    let changeInputValue = (e) =>{  
       record[e.target.value].active = true;    
       console.log(record) ;
       setRecord(record);
       localStorage.setItem('todo',JSON.stringify(record));
    }

    let deleteData = (id)=>
    {
        let dataa =  record.findIndex(v=>v.id==id);
        record.splice(dataa,1);
        setRecord(record);
         localStorage.setItem('todo',JSON.stringify(record));
        let localRecord = JSON.parse(localStorage.getItem('todo'));
        setRecord(localRecord); 
    }


    return(
        <div>
           <div className='parent'name="alltask">
           <h1 style={{textAlign:"center"}}>THINGS TO DO</h1>
            <form method="post" onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" placeholder="Add New" className="search" name="addtask" />
                <input type="submit" value="Add Data" className='btn5' />
            </form>


                <div className='Alltask' style={{height:"300px", overflow:"scroll",overflowX:"hidden"}}>
                {com == "Pending"
                    ?
                    record.map((v, i) => {
                        return (

                            <div className='task'>
                                {v.active == false ?

                                    <ul>
                                        <li><input type="checkbox" value={i} onChange={(e) => changeInputValue(e)} /></li>
                                        <li>{v.name}</li>
                                        <li><button onClick={(e)=>deleteData(v.id)}>❌</button></li>
                                    </ul>
                                    : ""
                                }
                            </div>
                        )
                    })
                    :
                    com == "Completed"
                        ?
                        record.map((v, i)=> 
                        {
                            return (

                                <div className='task'>
                                    {v.active == true ?

                                        <ul>
                                            <li><input type="checkbox" checked value={i} onChange={(e) => changeInputValue(e)} /></li>
                                            <li>{v.name}</li>
                                            <li><button onClick={(e)=>deleteData(v.id)}>❌</button></li>
                                        </ul>
                                        : ""
                                    }
                                </div>
                            )
                        })
                        : com == "All"
                        ?
                        record.map((v, index) => {
                            return (
                                <div className='task '>
                                    {v.active == false ?
                                    <ul>
                                            <li><input type="checkbox" value={index} onChange={(e) => changeInputValue(e)} /></li>
                                            <li>{v.name}</li>
                                            <li><button onClick={(e)=>deleteData(v.id)}>❌</button></li>
                                        </ul>
                                        : <ul>
                                            <li><input type="checkbox" checked value={index} onChange={(e) => changeInputValue(e)} /></li>
                                            <li>{v.name}</li>
                                            <li><button onClick={(e)=>deleteData(v.id)}>❌</button></li>
                                        </ul>
                                    }
                                </div>
                            )
                        }) : ""
                }
                </div>

            

        

            <div className='footer'>
                <div className='searchbar'>
                    <button >+</button>
                    <p className="search1">🔎</p>
                </div>
                <span className='border1'></span>
                <h3>{record.length} Items left</h3>
                <div className='allbtn'>
                    <input type="submit" value="All" className='btn1' onClick={()=>setCom("All")}/>
                    <input type="submit" value="Pending" className='btn2' onClick={()=>setCom("Pending")}/>
                    <input type="submit" value="Completed" className='btn3' onClick={()=>setCom("Completed")}/>
                </div>
            </div>
           </div>
        </div>
    )
    
}

export default Todo1;