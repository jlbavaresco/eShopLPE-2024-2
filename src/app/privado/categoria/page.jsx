import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { getCategoriasDB, deleteCategoriaDB } from "@/componentes/bd/usecases/categoriaUseCases";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';

const deleteCategoria = async (codigo) => {
    'use server'
    try {
        await deleteCategoriaDB(codigo);
    } catch (err) {
        console.log('Erro: ' + err);
        throw new Error('Erro: ' + err);
    }
    revalidatePath('/privado/categoria/');
    redirect('/privado/categoria/');
}

export default async function Categoria() {

    revalidatePath('/privado/categoria/');

    const categorias = await getCategoriasDB();

    return (
        <Suspense fallback={<Loading />}>
            <div style={{ padding: '20px' }}>
                <Link href={`/privado/categoria/${0}/formulario`}
                    className="btn btn-primary">
                    <i className="bi bi-file-earmark-plus"></i> Novo
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorias.map((categoria) => (
                                <tr key={categoria.codigo}>
                                    <td align="center">
                                        <Link className="btn btn-info" title="Editar"
                                            href={`/privado/categoria/${categoria.codigo}/formulario`}>
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>
                                        <form
                                            action={deleteCategoria.bind(null, categoria.codigo)}
                                            className="d-inline">
                                            <Button className="btn btn-danger" title="Excluir"
                                                type="submit">
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </form>
                                    </td>
                                    <td>{categoria.codigo}</td>
                                    <td>{categoria.nome}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            </div>
        </Suspense>
    )
}