import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { getProdutosDB, deleteProdutoDB } from "@/componentes/bd/usecases/produtoUseCases";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';

const deleteProduto = async (codigo) => {
    'use server'
    try {
        await deleteProdutoDB(codigo);
    } catch (err) {
        console.log('Erro: ' + err);
        throw new Error('Erro: ' + err);
    }
    revalidatePath('/privado/produto/');
    redirect('/privado/produto/');
}

export default async function Produto() {

    revalidatePath('/privado/produto/');

    const produtos = await getProdutosDB();

    return (
        <Suspense fallback={<Loading />}>
            <div style={{ padding: '20px' }}>
                <Link href={`/privado/produto/${0}/formulario`}
                    className="btn btn-primary">
                    <i className="bi bi-file-earmark-plus"></i> Novo
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Estoque</th>
                            <th>Ativo</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            produtos.map((produto) => (
                                <tr key={produto.codigo}>
                                    <td align="center">
                                        <Link className="btn btn-info" title="Editar"
                                            href={`/privado/produto/${produto.codigo}/formulario`}>
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <form
                                            action={deleteProduto.bind(null, produto.codigo)}
                                            className="d-inline">
                                            <Button className="btn btn-danger" title="Excluir"
                                                type="submit">
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </form>
                                    </td>
                                    <td>{produto.codigo}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.quantidade_estoque}</td>
                                    <td>{produto.ativo ? 'SIM' : 'NÃO'}</td>
                                    <td>{produto.categoria_nome}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            </div>
        </Suspense>
    )
}