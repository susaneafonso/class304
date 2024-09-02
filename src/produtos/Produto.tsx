import { useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { AiFillProduct } from "react-icons/ai"
import Modal from 'react-modal'
import{Link} from "react-router-dom"
import "./Produto.css"



export function Produto(){

     const name = useRef<HTMLInputElement>(null)
     const price = useRef<HTMLInputElement>(null)
     const quantity = useRef<HTMLInputElement>(null)
     const search= useRef<HTMLInputElement>(null)
     const btnAddData = useRef(null)
 
    

     const [product, setProduct]= useState<{name:string;price:number;quantity:number}[]>([])
     const [searchProduct, setSearchProduct]= useState<{name:string;price:number;quantity:number}[]>([])
     const [searchProductLower, setsearchProductLower]= useState<{name:string;price:number;quantity:number}[]>([])
     const [open, setOpen] = useState(false)
   
    
   
//name, price e quantity
    const teste= ()=>{

       
        if(name.current.value =="" || price.current.value=="" || quantity.current.value==""){
           alert("Preencha os campos!")
           return
        }
        if(isNaN(price.current.value || quantity.current.value)){
            alert("Preencha os campos preço e quantidade apenas com números!")
            return
        }
         
        if(name.current && price.current && quantity.current){
            const newProduct = {
                name: name.current.value,
                price:parseFloat(price.current.value),
                quantity:parseInt(quantity.current.value),
            }
            setProduct([...product, newProduct])
            alert("Produto Adicionado!")
            name.current.value=""
            price.current.value=""
            quantity.current.value=""
 }
    }

    const filter=()=>{

        if(search.current.value ==""){
            return
         }
         if(isNaN(search.current.value)){
          
             return
         }
          
         if(search.current ){

            const productPrice=product.filter((x)=> x.price == parseFloat(search.current.value))
            const productPriceLow=product.filter((x)=> x.price < parseFloat(search.current.value))
            console.log(search.current.value)
            console.log(productPrice)
            setSearchProduct(productPrice)
            setsearchProductLower(productPriceLow)
            search.current.value=""
           
    }}

    const btnAdd= ()=>{
       setOpen(true)
    }
    const onCloseModal = () => {
        setOpen(false)
        document.body.style.overflow = 'auto'
      }
      
      
    const afterOpenModal = ()=>{
        document.body.style.overflow = 'hidden'}

   
    const lowStock= product.filter((x)=>x.quantity<=2).length
    return(
        <>
           <div className='container-produto'>

               <h1>Controle de estoque de Produtos</h1>

               <div className="container-add">
                    <button onClick={btnAdd}><AiFillProduct /></button>
                    <p>Registrar Produtos</p>
               </div>

               <Modal isOpen={open} onClose={onCloseModal} contentLabel="Example Modal" onRequestClose={onCloseModal}
                onAfterOpen={afterOpenModal}
                className="container-model"
                >  
                    <div className='container-input'>
                       <div className='input-group'>
                            <button onClick={onCloseModal} id="close-btn"><IoMdClose /></button>
                            <h1>Adicione ao estoque</h1>
                            <div className="inputs">
                                 <input placeholder="nome" ref={name} style={{marginLeft:"10px"}}></input>
                                 <input placeholder="preço" ref={price} type="number" min="0" max="20000" step="0.1" style={{marginLeft:"5px"}}></input>
                                 <input placeholder="quantidade" ref={quantity} style={{marginLeft:"5px"}}></input>
                                 <button onClick={teste} ref={btnAddData} style={{marginLeft:"5%",marginRight:"2%"}}>adicionar</button>
                            </div>
                            <select style={{width:"38%",marginLeft:"10px", outline:"none",borderRadius:"4px", marginTop:"10px",marginBottom:"10px"}}>
                                 <option>Produtos Registrados</option>
                                 {
                                    product.map((data)=>(
                                      <option>{data.name}</option>
                                  ))
                                 }
                            </select>

                       </div>
                    </div>
              </Modal>

              <div className="container-data">
                   <h3> Tabela de Produtos</h3>
                
                    <table className="product-table">
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Custo</th>
                        </tr>
                        
                            {
                                product.map((data,k)=>{
                                    const custo = parseFloat(data.price * data.quantity)
                                    
                                    return(
                                    <tr key={k}>
                                        <td style={{backgroundColor: data.quantity <=2?'rgb(241, 80, 80)':'transparent'}}>{data.name}</td>
                                        <td style={{backgroundColor: data.quantity <=2?'rgb(241, 80, 80)':'transparent'}}>{data.price}</td>
                                        <td style={{backgroundColor: data.quantity <=2?'rgb(241, 80, 80)':'transparent'}}>{data.quantity}</td>
                                        <td style={{backgroundColor: data.quantity <=2?'rgb(241, 80, 80)':'transparent'}}>{custo}</td>
                                    </tr>
                                )})
                            }
                        
                     </table>
                     <p style={{fontSize:"13px", color:"red",opacity:"0.7"}}>Estoque baixo:{lowStock}</p>
                     <div className="container-search">
                       <input placeholder="buscar por preço" style={{width:"20%"}} ref={search}></input>  
                       <button onClick={filter}>Buscar</button> 
                     </div>
                     <table className="search-table" style={{marginBottom:"30px"}}>
                        <tr>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Custo</th>
                        </tr>
                     {
                       searchProduct.map((data,x)=>{
                            const custo = parseFloat(data.price * data.quantity)
                            return(
                            <tr key={x}>
                                <td style={{backgroundColor:"rgb(223, 222, 222)", color:"red"}}>{data.name}</td>
                                <td style={{backgroundColor:"rgb(223, 222, 222)",color:"red"}}>{data.price}</td>
                                <td style={{backgroundColor:"rgb(223, 222, 222)",color:"red"}}>{data.quantity}</td>
                                <td style={{backgroundColor:"rgb(223, 222, 222)",color:"red"}}>{custo}</td>
                            </tr>
                       )})
                     }
                     {
                       searchProductLower.map((data,x)=>{
                            const custo = parseFloat(data.price * data.quantity)
                            return(
                            <tr key={x}>
                                <td>{data.name}</td>
                                <td>{data.price}</td>
                                <td>{data.quantity}</td>
                                <td>{custo}</td>
                            </tr>
                       )})
                     }
                     
                    </table>

               </div>

           </div>
           <Link to="/" style={{display:"flex",margin:"30px 0 0 70%", color:"inherit"}}>Voltar</Link>
        </>
    )
}