const Comanda = require("../comanda/comanda");
const ItemComanda = require("../item_comanda/produtoComanda");

Comanda.hasMany(ItemComanda, {
  foreignKey: "comanda_id",
  as: "itens",           
  onDelete: "CASCADE",   
  onUpdate: "CASCADE"
});

ItemComanda.belongsTo(Comanda, {
  foreignKey: "comanda_id",
  as: "comanda"          
});
