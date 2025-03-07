import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card() {
    return (
        
        <div className='p-3 bd-example m-0 border-0 w-auto'>
            <div className="card mb-3" style={{ maxWidth: "640px",maxHeight: "300px"  }}>
                <div className="flex-row d-flex g-0">
                <div className="col-12 col-md-4 border-1 border-black rounded d-flex items-center justify-center" style={{width: "14rem"}}>
                    <img
                    src="/aga.png"
                    className="img-fluid rounded-start rounded"
                    alt="Imagem aleatória"
                    />
                </div>
                <div className="col-12 col-md-8 p-2">
                    <div className="card-body">
                        <h5 className="card-title">Agua</h5>
                        <p className="card-text text-success">R$ 20,00</p>
                        <p className="card-text">
                            <small className="text-body-secondary">Quantidade disponivel: 20</small>
                        </p>
                        <a href="#" className="btn btn-dark">+</a>
                    </div>
                </div>
                </div>
            </div>
        </div>

    );
  }
  