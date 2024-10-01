import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCategoriasDB } from "@/componentes/bd/usecases/categoriaUseCases";
import { getProdutoPorCodigoDB, addProdutoDB, updateProdutoDB } from "@/componentes/bd/usecases/produtoUseCases";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';

const FormularioPage = async ({ params }) => {

    const categorias = await getCategoriasDB();

    let produto = null;
    if (params.codigo == 0) {
        produto = {
            codigo: 0, nome: "", descricao: "",
            quantidade_estoque: "", valor: "",
            ativo: true,
            data_cadastro: new Date().toISOString().slice(0, 10),
            categoria: ""
        }
    } else {
        try {
            produto = await getProdutoPorCodigoDB(params.codigo);
        } catch (err) {
            return notFound();
        }
    }

    const salvarProduto = async (formData) => {
        'use server';
        const objeto = {
            codigo: formData.get('codigo'),
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            quantidade_estoque: formData.get('quantidade_estoque'),
            valor: formData.get('valor'),
            ativo: formData.get('ativo'),
            data_cadastro: formData.get('data_cadastro'),
            categoria: formData.get('categoria')
        }
        try {
            if (objeto.codigo == 0) {
                await addProdutoDB(objeto);
            } else {
                await updateProdutoDB(objeto);
            }
        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        revalidatePath('/privado/produto/');
        redirect('/privado/produto');
    }

    return (
        <>
            <Suspense fallback={<Loading />}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Produto</h2>
                </div>
                <form action={salvarProduto}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <div>
                                    <FloatingLabel controlId="campoCodigo"
                                        label="Código" className="mb-3">
                                        <Form.Control type="number"
                                            defaultValue={produto.codigo} readOnly
                                            name="codigo" />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="campoNome"
                                        label="Nome" className="mb-3">
                                        <Form.Control type="text"
                                            defaultValue={produto.nome} required
                                            name="nome" />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="campoDescricao"
                                        label="Descrição" className="mb-3">
                                        <Form.Control type="text"
                                            defaultValue={produto.descricao}
                                            required
                                            name="descricao"
                                            as="textarea"
                                            style={{ height: '100px' }} />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="campoEstoque"
                                        label="Quantidade em estoque" className="mb-3">
                                        <Form.Control type="number"
                                            defaultValue={produto.quantidade_estoque}
                                            required
                                            name="quantidade_estoque" />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="campoValor"
                                        label="Valor" className="mb-3">
                                        <Form.Control type="number"
                                            defaultValue={produto.valor}
                                            required
                                            name="valor" />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="campoData"
                                        label="Data Cadastro" className="mb-3">
                                        <Form.Control type="date"
                                            defaultValue={produto.data_cadastro}
                                            required
                                            name="data_cadastro" />
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="selectAtivo"
                                        label="Ativo" className="mb-3">
                                        <Form.Select type="date"
                                            defaultValue={produto.ativo}
                                            required
                                            name="ativo" >
                                            <option value={true}>SIM</option>
                                            <option value={false}>NÃO</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>
                                <div>
                                    <FloatingLabel controlId="selectCategoria"
                                        label="Categoria" className="mb-3">
                                        <Form.Select type="date"
                                            defaultValue={produto.categoria}
                                            required
                                            name="categoria" >
                                            <option value="" disabled="true">
                                                Selecione a categoria
                                            </option>
                                            {
                                                categorias.map((cat) => (
                                                    <option key={cat.codigo}
                                                        value={cat.codigo}>
                                                        {cat.nome}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>
                                <div className="form-group text-center mt-3">
                                    <button type="submit" className="btn btn-success">
                                        Salvar <i className="bi bi-save"></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </form>
            </Suspense>
        </>
    )


}

export default FormularioPage;