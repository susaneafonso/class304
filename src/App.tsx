import {Link} from "react-router-dom"

export function App() {
  
  return (
    <>
       <div style={{display:"flex",flexDirection:"column",margin:"200px auto auto auto",
        width:"30%"
       }}>
              <h3>Menu</h3>
              <Link to="/listapessoas" style={{textDecoration:"none", color:"inherit"}}>- Atividade 1</Link>
              <Link to="/produtos"style={{textDecoration:"none", color:"inherit", marginTop:"10px"}}>- Atividade 2</Link>
          
       </div>
    </>
  )
}


