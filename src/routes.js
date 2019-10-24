import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import GeneroCad from './pages/generoCad';
import GeneroList from './pages/generoList';
import LivroList from './pages/livroList';
import LivroCad from './pages/livroCad';

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
        }
    })
);

export default Routes;