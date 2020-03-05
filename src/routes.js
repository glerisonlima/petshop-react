import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./pages/main";
import Clientes from "./pages/clientes";
import ProdutoseServicos from "./pages/produtoservico";
import Vendas from "./pages/vendas";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/clientes" exact component={Clientes} />
      <Route path="/produtoseservicos" exact component={ProdutoseServicos} />
      <Route path="/vendas" exact component={Vendas} />
    </Switch>
  );
}
