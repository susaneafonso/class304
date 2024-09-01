import { useRef, useState } from "react"
import { IoMdPersonAdd, IoMdClose  } from "react-icons/io";
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import "./Pessoa.css"

export function Pessoa(){

    const name = useRef<HTMLInputElement>(null)
    const age = useRef<HTMLInputElement>(null)
    const btnAddData = useRef(null)

    const [people, setPeople]= useState<{name:string;age:number}[]>([])
    const [open, setOpen] = useState(false)
   
//fazer soma das idades e lista com os nomes, e menores de idade
    const teste= ()=>{

       
        if(name.current.value =="" || age.current.value ==""){
           alert("Preencha os campos!")
           return
        }
        if(isNaN(age.current.value )){
            alert("Preencha o campo idade apenas com números!")
            return
        }
         
        if(name.current && age.current){
            const newPeop = {
                name: name.current.value,
                age:parseInt(age.current.value)
            }
            setPeople([...people, newPeop])
            alert("Pessoa Adicionada à lista!")
            name.current.value=""
            age.current.value=""
 }
 
   
    }
    const btnAdd= ()=>{
       setOpen(true)
    }
    const onCloseModal = () => {
        setOpen(false)
        document.body.style.overflow = 'auto'
      }
      
      
      const afterOpenModal = ()=>{
        document.body.style.overflow = 'hidden'}

    const sum = people.reduce((x,sum)=> x + sum.age,0)
    const adults = people.filter((adults)=> adults.age>=18)

    return(
        <>
           <div className='container-pessoa'>

               <h1>Lista de Convidados ({people.length}/{people.length})</h1>

               <div className="container-add">
                    <button onClick={btnAdd}><IoMdPersonAdd/></button>
                    <p>Adicionar pessoas</p>
               </div>

               <Modal isOpen={open} onClose={onCloseModal} contentLabel="Example Modal" onRequestClose={onCloseModal}
                onAfterOpen={afterOpenModal}
                className="container-model"
                >  
                    <div className='container-input'>
                       <div className='input-group'>
                          <button onClick={onCloseModal} id="close-btn"><IoMdClose /></button>
                           <h1>Adicione Convidados</h1>
                           <div className="inputs">
                              <input placeholder="nome" ref={name} style={{marginLeft:"10px"}}></input>
                              <input placeholder="idade" ref={age} style={{marginLeft:"5px"}}></input>
                              <button onClick={teste} ref={btnAddData} style={{marginLeft:"25px"}}>adicionar</button>
                           </div>
                       </div>
                    </div>
              </Modal>

              <div className="container-data">
                   <h3>Levantamento de convidados</h3>
                   <select >
                    <option>Maiores de Idade</option>
                    {adults.map((x,key)=>(
                       
                       <option key={key}>{x.name}</option>
                    ))}
                    </select>   
                    <p>Somatório das idades :{sum}</p>   
               </div>
           </div>
        </>
    )
}