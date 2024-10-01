import { getProdutosDB } from "@/componentes/bd/usecases/produtoUseCases";

export default async function Home() {

  const produtos = await getProdutosDB();
  return (
    <div style={{padding : '20px'}}>
      <h1>Produtos disponíveis</h1>
      { produtos.length > 0 && (
        produtos.map((produto) => (
          <div key={produto.codigo}>
            <h1>{produto.nome}</h1>
            <h2>{produto.valor}</h2>
          </div>
        ))
      )}
    </div>
  );
}
