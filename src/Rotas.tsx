import {BrowserRouter,Route, Routes} from "react-router-dom"
import { Pessoa } from "./pessoas/Pessoa"
import { Produto } from "./produtos/Produto"
import { App } from "./App"

export function Rotas(){
    return(
        <>
           <BrowserRouter>
              <Routes>
                 <Route path={"/"} element={<App/>}/>
                 <Route path={"/listaPessoas"} element={<Pessoa/>}/>
                 <Route path={"/Produtos"} element={<Produto/>}/>
              </Routes>

           </BrowserRouter>
        </>
    )
}