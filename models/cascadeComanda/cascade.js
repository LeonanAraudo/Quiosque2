import Comanda from "../comanda/comanda.js";
import ItemComanda from "../item_comanda/produtoComanda.js";

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
