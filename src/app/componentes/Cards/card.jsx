import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card() {
    return (
        <>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
                <div className="row g-0">
                <div className="col-md-4 border-1 border-black rounded">
                    <img
                    src="/aga.png"
                    className="img-fluid rounded-start rounded"
                    alt="Imagem aleatória"
                    />
                </div>
                <div className="col-md-8 p-2">
                    <div className="card-body">
                    <h5 className="card-title">Agua</h5>
                    <p className="card-text text-success">R$ 20,00</p>
                    <p className="card-text">
                        <small className="text-body-secondary">Quantidade disponivel: 20</small>
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
            <div className="col-md-4 border-1 border-black rounded">
                <img
                    src="/coca.jpg"
                    className="img-fluid rounded-start rounded"
                    alt="Imagem aleatória"
                />
                </div>
                <div className="col-md-8 p-2">
                <div className="card-body">
                    <h5 className="card-title">Agua</h5>
                    <p className="card-text text-success">R$ 20,00</p>
                    <p className="card-text">
                    <small className="text-body-secondary">Quantidade disponivel: 20</small>
                    </p>
                </div>
                </div>
            </div>
            </div>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4 border-1 border-black rounded">
                <img
                    src="/guara.jpg"
                    className="img-fluid rounded-start rounded"
                    alt="Imagem aleatória"
                />
                </div>
                <div className="col-md-8 p-2">
                <div className="card-body">
                    <h5 className="card-title">Agua</h5>
                    <p className="card-text text-success">R$ 20,00</p>
                    <p className="card-text">
                    <small className="text-body-secondary">Quantidade disponivel: 20</small>
                    </p>
                </div>
                </div>
            </div>
            </div>
        </>
    );
  }
  