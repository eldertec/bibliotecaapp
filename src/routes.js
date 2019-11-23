import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GeneroCad from './pages/generoCad';
import GeneroList from './pages/generoList';
import LivroList from './pages/livroList';
import LivroCad from './pages/livroCad';
import AutorList from './pages/autorList';
import EditoraList from './pages/editoraList';
import ClienteList from './pages/clienteList';
import EmprestimoList from './pages/emprestimoList';
import AutorCad from './pages/autorCad';
import EditoraCad from './pages/editoraCad';
import ClienteCad from './pages/clienteCad';
import EmprestimoCad from './pages/emprestimoCad';

const Routes = createAppContainer(
    createDrawerNavigator({

        ListaLivro: {
            screen: LivroList,
            navigationOptions: {
                drawerLabel: 'Lista de Livro'
            }
        },
        ListaGenero: {
            screen: GeneroList,
            navigationOptions: {
                drawerLabel: 'Lista de Gênero'
            }
        },
        ListaAutor: {
            screen: AutorList,
            navigationOptions: {
                drawerLabel: 'Lista de Autor'
            }
        },
        ListaEditora: {
            screen: EditoraList,
            navigationOptions: {
                drawerLabel: 'Lista de Editora'
            }
        },
        ListaCliente: {
            screen: ClienteList,
            navigationOptions: {
                drawerLabel: 'Lista de Cliente'
            }
        },
        ListaEmprestimo: {
            screen: EmprestimoList,
            navigationOptions: {
                drawerLabel: 'Lista de Emprestimo'
            }
        },
        CadastroLivro: {
            screen: LivroCad,
            navigationOptions: {
                drawerLabel: 'Cadastro de Livro'
            }
        },
        CadastroGenero: {
            screen: GeneroCad,
            navigationOptions: {
                drawerLabel: 'Cadastro de Gênero'
            }
        },
        CadastroAutor: {
            screen: AutorCad,
            navigationOptions: {
                drawerLabel: 'Cadastro de Autor'
            }
        },
        CadastroEditora: {
            screen: EditoraCad,
            navigationOptions: {
                drawerLabel: 'Cadastro de Editora'
            }
        },
        CadastroCliente: {
            screen: ClienteCad,
            navigationOptions: {
                drawerLabel: 'Cadastro de Cliente'
            }
        },
        CadastroEmprestimo: {
            screen: EmprestimoCad,
            navigationOptions: {
                drawerLabel: 'Empréstimos'
            }
        }
    })
);

export default Routes;