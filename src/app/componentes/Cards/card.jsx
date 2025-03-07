import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card() {
    return (
        <>
        <div className="container-fluid p-3">
            <div className="card d-flex flex-row" style={{ maxWidth: "100%" }}>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <img
                        src="/aga.png"
                        className="img-fluid rounded-start"
                        alt="Imagem aleatória"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">Água</h5>
                        <p className="card-text text-success">R$ 20,00</p>
                        <p className="card-text">
                            <small className="text-body-secondary">Quantidade disponível: 20</small>
                        </p>
                        <button href="#" className="btn btn-dark btn-lg">+</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid p-3">
            <div className="card d-flex flex-row" style={{ maxWidth: "100%" }}>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <img
                        src="/coca.jpg"
                        className="img-fluid rounded-start"
                        alt="Imagem aleatória"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">Água</h5>
                        <p className="card-text text-success">R$ 20,00</p>
                        <p className="card-text">
                            <small className="text-body-secondary">Quantidade disponível: 20</small>
                        </p>
                        <button className="btn btn-dark btn-lg">+</button>
                    </div>
                </div>
            </div>
        </div>

       
        <div className="container-fluid p-3">
            <div className="card d-flex flex-row" style={{ maxWidth: "100%" }}>
                <div className="col-4 d-flex align-items-center justify-content-center">
                    <img
                        src="/guara.jpg"
                        className="img-fluid rounded-start"
                        alt="Imagem aleatória"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className="col-8">
                    <div className="card-body">
                        <h5 className="card-title">Água</h5>
                        <p className="card-text text-success">R$ 20,00</p>
                        <p className="card-text">
                            <small className="text-body-secondary">Quantidade disponível: 20</small>
                        </p>
                        <button className="btn btn-dark btn-lg">+</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
