import 'bootswatch/dist/flatly/bootstrap.css'

import Rotas from './rotas';
import Navbar from '../components/navbar';
import ProvedorAutenticacao from "./provedorAutenticacao";

import'toastr/build/toastr.min.js'

import '../custom.css'
import'toastr/build/toastr.css'

import 'primereact/resources/themes/md-dark-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


function App() {
  return (
    <ProvedorAutenticacao>
      <Navbar />
      <div className="container">
        <Rotas />
      </div>
    </ProvedorAutenticacao>
  );
}

export default App;
