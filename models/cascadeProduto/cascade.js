import Produto from "../Produto/produto.js"
import ItemComanda from "../item_comanda/produtoComanda.js"

Produto.hasMany(ItemComanda, { 
    foreignKey: 'produto_id', 
    onDelete: 'CASCADE' 
});

ItemComanda.belongsTo(Produto, { 
    foreignKey: 'produto_id', 
    onDelete: 'CASCADE' 
});
