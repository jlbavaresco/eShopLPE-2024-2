import { getProdutoPorCodigoDB } from "@/componentes/bd/usecases/produtoUseCases";
import { notFound } from "next/navigation";
import Loading from "@/componentes/comuns/Loading";
import { Suspense } from "react";
import Link from "next/link";

const ProdutoDetalhe = async ({ params }) => {
    let produto = null;
    try {
        produto = await getProdutoPorCodigoDB(params.produtoCodigo);
    } catch (err) {
        return notFound();
    }

    return (
        <Suspense fallback={<Loading />}>
            <div style={{ padding: '20px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-3" key={produto.codigo}>
                            <div className="card mb-3 text-center">
                                <div className="card-header">
                                    {produto.nome}
                                </div>
                                <div className="card-body ">
                                    <h5 className="card-title">Código: {produto.codigo}</h5>
                                    <p className="card-text">{produto.descricao}</p>
                                    <p className="card-text"><small className="text-muted">Preço: {produto.valor}</small></p>
                                    <p className="card-text"><small className="text-muted">Categoria: {produto.categoria_nome}</small></p>
                                    <p className="card-text"><small className="text-muted">Estoque: {produto.quantidade_estoque}</small></p>
                                </div>
                                <div class="card-footer text-muted">
                                    <Link className="btn btn-success" href={'/'}> Voltar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default ProdutoDetalhe;
