const Produto = require("../Produto/produto");
const ItemComanda = require("../item_comanda/produtoComanda");

Produto.hasMany(ItemComanda, { 
    foreignKey: 'produto_id', 
    onDelete: 'CASCADE' 
});

ItemComanda.belongsTo(Produto, { 
    foreignKey: 'produto_id', 
    onDelete: 'CASCADE' 
});
