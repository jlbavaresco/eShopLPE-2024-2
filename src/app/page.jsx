import { getProdutosDB } from "@/componentes/bd/usecases/produtoUseCases";
import Link from "next/link";

export const revalidate = 60; // tempo em segundos para revalidar

export default async function Home() {

  const produtos = await getProdutosDB();
  return (
    <div style={{ padding: '20px' }}>
      <div className="row">
        {produtos.length > 0 && (
          produtos.map((produto) => (
            <div key={produto.codigo} className="col-sm-3" >
              <div className="card mb-3 text-center">
                <div className="card-header">
                  {produto.nome}
                </div>
                <div className="card-body ">
                  <h5 className="card-title">{produto.nome}</h5>
                  <p className="card-text"><small className="text-muted">Preço: {produto.valor}</small></p>
                  <p className="card-text"><small className="text-muted">Categoria: {produto.categoria_nome}</small></p>
                </div>
                <div class="card-footer text-muted">
                  <Link type="button" className="btn btn-secondary" href={`/${produto.codigo}/detalhe`}>Detalhes do produto</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
